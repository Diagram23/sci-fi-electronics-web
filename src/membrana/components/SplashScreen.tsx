import { useEffect, useState } from "react";
import { SfeLogo } from "./SfeLogo";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"boot" | "ready" | "fadeout">("boot");
  const [scanY, setScanY] = useState(-10);
  const [statusLines, setStatusLines] = useState<string[]>([]);

  const BOOT_MESSAGES = [
    "INIT MIDI ENGINE...",
    "SCANNING USB PORTS...",
    "LOADING ROUTE TABLE...",
    "CALIBRATING CLOCK...",
    "CHECKING DEVICES...",
    "READY",
  ];

  useEffect(() => {
    const bootInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(bootInterval);
          setTimeout(() => setPhase("ready"), 200);
          return 100;
        }
        return prev + 1.8;
      });
    }, 18);
    return () => clearInterval(bootInterval);
  }, []);

  // Add boot status lines progressively
  useEffect(() => {
    const thresholds = [5, 20, 40, 58, 78, 95];
    thresholds.forEach((t, i) => {
      if (progress >= t && !statusLines.includes(BOOT_MESSAGES[i])) {
        setStatusLines((prev) => {
          if (prev.includes(BOOT_MESSAGES[i])) return prev;
          return [...prev, BOOT_MESSAGES[i]];
        });
      }
    });
  }, [progress]);

  // Scan line sweep animation
  useEffect(() => {
    if (phase !== "boot") return;
    const sweep = setInterval(() => {
      setScanY((y) => (y >= 110 ? -10 : y + 0.4));
    }, 16);
    return () => clearInterval(sweep);
  }, [phase]);

  useEffect(() => {
    if (phase === "ready") {
      const readyTimer = setTimeout(() => {
        setPhase("fadeout");
        setTimeout(onComplete, 600);
      }, 800);
      return () => clearTimeout(readyTimer);
    }
  }, [phase, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-600 ${
        phase === "fadeout" ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(ellipse at 50% 45%, #141820 0%, #0a0c10 55%, #060809 100%)",
        transition: "opacity 0.6s ease-in-out",
      }}
    >
      {/* Scanline CRT texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.022) 2px, rgba(0,0,0,0.022) 4px)",
          zIndex: 2,
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.055'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          opacity: 0.8,
          zIndex: 2,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)",
          zIndex: 3,
        }}
      />

      {/* Horizontal scan beam sweeping over the scene */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: `${scanY}%`,
          height: "3px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 20%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 80%, transparent 100%)",
          boxShadow: "0 0 12px rgba(255,255,255,0.06)",
          zIndex: 4,
          transition: "none",
        }}
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-14">
        {/* Logo */}
        <div
          className="relative transition-all duration-700"
          style={{ transform: phase === "ready" ? "scale(1.03)" : "scale(1)" }}
        >
          {/* Multi-layer halo */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: "-60px",
              background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(74,144,184,0.05) 40%, transparent 65%)",
              filter: "blur(30px)",
              opacity: phase === "ready" ? 1 : 0.6,
              transition: "opacity 0.7s",
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: "-30px",
              background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)",
              filter: "blur(12px)",
              opacity: phase === "ready" ? 1 : 0.4,
              transition: "opacity 0.7s",
            }}
          />

          {/* Logo image */}
          <div className="relative w-72 h-72">
            <SfeLogo
              className="w-full h-full"
              style={{
                color: 'rgba(255,255,255,0.92)',
                filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.3))',
              }}
            />
            {/* Logo inner scan shimmer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(180deg, rgba(255,255,255,0.06) ${scanY - 8}%, rgba(255,255,255,0.16) ${scanY}%, rgba(255,255,255,0.06) ${scanY + 8}%, transparent ${scanY + 16}%)`,
                borderRadius: "50%",
              }}
            />
          </div>
        </div>

        {/* Wordmark */}
        <div className="flex flex-col items-center gap-2.5">
          <h1
            className="font-black text-white"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "52px",
              letterSpacing: "0.22em",
              textShadow: "0 0 30px rgba(255,255,255,0.55), 0 0 60px rgba(255,255,255,0.25), 0 0 90px rgba(255,255,255,0.10)",
              opacity: progress > 65 ? 1 : 0,
              filter: progress > 65 ? "blur(0px)" : "blur(12px)",
              transform: progress > 65 ? "translateY(0)" : "translateY(22px)",
              transition: "opacity 0.9s ease-in-out, filter 0.9s, transform 0.9s",
              lineHeight: "1",
            }}
          >
            MEMBRANA
          </h1>

          <div
            className="flex items-center gap-3"
            style={{
              opacity: progress > 75 ? 1 : 0,
              transition: "opacity 0.8s ease-in-out 0.2s",
            }}
          >
            <div
              className="h-px w-12"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3))" }}
            />
            <p
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "9px",
                letterSpacing: "0.42em",
                color: "rgba(255,255,255,0.28)",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Sci-Fi Electronics
            </p>
            <div
              className="h-px w-12"
              style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)" }}
            />
          </div>
        </div>
      </div>

      {/* Boot log — bottom left */}
      <div
        className="absolute bottom-20 left-16"
        style={{
          opacity: progress > 10 ? 1 : 0,
          transition: "opacity 0.5s",
        }}
      >
        <div className="flex flex-col gap-1">
          {statusLines.map((line, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-1 h-1 rounded-full"
                style={{
                  background: line === "READY" ? "#10b981" : "rgba(74,144,184,0.7)",
                  boxShadow: line === "READY" ? "0 0 6px rgba(16,185,129,0.8)" : undefined,
                }}
              />
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "8px",
                  letterSpacing: "0.12em",
                  color: line === "READY" ? "#10b981" : "rgba(255,255,255,0.25)",
                  fontWeight: 600,
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar — bottom center */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[440px]">
        <div className="flex flex-col gap-2.5">
          {/* Bar track */}
          <div
            className="relative h-[2px] rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            {/* Fill */}
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress}%`,
                background: phase === "ready"
                  ? "linear-gradient(90deg, rgba(16,185,129,0.7) 0%, rgba(16,185,129,1) 100%)"
                  : "linear-gradient(90deg, rgba(74,144,184,0.6) 0%, rgba(139,92,246,0.6) 50%, rgba(255,178,74,0.6) 100%)",
                transition: "width 0.1s linear",
                boxShadow: phase === "ready"
                  ? "0 0 8px rgba(16,185,129,0.6)"
                  : "0 0 6px rgba(139,92,246,0.4)",
              }}
            />
            {/* Moving highlight on fill edge */}
            {progress < 100 && (
              <div
                className="absolute top-0 bottom-0 w-4"
                style={{
                  left: `calc(${progress}% - 8px)`,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                  transition: "left 0.1s linear",
                }}
              />
            )}
          </div>

          {/* Status text row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  color: phase === "ready" ? "#10b981" : "rgba(255,255,255,0.25)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  transition: "color 0.3s",
                  textShadow: phase === "ready" ? "0 0 8px rgba(16,185,129,0.5)" : undefined,
                }}
              >
                {phase === "boot" ? "BOOT SEQUENCE" : "SYSTEM READY"}
              </span>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5">
                {[33, 66, 100].map((threshold, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full transition-all duration-400"
                    style={{
                      background: progress >= threshold
                        ? i === 2 ? "#8b5cf6" : "rgba(74,144,184,0.7)"
                        : "rgba(255,255,255,0.10)",
                      boxShadow: progress >= threshold && i === 2 ? "0 0 4px rgba(139,92,246,0.7)" : undefined,
                    }}
                  />
                ))}
              </div>
            </div>

            <span
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "9px",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.20)",
                fontWeight: 700,
              }}
            >
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}