'use client';

import { BottomSheet } from './BottomSheet';
import { useUIStore } from '@/store/uiStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useGLTFModelStore } from '@/store/gltfModelStore';
import { Settings, Volume2, VolumeX, Moon, Sun, Monitor, Maximize, Box, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useModelStore } from '@/store/modelStore';

export function SettingsSheet() {
  const { activeSheet, closeSheet } = useUIStore();
  const {
    voiceEnabled, setVoiceEnabled,
    modelScale, setModelScale,
    theme, setTheme
  } = useSettingsStore();

  const { useGLTFModel, setUseGLTFModel, modelStatus } = useGLTFModelStore();
  const { setScale } = useModelStore();

  const isOpen = activeSheet === 'settings';

  const handleScaleChange = (val: number) => {
    setModelScale(val);
    setScale(val);
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={closeSheet}
      title="Settings"
      icon={<Settings className="w-5 h-5 text-zinc-400" />}
      height="lg"
    >
      <div className="flex flex-col gap-6 pt-2">
        {/* Model Toggle */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Box className="w-5 h-5 text-zinc-400" />
            <div className="font-medium text-white">3D Model</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setUseGLTFModel(false)}
              className={`flex-1 p-3 rounded-xl border text-sm font-medium transition-colors ${
                !useGLTFModel
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                  : 'bg-black/20 text-zinc-400 border-white/5 hover:bg-white/5'
              }`}
            >
              <div className="text-xs mb-1">Procedural</div>
              <div className="text-[10px] opacity-60">Built-in engine</div>
            </button>
            <button
              onClick={() => {
                setUseGLTFModel(true);
              }}
              className={`flex-1 p-3 rounded-xl border text-sm font-medium transition-colors ${
                useGLTFModel
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                  : 'bg-black/20 text-zinc-400 border-white/5 hover:bg-white/5'
              }`}
            >
              <div className="text-xs mb-1">GLTF Model</div>
              <div className="text-[10px] opacity-60">
                {modelStatus === 'loading' ? 'Loading...' : modelStatus === 'error' ? 'Not found' : 'External .gltf'}
              </div>
            </button>
          </div>
          {useGLTFModel && modelStatus === 'none' && (
            <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              <p>Place your <code className="text-amber-200">engine.gltf</code> (with <code className="text-amber-200">.bin</code> and textures) in <code className="text-amber-200">public/models/</code></p>
              <p className="mt-1">Part names in the GLTF should match: Piston, Crankshaft, Valve, Cylinder, Camshaft, SparkPlug</p>
            </div>
          )}
        </div>

        {/* Voice Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-xl ${voiceEnabled ? 'bg-rose-500/20 text-rose-400' : 'bg-white/10 text-zinc-400'}`}>
              {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </div>
            <div>
              <div className="font-medium text-white">Voice Responses</div>
              <div className="text-sm text-zinc-400">AI will speak its answers aloud</div>
            </div>
          </div>
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative ${voiceEnabled ? 'bg-rose-500' : 'bg-zinc-700'}`}
          >
            <motion.div
              animate={{ x: voiceEnabled ? 24 : 0 }}
              className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm"
            />
          </button>
        </div>

        {/* Scale Slider */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Maximize className="w-5 h-5 text-zinc-400" />
            <div className="font-medium text-white">Model Scale</div>
          </div>
          <input
            type="range"
            min="0.3"
            max="3"
            step="0.1"
            value={modelScale}
            onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer accent-zinc-300"
          />
          <div className="flex justify-between text-xs text-zinc-500 mt-2">
            <span>Small</span>
            <span>{modelScale.toFixed(1)}x</span>
            <span>Large</span>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="font-medium text-white mb-4">App Theme</div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
              { id: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
              { id: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as 'dark' | 'light' | 'system')}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-colors ${
                  theme === t.id
                    ? 'bg-zinc-100 text-zinc-900 border-zinc-200'
                    : 'bg-black/20 text-zinc-400 border-white/5 hover:bg-white/5 hover:text-white'
                }`}
              >
                {t.icon}
                <span className="text-sm font-medium">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
