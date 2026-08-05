import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

/**
 * Ambient starfield.
 *
 * All motion happens in the vertex shader from a single `uTime` uniform, so the
 * per-frame CPU cost is one uniform write. The previous version walked 2000
 * particles in JS every frame and re-uploaded the whole position buffer to the
 * GPU (`needsUpdate = true`), which was the main source of scroll jank.
 *
 * The sprite is drawn analytically in the fragment shader — no texture fetch
 * from an external CDN, so the background can't be broken by a third party.
 */

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: #000;
  /* Fades in once the first frame has rendered, avoiding a black flash. */
  opacity: 0;
  transition: opacity 1.2s ease;

  &[data-ready='true'] {
    opacity: 1;
  }
`;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uPixelRatio;
  uniform float uDepth;

  attribute float aSize;
  attribute float aOffset;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vFade;

  void main() {
    vColor = aColor;

    vec3 pos = position;

    // Travel toward the camera and wrap around, all from uTime — mod() keeps
    // the loop seamless without any CPU-side bookkeeping.
    pos.z = mod(pos.z + uTime * uSpeed + aOffset, uDepth) - uDepth * 0.5;

    // Gentle lateral drift so the field doesn't read as a rigid grid.
    pos.x += sin(uTime * 0.08 + aOffset) * 12.0;
    pos.y += cos(uTime * 0.06 + aOffset * 1.3) * 8.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Fade in as particles emerge from the far plane and out as they pass the
    // camera, which hides both the spawn and despawn pops.
    float dist = -mvPosition.z;
    vFade = smoothstep(uDepth * 0.5, uDepth * 0.15, dist) * smoothstep(0.0, 150.0, dist);

    gl_PointSize = aSize * uPixelRatio * (300.0 / max(dist, 1.0));
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vFade;

  void main() {
    // Radial falloff -> soft round sprite, replaces the CDN particle texture.
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, d);
    alpha = pow(alpha, 1.6) * vFade;

    gl_FragColor = vec4(vColor, alpha);
  }
`;

const PARTICLE_COUNT = 1400;
const DEPTH = 2200;

const WebGLBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Bail out entirely if the device can't give us a context — the CSS
    // background colour is a perfectly good fallback.
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false, // Pointless for additive soft sprites, and costly.
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 1, DEPTH);
    camera.position.z = 400;

    const dpr = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(dpr);
    container.appendChild(renderer.domElement);

    // --- Geometry -----------------------------------------------------------
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const offsets = new Float32Array(PARTICLE_COUNT);

    const palette = [
      new THREE.Color('#E50914'),
      new THREE.Color('#B81D24'),
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#FF6B6B'),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 2400;
      positions[i3 + 1] = (Math.random() - 0.5) * 1600;
      positions[i3 + 2] = Math.random() * DEPTH;

      // Weighted so white dominates and red reads as an accent.
      const c = palette[Math.random() < 0.62 ? 2 : Math.floor(Math.random() * 2)];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      sizes[i] = Math.random() * 2.2 + 0.6;
      offsets[i] = Math.random() * DEPTH;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: reduceMotion ? 0 : 28 },
        uPixelRatio: { value: dpr },
        uDepth: { value: DEPTH },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    // The field is procedurally wrapped, so bounds-based culling is wrong.
    points.frustumCulled = false;
    scene.add(points);

    // --- Sizing -------------------------------------------------------------
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener('resize', onResize);

    // --- Loop ---------------------------------------------------------------
    const clock = new THREE.Clock();
    let frameId;
    let ready = false;

    const render = () => {
      frameId = requestAnimationFrame(render);
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);

      if (!ready) {
        ready = true;
        container.dataset.ready = 'true';
      }
    };

    const start = () => {
      if (frameId == null) {
        clock.start();
        render();
      }
    };
    const stop = () => {
      if (frameId != null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    // Don't burn battery animating a field nobody is looking at.
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    if (reduceMotion) {
      // Draw one static frame and leave it there.
      renderer.render(scene, camera);
      container.dataset.ready = 'true';
    } else {
      start();
    }

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <Container ref={containerRef} aria-hidden="true" />;
};

export default React.memo(WebGLBackground);
