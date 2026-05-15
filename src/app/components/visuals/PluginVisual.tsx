import { useEffect, useRef } from 'react';

export type PluginVisualVariant = 'reverb' | 'delay' | 'gate' | 'distortion';

interface Props {
  variant: PluginVisualVariant;
  size?: number;
}

// ─── REVERB — slow concentric rings, contemplative ────────────────────────────
function setupReverb(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W / 2, cy = H / 2;
  const MAX_R = Math.min(W, H) * 0.46;
  type Ring = { r: number; opacity: number; speed: number; dashed: boolean };
  let rings: Ring[] = [
    { r: MAX_R * 0.18, opacity: 0.32, speed: 0.22, dashed: false },
    { r: MAX_R * 0.46, opacity: 0.18, speed: 0.22, dashed: true },
    { r: MAX_R * 0.72, opacity: 0.09, speed: 0.22, dashed: false },
  ];
  let frame = 0;

  return () => {
    ctx.clearRect(0, 0, W, H);

    // Slow pulse: new ring every ~5 seconds at 60fps
    if (frame % 300 === 0) {
      rings.push({ r: 2, opacity: 0.38, speed: 0.20 + Math.random() * 0.06, dashed: frame % 600 === 0 });
    }

    // Center source — very subtle, static glow
    const cGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
    cGrd.addColorStop(0, 'rgba(196,154,108,0.18)');
    cGrd.addColorStop(1, 'rgba(196,154,108,0)');
    ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fillStyle = cGrd; ctx.fill();

    // Core dot — steady
    ctx.beginPath(); ctx.arc(cx, cy, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(196,154,108,0.65)'; ctx.fill();

    rings.forEach(ring => {
      if (ring.dashed) ctx.setLineDash([3, 7]);
      else ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(196,154,108,${ring.opacity})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();
      ring.r += ring.speed;
      ring.opacity *= 0.9972; // very slow fade
    });
    ctx.setLineDash([]);

    rings = rings.filter(r => r.r < MAX_R + 5 && r.opacity > 0.005);
    frame++;
  };
}

// ─── DELAY — barely-rotating golden-ratio pentagons ──────────────────────────
function setupDelay(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W / 2, cy = H / 2;
  let rotation = -Math.PI / 2;
  const MAX_DEPTH = 9;
  const SCALE = 0.618;
  const ROT_STEP = Math.PI / 5;

  const drawPentagon = (x: number, y: number, r: number, rot: number, opacity: number, lw: number) => {
    ctx.beginPath();
    for (let i = 0; i <= 5; i++) {
      const angle = (i / 5) * Math.PI * 2 + rot;
      const px = x + r * Math.cos(angle), py = y + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = `rgba(139,111,71,${opacity})`;
    ctx.lineWidth = lw;
    ctx.stroke();
  };

  return () => {
    ctx.clearRect(0, 0, W, H);
    const maxR = Math.min(W, H) * 0.43;
    for (let i = 0; i < MAX_DEPTH; i++) {
      const r = maxR * Math.pow(SCALE, i);
      const rot = rotation + i * ROT_STEP;
      const opacity = (1 - i / MAX_DEPTH) * 0.65;
      const lw = Math.max(0.4, (MAX_DEPTH - i) * 0.10);
      drawPentagon(cx, cy, r, rot, opacity, lw);
    }
    // Near-imperceptible rotation — 0.0007 rad/frame ≈ 2.4°/s at 60fps
    rotation += 0.0007;
  };
}

// ─── GATE — slow spectral bars, clinical precision ───────────────────────────
function setupGate(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const NUM_BARS = 26;
  const PAD = W * 0.04;
  const maxH = H * 0.78;
  const totalW = W - PAD * 2;
  const barW = totalW / (NUM_BARS * 1.5);
  const gap = (totalW - NUM_BARS * barW) / (NUM_BARS - 1);

  const barParams = Array.from({ length: NUM_BARS }, (_, i) => ({
    freq: 0.12 + (i / NUM_BARS) * 1.4,  // much lower frequency oscillation
    phase: (i / NUM_BARS) * Math.PI * 2 + Math.random() * 0.6,
    amp: 0.42 + Math.random() * 0.52,
  }));

  let t = 0;

  return () => {
    ctx.clearRect(0, 0, W, H);
    // Threshold drifts very slowly
    const threshold = H * 0.54 + Math.sin(t * 0.09) * H * 0.12;

    barParams.forEach((bar, i) => {
      const h = Math.abs(Math.sin(t * bar.freq + bar.phase)) * bar.amp * maxH + 2;
      const x = PAD + i * (barW + gap);
      const y = H - h;
      const isAbove = y < threshold;

      const grd = ctx.createLinearGradient(x, y, x, H);
      if (isAbove) {
        grd.addColorStop(0, 'rgba(196,154,108,0.78)');
        grd.addColorStop(0.6, 'rgba(196,154,108,0.32)');
        grd.addColorStop(1, 'rgba(196,154,108,0.04)');
      } else {
        grd.addColorStop(0, 'rgba(27,107,90,0.28)');
        grd.addColorStop(1, 'rgba(27,107,90,0.03)');
      }
      ctx.fillStyle = grd;
      ctx.fillRect(x, y, barW, h);

      if (isAbove) {
        ctx.fillStyle = 'rgba(230,205,158,0.65)';
        ctx.fillRect(x, y, barW, 1.2);
      }
    });

    // Threshold line
    ctx.save();
    ctx.strokeStyle = 'rgba(220,195,150,0.38)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([3, 6]);
    ctx.beginPath(); ctx.moveTo(PAD, threshold); ctx.lineTo(W - PAD, threshold); ctx.stroke();
    ctx.setLineDash([]);
    // Threshold label text removed for clean minimalist aesthetic
    ctx.restore();

    // Very slow time increment — smooth, not jittery
    t += 0.007;
  };
}

// ─── DISTORTION — slow-morphing plasma discharge ─────────────────────────────
function setupDistortion(ctx: CanvasRenderingContext2D, W: number, H: number) {
  type Pt = [number, number];

  function displace(x1: number, y1: number, x2: number, y2: number, roughness: number, depth: number): Pt[] {
    if (depth === 0) return [[x2, y2]];
    const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * roughness;
    const my = (y1 + y2) / 2 + (Math.random() - 0.5) * roughness;
    return [
      ...displace(x1, y1, mx, my, roughness * 0.52, depth - 1),
      ...displace(mx, my, x2, y2, roughness * 0.52, depth - 1),
    ];
  }

  const cx = W / 2;
  let pts: Pt[] = [];
  let pts2: Pt[] = [];
  let frame = 0;
  // Opacity cycles: slow breath effect
  let boltOpacity = 0.72;
  let opacityDir = -1;

  return () => {
    ctx.clearRect(0, 0, W, H);

    // Redraw bolt structure every ~2 seconds (120 frames) — not every 4
    if (frame % 120 === 0) {
      const j = W * 0.05;
      const sx = cx + (Math.random() - 0.5) * j, ex = cx + (Math.random() - 0.5) * j;
      pts = [[sx, H * 0.08], ...displace(sx, H * 0.08, ex, H * 0.92, W * 0.28, 7)];
      const sx2 = cx + (Math.random() - 0.5) * j * 1.5;
      const ex2 = cx + (Math.random() - 0.5) * j * 1.5;
      pts2 = [[sx2, H * 0.08], ...displace(sx2, H * 0.08, ex2, H * 0.92, W * 0.18, 5)];
    }

    // Slow breathing opacity: cycles between 0.55 and 0.85
    boltOpacity += opacityDir * 0.004;
    if (boltOpacity < 0.52) opacityDir = 1;
    if (boltOpacity > 0.85) opacityDir = -1;

    const drawBolt = (bpts: Pt[], lineW: number, glowW: number, opacity: number) => {
      if (bpts.length < 2) return;
      ctx.beginPath(); ctx.moveTo(bpts[0][0], bpts[0][1]);
      bpts.forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.strokeStyle = `rgba(196,154,108,${opacity * 0.14})`; ctx.lineWidth = glowW + 5; ctx.stroke();

      ctx.beginPath(); ctx.moveTo(bpts[0][0], bpts[0][1]);
      bpts.forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.strokeStyle = `rgba(196,154,108,${opacity * 0.25})`; ctx.lineWidth = glowW; ctx.stroke();

      ctx.beginPath(); ctx.moveTo(bpts[0][0], bpts[0][1]);
      bpts.forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.strokeStyle = `rgba(235,215,175,${opacity})`; ctx.lineWidth = lineW; ctx.stroke();
    };

    drawBolt(pts2, 0.7, 2.5, boltOpacity * 0.28);
    drawBolt(pts, 1.1, 4.5, boltOpacity);

    // Electrode glow — steady
    [pts[0], pts[pts.length - 1]].filter(Boolean).forEach(([ex, ey]) => {
      const grd = ctx.createRadialGradient(ex, ey, 0, ex, ey, 16);
      grd.addColorStop(0, `rgba(196,154,108,${boltOpacity * 0.5})`);
      grd.addColorStop(1, 'rgba(196,154,108,0)');
      ctx.beginPath(); ctx.arc(ex, ey, 16, 0, Math.PI * 2);
      ctx.fillStyle = grd; ctx.fill();
    });

    frame++;
  };
}

export default function PluginVisual({ variant, size = 400 }: Props) {
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

    let drawFrame: () => void;
    switch (variant) {
      case 'reverb':      drawFrame = setupReverb(ctx, size, size); break;
      case 'delay':       drawFrame = setupDelay(ctx, size, size); break;
      case 'gate':        drawFrame = setupGate(ctx, size, size); break;
      case 'distortion':  drawFrame = setupDistortion(ctx, size, size); break;
    }

    let animId: number;
    let isVisible = false;

    const loop = () => {
      animId = requestAnimationFrame(loop);
      if (isVisible) drawFrame();
    };

    const observer = new IntersectionObserver(
      (entries) => { isVisible = entries[0].isIntersecting; },
      { threshold: 0.05 }
    );
    observer.observe(canvas);
    loop();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [variant, size]);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
}