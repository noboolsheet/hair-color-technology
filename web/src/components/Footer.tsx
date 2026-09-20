import { Link } from 'react-router-dom'
import { site, whatsappHref, isTodo } from '../content/site'
import { Icon } from './Icon'
import { LogoWordmark } from './Logo'
import { Notation } from './bits'
import { useI18n } from '../i18n'
import { useConsent } from '../consent/ConsentProvider'

function Social() {
  const items = [
    { key: 'instagram', href: site.social.instagram, icon: 'instagram' as const, label: 'Instagram' },
    { key: 'facebook', href: site.social.facebook, icon: 'facebook' as const, label: 'Facebook' },
    { key: 'google', href: site.social.googleBusiness, icon: 'google' as const, label: 'Google' },
  ].filter((i) => !isTodo(i.href))

  if (items.length === 0) return null
  return (
    <div className="flex justify-center gap-3 md:justify-start">
      {items.map((i) => (
        <a
          key={i.key}
          href={i.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={i.label}
          className="grid h-10 w-10 place-items-center rounded-[3px] text-limewash/70 ring-1 ring-limewash/15 transition-all duration-300 ease-bench hover:bg-magenta hover:text-white hover:ring-magenta"
        >
          <Icon name={i.icon} size={20} />
        </a>
      ))}
    </div>
  )
}

export function Footer() {
  const { t } = useI18n()
  const { reopen } = useConsent()
  const { address } = site
  const waReady = !isTodo(site.whatsappNumber)
  const mailReady = !isTodo(site.emailDisplay)
  const year = 2026
  const nav = [
    { to: '/chi-siamo', label: t.nav.about },
    { to: '/servizi', label: t.serviziPreview.title },
    { to: '/prodotti', label: t.nav.products },
    { to: '/lavora-con-noi', label: t.nav.careers },
    { to: '/contatti', label: t.nav.contact },
  ]

  return (
    <footer className="bg-band text-limewash">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        {/* Marchio. Su mobile la colonna sta in colonna centrata: il logo, il
            claim e i social si allineano all'asse della pagina. Da md in su
            torna tutto a sinistra. */}
        <div className="text-center md:text-left">
          <div className="inline-flex flex-col items-center gap-3">
            <span className="grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-[14px] bg-limewash p-2">
              <img
                src="/images/logo-mark.webp"
                alt=""
                width={1473}
                height={1473}
                className="h-full w-full object-contain"
              />
            </span>
            {/* Il logotipo completo, fascia magenta inclusa: nel footer il
                marchio si presenta per esteso, come nella nav. */}
            <LogoWordmark invert size="1.6rem" />
          </div>
          <p className="mx-auto mt-5 max-w-xs text-[0.98rem] leading-relaxed text-limewash/65 md:mx-0">
            {t.tagline}
          </p>
          <div className="mt-6">
            <Social />
          </div>
        </div>

        {/* Naviga */}
        <nav aria-label={t.footer.navigate}>
          <Notation className="!text-limewash/65">{t.footer.navigate}</Notation>
          <ul className="mt-4 grid gap-2.5">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="text-[0.98rem] text-limewash/75 transition-colors hover:text-magenta-soft"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contatti */}
        <div>
          <Notation className="!text-limewash/65">{t.footer.contacts}</Notation>
          <ul className="mt-4 grid gap-3 text-[0.95rem] text-limewash/75">
            <li className="flex items-start gap-2.5">
              <Icon name="pin" size={18} className="mt-0.5 shrink-0 text-sage" />
              <span>
                {isTodo(address.street) ? t.footer.todoAddress : address.street},{' '}
                {address.city} ({address.province})
              </span>
            </li>
            {waReady && (
              <li className="flex items-center gap-2.5">
                <Icon name="whatsapp" size={18} className="shrink-0 text-sage" />
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="hover:text-magenta-soft">
                  {site.phoneDisplay}
                </a>
              </li>
            )}
            {mailReady && (
              <li className="flex items-start gap-2.5">
                <Icon name="mail" size={18} className="mt-0.5 shrink-0 text-sage" />
                <a href={`mailto:${site.emailDisplay}`} className="break-all hover:text-magenta-soft">
                  {site.emailDisplay}
                </a>
              </li>
            )}
          </ul>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
            {site.brands.map((b) => (
              <span key={b.name} className="notation !text-limewash/60">
                {b.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-limewash/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-[0.8rem] text-limewash/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {year} Hair Color Technology {t.footer.rights}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {/* `-my-1.5 py-1.5`: allarga il bersaglio da toccare senza
                spostare nulla. Su un telefono 19px di altezza sono pochi. */}
            <Link to="/privacy" className="-my-1.5 py-1.5 hover:text-limewash/80">{t.footer.privacy}</Link>
            <Link to="/cookie" className="-my-1.5 py-1.5 hover:text-limewash/80">{t.footer.cookie}</Link>
            <Link to="/note-legali" className="-my-1.5 py-1.5 hover:text-limewash/80">{t.footer.legalNotes}</Link>
            {/* Revocare deve essere facile quanto acconsentire: il link sta in
                fondo a ogni pagina e riapre la stessa scelta del banner. */}
            <button type="button" onClick={reopen} className="-my-1.5 py-1.5 text-left underline-offset-4 hover:text-limewash/80 hover:underline">
              {t.consent.manage}
            </button>
            <span>{t.footer.vat.replace('{value}', site.vatNumber)}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
