import { useState } from 'react'
import type { ReactNode } from 'react'
import { PageHero } from '../components/PageHero'
import { Section, SectionHeading } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { ServiceCard } from '../components/ServiceCard'
import { CatalogButton } from '../components/CatalogButton'
import { Icon } from '../components/Icon'
import { CtaBand } from '../components/CtaBand'
import { serviceIds, serviceCategory, categoryIds, type CategoryId } from '../content/catalog'
import { site, isTodo } from '../content/site'
import { useI18n } from '../i18n'

type Filter = CategoryId | 'tutti'

export default function Servizi() {
  const { t } = useI18n()
  const s = t.servizi
  const [filter, setFilter] = useState<Filter>('tutti')
  const shown =
    filter === 'tutti' ? serviceIds : serviceIds.filter((id) => serviceCategory[id] === filter)

  return (
    <>
      <PageHero tone={0.55} title={s.heroTitle} lead={s.heroLead} />

      {/* Il menù, con il filtro per categoria */}
      <Section tone="limewash">
        <SectionHeading title={s.listTitle} lead={s.listLead} />

        <Reveal className="mt-7">
          <CatalogButton url={site.catalogoServiziUrl} label={s.catalogoCta} />
        </Reveal>

        <Reveal className="mt-9 flex flex-wrap gap-2">
          <FilterChip active={filter === 'tutti'} onClick={() => setFilter('tutti')}>
            {s.filterAll}
          </FilterChip>
          {categoryIds.map((id) => (
            <FilterChip key={id} active={filter === id} onClick={() => setFilter(id)}>
              {t.categories[id].label}
            </FilterChip>
          ))}
        </Reveal>

        {/* Il blurb della categoria scelta: dice cosa raccoglie, senza
            costringere ad aprire una scheda per capirlo. */}
        {filter !== 'tutti' && (
          <p className="mt-5 max-w-prose text-[0.98rem] leading-relaxed text-ink/65">
            {t.categories[filter].blurb}
          </p>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((id) => (
            <Reveal key={id}>
              <ServiceCard id={id} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Prodotti usati + recensione */}
      <Section tone="white">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Reveal>
            <img
              src="/images/img-prodotti-cta.webp"
              alt={s.usedPhotoAlt}
              width={1440}
              height={856}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-[4px] object-cover ring-1 ring-ink/10"
            />
          </Reveal>
          <div>
            <Reveal>
              <p className="max-w-prose text-[1.06rem] leading-relaxed text-ink/75">{s.usedText}</p>
            </Reveal>
            <Reveal className="mt-7 flex max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
              <Button to="/prodotti" variant="outline" icon="arrow">
                {s.usedCta}
              </Button>
              <Button
                href={isTodo(site.reviewsUrl) ? undefined : site.reviewsUrl}
                variant="ghost"
                className={isTodo(site.reviewsUrl) ? 'pointer-events-none opacity-50' : ''}
              >
                {/* Un solo figlio in riga: passando icona e testo sciolti,
                    `Button` li mette in uno span che andava a capo e lasciava
                    la stella sopra la scritta, disallineata dal bottone
                    accanto. La stella è gialla come quelle delle recensioni
                    in home: è la stessa cosa, deve avere lo stesso colore. */}
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  {t.common.leaveReview}
                  <Icon name="star" size={22} className="text-[#FBBC04]" />
                </span>
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand title={s.ctaTitle} lead={s.ctaLead} />
    </>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-[3px] px-4 py-2 text-[0.9rem] transition-all duration-300 ease-bench ${
        active
          ? 'bg-band text-limewash'
          : 'bg-raised text-ink/70 ring-1 ring-ink/15 hover:ring-ink/35'
      }`}
    >
      {children}
    </button>
  )
}
