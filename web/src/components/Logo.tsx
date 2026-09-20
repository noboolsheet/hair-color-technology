import { Link } from 'react-router-dom'

/** Il lettering del marchio, fedele al logo originale: "Hair Color" nello
 *  script calligrafico e "TECHNOLOGY" in maiuscolo con un display sottile
 *  (Italiana), esattamente come i due caratteri del logo del salone.
 *  Le misure sono in `em`, così l'insieme scala da una sola `fontSize`. */
export function LogoLettering({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-block leading-[0.9] ${className}`}>
      <span className="font-script">
        Hair <span className="text-magenta">Color</span>
      </span>{' '}
      {/* Equilibrio ottico, non aritmetico. Great Vibes ha un'occhiello
          bassissimo (35 su 100) e capitali alte (81): allineare le maiuscole
          alle capitali dello script le fa pesare il doppio delle minuscole,
          che sono le forme che dominano la parola. Misurato sul logo
          originale, la capitale di TECHNOLOGY vale 0,51 dell'ingombro della
          "H" dello script: 0.68em × scaleY 1.12 ci arrivano. La spaziatura
          larga toglie densità al blocco di maiuscole, così accompagna lo
          script invece di competerci. */}
      <span className="inline-block origin-bottom scale-y-[1.12] font-logotype text-[0.68em] uppercase tracking-[0.14em]">
        Technology
      </span>
    </span>
  )
}

/** Il logotipo testuale: il lettering del marchio + "di Francesca Polizza"
 *  evidenziato in magenta. Riutilizzabile (nav desktop e menu mobile). */
export function LogoWordmark({
  invert = false,
  size = '1.2rem',
  className = '',
}: {
  invert?: boolean
  size?: string
  className?: string
}) {
  return (
    // `inline-block w-fit`: il contenitore si stringe sul lettering. Serve
    // perché il `w-full` della fascia si misura sul PADRE: senza questo, dove
    // il logotipo sta dentro un blocco a tutta larghezza (il menu mobile) la
    // fascia sborderebbe oltre la parola.
    <span className={`inline-block w-fit leading-none ${className}`}>
      <span
        className={`block leading-[0.9] ${invert ? 'text-limewash' : 'text-ink'}`}
        style={{ fontSize: size }}
      >
        <LogoLettering />
      </span>
      {/* La fascia magenta prende tutta la larghezza del lettering sopra
          (`w-full`, non `w-fit`), così arriva fino alla fine di "Technology".
          Il testo dentro è centrato. */}
      <span className="notation mt-1 block w-full rounded-[2px] bg-magenta px-1.5 py-[2px] text-center !text-[0.52rem] !tracking-[0.2em] !text-white">
        {/* La spaziatura di 0.2em lascia uno spazio anche DOPO l'ultima
            lettera, che sbilancerebbe il centraggio verso sinistra: il margine
            negativo lo compensa. */}
        <span className="-me-[0.2em]">di Francesca Polizza</span>
      </span>
    </span>
  )
}

/** Marchio: la figura (capelli multicolore) del logo su una pastiglia chiara,
 *  così resta leggibile sia su fondo chiaro che scuro, accanto al logotipo.
 *  Il logotipo testuale appare solo da xl in su; sotto resta la sola pastiglia. */
export function Logo({
  className = '',
  invert = false,
}: {
  className?: string
  invert?: boolean
}) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Hair Color Technology — home"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-[8px] bg-limewash p-1 ring-1 ring-black/5 transition-transform duration-300 ease-bench group-hover:-rotate-2">
        <img
          src="/images/logo-mark.webp"
          alt=""
          width={1473}
          height={1473}
          className="h-full w-full object-contain"
        />
      </span>
      <LogoWordmark invert={invert} className="hidden xl:block" />
    </Link>
  )
}
