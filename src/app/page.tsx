'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu } from 'lucide-react';

import { ARShell } from '@/components/layout/ARShell';
import { FloatingHeader } from '@/components/layout/FloatingHeader';
import { FABMenu } from '@/components/fab/FABMenu';
import { AISheet } from '@/components/bottom-sheet/AISheet';
import { VoiceSheet } from '@/components/bottom-sheet/VoiceSheet';
import { ObjectSheet } from '@/components/bottom-sheet/ObjectSheet';
import { AnimationSheet } from '@/components/bottom-sheet/AnimationSheet';
import { SettingsSheet } from '@/components/bottom-sheet/SettingsSheet';

// Lazy-load the heavy 3D scene (no SSR)
const ARScene = dynamic(
  () => import('@/components/ar/ARScene').then((m) => ({ default: m.ARScene })),
  { ssr: false }
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setShowIntro(false), 2600);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ─── Intro splash ─────────────────────────────────── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#020408] flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="absolute inset-0 bg-radial-gradient" />

            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 text-center"
            >
              <div className="relative inline-flex mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20
                  border border-cyan-500/30 flex items-center justify-center animate-float">
                  <Cpu className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="absolute inset-0 rounded-2xl glow-cyan opacity-50" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-1 text-glow-cyan tracking-tight">
                Smart AR
              </h1>
              <div className="text-base font-light text-cyan-400 mb-7 tracking-[0.3em] uppercase">
                Assistant
              </div>
              <div className="w-36 h-0.5 bg-white/10 rounded-full mx-auto overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.2, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                />
              </div>
              <p className="text-[10px] text-[#3a4556] mt-3 tracking-[0.2em]">INITIALIZING ENGINE INSPECTOR</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── App shell ────────────────────────────────────── */}
      <ARShell>
        <ARScene />
        <FloatingHeader />
        <FABMenu />

        {/* Bottom Sheets (Rendered into portals) */}
        <AISheet />
        <VoiceSheet />
        <ObjectSheet />
        <AnimationSheet />
        <SettingsSheet />
      </ARShell>
    </>
  );
}
