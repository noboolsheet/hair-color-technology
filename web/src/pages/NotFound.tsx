import { Button } from '../components/Button'
import { SpectralField } from '../components/SpectralField'
import { useI18n } from '../i18n'

export default function NotFound() {
  const { t } = useI18n()
  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden pt-[68px]">
      <SpectralField tone={0.6} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-ground/80 via-ground/90 to-ground" />
      <div className="relative mx-auto max-w-xl px-5 py-20 text-center sm:px-8">
        <h1 className="display text-[clamp(2.4rem,7vw,4rem)] text-ink">{t.notFound.title}</h1>
        <p className="mx-auto mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink/70">
          {t.notFound.lead}
        </p>
        <div className="mx-auto mt-8 flex max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Button to="/" icon="arrow">
            {t.notFound.home}
          </Button>
          <Button to="/contatti" variant="outline">
            {t.notFound.contact}
          </Button>
        </div>
      </div>
    </section>
  )
}
