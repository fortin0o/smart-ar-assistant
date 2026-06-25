'use client';

import { useARStore } from '@/store/arStore';
import { Cpu } from 'lucide-react';

export function FloatingHeader() {
  const { isTracking } = useARStore();

  return (
    <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none flex justify-center pt-6">
      <div
        className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-2xl shadow-xl transition-all duration-300"
        style={{
          background: 'rgba(8,13,20,0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
          <Cpu className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white tracking-wide">Smart AR</span>
          <div className="flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full ${isTracking ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}
            />
            <span className="text-[10px] text-white/60 tracking-wider uppercase">
              {isTracking ? 'Tracking Active' : 'Scanning...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
