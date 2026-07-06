import { memo } from 'react';

interface MidiLedsProps {
  midiInActive: boolean;
  midiOutActive: boolean;
}

export const MidiLeds = memo(function MidiLeds({ midiInActive, midiOutActive }: MidiLedsProps) {
  return (
    <div
      className="flex items-center gap-3.5 px-4 h-11 rounded-lg lcd-display"
      style={{ minWidth: '92px' }}
    >
      {/* IN indicator */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="text-engraved"
          style={{
            fontSize: '7px',
            letterSpacing: '0.14em',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          IN
        </span>
        <div className="relative flex items-center justify-center">
          {/* Outer ring glow when active */}
          {midiInActive && (
            <div
              className="absolute rounded-full animate-ping"
              style={{
                width: '14px',
                height: '14px',
                background: 'rgba(74,144,184,0.25)',
                animationDuration: '0.9s',
              }}
            />
          )}
          <div
            className="relative w-3 h-3 rounded-full"
            style={{
              background: midiInActive
                ? 'radial-gradient(circle at 35% 35%, rgba(120,200,255,1) 0%, rgba(74,144,184,1) 45%, rgba(40,100,150,0.8) 100%)'
                : 'radial-gradient(circle at 35% 35%, rgba(80,90,110,0.6) 0%, rgba(40,50,65,0.8) 100%)',
              boxShadow: midiInActive
                ? '0 0 10px rgba(74,144,184,0.95), 0 0 20px rgba(74,144,184,0.5), inset 0 -1px 2px rgba(0,0,0,0.4)'
                : 'inset 0 1px 3px rgba(0,0,0,0.5)',
              border: midiInActive
                ? '0.5px solid rgba(120,200,255,0.6)'
                : '0.5px solid rgba(255,255,255,0.08)',
              transition: 'all 0.1s',
            }}
          />
        </div>
      </div>

      {/* Vertical divider */}
      <div
        className="w-px self-stretch my-1.5"
        style={{ background: 'rgba(255,255,255,0.10)' }}
      />

      {/* OUT indicator */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="text-engraved"
          style={{
            fontSize: '7px',
            letterSpacing: '0.14em',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          OUT
        </span>
        <div className="relative flex items-center justify-center">
          {/* Outer ring glow when active */}
          {midiOutActive && (
            <div
              className="absolute rounded-full animate-ping"
              style={{
                width: '14px',
                height: '14px',
                background: 'rgba(212,175,135,0.25)',
                animationDuration: '0.9s',
              }}
            />
          )}
          <div
            className="relative w-3 h-3 rounded-full"
            style={{
              background: midiOutActive
                ? 'radial-gradient(circle at 35% 35%, rgba(255,220,170,1) 0%, rgba(212,175,135,1) 45%, rgba(160,120,80,0.8) 100%)'
                : 'radial-gradient(circle at 35% 35%, rgba(80,90,110,0.6) 0%, rgba(40,50,65,0.8) 100%)',
              boxShadow: midiOutActive
                ? '0 0 10px rgba(212,175,135,0.95), 0 0 20px rgba(212,175,135,0.5), inset 0 -1px 2px rgba(0,0,0,0.4)'
                : 'inset 0 1px 3px rgba(0,0,0,0.5)',
              border: midiOutActive
                ? '0.5px solid rgba(255,220,170,0.6)'
                : '0.5px solid rgba(255,255,255,0.08)',
              transition: 'all 0.1s',
            }}
          />
        </div>
      </div>
    </div>
  );
});
