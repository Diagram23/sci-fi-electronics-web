import { useEffect } from 'react';
import { Activity, Gauge, Zap, Radio, TrendingUp } from 'lucide-react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { TelemetryData } from '@/services/WebSocketService';

interface TelemetryPanelProps {
  enabled: boolean;
}

export function TelemetryPanel({ enabled }: TelemetryPanelProps) {
  const { telemetry, status, connect } = useWebSocket();

  useEffect(() => {
    if (enabled && status === 'disconnected') {
      connect();
    }
  }, [enabled, status, connect]);

  // Default mock data if no telemetry available
  const data: TelemetryData = telemetry || {
    cpuTemp: 42.5,
    uptime: 3600,
    midiLoad: {
      inputA: 0,
      inputB: 0,
      inputC: 0,
      inputD: 0,
    },
    clockStats: {
      jitter: 0,
      drift: 0,
      stability: 100,
    },
    systemLatency: 0,
    timestamp: Date.now(),
  };

  const formatUptime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getLoadColor = (load: number): string => {
    if (load < 30) return '#10b981'; // green
    if (load < 70) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const getStabilityColor = (stability: number): string => {
    if (stability >= 95) return '#10b981';
    if (stability >= 80) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="chrome-panel p-4 flex flex-col gap-4" style={{ borderRadius: 'var(--radius-outer)' }}>
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <h3 className="text-xs font-bold led-text tracking-wide uppercase">SYSTEM TELEMETRY</h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            status === 'connected' ? 'bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]' :
            status === 'connecting' ? 'bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)]' :
            'bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.8)]'
          }`}></div>
          <span className="text-[9px] text-white/40 uppercase tracking-wider">
            {status === 'connected' ? 'Live' : status === 'connecting' ? 'Connecting...' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* CPU Temperature */}
        <div className="chrome-panel-weak p-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Gauge className="w-3.5 h-3.5 text-[#00d9ff]" />
            <span className="text-[9px] text-white/60 uppercase tracking-wider">CPU Temp</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold led-text">{data.cpuTemp.toFixed(1)}</span>
            <span className="text-xs text-white/40">°C</span>
          </div>
          <div className="h-1 bg-black/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#10b981] via-[#f59e0b] to-[#ef4444]"
              style={{ width: `${Math.min((data.cpuTemp / 80) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Uptime */}
        <div className="chrome-panel-weak p-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#8b5cf6]" />
            <span className="text-[9px] text-white/60 uppercase tracking-wider">Uptime</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold led-text">{formatUptime(data.uptime)}</span>
          </div>
        </div>

        {/* System Latency */}
        <div className="chrome-panel-weak p-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span className="text-[9px] text-white/60 uppercase tracking-wider">System Latency</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold led-text">{data.systemLatency.toFixed(1)}</span>
            <span className="text-xs text-white/40">ms</span>
          </div>
        </div>

        {/* Clock Stability */}
        <div className="chrome-panel-weak p-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-[#10b981]" />
            <span className="text-[9px] text-white/60 uppercase tracking-wider">Clock Stability</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold led-text" style={{ color: getStabilityColor(data.clockStats.stability) }}>
              {data.clockStats.stability.toFixed(0)}
            </span>
            <span className="text-xs text-white/40">%</span>
          </div>
        </div>
      </div>

      {/* MIDI Load per Input */}
      <div className="chrome-panel-weak p-3 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-[#00d9ff]" />
          <span className="text-[9px] text-white/60 uppercase tracking-wider">MIDI Load (events/sec)</span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Input A */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-white/70 w-12">INPUT A</span>
            <div className="flex-1 h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${Math.min((data.midiLoad.inputA / 100) * 100, 100)}%`,
                  backgroundColor: getLoadColor((data.midiLoad.inputA / 100) * 100)
                }}
              ></div>
            </div>
            <span className="text-[10px] font-mono text-white/50 w-8 text-right">{data.midiLoad.inputA}</span>
          </div>

          {/* Input B */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-white/70 w-12">INPUT B</span>
            <div className="flex-1 h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${Math.min((data.midiLoad.inputB / 100) * 100, 100)}%`,
                  backgroundColor: getLoadColor((data.midiLoad.inputB / 100) * 100)
                }}
              ></div>
            </div>
            <span className="text-[10px] font-mono text-white/50 w-8 text-right">{data.midiLoad.inputB}</span>
          </div>

          {/* Input C */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-white/70 w-12">INPUT C</span>
            <div className="flex-1 h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${Math.min((data.midiLoad.inputC / 100) * 100, 100)}%`,
                  backgroundColor: getLoadColor((data.midiLoad.inputC / 100) * 100)
                }}
              ></div>
            </div>
            <span className="text-[10px] font-mono text-white/50 w-8 text-right">{data.midiLoad.inputC}</span>
          </div>

          {/* Input D */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-white/70 w-12">INPUT D</span>
            <div className="flex-1 h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${Math.min((data.midiLoad.inputD / 100) * 100, 100)}%`,
                  backgroundColor: getLoadColor((data.midiLoad.inputD / 100) * 100)
                }}
              ></div>
            </div>
            <span className="text-[10px] font-mono text-white/50 w-8 text-right">{data.midiLoad.inputD}</span>
          </div>
        </div>
      </div>

      {/* Clock Stats */}
      <div className="chrome-panel-weak p-3 flex flex-col gap-2">
        <span className="text-[9px] text-white/60 uppercase tracking-wider">MIDI Clock Performance</span>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-xs text-white/40">Jitter</div>
            <div className="text-sm font-bold led-text">{data.clockStats.jitter.toFixed(2)}ms</div>
          </div>
          <div>
            <div className="text-xs text-white/40">Drift</div>
            <div className="text-sm font-bold led-text">{data.clockStats.drift.toFixed(2)}ms</div>
          </div>
          <div>
            <div className="text-xs text-white/40">Stability</div>
            <div className="text-sm font-bold led-text" style={{ color: getStabilityColor(data.clockStats.stability) }}>
              {data.clockStats.stability.toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
