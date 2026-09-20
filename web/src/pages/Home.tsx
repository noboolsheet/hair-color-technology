import { Section, SectionHeading } from '../components/Section'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { GoogleG } from '../components/bits'
import { Icon } from '../components/Icon'
import { FaqList } from '../components/FaqList'
import { MapHours } from '../components/MapHours'
import { CtaBand } from '../components/CtaBand'
import { ServiceCard } from '../components/ServiceCard'
import { ProductCard } from '../components/ProductCard'
import { HeroSlideshow } from '../components/HeroSlideshow'
import { site, whatsappHref, isTodo } from '../content/site'
import { homeServiceIds, productIds } from '../content/catalog'
import { reviews, rating } from '../content/reviews'
import { useI18n } from '../i18n'

/* ───────────────────────────────── Hero ───────────────────────────────── */

function Hero() {
  const { t } = useI18n()

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-[68px]">
      {/* Sfondo: tre scatti del salone in dissolvenza, con deriva lenta. */}
      <HeroSlideshow alt="Interno del salone Hair Color Technology a Paola" />

      {/* Disfumato per la leggibilità: forte dove c'è il testo (a sinistra su
          desktop, in basso su mobile), trasparente dove la foto deve vedersi. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/85 via-45% to-ground/10 lg:bg-gradient-to-r lg:from-ground lg:from-[6%] lg:via-ground/80 lg:via-[42%] lg:to-transparent" />
      {/* Velo superiore leggero per la leggibilità della navbar sulla foto */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ground/70 to-transparent" />

      <div className="relative mx-auto flex min-h-[calc(100svh-68px)] max-w-6xl items-end px-5 pb-16 pt-24 sm:px-8 lg:items-center lg:py-16">
        <div className="max-w-xl">
          <Reveal>
            <h1 className="display text-[clamp(2.5rem,5.4vw,4rem)] text-ink">
              {t.hero.titleA} <span className="text-magenta">{t.hero.titleAccent}</span> {t.hero.titleB}
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-6 max-w-md text-[1.1rem] leading-relaxed text-ink/80">
              {t.hero.lead}
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-9 flex max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={whatsappHref()} icon="arrow">
                {t.common.bookAppointment}
              </Button>
              <Button to="/servizi" variant="outline">
                {t.common.discoverServices}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* segnale di scroll */}
      <div className="absolute inset-x-0 bottom-6 hidden justify-center md:flex">
        <span className="notation flex items-center gap-2 !text-ink/60">
          <span className="h-8 w-px animate-drift-x bg-ink/30" />
          {t.common.scroll}
        </span>
      </div>
    </section>
  )
}

/* ───────────────────────────── Recensioni ─────────────────────────────── */

function Reviews() {
  const { t } = useI18n()
  const hasRating = rating.value != null
  return (
    <Section tone="white">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <Reveal>
          <div className="flex items-center gap-1.5 text-[#FBBC04]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon key={i} name="star" size={20} />
            ))}
          </div>
          <h2 className="display-tight mt-5 text-[clamp(1.8rem,4vw,2.6rem)]">{t.reviews.title}</h2>
          <p className="mt-4 text-ink/70 leading-relaxed">
            {hasRating
              ? t.reviews.leadRating.replace('{value}', String(rating.value))
              : t.reviews.leadNoRating}
          </p>
          <div className="mt-6 flex max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              href={isTodo(site.googleReviewsUrl) ? undefined : site.googleReviewsUrl}
              variant="outline"
              className={isTodo(site.googleReviewsUrl) ? 'pointer-events-none opacity-50' : ''}
            >
              {t.common.readOnGoogle}
            </Button>
            <Button
              href={isTodo(site.reviewsUrl) ? undefined : site.reviewsUrl}
              variant="ghost"
              icon="arrow"
              className={isTodo(site.reviewsUrl) ? 'pointer-events-none opacity-50' : ''}
            >
              {t.common.leaveReview}
            </Button>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal key={i}>
              <figure className="flex h-full flex-col rounded-[5px] bg-raised p-6 ring-1 ring-ink/10">
                <div className="flex items-center justify-between">
                  <GoogleG size={20} />
                  <span className="flex gap-0.5 text-[#FBBC04]">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Icon key={s} name="star" size={13} />
                    ))}
                  </span>
                </div>
                <blockquote className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-ink/80">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-4 text-[0.9rem] font-medium text-ink">{r.author}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ─────────────────────────── La nostra storia ─────────────────────────── */

