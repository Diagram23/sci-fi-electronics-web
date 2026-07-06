import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { AmbientBackground } from './components/AmbientBackground';
import { HomePage } from './components/pages/HomePage';
import { RoutePage } from './components/pages/RoutePage';
import { EngineerPage } from './components/pages/EngineerPage';
import { CreativePage } from './components/pages/CreativePage';
import { RouteRow, DEFAULT_ROUTE_ROWS, DEFAULT_DEVICES, InputId } from './types/routing';
import { useDeviceScanner, useMidiOutput, useClock, useRouting, usePresets } from './hooks/useMidi';
import { MIDIService } from './services/MIDIService';

type Page = 'HOME' | 'ROUTE' | 'ENGINEER' | 'CREATIVE';

interface Device {
  id: string;
  name: string;
  alias: string;
  status: 'OK' | 'MISSING';
  midiInActive: boolean;
  midiOutActive: boolean;
}

function useViewportFitScale(width: number, height: number, padding = 24) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const availableWidth = Math.max(320, window.innerWidth - padding);
      const availableHeight = Math.max(320, window.innerHeight - padding);
      setScale(Math.min(1, availableWidth / width, availableHeight / height));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [height, padding, width]);

  return scale;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [ambientEnabled] = useState(true);
  const viewportScale = useViewportFitScale(1024, 600);

  const [isRunning, setIsRunning] = useState(false);
  const [currentBank, setCurrentBank] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [clockMode, setClockMode] = useState<'MASTER' | 'FOLLOW'>('MASTER');
  const [bpm, setBpm] = useState(120);
  const [midiInActive, setMidiInActive] = useState(false);
  const [midiOutActive, setMidiOutActive] = useState(false);

  const availableDevices = DEFAULT_DEVICES;

  const [devices, setDevices] = useState<Device[]>([
    { id: 'a', name: 'INPUT A', alias: 'TR-8S', status: 'OK', midiInActive: true, midiOutActive: false },
    { id: 'b', name: 'INPUT B', alias: 'Digitakt', status: 'OK', midiInActive: false, midiOutActive: true },
    { id: 'c', name: 'INPUT C', alias: 'UM-ONE', status: 'OK', midiInActive: true, midiOutActive: true },
    { id: 'd', name: 'INPUT D', alias: 'Syntakt', status: 'MISSING', midiInActive: false, midiOutActive: false },
  ]);

  const [routes, setRoutes] = useState<RouteRow[]>(DEFAULT_ROUTE_ROWS);
  const [antiLoop, setAntiLoop] = useState(true);
  const [activeSensing, setActiveSensing] = useState(false);
  const [sysEx, setSysEx] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [systemNotice, setSystemNotice] = useState('Portfolio mode ready. Local backend is optional.');

  const { devices: scannedDevices, isScanning, scan: scanDevices } = useDeviceScanner();
  const { sendPanic } = useMidiOutput();
  const { setBpm: setClockBpm, toggle: toggleClock, setClockMode: setClockModeInternal } = useClock(120);
  const { updateRoute: updateMidiRoute } = useRouting(DEFAULT_ROUTE_ROWS);
  const { switchBank, loadPreset: loadPresetHook } = usePresets('A');

  const [engineerMode, setEngineerMode] = useState<'HARDWARE' | 'PC'>('HARDWARE');

  useEffect(() => {
    if (!isRunning) {
      setMidiInActive(false);
      setMidiOutActive(false);
      return;
    }

    const interval = setInterval(() => {
      setMidiInActive(Math.random() > 0.5);
      setMidiOutActive(Math.random() > 0.5);
    }, 200);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (scannedDevices.length === 0) {
      return;
    }

    setDevices((currentDevices) =>
      currentDevices.map((device, index) => {
        const scannedDevice = scannedDevices[index];
        if (!scannedDevice) {
          return device;
        }

        return {
          ...device,
          alias: scannedDevice.alias || scannedDevice.name,
          status: scannedDevice.connected ? 'OK' : 'MISSING',
        };
      })
    );

    setSystemNotice(`Detected ${scannedDevices.length} MIDI device${scannedDevices.length === 1 ? '' : 's'} from backend.`);
  }, [scannedDevices]);

  const handleRouteUpdate = (input: InputId, deviceId: string | null, channel: number) => {
    setRoutes((currentRoutes) =>
      currentRoutes.map((route) => (route.input === input ? { ...route, deviceId, channel } : route))
    );
    updateMidiRoute(input, deviceId, channel);
    setSystemNotice(`Route ${input} updated to ${deviceId || 'unassigned'} on channel ${channel}.`);
  };

  const handleRescan = () => {
    setSystemNotice('Rescan requested. Waiting for backend device list.');
    scanDevices();
  };

  const handlePanic = () => {
    setSystemNotice('PANIC sent: All Notes Off requested for all MIDI channels.');
    sendPanic();
  };

  const handleLock = () => {
    setIsLocked((locked) => {
      const nextLocked = !locked;
      MIDIService.saveConfig('locked', nextLocked);
      setSystemNotice(nextLocked ? 'Current panel state locked locally.' : 'Panel unlocked for editing.');
      return nextLocked;
    });
  };

  const handleLoad = () => {
    const preset = loadPresetHook();
    if (preset?.routes) {
      setRoutes(preset.routes);
      setSystemNotice(`Loaded preset "${preset.name}" from bank ${currentBank}.`);
      return;
    }

    setSystemNotice(`No saved preset found in bank ${currentBank}.`);
  };

  const handleDeviceDetails = (id: string) => {
    setSelectedDeviceId(id);
    const device = devices.find((item) => item.id === id);
    if (device) {
      setSystemNotice(`Opened ${device.name} details.`);
    }
  };

  const handleBankChange = (bank: 'A' | 'B' | 'C' | 'D') => {
    setCurrentBank(bank);
    switchBank(bank);
    setSystemNotice(`Bank ${bank} selected.`);
  };

  const handleBpmChange = (newBpm: number) => {
    setBpm(newBpm);
    setClockBpm(newBpm);
    setSystemNotice(`Clock BPM set to ${newBpm}.`);
  };

  const handleClockModeChange = () => {
    const newMode = clockMode === 'MASTER' ? 'FOLLOW' : 'MASTER';
    setClockMode(newMode);
    setClockModeInternal(newMode);
    setSystemNotice(`Clock mode set to ${newMode}.`);
  };

  const handleToggleRun = () => {
    const newState = !isRunning;
    setIsRunning(newState);
    setSystemNotice(newState ? 'Transport running. Clock commands are active.' : 'Transport stopped.');
    toggleClock();
  };

  const selectedDevice = selectedDeviceId ? devices.find((device) => device.id === selectedDeviceId) : null;
  const selectedRoute = selectedDevice
    ? routes.find((route) => route.input.toLowerCase() === selectedDevice.id)
    : null;

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#080a0e] flex items-center justify-center">
      <div
        className="relative overflow-hidden bg-[#080a0e]"
        style={{
          width: '1024px',
          height: '600px',
          transform: `scale(${viewportScale})`,
          transformOrigin: 'center center',
        }}
      >
        <AmbientBackground enabled={ambientEnabled} />

        <div className="relative z-10 h-full flex flex-col min-h-0" style={{ padding: 'var(--gutter-standard)' }}>
          <div style={{ marginBottom: 'var(--gutter-standard)' }}>
            <TopBar
              currentPage={currentPage}
              isRunning={isRunning}
              onToggleRun={handleToggleRun}
              currentBank={currentBank}
              onBankChange={handleBankChange}
              clockMode={clockMode}
              onClockModeChange={handleClockModeChange}
              bpm={bpm}
              onBpmChange={handleBpmChange}
              midiInActive={midiInActive}
              midiOutActive={midiOutActive}
            />
          </div>

          <div className="flex flex-1 min-h-0 overflow-hidden gap-[var(--gutter-standard)]">
            <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

            <div className="flex-1 min-h-0 overflow-hidden">
              {currentPage === 'HOME' && (
                <HomePage
                  devices={devices}
                  isLocked={isLocked}
                  isScanning={isScanning}
                  systemNotice={systemNotice}
                  onRescan={handleRescan}
                  onPanic={handlePanic}
                  onLock={handleLock}
                  onLoad={handleLoad}
                  onDeviceDetails={handleDeviceDetails}
                />
              )}
              {currentPage === 'ROUTE' && (
                <RoutePage
                  routes={routes}
                  availableDevices={availableDevices}
                  onRouteUpdate={handleRouteUpdate}
                  antiLoop={antiLoop}
                  onAntiLoopChange={setAntiLoop}
                  activeSensing={activeSensing}
                  onActiveSensingChange={setActiveSensing}
                  sysEx={sysEx}
                  onSysExChange={setSysEx}
                />
              )}
              {currentPage === 'ENGINEER' && (
                <EngineerPage
                  mode={engineerMode}
                  onModeChange={setEngineerMode}
                />
              )}
              {currentPage === 'CREATIVE' && <CreativePage />}
            </div>
          </div>
        </div>

        {selectedDevice && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/45 backdrop-blur-sm">
            <div
              className="premium-panel grain-overlay"
              style={{
                width: '360px',
                padding: '18px',
                borderRadius: 'var(--radius-outer)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-engraved uppercase" style={{ fontSize: '9px', letterSpacing: '0.18em' }}>
                    Device details
                  </p>
                  <h2 className="led-text font-black uppercase" style={{ fontSize: '20px', letterSpacing: '0.08em' }}>
                    {selectedDevice.name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedDeviceId(null)}
                  className="rounded-md px-3 py-1.5 uppercase"
                  style={{
                    border: '1px solid rgba(255,255,255,0.14)',
                    color: 'rgba(255,255,255,0.72)',
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                  }}
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ['Alias', selectedDevice.alias],
                  ['Status', selectedDevice.status],
                  ['Route', selectedRoute?.deviceId || 'Unassigned'],
                  ['Channel', selectedRoute ? `CH ${selectedRoute.channel}` : 'N/A'],
                  ['MIDI In', selectedDevice.midiInActive ? 'Active' : 'Idle'],
                  ['MIDI Out', selectedDevice.midiOutActive ? 'Active' : 'Idle'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg"
                    style={{
                      padding: '10px',
                      background: 'rgba(255,255,255,0.035)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <p className="text-engraved uppercase" style={{ fontSize: '8px', letterSpacing: '0.14em' }}>
                      {label}
                    </p>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.82)', fontWeight: 700 }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
