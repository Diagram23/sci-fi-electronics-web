import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onToggleAmbient: () => void;
  onToggleRun: () => void;
  onPageChange: (page: 'HOME' | 'ROUTE' | 'ENGINEER' | 'CREATIVE') => void;
}

export function KeyboardShortcuts({
  onToggleAmbient,
  onToggleRun,
  onPageChange,
}: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt+A: Toggle ambient background
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        onToggleAmbient();
      }

      // Space: Toggle RUN/STOP
      if (e.key === ' ' && !e.ctrlKey && !e.altKey && !e.shiftKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          onToggleRun();
        }
      }

      // Number keys 1-4: Navigate pages
      if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          switch (e.key) {
            case '1':
              e.preventDefault();
              onPageChange('HOME');
              break;
            case '2':
              e.preventDefault();
              onPageChange('ROUTE');
              break;
            case '3':
              e.preventDefault();
              onPageChange('ENGINEER');
              break;
            case '4':
              e.preventDefault();
              onPageChange('CREATIVE');
              break;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onToggleAmbient, onToggleRun, onPageChange]);

  return null;
}
