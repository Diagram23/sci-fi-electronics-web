import { useState } from 'react';
import { RotateCcw, Save, BookOpen, Sparkles, Sliders } from 'lucide-react';

interface Macro {
  id: number;
  label: string;
  cc: number;
  value: number;
  destination: string;
  channel: number;
}

type SidebarTab = 'PRESETS' | 'LEARN' | 'ACTIONS';

export function Macros() {
  const [currentBank, setCurrentBank] = useState<1 | 2>(1);
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>('PRESETS');
  const [macros, setMacros] = useState<Macro[]>([
    { id: 1, label: 'Filter Cutoff', cc: 74, value: 64, destination: 'INPUT A', channel: 1 },
    { id: 2, label: 'Resonance', cc: 71, value: 32, destination: 'INPUT A', channel: 1 },
    { id: 3, label: 'Reverb Send', cc: 91, value: 80, destination: 'INPUT A', channel: 1 },
    { id: 4, label: 'Delay Send', cc: 92, value: 45, destination: 'INPUT A', channel: 1 },
    { id: 5, label: 'Attack', cc: 73, value: 64, destination: 'INPUT B', channel: 1 },
    { id: 6, label: 'Release', cc: 72, value: 64, destination: 'INPUT B', channel: 1 },
    { id: 7, label: 'Pan', cc: 10, value: 64, destination: 'INPUT C', channel: 1 },
    { id: 8, label: 'Volume', cc: 7, value: 100, destination: 'INPUT C', channel: 1 },
  ]);

  const updateMacroValue = (id: number, value: number) => {
    setMacros((prev) => prev.map((m) => (m.id === id ? { ...m, value } : m)));
  };

  const resetMacro = (id: number) => {
    setMacros((prev) => prev.map((m) => (m.id === id ? { ...m, value: 64 } : m)));
  };

  // Get 4 macros for current bank (bank 1: 1-4, bank 2: 5-8)
  const displayedMacros = currentBank === 1 ? macros.slice(0, 4) : macros.slice(4, 8);

  return (
    <div className="h-full flex gap-4 min-h-0">
      {/* Macros Grid - 2×2 */}
      <div 
        className="flex-1 chrome-panel p-2.5 rounded-lg min-h-0" 
        style={{ 
          display: 'grid', 
          gridTemplateRows: 'auto auto 1fr',
          gap: '10px'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-1.5">
          <div>
            <h3 className="text-xs font-bold led-text tracking-wide uppercase">Master Macros</h3>
            <p className="text-[10px] text-white/50 mt-0.5">8 assignable MIDI CC controllers</p>
          </div>
          <button className="btn-chrome h-9 px-4 rounded-lg flex items-center gap-2 text-xs font-bold uppercase">
            <Save className="w-4 h-4" />
            Save Preset
          </button>
        </div>

        {/* Bank Selector */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/50 uppercase tracking-wider">BANK</span>
          <div className="flex items-center gap-1.5 chrome-panel-soft p-1 rounded-lg">
            {([1, 2] as const).map((bank) => (
              <button
                key={bank}
                onClick={() => setCurrentBank(bank)}
                className={`w-10 h-8 rounded flex items-center justify-center text-xs font-bold transition-all ${
                  currentBank === bank
                    ? 'btn-chrome metal-shine'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {bank}
              </button>
            ))}
          </div>
          <div className="flex-1"></div>
          <div className="text-xs text-white/40">
            Macros {currentBank === 1 ? '1–4' : '5–8'}
          </div>
        </div>

        {/* 2×2 Macros Grid */}
        <div 
          className="min-h-0"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '10px'
          }}
        >
          {displayedMacros.map((macro) => (
            <div 
              key={macro.id} 
              className="chrome-panel-soft p-7 rounded-lg flex flex-col min-h-0"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-black text-white/70">{macro.id}</span>
                    </div>
                    <input
                      type="text"
                      value={macro.label}
                      onChange={(e) => {
                        const newLabel = e.target.value;
                        setMacros((prev) =>
                          prev.map((m) => (m.id === macro.id ? { ...m, label: newLabel } : m))
                        );
                      }}
                      className="flex-1 bg-transparent text-sm font-bold text-white/90 outline-none min-w-0"
                    />
                  </div>
                  <div className="text-[10px] text-white/40 truncate">
                    {macro.destination} · CH {macro.channel} · CC {macro.cc}
                  </div>
                </div>
                <button
                  onClick={() => resetMacro(macro.id)}
                  className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all flex-shrink-0 ml-2"
                  title="Reset to 64"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-white/50" />
                </button>
              </div>

              {/* Value Display */}
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs text-white/50 uppercase tracking-wider">Value</span>
                <span className="text-xl font-black text-white/90 tabular-nums">{macro.value}</span>
              </div>

              {/* Slider */}
              <div className="relative h-3 bg-white/5 rounded-full overflow-hidden mt-auto">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] rounded-full transition-all"
                  style={{ width: `${(macro.value / 127) * 100}%` }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max="127"
                  value={macro.value}
                  onChange={(e) => updateMacroValue(macro.id, parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Tabbed Sidebar */}
      <div className="w-72 flex flex-col gap-3 min-h-0">
        {/* Tab Buttons */}
        <div className="chrome-panel-soft p-1.5 rounded-lg flex gap-1">
          <button
            onClick={() => setSidebarTab('PRESETS')}
            className={`flex-1 h-9 rounded flex items-center justify-center gap-1.5 text-xs font-bold uppercase transition-all ${
              sidebarTab === 'PRESETS'
                ? 'btn-chrome metal-shine'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Presets
          </button>
          <button
            onClick={() => setSidebarTab('LEARN')}
            className={`flex-1 h-9 rounded flex items-center justify-center gap-1.5 text-xs font-bold uppercase transition-all ${
              sidebarTab === 'LEARN'
                ? 'btn-chrome metal-shine'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Learn
          </button>
          <button
            onClick={() => setSidebarTab('ACTIONS')}
            className={`flex-1 h-9 rounded flex items-center justify-center gap-1.5 text-xs font-bold uppercase transition-all ${
              sidebarTab === 'ACTIONS'
                ? 'btn-chrome metal-shine'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Actions
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 chrome-panel p-4 rounded-lg overflow-y-auto min-h-0">
          {sidebarTab === 'PRESETS' && (
            <>
              <h4 className="text-xs font-bold text-white/90 uppercase tracking-wider mb-3">Quick Presets</h4>
              <div className="space-y-2">
                {['Default Mix', 'Filter Sweep', 'Reverb Wash', 'Dynamics', 'Performance A', 'Performance B'].map((preset) => (
                  <button
                    key={preset}
                    className="w-full btn-chrome h-9 rounded-lg text-xs font-medium text-left px-3 hover:border-[#00d9ff]/40"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </>
          )}

          {sidebarTab === 'LEARN' && (
            <>
              <h4 className="text-xs font-bold text-white/90 uppercase tracking-wider mb-3">MIDI Learn</h4>
              <p className="text-[10px] text-white/50 mb-4 leading-relaxed">
                Select a macro and move a knob/fader on your controller to assign
              </p>
              <button className="w-full btn-chrome h-10 rounded-lg text-xs font-bold uppercase hover:border-[#8b5cf6]/60 mb-4">
                Start Learning
              </button>
              <div className="chrome-panel-soft p-3 rounded-lg">
                <div className="text-xs text-white/70 mb-2">Learning Mode</div>
                <div className="text-[10px] text-white/40 leading-relaxed">
                  When active, the next MIDI CC message received will be mapped to the selected macro slot.
                </div>
              </div>
            </>
          )}

          {sidebarTab === 'ACTIONS' && (
            <>
              <h4 className="text-xs font-bold text-white/90 uppercase tracking-wider mb-3">Global Actions</h4>
              <div className="space-y-2">
                <button className="w-full btn-chrome h-10 rounded-lg text-xs font-bold uppercase">
                  Reset All to 64
                </button>
                <button className="w-full btn-chrome h-10 rounded-lg text-xs font-bold uppercase">
                  Randomize Values
                </button>
                <button className="w-full btn-chrome h-10 rounded-lg text-xs font-bold uppercase hover:border-[#ef4444]/60">
                  <span className="text-[#ef4444]">Clear All Mappings</span>
                </button>
              </div>
              <div className="mt-4 chrome-panel-soft p-3 rounded-lg">
                <div className="text-xs text-white/70 mb-2">Bank Copy</div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 btn-chrome h-9 rounded-lg text-xs font-bold">
                    Copy 1→2
                  </button>
                  <button className="flex-1 btn-chrome h-9 rounded-lg text-xs font-bold">
                    Copy 2→1
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}