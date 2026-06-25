'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useARStore } from '@/store/arStore';
import { useModelStore } from '@/store/modelStore';
import { ENGINE_PARTS } from '@/data/engineParts';
import { GlassCard } from '../ui/GlassCard';
import { ZoomIn, ZoomOut, RotateCcw, Layers, Box, Info } from 'lucide-react';

// Lazy load the heavy 3D canvas
const EngineModel = dynamic(
  () => import('../model/EngineModel').then((m) => ({ default: m.EngineModel })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#020408]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500/50 border-t-cyan-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-cyan-400 font-medium">Loading 3D Engine...</p>
        </div>
      </div>
    ),
  }
);

export function ARScene() {
  const { mode } = useARStore();
  const { selectedPartId, setSelectedPart, setScale, scale, isExploded, setExploded, resetModel } =
    useModelStore();

  return (
    <div className="relative w-full h-full bg-[#020408] overflow-hidden scanline-overlay">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-radial-gradient" />

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <EngineModel />
      </div>

      {/* ─── HUD Top Bar ───────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 p-3 flex items-start justify-between pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="pointer-events-auto"
        >
          <GlassCard className="px-3 py-2 flex items-center gap-2">
            <Box className="w-4 h-4 text-cyan-400" />
            <div>
              <div className="text-[10px] text-[#4a5568] uppercase tracking-wider">Mode</div>
              <div className="text-xs font-semibold text-cyan-400">3D Demo View</div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Status indicators */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-2 pointer-events-auto"
        >
          <GlassCard className="px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-medium">ENGINE ONLINE</span>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* ─── Part Selector (bottom-left) ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-20 left-3 flex flex-col gap-1.5"
      >
        {ENGINE_PARTS.map((part) => (
          <button
            key={part.id}
            onClick={() => setSelectedPart(selectedPartId === part.id ? null : part.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 text-left
              border backdrop-blur-md ${
                selectedPartId === part.id
                  ? 'text-white border-opacity-70'
                  : 'text-[#8892a4] bg-black/30 border-white/10 hover:text-white hover:bg-white/10'
              }`}
            style={
              selectedPartId === part.id
                ? {
                    backgroundColor: `${part.color}25`,
                    borderColor: `${part.color}60`,
                    color: part.color,
                    boxShadow: `0 0 12px ${part.color}30`,
                  }
                : {}
            }
          >
            <span className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full flex-none"
                style={{ backgroundColor: selectedPartId === part.id ? part.color : '#4a5568' }}
              />
              {part.name}
            </span>
          </button>
        ))}
      </motion.div>

      {/* ─── Controls (bottom-right) ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-20 right-3 flex flex-col gap-2"
      >
        <GlassCard className="flex flex-col gap-1 p-1.5">
          <ControlBtn icon={<ZoomIn className="w-4 h-4" />} onClick={() => setScale(scale + 0.2)} title="Zoom in" />
          <div className="w-full h-px bg-white/10" />
          <ControlBtn icon={<ZoomOut className="w-4 h-4" />} onClick={() => setScale(scale - 0.2)} title="Zoom out" />
        </GlassCard>

        <ControlBtn
          icon={<RotateCcw className="w-4 h-4" />}
          onClick={resetModel}
          title="Reset"
          className="glass p-2"
        />

        <ControlBtn
          icon={<Layers className="w-4 h-4" />}
          onClick={() => setExploded(!isExploded)}
          title="Explode view"
          className={`glass p-2 ${isExploded ? 'text-cyan-400' : 'text-[#4a5568]'}`}
        />
      </motion.div>

      {/* ─── Crosshair / AR Target ───────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-24 h-24 opacity-20">
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-400 rounded-tl" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-400 rounded-tr" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-400 rounded-bl" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-400 rounded-br" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
        </div>
      </div>

      {/* ─── Tip bar ─────────────────────────────────────── */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <GlassCard className="px-3 py-1.5 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-cyan-400 flex-none" />
            <p className="text-[11px] text-[#8892a4]">
              Tap komponen • Scroll untuk zoom • Drag untuk rotasi
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}

function ControlBtn({
  icon,
  onClick,
  title,
  className,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  title: string;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 text-[#8892a4] hover:text-cyan-400 transition-colors duration-200 flex items-center justify-center ${className ?? ''}`}
    >
      {icon}
    </button>
  );
}
