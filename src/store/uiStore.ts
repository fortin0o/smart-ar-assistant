import { create } from 'zustand';

export type SheetId = 'ai' | 'voice' | 'object' | 'animation' | 'settings' | null;

interface UIStore {
  activeSheet: SheetId;
  fabOpen: boolean;
  openSheet: (id: SheetId) => void;
  closeSheet: () => void;
  toggleFab: () => void;
  closeFab: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  activeSheet: null,
  fabOpen: false,

  openSheet: (id) => set({ activeSheet: id, fabOpen: false }),
  closeSheet: () => set({ activeSheet: null }),
  toggleFab: () => set((s) => ({ fabOpen: !s.fabOpen })),
  closeFab: () => set({ fabOpen: false }),
}));
