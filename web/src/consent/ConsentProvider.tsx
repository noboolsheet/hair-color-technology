import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  Consenso ai cookie e ai servizi di terze parti
 * ─────────────────────────────────────────────────────────────────────────
 *  Regole a cui questo modulo obbedisce (art. 122 Codice Privacy e linee
 *  guida cookie del Garante, 2021):
 *
 *   • Niente si attiva prima di una scelta esplicita. Nessuna casella è
 *     pre-selezionata: lo stato di partenza è "tutto negato".
 *   • Rifiutare deve costare quanto accettare: il banner ha due pulsanti
 *     di pari evidenza, nessuna X che equivale a un sì implicito.
 *   • Lo scorrimento della pagina NON è consenso.
 *   • La scelta si può cambiare o revocare in ogni momento (link in fondo).
 *   • La scelta viene registrata con data e versione: se un domani
 *     aggiungiamo una categoria, `CONSENT_VERSION` sale e la domanda
 *     viene riproposta invece di dare per buono un consenso vecchio.
 *
 *  PER AGGIUNGERE ANALYTICS O UN PIXEL PUBBLICITARIO:
 *   1. non toccare l'HTML: lo script NON va mai messo in index.html, o
 *      partirebbe prima della scelta;
 *   2. caricalo da un effetto che osserva il consenso, così:
 *
 *        const { consent } = useConsent()
 *        useEffect(() => {
 *          if (!consent.analytics) return
 *          // inserisci qui il tag (createElement('script') …)
 *        }, [consent.analytics])
 *
 *   3. alza CONSENT_VERSION, così a chi ha già scelto viene richiesto;
 *   4. aggiorna la Cookie Policy: la tabella e il testo devono dire
 *      esattamente cosa viene installato.
 */

/** Sale di uno ogni volta che cambiano le categorie o i servizi elencati. */
export const CONSENT_VERSION = 1

const KEY = 'hct-consent'
/** Chiave della vecchia scelta sulla sola mappa, da migrare. */
const LEGACY_MAP_KEY = 'hct-map-consent'

/** Categorie facoltative. Le tecniche non si scelgono: servono e basta. */
export type ConsentCategory = 'maps' | 'analytics' | 'marketing'
export const CONSENT_CATEGORIES: ConsentCategory[] = ['maps', 'analytics', 'marketing']

export type Consent = Record<ConsentCategory, boolean>

const NONE: Consent = { maps: false, analytics: false, marketing: false }
const ALL: Consent = { maps: true, analytics: true, marketing: true }

interface Stored {
  v: number
  date: string
  consent: Consent
}

interface ConsentCtx {
  consent: Consent
  /** Vero finché la persona non ha ancora scelto: il banner è visibile. */
  pending: boolean
  /** Data ISO della scelta registrata, se c'è. */
  decidedAt: string | null
  acceptAll: () => void
  rejectAll: () => void
  /** Salva una scelta puntuale per categoria. */
  save: (c: Consent) => void
  /** Concede una sola categoria (usato dal riquadro della mappa). */
  grant: (c: ConsentCategory) => void
  /** Riapre la scelta (link "Preferenze cookie" nel footer). */
  reopen: () => void
}

const Ctx = createContext<ConsentCtx | null>(null)

/** Scelta registrata e ancora valida, oppure null se va (ri)chiesta. */
function read(): Stored | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Stored
    // Un consenso dato su una versione precedente non copre le categorie
    // aggiunte dopo: si torna a chiedere.
    if (parsed?.v !== CONSENT_VERSION || !parsed.consent) return null
    return { ...parsed, consent: { ...NONE, ...parsed.consent } }
  } catch {
    // Storage non disponibile (navigazione privata): si chiede a ogni visita
    // e nulla di facoltativo parte da solo. È il comportamento prudente.
    return null
  }
}

/**
 * Migrazione dal periodo in cui la mappa aveva un consenso tutto suo.
 * Chi allora aveva detto sì non deve ritrovarsi la mappa spenta: quel consenso
 * resta valido, mentre per le categorie nuove il banner chiede comunque.
 */
function readLegacyMap(): boolean {
  try {
    return localStorage.getItem(LEGACY_MAP_KEY) === 'yes'
  } catch {
    return false
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<Stored | null>(read)
  // Finché non c'è una scelta valida partiamo da "tutto negato", tranne la
  // mappa se era già stata accettata prima che esistesse il banner.
  const [reopened, setReopened] = useState(false)

  const persist = useCallback((consent: Consent) => {
    const next: Stored = { v: CONSENT_VERSION, date: new Date().toISOString(), consent }
    setStored(next)
    setReopened(false)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
      localStorage.removeItem(LEGACY_MAP_KEY)
    } catch {
      /* la scelta vale per questa visita, semplicemente non si ricorda */
    }
  }, [])

  const value = useMemo<ConsentCtx>(() => {
    const consent: Consent = stored
      ? stored.consent
      : { ...NONE, maps: readLegacyMap() }

    return {
      consent,
      pending: stored === null || reopened,
      decidedAt: stored?.date ?? null,
      acceptAll: () => persist(ALL),
      rejectAll: () => persist(NONE),
      save: persist,
      grant: (c) => persist({ ...consent, [c]: true }),
      reopen: () => setReopened(true),
    }
  }, [stored, reopened, persist])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useConsent(): ConsentCtx {
  const c = useContext(Ctx)
  if (!c) throw new Error('useConsent deve stare dentro ConsentProvider')
  return c
}
