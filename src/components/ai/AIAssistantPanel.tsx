'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from '@/store/chatStore';
import { useModelStore } from '@/store/modelStore';
import { useAIChat } from '@/hooks/useAIChat';
import { useVoice } from '@/hooks/useVoice';
import { useState, useRef, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { PART_MAP } from '@/data/engineParts';
import { Send, Mic, MicOff, Volume2, VolumeX, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function AIAssistantPanel() {
  const { messages, isLoading, currentInput, setCurrentInput, isSpeaking } = useChatStore();
  const { selectedPartId } = useModelStore();
  const { sendMessage } = useAIChat();
  const { isVoiceActive, isSupported, startListening, stopListening, speak, stopSpeaking } = useVoice();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedPart = selectedPartId ? PART_MAP[selectedPartId] : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!currentInput.trim() || isLoading) return;
    const text = currentInput.trim();
    setCurrentInput('');
    await sendMessage(text, (response) => {
      speak(response);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoice = () => {
    if (isVoiceActive) {
      stopListening();
    } else {
      startListening(async (transcript) => {
        await sendMessage(transcript, (response) => {
          speak(response);
        });
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* ─── Header ─────────────────────────────────────── */}
      <div className="flex-none">
        <GlassCard className="p-3 mb-2" corners>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#080d14]" />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-none">Smart AR Assistant</div>
              <div className="text-[11px] text-[#8892a4] mt-0.5">
                {isLoading ? (
                  <span className="text-cyan-400 flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" /> Thinking...
                  </span>
                ) : (
                  'AI Engine Inspector'
                )}
              </div>
            </div>

            {/* TTS toggle */}
            <button
              onClick={isSpeaking ? stopSpeaking : undefined}
              className="ml-auto p-2 rounded-lg hover:bg-white/10 transition-colors"
              title={isSpeaking ? 'Stop speaking' : 'Text-to-speech active'}
            >
              {isSpeaking ? (
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#4a5568]" />
              )}
            </button>
          </div>

          {/* Active Part Context */}
          {selectedPart && (
            <motion.div
              key={selectedPart.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 pt-2 border-t border-white/10"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: selectedPart.color }} />
                <span className="text-[11px] text-[#8892a4]">Viewing:</span>
                <span className="text-[11px] font-semibold" style={{ color: selectedPart.color }}>
                  {selectedPart.name}
                </span>
              </div>
            </motion.div>
          )}
        </GlassCard>
      </div>

      {/* ─── Messages ────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0 pb-2">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`flex-none w-7 h-7 rounded-lg flex items-center justify-center mt-0.5 ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30'
                  : 'bg-gradient-to-br from-cyan-500/20 to-emerald-600/20 border border-cyan-500/30'
              }`}>
                {msg.role === 'user' ? (
                  <User className="w-3.5 h-3.5 text-blue-400" />
                ) : (
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-blue-600/25 to-purple-600/20 border border-blue-500/20 text-white rounded-tr-sm'
                    : 'bg-white/[0.06] border border-white/10 text-[#d0daf0] rounded-tl-sm'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <div className="prose prose-invert prose-sm max-w-none
                    prose-p:my-1 prose-p:leading-relaxed
                    prose-strong:text-cyan-300 prose-strong:font-semibold
                    prose-ul:my-1 prose-li:my-0
                    prose-table:text-xs prose-th:text-cyan-400 prose-td:text-[#d0daf0]
                    prose-headings:text-white prose-headings:text-sm">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <span>{msg.content}</span>
                )}

                {msg.triggersAnimation && (
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] text-cyan-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Animation triggered
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-600/20 border border-cyan-500/30 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="bg-white/[0.06] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1.5 items-center">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                      style={{ animation: `blink 1.2s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* ─── Input ───────────────────────────────────────── */}
      <div className="flex-none pt-2">
        <GlassCard className="p-2">
          {/* Quick prompts */}
          {!selectedPart && (
            <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 border-b border-white/10 scrollbar-none">
              {['Cara kerja mesin?', 'Tips perawatan', 'Apa itu piston?'].map((q) => (
                <button
                  key={q}
                  onClick={() => { setCurrentInput(q); inputRef.current?.focus(); }}
                  className="flex-none text-[11px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10
                    text-[#8892a4] hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200 whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2 items-end">
            <input
              ref={inputRef}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={selectedPart ? `Tanya tentang ${selectedPart.name}...` : 'Tanya AI Assistant...'}
              disabled={isLoading}
              className="flex-1 bg-transparent text-sm text-white placeholder-[#4a5568] outline-none
                border-0 resize-none"
            />

            {/* Voice button */}
            {isSupported && (
              <button
                onClick={handleVoice}
                className={`flex-none w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isVoiceActive
                    ? 'bg-red-500/20 border border-red-500/40 text-red-400 pulse-ring'
                    : 'bg-white/[0.06] border border-white/10 text-[#4a5568] hover:text-cyan-400 hover:border-cyan-500/30'
                }`}
                title={isVoiceActive ? 'Stop recording' : 'Voice input'}
              >
                {isVoiceActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            )}

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!currentInput.trim() || isLoading}
              className="flex-none w-9 h-9 rounded-xl flex items-center justify-center
                bg-gradient-to-br from-cyan-500 to-blue-600 text-white
                hover:from-cyan-400 hover:to-blue-500 transition-all duration-200
                disabled:opacity-40 disabled:cursor-not-allowed
                shadow-lg shadow-cyan-500/20"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
