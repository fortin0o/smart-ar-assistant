'use client';

import { useCallback } from 'react';
import { useChatStore } from '@/store/chatStore';
import { useModelStore } from '@/store/modelStore';
import { getAIResponse, simulateAIThinking } from '@/services/ai/hardcodedAI';
import type { PartId } from '@/types';

export function useAIChat() {
  const { addMessage, setLoading, messages } = useChatStore();
  const { selectedPartId, setAnimating } = useModelStore();

  const sendMessage = useCallback(
    async (question: string, onResponse?: (text: string) => void) => {
      if (!question.trim()) return;

      // Add user message
      addMessage({
        role: 'user',
        content: question,
        partContext: selectedPartId,
      });

      setLoading(true);

      // Simulate AI thinking
      await simulateAIThinking(900 + Math.random() * 600);

      // Get hardcoded response
      const { response, triggersAnimation } = getAIResponse(question, selectedPartId as PartId | null);

      // Add AI response
      addMessage({
        role: 'assistant',
        content: response,
        partContext: selectedPartId,
        triggersAnimation,
      });

      // Trigger animation if applicable
      if (triggersAnimation) {
        setAnimating(true, triggersAnimation);
        setTimeout(() => setAnimating(false, null), 5000);
      }

      setLoading(false);
      onResponse?.(response);
    },
    [addMessage, setLoading, selectedPartId, setAnimating]
  );

  return { sendMessage, messages };
}
