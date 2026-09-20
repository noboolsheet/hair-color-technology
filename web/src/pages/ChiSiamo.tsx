import { PageHero } from '../components/PageHero'
import { Section, SectionHeading } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { PhotoPlaceholder, Polaroid } from '../components/bits'
import { CtaBand } from '../components/CtaBand'
import { useI18n } from '../i18n'
import { valueIcons } from '../content/catalog'
import { tappaIds, tappe, type TappaId } from '../content/storia'

/**
 * Una delle tre colonne d'apertura (Filosofia, Vision, Mission): foto,
 * titolo, testo. Quella centrale sale un po' rispetto alle altre due — è
 * l'unica differenza fra loro, e serve a rompere la simmetria da griglia di
 * schede tutte uguali.
 */
function Colonna({
  photoLabel,
  title,
  body,
  raised = false,
}: {
  photoLabel: string
  title: string
  body: string
  raised?: boolean
}) {
  return (
    <Reveal className={raised ? 'md:-mt-12' : ''}>
      <PhotoPlaceholder label={photoLabel} ratio="aspect-[4/5]" />
      <h2 className="display-tight mt-6 text-[clamp(1.4rem,2.6vw,1.9rem)] text-ink">{title}</h2>
      <p className="mt-3 leading-relaxed text-ink/75">{body}</p>
    </Reveal>
  )
}

/**
 * Una tappa della storia, disposta a zigzag attorno all'asse centrale: foto e
 * testo si scambiano di lato a ogni tappa e restano entrambi appoggiati
 * all'asse, così non si aprono vuoti fra l'immagine e le sue parole.
 *
 * Su mobile l'asse scivola a sinistra e tutto scende in colonna.
 */
function Tappa({ id, index }: { id: TappaId; index: number }) {
  const { t } = useI18n()
  const tappa = tappe[id]
  const testo = t.tappe[id]
  const fotoASinistra = index % 2 === 0

  return (
    <li className="md:grid md:grid-cols-2 md:items-center md:gap-x-14">
      {/* Il contenitore prende TUTTA la colonna (`w-full`) e allinea la foto
          con flex. Con `justify-self` era la cornice a dettare la larghezza al
          contenitore, quindi il suo `max-width: 100%` si misurava su sé stessa
          e non la fermava: a 768px le due colonne sfondavano la pagina. */}
      <Reveal
        className={`flex w-full min-w-0 ${
          fotoASinistra
            ? 'md:col-start-1 md:justify-end'
            : 'md:col-start-2 md:row-start-1 md:justify-start'
        }`}
      >
        <Polaroid
          src={tappa.src}
          alt={testo.title}
          width={tappa.w}
          height={tappa.h}
          caption={testo.caption}
          tilt={tappa.tilt}
          maxW={tappa.maxW}
        />
      </Reveal>

      {/* Il testo si allinea verso l'asse: a destra quando sta a sinistra, e
          viceversa. Le didascalie sono corte, tre righe al massimo, quindi
          l'allineamento a destra resta leggibile e la simmetria si legge. */}
      <Reveal
        className={`mt-5 w-full min-w-0 md:mt-0 ${
          fotoASinistra ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1 md:text-right'
        }`}
      >
        <h3 className="display-tight text-[clamp(1.35rem,2.8vw,1.9rem)] text-ink">{testo.title}</h3>
        <p
          className={`mt-3 max-w-[34ch] leading-relaxed text-ink/75 md:max-w-[38ch] ${
            fotoASinistra ? '' : 'md:ml-auto'
          }`}
        >
          {testo.body}
        </p>
      </Reveal>
    </li>
  )
}

export default function ChiSiamo() {
  const { t } = useI18n()
  const a = t.about
  return (
    <>
      <PageHero tone={0.35} title={a.heroTitle} lead={a.heroLead} />

      {/* Filosofia, Vision e Mission: le tre idee che reggono il salone,
          affiancate in apertura. */}
      <Section tone="limewash">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          <Colonna photoLabel={a.photoFrancesca} title={a.philosophyTitle} body={a.philosophyLead} />
          <Colonna photoLabel={a.photoVision} title={a.visionTitle} body={a.visionBody} raised />
          <Colonna photoLabel={a.photoMission} title={a.missionTitle} body={a.missionBody} />
        </div>

        <Reveal className="mt-16 border-t border-ink/12 pt-10 md:mt-20">
          <blockquote className="mx-auto max-w-3xl text-center text-[clamp(1.15rem,2.4vw,1.5rem)] italic leading-relaxed text-ink/85">
            “{a.quote}”
          </blockquote>
          <p className="notation mt-4 text-center !text-ink/60">{a.quoteAttrib}</p>
        </Reveal>
      </Section>

      {/* Valori */}
      <Section tone="white">
        <SectionHeading title={a.valuesTitle} lead={a.valuesLead} />
        <div className="mt-12 border-t border-ink/12">
          {a.values.map((v, i) => (
            <Reveal key={v.title}>
              <div className="grid items-start gap-4 border-b border-ink/12 py-8 sm:grid-cols-[auto_1fr] sm:gap-8 md:py-10">
                <span className="grid h-12 w-12 place-items-center rounded-[5px] bg-sunken text-sageInk">
                  <Icon name={valueIcons[i]} size={24} />
                </span>
                <div className="max-w-2xl">
                  <h3 className="text-xl font-semibold leading-snug md:text-2xl">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/70">{v.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Conosci Francesca Polizza — la storia a zigzag.
          `id` + `scroll-mt`: ci arriva il link dalla home, e la nav è fissa a
          68px, quindi senza margine di scroll il titolo finirebbe sotto. */}
      <Section tone="sage" id="storia" className="scroll-mt-[84px]">
        <SectionHeading title={a.storyTitle} lead={a.storyLead} />

        <div className="mt-14 md:mt-20">
          <ol className="space-y-14 md:space-y-20">
            {tappaIds.map((id, i) => (
              <Tappa key={id} id={id} index={i} />
            ))}
          </ol>
        </div>
      </Section>

      <CtaBand title={a.ctaTitle} lead={a.ctaLead} />
    </>
  )
}
