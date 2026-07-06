/**
 * MEMBRANA OS - MIDI Service
 * 
 * Abstraction layer for MIDI communication with Raspberry Pi backend.
 * This service provides a clean interface between React UI and the MIDI engine.
 * 
 * ARCHITECTURE:
 * - In development: Uses mock data and console logging
 * - In production (RPi): Connects via WebSocket to Python/Node backend
 * 
 * BACKEND COMMUNICATION:
 * The backend should implement these message types:
 * - device:scan → Scan for connected MIDI devices
 * - device:list → Get list of available devices
 * - routing:update → Update routing matrix
 * - midi:send → Send MIDI message (CC, Note, etc.)
 * - clock:set → Set master clock BPM
 * - clock:start/stop → Start/stop transport
 * - preset:save/load → Save/load configurations
 */

export type MidiMessageType = 'note_on' | 'note_off' | 'cc' | 'program_change' | 'pitch_bend' | 'clock' | 'start' | 'stop';
export type InputId = 'A' | 'B' | 'C' | 'D';
export type ClockMode = 'MASTER' | 'FOLLOW';

export interface MidiDevice {
  id: string;
  name: string;
  alias?: string;
  type: 'input' | 'output' | 'both';
  connected: boolean;
  inputPort?: string;
  outputPort?: string;
}

export interface MidiMessage {
  type: MidiMessageType;
  channel: number;
  data1?: number; // Note number or CC number
  data2?: number; // Velocity or CC value
  timestamp?: number;
}

export interface RouteConfig {
  input: InputId;
  deviceId: string | null;
  channel: number;
  enabled?: boolean;
}

export interface PresetData {
  name: string;
  bank: 'A' | 'B' | 'C' | 'D';
  routes: RouteConfig[];
  creative?: any; // XY Pad, Scenes, Macros
  timestamp: number;
}

class MIDIServiceClass {
  private ws: WebSocket | null = null;
  private connected: boolean = false;
  private messageQueue: any[] = [];
  private listeners: Map<string, Set<Function>> = new Map();
  
  // Auto-detect development mode (Vite provides import.meta.env.DEV)
  // Can be overridden with VITE_MEMBRANA_MOCK='1' environment variable
  private isDevelopment: boolean = 
    import.meta.env.DEV || import.meta.env.VITE_MEMBRANA_MOCK === '1';
  
  // Backend WebSocket URL - configurable via environment variable
  private readonly WS_URL = import.meta.env.VITE_MEMBRANA_WS_URL || 'ws://localhost:8080';

  constructor() {
    if (!this.isDevelopment) {
      // Only connect in production (Raspberry Pi)
      this.connect();
    } else {
      console.log('[MIDIService] 🎹 Running in DEVELOPMENT mode - Mock MIDI enabled');
      // In development, simulate connection after short delay
      setTimeout(() => {
        this.connected = true; // Mark as "connected" to mock backend
      }, 100);
    }
  }

