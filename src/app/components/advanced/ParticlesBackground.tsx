import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacityTarget: number;
  opacitySpeed: number;
}

type ParticlesBackgroundProps = {
  enabled: boolean;
};

export default function ParticlesBackground({ enabled }: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 8 : 18;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i += 1) {
      const opacity = Math.random() * 0.22 + 0.03;
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 0.9 + 0.28,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.08,
        opacity: opacity * 0.8,
        opacityTarget: opacity,
        opacitySpeed: Math.random() * 0.003 + 0.001,
      });
    }

    let frame = 0;
    let raf = 0;
    let isVisible = document.visibilityState === 'visible';

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      frame += 1;
      raf = requestAnimationFrame(animate);
      if (!isVisible || frame % 2 !== 0) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        if (Math.abs(particle.opacity - particle.opacityTarget) < 0.005) {
          particle.opacityTarget = Math.random() * 0.22 + 0.03;
        }
        particle.opacity += (particle.opacityTarget - particle.opacity) * particle.opacitySpeed;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(184, 147, 109, ${particle.opacity})`;
        context.fill();
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
}

