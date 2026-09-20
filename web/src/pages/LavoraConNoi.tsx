import { PageHero } from '../components/PageHero'
import { Section, SectionHeading } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { ApplicationForm } from '../components/ApplicationForm'
import { PhotoPlaceholder } from '../components/bits'
import { Icon } from '../components/Icon'
import { useI18n } from '../i18n'

export default function LavoraConNoi() {
  const { t } = useI18n()
  const l = t.lavora
  return (
    <>
      <PageHero tone={0.4} title={l.heroTitle} lead={l.heroLead} />

      {/* Posizioni aperte — al momento nessuna, candidatura spontanea benvenuta */}
      <Section tone="white">
        <SectionHeading title={l.openTitle} />
        <Reveal className="mt-8">
          <div className="flex flex-col items-center gap-5 rounded-[5px] bg-sunken px-6 py-12 text-center ring-1 ring-sage-600/15">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-raised text-sageInk ring-1 ring-ink/10">
              <Icon name="drop" size={26} />
            </span>
            <p className="max-w-xl text-[1.05rem] leading-relaxed text-ink/75">{l.openEmpty}</p>
          </div>
        </Reveal>
      </Section>

      <Section tone="limewash">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Intro + foto */}
          <div>
            <SectionHeading title={l.introTitle} lead={l.introLead} />
            <Reveal className="mt-8">
              <PhotoPlaceholder label={t.about.photoTeam} ratio="aspect-[4/3]" />
            </Reveal>
          </div>

          {/* Modulo candidatura */}
          <Reveal className="rounded-[5px] bg-raised p-6 ring-1 ring-ink/10 sm:p-8">
            <h2 className="text-2xl font-semibold leading-tight">{l.formTitle}</h2>
            <p className="mt-2 text-ink/70">{l.formSubtitle}</p>
            <div className="mt-6">
              <ApplicationForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
