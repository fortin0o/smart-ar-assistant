'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useModelStore } from '@/store/modelStore';
import { ENGINE_PARTS, PART_MAP } from '@/data/engineParts';
import * as THREE from 'three';
import type { PartId } from '@/types';

interface PartMeshProps {
  partId: PartId;
  geometry: THREE.BufferGeometry;
  baseColor: string;
}

function PartMesh({ partId, geometry, baseColor }: PartMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { selectedPartId, setSelectedPart, isAnimating, animationTarget } = useModelStore();
  const isSelected = selectedPartId === partId;
  const part = PART_MAP[partId];

  // Animate this specific part if it's the animation target
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    if (isAnimating && animationTarget) {
      if (animationTarget === 'pistonMove' && partId === 'piston') {
        meshRef.current.position.y = part.position[1] + Math.sin(t * 6) * 0.3;
      }
      if (animationTarget === 'crankshaftSpin' && partId === 'crankshaft') {
        meshRef.current.rotation.x = t * 4;
      }
      if (animationTarget === 'camshaftRotate' && partId === 'camshaft') {
        meshRef.current.rotation.y = t * 2;
      }
      if (animationTarget === 'valveOpen' && partId === 'valve') {
        meshRef.current.position.y = part.position[1] + Math.abs(Math.sin(t * 3)) * 0.2;
      }
      if (animationTarget === 'sparkIgnite' && partId === 'sparkplug') {
        meshRef.current.scale.setScalar(1 + Math.abs(Math.sin(t * 8)) * 0.15);
      }
      if (animationTarget === 'fullCycle') {
        if (partId === 'piston') meshRef.current.position.y = part.position[1] + Math.sin(t * 6) * 0.3;
        if (partId === 'crankshaft') meshRef.current.rotation.x = t * 4;
        if (partId === 'valve') meshRef.current.position.y = part.position[1] + Math.abs(Math.sin(t * 3)) * 0.15;
        if (partId === 'camshaft') meshRef.current.rotation.y = t * 2;
      }
    } else if (!isAnimating) {
      // Reset to base position
      meshRef.current.position.set(...part.position);
      meshRef.current.scale.set(...part.scale);
    }

    // Selected glow pulse
    if (isSelected && meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      meshRef.current.material.emissiveIntensity = 0.4 + Math.sin(t * 3) * 0.2;
    }
  });

  const color = new THREE.Color(baseColor);
  const emissiveColor = new THREE.Color(baseColor);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={part.position}
      scale={part.scale}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedPart(isSelected ? null : partId);
      }}
    >
      <meshStandardMaterial
        color={isSelected ? color : new THREE.Color('#a0b0c8')}
        emissive={isSelected ? emissiveColor : new THREE.Color('#000000')}
        emissiveIntensity={isSelected ? 0.4 : 0}
        roughness={isSelected ? 0.2 : 0.5}
        metalness={isSelected ? 0.8 : 0.4}
        transparent
        opacity={isSelected ? 1 : 0.85}
      />
    </mesh>
  );
}

export function EngineModelParts() {
  // Create procedural geometries for each engine part
  const geometries = useMemo(() => ({
    piston: new THREE.CylinderGeometry(0.35, 0.35, 0.4, 32),
    crankshaft: new THREE.CylinderGeometry(0.08, 0.08, 1.5, 16),
    valve: new THREE.CylinderGeometry(0.06, 0.04, 0.5, 16),
    cylinder: (() => {
      const outer = new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32, 1, true);
      return outer;
    })(),
    camshaft: new THREE.CylinderGeometry(0.07, 0.07, 1.0, 16),
    sparkplug: new THREE.CylinderGeometry(0.05, 0.04, 0.25, 16),
  }), []);

  return (
    <group>
      {ENGINE_PARTS.map((part) => (
        <PartMesh
          key={part.id}
          partId={part.id}
          geometry={geometries[part.id]}
          baseColor={part.color}
        />
      ))}
    </group>
  );
}
