import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

type CustomCursorProps = {
  enabled: boolean;
};

export default function CustomCursor({ enabled }: CustomCursorProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const cursorX = useSpring(0, { stiffness: 650, damping: 36 });
  const cursorY = useSpring(0, { stiffness: 650, damping: 36 });
  const cursorXLag = useSpring(0, { stiffness: 350, damping: 32 });
  const cursorYLag = useSpring(0, { stiffness: 350, damping: 32 });

  useEffect(() => {
    if (enabled) {
      document.body.setAttribute('data-custom-cursor', 'true');
    } else {
      document.body.removeAttribute('data-custom-cursor');
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      cursorXLag.set(event.clientX);
      cursorYLag.set(event.clientY);

      const target = event.target as HTMLElement;
      const interactive = target.closest('button, a, input, textarea, [role="button"]');
      setIsHovering(Boolean(interactive));
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeAttribute('data-custom-cursor');
    };
  }, [cursorX, cursorY, cursorXLag, cursorYLag, enabled]);

  if (!enabled || !isVisible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.72 : isHovering ? 1.55 : 1,
            opacity: isHovering ? 0.6 : 1,
          }}
          transition={{ duration: 0.14, ease: 'easeOut' }}
          className="h-2 w-2 rounded-full bg-[#F4F1EA]"
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x: cursorXLag, y: cursorYLag, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.9 : isHovering ? 1.8 : 1,
            opacity: isHovering ? 0.55 : 0.3,
          }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="h-7 w-7 rounded-full border border-[#2DD4BF]/70"
        />
      </motion.div>
    </>
  );
}

