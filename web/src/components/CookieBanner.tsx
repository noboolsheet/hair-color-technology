import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import { Notation } from './bits'
import {
  CONSENT_CATEGORIES,
  useConsent,
  type Consent,
  type ConsentCategory,
} from '../consent/ConsentProvider'
import { useI18n } from '../i18n'

/**
 * Banner del consenso + pannello di dettaglio.
 *
 * Scelte deliberate, per non scivolare nei dark pattern che il Garante
 * contesta: "Accetta tutti" e "Rifiuta tutti" hanno lo STESSO peso visivo
 * (stessa forma, stessa dimensione, nessuno dei due sbiadito); non c'è
 * nessuna X che chiuda il banner senza decidere; gli interruttori partono
 * tutti spenti. Finché non si sceglie, niente di facoltativo si attiva.
 */

/** Interruttore accessibile: è un vero checkbox, solo vestito da switch. */
function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
}: {
  checked: boolean
  onChange?: (v: boolean) => void
  label: string
  disabled?: boolean
}) {
  return (
    <label className={`inline-flex shrink-0 items-center ${disabled ? '' : 'cursor-pointer'}`}>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        aria-label={label}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span
        aria-hidden="true"
        className={`relative h-6 w-11 rounded-full transition-colors duration-300 ease-bench peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-magenta ${
          checked ? 'bg-magenta' : 'bg-ink/25'
        } ${disabled ? 'opacity-55' : ''}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 ease-bench ${
            checked ? 'left-[1.375rem]' : 'left-0.5'
          }`}
        />
      </span>
    </label>
  )
}

/** Pannello con la scelta per categoria. */
function Panel({ onClose }: { onClose: () => void }) {
  const { t } = useI18n()
  const { consent, save } = useConsent()
  const [draft, setDraft] = useState<Consent>(consent)
  const ref = useRef<HTMLDivElement>(null)

  // Esc chiude il pannello e riporta al banner: non è una scelta, quindi
  // non salva nulla.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    ref.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const c = t.consent

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-graphite/50 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-panel-title"
        tabIndex={-1}
        className="max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-[8px] bg-raised p-6 shadow-2xl ring-1 ring-ink/10 outline-none sm:rounded-[8px] sm:p-8"
      >
        <h2 id="consent-panel-title" className="display-tight text-[1.6rem] text-ink">
          {c.panelTitle}
        </h2>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-ink/70">{c.panelBody}</p>

        <ul className="mt-7 grid gap-3">
          {/* Necessari: mostrati per trasparenza, non disattivabili. */}
          <li className="rounded-[5px] bg-sunken p-5 ring-1 ring-sage-600/15">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-ink">{c.necessaryTitle}</h3>
                <p className="mt-1.5 text-[0.93rem] leading-relaxed text-ink/70">
                  {c.necessaryBody}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Toggle checked disabled label={c.necessaryTitle} />
                <Notation className="!text-[0.6rem] !text-sageInk/70">{c.alwaysOn}</Notation>
              </div>
            </div>
          </li>

          {CONSENT_CATEGORIES.map((key: ConsentCategory) => {
            const cat = c.categories[key]
            return (
              <li key={key} className="rounded-[5px] bg-ground p-5 ring-1 ring-ink/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-ink">{cat.title}</h3>
                    <p className="mt-1.5 text-[0.93rem] leading-relaxed text-ink/70">{cat.body}</p>
                    {/* Onestà: queste due categorie sono predisposte ma
                        ancora inutilizzate, e lo diciamo. */}
                    {key !== 'maps' && (
                      <p className="mt-2 text-[0.88rem] italic text-ink/50">{c.notActiveYet}</p>
                    )}
                  </div>
                  <Toggle
                    checked={draft[key]}
                    label={cat.title}
                    onChange={(v) => setDraft((d) => ({ ...d, [key]: v }))}
                  />
                </div>
              </li>
            )
          })}
        </ul>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row-reverse sm:items-center sm:justify-start">
          <button
            type="button"
            onClick={() => save(draft)}
            className="rounded-[3px] bg-magenta px-6 py-3 text-[0.95rem] font-medium text-white transition-colors duration-300 ease-bench hover:bg-magenta-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
          >
            {c.save}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[3px] px-6 py-3 text-[0.95rem] font-medium text-ink/70 ring-1 ring-ink/20 transition-colors duration-300 ease-bench hover:text-ink hover:ring-ink/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
          >
            {c.close}
          </button>
        </div>
      </div>
    </div>
  )
}

export function CookieBanner() {
  const { t } = useI18n()
  const { pending, acceptAll, rejectAll } = useConsent()
  const [panelOpen, setPanelOpen] = useState(false)

  if (!pending) return null
  const c = t.consent

  if (panelOpen) return <Panel onClose={() => setPanelOpen(false)} />

  return (
    <div
      role="dialog"
      aria-labelledby="consent-banner-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-raised/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2.5">
            <Icon name="check" size={18} className="shrink-0 text-sageInk" />
            <h2 id="consent-banner-title" className="font-semibold text-ink">
              {c.bannerTitle}
            </h2>
          </div>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/70">{c.bannerBody}</p>
          <Link
            to="/cookie"
            className="mt-2 inline-block text-[0.9rem] text-magenta underline-offset-4 hover:underline"
          >
            {c.readPolicy}
          </Link>
        </div>

        {/* Accettare e rifiutare hanno lo stesso peso: stesso riquadro,
            stessa larghezza, nessuna gerarchia visiva fra i due. */}
        <div className="grid shrink-0 gap-2.5 sm:grid-cols-2 lg:w-[22rem]">
          <button
            type="button"
            onClick={rejectAll}
            className="rounded-[3px] px-5 py-3 text-[0.95rem] font-medium text-ink ring-1 ring-ink/25 transition-colors duration-300 ease-bench hover:ring-ink/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
          >
            {c.rejectAll}
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-[3px] bg-magenta px-5 py-3 text-[0.95rem] font-medium text-white transition-colors duration-300 ease-bench hover:bg-magenta-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
          >
            {c.acceptAll}
          </button>
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className="py-1.5 text-[0.9rem] text-ink/60 underline underline-offset-4 transition-colors hover:text-ink sm:col-span-2"
          >
            {c.customize}
          </button>
        </div>
      </div>
    </div>
  )
}
