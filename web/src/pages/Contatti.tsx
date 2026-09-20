import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Section, SectionHeading } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { ContactForm } from '../components/ContactForm'
import { MapHours } from '../components/MapHours'
import { Icon } from '../components/Icon'
import { Notation } from '../components/bits'
import { site, whatsappHref, isTodo } from '../content/site'
import { useI18n } from '../i18n'

function Method({
  icon,
  label,
  value,
  href,
  todo,
}: {
  icon: 'whatsapp' | 'mail' | 'phone'
  label: string
  value: string
  href?: string
  todo?: boolean
}) {
  const inner = (
    <div className="flex items-center gap-4 rounded-[5px] bg-raised p-5 ring-1 ring-ink/10 transition-all duration-300 ease-bench hover:ring-ink/25">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[4px] bg-sunken text-sageInk">
        <Icon name={icon} size={22} />
      </span>
      <div className="min-w-0">
        <Notation className="!text-ink/60">{label}</Notation>
        <p className="mt-0.5 truncate font-medium text-ink">{value}</p>
      </div>
    </div>
  )
  if (href && !todo)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  return inner
}

export default function Contatti() {
  const { t } = useI18n()
  const c = t.contatti
  const waReady = !isTodo(site.whatsappNumber)
  return (
    <>
      <PageHero tone={0.45} title={c.heroTitle} lead={c.heroLead} />

      <Section tone="limewash">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Metodi + form */}
          <div>
            <div className="grid gap-3">
              <Method
                icon="whatsapp"
                label={c.whatsapp}
                value={waReady ? c.writeUsNow : `${c.whatsapp} ${c.todo}`}
                href={waReady ? whatsappHref() : undefined}
                todo={!waReady}
              />
              <Method
                icon="phone"
                label={c.phone}
                value={isTodo(site.phoneDisplay) ? `${c.phone} ${c.todo}` : site.phoneDisplay}
                href={isTodo(site.phoneDisplay) ? undefined : `tel:${site.phoneDisplay.replace(/\s/g, '')}`}
                todo={isTodo(site.phoneDisplay)}
              />
              <Method
                icon="mail"
                label={c.email}
                value={isTodo(site.emailDisplay) ? `${c.email} ${c.todo}` : site.emailDisplay}
                href={isTodo(site.emailDisplay) ? undefined : `mailto:${site.emailDisplay}`}
                todo={isTodo(site.emailDisplay)}
              />
            </div>

            <Reveal className="mt-10">
              <SectionHeading title={c.orElse} />
              <p className="mt-3 max-w-prose text-ink/70">{c.candidaturaNote}</p>
              <Link
                to="/lavora-con-noi"
                className="mt-2 inline-flex items-center gap-1.5 text-[0.92rem] font-medium text-magenta hover:text-magenta-deep"
              >
                {t.nav.careers}
                <Icon name="arrow" size={16} />
              </Link>
              <div className="mt-6">
                <ContactForm />
              </div>
            </Reveal>
          </div>

          {/* Mappa & orari */}
          <div>
            <MapHours />
          </div>
        </div>
      </Section>
    </>
  )
}
