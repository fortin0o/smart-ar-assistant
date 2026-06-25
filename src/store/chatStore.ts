import { create } from 'zustand';
import type { ChatMessage, ChatState, PartId } from '@/types';

interface ChatStore extends ChatState {
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  setVoiceActive: (active: boolean) => void;
  setSpeaking: (speaking: boolean) => void;
  setCurrentInput: (input: string) => void;
  clearMessages: () => void;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    '👋 Halo! Saya **AR Assistant** siap membantu Anda memahami komponen mesin.\n\nPilih bagian mesin di panel kiri, lalu tanyakan apa saja — fungsi, cara kerja, material, atau tips perawatan!',
  timestamp: Date.now(),
  partContext: null,
};

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [WELCOME_MESSAGE],
  isLoading: false,
  isVoiceActive: false,
  isSpeaking: false,
  currentInput: '',

  addMessage: (msg) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      timestamp: Date.now(),
    };
    set((s) => ({ messages: [...s.messages, newMsg] }));
  },

  setLoading: (loading) => set({ isLoading: loading }),

  setVoiceActive: (active) => set({ isVoiceActive: active }),

  setSpeaking: (speaking) => set({ isSpeaking: speaking }),

  setCurrentInput: (input) => set({ currentInput: input }),

  clearMessages: () => set({ messages: [WELCOME_MESSAGE] }),
}));
