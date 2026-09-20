import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { it } from './locales/it'
import { en } from './locales/en'
import { es } from './locales/es'

export type Locale = 'it' | 'en' | 'es'
export type Dict = typeof it

const dicts: Record<Locale, Dict> = { it, en: en as Dict, es: es as Dict }

export const locales: { code: Locale; label: string; long: string }[] = [
  { code: 'it', label: 'IT', long: 'Italiano' },
  { code: 'en', label: 'EN', long: 'English' },
  { code: 'es', label: 'ES', long: 'Español' },
]

const KEY = 'hct-lang'

interface I18nCtx {
  locale: Locale
  setLocale: (l: Locale) => void
  /** Dizionario della lingua attiva (accesso diretto, type-safe). */
  t: Dict
}

const Ctx = createContext<I18nCtx | null>(null)

function initialLocale(): Locale {
  if (typeof window === 'undefined') return 'it'
  const saved = localStorage.getItem(KEY)
  if (saved === 'it' || saved === 'en' || saved === 'es') return saved
  const nav = navigator.language.slice(0, 2)
  if (nav === 'en' || nav === 'es') return nav
  return 'it'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    localStorage.setItem(KEY, locale)
  }, [locale])

  return (
    <Ctx.Provider value={{ locale, setLocale, t: dicts[locale] }}>
      {children}
    </Ctx.Provider>
  )
}

export function useI18n(): I18nCtx {
  const c = useContext(Ctx)
  if (!c) throw new Error('useI18n must be used within I18nProvider')
  return c
}
