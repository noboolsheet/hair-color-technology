import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

/** Una "stazione" del banco: superficie di lavoro distinta, ritmo ampio. */
export function Section({
  id,
  children,
  className = '',
  tone = 'limewash',
}: {
  id?: string
  children: ReactNode
  className?: string
  tone?: 'limewash' | 'white' | 'sage' | 'graphite'
}) {
  const tones: Record<string, string> = {
    limewash: 'bg-ground text-ink',
    white: 'bg-raised text-ink',
    sage: 'bg-sunken text-ink',
    graphite: 'bg-band text-limewash',
  }
  return (
    <section
      id={id}
      className={`relative px-5 py-20 sm:px-8 md:py-28 ${tones[tone]} ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

/** Titolo di stazione. Nessun occhiello/kicker: il titolo porta da solo. */
export function SectionHeading({
  title,
  lead,
  align = 'left',
  invert = false,
}: {
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  invert?: boolean
}) {
  return (
    <Reveal
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <h2
        className={`display-tight text-[clamp(2rem,5vw,3.4rem)] ${
          invert ? 'text-limewash' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-5 max-w-prose text-[1.06rem] leading-relaxed ${
            align === 'center' ? 'mx-auto' : ''
          } ${invert ? 'text-limewash/80' : 'text-ink/70'}`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  )
}