  /**
   * Connect to backend WebSocket
   */
  private connect(): void {
    try {
      this.ws = new WebSocket(this.WS_URL);
      
      this.ws.onopen = () => {
        console.log('[MIDIService] Connected to backend');
        this.connected = true;
        this.flushMessageQueue();
        this.emit('connection:established');
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.handleBackendMessage(message);
        } catch (err) {
          console.error('[MIDIService] Failed to parse message:', err);
        }
      };

      this.ws.onerror = (error) => {
        console.error('[MIDIService] WebSocket error:', error);
        this.emit('connection:error', error);
      };

      this.ws.onclose = () => {
        console.log('[MIDIService] Disconnected from backend');
        this.connected = false;
        this.emit('connection:closed');
        
        // Attempt reconnection after 3 seconds
        setTimeout(() => this.connect(), 3000);
      };
    } catch (err) {
      console.error('[MIDIService] Connection failed:', err);
    }
  }

  /**
   * Send message to backend
   */
  private send(type: string, data: any = {}): void {
    const message = { type, data, timestamp: Date.now() };

    // In production, send via WebSocket
    if (!this.isDevelopment) {
      if (this.connected && this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(message));
      } else {
        // Queue message for later if not connected
        this.messageQueue.push(message);
        console.warn('[MIDIService] Not connected - message queued:', type);
      }
    }
    // In development mode: silent - no logs for mock operations
  }

  /**
   * Flush queued messages when connection is restored
   */
  private flushMessageQueue(): void {
    if (this.messageQueue.length > 0) {
      console.log(`[MIDIService] Flushing ${this.messageQueue.length} queued messages`);
      this.messageQueue.forEach(msg => {
        if (this.ws?.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(msg));
        }
      });
      this.messageQueue = [];
    }
  }

  /**
   * Handle incoming messages from backend
   */
  private handleBackendMessage(message: any): void {
    const { type, data } = message;

    switch (type) {
      case 'device:list':
        this.emit('devices:updated', data.devices);
        break;
      case 'midi:in':
        this.emit('midi:received', data);
        break;
      case 'clock:tick':
        this.emit('clock:tick', data);
        break;
      case 'device:connected':
        this.emit('device:connected', data);
        break;
      case 'device:disconnected':
        this.emit('device:disconnected', data);
        break;
      default:
        console.log('[MIDIService] Unknown message type:', type);
    }
  }

  // ============================================================================
  // PUBLIC API - Device Management
  // ============================================================================

  /**
   * Scan for available MIDI devices
   */
  public scanDevices(): void {
    console.log('[MIDIService] Scanning for MIDI devices...');
    this.send('device:scan');
  }

  /**
   * Get list of available devices
   */
  public getDevices(): void {
    this.send('device:list');
  }

  // ============================================================================
  // PUBLIC API - Routing
  // ============================================================================

  /**
   * Update routing configuration
   */
  public updateRouting(routes: RouteConfig[]): void {
    console.log('[MIDIService] Updating routing matrix:', routes);
    this.send('routing:update', { routes });
  }

  /**
   * Update single route
   */
  public updateRoute(input: InputId, deviceId: string | null, channel: number): void {
    this.send('routing:update_single', { input, deviceId, channel });
  }

  // ============================================================================
  // PUBLIC API - MIDI Messages
  // ============================================================================

  /**
   * Send MIDI CC message
   */
  public sendCC(destination: string, channel: number, cc: number, value: number): void {
    const message: MidiMessage = {
      type: 'cc',
      channel,
      data1: cc,
      data2: Math.max(0, Math.min(127, Math.round(value))),
      timestamp: Date.now(),
    };

    // Only log in production or for debugging
    if (!this.isDevelopment) {
      console.log(`[MIDIService] CC → ${destination} Ch${channel} CC${cc}=${value}`);
    }
    this.send('midi:send', { destination, message });
  }

  /**
   * Send MIDI Note On
   */
  public sendNoteOn(destination: string, channel: number, note: number, velocity: number): void {
    const message: MidiMessage = {
      type: 'note_on',
      channel,
      data1: note,
      data2: velocity,
      timestamp: Date.now(),
    };

    if (!this.isDevelopment) {
      console.log(`[MIDIService] Note On → ${destination} Ch${channel} Note${note} Vel${velocity}`);
    }
    this.send('midi:send', { destination, message });
  }

  /**
   * Send MIDI Note Off
   */
  public sendNoteOff(destination: string, channel: number, note: number): void {
    const message: MidiMessage = {
      type: 'note_off',
      channel,
      data1: note,
      data2: 0,
      timestamp: Date.now(),
    };

    if (!this.isDevelopment) {
      console.log(`[MIDIService] Note Off → ${destination} Ch${channel} Note${note}`);
    }
    this.send('midi:send', { destination, message });
  }

  /**
   * Send MIDI Program Change
   */
  public sendProgramChange(destination: string, channel: number, program: number): void {
    const message: MidiMessage = {
      type: 'program_change',
      channel,
      data1: program,
      timestamp: Date.now(),
    };

    if (!this.isDevelopment) {
      console.log(`[MIDIService] Program Change → ${destination} Ch${channel} Program${program}`);
    }
    this.send('midi:send', { destination, message });
  }

  /**
   * Send PANIC - All Notes Off
   */
  public sendPanic(): void {
    console.log('[MIDIService] PANIC - Sending All Notes Off to all channels');
    this.send('midi:panic');
  }

  // ============================================================================
  // PUBLIC API - Clock & Transport
  // ============================================================================

  /**
   * Set master clock BPM
   */
  public setClockBPM(bpm: number): void {
    console.log(`[MIDIService] Setting BPM: ${bpm}`);
    this.send('clock:set_bpm', { bpm });
  }

  /**
   * Set clock mode (MASTER or FOLLOW)
   */
  public setClockMode(mode: ClockMode): void {
    console.log(`[MIDIService] Setting clock mode: ${mode}`);
    this.send('clock:set_mode', { mode });
  }

  /**
   * Start transport
   */
  public startTransport(): void {
    console.log('[MIDIService] Starting transport');
    this.send('clock:start');
  }

  /**
   * Stop transport
   */
  public stopTransport(): void {
    console.log('[MIDIService] Stopping transport');
    this.send('clock:stop');
  }

  // ============================================================================
  // PUBLIC API - Presets & Configuration
  // ============================================================================

  /**
   * Save preset to storage
   */
  public savePreset(bank: 'A' | 'B' | 'C' | 'D', preset: PresetData): void {
    console.log(`[MIDIService] Saving preset to bank ${bank}:`, preset.name);
    this.send('preset:save', { bank, preset });
    
    // Also save to localStorage as backup
    const key = `membrana_preset_${bank}`;
    localStorage.setItem(key, JSON.stringify(preset));
  }

  /**
   * Load preset from storage
   */
  public loadPreset(bank: 'A' | 'B' | 'C' | 'D'): PresetData | null {
    console.log(`[MIDIService] Loading preset from bank ${bank}`);
    this.send('preset:load', { bank });
    
    // Try to load from localStorage as fallback
    const key = `membrana_preset_${bank}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  }

  /**
   * Save current configuration to localStorage
   */
  public saveConfig(key: string, data: any): void {
    const storageKey = `membrana_config_${key}`;
    localStorage.setItem(storageKey, JSON.stringify(data));
    console.log(`[MIDIService] Config saved: ${key}`);
  }

  /**
   * Load configuration from localStorage
   */
  public loadConfig(key: string): any | null {
    const storageKey = `membrana_config_${key}`;
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : null;
  }

  // ============================================================================
  // PUBLIC API - Event System
  // ============================================================================

  /**
   * Subscribe to events
   */
  public on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  /**
   * Unsubscribe from events
   */
  public off(event: string, callback: Function): void {
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.delete(callback);
    }
  }

  /**
   * Emit event to all listeners
   */
  private emit(event: string, data?: any): void {
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.forEach(callback => {
        try {
          callback(data);
        } catch (err) {
          console.error(`[MIDIService] Error in event listener for ${event}:`, err);
        }
      });
    }
  }

  /**
   * Get connection status
   */
  public isConnected(): boolean {
    return this.connected;
  }
}

// Export singleton instance
export const MIDIService = new MIDIServiceClass();