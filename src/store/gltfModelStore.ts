import { create } from 'zustand';

interface GLTFModelStore {
  useGLTFModel: boolean;
  modelUrl: string | null;
  modelStatus: 'none' | 'loading' | 'loaded' | 'error';
  setUseGLTFModel: (use: boolean) => void;
  setModelUrl: (url: string | null) => void;
  setModelStatus: (status: 'none' | 'loading' | 'loaded' | 'error') => void;
}

export const useGLTFModelStore = create<GLTFModelStore>((set) => ({
  useGLTFModel: false,
  modelUrl: null,
  modelStatus: 'none',

  setUseGLTFModel: (use) => set({ useGLTFModel: use, modelUrl: use ? '/models/engine.gltf' : null }),
  setModelUrl: (url) => set({ modelUrl: url }),
  setModelStatus: (status) => set({ modelStatus: status }),
}));
