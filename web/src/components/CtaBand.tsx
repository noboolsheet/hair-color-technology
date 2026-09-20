import { Section } from './Section'
import { Button } from './Button'
import { Reveal } from './Reveal'
import { SpectralField } from './SpectralField'
import { site, whatsappHref, isTodo } from '../content/site'
import { useI18n } from '../i18n'

/** CTA finale — invita all'azione: prenotare o contattare. */
export function CtaBand({ title, lead }: { title?: string; lead?: string }) {
  const { t } = useI18n()
  const waReady = !isTodo(site.whatsappNumber)
  return (
    <Section tone="graphite" className="overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <SpectralField tone={0.7} className="relative h-full w-full" />
      </div>
      <Reveal className="relative mx-auto max-w-2xl text-center">
        <h2 className="display-tight text-[clamp(2rem,5vw,3.2rem)] text-limewash">
          {title ?? t.ctaDefault.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-limewash/75">
          {lead ?? t.ctaDefault.lead}
        </p>
        <div className="mx-auto mt-9 flex max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          {waReady ? (
            <Button href={whatsappHref()} icon="whatsapp">
              {t.nav.bookWa}
            </Button>
          ) : (
            <Button to="/contatti" icon="arrow">
              {t.common.bookAppointment}
            </Button>
          )}
          <Button
            to="/contatti"
            variant="outline"
            className="!border-limewash/25 !text-limewash hover:!bg-ground/10"
          >
            {t.common.writeMessage}
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
