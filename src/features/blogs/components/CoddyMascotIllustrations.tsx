import { BlogIllustrationType } from '../types';

interface CoddyMascotIllustrationProps {
  type: BlogIllustrationType;
  className?: string;
}

export function CoddyMascotIllustration({
  type,
  className = 'w-full h-full',
}: CoddyMascotIllustrationProps) {
  switch (type) {
    case 'tuduy':
      return (
        <svg
          className={className}
          viewBox="0 0 400 225"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circles */}
          <circle cx="200" cy="112" r="85" fill="#DBEAFE" />
          <circle cx="200" cy="112" r="65" fill="#BFDBFE" />

          {/* AI / Mind Sparkles & Brain Nodes */}
          <path d="M120 70 L150 90 M280 70 L250 90 M130 160 L160 140 M270 160 L240 140" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="4 4" />
          <circle cx="120" cy="70" r="8" fill="#3B82F6" />
          <circle cx="280" cy="70" r="8" fill="#60A5FA" />
          <circle cx="130" cy="160" r="6" fill="#93C5FD" />
          <circle cx="270" cy="160" r="6" fill="#3B82F6" />

          {/* Sparkles */}
          <path d="M300 100 L304 108 L312 112 L304 116 L300 124 L296 116 L288 112 L296 108 Z" fill="#F59E0B" />
          <path d="M90 110 L92 115 L97 117 L92 119 L90 124 L88 119 L83 117 L88 115 Z" fill="#10B981" />

          {/* Coddy Mascot Body */}
          <ellipse cx="200" cy="140" rx="42" ry="38" fill="#F97316" />
          <ellipse cx="200" cy="145" rx="28" ry="24" fill="#FFEDD5" />

          {/* Ears */}
          <circle cx="170" cy="85" r="16" fill="#EA580C" />
          <circle cx="170" cy="85" r="9" fill="#FED7AA" />
          <circle cx="230" cy="85" r="16" fill="#EA580C" />
          <circle cx="230" cy="85" r="9" fill="#FED7AA" />

          {/* Head */}
          <circle cx="200" cy="105" r="32" fill="#F97316" />
          <ellipse cx="200" cy="113" rx="14" ry="10" fill="#FFF7ED" />
          <ellipse cx="200" cy="109" rx="4" ry="3" fill="#431407" />

          {/* Futuristic Thinking Visor / Goggles */}
          <rect x="176" y="93" width="48" height="18" rx="9" fill="#1E293B" />
          <rect x="180" y="96" width="40" height="12" rx="6" fill="#3B82F6" />
          <path d="M184 100 L216 100" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />

          {/* Smile */}
          <path d="M195 117 Q200 121 205 117" stroke="#431407" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Holding Idea Bulb / Core */}
          <circle cx="172" cy="140" r="7" fill="#EA580C" />
          <circle cx="228" cy="140" r="7" fill="#EA580C" />
          <rect x="188" y="132" width="24" height="20" rx="4" fill="#3B82F6" stroke="#2563EB" strokeWidth="2" />
          <path d="M196 138 L204 146 M204 138 L196 146" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'phuongphap':
      return (
        <svg
          className={className}
          viewBox="0 0 400 225"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circles */}
          <circle cx="200" cy="112" r="85" fill="#F3E8FF" />
          <circle cx="200" cy="112" r="65" fill="#E9D5FF" />

          {/* Desk & Tools */}
          <rect x="110" y="165" width="180" height="12" rx="6" fill="#A855F7" />

          {/* Coddy Mascot Body */}
          <ellipse cx="200" cy="130" rx="38" ry="34" fill="#F97316" />
          <ellipse cx="200" cy="134" rx="24" ry="20" fill="#FFEDD5" />

          {/* Ears */}
          <circle cx="172" cy="78" r="15" fill="#EA580C" />
          <circle cx="172" cy="78" r="8" fill="#FED7AA" />
          <circle cx="228" cy="78" r="15" fill="#EA580C" />
          <circle cx="228" cy="78" r="8" fill="#FED7AA" />

          {/* Head */}
          <circle cx="200" cy="96" r="30" fill="#F97316" />
          <ellipse cx="200" cy="103" rx="12" ry="9" fill="#FFF7ED" />
          <ellipse cx="200" cy="100" rx="3.5" ry="2.5" fill="#431407" />

          {/* Happy Eyes */}
          <path d="M188 94 Q193 88 196 94" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M204 94 Q207 88 212 94" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M195 107 Q200 111 205 107" stroke="#431407" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Laptop / Blueprint Screen */}
          <rect x="155" y="115" width="90" height="50" rx="6" fill="#1E293B" />
          <rect x="160" y="120" width="80" height="40" rx="4" fill="#0F172A" />
          <path d="M166 128 L180 128" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <path d="M185 128 L205 128" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
          <path d="M172 135 L195 135" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />
          <path d="M172 142 L215 142" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />

          {/* Laptop Base */}
          <path d="M145 165 L255 165 L245 172 L155 172 Z" fill="#64748B" />

          {/* Mascot Paws */}
          <circle cx="168" cy="162" r="6" fill="#EA580C" />
          <circle cx="232" cy="162" r="6" fill="#EA580C" />
        </svg>
      );

    case 'quant':
    default:
      return (
        <svg
          className={className}
          viewBox="0 0 400 225"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circles */}
          <circle cx="200" cy="112" r="85" fill="#FEF3C7" />
          <circle cx="200" cy="112" r="65" fill="#FDE68A" />

          {/* Candlestick / Quant Financial Chart Lines */}
          <path d="M110 140 L140 100 L170 120 L210 70 L250 95 L290 60" stroke="#D97706" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="210" cy="70" r="5" fill="#10B981" />
          <circle cx="290" cy="60" r="5" fill="#10B981" />

          {/* Balance Scale / Mathematical Quant Icon */}
          <path d="M130 90 L110 130 M130 90 L150 130" stroke="#F59E0B" strokeWidth="2" />
          <rect x="100" y="130" width="60" height="25" rx="5" fill="#2563EB" />
          <text x="130" y="147" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">QUANT</text>

          {/* Coddy Mascot Body */}
          <ellipse cx="200" cy="140" rx="36" ry="30" fill="#F97316" />
          <ellipse cx="200" cy="144" rx="22" ry="18" fill="#FFEDD5" />

          {/* Ears */}
          <circle cx="176" cy="90" r="14" fill="#EA580C" />
          <circle cx="176" cy="90" r="7" fill="#FED7AA" />
          <circle cx="224" cy="90" r="14" fill="#EA580C" />
          <circle cx="224" cy="90" r="7" fill="#FED7AA" />

          {/* Head */}
          <circle cx="200" cy="108" r="28" fill="#F97316" />
          <ellipse cx="200" cy="115" rx="11" ry="8" fill="#FFF7ED" />
          <ellipse cx="200" cy="112" rx="3" ry="2" fill="#431407" />

          {/* Curious eyes looking up */}
          <circle cx="191" cy="104" r="3.5" fill="#431407" />
          <circle cx="209" cy="104" r="3.5" fill="#431407" />
          <circle cx="192" cy="102" r="1.2" fill="#FFFFFF" />
          <circle cx="210" cy="102" r="1.2" fill="#FFFFFF" />

          {/* Smile */}
          <path d="M197 118 Q202 116 205 119" stroke="#431407" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );
  }
}
