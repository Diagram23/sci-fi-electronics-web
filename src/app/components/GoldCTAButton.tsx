/**
 * GoldCTAButton — dark burnished bronze.
 *
 * Filosofía revisada: el botón no debe competir con el producto.
 * Metal oscuro, mate, sin destello. La acción se lee en el label,
 * no en el reflejo de la superficie.
 *
 * Inspiración: consolas Neve 8078, botones de Leica M, carcasa de Rolex Submariner.
 */
import { motion } from 'framer-motion';

// ── Gradiente bronce oscuro — sin picos brillantes ──────────────
// La luz cae de forma muy suave, asimétrica, como en metal satinado.
export const GOLD_GRADIENT =
  'linear-gradient(108deg,' +
  '#2A1A08 0%,' +
  '#5E3E18 12%,' +
  '#7A5428 22%,' +
  '#9A7040 32%,' +
  '#A87E48 42%,' +
  '#B08858 50%,' +   // ← punto más alto: bronce cálido, no oro brillante
  '#9E7640 58%,' +
  '#886030 68%,' +
  '#9A7040 78%,' +
  '#7A5428 88%,' +
  '#2A1A08 100%)';

// Sin glow externo. Solo una sombra de elevación limpia.
export const GOLD_SHADOW =
  '0 2px 12px rgba(0,0,0,0.45), inset 0 1px 0 rgba(180,130,70,0.15)';

export const GOLD_SHADOW_HOVER =
  '0 4px 20px rgba(0,0,0,0.55), inset 0 1px 0 rgba(180,130,70,0.20)';

// ── Componente ───────────────────────────────────────────────────
interface GoldCTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  whileHover?: object;
  whileTap?: object;
  fontSize?: string;
  letterSpacing?: string;
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  borderRadius?: number | string;
  width?: string;
  ref?: React.RefObject<HTMLButtonElement>;
}

export default function GoldCTAButton({
  children,
  onClick,
  style,
  className,
  whileHover,
  whileTap,
  fontSize = '0.78rem',
  letterSpacing = '0.22em',
  paddingTop = '14px',
  paddingBottom = '14px',
  paddingLeft = '28px',
  paddingRight = '28px',
  borderRadius = 2,
  width,
}: GoldCTAButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={className}
      whileHover={whileHover ?? { scale: 1.012, y: -1 }}
      whileTap={whileTap ?? { scale: 0.97 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        border: 'none',
        cursor: 'pointer',
        borderRadius,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        width,
        backgroundImage: GOLD_GRADIENT,
        boxShadow: GOLD_SHADOW,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize,
        letterSpacing,
        textTransform: 'uppercase',
        /* Texto crema clara — legible sobre metal oscuro */
        color: 'rgba(224,200,160,0.92)',
        transition: 'box-shadow 0.3s ease',
        ...style,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = GOLD_SHADOW_HOVER;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = GOLD_SHADOW;
      }}
    >
      <span style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </span>
    </motion.button>
  );
}

