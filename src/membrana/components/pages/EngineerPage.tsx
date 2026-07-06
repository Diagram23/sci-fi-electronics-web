import { useState, useEffect } from 'react';
import { Activity, BarChart3, Waves, Monitor, Wifi, WifiOff, AlertCircle, Sliders, ZoomIn, ZoomOut, Maximize2, X, ChevronUp, ChevronDown, Menu } from 'lucide-react';

interface EngineerPageProps {
  mode: 'HARDWARE' | 'PC';
  onModeChange: (mode: 'HARDWARE' | 'PC') => void;
}

type MIDIScopeMode = 'EVENT_DENSITY' | 'CC_LANES' | 'NOTE_RANGE';
type PCSubMenu = 'TELEMETRY' | 'DISPLAY';
type ConnectionState = 'IDLE' | 'CONNECTING' | 'CONNECTED' | 'ERROR';
type ViewportMode = 'FIT' | '1:1' | 'ZOOM';
type TopBarState = 'FULL' | 'DOCKED' | 'HIDDEN';

export function EngineerPage({ mode, onModeChange }: EngineerPageProps) {
  const [scopeMode, setScopeMode] = useState<MIDIScopeMode>('EVENT_DENSITY');
  const [pcSubMenu, setPcSubMenu] = useState<PCSubMenu>('TELEMETRY');
  const [topBarState, setTopBarState] = useState<TopBarState>('FULL');
  
  // Display mode state
  const [connectionState, setConnectionState] = useState<ConnectionState>('IDLE');
  const [hudOpen, setHudOpen] = useState(false);
  const [host, setHost] = useState('192.168.1.100');
  const [port, setPort] = useState('5900');
  const [pairingCode, setPairingCode] = useState('');
  const [viewOnly, setViewOnly] = useState(true);
  const [quality, setQuality] = useState<'LOW_LATENCY' | 'BALANCED' | 'HIGH_QUALITY'>('BALANCED');
  const [fpsCap, setFpsCap] = useState(30);
  const [latency, setLatency] = useState(0);
  const [currentFps, setCurrentFps] = useState(0);
  const [packetLoss, setPacketLoss] = useState(0);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('FIT');
  const [zoomLevel, setZoomLevel] = useState(100);

  // Mock data for MIDI scope
  const eventDensity = Array.from({ length: 50 }, () => Math.random() * 100);
  const ccLanes = [
    { cc: 1, value: 64, active: true },
    { cc: 74, value: 92, active: true },
    { cc: 71, value: 45, active: false },
    { cc: 7, value: 127, active: true },
  ];

  const handleConnect = () => {
    setConnectionState('CONNECTING');
    setTimeout(() => {
      setConnectionState('CONNECTED');
      setLatency(24);
      setCurrentFps(30);
      setPacketLoss(0);
    }, 1500);
  };

  const handleDisconnect = () => {
    setConnectionState('IDLE');
    setLatency(0);
    setCurrentFps(0);
    setPacketLoss(0);
  };

  const getConnectionStatusColor = () => {
    switch (connectionState) {
      case 'CONNECTED': return '#10b981';
      case 'CONNECTING': return '#f59e0b';
      case 'ERROR': return '#ef5a6f';
      default: return 'rgba(255,255,255,0.3)';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionState) {
      case 'CONNECTED': return 'Connected';
      case 'CONNECTING': return 'Connecting...';
      case 'ERROR': return 'Connection Failed';
      default: return 'Disconnected';
    }
  };

  const getQualityShort = () => {
    switch (quality) {
      case 'LOW_LATENCY': return 'Low Lat';
      case 'BALANCED': return 'Balanced';
      case 'HIGH_QUALITY': return 'High Q';
    }
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col min-h-0" style={{ padding: 'var(--gutter-standard)' }}>
      <div className="h-full flex flex-col" style={{ gap: topBarState === 'DOCKED' ? '0' : 'var(--gutter-standard)' }}>
        {/* TopBar - FULL / DOCKED States */}
        {topBarState === 'FULL' && (
          <div className="chrome-panel px-5 py-2.5 flex items-center justify-between" style={{ borderRadius: 'var(--radius-outer)' }}>
            <div className="flex items-center gap-4">
              <div className={`w-2.5 h-2.5 rounded-full ${
                mode === 'PC' ? 'bg-[#00d9ff] shadow-[0_0_10px_rgba(0,217,255,0.8)]' : 'bg-[#8b5cf6] shadow-[0_0_10px_rgba(139,92,246,0.8)]'
              }`}></div>
              <div>
                <h3 className="text-sm font-bold led-text tracking-wide uppercase">
                  {mode === 'PC' ? 'PC BRIDGE MODE' : 'HARDWARE MODE'}
                </h3>
                <p className="text-[10px] text-white/50 mt-0.5">
                  {mode === 'PC' 
                    ? pcSubMenu === 'DISPLAY' 
                      ? 'Remote desktop display & control' 
                      : 'DAW telemetry + MIDI scope'
                    : 'MIDI analysis + clock monitoring'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* PC SubMenu (only show in PC mode) */}
              {mode === 'PC' && (
                <div className="flex items-center gap-2 chrome-panel-soft p-1 rounded-lg mr-2">
                  <button
                    onClick={() => setPcSubMenu('TELEMETRY')}
                    className={`px-4 h-8 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                      pcSubMenu === 'TELEMETRY' 
                        ? 'btn-chrome metal-shine' 
                        : 'text-white/60 hover:text-white/90'
                    }`}
                  >
                    Telemetry
                  </button>
                  <button
                    onClick={() => setPcSubMenu('DISPLAY')}
                    className={`px-4 h-8 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                      pcSubMenu === 'DISPLAY' 
                        ? 'btn-chrome metal-shine' 
                        : 'text-white/60 hover:text-white/90'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5 inline mr-1" />
                    Display
                  </button>
                </div>
              )}

              {/* Mode Toggle */}
              <div className="flex items-center gap-2 chrome-panel-soft p-1 rounded-lg mr-2">
                <button
                  onClick={() => onModeChange('HARDWARE')}
                  className={`px-4 h-8 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                    mode === 'HARDWARE' 
                      ? 'btn-chrome metal-shine' 
                      : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  Hardware
                </button>
                <button
                  onClick={() => onModeChange('PC')}
                  className={`px-4 h-8 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                    mode === 'PC' 
                      ? 'btn-chrome metal-shine' 
                      : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  PC Bridge
                </button>
              </div>

              {/* Collapse Control */}
              <button
                onClick={() => setTopBarState('DOCKED')}
                className="btn-chrome w-8 h-8 rounded flex items-center justify-center hover:border-white/40 transition-all"
              >
                <ChevronUp className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </div>
        )}

        {topBarState === 'DOCKED' && mode === 'PC' && pcSubMenu === 'DISPLAY' && (
          <div 
            className="absolute top-0 left-0 right-0 flex justify-end px-4 z-50"
            style={{ 
              height: '16px',
            }}
          >
            {/* Thin Top-Edge Handle - Right-aligned */}
            <div 
              className="chrome-panel px-3 flex items-center gap-3 transition-all"
              style={{
                height: '16px',
                borderRadius: '0 0 8px 8px',
                background: 'linear-gradient(135deg, rgba(25, 30, 40, 0.95) 0%, rgba(15, 18, 25, 0.95) 100%)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderTop: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {/* Status Dot */}
              <div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ 
                  backgroundColor: getConnectionStatusColor(),
                  boxShadow: connectionState === 'CONNECTED' || connectionState === 'CONNECTING' 
                    ? `0 0 6px ${getConnectionStatusColor()}` 
                    : 'none'
                }}
              ></div>

              {/* Connection Info (only when connected) */}
              {connectionState === 'CONNECTED' && (
                <div className="flex items-center gap-2">
                  <span className="text-[8px] text-white/60 tabular-nums font-medium">{latency}ms</span>
                  <div className="w-px h-2 bg-white/20"></div>
                  <span className="text-[8px] text-white/60 tabular-nums font-medium">{currentFps}fps</span>
                </div>
              )}

              {/* Divider */}
              <div className="w-px h-2.5 bg-white/20"></div>

              {/* Menu Icon */}
              <button
                onClick={() => setTopBarState('FULL')}
                className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <Menu className="w-3 h-3 text-white/70" />
              </button>

              {/* Expand Icon */}
              <button
                onClick={() => setTopBarState('FULL')}
                className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <ChevronDown className="w-3 h-3 text-white/70" />
              </button>
            </div>
          </div>
        )}

        {topBarState === 'HIDDEN' && mode === 'PC' && pcSubMenu === 'DISPLAY' && (
          <button
            onClick={() => setTopBarState('DOCKED')}
            className="absolute top-2 left-20 w-24 h-3 rounded-full flex items-center justify-center transition-all hover:h-4"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
              boxShadow: '0 0 12px rgba(0, 217, 255, 0.4), 0 0 24px rgba(139, 92, 246, 0.3)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <div className="w-8 h-0.5 bg-white/40 rounded-full"></div>
          </button>
        )}

        {/* Content Area - Changes based on mode and submenu */}
        {mode === 'PC' && pcSubMenu === 'DISPLAY' ? (
          /* FULL-SCREEN DISPLAY MODE LAYOUT */
          <div className="flex-1 overflow-hidden relative">
            {/* Remote Screen Viewport - Full Bleed */}
            <div className="absolute inset-0 chrome-panel overflow-hidden" style={{ borderRadius: 'var(--radius-outer)' }}>
              {/* Viewport States */}
              {connectionState === 'IDLE' && (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a0c10]/80 to-[#151820]/80">
                  <div className="text-center">
                    <Monitor className="w-20 h-20 text-white/15 mx-auto mb-4" />
                    <div className="text-base font-bold text-white/50 uppercase tracking-wide">Not Connected</div>
                    <div className="text-xs text-white/30 mt-2">Open HUD to configure connection</div>
                  </div>
                </div>
              )}

              {connectionState === 'CONNECTING' && (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a0c10]/80 to-[#151820]/80">
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <Wifi className="w-20 h-20 text-[#f59e0b] animate-pulse" />
                    </div>
                    <div className="text-base font-bold text-[#f59e0b] uppercase tracking-wide">Connecting...</div>
                    <div className="text-xs text-white/40 mt-2">Establishing connection to {host}:{port}</div>
                  </div>
                </div>
              )}

              {connectionState === 'CONNECTED' && (
                <div className="w-full h-full bg-gradient-to-br from-[#1a1d24] via-[#12151a] to-[#0d0f12] flex items-center justify-center">
                  {/* Simulated desktop content - would be actual remote desktop stream */}
                  <div className="text-center p-8">
                    <div className="text-sm font-bold text-white/60 uppercase tracking-wide mb-4">Remote Desktop Stream</div>
                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-16 h-16 chrome-panel-soft rounded-lg"></div>
                      ))}
                    </div>
                    <div className="text-xs text-white/40">Viewport Mode: {viewportMode} • Zoom: {zoomLevel}%</div>
                  </div>
                </div>
              )}

              {connectionState === 'ERROR' && (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a0c10]/80 to-[#151820]/80">
                  <div className="text-center">
                    <AlertCircle className="w-20 h-20 text-[#ef5a6f] mx-auto mb-4" />
                    <div className="text-base font-bold text-[#ef5a6f] uppercase tracking-wide">Connection Failed</div>
                    <div className="text-xs text-white/40 mt-2">Unable to reach {host}:{port}</div>
                    <button 
                      onClick={() => setConnectionState('IDLE')}
                      className="btn-chrome px-5 h-9 rounded-lg text-xs font-bold uppercase mt-4"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              {/* Top-Right Floating HUD Controls */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                {/* Connection Button */}
                {connectionState === 'IDLE' || connectionState === 'ERROR' ? (
                  <button 
                    onClick={handleConnect}
                    className="glass-panel px-4 h-10 rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-wide hover:border-[#10b981]/60 transition-all"
                    style={{
                      background: 'rgba(20, 25, 35, 0.85)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    <Wifi className="w-4 h-4 text-[#10b981]" />
                    <span className="text-white/90">Connect</span>
                  </button>
                ) : connectionState === 'CONNECTING' ? (
                  <button 
                    disabled
                    className="glass-panel px-4 h-10 rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-wide opacity-70"
                    style={{
                      background: 'rgba(20, 25, 35, 0.85)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    <Wifi className="w-4 h-4 text-[#f59e0b] animate-pulse" />
                    <span className="text-white/70">Connecting...</span>
                  </button>
                ) : (
                  <button 
                    onClick={handleDisconnect}
                    className="glass-panel px-4 h-10 rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-wide hover:border-[#ef5a6f]/60 transition-all"
                    style={{
                      background: 'rgba(20, 25, 35, 0.85)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    <WifiOff className="w-4 h-4 text-[#ef5a6f]" />
                    <span className="text-white/90">Disconnect</span>
                  </button>
                )}

                {/* HUD Toggle Button */}
                <button 
                  onClick={() => setHudOpen(!hudOpen)}
                  className={`glass-panel w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    hudOpen ? 'border-[#00d9ff]/60 bg-[#00d9ff]/10' : 'hover:border-white/30'
                  }`}
                  style={{
                    background: hudOpen ? 'rgba(0, 217, 255, 0.15)' : 'rgba(20, 25, 35, 0.85)',
                    backdropFilter: 'blur(16px)',
                    border: `1px solid ${hudOpen ? 'rgba(0, 217, 255, 0.6)' : 'rgba(255,255,255,0.15)'}`,
                  }}
                >
                  <Sliders className={`w-4.5 h-4.5 ${hudOpen ? 'text-[#00d9ff]' : 'text-white/80'}`} />
                </button>
              </div>

              {/* Bottom-Left Status Chips */}
              {connectionState === 'CONNECTED' && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  {/* Latency Chip */}
                  <div 
                    className="glass-panel px-3 h-7 rounded-lg flex items-center gap-1.5"
                    style={{
                      background: 'rgba(20, 25, 35, 0.9)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_6px_rgba(16,185,129,0.8)]"></div>
                    <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">LAT</span>
                    <span className="text-[11px] font-black text-[#10b981] tabular-nums">{latency}ms</span>
                  </div>

                  {/* FPS Chip */}
                  <div 
                    className="glass-panel px-3 h-7 rounded-lg flex items-center gap-1.5"
                    style={{
                      background: 'rgba(20, 25, 35, 0.9)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">FPS</span>
                    <span className="text-[11px] font-black text-[#00d9ff] tabular-nums">{currentFps}</span>
                  </div>

                  {/* Quality Chip */}
                  <div 
                    className="glass-panel px-3 h-7 rounded-lg flex items-center"
                    style={{
                      background: 'rgba(20, 25, 35, 0.9)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">{getQualityShort()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* HUD Overlay Panel - Slide In from Right */}
            <div 
              className={`absolute top-0 right-0 h-full w-[340px] transition-transform duration-300 ease-out ${
                hudOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
              style={{
                background: 'linear-gradient(135deg, rgba(25, 30, 40, 0.95) 0%, rgba(15, 18, 25, 0.95) 100%)',
                backdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '-8px 0 32px rgba(0,0,0,0.5)',
              }}
            >
              <div className="h-full flex flex-col p-4" style={{ gap: 'var(--gutter-tight)' }}>
                {/* HUD Header */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold led-text tracking-wide uppercase">Display Controls</h3>
                  <button
                    onClick={() => setHudOpen(false)}
                    className="w-7 h-7 rounded flex items-center justify-center hover:bg-white/10 transition-all"
                  >
                    <X className="w-4 h-4 text-white/70" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1" style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255,255,255,0.2) transparent',
                }}>
                  {/* SOURCE Section */}
                  <div className="chrome-panel p-3" style={{ borderRadius: 'var(--radius-inner)' }}>
                    <h4 className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-2.5">Source</h4>
                    <div className="space-y-2">
                      <div>
                        <label className="text-[9px] text-white/50 uppercase tracking-wider block mb-1">Host / IP</label>
                        <input
                          type="text"
                          value={host}
                          onChange={(e) => setHost(e.target.value)}
                          disabled={connectionState === 'CONNECTED' || connectionState === 'CONNECTING'}
                          className="w-full h-7 bg-white/5 border border-white/20 rounded px-2 text-[11px] text-white/90 outline-none focus:border-[#00d9ff]/60 disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] text-white/50 uppercase tracking-wider block mb-1">Port</label>
                        <input
                          type="text"
                          value={port}
                          onChange={(e) => setPort(e.target.value)}
                          disabled={connectionState === 'CONNECTED' || connectionState === 'CONNECTING'}
                          className="w-full h-7 bg-white/5 border border-white/20 rounded px-2 text-[11px] text-white/90 outline-none focus:border-[#00d9ff]/60 disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] text-white/50 uppercase tracking-wider block mb-1">Pairing Code</label>
                        <input
                          type="password"
                          value={pairingCode}
                          onChange={(e) => setPairingCode(e.target.value)}
                          placeholder="Optional"
                          disabled={connectionState === 'CONNECTED' || connectionState === 'CONNECTING'}
                          className="w-full h-7 bg-white/5 border border-white/20 rounded px-2 text-[11px] text-white/90 outline-none focus:border-[#00d9ff]/60 disabled:opacity-50 placeholder:text-white/30"
                        />
                      </div>
                    </div>
                  </div>

                  {/* MODE Section */}
                  <div className="chrome-panel p-3" style={{ borderRadius: 'var(--radius-inner)' }}>
                    <h4 className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-2.5">Mode</h4>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[11px] font-bold text-white/90">View Only</div>
                          <div className="text-[9px] text-white/40">Default mode</div>
                        </div>
                        <button
                          onClick={() => setViewOnly(true)}
                          disabled={connectionState !== 'CONNECTED'}
                          className={`relative w-10 h-5 rounded-full transition-all disabled:opacity-50 ${
                            viewOnly ? 'bg-gradient-to-r from-[#00d9ff] to-[#0ea5e9]' : 'bg-white/20'
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-lg transition-all ${
                              viewOnly ? 'right-0.5' : 'left-0.5'
                            }`}
                          ></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[11px] font-bold text-white/90">Control</div>
                          <div className="text-[9px] text-white/40">Enable gestures</div>
                        </div>
                        <button
                          onClick={() => setViewOnly(false)}
                          disabled={connectionState !== 'CONNECTED'}
                          className={`relative w-10 h-5 rounded-full transition-all disabled:opacity-50 ${
                            !viewOnly ? 'bg-gradient-to-r from-[#10b981] to-[#059669]' : 'bg-white/20'
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-lg transition-all ${
                              !viewOnly ? 'right-0.5' : 'left-0.5'
                            }`}
                          ></div>
                        </button>
                      </div>
                      {!viewOnly && (
                        <div className="text-[9px] text-[#10b981] bg-[#10b981]/10 rounded px-2 py-1.5 leading-tight">
                          Tap: Click • Drag: Move • 2-Finger: Scroll
                        </div>
                      )}
                    </div>
                  </div>

                  {/* VIEWPORT Section */}
                  <div className="chrome-panel p-3" style={{ borderRadius: 'var(--radius-inner)' }}>
                    <h4 className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-2.5">Viewport</h4>
                    <div className="space-y-2">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => setViewportMode('FIT')}
                          className={`flex-1 h-7 rounded flex items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-wider transition-all ${
                            viewportMode === 'FIT' 
                              ? 'btn-chrome metal-shine' 
                              : 'bg-white/5 text-white/50 hover:text-white/80'
                          }`}
                        >
                          <Maximize2 className="w-3 h-3" />
                          Fit
                        </button>
                        <button
                          onClick={() => { setViewportMode('1:1'); setZoomLevel(100); }}
                          className={`flex-1 h-7 rounded text-[9px] font-bold uppercase tracking-wider transition-all ${
                            viewportMode === '1:1' 
                              ? 'btn-chrome metal-shine' 
                              : 'bg-white/5 text-white/50 hover:text-white/80'
                          }`}
                        >
                          1:1
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setZoomLevel(Math.max(50, zoomLevel - 25))}
                          className="btn-chrome w-8 h-7 rounded flex items-center justify-center"
                        >
                          <ZoomOut className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex-1 h-7 chrome-panel-soft rounded flex items-center justify-center">
                          <span className="text-[11px] font-bold text-white/90 tabular-nums">{zoomLevel}%</span>
                        </div>
                        <button
                          onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))}
                          className="btn-chrome w-8 h-7 rounded flex items-center justify-center"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* QUALITY Section */}
                  <div className="chrome-panel p-3" style={{ borderRadius: 'var(--radius-inner)' }}>
                    <h4 className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-2.5">Quality</h4>
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        {(['LOW_LATENCY', 'BALANCED', 'HIGH_QUALITY'] as const).map((q) => (
                          <button
                            key={q}
                            onClick={() => setQuality(q)}
                            className={`flex-1 h-7 rounded text-[9px] font-bold uppercase tracking-wider transition-all ${
                              quality === q 
                                ? 'btn-chrome metal-shine' 
                                : 'bg-white/5 text-white/50 hover:text-white/80'
                            }`}
                          >
                            {q === 'LOW_LATENCY' ? 'Low' : q === 'BALANCED' ? 'Bal' : 'HQ'}
                          </button>
                        ))}
                      </div>
                      <div>
                        <label className="text-[9px] text-white/50 uppercase tracking-wider block mb-1.5">FPS Cap: {fpsCap}</label>
                        <input
                          type="range"
                          min="15"
                          max="60"
                          step="15"
                          value={fpsCap}
                          onChange={(e) => setFpsCap(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #00d9ff ${(fpsCap - 15) / 45 * 100}%, rgba(255,255,255,0.1) ${(fpsCap - 15) / 45 * 100}%)`
                          }}
                        />
                        <div className="flex justify-between text-[8px] text-white/40 mt-1">
                          <span>15</span>
                          <span>30</span>
                          <span>45</span>
                          <span>60</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* STATUS Section */}
                  <div className="chrome-panel p-3" style={{ borderRadius: 'var(--radius-inner)' }}>
                    <h4 className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-2.5">Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-white/50 uppercase tracking-wider">Connection</span>
                        <div className="flex items-center gap-1.5">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ 
                              backgroundColor: getConnectionStatusColor(),
                              boxShadow: connectionState === 'CONNECTED' || connectionState === 'CONNECTING' 
                                ? `0 0 8px ${getConnectionStatusColor()}` 
                                : 'none'
                            }}
                          ></div>
                          <span className="text-[10px] font-bold text-white/90">{getConnectionStatusText()}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-white/50 uppercase tracking-wider">Latency</span>
                        <span className={`text-[10px] font-bold tabular-nums ${
                          connectionState === 'CONNECTED' ? 'text-[#10b981]' : 'text-white/40'
                        }`}>
                          {connectionState === 'CONNECTED' ? `${latency}ms` : '--'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-white/50 uppercase tracking-wider">Packet Loss</span>
                        <span className={`text-[10px] font-bold tabular-nums ${
                          connectionState === 'CONNECTED' ? 'text-[#10b981]' : 'text-white/40'
                        }`}>
                          {connectionState === 'CONNECTED' ? `${packetLoss}%` : '--'}
                        </span>
                      </div>
                      {(connectionState === 'ERROR' || connectionState === 'IDLE') && (
                        <button 
                          onClick={handleConnect}
                          className="btn-chrome w-full h-7 rounded-lg text-[10px] font-bold uppercase tracking-wide mt-1"
                        >
                          Reconnect
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ORIGINAL TELEMETRY/HARDWARE MODE LAYOUT */
          <>
            <div className="flex-1 grid grid-cols-2 gap-3 overflow-hidden">
              {/* Left Column */}
              <div className="flex flex-col gap-3">
                {/* Clock Health */}
                <div className="chrome-panel p-3.5 flex-1">
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="text-xs font-bold text-white/90 tracking-wide uppercase">Clock Health</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                      <span className="text-[10px] text-[#10b981] font-bold uppercase">Locked</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col">
                      <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">BPM Drift</div>
                      <div className="text-xl font-black text-white/90 tabular-nums">±0.02</div>
                      <div className="text-[9px] text-white/40 mt-0.5">Max ±0.5</div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Jitter</div>
                      <div className="text-xl font-black text-white/90 tabular-nums">0.18ms</div>
                      <div className="text-[9px] text-white/40 mt-0.5">Avg 24 ticks</div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Stability</div>
                      <div className="text-xl font-black text-[#10b981] tabular-nums">99.8%</div>
                      <div className="text-[9px] text-white/40 mt-0.5">No drops</div>
                    </div>
                  </div>
                </div>

                {/* MIDI Load */}
                <div className="chrome-panel p-3.5 flex-1">
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="text-xs font-bold text-white/90 tracking-wide uppercase">MIDI Load</h3>
                    <span className="text-xs text-white/60 font-medium tabular-nums">142 events/s</span>
                  </div>
                  
                  <div className="space-y-2.5">
                    {['INPUT A', 'INPUT B', 'INPUT C', 'INPUT D'].map((input, i) => {
                      const values = [78, 45, 92, 12];
                      const value = values[i];
                      return (
                        <div key={input}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-white/50 uppercase tracking-wider">{input}</span>
                            <span className="text-[10px] text-white/60 tabular-nums">{value}%</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] rounded-full transition-all"
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column - MIDI Scope */}
              <div className="chrome-panel p-4 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-white/90 tracking-wide uppercase">MIDI Scope</h3>
                  
                  {/* Scope Mode Selector */}
                  <div className="flex items-center gap-1 chrome-panel-soft p-1 rounded-lg">
                    <button
                      onClick={() => setScopeMode('EVENT_DENSITY')}
                      className={`px-3 h-7 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                        scopeMode === 'EVENT_DENSITY' 
                          ? 'bg-white/10 text-[#00d9ff]' 
                          : 'text-white/50 hover:text-white/80'
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setScopeMode('CC_LANES')}
                      className={`px-3 h-7 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                        scopeMode === 'CC_LANES' 
                          ? 'bg-white/10 text-[#8b5cf6]' 
                          : 'text-white/50 hover:text-white/80'
                      }`}
                    >
                      <Waves className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setScopeMode('NOTE_RANGE')}
                      className={`px-3 h-7 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                        scopeMode === 'NOTE_RANGE' 
                          ? 'bg-white/10 text-[#f59e0b]' 
                          : 'text-white/50 hover:text-white/80'
                      }`}
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Scope Display */}
                <div className="flex-1 chrome-panel-soft p-4 rounded-lg overflow-hidden">
                  {scopeMode === 'EVENT_DENSITY' && (
                    <div className="h-full flex flex-col">
                      <div className="text-[10px] text-white/50 uppercase tracking-wider mb-2">Event Density (events/sec)</div>
                      <div className="flex-1 flex items-end gap-1">
                        {eventDensity.map((value, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-[#00d9ff] to-[#00d9ff]/30 rounded-sm"
                            style={{ height: `${value}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}

                  {scopeMode === 'CC_LANES' && (
                    <div className="h-full space-y-4">
                      <div className="text-[10px] text-white/50 uppercase tracking-wider mb-2">Active CC Lanes</div>
                      {ccLanes.map((lane) => (
                        <div key={lane.cc} className={lane.active ? '' : 'opacity-30'}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-medium text-white/70">CC {lane.cc}</span>
                            <span className="text-xs font-bold text-white/90 tabular-nums">{lane.value}</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#8b5cf6]/60 rounded-full transition-all"
                              style={{ width: `${(lane.value / 127) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {scopeMode === 'NOTE_RANGE' && (
                    <div className="h-full flex flex-col">
                      <div className="text-[10px] text-white/50 uppercase tracking-wider mb-2">Note Range Activity</div>
                      <div className="flex-1 flex items-end justify-around gap-3">
                        {['Low', 'Mid-Low', 'Mid', 'Mid-High', 'High'].map((range, i) => {
                          const values = [65, 82, 95, 78, 45];
                          const value = values[i];
                          return (
                            <div key={range} className="flex-1 flex flex-col items-center gap-2">
                              <div
                                className="w-full bg-gradient-to-t from-[#f59e0b] to-[#f59e0b]/30 rounded"
                                style={{ height: `${value}%` }}
                              ></div>
                              <span className="text-[9px] text-white/50 uppercase">{range}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom: Master Macros (PC Mode) or System Info */}
            <div className="h-24 chrome-panel p-4">
              {mode === 'PC' ? (
                <>
                  <div className="text-xs font-bold text-white/90 tracking-wide uppercase mb-2">Master Macros (PC)</div>
                  <div className="grid grid-cols-8 gap-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="flex flex-col items-center gap-1.5">
                        <div className="w-full h-9 chrome-panel-soft rounded relative overflow-hidden">
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#00d9ff] to-[#00d9ff]/40"
                            style={{ height: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-[9px] text-white/50 font-medium">M{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-around h-full">
                  <div className="text-center">
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">CPU Temp</div>
                    <div className="text-2xl font-black text-white/90 tabular-nums mt-1">42°C</div>
                  </div>
                  <div className="w-px h-12 bg-white/10"></div>
                  <div className="text-center">
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">System Latency</div>
                    <div className="text-2xl font-black text-[#10b981] tabular-nums mt-1">2.4ms</div>
                  </div>
                  <div className="w-px h-12 bg-white/10"></div>
                  <div className="text-center">
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">Uptime</div>
                    <div className="text-2xl font-black text-white/90 tabular-nums mt-1">4:23h</div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
