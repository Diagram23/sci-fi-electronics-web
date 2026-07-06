import { Play, Pause } from 'lucide-react';
import { SfeLogo } from './SfeLogo';
import { MidiLeds } from './MidiLeds';

interface TopBarProps {
  currentPage: string;
  isRunning: boolean;
  onToggleRun: () => void;
  currentBank: 'A' | 'B' | 'C' | 'D';
  onBankChange: (bank: 'A' | 'B' | 'C' | 'D') => void;
  clockMode: 'MASTER' | 'FOLLOW';
  onClockModeChange: () => void;
  bpm: number;
  onBpmChange: (bpm: number) => void;
  midiInActive: boolean;
  midiOutActive: boolean;
}

export function TopBar({
  currentPage,
  isRunning,
  onToggleRun,
  currentBank,
  onBankChange,
  clockMode,
  onClockModeChange,
  bpm,
  onBpmChange,
  midiInActive,
  midiOutActive,
}: TopBarProps) {
  return (
    <div
      className="h-16 premium-panel scanlines grain-overlay relative overflow-hidden"
      style={{ borderRadius: 'var(--radius-outer)' }}
    >
      {/* Animated metallic sheen */}
      <div className="absolute inset-0 opacity-15 metal-shine pointer-events-none" />

      {/* Top chrome highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* Bottom subtle glow line */}
      <div className="absolute bottom-0 left-4 right-4 glow-line-h" />

      {/* Left vertical chrome edge accent */}
      <div className="absolute left-0 top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      {/* Right vertical chrome edge accent */}
      <div className="absolute right-0 top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-white/12 to-transparent" />

      <div className="relative z-10 flex items-center justify-between h-full px-5">
        {/* ── Left: Logo + Branding ── */}
        <div className="flex items-center gap-3.5">
          {/* SFE Logo */}
          <div className="relative w-[46px] h-[46px] flex items-center justify-center">
            <SfeLogo
              className="w-full h-full"
              style={{
                color: 'rgba(255,255,255,0.88)',
                filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.25))',
              }}
            />
          </div>

          {/* Brand wordmark */}
          <div className="flex flex-col gap-0.5">
            <h1
              className="led-text tracking-wider leading-none"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '0.16em',
                fontSize: '18px',
              }}
            >
              MEMBRANA
            </h1>
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-px"
                style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.5), transparent)' }}
              />
              <p
                className="text-engraved"
                style={{ fontSize: '7px', letterSpacing: '0.22em', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                SCI-FI ELECTRONICS
              </p>
              <div
                className="w-3 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5))' }}
              />
            </div>
          </div>

          {/* Vertical divider */}
          <div className="w-px h-9 mx-1" style={{ background: 'rgba(255,255,255,0.10)' }} />

          {/* OS label */}
          <div className="flex flex-col items-center gap-0.5">
            <span
              className="text-engraved"
              style={{ fontSize: '7px', letterSpacing: '0.14em', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              OS
            </span>
            <span
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '9px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.06em',
              }}
            >
              v2.0
            </span>
          </div>
        </div>

        {/* ── Right: System Controls ── */}
        <div className="flex items-center gap-2.5">

          {/* RUN/STOP — backlit button */}
          <button
            onClick={onToggleRun}
            className="h-11 rounded-lg flex items-center gap-2.5 relative overflow-hidden"
            style={{
              width: '96px',
              background: isRunning
                ? 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(5,150,105,0.06) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
              border: isRunning
                ? '1px solid rgba(16,185,129,0.4)'
                : '1px solid rgba(255,255,255,0.12)',
              boxShadow: isRunning
                ? 'inset 0 2px 8px rgba(0,0,0,0.4), 0 0 20px rgba(16,185,129,0.5), inset 0 1px 0 rgba(255,255,255,0.10)'
                : 'inset 0 1px 0 rgba(255,255,255,0.10), 0 8px 20px rgba(0,0,0,0.55)',
              transition: 'none',
            }}
          >
            <div className="relative z-10 flex items-center gap-2.5 justify-center w-full">
              {isRunning ? (
                <Pause className="w-3.5 h-3.5 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,1)]" />
              ) : (
                <Play className="w-3.5 h-3.5 text-white/60" />
              )}
              <span
                className={`text-xs font-black tracking-wider ${isRunning ? 'text-emerald-400' : 'text-white/60'}`}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  textShadow: isRunning ? '0 0 12px rgba(16,185,129,0.9)' : undefined,
                }}
              >
                {isRunning ? 'RUN' : 'STOP'}
              </span>
            </div>
          </button>

          {/* BANK Selector */}
          <div
            className="flex items-center gap-1 p-1 rounded-lg"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4)',
            }}
          >
            <span
              className="text-engraved pl-1.5 pr-0.5"
              style={{ fontSize: '7px', letterSpacing: '0.12em', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              BANK
            </span>
            {(['A', 'B', 'C', 'D'] as const).map((bank) => (
              <button
                key={bank}
                onClick={() => onBankChange(bank)}
                className="w-9 h-8 rounded flex items-center justify-center relative overflow-hidden"
                style={{
                  background: currentBank === bank
                    ? 'radial-gradient(120% 90% at 50% 30%, rgba(255,255,255,0.12), rgba(0,0,0,0.38))'
                    : 'transparent',
                  border: currentBank === bank
                    ? '1px solid rgba(180,108,255,0.5)'
                    : '1px solid transparent',
                  boxShadow: currentBank === bank
                    ? 'inset 0 0 14px rgba(180,108,255,0.25), 0 0 14px rgba(180,108,255,0.25)'
                    : 'none',
                  transition: 'none',
                }}
              >
                <span
                  className="relative text-xs font-black"
                  style={{
                    color: currentBank === bank ? '#c084fc' : 'rgba(255,255,255,0.5)',
                    textShadow: currentBank === bank ? '0 0 10px rgba(192,132,252,0.9)' : undefined,
                    fontFamily: 'Orbitron, sans-serif',
                  }}
                >
                  {bank}
                </span>
              </button>
            ))}
          </div>

          {/* CLK Mode */}
          <button
            onClick={onClockModeChange}
            className="h-11 px-3.5 rounded-lg flex flex-col items-center justify-center relative overflow-hidden"
            style={{
              minWidth: '76px',
              background: clockMode === 'MASTER'
                ? 'linear-gradient(135deg, rgba(74,144,184,0.12) 0%, rgba(74,144,184,0.04) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
              border: clockMode === 'MASTER'
                ? '1px solid rgba(74,144,184,0.4)'
                : '1px solid rgba(255,255,255,0.12)',
              boxShadow: clockMode === 'MASTER'
                ? 'inset 0 2px 6px rgba(0,0,0,0.35), 0 0 14px rgba(74,144,184,0.35)'
                : 'inset 0 1px 0 rgba(255,255,255,0.10), 0 8px 20px rgba(0,0,0,0.55)',
              transition: 'none',
            }}
          >
            <div className="relative z-10">
              <div
                className="text-engraved leading-none mb-0.5"
                style={{ fontSize: '7px', letterSpacing: '0.18em', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                CLK
              </div>
              <div
                className="text-xs font-black leading-tight tracking-wide"
                style={{
                  color: clockMode === 'MASTER' ? '#4a90b8' : 'rgba(255,255,255,0.55)',
                  textShadow: clockMode === 'MASTER' ? '0 0 8px rgba(74,144,184,0.8)' : undefined,
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                {clockMode}
              </div>
            </div>
          </button>

          {/* BPM — LCD display */}
          <div
            className="h-11 rounded-lg flex items-center justify-center relative overflow-hidden lcd-display"
            style={{ minWidth: '118px' }}
          >
            {/* Subtle scanline on LCD */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
              }}
            />
            <div className="relative flex items-baseline gap-2 px-4">
              <input
                type="number"
                value={bpm}
                onChange={(e) => onBpmChange(parseInt(e.target.value) || 120)}
                className="outline-none tabular-nums text-right bg-transparent"
                style={{
                  width: '70px',
                  fontSize: '22px',
                  letterSpacing: '0.04em',
                  textShadow: '0 0 18px rgba(255,255,255,1), 0 0 36px rgba(255,255,255,0.55)',
                  color: '#ffffff',
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: '900',
                  border: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'textfield',
                  lineHeight: '1',
                  padding: '0',
                  margin: '0',
                }}
                min="20"
                max="300"
              />
              <span
                className="pb-0.5"
                style={{
                  fontSize: '8px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 800,
                  color: 'rgba(255,255,255,0.32)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                BPM
              </span>
            </div>
          </div>

          {/* MIDI LEDs */}
          <MidiLeds midiInActive={midiInActive} midiOutActive={midiOutActive} />
        </div>
      </div>
    </div>
  );
}
