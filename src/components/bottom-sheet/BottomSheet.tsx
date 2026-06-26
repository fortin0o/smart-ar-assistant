'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  height?: 'md' | 'lg' | 'full';
}

const HEIGHT_MAP = {
  md: 'h-[50vh]',
  lg: 'h-[70vh]',
  full: 'h-[90vh]',
};

export function BottomSheet({ isOpen, onClose, title, icon, children, height = 'md' }: BottomSheetProps) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                onClose();
              }
            }}
            className={`fixed bottom-0 left-0 right-0 z-50 w-full md:w-auto md:min-w-[400px] md:max-w-xl md:left-auto md:right-4 md:bottom-4 md:rounded-3xl rounded-t-3xl safe-bottom ${HEIGHT_MAP[height]} flex flex-col`}
            style={{
              background: 'rgba(12, 18, 28, 0.85)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Drag Handle */}
            <div className="w-full flex justify-center pt-3 pb-2 md:hidden">
              <div className="w-12 h-1.5 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                {icon && <div className="text-white/80">{icon}</div>}
                <h2 className="text-lg font-semibold text-white tracking-wide">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors touch-target"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
