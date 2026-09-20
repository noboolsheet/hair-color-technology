import { useState } from 'react'
import { Icon } from './Icon'

interface Faq {
  q: string
  a: string
}

export function FaqList({ items }: { items: readonly Faq[] }) {
  // Tutte chiuse all'ingresso della pagina.
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="divide-y divide-ink/12 border-y border-ink/12">
      {items.map((f, i) => {
        const isOpen = open === i
        const panelId = `faq-panel-${i}`
        return (
          <div key={f.q}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full touch-manipulation items-center justify-between gap-6 py-5 text-left transition-colors hover:text-magenta"
              >
                <span className="text-[1.05rem] font-medium leading-snug">{f.q}</span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1 ring-ink/15 transition-all duration-300 ease-bench ${
                    isOpen ? 'rotate-180 bg-magenta text-white ring-magenta' : 'text-ink'
                  }`}
                >
                  <Icon name="chevron" size={18} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              className={`grid transition-all duration-400 ease-bench ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              {/* Anche la risposta chiude la voce: sul telefono, una volta
                  aperta, la domanda finisce spesso fuori schermo e l'unica
                  cosa a portata di pollice è il testo. Si salta il clic se
                  l'utente stava selezionando testo, per non chiudergli in
                  faccia quello che sta copiando. */}
              <div
                className="cursor-pointer touch-manipulation overflow-hidden"
                onClick={() => {
                  if (window.getSelection()?.toString()) return
                  setOpen(null)
                }}
              >
                <p className="max-w-prose pb-6 pr-14 text-ink/70 leading-relaxed">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
