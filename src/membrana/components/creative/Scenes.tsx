import { useState } from 'react';
import { Play, Plus, Edit3, Zap, Hash, Music, Disc } from 'lucide-react';

type TriggerMode = 'ONE-SHOT' | 'TOGGLE' | 'HOLD';
type Quantize = 'OFF' | '1/16' | '1/8' | '1/4' | '1 BAR';

interface Action {
  id: string;
  type: 'CC' | 'NOTE' | 'PC';
  cc?: number;
  note?: number;
  program?: number;
  value: number;
  destination: string;
  channel: number;
}

interface Scene {
  id: number;
  name: string;
  mode: TriggerMode;
  quantize: Quantize;
  actions: Action[];
  active: boolean;
  toggled: boolean;
}

export function Scenes() {
  const [scenes, setScenes] = useState<Scene[]>([
    { 
      id: 1, 
      name: 'Filter Open', 
      mode: 'ONE-SHOT',
      quantize: '1/4',
      actions: [
        { id: '1a', type: 'CC', cc: 74, value: 127, destination: 'A', channel: 1 }
      ],
      active: false,
      toggled: false
    },
    { 
      id: 2, 
      name: 'Bass Drop', 
      mode: 'TOGGLE',
      quantize: '1 BAR',
      actions: [
        { id: '2a', type: 'NOTE', note: 36, value: 100, destination: 'B', channel: 10 },
        { id: '2b', type: 'CC', cc: 91, value: 127, destination: 'B', channel: 10 }
      ],
      active: false,
      toggled: false
    },
    { 
      id: 3, 
      name: 'Reverb Wash', 
      mode: 'HOLD',
      quantize: '1/8',
      actions: [
        { id: '3a', type: 'CC', cc: 91, value: 127, destination: 'A', channel: 1 }
      ],
      active: false,
      toggled: false
    },
    { 
      id: 4, 
      name: 'Build Up', 
      mode: 'ONE-SHOT',
      quantize: '1/4',
      actions: [
        { id: '4a', type: 'CC', cc: 74, value: 0, destination: 'A', channel: 1 },
        { id: '4b', type: 'CC', cc: 74, value: 127, destination: 'A', channel: 1 }
      ],
      active: false,
      toggled: false
    },
    { 
      id: 5, 
      name: 'Program 8', 
      mode: 'ONE-SHOT',
      quantize: 'OFF',
      actions: [
        { id: '5a', type: 'PC', program: 8, value: 0, destination: 'C', channel: 1 }
      ],
      active: false,
      toggled: false
    },
    { 
      id: 6, 
      name: 'Empty Scene', 
      mode: 'ONE-SHOT',
      quantize: 'OFF',
      actions: [],
      active: false,
      toggled: false
    },
  ]);

  const [editingScene, setEditingScene] = useState<number | null>(null);

  const triggerScene = (sceneId: number) => {
    const scene = scenes.find(s => s.id === sceneId);
    if (!scene || scene.actions.length === 0) return;

    if (scene.mode === 'TOGGLE') {
      setScenes((prev) =>
        prev.map((s) =>
          s.id === sceneId ? { ...s, toggled: !s.toggled, active: true } : s
        )
      );
      setTimeout(() => {
        setScenes((prev) =>
          prev.map((s) =>
            s.id === sceneId ? { ...s, active: false } : s
          )
        );
      }, 200);
    } else {
      setScenes((prev) =>
        prev.map((s) =>
          s.id === sceneId ? { ...s, active: true } : s
        )
      );
      setTimeout(() => {
        setScenes((prev) =>
          prev.map((s) =>
            s.id === sceneId ? { ...s, active: false } : s
          )
        );
      }, 300);
    }
  };

  const getModeColor = (mode: TriggerMode) => {
    switch (mode) {
      case 'ONE-SHOT': return { border: '#00d9ff', text: '#00d9ff', bg: 'rgba(0, 217, 255, 0.15)' };
      case 'TOGGLE': return { border: '#8b5cf6', text: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' };
      case 'HOLD': return { border: '#f59e0b', text: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' };
    }
  };

  const getActionIcon = (type: 'CC' | 'NOTE' | 'PC') => {
    switch (type) {
      case 'CC': return <Hash className="w-3 h-3" />;
      case 'NOTE': return <Music className="w-3 h-3" />;
      case 'PC': return <Disc className="w-3 h-3" />;
    }
  };

  return (
    <div className="h-full flex gap-4 min-h-0">
      {/* Scenes Grid */}
      <div className="flex-1 chrome-panel p-2.5 rounded-lg min-h-0 flex flex-col">
        <div className="mb-1.5">
          <h3 className="text-xs font-bold led-text tracking-wide uppercase">Action Stacks</h3>
          <p className="text-[10px] text-white/50 mt-0.5">Performance scenes with quantized triggers</p>
        </div>

        <div className="grid grid-cols-3 gap-2.5 flex-1 min-h-0" style={{ gridTemplateRows: 'repeat(2, 1fr)' }}>
          {scenes.map((scene) => {
            const colors = getModeColor(scene.mode);
            const isEmpty = scene.actions.length === 0;
            const isActiveState = scene.active || scene.toggled;

            return (
              <button
                key={scene.id}
                onClick={() => !isEmpty && triggerScene(scene.id)}
                disabled={isEmpty}
                className={`relative rounded-lg transition-all flex flex-col p-4 min-h-0 ${
                  isEmpty
                    ? 'bg-white/5 border border-white/10 opacity-40 cursor-not-allowed'
                    : isActiveState
                    ? 'chrome-panel-soft'
                    : 'chrome-panel-soft hover:border-white/30'
                }`}
                style={{
                  transform: scene.active ? 'scale(0.97)' : 'scale(1)',
                  borderColor: isActiveState ? colors.border : undefined,
                  boxShadow: isActiveState ? `0 0 20px ${colors.border}80` : undefined,
                  minHeight: '197px',
                }}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between mb-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                    style={{
                      background: isEmpty ? 'rgba(255, 255, 255, 0.1)' : colors.bg,
                      border: `1.5px solid ${isEmpty ? 'rgba(255, 255, 255, 0.2)' : colors.border}`,
                      color: isEmpty ? 'rgba(255, 255, 255, 0.3)' : colors.text,
                    }}
                  >
                    {scene.id}
                  </div>

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingScene(scene.id);
                    }}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-white/60" />
                  </div>
                </div>

                {/* Main Content */}
                {isEmpty ? (
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="text-xs text-white/30 uppercase tracking-wider">Empty</div>
                    <div className="text-[10px] text-white/20 mt-1">Tap edit to setup</div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col justify-center">
                    {/* Scene Name - GRANDE */}
                    <div className="text-sm font-bold text-white/95 text-center mb-2.5 leading-tight">
                      {scene.name}
                    </div>

                    {/* Mode Badge */}
                    <div className="flex items-center justify-center mb-2">
                      <div
                        className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider"
                        style={{
                          background: colors.bg,
                          border: `1px solid ${colors.border}`,
                          color: colors.text,
                        }}
                      >
                        {scene.mode}
                      </div>
                    </div>

                    {/* Quantize */}
                    {scene.quantize !== 'OFF' && (
                      <div className="text-[10px] text-white/60 text-center font-medium mb-2">
                        ♪ {scene.quantize}
                      </div>
                    )}

                    {/* Actions Summary - Short con iconos */}
                    <div className="flex items-center justify-center gap-1.5">
                      {scene.actions.slice(0, 2).map((action, idx) => (
                        <div
                          key={action.id}
                          className="flex items-center gap-1 px-2 py-0.5 rounded"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          {getActionIcon(action.type)}
                          <span className="text-[9px] text-white/50 font-bold">{action.type}</span>
                        </div>
                      ))}
                      {scene.actions.length > 2 && (
                        <div className="text-[9px] text-white/40">+{scene.actions.length - 2}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Active/Toggle Indicator */}
                {isActiveState && !isEmpty && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {scene.toggled ? (
                      <div 
                        className="w-5 h-5 rounded-full" 
                        style={{ 
                          backgroundColor: colors.border, 
                          boxShadow: `0 0 20px ${colors.border}` 
                        }}
                      ></div>
                    ) : (
                      <Play className="w-10 h-10" style={{ color: colors.text }} />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Panel - Scene Editor + Utilities */}
      <div className="w-80 chrome-panel p-5 rounded-lg flex flex-col min-h-0">
        <h3 className="text-sm font-bold led-text tracking-wide uppercase mb-4">Scene Editor</h3>

        {editingScene ? (
          <div className="space-y-4 flex-1 overflow-y-auto min-h-0">
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Scene Name</label>
              <input
                type="text"
                defaultValue={scenes.find((s) => s.id === editingScene)?.name}
                className="w-full h-10 bg-white/5 border border-white/20 rounded-lg px-3 text-sm text-white/90 outline-none focus:border-[#00d9ff]/60"
                placeholder="Enter scene name"
              />
            </div>

            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Mode</label>
              <div className="grid grid-cols-3 gap-2">
                {(['ONE-SHOT', 'TOGGLE', 'HOLD'] as const).map((mode) => (
                  <button
                    key={mode}
                    className="btn-chrome h-9 rounded-lg text-[10px] font-bold uppercase"
                  >
                    {mode === 'ONE-SHOT' ? 'Shot' : mode}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Quantize</label>
              <div className="grid grid-cols-5 gap-1.5">
                {(['OFF', '1/16', '1/8', '1/4', '1 BAR'] as const).map((q) => (
                  <button
                    key={q}
                    className="btn-chrome h-8 rounded-lg text-[10px] font-bold uppercase"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="chrome-panel-soft p-3 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-white/90 uppercase tracking-wider">Action Stack</h4>
                <button className="btn-chrome h-7 px-3 rounded-lg flex items-center gap-1.5 text-[10px] font-bold uppercase">
                  <Plus className="w-3 h-3" />
                  Add
                </button>
              </div>
              
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {scenes.find((s) => s.id === editingScene)?.actions.map((action) => (
                  <div key={action.id} className="bg-white/5 p-2 rounded flex items-center gap-2">
                    <div className="flex items-center gap-1.5 flex-1">
                      {getActionIcon(action.type)}
                      <div className="text-[10px] text-white/70 flex-1">
                        <span className="font-bold">{action.type}</span> → INPUT {action.destination} · CH {action.channel}
                        {action.type === 'CC' && <span className="text-white/50"> · CC{action.cc}={action.value}</span>}
                        {action.type === 'NOTE' && <span className="text-white/50"> · Note {action.note}</span>}
                        {action.type === 'PC' && <span className="text-white/50"> · Prog {action.program}</span>}
                      </div>
                    </div>
                  </div>
                ))}
                {scenes.find((s) => s.id === editingScene)?.actions.length === 0 && (
                  <div className="text-[10px] text-white/30 text-center py-4">
                    No actions yet. Add one to get started.
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button className="btn-chrome flex-1 h-10 rounded-lg text-xs font-bold uppercase">
                Save
              </button>
              <button
                onClick={() => setEditingScene(null)}
                className="btn-chrome h-10 px-4 rounded-lg text-xs font-bold uppercase"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-white/40 text-sm min-h-0">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Play className="w-8 h-8 text-white/20" />
            </div>
            <p className="text-center font-medium">Select a scene to edit</p>
            <p className="text-xs text-white/30 mt-2 text-center px-4 leading-relaxed">
              Configure trigger mode, quantize timing, and action stacks for performance
            </p>
          </div>
        )}

        {/* Utilities Section */}
        <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
          <h4 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Utilities</h4>
          <button 
            className="w-full btn-chrome rounded-lg relative overflow-hidden group"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '2px',
              minHeight: '56px',
              padding: '10px 12px'
            }}
            onPointerDown={(e) => {
              const btn = e.currentTarget;
              btn.dataset.pressTimer = setTimeout(() => {
                console.log('PANIC: All notes off');
              }, 1000).toString();
            }}
            onPointerUp={(e) => {
              const btn = e.currentTarget;
              if (btn.dataset.pressTimer) {
                clearTimeout(parseInt(btn.dataset.pressTimer));
              }
            }}
            onPointerLeave={(e) => {
              const btn = e.currentTarget;
              if (btn.dataset.pressTimer) {
                clearTimeout(parseInt(btn.dataset.pressTimer));
              }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ef4444]/20 to-[#ef4444]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-[#ef4444]" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold text-[#ef4444]" style={{ lineHeight: '1.05' }}>PANIC</span>
                <span style={{ fontSize: '10px', opacity: '0.65', lineHeight: '1' }} className="text-white/40">(Hold 1s)</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}