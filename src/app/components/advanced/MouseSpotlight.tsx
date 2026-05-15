import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

type MouseSpotlightProps = {
  enabled: boolean;
};

export default function MouseSpotlight({ enabled }: MouseSpotlightProps) {
  const [active, setActive] = useState(enabled);
  const spotlightX = useSpring(0, { stiffness: 140, damping: 28 });
  const spotlightY = useSpring(0, { stiffness: 140, damping: 28 });

  useEffect(() => {
    setActive(enabled);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (event: MouseEvent) => {
      spotlightX.set(event.clientX);
      spotlightY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled, spotlightX, spotlightY]);

  if (!active) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[5]"
      style={{ x: spotlightX, y: spotlightY, translateX: '-50%', translateY: '-50%' }}
    >
      <div
        className="h-[460px] w-[460px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(45,212,191,0.11) 0%, rgba(184,147,109,0.07) 35%, transparent 72%)',
          filter: 'blur(56px)',
        }}
      />
    </motion.div>
  );
}

