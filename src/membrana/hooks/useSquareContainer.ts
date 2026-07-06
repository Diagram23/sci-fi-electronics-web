import { useLayoutEffect, useRef, useState, useCallback } from 'react';

interface UseSquareContainerOptions {
  padding?: number;
  minSize?: number;
  maxSize?: number;
}

/**
 * Hook para calcular el tamaño de un contenedor cuadrado perfecto
 * basado en el espacio disponible del contenedor padre.
 * 
 * Optimizado para Raspberry Pi 5 pantalla táctil 1024×600
 * 
 * Toma la dimensión MÍNIMA entre ancho y alto, resta padding,
 * y aplica límites min/max para evitar tamaños arbitrarios.
 * 
 * @param options - Configuración del contenedor
 * @returns ref para el contenedor padre y el tamaño calculado
 */
export function useSquareContainer(options: UseSquareContainerOptions = {}) {
  const { padding = 20, minSize = 320, maxSize = 480 } = options;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(minSize);

  const calculateSize = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    // Tomar la dimensión MÍNIMA para mantener cuadrado
    const availableSpace = Math.min(rect.width, rect.height);
    
    // Restar padding y aplicar límites
    const calculatedSize = Math.floor(availableSpace - padding);
    const clampedSize = Math.max(minSize, Math.min(maxSize, calculatedSize));
    
    setSize(clampedSize);
  }, [padding, minSize, maxSize]);

  useLayoutEffect(() => {
    // Calcular inmediatamente
    calculateSize();

    // Observer para cambios de tamaño
    const resizeObserver = new ResizeObserver(() => {
      // Usar requestAnimationFrame para evitar loops
      requestAnimationFrame(calculateSize);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Listener para cambios de ventana
    window.addEventListener('resize', calculateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateSize);
    };
  }, [calculateSize]);

  return {
    containerRef,
    size,
  };
}