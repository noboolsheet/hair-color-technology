import { Button } from './Button'
import { Notation } from './bits'
import { isTodo } from '../content/site'
import { useI18n } from '../i18n'

/**
 * Il pulsante per scaricare un catalogo in PDF.
 *
 * Finché l'URL non c'è, il pulsante resta VISIBILE ma spento, con accanto la
 * nota che il PDF sta arrivando: così si sa che il catalogo esiste come
 * promessa, e intanto il clic non porta nel vuoto. Quando il file c'è, basta
 * riempire il campo in `site.ts` e diventa un vero link.
 *
 * Lo stato spento usa il `disabled` di `Button`, non uno stile a mano: così
 * resta lo stesso pulsante, solo spento.
 */
export function CatalogButton({ url, label }: { url: string; label: string }) {
  const { t } = useI18n()

  if (!isTodo(url)) {
    return (
      <Button href={url} icon="arrow">
        {label}
      </Button>
    )
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-x-4 gap-y-2">
      <Button disabled className="!cursor-not-allowed">
        {label}
      </Button>
      <Notation className="!text-ink/50">{t.common.catalogSoon}</Notation>
    </span>
  )
}
