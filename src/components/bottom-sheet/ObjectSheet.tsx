'use client';

import { BottomSheet } from './BottomSheet';
import { useUIStore } from '@/store/uiStore';
import { useModelStore } from '@/store/modelStore';
import { PART_MAP } from '@/data/engineParts';
import { Info, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export function ObjectSheet() {
  const { activeSheet, closeSheet } = useUIStore();
  const { selectedPartId } = useModelStore();
  const isOpen = activeSheet === 'object';
  
  const part = selectedPartId ? PART_MAP[selectedPartId] : null;

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={closeSheet}
      title={part ? part.name : 'Object Info'}
      icon={<Info className="w-5 h-5 text-blue-400" />}
      height="md"
    >
      {part ? (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="text-sm text-blue-400 mb-1 font-medium tracking-wider uppercase">Category</div>
            <div className="text-lg font-semibold text-white">{part.category}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="p-4 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="text-sm text-blue-400 mb-1 font-medium tracking-wider uppercase">Function</div>
            <div className="text-zinc-300 leading-relaxed">{part.function}</div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3"
            >
              <Activity className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider mb-0.5">Status</div>
                <div className="text-sm font-medium text-emerald-400 capitalize">{part.status}</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3"
            >
              <Cpu className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider mb-0.5">Material</div>
                <div className="text-sm font-medium text-zinc-200">{part.material || 'Standard Alloy'}</div>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-zinc-400">
          <ShieldAlert className="w-12 h-12 mb-3 opacity-20" />
          <p>No part selected</p>
        </div>
      )}
    </BottomSheet>
  );
}
