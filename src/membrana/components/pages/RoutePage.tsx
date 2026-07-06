import { RouteRow, InputId } from '../../types/routing';

interface Device {
  id: string;
  name: string;
}

interface RoutePageProps {
  routes: RouteRow[];
  availableDevices: Device[];
  onRouteUpdate: (input: InputId, deviceId: string | null, channel: number) => void;
  antiLoop: boolean;
  onAntiLoopChange: (value: boolean) => void;
  activeSensing: boolean;
  onActiveSensingChange: (value: boolean) => void;
  sysEx: boolean;
  onSysExChange: (value: boolean) => void;
}

export function RoutePage({
  routes = [], // Safe default
  availableDevices = [], // Safe default
  onRouteUpdate,
  antiLoop,
  onAntiLoopChange,
  activeSensing,
  onActiveSensingChange,
  sysEx,
  onSysExChange,
}: RoutePageProps) {
  // Ensure routes is always an array
  const safeRoutes = Array.isArray(routes) ? routes : [];
  const safeDevices = Array.isArray(availableDevices) ? availableDevices : [];

  return (
    <div className="flex-1 overflow-hidden flex flex-col min-h-0" style={{ padding: 'var(--gutter-standard)' }}>
      <div className="h-full flex flex-col" style={{ gap: 'var(--gutter-standard)' }}>
        {/* Main Routing Table */}
        <div className="flex-1 chrome-panel p-4 overflow-hidden" style={{ borderRadius: 'var(--radius-outer)' }}>
          <div className="mb-3">
            <div className="section-header">
              <h3 className="text-sm font-bold led-text tracking-wide uppercase">MIDI Routing Matrix</h3>
            </div>
            <p className="text-xs text-white/40 mt-1" style={{ paddingLeft: '10px' }}>Map physical INPUTS to MIDI devices and channels</p>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-[160px_1fr_140px_100px] gap-4 mb-2.5 px-4">
            <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider">INPUT</div>
            <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider">ASSIGNED DEVICE</div>
            <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider">CHANNEL</div>
            <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider">STATUS</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-2.5">
            {safeRoutes.map((route) => {
              const inputColors = {
                A: { primary: '#00e5ff', glow: 'rgba(0, 229, 255, 0.8)' },
                B: { primary: '#9d6cff', glow: 'rgba(157, 108, 255, 0.8)' },
                C: { primary: '#ffd700', glow: 'rgba(255, 215, 0, 0.8)' },
                D: { primary: '#ff6b6b', glow: 'rgba(255, 107, 107, 0.8)' },
              };
              const color = inputColors[route.input] || inputColors.A;

              return (
                <div
                  key={route.input}
                  className="grid grid-cols-[160px_1fr_140px_100px] gap-4 items-center chrome-panel-soft p-3.5 rounded-lg group hover:border-white/30 transition-all"
                >
                  {/* INPUT Badge */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-11 rounded-full"
                      style={{
                        background: `linear-gradient(180deg, ${color.primary} 0%, ${color.primary}33 100%)`,
                        boxShadow: `0 0 12px ${color.glow}`,
                      }}
                    ></div>
                    <div>
                      <div className="text-xl font-black led-text tracking-wide">INPUT {route.input}</div>
                      <div className="text-[9px] text-white/40 uppercase tracking-wider leading-tight">Physical Port</div>
                    </div>
                  </div>

                  {/* DEVICE Selector */}
                  <div>
                    <select
                      value={route.deviceId || ''}
                      onChange={(e) => onRouteUpdate(route.input, e.target.value || null, route.channel)}
                      className="w-full h-11 bg-white/5 border border-white/20 rounded-lg px-4 text-sm text-white/90 font-medium outline-none focus:border-[#00d9ff]/60 focus:shadow-[0_0_8px_rgba(0,217,255,0.3)] transition-all cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                      }}
                    >
                      <option value="" style={{ background: '#1a1d24', color: '#fff' }}>
                        -- Not Assigned --
                      </option>
                      {safeDevices.map((device) => (
                        <option key={device.id} value={device.id} style={{ background: '#1a1d24', color: '#fff' }}>
                          {device.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* CHANNEL Selector */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newChannel = route.channel > 1 ? route.channel - 1 : 16;
                        onRouteUpdate(route.input, route.deviceId, newChannel);
                      }}
                      className="btn-chrome w-10 h-11 rounded-lg flex items-center justify-center text-lg font-bold text-white/70 hover:text-white"
                    >
                      −
                    </button>
                    <div className="flex-1 h-11 chrome-panel flex items-center justify-center rounded-lg">
                      <span className="text-sm font-bold text-white/90 tabular-nums">CH {route.channel}</span>
                    </div>
                    <button
                      onClick={() => {
                        const newChannel = route.channel < 16 ? route.channel + 1 : 1;
                        onRouteUpdate(route.input, route.deviceId, newChannel);
                      }}
                      className="btn-chrome w-10 h-11 rounded-lg flex items-center justify-center text-lg font-bold text-white/70 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  {/* STATUS Indicator */}
                  <div className="flex items-center justify-center">
                    {route.deviceId ? (
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                        <span className="text-xs font-bold text-[#10b981] uppercase tracking-wide">Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                        <span className="text-xs font-medium text-white/40 uppercase tracking-wide">Off</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MIDI Options + Actions */}
        <div className="h-16 premium-panel px-5 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Anti-Loop */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onAntiLoopChange(!antiLoop)}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  antiLoop ? 'bg-gradient-to-r from-[#10b981] to-[#059669]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-all ${
                    antiLoop ? 'right-0.5' : 'left-0.5'
                  }`}
                ></div>
              </button>
              <div>
                <div className="text-xs font-bold text-white/90">Anti-Loop</div>
                <div className="text-[9px] text-white/40">Prevent feedback</div>
              </div>
            </div>

            <div className="w-px h-8 bg-white/10"></div>

            {/* Active Sensing */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onActiveSensingChange(!activeSensing)}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  activeSensing ? 'bg-gradient-to-r from-[#00d9ff] to-[#0ea5e9]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-all ${
                    activeSensing ? 'right-0.5' : 'left-0.5'
                  }`}
                ></div>
              </button>
              <div>
                <div className="text-xs font-bold text-white/90">Active Sensing</div>
                <div className="text-[9px] text-white/40">Keep-alive messages</div>
              </div>
            </div>

            <div className="w-px h-8 bg-white/10"></div>

            {/* SysEx */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onSysExChange(!sysEx)}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  sysEx ? 'bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-all ${
                    sysEx ? 'right-0.5' : 'left-0.5'
                  }`}
                ></div>
              </button>
              <div>
                <div className="text-xs font-bold text-white/90">SysEx</div>
                <div className="text-[9px] text-white/40">System Exclusive</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <button className="btn-chrome h-10 px-5 rounded-lg text-xs font-bold uppercase tracking-wide">
              Test All
            </button>
            <button className="btn-chrome h-10 px-5 rounded-lg text-xs font-bold uppercase tracking-wide hover:border-[#00d9ff]/60">
              Apply Routing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}