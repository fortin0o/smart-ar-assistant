'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, Stars, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useModelStore } from '@/store/modelStore';
import { EngineModelParts } from './ModelParts';
import * as THREE from 'three';

function EngineGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const { scale } = useModelStore();

  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle idle rotation
    groupRef.current.rotation.y += 0.002;
    // Subtle floating
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
  });

  return (
    <group ref={groupRef} scale={scale}>
      <EngineModelParts />
    </group>
  );
}

function SceneSetup() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} color="#e0e8ff" />
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.5}
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-4, 2, -2]} intensity={0.8} color="#00d4ff" />
      <pointLight position={[4, -2, 4]} intensity={0.5} color="#7c3aed" />
      <pointLight position={[0, 6, 0]} intensity={0.4} color="#0080ff" />

      {/* Background Stars */}
      <Stars radius={80} depth={50} count={2000} factor={3} fade speed={0.5} />

      {/* Floor grid */}
      <Grid
        position={[0, -1.5, 0]}
        args={[12, 12]}
        cellSize={0.5}
        cellThickness={0.3}
        cellColor="#00d4ff22"
        sectionSize={2}
        sectionThickness={0.8}
        sectionColor="#00d4ff44"
        fadeDistance={10}
        infiniteGrid
      />
    </>
  );
}

export function EngineModel() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 1, 4]} fov={50} />

        <Suspense fallback={null}>
          <SceneSetup />
          <EngineGroup />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          minPolarAngle={Math.PI * 0.1}
          maxPolarAngle={Math.PI * 0.85}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
