import { useId } from 'react'

/**
 * "Il Banco del Colore" — il campo spettrale firma del sito.
 *
 * The Mixed-Not-Printed Rule: il colore deve leggersi come pigmento
 * *miscelato a mano*. Un gradiente CSS piatto viene deformato da una
 * turbolenza SVG (feTurbulence + feDisplacementMap) per ottenere bordi
 * mescolati e una transizione viva; sopra, una grana leggera.
 *
 * `tone` (0..1) sposta l'accento magenta lungo la banda: è ciò che permette
 * al banco interattivo della home di "miscelare" il tono selezionato.
 */
export function SpectralField({
  tone = 0.5,
  vertical = false,
  animate = true,
  className = '',
}: {
  tone?: number
  vertical?: boolean
  animate?: boolean
  className?: string
}) {
  const id = useId().replace(/:/g, '')
  const gradId = `grad-${id}`
  const filtId = `mix-${id}`
  const t = Math.max(0, Math.min(1, tone))
  // Salvia domina (sage carries regions); il magenta è l'accento finale, raro
  // (The One Voice Rule). Il tono sposta soltanto l'ampiezza dell'accento.
  const magentaStop = 80 + t * 11 // 80% → 91%
  const sageStop = 10 + (1 - t) * 6

  return (
    <div className={`overflow-hidden grain ${className}`} aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="0"
            y1="0"
            x2={vertical ? '0' : '1'}
            y2={vertical ? '1' : '0'}
          >
            <stop offset="0%" stopColor="#F1F4EC" />
            <stop offset={`${sageStop}%`} stopColor="#9CAF88" />
            <stop offset="46%" stopColor="#B4C79E" />
            <stop offset="70%" stopColor="#F9F9F6" />
            <stop offset={`${magentaStop}%`} stopColor="#E6007E" />
            <stop offset="100%" stopColor="#B80065" />
          </linearGradient>
          <filter id={filtId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.02"
              numOctaves={2}
              seed={7}
              result="noise"
            >
              {animate && (
                <animate
                  attributeName="baseFrequency"
                  dur="26s"
                  values="0.012 0.02;0.017 0.014;0.012 0.02"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={vertical ? 14 : 20}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <rect
          x="-10"
          y="-10"
          width="120"
          height="120"
          fill={`url(#${gradId})`}
          filter={`url(#${filtId})`}
        />
      </svg>
      {/* velo per fondere ulteriormente e tenere il contrasto del testo sopra */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ground/10" />
    </div>
  )
}
