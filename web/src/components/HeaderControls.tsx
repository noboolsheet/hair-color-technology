import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { useI18n, locales, type Locale } from '../i18n'
import { useTheme } from '../theme/ThemeProvider'

/** Selettore lingua + interruttore tema, in alto a destra nel menu. */
export function HeaderControls({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <LangSwitcher compact={compact} />
      <span className="h-5 w-px bg-ink/15" aria-hidden="true" />
      <ThemeToggle />
    </div>
  )
}

function LangSwitcher({ compact }: { compact: boolean }) {
  const { locale, setLocale, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const current = locales.find((l) => l.code === locale)!

  const choose = (code: Locale) => {
    setLocale(code)
    setOpen(false)
  }

  // In modalità compatta (menu mobile) mostra i tre codici in linea.
  if (compact) {
    return (
      <div className="flex items-center gap-1" role="group" aria-label={t.nav.language}>
        {locales.map((l) => (
          <button
            key={l.code}
            onClick={() => setLocale(l.code)}
            aria-pressed={l.code === locale}
            className={`rounded-[3px] px-2.5 py-1.5 text-[0.8rem] font-medium tracking-wide transition-colors ${
              l.code === locale ? 'bg-ink text-ground' : 'text-ink/60 hover:text-ink'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.language}
        className="flex items-center gap-1.5 rounded-[3px] px-2.5 py-2 text-[0.82rem] font-medium text-ink/80 transition-colors hover:text-ink"
      >
        <Icon name="globe" size={17} />
        <span>{current.label}</span>
        <Icon name="chevron" size={13} className={`transition-transform duration-300 ease-bench ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        role="listbox"
        className={`absolute right-0 top-full mt-2 min-w-[9rem] origin-top-right overflow-hidden rounded-[5px] bg-raised shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)] ring-1 ring-ink/10 transition-all duration-200 ease-bench ${
          open ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        {locales.map((l) => (
          <button
            key={l.code}
            role="option"
            aria-selected={l.code === locale}
            onClick={() => choose(l.code)}
            className={`flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[0.9rem] transition-colors hover:bg-sunken ${
              l.code === locale ? 'text-magenta' : 'text-ink/80'
            }`}
          >
            <span>{l.long}</span>
            <span className="notation !text-ink/45">{l.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  const { t } = useI18n()
  return (
    <button
      onClick={toggle}
      aria-label={dark ? t.nav.toLight : t.nav.toDark}
      title={dark ? t.nav.toLight : t.nav.toDark}
      className="grid h-9 w-9 place-items-center rounded-[3px] text-ink/80 transition-colors hover:text-ink"
    >
      <span className="relative block h-[19px] w-[19px]">
        <Icon
          name="sun"
          size={19}
          className={`absolute inset-0 transition-all duration-400 ease-bench ${
            dark ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0'
          }`}
        />
        <Icon
          name="moon"
          size={19}
          className={`absolute inset-0 transition-all duration-400 ease-bench ${
            dark ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`}
        />
      </span>
    </button>
  )
}
