'use client';

import { useState } from 'react';
import { BottomSheet } from './BottomSheet';
import { useUIStore } from '@/store/uiStore';
import { useVoice } from '@/hooks/useVoice';
import { useChatStore } from '@/store/chatStore';
import { useAIChat } from '@/hooks/useAIChat';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function VoiceSheet() {
  const { activeSheet, closeSheet } = useUIStore();
  const { isVoiceActive, isSpeaking } = useChatStore();
  const { isSupported, startListening, stopListening } = useVoice();
  const { sendMessage } = useAIChat();
  const [error, setError] = useState<string | null>(null);
  const isOpen = activeSheet === 'voice';

  const toggleListening = () => {
    if (!isSupported) {
      setError('Voice recognition is not supported in this browser.');
      return;
    }
    setError(null);
    if (isVoiceActive) {
      stopListening();
    } else {
      startListening((text) => {
        sendMessage(text);
        closeSheet();
      });
    }
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={closeSheet}
      title="Voice Assistant"
      icon={<Mic className="w-5 h-5 text-rose-400" />}
      height="md"
    >
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <motion.button
          onClick={toggleListening}
          animate={{
            scale: isVoiceActive ? [1, 1.1, 1] : 1,
            boxShadow: isVoiceActive
              ? ['0 0 0 0 rgba(244, 63, 94, 0.4)', '0 0 0 30px rgba(244, 63, 94, 0)', '0 0 0 0 rgba(244, 63, 94, 0)']
              : '0 0 0 0 rgba(244, 63, 94, 0)',
          }}
          transition={{ repeat: isVoiceActive ? Infinity : 0, duration: 1.5 }}
          className={`w-32 h-32 rounded-full flex items-center justify-center border-2 transition-colors ${
            isVoiceActive
              ? 'bg-rose-500/20 border-rose-500 text-rose-400'
              : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'
          }`}
        >
          {isVoiceActive ? <Mic className="w-12 h-12" /> : <MicOff className="w-12 h-12" />}
        </motion.button>

        <div className="text-center">
          <div className="text-lg font-medium text-white mb-2">
            {isVoiceActive ? 'Listening...' : 'Tap to speak'}
          </div>
          {isSpeaking && (
            <div className="flex items-center justify-center gap-2 text-cyan-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">AI is speaking...</span>
            </div>
          )}
          {error && (
            <div className="text-rose-400 text-sm max-w-xs mt-2 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
              {error}
            </div>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
