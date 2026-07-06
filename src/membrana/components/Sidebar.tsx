import { Home, GitBranch, Activity, Waves } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: 'HOME' | 'ROUTE' | 'ENGINEER' | 'CREATIVE') => void;
}

const pages = [
  { id: 'HOME',     icon: Home,      label: 'HOME',     index: '01' },
  { id: 'ROUTE',    icon: GitBranch, label: 'ROUTE',    index: '02' },
  { id: 'ENGINEER', icon: Activity,  label: 'ENGR',     index: '03' },
  { id: 'CREATIVE', icon: Waves,     label: 'CREAT',    index: '04' },
] as const;

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <div
      className="w-[112px] premium-panel scanlines grain-overlay flex flex-col items-center py-4 gap-3 relative overflow-hidden"
      style={{ borderRadius: 'var(--radius-outer)' }}
    >
      {/* Dot grid depth texture */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      {/* Top chrome line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      {/* Bottom chrome line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      {/* Left vertical accent */}
      <div className="absolute left-0 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />

      {/* Navigation Buttons */}
      <div className="relative z-10 flex flex-col justify-center gap-2.5 w-full px-2.5 flex-1">
        {pages.map((page) => {
          const isActive = currentPage === page.id;
          const Icon = page.icon;

          return (
            <button
              key={page.id}
              onClick={() => onPageChange(page.id as any)}
              className="group relative w-full rounded-lg py-2.5 px-2 flex flex-col items-center gap-1.5"
              style={{
                background: isActive
                  ? 'radial-gradient(130% 100% at 50% 30%, rgba(255,178,74,0.13) 0%, rgba(0,0,0,0.35) 100%)'
                  : 'transparent',
                border: isActive
                  ? '1px solid rgba(255,178,74,0.28)'
                  : '1px solid transparent',
                boxShadow: isActive
                  ? 'inset 0 0 18px rgba(255,178,74,0.12), 0 0 16px rgba(255,178,74,0.18), 0 8px 20px rgba(0,0,0,0.45)'
                  : 'none',
                transition: 'none',
              }}
            >
              {/* Active LED strip on left edge */}
              {isActive && (
                <div
                  className="absolute -left-1 top-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: '3px',
                    height: '32px',
                    background: 'linear-gradient(180deg, transparent, #FFB24A, transparent)',
                    boxShadow: '0 0 8px rgba(255,178,74,0.9), 0 0 16px rgba(255,178,74,0.5)',
                  }}
                />
              )}

              {/* Hover glow */}
              {!isActive && (
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                />
              )}

              {/* Page index number */}
              <div
                className="absolute top-1.5 right-2 page-index"
                style={{ opacity: isActive ? 0.5 : 0.22 }}
              >
                {page.index}
              </div>

              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center mt-0.5">
                <Icon
                  className={`w-5 h-5 transition-none ${
                    isActive
                      ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]'
                      : 'text-white/50 group-hover:text-white/80'
                  }`}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
              </div>

              {/* Label */}
              <div className="relative z-10">
                <span
                  className={`text-[8.5px] font-black tracking-widest uppercase ${
                    isActive ? 'led-text' : 'text-white/50 group-hover:text-white/80'
                  }`}
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    textShadow: isActive
                      ? '0 0 8px rgba(255,255,255,0.85), 0 0 16px rgba(255,255,255,0.4)'
                      : 'none',
                  }}
                >
                  {page.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom SFE branding */}
      <div className="relative z-10 w-full px-3 pb-1">
        <div
          className="w-full h-px mb-2"
          style={{ background: 'rgba(255,255,255,0.07)' }}
        />
        <div className="flex flex-col items-center gap-0.5">
          <span
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '7px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.18)',
              letterSpacing: '0.12em',
            }}
          >
            SFE
          </span>
          <span
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '6px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.10)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            MIDI OS
          </span>
        </div>
      </div>
    </div>
  );
}
