import type { CSSProperties, ReactNode } from 'react'
import { Icon } from './Icon'

/** Logo "G" di Google a colori (per le recensioni). */
export function GoogleG({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

/** Etichetta di notazione tecnica — mono, tracciata, piccola (Notation Rule). */
export function Notation({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <span className={`notation ${className}`}>{children}</span>
}

/**
 * Segnaposto onesto e "in-mondo" per una foto reale ancora da inserire.
 * Non è un'immagine rotta: è una superficie salvia con etichetta chiara.
 */
export function PhotoPlaceholder({
  label,
  ratio = 'aspect-[4/3]',
  className = '',
}: {
  label: string
  ratio?: string
  className?: string
}) {
  return (
    <div
      className={`relative grid place-items-center overflow-hidden rounded-[4px] bg-sunken ring-1 ring-inset ring-sage-600/15 ${ratio} ${className}`}
    >
      {/* trama a strisce salvia/limewash, discreta */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, rgba(156,175,136,0.16) 0 22px, transparent 22px 46px)',
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
        <Icon name="drop" size={26} className="text-sageInk" />
        <Notation className="!text-sageInk/80">{label}</Notation>
      </div>
    </div>
  )
}

/** Contenitore-scheda flat, con leggera elevazione solo allo stato (Flat-Bench). */
export function BenchCard({
  children,
  className = '',
  interactive = false,
}: {
  children: ReactNode
  className?: string
  interactive?: boolean
}) {
  return (
    <div
      className={`rounded-[5px] bg-raised ring-1 ring-ink/10 transition-all duration-300 ease-bench ${
        interactive
          ? 'hover:-translate-y-1 hover:ring-ink/20 hover:shadow-[0_18px_40px_-24px_rgba(51,51,51,0.45)]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * Foto in cornice bianca, tipo polaroid: bordo stretto e fondo largo, dove
 * può stare una didascalia scritta a mano.
 *
 * Due scelte vincolate dal sistema:
 *  • il fondo è `bg-pure`, non `bg-raised`. `raised` segue il tema e in
 *    modalità scura diventerebbe grigio scuro: la cornice deve restare
 *    bianca sempre, altrimenti non è più una polaroid.
 *  • a riposo NON c'è ombra (Flat-Bench Rule: un'ombra significa che
 *    qualcosa è stato sollevato). La foto si stacca dal fondo per la
 *    cornice bianca e per l'inclinazione, che è materia, non elevazione.
 *    L'ombra arriva solo al passaggio del mouse, dove la foto si raddrizza.
 */
export function Polaroid({
  src,
  alt,
  width,
  height,
  caption,
  tilt = 0,
  maxW,
  className = '',
}: {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  /** Inclinazione a riposo, in gradi. */
  tilt?: number
  /** Larghezza massima della cornice, in rem. */
  maxW?: number
  className?: string
}) {
  return (
    <figure
      // Larghezza DEFINITA, non solo un massimo: senza, la cornice si
      // dimensiona sull'immagine e finché il lazy-loading non la carica il
      // blocco collassa, per poi allargarsi di colpo. Così lo spazio è
      // riservato da subito e la pagina non sobbalza.
      style={
        {
          '--tilt': `${tilt}deg`,
          width: maxW ? `${maxW}rem` : undefined,
          maxWidth: '100%',
        } as CSSProperties
      }
      className={`rotate-[var(--tilt)] rounded-[2px] bg-pure p-2.5 pb-3 shadow-none ring-1 ring-ink/10 transition-all duration-400 ease-bench hover:rotate-0 hover:shadow-[0_18px_40px_-24px_rgba(51,51,51,0.45)] motion-reduce:transition-none sm:p-3 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full rounded-[1px] bg-sunken object-cover"
      />
      {caption && (
        <figcaption className="px-1 pt-2 text-center font-script text-[1.15rem] leading-tight text-ink/70 sm:text-[1.3rem]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
