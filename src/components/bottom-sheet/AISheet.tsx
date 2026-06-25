'use client';

import { useRef, useEffect } from 'react';
import { BottomSheet } from './BottomSheet';
import { useUIStore } from '@/store/uiStore';
import { useChatStore } from '@/store/chatStore';
import { useAIChat } from '@/hooks/useAIChat';
import { MessageSquare, Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const SUGGESTED_QUESTIONS = [
  "What is this part?",
  "How does it work?",
  "What maintenance is required?"
];

export function AISheet() {
  const { activeSheet, closeSheet } = useUIStore();
  const { messages, isLoading, currentInput, setCurrentInput } = useChatStore();
  const { sendMessage } = useAIChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isOpen = activeSheet === 'ai';

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      // Small delay to allow sheet animation to start before focusing
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!currentInput.trim() || isLoading) return;
    sendMessage(currentInput);
    setCurrentInput('');
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={closeSheet}
      title="AI Assistant"
      icon={<MessageSquare className="w-5 h-5 text-cyan-400" />}
      height="lg"
    >
      <div className="flex flex-col h-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[90%] ${
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-cyan-500/20 text-cyan-400'
                }`}
              >
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div
                className={`p-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-blue-600/20 border border-blue-500/30 text-white'
                    : 'bg-white/5 border border-white/10 text-zinc-300'
                }`}
              >
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-cyan-400" />
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-cyan-400" />
                <span className="text-sm text-zinc-400">Analyzing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentInput(q);
                  setTimeout(() => handleSubmit(), 50);
                }}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 hover:bg-white/10 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="relative mt-auto pt-2 border-t border-white/10">
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Ask about the engine..."
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!currentInput.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 mt-1 p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </BottomSheet>
  );
}
