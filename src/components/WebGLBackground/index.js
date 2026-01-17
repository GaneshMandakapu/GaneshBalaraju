import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  background: #000; /* Dark background for night train feel */
`;

const WebGLBackground = () => {
    const containerRef = useRef(null);

    const config = useMemo(() => ({
        particleCount: 2000,
        speed: 8,
        colors: ['#FFFFFF', '#E50914', '#B81D24'], // Red, Dark Red, White
    }), []);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        // Scene
        const scene = new THREE.Scene();
        // Fog to hide the spawn point
        scene.fog = new THREE.FogExp2(0x000000, 0.001);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.z = 500;
        camera.rotation.x = -Math.PI / 10;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // --- Warp Particles (Passing Lights) ---
        const geometry = new THREE.BufferGeometry();
        const count = config.particleCount;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // X: Wide spread
            positions[i3] = (Math.random() - 0.5) * 2000;

            // Z: Spread deep
            positions[i3 + 2] = (Math.random() - 0.5) * 2000;

            // Y: spread around
            positions[i3 + 1] = (Math.random() - 0.5) * 1500;

            const color = new THREE.Color(
                config.colors[Math.floor(Math.random() * config.colors.length)]
            );
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            sizes[i] = Math.random() * 3;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 4,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            map: new THREE.TextureLoader().load('https://assets.codepen.io/16327/particle.png'),
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Animation Loop
        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Move Particles
            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < count; i++) {
                const i3 = i * 3;

                // Move towards camera (Camera is at +500)
                positions[i3 + 2] += config.speed;

                // Reset if past camera
                if (positions[i3 + 2] > 600) {
                    positions[i3 + 2] = -1200;
                }
            }
            particles.geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        // Handlers
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            // Cleanup
            if (renderer.domElement && container) {
                container.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        }

    }, [config]);

    return <Container ref={containerRef} />;
};

export default WebGLBackground;
