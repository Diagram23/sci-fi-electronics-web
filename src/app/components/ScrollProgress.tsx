import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [hidden, setHidden] = useState(false);
  const { scrollYProgress } = useScroll({ layoutEffect: false });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setHidden(reducedMotion);
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[130] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #2DD4BF 0%, #B8936D 100%)',
      }}
    />
  );
}

