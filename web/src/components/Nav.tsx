import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Logo, LogoWordmark } from './Logo'
import { Button } from './Button'
import { Icon } from './Icon'
import { HeaderControls } from './HeaderControls'
import { site, whatsappHref, isTodo } from '../content/site'
import { useI18n } from '../i18n'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { t } = useI18n()

  const links = [
    { to: '/', label: t.nav.home, end: true },
    { to: '/chi-siamo', label: t.nav.about },
    { to: '/servizi', label: t.nav.services },
    { to: '/prodotti', label: t.nav.products },
    { to: '/lavora-con-noi', label: t.nav.careers },
    { to: '/contatti', label: t.nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const waReady = !isTodo(site.whatsappNumber)

  const cta = waReady ? (
    <Button href={whatsappHref()} icon="whatsapp" className="!py-2.5 !px-5">
      {t.nav.contactCta}
    </Button>
  ) : (
    <Button to="/contatti" icon="arrow" className="!py-2.5 !px-5">
      {t.nav.contactCta}
    </Button>
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-bench ${
        scrolled || open
          ? 'border-b border-ink/10 bg-ground/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <div className="hidden items-center gap-4 lg:flex">
          <ul className="flex items-center gap-5">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `relative whitespace-nowrap text-[0.9rem] transition-colors duration-200 hover:text-magenta ${
                      isActive ? 'text-magenta' : 'text-ink/80'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      <span
                        className={`absolute -bottom-1.5 left-0 h-px bg-magenta transition-all duration-300 ease-bench ${
                          isActive ? 'w-full' : 'w-0'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <span className="h-5 w-px bg-ink/15" aria-hidden="true" />
          <HeaderControls />
          {cta}
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <HeaderControls />
          <button
            className="grid h-10 w-10 place-items-center text-ink"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <div
        className={`overflow-hidden bg-ground/95 backdrop-blur-md transition-[max-height] duration-400 ease-bench lg:hidden ${
          open ? 'max-h-[34rem] border-t border-ink/10' : 'max-h-0'
        }`}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* Nome del negozio in cima al menu (sotto la pastiglia del logo) */}
          <div className="border-b border-ink/10 py-4">
            <LogoWordmark size="1.6rem" />
          </div>
          <ul className="flex flex-col gap-1 py-3">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `block rounded-[3px] px-3 py-3 text-base transition-colors ${
                      isActive ? 'bg-sunken text-magenta' : 'text-ink/85'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-2">{cta}</li>
          </ul>
        </div>
      </div>
    </header>
  )
}
