import { useState, useEffect } from 'react';

export type Breakpoint = '1024x600' | '1366x768' | '1440x900' | '1920x1080';

export interface BreakpointConfig {
  width: number;
  height: number;
  topBarHeight: number;
  tabsRowHeight: number;
  sidebarWidth: number;
  inspectorWidth: number;
  inspectorMinWidth: number;
  inspectorMaxWidth: number;
  xyGridTargetHeight: number;
  xyGridMinHeight: number;
}

const BREAKPOINT_CONFIGS: Record<Breakpoint, BreakpointConfig> = {
  '1024x600': {
    width: 1024,
    height: 600,
    topBarHeight: 86,
    tabsRowHeight: 44,
    sidebarWidth: 120,
    inspectorWidth: 240,
    inspectorMinWidth: 220,
    inspectorMaxWidth: 260,
    xyGridTargetHeight: 380, // Optimizado para usabilidad táctil
    xyGridMinHeight: 320,
  },
  '1366x768': {
    width: 1366,
    height: 768,
    topBarHeight: 86,
    tabsRowHeight: 44,
    sidebarWidth: 120,
    inspectorWidth: 320,
    inspectorMinWidth: 300,
    inspectorMaxWidth: 360,
    xyGridTargetHeight: 476, // Reduced from 500 (-24px)
    xyGridMinHeight: 420,
  },
  '1440x900': {
    width: 1440,
    height: 900,
    topBarHeight: 86,
    tabsRowHeight: 44,
    sidebarWidth: 120,
    inspectorWidth: 320,
    inspectorMinWidth: 300,
    inspectorMaxWidth: 360,
    xyGridTargetHeight: 616, // Reduced from 640 (-24px)
    xyGridMinHeight: 520,
  },
  '1920x1080': {
    width: 1920,
    height: 1080,
    topBarHeight: 86,
    tabsRowHeight: 44,
    sidebarWidth: 120,
    inspectorWidth: 320,
    inspectorMinWidth: 300,
    inspectorMaxWidth: 360,
    xyGridTargetHeight: 756, // Reduced from 780 (-24px)
    xyGridMinHeight: 640,
  },
};

function detectBreakpoint(width: number, height: number): Breakpoint {
  // Match closest breakpoint based on width
  if (width >= 1800) return '1920x1080';
  if (width >= 1400) return '1440x900';
  if (width >= 1200) return '1366x768';
  return '1024x600';
}

export function useBreakpoint(): { breakpoint: Breakpoint; config: BreakpointConfig } {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => 
    detectBreakpoint(window.innerWidth, window.innerHeight)
  );

  useEffect(() => {
    const handleResize = () => {
      const newBreakpoint = detectBreakpoint(window.innerWidth, window.innerHeight);
      if (newBreakpoint !== breakpoint) {
        setBreakpoint(newBreakpoint);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return {
    breakpoint,
    config: BREAKPOINT_CONFIGS[breakpoint],
  };
}