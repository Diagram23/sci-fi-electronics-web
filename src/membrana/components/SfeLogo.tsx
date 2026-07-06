interface SfeLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export function SfeLogo({ className, style }: SfeLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Outer hexagon ring */}
      <polygon
        points="50,4 93,27.5 93,72.5 50,96 7,72.5 7,27.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Inner hexagon */}
      <polygon
        points="50,18 80,34 80,66 50,82 20,66 20,34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.5"
      />
      {/* SFE text mark */}
      <text
        x="50"
        y="44"
        textAnchor="middle"
        fontSize="14"
        fontWeight="900"
        fontFamily="Orbitron, monospace"
        fill="currentColor"
        letterSpacing="1"
      >
        SFE
      </text>
      {/* Divider line */}
      <line x1="28" y1="51" x2="72" y2="51" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {/* Subtitle */}
      <text
        x="50"
        y="63"
        textAnchor="middle"
        fontSize="6"
        fontWeight="600"
        fontFamily="monospace"
        fill="currentColor"
        letterSpacing="2"
        opacity="0.65"
      >
        MIDI
      </text>
      {/* Corner circuit dots */}
      <circle cx="50" cy="4" r="2" fill="currentColor" />
      <circle cx="93" cy="27.5" r="2" fill="currentColor" />
      <circle cx="93" cy="72.5" r="2" fill="currentColor" />
      <circle cx="50" cy="96" r="2" fill="currentColor" />
      <circle cx="7" cy="72.5" r="2" fill="currentColor" />
      <circle cx="7" cy="27.5" r="2" fill="currentColor" />
    </svg>
  );
}
