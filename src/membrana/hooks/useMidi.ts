/**
 * MEMBRANA OS - MIDI Hooks
 * 
 * React hooks for MIDI communication and device management.
 * These hooks provide a clean interface between React components and MIDIService.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { MIDIService, MidiDevice, RouteConfig, PresetData } from '../services/MIDIService';

/**
 * Hook for device scanning and management
 * 
 * Usage:
 * const { devices, isScanning, scan, refresh } = useDeviceScanner();
 */
export function useDeviceScanner() {
  const [devices, setDevices] = useState<MidiDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleDevicesUpdated = useCallback((updatedDevices: MidiDevice[]) => {
    setDevices(updatedDevices);
    setIsScanning(false);
  }, []);

  const handleDeviceConnected = useCallback((device: MidiDevice) => {
    console.log('[useDeviceScanner] Device connected:', device);
    setDevices(prev => [...prev, device]);
  }, []);

  const handleDeviceDisconnected = useCallback((deviceId: string) => {
    console.log('[useDeviceScanner] Device disconnected:', deviceId);
    setDevices(prev => prev.filter(d => d.id !== deviceId));
  }, []);

  useEffect(() => {
    // Subscribe to device events
    MIDIService.on('devices:updated', handleDevicesUpdated);
    MIDIService.on('device:connected', handleDeviceConnected);
    MIDIService.on('device:disconnected', handleDeviceDisconnected);

    // Initial device list request (only in production)
    // In development mode, this is silent and doesn't trigger any logs
    // MIDIService.getDevices();

    return () => {
      MIDIService.off('devices:updated', handleDevicesUpdated);
      MIDIService.off('device:connected', handleDeviceConnected);
      MIDIService.off('device:disconnected', handleDeviceDisconnected);
    };
  }, [handleDevicesUpdated, handleDeviceConnected, handleDeviceDisconnected]);

  const scan = useCallback(() => {
    setIsScanning(true);
    MIDIService.scanDevices();
  }, []);

  const refresh = useCallback(() => {
    MIDIService.getDevices();
  }, []);

  return { devices, isScanning, scan, refresh };
}

/**
 * Hook for sending MIDI output messages
 * 
 * Usage:
 * const { sendCC, sendNote, sendPanic } = useMidiOutput();
 */
export function useMidiOutput() {
  const sendCC = useCallback((destination: string, channel: number, cc: number, value: number) => {
    MIDIService.sendCC(destination, channel, cc, value);
  }, []);

  const sendNoteOn = useCallback((destination: string, channel: number, note: number, velocity: number = 127) => {
    MIDIService.sendNoteOn(destination, channel, note, velocity);
  }, []);

  const sendNoteOff = useCallback((destination: string, channel: number, note: number) => {
    MIDIService.sendNoteOff(destination, channel, note);
  }, []);

  const sendNote = useCallback((destination: string, channel: number, note: number, velocity: number = 127, duration: number = 100) => {
    MIDIService.sendNoteOn(destination, channel, note, velocity);
    setTimeout(() => {
      MIDIService.sendNoteOff(destination, channel, note);
    }, duration);
  }, []);

  const sendProgramChange = useCallback((destination: string, channel: number, program: number) => {
    MIDIService.sendProgramChange(destination, channel, program);
  }, []);

  const sendPanic = useCallback(() => {
    MIDIService.sendPanic();
  }, []);

  return {
    sendCC,
    sendNoteOn,
    sendNoteOff,
    sendNote,
    sendProgramChange,
    sendPanic,
  };
}

/**
 * Hook for receiving MIDI input messages
 * 
 * Usage:
 * const { lastMessage, messages } = useMidiInput();
 */
export function useMidiInput() {
  const [lastMessage, setLastMessage] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const handleMidiReceived = useCallback((message: any) => {
    setLastMessage(message);
    setMessages(prev => [...prev.slice(-99), message]); // Keep last 100 messages
  }, []);

  useEffect(() => {
    MIDIService.on('midi:received', handleMidiReceived);
    return () => {
      MIDIService.off('midi:received', handleMidiReceived);
    };
  }, [handleMidiReceived]);

  return { lastMessage, messages };
}

/**
 * Hook for clock and transport control
 * 
 * Usage:
 * const { bpm, setBpm, isRunning, start, stop, clockMode, setClockMode } = useClock();
 */
export function useClock(initialBpm: number = 120) {
  const [bpm, setBpmState] = useState(initialBpm);
  const [isRunning, setIsRunning] = useState(false);
  const [clockMode, setClockModeState] = useState<'MASTER' | 'FOLLOW'>('MASTER');

  const setBpm = useCallback((newBpm: number) => {
    setBpmState(newBpm);
    MIDIService.setClockBPM(newBpm);
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
    MIDIService.startTransport();
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    MIDIService.stopTransport();
  }, []);

  const toggle = useCallback(() => {
    if (isRunning) {
      stop();
    } else {
      start();
    }
  }, [isRunning, start, stop]);

  const setClockMode = useCallback((mode: 'MASTER' | 'FOLLOW') => {
    setClockModeState(mode);
    MIDIService.setClockMode(mode);
  }, []);

  return {
    bpm,
    setBpm,
    isRunning,
    start,
    stop,
    toggle,
    clockMode,
    setClockMode,
  };
}

