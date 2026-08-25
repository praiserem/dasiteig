interface ProductArtProps {
  art: string
  color: string
  className?: string
}

// Convert any hex color to its grayscale equivalent so the whole
// catalogue stays strictly black & white regardless of source data.
function toGrayscale(hex: string): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!m) return '#737373'
  const n = parseInt(m[1], 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const l = Math.round(0.299 * r + 0.587 * g + 0.114 * b)
  const c = l.toString(16).padStart(2, '0')
  return `#${c}${c}${c}`
}

// Original, code-drawn studio illustrations. No photography, no external
// assets — each product renders as a simple line drawing over a paper
// backdrop with a soft contact shadow, in the spirit of clean studio
// product photography without reproducing any reference imagery.
export function ProductArt({ art, color, className }: ProductArtProps) {
  const gray = toGrayscale(color)
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-paper ${className ?? ''}`}>
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(${gray} 1px, transparent 1px)`,
          backgroundSize: '18px 18px',
        }}
      />
      <svg viewBox="0 0 240 240" className="relative h-[70%] w-[70%]" fill="none">
        <ellipse cx="120" cy="205" rx="62" ry="9" fill="#141414" opacity="0.06" />
        <g stroke="#141414" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          {renderArt(art, gray)}
        </g>
      </svg>
    </div>
  )
}

function renderArt(art: string, color: string) {
  switch (art) {
    case 'tote':
      return (
        <>
          <path d="M62 90 L70 55 Q75 42 90 42 H150 Q165 42 170 55 L178 90" fill="none" />
          <rect x="52" y="90" width="136" height="105" fill={color} fillOpacity="0.55" />
          <path d="M92 90 V70 Q92 52 120 52 Q148 52 148 70 V90" fill="none" />
        </>
      )
    case 'torch':
      return (
        <>
          <rect x="100" y="50" width="40" height="130" rx="6" fill={color} fillOpacity="0.55" />
          <path d="M100 80 H140" />
          <path d="M100 130 H140" />
          <path d="M108 50 L96 34 H144 L132 50" fill={color} fillOpacity="0.35" />
          <circle cx="120" cy="30" r="4" fill="none" />
        </>
      )
    case 'jacket':
      return (
        <>
          <path
            d="M90 55 L70 70 L58 110 L76 118 L82 190 H158 L164 118 L182 110 L170 70 L150 55 L120 68 Z"
            fill={color}
            fillOpacity="0.55"
          />
          <path d="M120 68 V190" />
          <path d="M95 100 V150 M145 100 V150" />
        </>
      )
    case 'multitool':
      return (
        <>
          <rect x="95" y="55" width="50" height="120" rx="10" fill={color} fillOpacity="0.55" />
          <path d="M95 90 H60 M95 105 H55 M145 90 H180 M145 105 H185" />
          <path d="M110 55 V175 M130 55 V175" opacity="0.5" />
        </>
      )
    case 'beanie':
      return (
        <>
          <path
            d="M64 130 Q64 62 120 55 Q176 62 176 130 H64 Z"
            fill={color}
            fillOpacity="0.55"
          />
          <rect x="64" y="130" width="112" height="26" fill={color} fillOpacity="0.35" />
          <path d="M120 55 V130" opacity="0.5" />
          <path d="M90 60 Q90 120 90 130 M150 60 Q150 120 150 130" opacity="0.4" />
        </>
      )
    case 'mug':
      return (
        <>
          <path d="M78 68 H150 L146 168 Q144 182 128 182 H100 Q84 182 82 168 Z" fill={color} fillOpacity="0.55" />
          <path d="M150 88 Q182 88 182 116 Q182 144 150 144" fill="none" />
          <path d="M78 68 H150" />
        </>
      )
    case 'satchel':
      return (
        <>
          <rect x="66" y="95" width="108" height="88" rx="4" fill={color} fillOpacity="0.55" />
          <path d="M66 122 Q120 145 174 122" fill="none" />
          <path d="M80 95 L60 45 M160 95 L180 45" />
          <circle cx="120" cy="118" r="4" fill="#141414" />
        </>
      )
    case 'lamp':
      return (
        <>
          <ellipse cx="120" cy="188" rx="46" ry="8" fill={color} fillOpacity="0.4" />
          <path d="M120 180 V120" />
          <path d="M120 120 L162 96" />
          <path d="M162 96 L150 62 L200 74 Z" fill={color} fillOpacity="0.55" />
          <circle cx="120" cy="180" r="6" fill="#141414" />
          <circle cx="120" cy="120" r="6" fill="#141414" />
        </>
      )
    case 'sunglasses':
      return (
        <>
          <circle cx="86" cy="118" r="34" fill={color} fillOpacity="0.55" />
          <circle cx="154" cy="118" r="34" fill={color} fillOpacity="0.55" />
          <path d="M120 112 Q120 122 120 118" />
          <path d="M52 112 L28 100 M188 112 L212 100" />
        </>
      )
    default:
      return <rect x="70" y="70" width="100" height="100" fill={color} fillOpacity="0.55" />
  }
}
