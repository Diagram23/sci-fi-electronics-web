interface Device {
  id: string;
  name: string;
  alias: string;
  status: 'OK' | 'MISSING';
  midiInActive: boolean;
  midiOutActive: boolean;
}

interface DeviceCardProps {
  device: Device;
  onClick: () => void;
}

const INPUT_COLORS: Record<string, {
  primary: string;
  glow: string;
  bg: string;
  strip: string;
  cssClass: string;
}> = {
  a: {
    primary: '#00e5ff',
    glow: 'rgba(0,229,255,0.85)',
    bg: 'rgba(0,229,255,0.06)',
    strip: 'linear-gradient(180deg, #00e5ff 0%, rgba(0,229,255,0.3) 60%, transparent 100%)',
    cssClass: 'input-letter-a',
  },
  b: {
    primary: '#9d6cff',
    glow: 'rgba(157,108,255,0.85)',
    bg: 'rgba(157,108,255,0.06)',
    strip: 'linear-gradient(180deg, #9d6cff 0%, rgba(157,108,255,0.3) 60%, transparent 100%)',
    cssClass: 'input-letter-b',
  },
  c: {
    primary: '#ffd700',
    glow: 'rgba(255,215,0,0.85)',
    bg: 'rgba(255,215,0,0.06)',
    strip: 'linear-gradient(180deg, #ffd700 0%, rgba(255,215,0,0.3) 60%, transparent 100%)',
    cssClass: 'input-letter-c',
  },
  d: {
    primary: '#ff6b6b',
    glow: 'rgba(255,107,107,0.85)',
    bg: 'rgba(255,107,107,0.06)',
    strip: 'linear-gradient(180deg, #ff6b6b 0%, rgba(255,107,107,0.3) 60%, transparent 100%)',
    cssClass: 'input-letter-d',
  },
};

export function DeviceCard({ device, onClick }: DeviceCardProps) {
  const isOk = device.status === 'OK';
  const color = INPUT_COLORS[device.id] ?? INPUT_COLORS.a;
  const inputLetter = device.id.toUpperCase();

  return (
    <button
      onClick={onClick}
      className="h-full relative overflow-hidden group rounded-xl"
      style={{
        background: 'linear-gradient(150deg, rgba(15, 18, 26, 0.99) 0%, rgba(9, 11, 18, 1) 100%)',
        border: `1px solid ${isOk ? 'rgba(255,255,255,0.14)' : 'rgba(239,90,111,0.4)'}`,
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.10),
          inset 0 -1px 0 rgba(0,0,0,0.55),
          inset 1px 0 0 rgba(255,255,255,0.04),
          0 8px 28px rgba(0,0,0,0.7),
          0 0 0 0.5px rgba(0,0,0,0.95)
        `,
      }}
    >
      {/* Left color accent strip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
        style={{
          background: color.strip,
          boxShadow: `2px 0 14px ${color.glow}, 4px 0 28px ${color.bg}`,
        }}
      />

      {/* Top edge chrome highlight */}
      <div
        className="absolute top-0 left-4 right-12 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.16) 50%, transparent)',
        }}
      />

      {/* Top-right corner notch — Elektron style */}
      <div
        className="absolute top-0 right-0"
        style={{
          width: 0,
          height: 0,
          borderTop: '18px solid rgba(0,0,0,0.85)',
          borderLeft: '18px solid transparent',
        }}
      />
      <div
        className="absolute top-0 right-0"
        style={{
          width: 0,
          height: 0,
          borderTop: '17px solid rgba(255,255,255,0.06)',
          borderLeft: '17px solid transparent',
        }}
      />

      {/* Hover radial glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at 35% 50%, ${color.bg} 0%, transparent 65%)`,
        }}
      />

      {/* Dot-grid depth texture */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full pl-[14px] pr-3 py-3 flex flex-col">
        {/* Top row: INPUT letter badge + Status */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col leading-none">
            <span
              className="uppercase font-bold tracking-[0.16em]"
              style={{
                fontSize: '7px',
                color: 'rgba(255,255,255,0.22)',
                letterSpacing: '0.18em',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              INPUT
            </span>
            <span
              className={`font-black leading-none ${color.cssClass}`}
              style={{
                fontSize: '36px',
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '-0.03em',
                lineHeight: '1.05',
              }}
            >
              {inputLetter}
            </span>
          </div>

          {/* Status cluster */}
          <div className="flex flex-col items-end gap-1 mt-0.5">
            {/* LED dot */}
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: isOk
                  ? 'radial-gradient(circle, #10b981 30%, rgba(16,185,129,0.6) 100%)'
                  : 'radial-gradient(circle, #ef4444 30%, rgba(239,68,68,0.6) 100%)',
                boxShadow: isOk
                  ? '0 0 10px rgba(16,185,129,0.9), 0 0 20px rgba(16,185,129,0.4)'
                  : '0 0 10px rgba(239,68,68,0.9), 0 0 20px rgba(239,68,68,0.4)',
              }}
            />
            <span
              style={{
                fontSize: '8px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.10em',
                color: isOk ? '#10b981' : '#ef5a6f',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              {device.status}
            </span>
          </div>
        </div>

        {/* Alias name */}
        <div className="mt-auto mb-2">
          <p
            className="truncate leading-tight"
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.72)',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            {device.alias}
          </p>
        </div>

        {/* MIDI activity bars */}
        <div
          className="pt-2 space-y-1.5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.055)' }}
        >
          {/* IN bar */}
          <div className="flex items-center gap-2">
            <span
              className="w-5 text-right shrink-0"
              style={{
                fontSize: '7.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.25)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              IN
            </span>
            <div
              className="flex-1 h-[3px] rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.055)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: device.midiInActive ? '70%' : '0%',
                  background: `linear-gradient(90deg, ${color.primary}, ${color.primary}77)`,
                  boxShadow: device.midiInActive ? `0 0 6px ${color.glow}` : 'none',
                }}
              />
            </div>
            <div
              className="w-[5px] h-[5px] rounded-full shrink-0 transition-all duration-150"
              style={{
                background: device.midiInActive ? color.primary : 'rgba(255,255,255,0.10)',
                boxShadow: device.midiInActive ? `0 0 5px ${color.glow}` : 'none',
              }}
            />
          </div>

          {/* OUT bar */}
          <div className="flex items-center gap-2">
            <span
              className="w-5 text-right shrink-0"
              style={{
                fontSize: '7.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.25)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              OUT
            </span>
            <div
              className="flex-1 h-[3px] rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.055)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: device.midiOutActive ? '55%' : '0%',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))',
                  boxShadow: device.midiOutActive ? '0 0 5px rgba(255,255,255,0.5)' : 'none',
                }}
              />
            </div>
            <div
              className="w-[5px] h-[5px] rounded-full shrink-0 transition-all duration-150"
              style={{
                background: device.midiOutActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.10)',
                boxShadow: device.midiOutActive ? '0 0 5px rgba(255,255,255,0.45)' : 'none',
              }}
            />
          </div>
        </div>
      </div>
    </button>
  );
}
