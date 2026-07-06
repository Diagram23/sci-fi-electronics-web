import { useState } from 'react';
import { Keyboard, Music, Repeat, Trash2 } from 'lucide-react';

type PadMode = 'DRUM' | 'NOTES' | 'CHORD';
type BankId = 'A' | 'B' | 'C' | 'D';

export function DrumPads() {
  const [currentBank, setCurrentBank] = useState<BankId>('A');
  const [activePads, setActivePads] = useState<Set<number>>(new Set());
  const [mode, setMode] = useState<PadMode>('DRUM');
  const [destination, setDestination] = useState('INPUT A');
  const [channel, setChannel] = useState(10);
  const [velocityMode, setVelocityMode] = useState<'FIXED' | 'TOUCH'>('TOUCH');
  const [holdMode, setHoldMode] = useState(false);
  const [shiftActive, setShiftActive] = useState(false);

  const handlePadPress = (padIndex: number) => {
    if (holdMode) {
      setActivePads((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(padIndex)) {
          newSet.delete(padIndex);
        } else {
          newSet.add(padIndex);
        }
        return newSet;
      });
    } else {
      setActivePads(new Set([padIndex]));
      setTimeout(() => {
        setActivePads((prev) => {
          const newSet = new Set(prev);
          newSet.delete(padIndex);
          return newSet;
        });
      }, 200);
    }
  };

  const clearAll = () => {
    setActivePads(new Set());
  };

  // 24 pads (6×4) + BANKS A/B/C/D = 96 pads total
  const pads = Array.from({ length: 24 }, (_, i) => i);
  
  // Calculate pad note based on bank and index
  const bankOffset = { A: 0, B: 24, C: 48, D: 72 };
  const getPadNote = (padIndex: number) => 36 + bankOffset[currentBank] + padIndex;

  // Premium color palette for each pad - platinum based with accents
  const padColors = [
    { main: 'rgba(227, 231, 236, 0.95)', glow: 'rgba(227, 231, 236, 0.8)', shadow: '227, 231, 236' }, // Platinum
    { main: 'rgba(212, 175, 135, 0.95)', glow: 'rgba(212, 175, 135, 0.8)', shadow: '212, 175, 135' }, // Champagne
    { main: 'rgba(74, 144, 184, 0.95)', glow: 'rgba(74, 144, 184, 0.8)', shadow: '74, 144, 184' },     // Steel
    { main: 'rgba(255, 183, 77, 0.95)', glow: 'rgba(255, 183, 77, 0.8)', shadow: '255, 183, 77' },     // Amber
    { main: 'rgba(94, 199, 148, 0.95)', glow: 'rgba(94, 199, 148, 0.8)', shadow: '94, 199, 148' },     // Emerald
  ];

  const getPadColor = (padIndex: number) => {
    return padColors[padIndex % padColors.length];
  };

  return (
    <div className="h-full flex gap-4 min-h-0">
      {/* Main Pads Grid */}
      <div className="flex-1 chrome-panel rounded-lg p-3 flex flex-col min-h-0">
        {/* Header with BANK Selector */}
        <div className="flex items-center justify-between px-2 mb-2.5 h-8 flex-shrink-0">
          <h3 className="text-xs font-bold led-text tracking-wide uppercase">Performance Pads</h3>
          
          {/* BANK Selector - Prominent */}
          <div className="flex items-center gap-2 chrome-panel-soft px-3 py-1.5 rounded-lg">
            <span className="text-[9px] text-white/40 uppercase tracking-wider font-bold">BANK</span>
            {(['A', 'B', 'C', 'D'] as const).map((bank) => (
              <button
                key={bank}
                onClick={() => setCurrentBank(bank)}
                className={`topbtn ${currentBank === bank ? 'active-bank' : ''} w-10 h-7 rounded flex items-center justify-center text-xs font-black`}
              >
                {bank}
              </button>
            ))}
          </div>
        </div>

        {/* 6×4 Pad Grid - MASSIVE PADS for TOUCH! */}
        <div className="flex-1 grid grid-cols-6 grid-rows-4 gap-2.5 min-h-0">{pads.map((padIndex) => {
            const isActive = activePads.has(padIndex);
            const note = getPadNote(padIndex);
            const color = getPadColor(padIndex);

            return (
              <button
                key={padIndex}
                onPointerDown={() => handlePadPress(padIndex)}
                className={`relative rounded-lg transition-all overflow-hidden ${
                  isActive
                    ? ''
                    : 'hover:bg-gradient-to-br hover:from-white/15 hover:to-white/8'
                }`}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${color.main} 0%, ${color.glow} 100%)`
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(90, 97, 105, 0.08) 50%, rgba(255, 255, 255, 0.12) 100%)',
                  boxShadow: isActive
                    ? `0 0 40px rgba(${color.shadow}, 0.8), 0 0 80px rgba(${color.shadow}, 0.6), inset 0 2px 12px rgba(255, 255, 255, 0.5), inset 0 -3px 16px rgba(0, 0, 0, 0.5)`
                    : 'inset 0 2px 6px rgba(255, 255, 255, 0.15), inset 0 -3px 10px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)',
                  transform: isActive ? 'translateY(2px) scale(0.98)' : 'translateY(0) scale(1)',
                  border: isActive 
                    ? `1.5px solid ${color.glow}` 
                    : '1px solid rgba(255, 255, 255, 0.2)',
                  minHeight: '77px', // Aumentado para táctil óptimo
                }}
              >
                {/* Metallic shine effect on inactive state */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none"></div>
                )}

                {/* Brilliant glow overlay when active - full surface illumination */}
                {isActive && (
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 40% 40%, rgba(255, 255, 255, 0.5) 0%, rgba(${color.shadow}, 0.3) 30%, transparent 70%)`,
                      mixBlendMode: 'overlay'
                    }}
                  ></div>
                )}

                {/* Pad Number */}
                <div className="absolute top-2 left-2.5 z-10">
                  <span 
                    className={`text-sm font-bold tabular-nums ${
                      isActive ? 'text-white' : 'text-white/40'
                    }`}
                    style={isActive ? {
                      textShadow: `0 0 12px rgba(${color.shadow}, 1), 0 0 24px rgba(255, 255, 255, 0.8)`
                    } : {}}
                  >
                    {padIndex + 1}
                  </span>
                </div>

                {/* Note Info */}
                <div className="absolute bottom-2 right-2.5 z-10">
                  <span 
                    className={`text-xs font-medium tabular-nums ${
                      isActive ? 'text-white/95' : 'text-white/30'
                    }`}
                    style={isActive ? {
                      textShadow: `0 0 8px rgba(${color.shadow}, 0.9)`
                    } : {}}
                  >
                    {note}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Performance Strip - Optimizado y más visible */}
        <div className="flex items-center gap-2.5 px-2 mt-3 h-10 flex-shrink-0">
          <button
            onPointerDown={() => setShiftActive(true)}
            onPointerUp={() => setShiftActive(false)}
            onPointerLeave={() => setShiftActive(false)}
            className={`topbtn ${shiftActive ? 'active-master' : ''} h-full px-4 rounded-lg flex items-center gap-2`}
          >
            <Keyboard className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wide">Shift</span>
          </button>

          <button
            onClick={() => setHoldMode(!holdMode)}
            className={`topbtn ${holdMode ? 'active-master' : ''} h-full px-4 rounded-lg flex items-center gap-2`}
          >
            <Repeat className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wide">Hold</span>
          </button>

          <button
            onClick={clearAll}
            className="topbtn h-full px-4 rounded-lg flex items-center gap-2 hover:border-[#ef4444]/60"
          >
            <Trash2 className="w-4 h-4 text-[#ef4444]" />
            <span className="text-xs font-black uppercase tracking-wide">Clear</span>
          </button>

          <div className="flex-1"></div>

          {/* Bank indicator - más prominente */}
          <div className="chrome-panel-soft px-4 h-full flex items-center rounded-lg">
            <span className="text-[10px] text-white/50 uppercase tracking-wider mr-2 font-bold">Active:</span>
            <span className="text-sm font-black led-text-steel">{currentBank}</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Settings - ULTRA COMPACTADO */}
      <div className="w-56 flex flex-col gap-2 min-h-0">
        {/* Mode */}
        <div className="chrome-panel p-2.5 rounded-lg">
          <h4 className="text-[9px] font-bold text-white/90 uppercase tracking-wider mb-1.5">Mode</h4>
          <div className="grid grid-cols-3 gap-1">
            {(['DRUM', 'NOTES', 'CHORD'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`h-8 rounded-lg text-[9px] font-bold uppercase transition-all ${
                  mode === m
                    ? 'btn-chrome metal-shine'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Destination */}
        <div className="chrome-panel p-2.5 rounded-lg">
          <h4 className="text-[9px] font-bold text-white/90 uppercase tracking-wider mb-1.5">Destination</h4>
          <div className="space-y-1.5">
            <div>
              <label className="text-[8px] text-white/50 uppercase tracking-wider mb-0.5 block">Input</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full h-7 bg-white/5 border border-white/20 rounded-lg px-2 text-[11px] text-white/90 outline-none focus:border-[#00d9ff]/60"
              >
                <option value="INPUT A">INPUT A</option>
                <option value="INPUT B">INPUT B</option>
                <option value="INPUT C">INPUT C</option>
                <option value="INPUT D">INPUT D</option>
              </select>
            </div>
            <div>
              <label className="text-[8px] text-white/50 uppercase tracking-wider mb-0.5 block">Channel</label>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setChannel(channel > 1 ? channel - 1 : 16)}
                  className="btn-chrome w-7 h-7 rounded-lg text-sm font-bold"
                >
                  −
                </button>
                <div className="flex-1 h-7 chrome-panel flex items-center justify-center rounded-lg">
                  <span className="text-[11px] font-bold tabular-nums">CH {channel}</span>
                </div>
                <button
                  onClick={() => setChannel(channel < 16 ? channel + 1 : 1)}
                  className="btn-chrome w-7 h-7 rounded-lg text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Velocity */}
        <div className="chrome-panel p-2.5 rounded-lg">
          <h4 className="text-[9px] font-bold text-white/90 uppercase tracking-wider mb-1.5">Velocity</h4>
          <div className="grid grid-cols-2 gap-1">
            {(['FIXED', 'TOUCH'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVelocityMode(v)}
                className={`h-8 rounded-lg text-[9px] font-bold uppercase transition-all ${
                  velocityMode === v
                    ? 'btn-chrome metal-shine'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          {velocityMode === 'FIXED' && (
            <div className="mt-2">
              <input
                type="range"
                min="1"
                max="127"
                defaultValue="100"
                className="w-full h-1.5"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}