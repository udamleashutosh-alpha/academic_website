interface LibrarySceneProps {
  /** 0 -> far away, 1 -> close to desk */
  progress: number;
  className?: string;
}

// A stylized Renaissance library rendered as layered SVG.
// `progress` drives a subtle camera push-in via scale + translate.
export default function LibraryScene({ progress, className = '' }: LibrarySceneProps) {
  const scale = 1 + progress * 0.35;
  const translateY = progress * 4;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute left-1/2 top-1/2 h-[140%] w-[140%]"
        style={{
          transform: `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        <defs>
          <radialGradient id="candlelight" cx="50%" cy="55%" r="70%">
            <stop offset="0%" stopColor="#3A2E1F" />
            <stop offset="35%" stopColor="#241C15" />
            <stop offset="100%" stopColor="#0A0908" />
          </radialGradient>
          <linearGradient id="shelf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E251C" />
            <stop offset="100%" stopColor="#1A140F" />
          </linearGradient>
          <linearGradient id="desk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A2A1B" />
            <stop offset="100%" stopColor="#1A140F" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8D9A8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient room */}
        <rect width="1600" height="900" fill="url(#candlelight)" />

        {/* Warm candlelight glow center */}
        <ellipse cx="800" cy="520" rx="700" ry="380" fill="url(#glow)" opacity="0.6" />

        {/* Back wall bookshelves — left */}
        <g opacity="0.85">
          {[0, 1, 2, 3].map((row) => (
            <g key={row} transform={`translate(60, ${120 + row * 110})`}>
              <rect width="380" height="92" fill="url(#shelf)" />
              <rect width="380" height="4" y="92" fill="#0A0908" />
              {Array.from({ length: 16 }).map((_, i) => {
                const h = 60 + ((i * 7 + row * 5) % 24);
                const tones = ['#4A3520', '#5C3E22', '#3A2A18', '#6B4A28', '#2E251C', '#7A5630'];
                return (
                  <rect
                    key={i}
                    x={i * 23 + 4}
                    y={88 - h}
                    width={18}
                    height={h}
                    fill={tones[i % tones.length]}
                    stroke="#1A140F"
                    strokeWidth="0.5"
                  />
                );
              })}
            </g>
          ))}
        </g>

        {/* Back wall bookshelves — right */}
        <g opacity="0.85">
          {[0, 1, 2, 3].map((row) => (
            <g key={row} transform={`translate(1160, ${120 + row * 110})`}>
              <rect width="380" height="92" fill="url(#shelf)" />
              <rect width="380" height="4" y="92" fill="#0A0908" />
              {Array.from({ length: 16 }).map((_, i) => {
                const h = 60 + ((i * 5 + row * 7) % 24);
                const tones = ['#4A3520', '#5C3E22', '#3A2A18', '#6B4A28', '#2E251C', '#7A5630'];
                return (
                  <rect
                    key={i}
                    x={i * 23 + 4}
                    y={88 - h}
                    width={18}
                    height={h}
                    fill={tones[(i + 3) % tones.length]}
                    stroke="#1A140F"
                    strokeWidth="0.5"
                  />
                );
              })}
            </g>
          ))}
        </g>

        {/* Ancient map on left wall */}
        <g transform="translate(470, 200)" opacity="0.5">
          <rect width="120" height="160" fill="#F4ECD8" opacity="0.15" />
          <path d="M20,40 Q60,20 100,45 T90,90 Q60,110 30,95 Z" fill="none" stroke="#C9A227" strokeWidth="1" opacity="0.4" />
          <path d="M40,120 Q80,100 100,130" fill="none" stroke="#C9A227" strokeWidth="1" opacity="0.3" />
        </g>

        {/* Old globe — right */}
        <g transform="translate(1010, 360)" opacity="0.7">
          <circle cx="0" cy="0" r="55" fill="#2E251C" stroke="#C9A227" strokeWidth="1.5" />
          <ellipse cx="0" cy="0" rx="55" ry="20" fill="none" stroke="#C9A227" strokeWidth="0.8" opacity="0.5" />
          <ellipse cx="0" cy="0" rx="55" ry="40" fill="none" stroke="#C9A227" strokeWidth="0.8" opacity="0.4" />
          <path d="M-30,-20 Q-10,-30 5,-15 Q20,-5 30,-25" fill="none" stroke="#E8D9A8" strokeWidth="1" opacity="0.5" />
          <line x1="0" y1="-55" x2="0" y2="55" stroke="#C9A227" strokeWidth="0.8" opacity="0.5" />
          <rect x="-4" y="55" width="8" height="50" fill="#3A2A1B" />
          <ellipse cx="0" cy="108" rx="30" ry="6" fill="#1A140F" />
        </g>

        {/* Brass telescope — left, near window */}
        <g transform="translate(560, 380)" opacity="0.6">
          <line x1="0" y1="0" x2="-80" y2="-60" stroke="#C9A227" strokeWidth="6" strokeLinecap="round" />
          <line x1="0" y1="0" x2="-80" y2="-60" stroke="#E8D9A8" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <circle cx="-80" cy="-60" r="10" fill="#3A2A1B" stroke="#C9A227" strokeWidth="1.5" />
          <rect x="-6" y="-6" width="12" height="40" fill="#3A2A1B" rx="2" />
          <ellipse cx="0" cy="40" rx="18" ry="4" fill="#1A140F" />
        </g>

        {/* Oak desk */}
        <g>
          <rect x="480" y="640" width="640" height="40" fill="url(#desk)" />
          <rect x="480" y="680" width="640" height="160" fill="#1A140F" />
          <rect x="510" y="680" width="20" height="160" fill="#241C15" />
          <rect x="1070" y="680" width="20" height="160" fill="#241C15" />
          <rect x="480" y="640" width="640" height="3" fill="#5C3E22" opacity="0.6" />
        </g>

        {/* Candle on desk */}
        <g transform="translate(980, 600)" opacity="0.8">
          <rect x="-3" y="0" width="6" height="40" fill="#E8D9A8" />
          <ellipse cx="0" cy="-8" rx="4" ry="9" fill="#E8D9A8" opacity="0.9">
            <animate attributeName="ry" values="9;11;8;10;9" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.7;0.95;0.8;0.9" dur="2s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="0" cy="-6" rx="2" ry="5" fill="#C9A227" opacity="0.7">
            <animate attributeName="ry" values="5;7;4;6;5" dur="2.5s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* Subtle floor */}
        <rect y="840" width="1600" height="60" fill="#0A0908" opacity="0.9" />
      </svg>
    </div>
  );
}
