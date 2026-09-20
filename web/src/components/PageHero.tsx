import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { SpectralField } from './SpectralField'

/** Intestazione di pagina interna: banda spettrale sottile + titolo.
 *  Nessun occhiello sopra il titolo (craft floor): il titolo porta da solo. */
export function PageHero({
  title,
  lead,
  tone = 0.5,
}: {
  title: ReactNode
  lead?: ReactNode
  tone?: number
}) {
  return (
    <header className="relative overflow-hidden pt-[68px]">
      <SpectralField tone={tone} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-br from-ground/85 via-ground/78 to-ground/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ground to-transparent" />
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-8 md:pb-20 md:pt-28">
        <Reveal>
          <h1 className="display max-w-3xl text-[clamp(2.4rem,6vw,4rem)] text-ink">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-xl text-[1.1rem] leading-relaxed text-ink/75">
              {lead}
            </p>
          )}
        </Reveal>
      </div>
    </header>
  )
}
