import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const Hero3DBackground = () => (
  <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[2, 5, 2]} />
    <Sphere visible args={[1, 100, 200]} scale={2.4}>
      <MeshDistortMaterial
        color="#854CE6"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
    <OrbitControls enableZoom={false} />
  </Canvas>
);

export default Hero3DBackground;