function Storia() {
  const { t } = useI18n()
  return (
    <Section tone="limewash">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <Reveal className="order-2 md:order-1">
          <img
            src="/images/img-titolare-colore.webp"
            alt={t.about.photoAlt}
            className="aspect-[4/5] w-full rounded-[4px] object-cover ring-1 ring-ink/10"
            loading="lazy"
          />
        </Reveal>
        <div className="order-1 md:order-2">
          <SectionHeading title={t.storia.title} lead={t.storia.lead} />
          <Reveal className="mt-7">
            <ul className="grid gap-3">
              {t.storia.points.map((v) => (
                <li key={v} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage-200 text-sageInk">
                    <Icon name="check" size={16} />
                  </span>
                  <span className="text-ink/80">{v}</span>
                </li>
              ))}
            </ul>
            <Button to="/chi-siamo#storia" variant="ghost" icon="arrow" className="mt-6 !px-0">
              {t.storia.cta}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/* ─────────────────────────── Servizi in evidenza ──────────────────────── */

function ServiziPreview() {
  const { t } = useI18n()
  return (
    <Section tone="white">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading title={t.serviziPreview.title} lead={t.serviziPreview.lead} />
        <Reveal>
          <Button to="/servizi" variant="outline" icon="arrow">
            {t.common.allServices}
          </Button>
        </Reveal>
      </div>

      {/* Tre soli servizi, e la stessa scheda della pagina servizi: chi arriva
          dalla home ritrova esattamente la stessa cosa, non una variante. */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {homeServiceIds.map((id) => (
          <Reveal key={id}>
            <ServiceCard id={id} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ───────────────────────────── Prodotti ───────────────────────────────── */

function ProdottiPreview() {
  const { t } = useI18n()
  return (
    <Section tone="sage">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading title={t.prodottiPreview.title} lead={t.prodottiPreview.lead} />
        <Reveal>
          <Button to="/prodotti" variant="outline" icon="arrow">
            {t.common.allProducts}
          </Button>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {productIds.slice(0, 3).map((id) => (
          <Reveal key={id}>
            <ProductCard id={id} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ─────────────────────────── Marchi che usiamo ────────────────────────── */

function Marchi() {
  const { t } = useI18n()
  return (
    <Section tone="sage" className="!py-16 md:!py-20">
      <Reveal className="flex flex-col items-center gap-9 text-center">
        <p className="max-w-xl text-[1.06rem] leading-relaxed text-ink/75">{t.marchi.text}</p>
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {site.brands.map((b) => {
            const linked = !isTodo(b.url)
            return (
              <li key={b.name}>
                {/* I lockup dei marchi vivono su bianco: la piastrella lo porta
                    con sé, così restano leggibili anche in tema scuro. */}
                <a
                  href={linked ? b.url : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={linked ? b.name : undefined}
                  className={`grid h-28 w-[15rem] place-items-center rounded-[5px] bg-pure px-8 ring-1 ring-ink/10 transition-all duration-300 ease-bench ${
                    linked
                      ? 'hover:-translate-y-0.5 hover:ring-magenta/40 focus-visible:-translate-y-0.5 focus-visible:ring-magenta/40'
                      : 'pointer-events-none'
                  }`}
                >
                  <img
                    src={b.logo}
                    alt={b.name}
                    width={b.logoW}
                    height={b.logoH}
                    loading="lazy"
                    style={{ maxHeight: b.logoMaxH }}
                    className="h-auto w-full object-contain"
                  />
                </a>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </Section>
  )
}

/* ─────────────────────────── Mappa & orario ───────────────────────────── */

function Mappa() {
  const { t } = useI18n()
  return (
    <Section tone="limewash">
      <SectionHeading title={t.mappa.title} lead={t.mappa.lead} />
      <div className="mt-12">
        <MapHours />
      </div>
    </Section>
  )
}

/* ───────────────────────────────── FAQ ────────────────────────────────── */

function Faq() {
  const { t } = useI18n()
  return (
    <Section tone="white">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <SectionHeading title={t.faqSection.title} lead={t.faqSection.lead} />
        <Reveal>
          <FaqList items={t.faq} />
        </Reveal>
      </div>
    </Section>
  )
}

/* ───────────────────────────────── Home ───────────────────────────────── */

export default function Home() {
  return (
    <>
      <Hero />
      <Reviews />
      <Storia />
      <Marchi />
      <ServiziPreview />
      <ProdottiPreview />
      <Mappa />
      <Faq />
      <CtaBand />
    </>
  )
}
