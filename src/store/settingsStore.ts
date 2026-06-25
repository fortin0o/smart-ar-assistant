import { create } from 'zustand';

interface SettingsStore {
  voiceEnabled: boolean;
  modelScale: number;
  trackingSensitivity: number;
  theme: 'dark' | 'light' | 'system';
  setVoiceEnabled: (enabled: boolean) => void;
  setModelScale: (scale: number) => void;
  setTrackingSensitivity: (sensitivity: number) => void;
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  voiceEnabled: true,
  modelScale: 1.0,
  trackingSensitivity: 0.5,
  theme: 'dark',
  setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),
  setModelScale: (scale) => set({ modelScale: scale }),
  setTrackingSensitivity: (sensitivity) => set({ trackingSensitivity: sensitivity }),
  setTheme: (theme) => set({ theme }),
}));
