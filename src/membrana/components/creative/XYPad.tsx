import { useState, useRef, useEffect } from 'react';
import { Crosshair, RotateCcw, Zap, Lock, Unlock, Pause, Play } from 'lucide-react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useXYPadMidi } from '../../hooks/useMidi';
import { useSquareContainer } from '../../hooks/useSquareContainer';

type XYMode = 'manual' | 'lfo' | 'wavetable' | 'random' | 'samplehold';
type Waveform = 'sine' | 'triangle' | 'saw-up' | 'saw-down' | 'square' | 'pulse' | 'noise' | 'smooth-noise' | 'chaos';
type SyncRate = '1/64' | '1/32' | '1/16' | '1/8' | '1/4' | '1/2' | '1' | '2';
type WavetablePreset = 'circle' | 'lissajous' | 'figure8' | 'spiral' | 'orbit' | 'drift';

export function XYPad() {
  const { config } = useBreakpoint();
  
  const xyGridHeight = 420;

  // Position & interaction
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const padRef = useRef<HTMLDivElement>(null);

  // Mode
  const [mode, setMode] = useState<XYMode>('manual');

  // Clamp Area
  const [clampEnabled, setClampEnabled] = useState(false);
  const [clampX, setClampX] = useState(20);
  const [clampY, setClampY] = useState(20);
  const [clampWidth, setClampWidth] = useState(60);
  const [clampHeight, setClampHeight] = useState(60);

  // Mapping
  const [destination, setDestination] = useState('INPUT A');
  const [channel, setChannel] = useState(1);
  const [ccX, setCcX] = useState(1);
  const [ccY, setCcY] = useState(2);
  const [rangeXMin, setRangeXMin] = useState(0);
  const [rangeXMax, setRangeXMax] = useState(127);
  const [rangeYMin, setRangeYMin] = useState(0);
  const [rangeYMax, setRangeYMax] = useState(127);
  const [invertX, setInvertX] = useState(false);
  const [invertY, setInvertY] = useState(false);
  const [quantize, setQuantize] = useState(0);

  // LFO Engine
  const [lfoEnabled, setLfoEnabled] = useState(false);
  const [lfoSync, setLfoSync] = useState(true);
  const [lfoSyncRate, setLfoSyncRate] = useState<SyncRate>('1/4');
  const [lfoFreeHz, setLfoFreeHz] = useState(2);
  const [lfoDepth, setLfoDepth] = useState(80);
  const [lfoSmoothing, setLfoSmoothing] = useState(50);
  const [lfoPhase, setLfoPhase] = useState(0);
  const [lfoLinkXY, setLfoLinkXY] = useState(false);
  const [lfoWaveformX, setLfoWaveformX] = useState<Waveform>('sine');
  const [lfoWaveformY, setLfoWaveformY] = useState<Waveform>('sine');
  
  // Randomized
  const [randomized, setRandomized] = useState(false);
  const [randomSeed, setRandomSeed] = useState(Math.floor(Math.random() * 10000));
  const [randomSeedLocked, setRandomSeedLocked] = useState(false);
  const [randomProbability, setRandomProbability] = useState(100);

  // Wavetable
  const [wavetablePreset, setWavetablePreset] = useState<WavetablePreset>('circle');
  const [wavetableResolution, setWavetableResolution] = useState(32);
  const [wavetableMorph, setWavetableMorph] = useState(0);
  
  // Inspector Tab State
  const [inspectorTab, setInspectorTab] = useState<'engine' | 'route' | 'advanced'>('engine');

  const lfoPhaseRef = useRef(0);
  const animationFrameRef = useRef<number>();

  // MIDI Output Hook
  const { sendXY } = useXYPadMidi(destination, channel, ccX, ccY);

  // Auto-activar LFO/Randomized cuando se cambia de modo
  useEffect(() => {
    if (mode === 'random' || mode === 'samplehold') {
      setRandomized(true);
      setLfoEnabled(true);
    } else if (mode === 'wavetable') {
      setLfoEnabled(true);
    } else if (mode === 'lfo') {
      setLfoEnabled(true);
    }
  }, [mode]);

  useEffect(() => {
    let finalX = invertX ? 100 - position.x : position.x;
    let finalY = invertY ? 100 - position.y : position.y;
    sendXY(finalX, finalY, rangeXMin, rangeXMax, rangeYMin, rangeYMax);
  }, [position.x, position.y, invertX, invertY, rangeXMin, rangeXMax, rangeYMin, rangeYMax, sendXY]);

  const updatePosition = (clientX: number, clientY: number) => {
    if (!padRef.current || isHolding) return;

    const rect = padRef.current.getBoundingClientRect();
    let x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    let y = Math.max(0, Math.min(100, ((rect.bottom - clientY) / rect.height) * 100));

    if (clampEnabled) {
      x = Math.max(clampX, Math.min(clampX + clampWidth, x));
      y = Math.max(clampY, Math.min(clampY + clampHeight, y));
    }

    setPosition({ x, y });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (mode === 'manual' && !isHolding) {
      setIsDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
      updatePosition(e.clientX, e.clientY);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging && mode === 'manual' && !isHolding) {
      updatePosition(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const getWaveformValue = (phase: number, waveform: Waveform): number => {
    const p = (phase % (Math.PI * 2)) / (Math.PI * 2);
    switch (waveform) {
      case 'sine': return Math.sin(phase);
      case 'triangle': return p < 0.5 ? p * 4 - 1 : 3 - p * 4;
      case 'saw-up': return p * 2 - 1;
      case 'saw-down': return 1 - p * 2;
      case 'square': return p < 0.5 ? 1 : -1;
      case 'pulse': return p < 0.25 ? 1 : -1;
      case 'noise': return Math.random() * 2 - 1;
      case 'smooth-noise': return Math.sin(Math.random() * Math.PI * 2);
      case 'chaos': return Math.sin(phase * 1.3) * Math.cos(phase * 2.7) * 0.7;
      default: return Math.sin(phase);
    }
  };

  const getWavetablePosition = (phase: number, preset: WavetablePreset, morph: number): { x: number; y: number } => {
    const p = (phase % (Math.PI * 2)) / (Math.PI * 2);
    const morphFactor = morph / 100;
    
    switch (preset) {
      case 'circle':
        return { x: 50 + Math.cos(phase) * 40, y: 50 + Math.sin(phase) * 40 };
      case 'lissajous':
        return {
          x: 50 + Math.sin(phase * (2 + morphFactor * 2)) * 40,
          y: 50 + Math.sin(phase * (3 + morphFactor * 2)) * 40
        };
      case 'figure8':
        return { x: 50 + Math.sin(phase * 2) * 40, y: 50 + Math.sin(phase) * 40 };
      case 'spiral':
        const radius = 20 + p * 20 * (1 + morphFactor);
        return { x: 50 + Math.cos(phase) * radius, y: 50 + Math.sin(phase) * radius };
      case 'orbit':
        return {
          x: 50 + Math.cos(phase) * (30 + Math.sin(phase * 3) * 10 * morphFactor),
          y: 50 + Math.sin(phase) * (30 + Math.cos(phase * 3) * 10 * morphFactor)
        };
      case 'drift':
        return { x: 50 + Math.sin(phase * 0.5) * 40, y: 50 + Math.sin(phase * 1.5) * 40 };
      default:
        return { x: 50, y: 50 };
    }
  };

  useEffect(() => {
    if (!lfoEnabled || isHolding) return;

    const animate = () => {
      let rate = lfoFreeHz;
      if (lfoSync) {
        const bpm = 120;
        const beatsPerSecond = bpm / 60;
        const syncRates: Record<SyncRate, number> = {
          '1/64': beatsPerSecond * 16, '1/32': beatsPerSecond * 8, '1/16': beatsPerSecond * 4,
          '1/8': beatsPerSecond * 2, '1/4': beatsPerSecond, '1/2': beatsPerSecond / 2,
          '1': beatsPerSecond / 4, '2': beatsPerSecond / 8
        };
        rate = syncRates[lfoSyncRate];
      }

      lfoPhaseRef.current += (rate * Math.PI * 2) / 60;
      const phaseWithOffset = lfoPhaseRef.current + (lfoPhase * Math.PI * 2) / 360;

      let newX: number, newY: number;

      if (mode === 'wavetable') {
        const pos = getWavetablePosition(phaseWithOffset, wavetablePreset, wavetableMorph);
        newX = pos.x;
        newY = pos.y;
      } else if (mode === 'random') {
        if (randomized && Math.random() * 100 < randomProbability) {
          const rangeX = clampEnabled ? clampWidth : 80;
          const rangeY = clampEnabled ? clampHeight : 80;
          const offsetX = clampEnabled ? clampX : 10;
          const offsetY = clampEnabled ? clampY : 10;
          newX = offsetX + Math.random() * rangeX;
          newY = offsetY + Math.random() * rangeY;
        } else {
          newX = position.x;
          newY = position.y;
        }
      } else if (mode === 'samplehold') {
        if (Math.floor(lfoPhaseRef.current / (Math.PI / 4)) !== Math.floor((lfoPhaseRef.current - (rate * Math.PI * 2) / 60) / (Math.PI / 4))) {
          const rangeX = clampEnabled ? clampWidth : 60;
          const rangeY = clampEnabled ? clampHeight : 60;
          const offsetX = clampEnabled ? clampX : 20;
          const offsetY = clampEnabled ? clampY : 20;
          newX = offsetX + Math.random() * rangeX;
          newY = offsetY + Math.random() * rangeY;
        } else {
          newX = position.x;
          newY = position.y;
        }
      } else {
        const depthFactor = lfoDepth / 100;
        const smoothFactor = lfoSmoothing / 100;
        const waveX = getWaveformValue(phaseWithOffset, lfoWaveformX);
        const waveY = lfoLinkXY ? waveX : getWaveformValue(phaseWithOffset + Math.PI / 2, lfoWaveformY);
        const targetX = 50 + waveX * 40 * depthFactor;
        const targetY = 50 + waveY * 40 * depthFactor;
        newX = position.x + (targetX - position.x) * (1 - smoothFactor * 0.9);
        newY = position.y + (targetY - position.y) * (1 - smoothFactor * 0.9);
      }

      if (clampEnabled) {
        newX = Math.max(clampX, Math.min(clampX + clampWidth, newX));
        newY = Math.max(clampY, Math.min(clampY + clampHeight, newY));
      }

      setPosition({ x: Math.max(0, Math.min(100, newX)), y: Math.max(0, Math.min(100, newY)) });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, [lfoEnabled, mode, lfoSync, lfoSyncRate, lfoFreeHz, lfoDepth, lfoSmoothing, lfoPhase, lfoLinkXY, lfoWaveformX, lfoWaveformY, wavetablePreset, wavetableMorph, randomized, randomProbability, clampEnabled, clampX, clampY, clampWidth, clampHeight, isHolding, position.x, position.y]);

  const handleReset = () => {
    setPosition({ x: 50, y: 50 });
    lfoPhaseRef.current = 0;
  };

  const handleRandomize = () => {
    if (!randomSeedLocked) setRandomSeed(Math.floor(Math.random() * 10000));
    lfoPhaseRef.current = randomSeed;
  };

  const handleResetPhase = () => {
    lfoPhaseRef.current = 0;
  };

  return (
    <div className="h-full flex gap-2 overflow-hidden">
      {/* LEFT SIDE - XY Controller */}
      <div className="flex-1 flex flex-col gap-1.5 min-w-0 overflow-hidden">
        {/* Header Row */}
        <div className="flex items-center justify-between px-3 py-1.5 chrome-panel rounded-lg" style={{ height: '32px', flexShrink: 0 }}>
          <div className="flex items-center gap-2">
            {lfoEnabled && mode !== 'manual' && (
              <span className="text-[9px] px-2 py-0.5 rounded bg-white/10 text-white border border-white/30 uppercase tracking-wider font-bold" style={{ 
                boxShadow: '0 0 12px rgba(255,255,255,0.4), inset 0 0 8px rgba(255,255,255,0.15)'
              }}>
                {mode === 'lfo' ? 'LFO' : mode === 'wavetable' ? 'Wave' : mode === 'random' ? 'Rnd' : 'S&H'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as XYMode)}
              className="h-7 px-2 pr-6 bg-white/5 border border-white/20 rounded text-[10px] text-white/90 font-medium uppercase tracking-wider outline-none focus:border-[#00d9ff]/60 appearance-none cursor-pointer"
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'right 4px center', 
                backgroundSize: '12px' 
              }}
            >
              <option value="manual" style={{ background: '#080a0e', color: '#fff' }}>Manual</option>
              <option value="lfo" style={{ background: '#080a0e', color: '#fff' }}>LFO XY</option>
              <option value="wavetable" style={{ background: '#080a0e', color: '#fff' }}>Wavetable XY</option>
              <option value="random" style={{ background: '#080a0e', color: '#fff' }}>Random Walk</option>
              <option value="samplehold" style={{ background: '#080a0e', color: '#fff' }}>Sample & Hold</option>
            </select>

            <button
              onClick={() => setIsHolding(!isHolding)}
              className={`btn-chrome w-7 h-7 rounded flex items-center justify-center transition-all ${
                isHolding ? 'bg-gradient-to-br from-[#00d9ff]/20 to-[#00d9ff]/10 border-[#00d9ff]/60' : ''
              }`}
            >
              {isHolding ? <Pause className="w-3 h-3 text-[#00d9ff]" /> : <Play className="w-3 h-3 text-white/70" />}
            </button>

            <button onClick={handleReset} className="btn-chrome w-7 h-7 rounded flex items-center justify-center">
              <RotateCcw className="w-3 h-3 text-white/70" />
            </button>
          </div>
        </div>

        {/* XY Grid */}
        <div 
          className="chrome-panel rounded-lg flex items-center justify-center overflow-hidden"
          style={{ height: `${xyGridHeight}px`, flexShrink: 0 }}
        >
          <div className="relative w-full h-full">
            <div
              ref={padRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className={`w-full h-full relative bg-gradient-to-br from-black/40 to-black/20 border overflow-hidden touch-none ${ 
                mode === 'manual' && !isHolding ? 'cursor-crosshair border-white/20' : 'cursor-not-allowed border-white/30'
              }`}
              style={{ touchAction: 'none', borderRadius: 'inherit' }}
            >
              {/* Grid */}
              <div className="absolute inset-0 pointer-events-none">
                {[25, 50, 75].map((pos) => (
                  <div key={`v-${pos}`} className="absolute top-0 bottom-0 w-px bg-white/10" style={{ left: `${pos}%` }}></div>
                ))}
                {[25, 50, 75].map((pos) => (
                  <div key={`h-${pos}`} className="absolute left-0 right-0 h-px bg-white/10" style={{ top: `${pos}%` }}></div>
                ))}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Crosshair className="w-5 h-5 text-white/20" strokeWidth={1} />
                </div>
              </div>

              {/* Clamp Area - HIDDEN (functionality preserved) */}
              {/* {clampEnabled && (
                <div
                  className="absolute border-2 border-dashed border-[#f59e0b]/50 rounded pointer-events-none bg-[#f59e0b]/5"
                  style={{ left: `${clampX}%`, bottom: `${clampY}%`, width: `${clampWidth}%`, height: `${clampHeight}%` }}
                >
                  <div className="absolute top-0 left-0 text-[8px] text-[#fbbf24] font-mono px-1 bg-black/60 rounded-br">CLAMP</div>
                </div>
              )} */}

              {/* Cursor */}
              <div
                className="absolute rounded-full"
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  left: `${position.x}%`, 
                  top: `${100 - position.y}%`, 
                  transform: (isDragging || lfoEnabled) ? 'translate(-50%, -50%) scale(1.15)' : 'translate(-50%, -50%)' 
                }}
              >
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: lfoEnabled 
                      ? 'radial-gradient(circle, rgba(212, 175, 135, 1) 0%, rgba(212, 175, 135, 0.8) 40%, rgba(190, 155, 115, 0.4) 100%)'
                      : 'radial-gradient(circle, rgba(212, 175, 135, 1) 0%, rgba(212, 175, 135, 0.8) 40%, rgba(190, 155, 115, 0.4) 100%)',
                    boxShadow: lfoEnabled
                      ? '0 0 20px rgba(212, 175, 135, 0.8), 0 0 40px rgba(212, 175, 135, 0.4)'
                      : '0 0 12px rgba(212, 175, 135, 0.7), 0 0 20px rgba(212, 175, 135, 0.3)'
                  }}
                ></div>
                <div className="absolute inset-1 bg-white rounded-full shadow-inner"></div>
              </div>

              {(isDragging || lfoEnabled) && (
                <div
                  className="absolute w-24 h-24 rounded-full blur-2xl pointer-events-none"
                  style={{ 
                    left: `${position.x}%`, 
                    top: `${100 - position.y}%`, 
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(212, 175, 135, 0.2) 0%, transparent 70%)'
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT INSPECTOR - TAB SYSTEM */}
      <div style={{ width: `${config.inspectorWidth}px`, minWidth: `${config.inspectorMinWidth}px`, maxWidth: `${config.inspectorMaxWidth}px`, flexShrink: 0 }} className="flex flex-col gap-2">
        {/* TABS - TÁCTIL 56px */}
        <div className="flex gap-1 chrome-panel rounded-lg p-1" style={{ height: '56px', flexShrink: 0 }}>
          <button
            onClick={() => setInspectorTab('engine')}
            className={`flex-1 rounded flex flex-col items-center justify-center text-[9px] font-bold uppercase tracking-wider transition-all ${
              inspectorTab === 'engine'
                ? 'bg-gradient-to-br from-white/15 to-white/10 text-white border border-white/30 shadow-[0_0_12px_rgba(227,231,236,0.5)]'
                : 'bg-white/5 text-white/50 border border-white/10'
            }`}
          >
            <Zap className="w-4 h-4 mb-0.5" />
            Engine
          </button>
          <button
            onClick={() => setInspectorTab('route')}
            className={`flex-1 rounded flex flex-col items-center justify-center text-[9px] font-bold uppercase tracking-wider transition-all ${
              inspectorTab === 'route'
                ? 'bg-gradient-to-br from-[#00d9ff]/20 to-[#00d9ff]/10 text-[#00d9ff] border border-[#00d9ff]/40 shadow-[0_0_12px_rgba(0,217,255,0.5)]'
                : 'bg-white/5 text-white/50 border border-white/10'
            }`}
          >
            Route
          </button>
          <button
            onClick={() => setInspectorTab('advanced')}
            className={`flex-1 rounded flex flex-col items-center justify-center text-[9px] font-bold uppercase tracking-wider transition-all ${
              inspectorTab === 'advanced'
                ? 'bg-gradient-to-br from-[#f59e0b]/20 to-[#f59e0b]/10 text-[#fbbf24] border border-[#f59e0b]/40 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                : 'bg-white/5 text-white/50 border border-white/10'
            }`}
          >
            Advanced
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar space-y-2">
          {/* ========== ENGINE TAB ========== */}
          {inspectorTab === 'engine' && (
            <>
              {/* LFO ENGINE - SIEMPRE VISIBLE */}
              <div className="glass-panel rounded-lg overflow-hidden">
                <div className="w-full flex items-center justify-between px-3 py-2" style={{ minHeight: '44px' }}>
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5" style={{ color: '#e3e7ec' }} />
                    <h4 className="text-[10px] font-bold text-white/90 tracking-wide uppercase">LFO Engine</h4>
                  </div>
                  <button
                    onClick={() => setLfoEnabled(!lfoEnabled)}
                    className="relative w-11 h-5 rounded-full transition-all"
                    style={{
                      background: lfoEnabled 
                        ? 'linear-gradient(90deg, #e3e7ec 0%, #c8cdd4 100%)'
                        : 'rgba(255,255,255,0.2)',
                      boxShadow: lfoEnabled ? '0 0 12px rgba(227,231,236,0.6)' : 'none'
                    }}
                  >
                    <div className={`absolute w-4 h-4 bg-white rounded-full shadow-lg transition-all ${
                      lfoEnabled ? 'right-0.5 top-0.5' : 'left-0.5 top-0.5'
                    }`}></div>
                  </button>
                </div>

                {/* VERSIÓN COMPACTA cuando Wavetable/Random/SH activo */}
                {(mode === 'wavetable' || mode === 'random' || mode === 'samplehold') ? (
                  <div className="px-3 pb-1.5 space-y-1 border-t border-white/10 pt-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[9px] text-white/50 uppercase tracking-wider">Rate</label>
                      {lfoSync ? (
                        <select
                          value={lfoSyncRate}
                          onChange={(e) => setLfoSyncRate(e.target.value as SyncRate)}
                          className="h-6 bg-white/5 border border-white/10 rounded px-2 text-[8px] text-white/90 outline-none focus:border-white/40"
                        >
                          <option value="1/64">1/64</option>
                          <option value="1/32">1/32</option>
                          <option value="1/16">1/16</option>
                          <option value="1/8">1/8</option>
                          <option value="1/4">1/4</option>
                          <option value="1/2">1/2</option>
                          <option value="1">1bar</option>
                          <option value="2">2bar</option>
                        </select>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] text-white/70 font-mono">{lfoFreeHz.toFixed(1)}Hz</span>
                          <input
                            type="range" min="0.01" max="20" step="0.01" value={lfoFreeHz}
                            onChange={(e) => setLfoFreeHz(parseFloat(e.target.value))}
                            className="w-20 h-1 bg-white/10 rounded-full slider"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-[9px] text-white/50 uppercase tracking-wider">BPM Sync</label>
                      <button
                        onClick={() => setLfoSync(!lfoSync)}
                        className={`text-[8px] px-2 py-0.5 rounded font-medium ${
                          lfoSync ? 'bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/40' : 'bg-white/5 text-white/50 border border-white/10'
                        }`}
                      >
                        {lfoSync ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* VERSIÓN COMPLETA para modo Manual y LFO */
                  <div className="px-3 pb-2 space-y-1.5 border-t border-white/10 pt-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[9px] text-white/50 uppercase tracking-wider">BPM Sync</label>
                      <button
                        onClick={() => setLfoSync(!lfoSync)}
                        className={`text-[8px] px-2 py-0.5 rounded font-medium ${
                          lfoSync ? 'bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/40' : 'bg-white/5 text-white/50 border border-white/10'
                        }`}
                      >
                        {lfoSync ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    {lfoSync ? (
                      <div>
                        <label className="text-[9px] text-white/50 uppercase tracking-wider block mb-0.5">Rate</label>
                        <select
                          value={lfoSyncRate}
                          onChange={(e) => setLfoSyncRate(e.target.value as SyncRate)}
                          className="w-full h-7 bg-white/5 border border-white/10 rounded px-2 text-[9px] text-white/90 outline-none focus:border-white/40"
                        >
                          <option value="1/64">1/64</option>
                          <option value="1/32">1/32</option>
                          <option value="1/16">1/16</option>
                          <option value="1/8">1/8</option>
                          <option value="1/4">1/4</option>
                          <option value="1/2">1/2</option>
                          <option value="1">1 bar</option>
                          <option value="2">2 bars</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-0.5">
                          <label className="text-[9px] text-white/50 uppercase tracking-wider">Rate</label>
                          <span className="text-[9px] text-white/80 font-mono">{lfoFreeHz.toFixed(2)} Hz</span>
                        </div>
                        <input
                          type="range" min="0.01" max="20" step="0.01" value={lfoFreeHz}
                          onChange={(e) => setLfoFreeHz(parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-white/10 rounded-full slider"
                        />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <label className="text-[9px] text-white/50 uppercase tracking-wider">Depth</label>
                        <span className="text-[9px] text-white/80 font-mono">{lfoDepth}%</span>
                      </div>
                      <input
                        type="range" min="0" max="100" value={lfoDepth}
                        onChange={(e) => setLfoDepth(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-full slider"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <label className="text-[9px] text-white/50 uppercase tracking-wider">Smoothing</label>
                        <span className="text-[9px] text-white/80 font-mono">{lfoSmoothing}%</span>
                      </div>
                      <input
                        type="range" min="0" max="100" value={lfoSmoothing}
                        onChange={(e) => setLfoSmoothing(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-full slider"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <label className="text-[9px] text-white/50 uppercase tracking-wider">Phase</label>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] text-white/80 font-mono">{lfoPhase}°</span>
                          <button
                            onClick={handleResetPhase}
                            className="text-[7px] px-1.5 py-0.5 rounded bg-white/5 text-white/60 hover:text-white/90 border border-white/10"
                          >
                            RST
                          </button>
                        </div>
                      </div>
                      <input
                        type="range" min="0" max="360" value={lfoPhase}
                        onChange={(e) => setLfoPhase(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-full slider"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-white/10">
                      <label className="text-[9px] text-white/50 uppercase tracking-wider">Link X/Y</label>
                      <button
                        onClick={() => setLfoLinkXY(!lfoLinkXY)}
                        className={`text-[8px] px-2 py-0.5 rounded font-medium ${
                          lfoLinkXY ? 'bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/40' : 'bg-white/5 text-white/50 border border-white/10'
                        }`}
                      >
                        {lfoLinkXY ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    {!lfoLinkXY && mode === 'lfo' && (
                      <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                        <div>
                          <label className="text-[9px] text-white/50 uppercase tracking-wider block mb-0.5">X Wave</label>
                          <select
                            value={lfoWaveformX}
                            onChange={(e) => setLfoWaveformX(e.target.value as Waveform)}
                            className="w-full h-6 bg-white/5 border border-white/10 rounded px-1.5 text-[8px] text-white/90 outline-none focus:border-white/40"
                          >
                            <option value="sine">Sine</option>
                            <option value="triangle">Tri</option>
                            <option value="saw-up">Saw↑</option>
                            <option value="saw-down">Saw↓</option>
                            <option value="square">Sqr</option>
                            <option value="pulse">Pls</option>
                            <option value="noise">Nse</option>
                            <option value="chaos">Chs</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[9px] text-white/50 uppercase tracking-wider block mb-0.5">Y Wave</label>
                          <select
                            value={lfoWaveformY}
                            onChange={(e) => setLfoWaveformY(e.target.value as Waveform)}
                            className="w-full h-6 bg-white/5 border border-white/10 rounded px-1.5 text-[8px] text-white/90 outline-none focus:border-white/40"
                          >
                            <option value="sine">Sine</option>
                            <option value="triangle">Tri</option>
                            <option value="saw-up">Saw↑</option>
                            <option value="saw-down">Saw↓</option>
                            <option value="square">Sqr</option>
                            <option value="pulse">Pls</option>
                            <option value="noise">Nse</option>
                            <option value="chaos">Chs</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* WAVETABLE - Solo en modo wavetable */}
              {mode === 'wavetable' && (
                <div className="glass-panel rounded-lg px-3 py-2.5 space-y-2">
                  <h4 className="text-[11px] font-bold text-white/90 tracking-wide uppercase">Wavetable</h4>
                  
                  <div>
                    <label className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Pattern</label>
                    <select
                      value={wavetablePreset}
                      onChange={(e) => setWavetablePreset(e.target.value as WavetablePreset)}
                      className="w-full h-8 bg-white/5 border border-white/10 rounded px-2 text-[10px] text-white/90 outline-none focus:border-white/40"
                    >
                      <option value="circle">Circle</option>
                      <option value="lissajous">Lissajous</option>
                      <option value="figure8">Figure 8</option>
                      <option value="spiral">Spiral</option>
                      <option value="orbit">Orbit</option>
                      <option value="drift">Drift</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] text-white/50 uppercase tracking-wider">Morph</label>
                      <span className="text-[10px] text-white/80 font-mono">{wavetableMorph}%</span>
                    </div>
                    <input
                      type="range" min="0" max="100" value={wavetableMorph}
                      onChange={(e) => setWavetableMorph(parseInt(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-full slider"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Resolution</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[16, 32, 64].map((res) => (
                        <button
                          key={res}
                          onClick={() => setWavetableResolution(res)}
                          className={`h-8 text-[10px] rounded font-medium transition-all ${
                            wavetableResolution === res 
                              ? 'bg-white/15 text-white border border-white/40 shadow-[0_0_8px_rgba(255,255,255,0.3)]' 
                              : 'bg-white/5 text-white/50 border border-white/10'
                          }`}
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* RANDOM/SAMPLE&HOLD */}
              {(mode === 'random' || mode === 'samplehold') && (
                <div className="glass-panel rounded-lg px-3 py-2 space-y-1.5">
                  <div className="flex items-center justify-between" style={{ minHeight: '36px' }}>
                    <h4 className="text-[10px] font-bold text-white/90 tracking-wide uppercase">Randomized</h4>
                    <button
                      onClick={() => setRandomized(!randomized)}
                      className="relative w-11 h-5 rounded-full transition-all"
                      style={{
                        background: randomized 
                          ? 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)'
                          : 'rgba(255,255,255,0.2)',
                        boxShadow: randomized ? '0 0 12px rgba(251,191,36,0.6)' : 'none'
                      }}
                    >
                      <div className={`absolute w-4 h-4 bg-white rounded-full shadow-lg transition-all ${
                        randomized ? 'right-0.5 top-0.5' : 'left-0.5 top-0.5'
                      }`}></div>
                    </button>
                  </div>

                  <button
                    onClick={handleRandomize}
                    className="w-full h-9 bg-gradient-to-br from-[#f59e0b]/20 to-[#f59e0b]/10 border border-[#f59e0b]/40 rounded text-[10px] font-bold uppercase tracking-wider text-[#fbbf24]"
                  >
                    Randomize
                  </button>

                  <div className="grid grid-cols-2 gap-1.5">
                    <div>
                      <label className="text-[9px] text-white/50 uppercase tracking-wider block mb-0.5">Probability</label>
                      <input
                        type="number" value={randomProbability} min="0" max="100"
                        onChange={(e) => setRandomProbability(Math.max(0, Math.min(100, parseInt(e.target.value) || 100)))}
                        className="w-full h-7 bg-white/5 border border-white/10 rounded px-2 text-[9px] text-white/90 outline-none focus:border-[#f59e0b]/60 text-center"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-white/50 uppercase tracking-wider block mb-0.5">Seed</label>
                      <div className="flex gap-0.5">
                        <div className="flex-1 h-7 bg-white/5 border border-white/10 rounded px-1 text-[9px] text-white/80 font-mono flex items-center justify-center">
                          {randomSeed}
                        </div>
                        <button
                          onClick={() => setRandomSeedLocked(!randomSeedLocked)}
                          className={`w-7 h-7 rounded flex items-center justify-center transition-all ${
                            randomSeedLocked ? 'bg-[#f59e0b]/20 border border-[#f59e0b]/40' : 'bg-white/5 border border-white/10'
                          }`}
                        >
                          {randomSeedLocked ? <Lock className="w-3 h-3 text-[#fbbf24]" /> : <Unlock className="w-3 h-3 text-white/50" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ========== ROUTE TAB ========== */}
          {inspectorTab === 'route' && (
            <div className="glass-panel rounded-lg px-3 py-3 space-y-3">
              <h4 className="text-[11px] font-bold text-[#00d9ff] tracking-wide uppercase">MIDI Routing</h4>
              
              <div>
                <label className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Destination</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full h-10 bg-white/5 border border-white/10 rounded px-3 text-[11px] text-white/90 outline-none focus:border-[#00d9ff]/60"
                >
                  <option>INPUT A</option>
                  <option>INPUT B</option>
                  <option>INPUT C</option>
                  <option>INPUT D</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Channel</label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(parseInt(e.target.value))}
                  className="w-full h-10 bg-white/5 border border-white/10 rounded px-3 text-[11px] text-white/90 outline-none focus:border-[#00d9ff]/60"
                >
                  {[...Array(16)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>Channel {i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">X CC</label>
                  <input
                    type="number" value={ccX} min="0" max="127"
                    onChange={(e) => setCcX(Math.max(0, Math.min(127, parseInt(e.target.value) || 1)))}
                    className="w-full h-10 bg-white/5 border border-white/10 rounded px-3 text-[11px] text-white/90 outline-none focus:border-[#00d9ff]/60 text-center"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Y CC</label>
                  <input
                    type="number" value={ccY} min="0" max="127"
                    onChange={(e) => setCcY(Math.max(0, Math.min(127, parseInt(e.target.value) || 2)))}
                    className="w-full h-10 bg-white/5 border border-white/10 rounded px-3 text-[11px] text-white/90 outline-none focus:border-[#00d9ff]/60 text-center"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========== ADVANCED TAB ========== */}
          {inspectorTab === 'advanced' && (
            <div className="glass-panel rounded-lg px-3 py-3 space-y-3">
              <h4 className="text-[11px] font-bold text-[#fbbf24] tracking-wide uppercase">Advanced Settings</h4>

              {/* Clamp Area */}
              <div>
                <div className="flex items-center justify-between mb-2" style={{ minHeight: '40px' }}>
                  <label className="text-[10px] text-white/50 uppercase tracking-wider">Clamp Area</label>
                  <button
                    onClick={() => setClampEnabled(!clampEnabled)}
                    className="relative w-12 h-6 rounded-full transition-all"
                    style={{
                      background: clampEnabled 
                        ? 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)'
                        : 'rgba(255,255,255,0.2)',
                      boxShadow: clampEnabled ? '0 0 12px rgba(251,191,36,0.6)' : 'none'
                    }}
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full shadow-lg transition-all ${
                      clampEnabled ? 'right-0.5 top-0.5' : 'left-0.5 top-0.5'
                    }`}></div>
                  </button>
                </div>
                {clampEnabled && (
                  <div className="grid grid-cols-4 gap-1.5">
                    <input
                      type="number" value={clampX} placeholder="X"
                      onChange={(e) => setClampX(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
                      className="w-full h-9 bg-white/5 border border-white/10 rounded px-1 text-[10px] text-white/90 outline-none focus:border-[#f59e0b]/60 text-center"
                    />
                    <input
                      type="number" value={clampY} placeholder="Y"
                      onChange={(e) => setClampY(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
                      className="w-full h-9 bg-white/5 border border-white/10 rounded px-1 text-[10px] text-white/90 outline-none focus:border-[#f59e0b]/60 text-center"
                    />
                    <input
                      type="number" value={clampWidth} placeholder="W"
                      onChange={(e) => setClampWidth(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
                      className="w-full h-9 bg-white/5 border border-white/10 rounded px-1 text-[10px] text-white/90 outline-none focus:border-[#f59e0b]/60 text-center"
                    />
                    <input
                      type="number" value={clampHeight} placeholder="H"
                      onChange={(e) => setClampHeight(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
                      className="w-full h-9 bg-white/5 border border-white/10 rounded px-1 text-[10px] text-white/90 outline-none focus:border-[#f59e0b]/60 text-center"
                    />
                  </div>
                )}
              </div>

              {/* X Range */}
              <div>
                <label className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">X Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number" value={rangeXMin} placeholder="Min"
                    onChange={(e) => setRangeXMin(Math.max(0, Math.min(127, parseInt(e.target.value) || 0)))}
                    className="w-full h-9 bg-white/5 border border-white/10 rounded px-2 text-[10px] text-white/90 outline-none focus:border-[#00d9ff]/60 text-center"
                  />
                  <input
                    type="number" value={rangeXMax} placeholder="Max"
                    onChange={(e) => setRangeXMax(Math.max(0, Math.min(127, parseInt(e.target.value) || 127)))}
                    className="w-full h-9 bg-white/5 border border-white/10 rounded px-2 text-[10px] text-white/90 outline-none focus:border-[#00d9ff]/60 text-center"
                  />
                </div>
              </div>

              {/* Y Range */}
              <div>
                <label className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Y Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number" value={rangeYMin} placeholder="Min"
                    onChange={(e) => setRangeYMin(Math.max(0, Math.min(127, parseInt(e.target.value) || 0)))}
                    className="w-full h-9 bg-white/5 border border-white/10 rounded px-2 text-[10px] text-white/90 outline-none focus:border-[#00d9ff]/60 text-center"
                  />
                  <input
                    type="number" value={rangeYMax} placeholder="Max"
                    onChange={(e) => setRangeYMax(Math.max(0, Math.min(127, parseInt(e.target.value) || 127)))}
                    className="w-full h-9 bg-white/5 border border-white/10 rounded px-2 text-[10px] text-white/90 outline-none focus:border-[#00d9ff]/60 text-center"
                  />
                </div>
              </div>

              {/* Invert */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setInvertX(!invertX)}
                  className={`h-10 text-[10px] rounded uppercase tracking-wider font-medium transition-all ${
                    invertX ? 'bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/40 shadow-[0_0_8px_rgba(0,217,255,0.3)]' : 'bg-white/5 text-white/50 border border-white/10'
                  }`}
                >
                  ↔ Invert X
                </button>
                <button
                  onClick={() => setInvertY(!invertY)}
                  className={`h-10 text-[10px] rounded uppercase tracking-wider font-medium transition-all ${
                    invertY ? 'bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/40 shadow-[0_0_8px_rgba(0,217,255,0.3)]' : 'bg-white/5 text-white/50 border border-white/10'
                  }`}
                >
                  ↕ Invert Y
                </button>
              </div>

              {/* Quantize */}
              <div>
                <label className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Quantize</label>
                <div className="grid grid-cols-5 gap-1">
                  {[0, 2, 4, 8, 16].map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuantize(q)}
                      className={`h-9 text-[10px] rounded font-medium transition-all ${
                        quantize === q 
                          ? 'bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/40 shadow-[0_0_8px_rgba(0,217,255,0.3)]' 
                          : 'bg-white/5 text-white/50 border border-white/10'
                      }`}
                    >
                      {q === 0 ? 'OFF' : q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          background: white;
          border: 2px solid #e3e7ec;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(227, 231, 236, 0.8);
        }
        .slider::-webkit-slider-thumb:active {
          transform: scale(1.15);
        }
        .slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background: white;
          border: 2px solid #e3e7ec;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(227, 231, 236, 0.8);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}