/**
 * Hook for routing configuration
 * 
 * Usage:
 * const { routes, updateRoute, updateRouting, saveRoutes, loadRoutes } = useRouting();
 */
export function useRouting(initialRoutes: RouteConfig[] = []) {
  const [routes, setRoutes] = useState<RouteConfig[]>(initialRoutes);

  const updateRoute = useCallback((input: 'A' | 'B' | 'C' | 'D', deviceId: string | null, channel: number) => {
    setRoutes(prev => {
      const updated = prev.map(r => 
        r.input === input ? { ...r, deviceId, channel } : r
      );
      // Send to backend
      MIDIService.updateRoute(input, deviceId, channel);
      return updated;
    });
  }, []);

  const updateRouting = useCallback((newRoutes: RouteConfig[]) => {
    setRoutes(newRoutes);
    MIDIService.updateRouting(newRoutes);
  }, []);

  const saveRoutes = useCallback(() => {
    MIDIService.saveConfig('routes', routes);
  }, [routes]);

  const loadRoutes = useCallback(() => {
    const loaded = MIDIService.loadConfig('routes');
    if (loaded) {
      setRoutes(loaded);
      MIDIService.updateRouting(loaded);
    }
  }, []);

  // Auto-save routes when they change
  useEffect(() => {
    const timer = setTimeout(() => {
      MIDIService.saveConfig('routes', routes);
    }, 1000);
    return () => clearTimeout(timer);
  }, [routes]);

  return {
    routes,
    updateRoute,
    updateRouting,
    saveRoutes,
    loadRoutes,
  };
}

/**
 * Hook for preset management
 * 
 * Usage:
 * const { currentBank, savePreset, loadPreset, switchBank } = usePresets();
 */
export function usePresets(initialBank: 'A' | 'B' | 'C' | 'D' = 'A') {
  const [currentBank, setCurrentBank] = useState<'A' | 'B' | 'C' | 'D'>(initialBank);

  const savePreset = useCallback((name: string, data: Partial<PresetData>) => {
    const preset: PresetData = {
      name,
      bank: currentBank,
      routes: data.routes || [],
      creative: data.creative,
      timestamp: Date.now(),
    };
    MIDIService.savePreset(currentBank, preset);
  }, [currentBank]);

  const loadPreset = useCallback((bank?: 'A' | 'B' | 'C' | 'D') => {
    const targetBank = bank || currentBank;
    const preset = MIDIService.loadPreset(targetBank);
    if (preset && preset.routes) {
      MIDIService.updateRouting(preset.routes);
    }
    return preset;
  }, [currentBank]);

  const switchBank = useCallback((bank: 'A' | 'B' | 'C' | 'D') => {
    setCurrentBank(bank);
    // Auto-load preset when switching banks
    loadPreset(bank);
  }, [loadPreset]);

  return {
    currentBank,
    savePreset,
    loadPreset,
    switchBank,
  };
}

/**
 * Hook for XY Pad MIDI output with throttling
 * 
 * Usage:
 * const { sendXY } = useXYPadMidi(destination, channel, ccX, ccY);
 */
export function useXYPadMidi(
  destination: string,
  channel: number,
  ccX: number,
  ccY: number,
  throttleMs: number = 16 // ~60fps
) {
  const { sendCC } = useMidiOutput();
  const lastSentRef = useRef({ x: -1, y: -1, timestamp: 0 });

  const sendXY = useCallback((x: number, y: number, rangeXMin: number = 0, rangeXMax: number = 127, rangeYMin: number = 0, rangeYMax: number = 127) => {
    const now = Date.now();
    
    // Throttle to prevent MIDI flood
    if (now - lastSentRef.current.timestamp < throttleMs) {
      return;
    }

    // Map 0-100 position to MIDI range
    const midiX = Math.round(rangeXMin + (x / 100) * (rangeXMax - rangeXMin));
    const midiY = Math.round(rangeYMin + (y / 100) * (rangeYMax - rangeYMin));

    // Only send if values changed
    if (midiX !== lastSentRef.current.x || midiY !== lastSentRef.current.y) {
      sendCC(destination, channel, ccX, midiX);
      sendCC(destination, channel, ccY, midiY);
      
      lastSentRef.current = { x: midiX, y: midiY, timestamp: now };
    }
  }, [destination, channel, ccX, ccY, throttleMs, sendCC]);

  return { sendXY };
}

/**
 * Hook for connection status monitoring
 * 
 * Usage:
 * const { isConnected } = useConnectionStatus();
 */
export function useConnectionStatus() {
  const [isConnected, setIsConnected] = useState(MIDIService.isConnected());

  useEffect(() => {
    const handleConnected = () => setIsConnected(true);
    const handleDisconnected = () => setIsConnected(false);

    MIDIService.on('connection:established', handleConnected);
    MIDIService.on('connection:closed', handleDisconnected);
    MIDIService.on('connection:error', handleDisconnected);

    return () => {
      MIDIService.off('connection:established', handleConnected);
      MIDIService.off('connection:closed', handleDisconnected);
      MIDIService.off('connection:error', handleDisconnected);
    };
  }, []);

  return { isConnected };
}