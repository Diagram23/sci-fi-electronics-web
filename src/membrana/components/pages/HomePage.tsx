import { RefreshCw, Zap, Lock, Download } from 'lucide-react';
import { DeviceCard } from '../DeviceCard';

interface Device {
  id: string;
  name: string;
  alias: string;
  status: 'OK' | 'MISSING';
  midiInActive: boolean;
  midiOutActive: boolean;
}

interface HomePageProps {
  devices: Device[];
  isLocked: boolean;
  isScanning: boolean;
  systemNotice: string;
  onRescan: () => void;
  onPanic: () => void;
  onLock: () => void;
  onLoad: () => void;
  onDeviceDetails: (deviceId: string) => void;
}

export function HomePage({
  devices,
  isLocked,
  isScanning,
  systemNotice,
  onRescan,
  onPanic,
  onLock,
  onLoad,
  onDeviceDetails,
}: HomePageProps) {
  const okCount = devices.filter((d) => d.status === 'OK').length;

  return (
    <div
      className="flex-1 overflow-hidden flex flex-col min-h-0"
      style={{ padding: 'var(--gutter-standard)' }}
    >
      <div
        className="flex-1 premium-panel grain-overlay flex flex-col overflow-hidden"
        style={{ padding: '14px 16px', gap: '10px', borderRadius: 'var(--radius-outer)' }}
      >
        {/* ── Section Header: Connected Devices ── */}
        <div className="flex items-center justify-between" style={{ marginBottom: '2px' }}>
          <div className="section-header">
            <h3
              className="text-xs font-bold led-text tracking-widest uppercase"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Connected Devices
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {/* Active count badge */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(16,185,129,0.10)',
                border: '1px solid rgba(16,185,129,0.25)',
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: '#10b981',
                  boxShadow: '0 0 6px rgba(16,185,129,0.8)',
                }}
              />
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  color: '#10b981',
                  letterSpacing: '0.10em',
                  fontFamily: 'Space Grotesk, sans-serif',
                  textTransform: 'uppercase',
                }}
              >
                {okCount} / {devices.length} ACTIVE
              </span>
            </div>

            {/* Physical ports label */}
            <span
              className="text-engraved"
              style={{
                fontSize: '8px',
                letterSpacing: '0.12em',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              INPUTS A · B · C · D
            </span>
          </div>
        </div>

        {/* ── Device Cards 2×2 Grid ── */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2.5 min-h-0">
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onClick={() => onDeviceDetails(device.id)}
            />
          ))}
        </div>

        {/* ── Quick Action Buttons ── */}
        <div className="flex items-center gap-2" style={{ height: '52px' }}>
          <button
            onClick={onRescan}
            className="flex-1 h-full rounded-lg flex flex-col items-center justify-center relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(0,229,255,0.06) 0%, rgba(0,217,255,0.02) 100%)',
              border: '1px solid rgba(0,229,255,0.20)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.4)',
              gap: '2px',
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: 'rgba(0,229,255,0.05)' }} />
            <RefreshCw className={`w-4 h-4 relative z-10 ${isScanning ? 'animate-spin' : ''}`} style={{ color: '#00e5ff' }} />
            <span
              className="relative z-10 font-black tracking-wider uppercase leading-none"
              style={{
                fontSize: '9px',
                color: 'rgba(255,255,255,0.8)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              RESCAN
            </span>
          </button>

          <button
            onMouseDown={(e) => {
              const btn = e.currentTarget;
              btn.dataset.pressTimer = setTimeout(() => {
                onPanic();
              }, 1000).toString();
            }}
            onMouseUp={(e) => {
              const btn = e.currentTarget;
              if (btn.dataset.pressTimer) clearTimeout(parseInt(btn.dataset.pressTimer));
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              if (btn.dataset.pressTimer) clearTimeout(parseInt(btn.dataset.pressTimer));
            }}
            className="flex-1 h-full rounded-lg flex flex-col items-center justify-center relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(239,68,68,0.06) 0%, rgba(239,68,68,0.02) 100%)',
              border: '1px solid rgba(239,68,68,0.22)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.4)',
              gap: '2px',
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: 'rgba(239,68,68,0.06)' }} />
            <Zap className="w-4 h-4 relative z-10" style={{ color: '#ef4444' }} />
            <span
              className="relative z-10 font-black tracking-wider uppercase leading-none"
              style={{
                fontSize: '9px',
                color: '#ef4444',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              PANIC
            </span>
            <span
              className="relative z-10"
              style={{
                fontSize: '7px',
                color: 'rgba(255,255,255,0.28)',
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '0.06em',
              }}
            >
              (Hold 1s)
            </span>
          </button>

          <button
            onClick={onLock}
            className="flex-1 h-full rounded-lg flex flex-col items-center justify-center relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0.02) 100%)',
              border: '1px solid rgba(245,158,11,0.20)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.4)',
              gap: '2px',
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: 'rgba(245,158,11,0.05)' }} />
            <Lock className="w-4 h-4 relative z-10" style={{ color: '#f59e0b' }} />
            <span
              className="relative z-10 font-black tracking-wider uppercase leading-none"
              style={{
                fontSize: '9px',
                color: 'rgba(255,255,255,0.8)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              {isLocked ? 'LOCKED' : 'LOCK'}
            </span>
          </button>

          <button
            onClick={onLoad}
            className="flex-1 h-full rounded-lg flex flex-col items-center justify-center relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.06) 0%, rgba(139,92,246,0.02) 100%)',
              border: '1px solid rgba(139,92,246,0.20)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.4)',
              gap: '2px',
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: 'rgba(139,92,246,0.05)' }} />
            <Download className="w-4 h-4 relative z-10" style={{ color: '#8b5cf6' }} />
            <span
              className="relative z-10 font-black tracking-wider uppercase leading-none"
              style={{
                fontSize: '9px',
                color: 'rgba(255,255,255,0.8)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              LOAD
            </span>
          </button>
        </div>

        {/* ── System Status Bar ── */}
        <div
          className="flex items-center justify-between px-4 rounded-lg"
          style={{
            height: '30px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)',
          }}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span
                style={{ fontSize: '8px', fontWeight: 700, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                MODE
              </span>
              <span
                style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                PORTFOLIO
              </span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <span
                style={{ fontSize: '8px', fontWeight: 700, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                BACKEND
              </span>
              <span
                style={{ fontSize: '10px', fontWeight: 700, color: '#10b981', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                OPTIONAL
              </span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1.5 min-w-0 max-w-[310px]">
              <span
                className="shrink-0"
                style={{ fontSize: '8px', fontWeight: 700, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                ACTION
              </span>
              <span
                className="truncate"
                style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {systemNotice}
              </span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <span
                style={{ fontSize: '8px', fontWeight: 700, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                SYS
              </span>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#10b981', boxShadow: '0 0 5px rgba(16,185,129,0.8)' }} />
              <span
                style={{ fontSize: '9px', fontWeight: 700, color: '#10b981', letterSpacing: '0.08em', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {isLocked ? 'LOCKED' : 'READY'}
              </span>
            </div>
          </div>

          <span
            style={{
              fontSize: '9px',
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.22)',
              letterSpacing: '0.08em',
            }}
          >
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
}
