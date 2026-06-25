'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { AIAssistantPanel } from '@/components/ai/AIAssistantPanel';
import { ObjectInfoCard } from '@/components/ui/ObjectInfoCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Cpu, Layers, MessageSquare, ChevronDown, ChevronUp, Zap } from 'lucide-react';

// Lazy load the heavy AR/3D scene
const ARScene = dynamic(
  () => import('@/components/ar/ARScene').then((m) => ({ default: m.ARScene })),
  { ssr: false }
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mobileTab, setMobileTab] = useState<'ar' | 'info' | 'ai'>('ar');
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowIntro(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ─── Intro Screen ──────────────────────────────────── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#020408] flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="absolute inset-0 bg-radial-gradient" />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 text-center"
            >
              {/* Logo */}
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20
                  border border-cyan-500/30 flex items-center justify-center animate-float">
                  <Cpu className="w-10 h-10 text-cyan-400" />
                </div>
                <div className="absolute inset-0 rounded-2xl glow-cyan opacity-60" />
              </div>

              <h1 className="text-4xl font-bold text-white mb-2 text-glow-cyan tracking-tight">
                Smart AR
              </h1>
              <div className="text-xl font-light text-cyan-400 mb-8 tracking-[0.3em] uppercase">
                Assistant
              </div>

              {/* Loading bar */}
              <div className="w-48 h-0.5 bg-white/10 rounded-full mx-auto overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                />
              </div>
              <p className="text-xs text-[#4a5568] mt-3 tracking-wider">INITIALIZING ENGINE INSPECTOR</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Main App ──────────────────────────────────────── */}
      <div className="h-dvh w-full flex flex-col overflow-hidden">

        {/* ══════════════════════════════════════════════════
            MOBILE LAYOUT (< md)
        ══════════════════════════════════════════════════ */}
        <div className="flex flex-col h-full md:hidden">

          {/* Tab bar */}
          <div className="flex-none glass border-b border-white/10 px-4 py-2 flex gap-1 justify-around">
            {(
              [
                { id: 'ar', icon: <Layers className="w-4 h-4" />, label: '3D View' },
                { id: 'info', icon: <Zap className="w-4 h-4" />, label: 'Object' },
                { id: 'ai', icon: <MessageSquare className="w-4 h-4" />, label: 'AI Chat' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMobileTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  mobileTab === tab.id
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-[#4a5568] hover:text-[#8892a4]'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* App name header */}
          <div className="flex-none px-4 pt-2 pb-1">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold tracking-wider text-white">SMART AR ASSISTANT</span>
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Tab content */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <AnimatePresence mode="wait">
              {mobileTab === 'ar' && (
                <motion.div
                  key="ar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <ARScene />
                </motion.div>
              )}

              {mobileTab === 'info' && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full overflow-y-auto p-4 space-y-3"
                >
                  <ObjectInfoCard />
                </motion.div>
              )}

              {mobileTab === 'ai' && (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full p-4 flex flex-col min-h-0"
                >
                  <AIAssistantPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            TABLET LAYOUT (md – lg)
        ══════════════════════════════════════════════════ */}
        <div className="hidden md:flex lg:hidden flex-col h-full">
          {/* Header */}
          <AppHeader />

          {/* Two column */}
          <div className="flex-1 min-h-0 flex gap-0">
            {/* Left: AR View */}
            <div className="flex-1 min-w-0">
              <ARScene />
            </div>

            {/* Right: Info + Chat */}
            <div className="w-80 flex flex-col gap-3 p-3 border-l border-white/10 overflow-y-auto">
              <ObjectInfoCard />
              <div className="flex-1 min-h-0 flex flex-col" style={{ minHeight: '400px' }}>
                <AIAssistantPanel />
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            DESKTOP LAYOUT (≥ lg)
        ══════════════════════════════════════════════════ */}
        <div className="hidden lg:flex flex-col h-full">
          {/* Header */}
          <AppHeader />

          {/* Main Content */}
          <div className="flex-1 min-h-0 flex">
            {/* Left: AR Scene */}
            <div className="flex-1 min-w-0">
              <ARScene />
            </div>

            {/* Right Sidebar */}
            <div className="w-96 flex flex-col border-l border-white/10 overflow-hidden">
              {/* Object Info */}
              <div className="flex-none p-4 pb-0">
                <div className="text-[10px] text-[#4a5568] uppercase tracking-widest mb-2 font-medium">
                  Selected Object
                </div>
                <ObjectInfoCard />
              </div>

              {/* Divider */}
              <div className="mx-4 my-4 border-t border-white/10" />

              {/* AI Panel */}
              <div className="flex-1 min-h-0 px-4 pb-4 flex flex-col">
                <div className="text-[10px] text-[#4a5568] uppercase tracking-widest mb-2 font-medium">
                  AI Assistant
                </div>
                <div className="flex-1 min-h-0">
                  <AIAssistantPanel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AppHeader() {
  return (
    <div className="flex-none glass-strong border-b border-white/10 px-5 py-3 flex items-center gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
          <Cpu className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <div className="text-sm font-bold text-white leading-none tracking-wide">SMART AR</div>
          <div className="text-[10px] text-cyan-400 tracking-[0.25em] uppercase mt-0.5">Assistant</div>
        </div>
      </div>

      {/* Status dots */}
      <div className="ml-auto flex items-center gap-3">
        <StatusDot color="bg-emerald-400" label="Engine" />
        <StatusDot color="bg-blue-400" label="3D Active" />
        <StatusDot color="bg-cyan-400" label="AI Ready" />
      </div>
    </div>
  );
}

function StatusDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-1.5 h-1.5 rounded-full ${color} animate-pulse`} />
      <span className="text-[11px] text-[#8892a4] font-medium">{label}</span>
    </div>
  );
}
