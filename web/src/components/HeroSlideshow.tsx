import { useEffect, useState } from 'react'

/**
 * Sfondo dell'hero: tre scatti del salone, fermi, che si succedono in
 * dissolvenza.
 *
 * Non è un carosello: non ci sono frecce, puntini né trascinamento. Il
 * contenuto davanti resta l'unica cosa da leggere, quindi non c'è nessun
 * comando e le immagini non sono cliccabili.
 *
 * Due attenzioni:
 *  • `prefers-reduced-motion`: nessuna dissolvenza, resta la prima foto
 *    ferma. Le altre due non vengono nemmeno scaricate.
 *  • La prima immagine è quella che il browser misura come LCP: parte subito
 *    e con priorità alta. Le altre due si montano dopo il primo disegno, così
 *    non le contendono la banda.
 */
const SLIDES = [
  { src: '/images/salone-6.webp', w: 2048, h: 1365 },
  { src: '/images/salone-1.webp', w: 1440, h: 856 },
  { src: '/images/salone-4.webp', w: 1440, h: 856 },
]

// Il ritmo dello sfondo. I due numeri vanno pensati insieme: lo scatto resta
// davvero fermo per HOLD_MS − FADE_MS, e se la dissolvenza si allunga senza
// allungare anche l'attesa il fondo sembra non fermarsi mai.
/** Ogni quanto si cambia scatto. */
const HOLD_MS = 9000
/** Durata dell'incrocio. Lenta: deve sembrare una sfumatura, non un taglio.
 *  L'andamento è `ease-in-out`, non l'`ease-bench` del resto del sito: quella
 *  curva scarica quasi tutto il cambiamento nei primi istanti e poi si
 *  trascina, e su una dissolvenza si legge come uno scatto seguito da un
 *  fantasma. Per un incrocio serve una curva simmetrica. */
const FADE_MS = 3000

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export function HeroSlideshow({ alt }: { alt: string }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  // Le foto 2 e 3 entrano solo dopo il primo disegno, per non rubare banda
  // alla prima (che è l'immagine più grande della pagina).
  const [altreCaricate, setAltreCaricate] = useState(false)

  useEffect(() => {
    if (reduced) return
    const t = setTimeout(() => setAltreCaricate(true), 800)
    return () => clearTimeout(t)
  }, [reduced])

  useEffect(() => {
    if (reduced || !altreCaricate) return
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), HOLD_MS)
    return () => clearInterval(id)
  }, [reduced, altreCaricate])

  const visibili = reduced ? SLIDES.slice(0, 1) : altreCaricate ? SLIDES : SLIDES.slice(0, 1)

  return (
    <div className="hero-bg absolute inset-0 overflow-hidden">
      {visibili.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          // Le tre foto mostrano lo stesso soggetto: descriverle tutte e tre
          // sarebbe rumore per chi usa uno screen reader.
          alt={i === 0 ? alt : ''}
          width={s.w}
          height={s.h}
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchPriority={i === 0 ? 'high' : 'low'}
          decoding="async"
          style={{ transitionDuration: `${FADE_MS}ms` }}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity ease-in-out motion-reduce:transition-none ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  )
}
