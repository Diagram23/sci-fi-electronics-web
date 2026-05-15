import { useEffect, useState } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function TextScramble({ text, className = '', speed = 26, delay = 0 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setDisplayText(text);
      return;
    }

    let frame = 0;
    let interval: number | undefined;

    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        frame += 1;

        if (frame >= text.length + 1) {
          if (interval) window.clearInterval(interval);
          setDisplayText(text);
          return;
        }

        const scrambled = text
          .split('')
          .map((char, index) => {
            if (char === ' ' || index < frame) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');

        setDisplayText(scrambled);
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [delay, speed, text]);

  return <span className={className}>{displayText}</span>;
}
