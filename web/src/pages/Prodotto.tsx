import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { PhotoPlaceholder } from '../components/bits'
import { CtaBand } from '../components/CtaBand'
import { ProductCard } from '../components/ProductCard'
import { productIds, productLine, productPhotos, type ProductId } from '../content/catalog'
import { whatsappHref } from '../content/site'
import { useI18n } from '../i18n'

/**
 * La pagina dedicata di un prodotto: descrizione estesa, come si usa e la
 * scheda tecnica.
 *
 * Della scheda riportiamo solo ciò che sappiamo davvero — linea, tipo,
 * bisogno, frequenza d'uso. Formato e prezzo sono dati del salone e non si
 * inventano: la scheda dice apertamente di chiederli in salone.
 */
export default function Prodotto() {
  const { t } = useI18n()
  const p = t.prodotti
  const { id } = useParams<{ id: string }>()

  if (!id || !(productIds as readonly string[]).includes(id)) {
    return (
      <>
        <PageHero tone={0.45} title={p.notFoundTitle} lead={p.notFoundLead} />
        <Section tone="limewash">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {productIds.slice(0, 3).map((pid) => (
              <ProductCard key={pid} id={pid} />
            ))}
          </div>
          <div className="mt-10">
            <Button to="/prodotti" variant="outline" icon="arrow">
              {p.backToList}
            </Button>
          </div>
        </Section>
      </>
    )
  }

  const pid = id as ProductId
  const prod = t.products[pid]
  const foto = productPhotos[pid]
  const altri = productIds.filter((x) => x !== pid).slice(0, 3)

  const scheda = [
    { label: p.schedaLine, value: productLine[pid] },
    { label: p.schedaType, value: prod.tipo },
    { label: p.settimanaFor, value: prod.need },
    { label: p.schedaWhen, value: prod.quando },
  ]

  return (
    <>
      <PageHero tone={0.65} title={prod.name} lead={productLine[pid]} />

      <Section tone="limewash">
        <Reveal>
          <Link
            to="/prodotti"
            className="inline-flex items-center gap-1.5 text-[0.95rem] text-ink/60 transition-colors hover:text-magenta"
          >
            <Icon name="arrow" size={16} className="rotate-180" />
            {p.backToList}
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
          <Reveal>
            {foto ? (
              <img
                src={foto}
                alt={prod.name}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[4px] object-cover ring-1 ring-ink/10"
              />
            ) : (
              <PhotoPlaceholder label={p.photoTodo} ratio="aspect-[4/3]" />
            )}
          </Reveal>

          <div>
            <Reveal>
              <p className="max-w-prose text-[1.06rem] leading-relaxed text-ink/80">{prod.long}</p>
            </Reveal>

            <Reveal className="mt-8">
              <h2 className="display-tight text-[clamp(1.3rem,2.6vw,1.7rem)] text-ink">
                {p.usageTitle}
              </h2>
              <p className="mt-3 max-w-prose leading-relaxed text-ink/75">{prod.usage}</p>
            </Reveal>

            <Reveal className="mt-8">
              <h2 className="display-tight text-[clamp(1.3rem,2.6vw,1.7rem)] text-ink">
                {p.schedaTitle}
              </h2>
              <dl className="mt-4 divide-y divide-ink/12 border-y border-ink/12">
                {scheda.map((r) => (
                  <div key={r.label} className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-3">
                    <dt className="notation !text-ink/50">{r.label}</dt>
                    <dd className="text-[0.95rem] text-ink/80">{r.value}</dd>
                  </div>
                ))}
              </dl>
              {/* Formato e prezzo non li sappiamo: lo diciamo. */}
              <p className="mt-4 text-[0.9rem] leading-relaxed text-ink/55">{p.schedaNote}</p>
            </Reveal>

            <Reveal className="mt-8">
              <Button href={whatsappHref()} icon="arrow">
                {p.askCta}
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <h2 className="display-tight text-[clamp(1.5rem,3vw,2.1rem)] text-ink">{p.altriTitle}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {altri.map((x) => (
            <Reveal key={x}>
              <ProductCard id={x} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand title={p.ctaTitle} lead={p.ctaLead} />
    </>
  )
}
