import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { PhotoPlaceholder } from './bits'
import { useI18n } from '../i18n'

/**
 * Il prima/dopo di un servizio: due sole immagini, in una pista che scorre.
 *
 * È costruita su uno scroller nativo con scroll-snap, non su un carosello a
 * `transform`. Il motivo è che la maggior parte delle clienti guarda questa
 * pagina dal telefono: così il trascinamento è quello vero del sistema, con
 * la sua inerzia e il suo rimbalzo, e non una imitazione fatta con gli
 * eventi touch. Sul desktop, dove non si trascina, ci sono le frecce e i
 * pallini; su mobile le frecce spariscono perché lì basta il dito.
 *
 * Funziona anche senza JavaScript: resta uno scroller con due immagini.
 *
 * Le foto reali non ci sono ancora: finché `before`/`after` non arrivano, si
 * mostra il segnaposto onesto del resto del sito.
 */
export function BeforeAfter({
  before,
  after,
  alt,
  ratio = 'aspect-[4/3]',
}: {
  before?: string
  after?: string
  alt: string
  ratio?: string
}) {
  const { t } = useI18n()
  const pista = useRef<HTMLDivElement>(null)
  const [attiva, setAttiva] = useState(0)

  const slides = [
    { key: 'before', src: before, label: t.servizi.before },
    { key: 'after', src: after, label: t.servizi.after },
  ]

  // Quale delle due si sta guardando: si legge dallo scorrimento, così il
  // dito e le frecce aggiornano i pallini allo stesso modo.
  useEffect(() => {
    const el = pista.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setAttiva(Math.round(el.scrollLeft / el.clientWidth))
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const vaiA = (i: number) => {
    const el = pista.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="relative overflow-hidden rounded-[4px] bg-sunken">
      <div
        ref={pista}
        // `snap-x snap-mandatory` dà lo scatto sulle due foto; `touch-pan-x`
        // lascia alla pagina lo scorrimento verticale, così trascinando in
        // diagonale non si blocca la lettura.
        className="flex touch-pan-x snap-x snap-mandatory overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <div key={s.key} className="relative w-full shrink-0 snap-center">
            {s.src ? (
              <img
                src={s.src}
                alt={`${alt} — ${s.label}`}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover ${ratio}`}
              />
            ) : (
              <PhotoPlaceholder label={t.servizi.photoTodo} ratio={ratio} className="!rounded-none" />
            )}
            {/* Prima a sinistra, Dopo a destra: le due etichette stanno agli
                angoli opposti, così scorrendo si vede il cambio di lato oltre
                al cambio di scritta. */}
            <span
              className={`notation absolute bottom-3 rounded-[2px] bg-band/75 px-2 py-1 !text-[0.58rem] !text-limewash backdrop-blur-sm ${
                i === 0 ? 'left-3' : 'right-3'
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Frecce: solo da sm in su. Sul telefono si scorre col dito. */}
      {slides.map((s, i) => {
        const verso = i === 0 ? 'left' : 'right'
        const disabilitata = attiva === i
        return (
          <button
            key={`nav-${s.key}`}
            type="button"
            aria-label={s.label}
            onClick={() => vaiA(i)}
            disabled={disabilitata}
            className={`absolute top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-raised/90 text-ink shadow-sm ring-1 ring-ink/10 backdrop-blur-sm transition-opacity duration-300 ease-bench disabled:pointer-events-none disabled:opacity-0 sm:grid ${
              verso === 'left' ? 'left-3' : 'right-3'
            }`}
          >
            <Icon name="arrow" size={16} className={verso === 'left' ? 'rotate-180' : ''} />
          </button>
        )
      })}

      {/* Pallini: sul telefono le frecce non ci sono, quindi questi sono
          l'unico comando oltre al dito. Il pallino si vede piccolo, ma il
          bottone che lo contiene è di 36px: il bersaglio da toccare deve
          stare sotto il polpastrello, non sotto la lente. */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        {slides.map((s, i) => (
          <button
            key={`dot-${s.key}`}
            type="button"
            aria-label={s.label}
            aria-current={attiva === i}
            onClick={() => vaiA(i)}
            className="grid h-9 w-9 place-items-center"
          >
            <span
              aria-hidden="true"
              className={`block h-2 rounded-full ring-1 ring-band/20 transition-all duration-300 ease-bench ${
                attiva === i ? 'w-5 bg-band/80' : 'w-2 bg-raised/80'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
