import { useEffect, useRef } from 'react';

interface Props {
  size?: number;
  accentRGB?: string;
}

// CRT phosphor Lissajous oscilloscope — 3:2 ratio, amber phosphor glow
export default function OscilloscopeCanvas({ size = 380, accentRGB = '196,154,108' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2, cy = size / 2;
    const R = size * 0.37;

    let beamT = 0;
    let delta = 0;
    let animId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => { isVisible = entries[0].isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Init to dark
    ctx.fillStyle = `rgb(7,5,4)`;
    ctx.fillRect(0, 0, size, size);

    const lissX = (t: number) => cx + R * Math.sin(3 * t + delta);
    const lissY = (t: number) => cy + R * Math.sin(2 * t);

    const drawFrame = () => {
      animId = requestAnimationFrame(drawFrame);
      if (!isVisible) return;

      // Clip to circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2 - 0.5, 0, Math.PI * 2);
      ctx.clip();

      // Phosphor persistence fade
      ctx.fillStyle = 'rgba(7,5,4,0.024)';
      ctx.fillRect(0, 0, size, size);

      // Beam: 4 dots per frame = smooth sweep
      const DT = 0.044;
      for (let i = 0; i < 4; i++) {
        const t = beamT + (i / 4) * DT;
        const x = lissX(t), y = lissY(t);

        // Outer glow
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 7);
        grd.addColorStop(0, `rgba(${accentRGB},0.5)`);
        grd.addColorStop(1, `rgba(${accentRGB},0)`);
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(x, y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242,224,182,0.97)`;
        ctx.fill();
      }

      // Graticule grid (after fade so it stays at fixed opacity)
      ctx.strokeStyle = `rgba(${accentRGB},0.04)`;
      ctx.lineWidth = 0.5;
      for (let i = 1; i < 6; i++) {
        const p = (size / 6) * i;
        ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, size); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(size, p); ctx.stroke();
      }
      // Center crosshairs
      ctx.strokeStyle = `rgba(${accentRGB},0.07)`;
      ctx.lineWidth = 0.6;
      ctx.setLineDash([2, 5]);
      ctx.beginPath(); ctx.moveTo(cx, 4); ctx.lineTo(cx, size - 4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(4, cy); ctx.lineTo(size - 4, cy); ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();

      beamT += DT;
      delta += 0.00048; // Morph Lissajous very slowly
    };

    drawFrame();
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [size, accentRGB]);

  return <canvas ref={canvasRef} style={{ display: 'block', borderRadius: '50%' }} />;
}
