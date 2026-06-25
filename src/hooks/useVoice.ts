'use client';

// Extend window with Web Speech API types not in standard TS lib
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResult[];
  resultIndex: number;
}

import { useCallback, useRef } from 'react';
import { useChatStore } from '@/store/chatStore';
import { useModelStore } from '@/store/modelStore';

export function useVoice() {
  const { isVoiceActive, isSpeaking, setVoiceActive, setSpeaking, setCurrentInput, addMessage } =
    useChatStore();
  const { setAnimating } = useModelStore();
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const isSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const startListening = useCallback(
    (onTranscript: (text: string) => void) => {
      if (!isSupported) return;

      const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
      const recognition = new SR();
      recognition.lang = 'id-ID';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setVoiceActive(true);

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setCurrentInput(transcript);
        onTranscript(transcript);
      };

      recognition.onerror = () => setVoiceActive(false);
      recognition.onend = () => setVoiceActive(false);

      recognitionRef.current = recognition;
      recognition.start();
    },
    [isSupported, setVoiceActive, setCurrentInput]
  );

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setVoiceActive(false);
  }, [setVoiceActive]);

  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (typeof window === 'undefined') return;

      // Strip markdown for speech
      const cleanText = text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/#{1,6}\s/g, '')
        .replace(/\|.*?\|/g, '')
        .replace(/[-•]\s/g, '')
        .replace(/\n+/g, '. ')
        .replace(/🔧|🔄|📊|⚡|🌡️|⏱️|🛠️|🔬|📐|👋|⚠️|✅|❌/g, '')
        .trim();

      const synth = window.speechSynthesis;
      synthRef.current = synth;
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Pick a good Indonesian voice if available
      const voices = synth.getVoices();
      const idVoice = voices.find((v) => v.lang.startsWith('id'));
      if (idVoice) utterance.voice = idVoice;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
        onEnd?.();
      };
      utterance.onerror = () => setSpeaking(false);

      synth.speak(utterance);
    },
    [setSpeaking]
  );

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, [setSpeaking]);

  return {
    isSupported,
    isVoiceActive,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
}
