import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

type CommonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

type AnchorProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
  };

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
  };

type MagneticButtonProps = AnchorProps | ButtonProps;

export default function MagneticButton({ children, className = '', strength = 0.2, ...rest }: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [supportsMagnetism, setSupportsMagnetism] = useState(false);

  const x = useSpring(0, { stiffness: 280, damping: 26 });
  const y = useSpring(0, { stiffness: 280, damping: 26 });

  useEffect(() => {
    const evaluate = () => {
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setSupportsMagnetism(!coarse && !reduced);
    };

    evaluate();
    window.addEventListener('resize', evaluate);
    return () => window.removeEventListener('resize', evaluate);
  }, []);

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!supportsMagnetism) return;

    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((event.clientX - centerX) * strength);
    y.set((event.clientY - centerY) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const baseProps = {
    onMouseMove: handleMove,
    onMouseEnter: () => setIsHovered(supportsMagnetism),
    onMouseLeave: handleLeave,
    whileTap: { scale: 0.96 },
    style: supportsMagnetism ? { x, y } : undefined,
    className,
  } as const;

  if ((rest as AnchorProps).as === 'a') {
    const { as: _as, ...anchorProps } = rest as AnchorProps;
    return (
      <motion.a
        {...anchorProps}
        {...baseProps}
        href={anchorProps.href || '/contact'}
        ref={(node) => {
          ref.current = node;
        }}
      >
        <motion.span animate={{ scale: isHovered && supportsMagnetism ? 1.03 : 1 }} transition={{ duration: 0.2 }}>
          {children}
        </motion.span>
      </motion.a>
    );
  }

  const { as: _as, ...buttonProps } = rest as ButtonProps;
  return (
    <motion.button
      {...buttonProps}
      {...baseProps}
      ref={(node) => {
        ref.current = node;
      }}
    >
      <motion.span animate={{ scale: isHovered && supportsMagnetism ? 1.03 : 1 }} transition={{ duration: 0.2 }}>
        {children}
      </motion.span>
    </motion.button>
  );
}

