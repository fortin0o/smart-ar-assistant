'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: 'cyan' | 'blue' | 'purple' | 'none';
  corners?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  glow = 'none',
  corners = false,
  onClick,
}: GlassCardProps) {
  const glowClass = {
    cyan: 'glow-cyan',
    blue: 'glow-blue',
    purple: 'glow-purple',
    none: '',
  }[glow];

  return (
    <div
      onClick={onClick}
      className={cn(
        'glass relative',
        glowClass,
        corners && 'hud-corners',
        onClick && 'cursor-pointer hover:bg-white/[0.07] transition-colors duration-200',
        className
      )}
    >
      {children}
    </div>
  );
}
