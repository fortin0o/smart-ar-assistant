'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useModelStore } from '@/store/modelStore';
import { useGLTFModelStore } from '@/store/gltfModelStore';
import { PART_MAP } from '@/data/engineParts';
import * as THREE from 'three';
import type { PartId } from '@/types';

// Map GLTF node names to our PartId system
const NODE_TO_PART: Record<string, PartId> = {
  // GLTF node names -> our part IDs (customize based on actual model)
  Piston: 'piston',
  Crankshaft: 'crankshaft',
  Valve: 'valve',
  Cylinder: 'cylinder',
  Camshaft: 'camshaft',
  SparkPlug: 'sparkplug',
};

function getPartId(nodeName: string): PartId | null {
  const lower = nodeName.toLowerCase();
  for (const [key, value] of Object.entries(NODE_TO_PART)) {
    if (lower.includes(key.toLowerCase())) return value;
  }
  return null;
}

interface EngineGLTFModelProps {
  url?: string;
}

export function EngineGLTFModel({ url = '/models/engine.gltf' }: EngineGLTFModelProps) {
  const { scene } = useGLTF(url);
  const { setModelStatus } = useGLTFModelStore();
  const groupRef = useRef<THREE.Group>(null);
  const { selectedPartId, setSelectedPart, scale, isXRay, explosionProgress } = useModelStore();
  const initialized = useRef(false);

  // Store reference to meshes for interaction
  const meshMap = useRef<Map<PartId, THREE.Mesh[]>>(new Map());

  // Initialize mesh map once model is loaded
  useEffect(() => {
    if (!scene || initialized.current) return;

    // Clone the scene so we can modify it
    const clone = scene.clone(true);
    meshMap.current.clear();

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const partId = getPartId(child.name);
        if (partId) {
          const existing = meshMap.current.get(partId) || [];
          existing.push(child);
          meshMap.current.set(partId, existing);

          // Make clickable
          child.userData.partId = partId;
        }
      }
    });

    setModelStatus('loaded');
    initialized.current = true;
  }, [scene, setModelStatus]);

  // Handle selection highlighting
  useEffect(() => {
    meshMap.current.forEach((meshes, partId) => {
      const isSelected = selectedPartId === partId;
      meshes.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (isSelected) {
          mat.emissive = new THREE.Color('#00d4ff');
          mat.emissiveIntensity = 0.6;
        } else if (selectedPartId !== null) {
          mat.emissive = new THREE.Color('#000000');
          mat.emissiveIntensity = 0;
          mat.opacity = 0.4;
          mat.transparent = true;
        } else {
          mat.emissive = new THREE.Color('#000000');
          mat.emissiveIntensity = 0;
          mat.opacity = 1;
          mat.transparent = false;
        }
      });
    });
  }, [selectedPartId]);

  // Handle X-Ray mode
  useEffect(() => {
    meshMap.current.forEach((meshes) => {
      meshes.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (isXRay) {
          mat.wireframe = true;
          mat.opacity = 0.3;
          mat.transparent = true;
        } else {
          mat.wireframe = false;
          mat.opacity = 1;
          mat.transparent = false;
        }
      });
    });
  }, [isXRay]);

  // Explode animation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    meshMap.current.forEach((meshes, partId) => {
      const part = PART_MAP[partId];
      if (!part) return;

      const targetOffset = explosionProgress;
      const offset = part.position as [number, number, number];

      meshes.forEach((mesh, i) => {
        const basePos = new THREE.Vector3(0, 0, 0);
        mesh.position.lerp(
          new THREE.Vector3(
            basePos.x + offset[0] * targetOffset,
            basePos.y + offset[1] * targetOffset,
            basePos.z + offset[2] * targetOffset
          ),
          delta * 5
        );
      });
    });
  });

  // Rotation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  if (!scene) return null;

  return (
    <group ref={groupRef} scale={scale}>
      <primitive
        object={scene.clone(true)}
        onPointerDown={(e: any) => {
          e.stopPropagation();
          const partId = e.object.userData.partId as PartId | undefined;
          if (partId) {
            setSelectedPart(selectedPartId === partId ? null : partId);
          }
        }}
      />
    </group>
  );
}

export function usePreloadEngineModel(url: string = '/models/engine.gltf') {
  const { setModelStatus } = useGLTFModelStore();

  useEffect(() => {
    setModelStatus('loading');
    useGLTF.preload(url);
  }, [url, setModelStatus]);
}
