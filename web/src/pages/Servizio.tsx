import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { Notation, PhotoPlaceholder } from '../components/bits'
import { CtaBand } from '../components/CtaBand'
import { ServiceCard } from '../components/ServiceCard'
import {
  serviceIds,
  serviceCategory,
  servicePhotos,
  type ServiceId,
} from '../content/catalog'
import { whatsappHref } from '../content/site'
import { useI18n } from '../i18n'

/** Una foto del prima/dopo, o il segnaposto finché non arriva. */
function Scatto({ src, label, alt }: { src?: string; label: string; alt: string }) {
  return (
    <figure>
      {src ? (
        <img
          src={src}
          alt={`${alt} — ${label}`}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full rounded-[4px] object-cover ring-1 ring-ink/10"
        />
      ) : (
        <PhotoPlaceholder label={label} ratio="aspect-[4/3]" />
      )}
      <figcaption className="notation mt-2 !text-ink/55">{label}</figcaption>
    </figure>
  )
}

/**
 * La pagina dedicata di un servizio.
 *
 * Qui il prima/dopo NON scorre: le due foto stanno affiancate, così si
 * confrontano con un colpo d'occhio. Lo scorrimento serve nella scheda, dove
 * lo spazio è poco; qui lo spazio c'è.
 */
export default function Servizio() {
  const { t } = useI18n()
  const s = t.servizi
  const { id } = useParams<{ id: string }>()

  // Un id sconosciuto non deve rompere la pagina: si spiega e si rimanda al menù.
  if (!id || !(serviceIds as readonly string[]).includes(id)) {
    return (
      <>
        <PageHero tone={0.4} title={s.notFoundTitle} lead={s.notFoundLead} />
        <Section tone="limewash">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceIds.slice(0, 3).map((sid) => (
              <ServiceCard key={sid} id={sid} />
            ))}
          </div>
          <div className="mt-10">
            <Button to="/servizi" variant="outline" icon="arrow">
              {s.backToList}
            </Button>
          </div>
        </Section>
      </>
    )
  }

  const sid = id as ServiceId
  const svc = t.services[sid]
  const foto = servicePhotos[sid]
  // Altri servizi della stessa categoria, per non finire in un vicolo cieco.
  const affini = serviceIds
    .filter((x) => x !== sid && serviceCategory[x] === serviceCategory[sid])
    .slice(0, 3)

  return (
    <>
      <PageHero tone={0.5} title={svc.name} lead={svc.tagline} />

      <Section tone="limewash">
        <Reveal>
          <Link
            to="/servizi"
            className="inline-flex items-center gap-1.5 text-[0.95rem] text-ink/60 transition-colors hover:text-magenta"
          >
            <Icon name="arrow" size={16} className="rotate-180" />
            {s.backToList}
          </Link>
        </Reveal>

        {/* Prima e dopo, affiancate */}
        <Reveal className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-7">
          <Scatto src={foto?.before} label={s.before} alt={svc.name} />
          <Scatto src={foto?.after} label={s.after} alt={svc.name} />
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <Reveal>
            <Notation className="!text-sageInk">{t.categories[serviceCategory[sid]].label}</Notation>
            <p className="mt-4 max-w-prose text-[1.06rem] leading-relaxed text-ink/80">{svc.long}</p>

            {svc.steps && (
              <div className="mt-10">
                <h2 className="display-tight text-[clamp(1.35rem,2.8vw,1.8rem)] text-ink">
                  {s.ritualTitle}
                </h2>
                <ol className="mt-5 grid gap-4">
                  {svc.steps.map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className="notation mt-1 shrink-0 !text-sageInk">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="max-w-prose leading-relaxed text-ink/75">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {svc.tech && (
              <div className="mt-10 rounded-[5px] bg-sunken p-6 ring-1 ring-sage-600/15">
                <Notation className="!text-sageInk/80">{s.techTitle}</Notation>
                <p className="mt-3 max-w-prose leading-relaxed text-ink/75">{svc.tech}</p>
              </div>
            )}
          </Reveal>

          {/* I dati pratici, sempre a portata d'occhio */}
          <Reveal>
            <div className="rounded-[5px] bg-raised p-6 ring-1 ring-ink/10 md:sticky md:top-[92px]">
              <dl className="grid gap-4">
                <div>
                  <dt className="notation !text-ink/50">{s.durationLabel}</dt>
                  <dd className="mt-1 text-ink/85">{svc.duration}</dd>
                </div>
                <div className="border-t border-ink/12 pt-4">
                  <dt className="notation !text-ink/50">
                    {s.priceLabel}
                  </dt>
                  <dd
                    className={`mt-1 text-[1.25rem] ${
                      svc.price ? 'font-semibold text-ink' : 'text-ink/55'
                    }`}
                  >
                    {svc.price || s.priceOnRequest}
                  </dd>
                </div>
                {svc.note && (
                  <div className="border-t border-ink/12 pt-4">
                    <p className="text-[0.88rem] leading-relaxed text-ink/55">{svc.note}</p>
                  </div>
                )}
              </dl>
              <Button href={whatsappHref()} icon="arrow" className="mt-6 w-full justify-center">
                {t.common.bookAppointment}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {affini.length > 0 && (
        <Section tone="white">
          <h2 className="display-tight text-[clamp(1.5rem,3vw,2.1rem)] text-ink">
            {t.categories[serviceCategory[sid]].label}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {affini.map((x) => (
              <Reveal key={x}>
                <ServiceCard id={x} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CtaBand title={s.ctaTitle} lead={s.ctaLead} />
    </>
  )
}
