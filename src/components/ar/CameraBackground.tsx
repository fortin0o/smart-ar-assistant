'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CameraOff, RefreshCw, SwitchCamera } from 'lucide-react';
import { useARStore } from '@/store/arStore';

interface CameraBackgroundProps {
  videoStream?: MediaStream | null;
}

export function CameraBackground({ videoStream }: CameraBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setCameraPermission, setError, cameraPermission } = useARStore();
  const [ready, setReady] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  // Use existing stream or start our own
  useEffect(() => {
    if (videoStream && videoRef.current) {
      videoRef.current.srcObject = videoStream;
      videoRef.current.play().then(() => setReady(true)).catch(() => {});
      setCameraPermission('granted');
      return;
    }

    // Fallback: start camera if no stream provided
    let localStream: MediaStream | null = null;
    let cancelled = false;

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error('Camera API not supported');
        }

        localStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: facingMode }, width: { ideal: 1280 }, height: { ideal: 720 } },
        });

        if (cancelled) {
          localStream.getTracks().forEach(t => t.stop());
          return;
        }

        setCameraPermission('granted');

        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
          await videoRef.current.play();
          setReady(true);
        }
      } catch (err: unknown) {
        const error = err as { name?: string; message?: string };
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          setCameraPermission('denied');
          setError('Camera permission denied');
        } else {
          setError(error.message ?? 'Camera not available');
          setCameraPermission('denied');
        }
      }
    };

    startCamera();

    return () => {
      cancelled = true;
      if (localStream) {
        localStream.getTracks().forEach(t => t.stop());
      }
    };
  }, [facingMode, videoStream]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        playsInline
        muted
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.5s ease' }}
      />

      <AnimatePresence>
        {ready && (
          <motion.div
            key="cam-ready"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute inset-0 bg-black pointer-events-none"
          />
        )}
      </AnimatePresence>

      {ready && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {ready && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
          />
        </div>
      )}

      {!videoStream && (
        <button
          onClick={() => setFacingMode(prev => prev === 'environment' ? 'user' : 'environment')}
          className="absolute top-16 right-4 z-50 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/60 transition-colors"
          title="Switch Camera"
        >
          <SwitchCamera className="w-6 h-6" />
        </button>
      )}

      {cameraPermission === 'denied' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-4">
          <div className="p-4 rounded-2xl bg-red-500/20 border border-red-500/40">
            <CameraOff className="w-8 h-8 text-red-400" />
          </div>
          <div className="text-center px-6">
            <p className="text-white font-semibold mb-1">Camera access needed</p>
            <p className="text-sm text-zinc-400">Allow camera permission in your browser settings, then tap retry.</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-sm font-medium active:scale-95 transition-transform"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
