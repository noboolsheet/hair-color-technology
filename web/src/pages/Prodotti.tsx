import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { CatalogButton } from '../components/CatalogButton'
import { ProductCard } from '../components/ProductCard'
import { Notation, PhotoPlaceholder } from '../components/bits'
import { CtaBand } from '../components/CtaBand'
import { site } from '../content/site'
import { productIds, productLine, productOfTheWeek } from '../content/catalog'
import { useI18n } from '../i18n'

export default function Prodotti() {
  const { t } = useI18n()
  const p = t.prodotti
  const week = t.products[productOfTheWeek]

  return (
    <>
      <PageHero tone={0.7} title={p.heroTitle} lead={p.heroLead} />

      {/* Il prodotto della settimana: uno solo, in grande, prima dell'elenco. */}
      <Section tone="limewash">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Reveal>
            {/* Le foto dei prodotti non ci sono ancora. */}
            <PhotoPlaceholder label={p.photoTodo} ratio="aspect-[4/3]" />
          </Reveal>
          <div>
            <Reveal>
              <Notation className="!text-magenta">{p.settimanaLabel}</Notation>
              <h2 className="display-tight mt-4 text-[clamp(1.7rem,4vw,2.6rem)] text-ink">
                {week.name}
              </h2>
              <p className="mt-2 text-[0.95rem] text-ink/50">{productLine[productOfTheWeek]}</p>
              <p className="mt-5 max-w-prose text-[1.06rem] leading-relaxed text-ink/75">
                {week.description}
              </p>
            </Reveal>
            <Reveal className="mt-7 border-t border-ink/12 pt-5">
              <Notation className="!text-sageInk">{p.settimanaFor}</Notation>
              <p className="mt-2 max-w-prose leading-relaxed text-ink/70">{week.need}</p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Elenco prodotti */}
      <Section tone="white">
        <Reveal>
          <CatalogButton url={site.catalogoProdottiUrl} label={p.catalogoCta} />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {productIds.map((id) => (
            <Reveal key={id}>
              <ProductCard id={id} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-ink/60">{p.askText}</p>
          <Button to="/contatti" variant="ghost" icon="arrow" className="mt-2">
            {p.askCta}
          </Button>
        </Reveal>
      </Section>

      <CtaBand title={p.ctaTitle} lead={p.ctaLead} />
    </>
  )
}
