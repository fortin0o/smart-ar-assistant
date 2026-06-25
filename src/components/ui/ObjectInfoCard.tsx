'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useModelStore } from '@/store/modelStore';
import { PART_MAP, STATUS_CONFIG } from '@/data/engineParts';
import { GlassCard } from './GlassCard';
import { Cpu, Thermometer, Gauge, Zap } from 'lucide-react';

export function ObjectInfoCard() {
  const { selectedPartId } = useModelStore();
  const part = selectedPartId ? PART_MAP[selectedPartId] : null;

  return (
    <AnimatePresence mode="wait">
      {part ? (
        <motion.div
          key={part.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlassCard className="p-4" corners>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ backgroundColor: part.color }}
                  />
                  <span className="text-xs font-medium tracking-wider uppercase"
                    style={{ color: part.color }}>
                    {part.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white leading-tight">{part.name}</h3>
              </div>

              {/* Status Badge */}
              <span
                className="text-xs px-2.5 py-1 rounded-full font-semibold"
                style={{
                  color: STATUS_CONFIG[part.status].color,
                  background: STATUS_CONFIG[part.status].bg,
                  border: `1px solid ${STATUS_CONFIG[part.status].color}40`,
                }}
              >
                {STATUS_CONFIG[part.status].label}
              </span>
            </div>

            {/* Function */}
            <p className="text-sm text-[#8892a4] leading-relaxed mb-3">{part.function}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2">
              {part.rpm && (
                <StatItem icon={<Gauge className="w-3.5 h-3.5" />} label="Speed" value={part.rpm} color={part.color} />
              )}
              {part.temperature && (
                <StatItem icon={<Thermometer className="w-3.5 h-3.5" />} label="Temp" value={part.temperature} color={part.color} />
              )}
              {part.material && (
                <StatItem icon={<Cpu className="w-3.5 h-3.5" />} label="Material" value={part.material} color={part.color} />
              )}
              {part.animationKey && (
                <StatItem icon={<Zap className="w-3.5 h-3.5" />} label="Animation" value="Available" color="#10b981" />
              )}
            </div>
          </GlassCard>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <GlassCard className="p-4 text-center">
            <div className="text-4xl mb-2">🔩</div>
            <p className="text-sm text-[#4a5568] font-medium">
              Pilih bagian mesin untuk melihat informasi detail
            </p>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatItem({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04]">
      <span style={{ color }}>{icon}</span>
      <div className="min-w-0">
        <div className="text-[10px] text-[#4a5568] uppercase tracking-wider">{label}</div>
        <div className="text-xs text-white font-medium truncate">{value}</div>
      </div>
    </div>
  );
}
