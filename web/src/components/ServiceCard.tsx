import { Link } from 'react-router-dom'
import { BeforeAfter } from './BeforeAfter'
import { BenchCard } from './bits'
import { Icon } from './Icon'
import { serviceCategory, servicePhotos, type ServiceId } from '../content/catalog'
import { useI18n } from '../i18n'

/**
 * La scheda di un servizio: prima/dopo in alto con la categoria appoggiata
 * sopra, poi nome e descrizione breve, i due dati pratici incorniciati da
 * filetti, e in basso a destra il rimando alla pagina dedicata.
 *
 * L'ordine non è casuale: la foto convince, il testo spiega, i dati
 * rispondono alle due domande che ogni cliente si fa davvero — quanto dura e
 * quanto costa — e il link porta al resto.
 *
 * Le due righe dei dati hanno un'altezza minima fissa: i tempi di alcuni
 * servizi vanno a capo e altri no, e senza quella misura il link finale
 * ballerebbe da una scheda all'altra.
 */
export function ServiceCard({ id }: { id: ServiceId }) {
  const { t } = useI18n()
  const svc = t.services[id]
  const foto = servicePhotos[id]

  return (
    <BenchCard className="flex h-full flex-col overflow-hidden">
      <div className="relative">
        <BeforeAfter before={foto?.before} after={foto?.after} alt={svc.name} />
        {/* La categoria sta sopra la foto, in alto: è un dato della scheda,
            non dell'immagine, quindi resta ferma mentre le due foto scorrono
            sotto. Ha la fascia superiore tutta per sé — il badge Prima/Dopo è
            sceso in basso perché a 640px i due si toccavano. */}
        <span className="notation pointer-events-none absolute left-3 top-3 rounded-[2px] bg-raised/90 px-2.5 py-1 !text-[0.58rem] !text-sageInk ring-1 ring-ink/10 backdrop-blur-sm">
          {t.categories[serviceCategory[id]].label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-snug">{svc.name}</h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink/70">{svc.short}</p>

        {/* I dati pratici: un filetto sopra, uno in mezzo e uno sotto.
            Etichetta sopra e valore sotto, non affiancati: in due colonne la
            scheda si stringe a ~230px e un tempo come "65 min (corti/medi) ·
            80 min (lunghi)" andava a capo quattro volte. Impilati, il valore
            ha tutta la larghezza. L'altezza minima tiene allineate le schede
            fra loro. */}
        <dl className="mt-5 divide-y divide-ink/12 border-y border-ink/12 text-[0.9rem]">
          <div className="flex min-h-[4rem] flex-col justify-center gap-1 py-3">
            <dt className="notation !text-ink/50">{t.servizi.durationLabel}</dt>
            <dd className="text-ink/75">{svc.duration}</dd>
          </div>
          <div className="flex min-h-[4rem] flex-col justify-center gap-1 py-3">
            <dt className="notation !text-ink/50">{t.servizi.priceLabel}</dt>
            {/* Un prezzo mancante non si inventa: si dice che va chiesto. */}
            <dd className={svc.price ? 'font-medium text-ink' : 'text-ink/55'}>
              {svc.price || t.servizi.priceOnRequest}
            </dd>
          </div>
        </dl>

        <Link
          to={`/servizi/${id}`}
          className="-my-1.5 mt-3.5 inline-flex items-center gap-1.5 self-end py-1.5 text-[0.95rem] font-medium text-magenta transition-colors duration-300 ease-bench hover:text-magenta-deep"
        >
          {t.servizi.detailsCta}
          <Icon name="arrow" size={16} />
        </Link>
      </div>
    </BenchCard>
  )
}
