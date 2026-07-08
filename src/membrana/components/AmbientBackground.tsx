import { useEffect, useRef } from 'react';

interface AmbientBackgroundProps {
  enabled: boolean;
}

export function AmbientBackground({ enabled }: AmbientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const logicalWidth = 1024;
    const logicalHeight = 600;
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    canvas.style.width = `${logicalWidth}px`;
    canvas.style.height = `${logicalHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Partículas 3D con colores blancos/plateados
    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      color: string;
      pulsePhase: number;
      pulseSpeed: number;

      constructor() {
        this.x = Math.random() * logicalWidth;
        this.y = Math.random() * logicalHeight;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.speedZ = Math.random() * 0.3 + 0.1;
        
        // Colores blancos y plateados
        const colors = [
          'rgba(255, 255, 255, 0.9)',      // Blanco brillante
          'rgba(230, 235, 240, 0.85)',     // Plata clara
          'rgba(200, 210, 220, 0.8)',      // Plata media
          'rgba(240, 245, 250, 0.9)'       // Blanco plateado
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.z -= this.speedZ;

        // Wrap around
        if (this.x < 0) this.x = logicalWidth;
        if (this.x > logicalWidth) this.x = 0;
        if (this.y < 0) this.y = logicalHeight;
        if (this.y > logicalHeight) this.y = 0;
        if (this.z < 1) this.z = 1000;

        this.pulsePhase += this.pulseSpeed;
      }

      draw() {
        const scale = 1000 / (1000 + this.z);
        const x2d = (this.x - logicalWidth / 2) * scale + logicalWidth / 2;
        const y2d = (this.y - logicalHeight / 2) * scale + logicalHeight / 2;
        const size = this.size * scale;
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        
        // LED glow effect blanco/plateado
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 3);
        gradient.addColorStop(0, this.color.replace(/[\d.]+\)$/, `${pulse})`));
        gradient.addColorStop(0.5, this.color.replace(/[\d.]+\)$/, `${pulse * 0.3})`));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Formas geométricas 3D cromadas/plateadas
    class GeometricShape {
      x: number;
      y: number;
      z: number;
      rotation: number;
      rotationSpeed: number;
      size: number;
      vertices: number;
      color: string;
      borderColor: string;
      morphState: number; // 0 = sólido, 1 = completamente fragmentado
      morphDirection: number; // 1 = fragmentando, -1 = reagrupando
      morphSpeed: number;
      fragmentParticles: Array<{
        angle: number;
        distance: number;
        targetDistance: number;
        size: number;
        pulse: number;
        pulseSpeed: number;
      }>;
      morphTimer: number;
      morphInterval: number;

      constructor() {
        this.x = Math.random() * logicalWidth;
        this.y = Math.random() * logicalHeight;
        this.z = Math.random() * 800 + 200;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.size = Math.random() * 80 + 40;
        this.vertices = Math.floor(Math.random() * 3) + 3; // 3-6 sides
        
        // Rellenos plateados sutiles
        const fillColors = [
          'rgba(220, 230, 240, 0.12)',
          'rgba(200, 215, 230, 0.1)',
          'rgba(240, 245, 250, 0.15)',
          'rgba(190, 200, 215, 0.08)'
        ];
        this.color = fillColors[Math.floor(Math.random() * fillColors.length)];
        
        // Bordes blancos brillantes
        const borderColors = [
          'rgba(255, 255, 255, 0.35)',
          'rgba(230, 240, 250, 0.3)',
          'rgba(245, 250, 255, 0.4)'
        ];
        this.borderColor = borderColors[Math.floor(Math.random() * borderColors.length)];

        // Sistema de morfeo/transformación
        this.morphState = 0;
        this.morphDirection = 1;
        this.morphSpeed = 0.008;
        this.morphTimer = 0;
        this.morphInterval = Math.random() * 3000 + 2000; // 2-5 segundos antes de transformar

        // Inicializar partículas fragmentadas
        this.fragmentParticles = [];
        for (let i = 0; i < this.vertices; i++) {
          const angle = (i / this.vertices) * Math.PI * 2;
          this.fragmentParticles.push({
            angle: angle,
            distance: 0,
            targetDistance: Math.random() * 40 + 30, // distancia de dispersión
            size: Math.random() * 2.5 + 1, // mismo tamaño que partículas normales
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.03 + 0.01
          });
        }
      }

      update() {
        this.rotation += this.rotationSpeed;
        this.z -= 0.2;
        if (this.z < 100) this.z = 1000;

        // Sistema de morfeo cíclico
        this.morphTimer++;
        
        // Iniciar transformación después del intervalo
        if (this.morphTimer > this.morphInterval && this.morphState === 0 && this.morphDirection === 1) {
          this.morphDirection = 1; // empezar a fragmentar
        }
        
        // Animar el estado de morfeo
        if (this.morphDirection === 1 && this.morphState < 1) {
          this.morphState += this.morphSpeed;
          if (this.morphState >= 1) {
            this.morphState = 1;
            this.morphTimer = 0;
            this.morphInterval = Math.random() * 2000 + 1500; // tiempo fragmentado
          }
        } else if (this.morphDirection === -1 && this.morphState > 0) {
          this.morphState -= this.morphSpeed;
          if (this.morphState <= 0) {
            this.morphState = 0;
            this.morphDirection = 1;
            this.morphTimer = 0;
            this.morphInterval = Math.random() * 3000 + 2000;
            // Cambiar a nueva forma aleatoria
            this.vertices = Math.floor(Math.random() * 3) + 3;
            // Regenerar partículas para nuevos vértices
            this.fragmentParticles = [];
            for (let i = 0; i < this.vertices; i++) {
              const angle = (i / this.vertices) * Math.PI * 2;
              this.fragmentParticles.push({
                angle: angle,
                distance: 0,
                targetDistance: Math.random() * 40 + 30,
                size: Math.random() * 2.5 + 1,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.03 + 0.01
              });
            }
          }
        }

        // Cambiar dirección cuando está completamente fragmentado
        if (this.morphState === 1 && this.morphTimer > this.morphInterval) {
          this.morphDirection = -1; // empezar a reagrupar
          this.morphTimer = 0;
        }

        // Actualizar distancia de fragmentos con easing
        this.fragmentParticles.forEach(frag => {
          const targetDist = frag.targetDistance * this.morphState;
          frag.distance += (targetDist - frag.distance) * 0.1; // smooth easing
          frag.pulse += frag.pulseSpeed;
        });
      }

      draw() {
        const scale = 1000 / (1000 + this.z);
        const x2d = (this.x - logicalWidth / 2) * scale + logicalWidth / 2;
        const y2d = (this.y - logicalHeight / 2) * scale + logicalHeight / 2;
        const size = this.size * scale;

        ctx.save();
        ctx.translate(x2d, y2d);
        ctx.rotate(this.rotation);

        // Interpolar entre forma sólida y partículas
        const solidAlpha = 1 - this.morphState;
        const particleAlpha = this.morphState;

        // Dibujar forma sólida (se desvanece mientras se fragmenta)
        if (solidAlpha > 0.01) {
          ctx.beginPath();
          for (let i = 0; i < this.vertices; i++) {
            const angle = (i / this.vertices) * Math.PI * 2;
            const x = Math.cos(angle) * size;
            const y = Math.sin(angle) * size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();

          // Chrome border effect brillante con alpha
          const borderAlpha = parseFloat(this.borderColor.match(/[\d.]+(?=\))/)?.[0] || '0.35');
          ctx.strokeStyle = this.borderColor.replace(/[\d.]+\)$/, `${borderAlpha * solidAlpha})`);
          ctx.lineWidth = 2 * scale;
          ctx.stroke();

          // Inner glow plateado con alpha
          const fillAlpha = parseFloat(this.color.match(/[\d.]+(?=\))/)?.[0] || '0.1');
          ctx.fillStyle = this.color.replace(/[\d.]+\)$/, `${fillAlpha * solidAlpha})`);
          ctx.fill();
        }

        // Dibujar partículas fragmentadas (aparecen mientras se fragmenta)
        if (particleAlpha > 0.01) {
          this.fragmentParticles.forEach(frag => {
            const fragX = Math.cos(frag.angle) * (size + frag.distance);
            const fragY = Math.sin(frag.angle) * (size + frag.distance);
            const fragSize = frag.size * scale;
            const pulse = Math.sin(frag.pulse) * 0.3 + 0.7;

            ctx.beginPath();
            ctx.arc(fragX, fragY, fragSize, 0, Math.PI * 2);

            // LED glow effect como las partículas normales
            const gradient = ctx.createRadialGradient(fragX, fragY, 0, fragX, fragY, fragSize * 3);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${particleAlpha * pulse * 0.9})`);
            gradient.addColorStop(0.5, `rgba(230, 235, 240, ${particleAlpha * pulse * 0.3})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.fill();
          });
        }

        ctx.restore();
      }
    }

    // Grid lines 3D blancas/plateadas
    class GridLine {
      y: number;
      z: number;
      speed: number;

      constructor() {
        this.y = 0;
        this.z = Math.random() * 1000;
        this.speed = 1;
      }

      update() {
        this.z -= this.speed;
        if (this.z < 1) this.z = 1000;
      }

      draw() {
        const scale = 1000 / (1000 + this.z);
        const y2d = (this.y - logicalHeight / 2) * scale + logicalHeight / 2;
        
        const alpha = (1 - this.z / 1000) * 0.18;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.moveTo(0, y2d);
        ctx.lineTo(logicalWidth, y2d);
        ctx.stroke();
      }
    }

    // Initialize
    const particles: Particle[] = [];
    const shapes: GeometricShape[] = [];
    const gridLines: GridLine[] = [];

    for (let i = 0; i < 72; i++) {
      particles.push(new Particle());
    }

    for (let i = 0; i < 6; i++) {
      shapes.push(new GeometricShape());
    }

    for (let i = 0; i < 15; i++) {
      const line = new GridLine();
      line.y = (i / 15) * logicalHeight;
      gridLines.push(line);
    }

    // Mouse interaction
    let mouseX = logicalWidth / 2;
    let mouseY = logicalHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * logicalWidth;
      mouseY = ((e.clientY - rect.top) / rect.height) * logicalHeight;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      ctx.fillStyle = 'rgba(5, 7, 11, 0.16)';
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);

      // Draw grid
      gridLines.forEach(line => {
        line.update();
        line.draw();
      });

      // Draw shapes
      shapes.forEach(shape => {
        // Subtle mouse influence
        const dx = mouseX - shape.x;
        const dy = mouseY - shape.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          shape.x -= (dx / distance) * force * 0.5;
          shape.y -= (dy / distance) * force * 0.5;
        }

        shape.update();
        shape.draw();
      });

      // Draw particles
      particles.forEach(particle => {
        // Mouse attraction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x += (dx / distance) * force * 0.3;
          particle.y += (dy / distance) * force * 0.3;
        }

        particle.update();
        particle.draw();
      });

      // Connect nearby particles con líneas blancas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const scale1 = 1000 / (1000 + particles[i].z);
            const scale2 = 1000 / (1000 + particles[j].z);
            
            const x1 = (particles[i].x - logicalWidth / 2) * scale1 + logicalWidth / 2;
            const y1 = (particles[i].y - logicalHeight / 2) * scale1 + logicalHeight / 2;
            const x2 = (particles[j].x - logicalWidth / 2) * scale2 + logicalWidth / 2;
            const y2 = (particles[j].y - logicalHeight / 2) * scale2 + logicalHeight / 2;

            const alpha = (1 - distance / 100) * 0.15;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.68 }}
    />
  );
}
