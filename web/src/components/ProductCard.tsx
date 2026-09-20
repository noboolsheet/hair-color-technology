import { Link } from 'react-router-dom'
import { Notation, PhotoPlaceholder } from './bits'
import { Icon } from './Icon'
import { productLine, productPhotos, type ProductId } from '../content/catalog'
import { useI18n } from '../i18n'

/**
 * La scheda di un prodotto. In fondo, sulla stessa riga: a sinistra il
 * bisogno che il prodotto copre — che prima stava sopra il titolo — e a
 * destra il rimando alla pagina dedicata.
 *
 * L'etichetta del bisogno è scesa in fondo perché lassù rubava il primo
 * sguardo al nome del prodotto, che è quello che si cerca.
 */
export function ProductCard({ id }: { id: ProductId }) {
  const { t } = useI18n()
  const prod = t.products[id]
  const foto = productPhotos[id]

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[5px] bg-raised ring-1 ring-ink/10 transition-all duration-300 ease-bench hover:-translate-y-1 hover:shadow-[0_20px_44px_-26px_rgba(51,51,51,0.5)]">
      <div className="p-5 pb-0">
        {foto ? (
          <img
            src={foto}
            alt={prod.name}
            loading="lazy"
            decoding="async"
            className="aspect-[5/4] w-full rounded-[4px] object-cover"
          />
        ) : (
          <PhotoPlaceholder label={t.prodotti.photoTodo} ratio="aspect-[5/4]" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-lg font-semibold leading-snug">{prod.name}</h2>
        <p className="mt-0.5 text-[0.82rem] text-ink/50">{productLine[id]}</p>
        <p className="mt-3 flex-1 text-[0.94rem] leading-relaxed text-ink/70">{prod.description}</p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-ink/10 pt-4">
          <Notation className="!text-sageInk">{prod.need}</Notation>
          <Link
            to={`/prodotti/${id}`}
            className="-my-1.5 inline-flex shrink-0 items-center gap-1.5 py-1.5 text-[0.9rem] font-medium text-magenta transition-colors duration-300 ease-bench hover:text-magenta-deep"
          >
            {t.servizi.detailsCta}
            <Icon name="arrow" size={15} />
          </Link>
        </div>
      </div>
    </article>
  )
}
