import { useState } from 'react';
import { XYPad } from '../creative/XYPad';
import { DrumPads } from '../creative/DrumPads';
import { Scenes } from '../creative/Scenes';
import { Macros } from '../creative/Macros';
import { useBreakpoint } from '../../hooks/useBreakpoint';

export function CreativePage() {
  const [activeTab, setActiveTab] = useState<'XY' | 'PADS' | 'SCENES' | 'MACROS'>('XY');
  const { config } = useBreakpoint();

  // Calculate available height for content
  const contentHeight = `calc(100% - ${config.tabsRowHeight}px)`;

  return (
    <div className="flex-1 overflow-hidden flex flex-col min-h-0">
      {/* Tab Navigation - FIXED HEIGHT with standard gutter */}
      <div className="flex gap-2" style={{ height: `${config.tabsRowHeight}px`, marginBottom: 'var(--gutter-tight)', flexShrink: 0 }}>
        {(['XY', 'PADS', 'SCENES', 'MACROS'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`btn-chrome px-6 h-10 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
              activeTab === tab ? 'metal-shine' : ''
            }`}
            style={{
              borderRadius: 'var(--radius-inner)',
              background: activeTab === tab
                ? 'linear-gradient(135deg, rgba(212, 175, 135, 0.25) 0%, rgba(212, 175, 135, 0.12) 50%, rgba(212, 175, 135, 0.25) 100%)'
                : undefined,
              boxShadow: activeTab === tab
                ? '0 0 16px rgba(212, 175, 135, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                : undefined,
            }}
          >
            <span className={activeTab === tab ? 'led-text-champagne' : 'text-white/60'}>
              {tab}
            </span>
          </button>
        ))}
      </div>

      {/* Content Area - FILL REMAINING */}
      <div className="flex-1 overflow-hidden min-h-0">
        {activeTab === 'XY' && <XYPad />}
        {activeTab === 'PADS' && <DrumPads />}
        {activeTab === 'SCENES' && <Scenes />}
        {activeTab === 'MACROS' && <Macros />}
      </div>
    </div>
  );
}