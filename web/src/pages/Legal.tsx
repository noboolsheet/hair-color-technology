import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { site } from '../content/site'
import { useI18n } from '../i18n'

/**
 * Pagine legali (privacy, cookie, note legali). Stessa impaginazione per tutte
 * e tre: identità del titolare + sezioni di prosa + data di revisione.
 *
 * I dati identificativi NON stanno nelle traduzioni: arrivano da `site.ts`, la
 * stessa fonte del footer, così P. IVA, indirizzo ed email non possono divergere
 * fra una pagina e l'altra.
 */

/** Blocco "chi è il titolare", condiviso dalle tre pagine. */
function Titolare({ title }: { title: string }) {
  const { address } = site
  const rows: { label: string; value: string; href?: string }[] = [
    { label: 'Denominazione', value: `${site.name} di ${site.owner}` },
    {
      label: 'Sede',
      value: `${address.street}, ${address.zip} ${address.city} (${address.province}), ${address.country}`,
    },
    { label: 'P. IVA', value: site.vatNumber },
    { label: 'Email', value: site.emailDisplay, href: `mailto:${site.emailDisplay}` },
    { label: 'Telefono', value: site.phoneDisplay, href: `tel:+${site.whatsappNumber}` },
  ]

  return (
    <section>
      <h2 className="text-[1.35rem] font-semibold text-ink">{title}</h2>
      <dl className="mt-4 grid gap-2.5 rounded-[5px] bg-sunken p-6 ring-1 ring-sage-600/15">
        {rows.map((r) => (
          <div key={r.label} className="grid gap-0.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
            <dt className="notation !text-sageInk/80">{r.label}</dt>
            <dd className="text-ink/80">
              {r.href ? (
                <a href={r.href} className="break-all hover:text-magenta">
                  {r.value}
                </a>
              ) : (
                r.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/** Tabella delle preferenze salvate nel browser (solo cookie policy). */
function CookieTable({
  title,
  head,
  rows,
}: {
  title: string
  head: readonly string[]
  rows: readonly (readonly string[])[]
}) {
  return (
    // `min-w-0`: un elemento di una griglia ha `min-width: auto` e si rifiuta di
    // restringersi sotto la larghezza minima del contenuto. Senza questo, la
    // tabella spinge la pagina e su mobile compare lo scroll orizzontale.
    <section className="min-w-0">
      <h2 className="text-[1.35rem] font-semibold text-ink">{title}</h2>
      {/* La tabella scorre da sola sugli schermi stretti: la pagina non deve
          mai scorrere in orizzontale. */}
      <div className="mt-4 overflow-x-auto rounded-[5px] ring-1 ring-ink/10">
        <table className="w-full min-w-[34rem] border-collapse text-left text-[0.95rem]">
          <thead>
            <tr className="bg-sunken">
              {head.map((h) => (
                <th key={h} className="notation !text-sageInk/80 px-4 py-3 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-t border-ink/10 align-top">
                {r.map((cell, i) => (
                  <td
                    key={i}
                    className={`px-4 py-3 ${
                      i === 0
                        ? 'whitespace-nowrap font-mono text-[0.85rem] text-ink'
                        : 'text-ink/75'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default function Legal({ kind }: { kind: 'privacy' | 'cookie' | 'note' }) {
  const { t } = useI18n()
  const l = t.legal

  const page = {
    privacy: {
      title: l.privacyTitle,
      lead: l.privacyLead,
      sections: l.privacySections,
      updated: l.privacyUpdated,
    },
    cookie: {
      title: l.cookieTitle,
      lead: l.cookieLead,
      sections: l.cookieSections,
      updated: l.cookieUpdated,
    },
    note: {
      title: l.noteTitle,
      lead: l.noteLead,
      sections: l.noteSections,
      updated: l.noteUpdated,
    },
  }[kind]

  // La tabella va dopo "Preferenze tecniche", cioè la seconda sezione.
  const tableAfter = kind === 'cookie' ? 1 : -1

  return (
    <>
      <PageHero tone={0.3} title={page.title} lead={page.lead} />
      <Section tone="limewash">
        <div className="mx-auto grid max-w-prose gap-10">
          <Titolare title={l.ownerTitle} />

          {page.sections.map((s, i) => (
            <div key={s.title} className="contents">
              <section>
                <h2 className="text-[1.35rem] font-semibold text-ink">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-ink/75">
                  {s.body.replace('{email}', site.emailDisplay)}
                </p>
              </section>
              {i === tableAfter && (
                <CookieTable
                  title={l.cookieTableTitle}
                  head={l.cookieTable.head}
                  rows={l.cookieTable.rows}
                />
              )}
            </div>
          ))}

          <p className="notation !text-ink/45">{page.updated}</p>
        </div>
      </Section>
    </>
  )
}
