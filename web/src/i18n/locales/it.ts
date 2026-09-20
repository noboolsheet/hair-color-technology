import type { ProductCopy, ProductId, ServiceCopy, ServiceId } from '../../content/catalog'

export const it = {
  nav: {
    home: 'Home',
    about: 'Chi siamo',
    services: 'Servizi',
    products: 'Prodotti',
    contact: 'Contatti',
    careers: 'Lavora con noi',
    bookWa: 'Prenota su WhatsApp',
    contactCta: 'Contattaci',
    openMenu: 'Apri menu',
    closeMenu: 'Chiudi menu',
    language: 'Lingua',
    toLight: 'Passa al tema chiaro',
    toDark: 'Passa al tema scuro',
  },
  common: {
    catalogSoon: 'PDF in preparazione',
    discoverServices: 'Scopri i servizi',
    allServices: 'Tutti i servizi',
    allProducts: 'Tutti i prodotti',
    readOnGoogle: 'Leggi su Google',
    leaveReview: 'Lascia una recensione',
    writeMessage: 'Scrivici un messaggio',
    bookAppointment: 'Prenota un appuntamento',
    today: 'oggi',
    scroll: 'scorri',
    directions: 'Indicazioni stradali',
  },
  hero: {
    titleA: 'Un’esperienza',
    titleAccent: 'sensoriale',
    titleB: 'per la tua bellezza.',
    lead: 'Costruiamo l’architettura del tuo colore attraverso tecnologia, benessere e cura sartoriale. Per regalarti un momento unico e restituirti la migliore versione di te.',
  },
  reviews: {
    title: 'La fiducia delle nostre clienti.',
    leadNoRating: 'Le recensioni reali delle nostre clienti sono raccolte su Google.',
    leadRating: '{value} su 5 · recensioni verificate su Google.',
  },
  storia: {
    title: 'Un salone dove le persone vengono prima di tutto.',
    lead: 'Hair Color Technology nasce dalla passione di Francesca Polizza per la salute del capello e per la tecnica del colore. Qui ogni cliente è accolta, ascoltata e seguita con competenza: non trasformiamo solo l’immagine, ci prendiamo cura dell’integrità dei tuoi capelli in ogni passaggio.',
    points: [
      'Diagnosi personalizzata prima di ogni servizio',
      'Prodotti professionali Goldwell e tecniche non invasive',
      'Un ambiente accogliente, curato e rilassante',
    ],
    cta: 'Conosci Francesca Polizza',
  },
  serviziPreview: {
    title: 'Servizi e trattamenti',
    lead: 'Colore tecnico, cura della fibra, taglio e make-up. Ogni intervento è pensato per valorizzarti senza compromettere la salute dei capelli.',
  },
  prodottiPreview: {
    title: 'I nostri prodotti',
    lead: 'La stessa cura del salone, da portare a casa. Una selezione delle linee professionali che consigliamo più spesso.',
  },
  marchi: {
    text: 'Lavoriamo con marchi professionali selezionati per efficacia e rispetto del capello. Scopri i prodotti che usiamo ogni giorno.',
  },
  mappa: {
    title: 'Dove trovarci',
    lead: 'Siamo a Paola, in Calabria. Passa a trovarci su appuntamento.',
    whereTitle: 'Dove siamo',
    hoursTitle: 'Orari di apertura',
    todoAddress: 'Via — da completare',
    mapTodo: 'Mappa Google — da incorporare',
    // Consenso preventivo per la mappa: l'iframe di Google è l'unico terzo del
    // sito e installa cookie, quindi si carica solo se la persona lo chiede.
    mapConsentTitle: 'Mappa di Google',
    mapConsentBody:
      'Per mostrarti la mappa dobbiamo caricare Google Maps. Caricandola, Google riceve il tuo indirizzo IP e può installare cookie sul tuo dispositivo.',
    mapConsentAction: 'Mostra la mappa',
    mapConsentNote: 'Maggiori dettagli nella Cookie Policy.',
    byAppointment:
      'Riceviamo su appuntamento. Ti consigliamo di scriverci prima di passare.',
  },
  faqSection: {
    title: 'Domande frequenti',
    lead: 'Le risposte che diamo più spesso in salone, per aiutarti a scegliere con serenità.',
  },
  ctaDefault: {
    title: 'Metti i tuoi capelli in buone mani.',
    lead: 'Raccontaci cosa desideri: dopo una diagnosi ti proponiamo il percorso più adatto, con la massima cura per la salute dei tuoi capelli.',
  },
  /** Le tappe della storia di Francesca (Chi siamo). Testi dal docx della
   *  biografia; foto e disposizione stanno in src/content/storia.ts. */
  tappe: {
    scintilla: {
      title: 'La scintilla',
      caption: 'La bambola Francesca',
      body:
        'Fin da piccola, la creatività e l’amore per il dettaglio facevano parte del suo modo di guardare il mondo. Amava prendersi cura della sua bambola Francesca, in particolare realizzando acconciature su di lei.',
    },
    danza: {
      title: 'Espressione e disciplina',
      caption: 'Teatro e danza',
      body:
        'La crescita è stata accompagnata dalla passione per il teatro e la danza, una disciplina che le ha insegnato l’armonia delle forme e l’eleganza del movimento, e a riconoscere l’unicità di ognuno.',
    },
    diciotto: {
      title: 'Il primo contatto',
      caption: 'I diciotto anni',
      body:
        'Il primo contatto con il mondo dell’hair care, dove ha scoperto l’emozione di trasformare il look delle persone, è avvenuto quando aveva circa diciotto anni.',
    },
    laurea: {
      title: 'Gli studi e l’accoglienza',
      caption: 'La laurea',
      body:
        'La curiosità e la voglia di ampliare gli orizzonti l’hanno portata a intraprendere gli studi universitari nel settore del Turismo. Un’esperienza fondamentale, che ha arricchito la sua visione sull’accoglienza, sul valore dell’esperienza del cliente e sulla valorizzazione della bellezza del territorio.',
    },
    milano: {
      title: 'L’esperienza milanese',
      caption: 'Milano',
      body:
        'Un breve periodo vissuto a Milano, la capitale della moda e delle nuove tendenze, dove si è avvicinata a un approccio moderno, dinamico e internazionale al settore beauty.',
    },
    ritorno: {
      title: 'La scelta del cuore',
      caption: 'Il ritorno a casa',
      body:
        'La consapevolezza che il suo futuro dovesse fondarsi sulla combinazione tra alta formazione e radici: la decisione forte di ritornare in Calabria, per portare valore e innovazione nella sua terra.',
    },
    goldwell: {
      title: 'L’incontro con Goldwell',
      caption: 'Specialisti del Colore',
      body:
        'La decisione di dedicarsi totalmente alla colorazione, e il primo approccio con Goldwell, brand globale leader nella tecnologia del colore e della cura di capelli e cute. Questa partnership ha segnato la svolta: unire la creatività artistica alla tecnologia cosmetica dei trattamenti di colorazione, fino a diventare Specialisti del Colore.',
    },
    salone: {
      title: 'La nascita del salone',
      caption: 'Il primo giorno',
      body:
        'La scelta di mettersi in proprio nasce dal suo desiderio profondo di dar vita a un luogo unico e distintivo, che raccontasse un nuovo modo di intendere la bellezza, fondato sulla filosofia dell’Hair Color Technology.',
    },
  },
  about: {
    heroTitle: 'Chi c’è dietro ogni formula.',
    heroLead:
      'Hair Color Technology è il progetto di Francesca Polizza: un salone dove competenza tecnica e cura delle persone sono la stessa cosa.',
    philosophyTitle: 'La nostra filosofia',
    philosophyLead:
      'Crediamo che prendersi cura dei capelli significhi prima di tutto prendersi cura di chi li porta. La bellezza nasce dalla salute, e la fiducia nasce dall’ascolto.',
    quote:
      'Affida i tuoi capelli alle nostre mani con serenità: pensiamo noi alla loro salute e alla loro bellezza, con perfezione assoluta.',
    quoteAttrib: 'Il nostro impegno con te',
    photoFrancesca: 'Ritratto di Francesca — da inserire',
    valuesTitle: 'I valori che ci guidano',
    valuesLead:
      'Tre principi che ritrovi in ogni servizio, dal primo saluto all’ultimo colpo di spazzola.',
    values: [
      {
        title: 'Le persone prima di tutto',
        body: 'Per Francesca la cosa più importante sono le persone. Ogni cliente viene accolta, ascoltata e seguita con attenzione sincera: non sei un appuntamento, sei una storia da valorizzare.',
      },
      {
        title: 'Competenza tecnica',
        body: 'La “Technology” del nostro nome è un impegno: diagnosi, colorimetria e formule su misura. Studiamo il tuo capello prima di intervenire, e ti spieghiamo sempre il perché di ogni scelta.',
      },
      {
        title: 'Salute della fibra',
        body: 'Tecniche non invasive e prodotti professionali per proteggere l’integrità del capello. Niente promesse miracolose: risultati belli e sani, che durano nel tempo.',
      },
    ],
    photoVision: 'Foto per la Vision — da inserire',
    photoMission: 'Foto per la Mission — da inserire',
    photoAlt: 'Francesca Polizza con la cartella colori davanti al salone',
    photoTeam: 'Foto del team al lavoro — da inserire',
    storyTitle: 'Conosci Francesca Polizza',
    storyLead:
      'Dalle acconciature sulla bambola di quando era bambina fino al banco colore del salone: le tappe che hanno portato Francesca a fondare Hair Color Technology.',
    visionTitle: 'La nostra Vision',
    visionBody:
      'Diventare un punto di riferimento nell’architettura sensoriale del capello, elevando la cura della fibra capillare a una vera e propria esperienza di ricostruzione e benessere.',
    missionTitle: 'La nostra Mission',
    missionBody:
      'Regalare a ogni cliente un percorso capace di coinvolgere tutti i sensi, dove la precisione della tecnica incontra la sensibilità dell’arte per celebrare l’unicità di ciascuno.',
    ctaTitle: 'Vieni a trovarci.',
    ctaLead:
      'Il modo migliore per capire il nostro metodo è viverlo. Prenota una diagnosi e parliamo dei tuoi capelli.',
  },
  servizi: {
    usedPhotoAlt: 'Prodotti Kerasilk pronti da portare a casa',
    catalogoCta: 'Scarica il catalogo dei servizi',
    before: 'Prima',
    after: 'Dopo',
    durationLabel: 'Tempo indicativo',
    priceLabel: 'A partire da',
    photoTodo: 'Foto — da inserire',
    priceOnRequest: 'su richiesta',
    detailsCta: 'Scopri di più',
    backToList: 'Tutti i servizi',
    ritualTitle: 'Come si svolge',
    techTitle: 'Nota tecnica',
    notFoundTitle: 'Servizio non trovato',
    notFoundLead: 'Il servizio che cerchi non esiste o ha cambiato nome. Qui sotto trovi il menù completo.',
    heroTitle: 'Ogni servizio è una formula scritta per te.',
    heroLead:
      'Colore, trattamenti, taglio e make-up. Tutto parte da una diagnosi e da un obiettivo realistico, concordato insieme.',
    listTitle: 'Servizi e trattamenti',
    listLead: 'Filtra per categoria o scorri l’elenco completo.',
    filterAll: 'Tutti',
    usedText:
      'In salone usiamo linee professionali Goldwell e trattamenti selezionati. Puoi scoprire i prodotti che consigliamo e portarti a casa la stessa cura.',
    usedCta: 'I prodotti che usiamo',
    ctaTitle: 'Non sai da dove partire?',
    ctaLead:
      'Scrivici: dopo una breve diagnosi ti diciamo con onestà qual è il percorso migliore per i tuoi capelli.',
  },
  prodotti: {
    usageTitle: 'Come si usa',
    schedaTitle: 'Scheda tecnica',
    schedaLine: 'Linea',
    schedaType: 'Tipo di prodotto',
    schedaWhen: 'Frequenza',
    schedaNote: 'Formati e prezzi variano nel tempo: chiedili in salone o scrivici, ti diciamo cosa abbiamo disponibile.',
    altriTitle: 'Altri prodotti',
    backToList: 'Tutti i prodotti',
    notFoundTitle: 'Prodotto non trovato',
    notFoundLead: 'Il prodotto che cerchi non esiste o ha cambiato nome. Qui sotto trovi la selezione completa.',
    catalogoCta: 'Scarica il catalogo dei prodotti',
    settimanaLabel: 'Il prodotto della settimana',
    settimanaFor: 'Indicato per',
    heroTitle: 'La cura del salone, a casa tua.',
    heroLead:
      'Una selezione delle linee professionali che usiamo e consigliamo. Prodotti pensati per proteggere il colore e la salute del capello ogni giorno.',
    photoTodo: 'Foto prodotto — da inserire',
    askText: 'Cerchi un prodotto specifico o un consiglio per la tua routine?',
    askCta: 'Chiedi alle nostre esperte',
    ctaTitle: 'Un consiglio su misura per i tuoi capelli.',
    ctaLead:
      'Scrivici il tuo bisogno: ti indichiamo i prodotti giusti per il tuo tipo di capello e per il tuo colore.',
  },
  contatti: {
    heroTitle: 'Parliamo dei tuoi capelli.',
    heroLead:
      'Scrivici su WhatsApp per la risposta più veloce, oppure compila il modulo: ti ricontattiamo il prima possibile. Riceviamo su appuntamento.',
    whatsapp: 'WhatsApp',
    phone: 'Telefono',
    email: 'Email',
    writeUsNow: 'Scrivici ora',
    todo: '— da completare',
    orElse: 'Oppure scrivici qui',
    candidaturaNote: 'Cerchi lavoro? Trovi il modulo di candidatura nella pagina Lavora con noi.',
  },
  form: {
    name: 'Nome e cognome',
    namePh: 'Il tuo nome',
    phone: 'Telefono',
    phoneOpt: 'Facoltativo',
    email: 'Email',
    emailPh: 'nome@esempio.it',
    reason: 'Motivo',
    message: 'Messaggio',
    messagePh: 'Raccontaci cosa desideri per i tuoi capelli…',
    privacyPre: 'Ho letto e accetto la ',
    privacyLink: 'privacy policy',
    privacyPost: '.',
    submit: 'Invia messaggio',
    submitting: 'Invio in corso…',
    replySoon: 'Ti rispondiamo il prima possibile',
    successTitle: 'Messaggio inviato!',
    successBody: 'Grazie per averci scritto. Ti risponderemo il prima possibile.',
    sendAnother: 'Invia un altro messaggio',
    errorMsg:
      'Non siamo riusciti a inviare il messaggio. Riprova, oppure scrivici su WhatsApp.',
    reasons: [
      'Informazioni',
      'Richiesta appuntamento',
      'Colore / colorimetria',
      'Trattamenti',
      'Eventi / spose',
    ],
  },
  lavora: {
    heroTitle: 'Lavora con noi.',
    heroLead:
      'Cerchi un salone dove crescere davvero? Raccontaci chi sei: la nostra squadra si costruisce sulle persone.',
    introTitle: 'Unisciti alla squadra',
    introLead:
      'Cerchiamo persone appassionate di salute del capello e di colore tecnico, con voglia di formarsi e di prendersi cura delle clienti. Se ti riconosci, inviaci la tua candidatura: la leggeremo con attenzione.',
    formTitle: 'Invia la tua candidatura',
    formSubtitle: 'Compila il modulo e allega il tuo CV. Ti ricontatteremo noi.',
    openTitle: 'Posizioni aperte',
    openEmpty:
      'Al momento non ci sono posizioni aperte. Puoi comunque lasciarci la tua candidatura spontanea: la valuteremo con piacere e ti contatteremo se si libera un ruolo adatto a te.',
  },
  application: {
    role: 'Ruolo desiderato',
    rolePh: 'es. Colorista, parrucchiere/a, receptionist…',
    messagePh: 'Parlaci di te e della tua esperienza…',
    cvLabel: 'Curriculum (CV)',
    cvHint: 'Trascina qui il file o clicca per sceglierlo · PDF, DOC o DOCX (max 5 MB)',
    cvRemove: 'Rimuovi file',
    cvError: 'File non valido. Usa PDF, DOC o DOCX fino a 5 MB.',
    submit: 'Invia candidatura',
    submitting: 'Invio in corso…',
    successTitle: 'Candidatura inviata!',
    successBody: 'Grazie per il tuo interesse. Esamineremo il tuo profilo e ti ricontatteremo.',
    sendAnother: 'Invia un’altra candidatura',
    errorMsg:
      'Non siamo riusciti a inviare la candidatura. Riprova, oppure scrivici su WhatsApp.',
  },
  footer: {
    navigate: 'Naviga',
    contacts: 'Contatti',
    todoAddress: 'Indirizzo — da completare',
    privacy: 'Privacy',
    cookie: 'Cookie',
    legalNotes: 'Note legali',
    vat: 'P. IVA {value}',
    rights: 'di Francesca Polizza · Paola (CS)',
  },
  consent: {
    manage: 'Preferenze cookie',
    bannerTitle: 'Prima di proseguire',
    bannerBody:
      'Usiamo solo i cookie tecnici necessari a far funzionare il sito. Per la mappa, le statistiche e gli strumenti pubblicitari ci serve il tuo consenso: senza, non vengono attivati.',
    acceptAll: 'Accetta tutti',
    rejectAll: 'Rifiuta tutti',
    customize: 'Personalizza',
    readPolicy: 'Leggi la Cookie Policy',
    panelTitle: 'Preferenze cookie',
    panelBody:
      'Scegli quali categorie attivare. Puoi cambiare idea quando vuoi dal link “Preferenze cookie” in fondo a ogni pagina.',
    save: 'Salva le preferenze',
    close: 'Chiudi',
    alwaysOn: 'Sempre attivi',
    notActiveYet: 'Al momento non usiamo strumenti di questo tipo: la scelta vale per il futuro.',
    necessaryTitle: 'Tecnici necessari',
    necessaryBody:
      'Fanno funzionare il sito e ricordano le tue preferenze di lingua e tema, oltre alla scelta che stai facendo ora. Restano sul tuo dispositivo e non ti identificano: per questi non serve consenso.',
    categories: {
      maps: {
        title: 'Mappa di Google',
        body:
          'Permette di caricare la mappa di Google Maps nelle pagine “Home” e “Contatti”. Caricandola, Google riceve il tuo indirizzo IP e può installare cookie propri.',
      },
      analytics: {
        title: 'Statistiche',
        body:
          'Ci direbbero, in forma aggregata, quali pagine sono più utili, per migliorare il sito.',
      },
      marketing: {
        title: 'Marketing',
        body:
          'Servirebbero a misurare le nostre campagne e a mostrarti annunci più pertinenti su altri siti.',
      },
    },
  },
  legal: {
    ownerTitle: 'Titolare del trattamento',

    // ── Privacy ───────────────────────────────────────────────────────────
    privacyTitle: 'Privacy Policy',
    privacyLead: 'Come trattiamo i dati che ci affidi tramite questo sito.',
    privacyUpdated: 'Ultimo aggiornamento: settembre 2026',
    privacySections: [
      {
        title: 'Quali dati raccogliamo',
        body:
          'Trattiamo solo i dati che ci invii volontariamente tramite i moduli del sito. Dal modulo contatti: nome, indirizzo email, numero di telefono (facoltativo), motivo della richiesta e testo del messaggio. Dal modulo “Lavora con noi”: nome, email, telefono, ruolo di interesse (facoltativo), messaggio ed eventuale CV allegato (PDF o Word, fino a 5 MB). Il CV può contenere altri dati che scegli tu di inserirvi: ti chiediamo di non includere dati particolari ai sensi dell’art. 9 GDPR, come informazioni su salute, convinzioni religiose o appartenenza sindacale.',
      },
      {
        title: 'Dati raccolti automaticamente',
        body:
          'Il sito non usa strumenti di statistica, misurazione o profilazione: non tracciamo la tua navigazione. Quando invii un modulo, il server tiene temporaneamente in memoria il tuo indirizzo IP, per non più di un minuto, al solo scopo di limitare gli invii ripetuti e automatici. Non viene salvato su disco né conservato.',
      },
      {
        title: 'Perché trattiamo i dati e con quale base giuridica',
        body:
          'Per rispondere alle tue richieste di informazioni e fissare un appuntamento: esecuzione di misure precontrattuali adottate su tua richiesta (art. 6.1.b GDPR). Per valutare la tua candidatura: esecuzione di misure precontrattuali su tua richiesta (art. 6.1.b GDPR). Per proteggere il sito da invii automatici e abusi: nostro legittimo interesse alla sicurezza del servizio (art. 6.1.f GDPR).',
      },
      {
        title: 'Dove finiscono i dati',
        body:
          'I moduli non alimentano alcun archivio o database: il contenuto viene inviato come email alla casella del salone e conservato lì. Il servizio di posta è fornito da Google (Gmail). Il CV viaggia come allegato dell’email e non viene mai salvato sul server del sito.',
      },
      {
        title: 'A chi possono essere comunicati',
        body:
          'I dati sono trattati dalla titolare e dalle persone autorizzate del salone. Possono venirne a conoscenza, come fornitori tecnici, il gestore del servizio di posta elettronica (Google Ireland Limited) e il fornitore di hosting del sito. Non vendiamo, non cediamo e non diffondiamo i tuoi dati a terzi per finalità di marketing.',
      },
      {
        title: 'Trasferimenti fuori dall’Unione Europea',
        body:
          'Il fornitore del servizio di posta può trattare i dati anche su server situati fuori dall’Unione Europea. In tal caso il trasferimento avviene sulla base delle garanzie previste dal Capo V del GDPR (decisione di adeguatezza o clausole contrattuali standard) adottate dal fornitore stesso.',
      },
      {
        title: 'Per quanto tempo li conserviamo',
        body:
          'Conserviamo i messaggi ricevuti dal modulo contatti per 12 mesi dall’ultimo scambio, il tempo utile a dare seguito alla richiesta. Conserviamo le candidature e i CV per 12 mesi dalla ricezione, salvo che tu ci chieda prima di cancellarli. Trascorsi questi termini, i messaggi vengono eliminati dalla casella.',
      },
      {
        title: 'I tuoi diritti',
        body:
          'Puoi in ogni momento chiedere l’accesso ai tuoi dati, la loro rettifica o cancellazione, la limitazione del trattamento, opporti al trattamento fondato sul legittimo interesse e chiedere la portabilità dei dati (artt. 15-22 GDPR). Se un trattamento si fonda sul consenso, puoi revocarlo quando vuoi, senza che ciò pregiudichi la liceità di quanto trattato prima della revoca.',
      },
      {
        title: 'Come esercitare i tuoi diritti',
        body:
          'Scrivi a {email}, oppure all’indirizzo del salone indicato qui sopra: ti risponderemo senza ritardo e comunque entro un mese. Se ritieni che il trattamento dei tuoi dati violi la normativa, puoi proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).',
      },
      {
        title: 'Minori',
        body:
          'Il sito non è rivolto a minori di 14 anni e non raccogliamo consapevolmente i loro dati tramite i moduli. Se dovesse accadere, provvederemo a cancellarli non appena ne veniamo a conoscenza.',
      },
      {
        title: 'Modifiche a questa informativa',
        body:
          'Questa informativa può essere aggiornata per adeguarla a cambiamenti del sito o della normativa. La data in fondo alla pagina indica l’ultima revisione.',
      },
    ],

    // ── Cookie ────────────────────────────────────────────────────────────
    cookieTitle: 'Cookie Policy',
    cookieLead: 'Quali cookie e quali tecnologie simili usa questo sito.',
    cookieUpdated: 'Ultimo aggiornamento: settembre 2026',
    cookieTableTitle: 'Preferenze salvate nel tuo browser',
    cookieTable: {
      head: ['Nome', 'A cosa serve', 'Durata'],
      rows: [
        ['hct-lang', 'Ricorda la lingua che hai scelto (italiano, inglese, spagnolo).', 'Finché non svuoti i dati del sito dal browser'],
        ['hct-theme', 'Ricorda se preferisci il tema chiaro o quello scuro.', 'Finché non svuoti i dati del sito dal browser'],
        ['hct-consent', 'Registra la scelta che hai fatto nel banner (quali categorie hai attivato), con la data. Serve a non richiedertela a ogni pagina e a dimostrare il consenso.', 'Finché non svuoti i dati del sito dal browser'],
      ],
    },
    cookieSections: [
      {
        title: 'In breve',
        body:
          'Questo sito non installa cookie propri e oggi non usa alcuno strumento di statistica, pubblicità o profilazione. Salva nel tuo browser poche preferenze tecniche. L’unico servizio di terze parti attivo è la mappa di Google, che non parte da sola: serve il tuo consenso.',
      },
      {
        title: 'Come scegli',
        body:
          'Alla prima visita compare un banner con due pulsanti di pari evidenza, “Accetta tutti” e “Rifiuta tutti”, e un terzo per scegliere categoria per categoria. Finché non scegli, nulla di facoltativo viene attivato: scorrere la pagina o ignorare il banner non vale come consenso. Puoi cambiare idea o revocare tutto in qualsiasi momento dal link “Preferenze cookie”, in fondo a ogni pagina.',
      },
      {
        title: 'Le categorie',
        body:
          'Tecnici necessari: sempre attivi, fanno funzionare il sito e ricordano lingua, tema e la tua scelta sui cookie. Mappa di Google: carica la mappa nelle pagine “Home” e “Contatti”. Statistiche e Marketing: predisposte per il futuro — oggi non usiamo alcuno strumento di misurazione o pubblicitario, e finché non lo faremo la tua scelta su queste due categorie non attiva nulla. Se un giorno li introdurremo, aggiorneremo questa pagina e ti richiederemo il consenso.',
      },
      {
        title: 'Preferenze tecniche',
        body:
          'Per ricordare come preferisci vedere il sito usiamo l’archiviazione locale del browser (localStorage), non cookie. Sono dati tecnici che restano sul tuo dispositivo, non vengono inviati al nostro server e non permettono di identificarti.',
      },
      {
        title: 'Mappa di Google',
        body:
          'Nelle pagine “Home” e “Contatti” puoi vedere una mappa di Google Maps che mostra dove siamo. Non viene caricata all’apertura della pagina: al suo posto trovi un riquadro con un pulsante, e la mappa parte solo se lo premi. Da quel momento Google riceve il tuo indirizzo IP e può installare cookie propri sul tuo dispositivo, secondo la propria informativa (policies.google.com/privacy). Se non la carichi, nessun dato viene inviato a Google. Ricordiamo la tua scelta nel browser per non richiedertela a ogni pagina; puoi annullarla svuotando i dati del sito.',
      },
      {
        title: 'Cosa non troverai qui',
        body:
          'Non usiamo Google Analytics né altri strumenti di misurazione, non ci sono pixel pubblicitari e non ci sono pulsanti social che tracciano la navigazione: i collegamenti ai nostri profili e a WhatsApp sono semplici link, che agiscono solo se li clicchi. Anche i caratteri tipografici sono ospitati sul nostro server, quindi vederli non comporta alcuna chiamata a servizi esterni.',
      },
      {
        title: 'Come gestire le preferenze',
        body:
          'Puoi cancellare le preferenze salvate svuotando i dati del sito dal tuo browser, e bloccare o eliminare i cookie di terze parti dalle impostazioni del browser. Bloccando i cookie di Google la mappa potrebbe non essere visualizzata correttamente; il resto del sito continuerà a funzionare normalmente.',
      },
    ],

    // ── Note legali ───────────────────────────────────────────────────────
    noteTitle: 'Note legali',
    noteLead: 'Informazioni legali sul titolare e sul sito.',
    noteUpdated: 'Ultimo aggiornamento: settembre 2026',
    noteSections: [
      {
        title: 'Oggetto del sito',
        body:
          'Questo sito ha finalità informativa e di presentazione: descrive i servizi, i trattamenti e i prodotti del salone e permette di richiedere un appuntamento tramite WhatsApp, telefono o i moduli di contatto. Non è un negozio online: non vi si effettuano vendite né pagamenti.',
      },
      {
        title: 'Servizi, trattamenti e prenotazioni',
        body:
          'Le descrizioni dei servizi e dei trattamenti hanno valore indicativo. Ogni percorso viene definito in salone dopo una diagnosi personalizzata del capello: durata, modalità e risultato possono variare in base alle condizioni di partenza. Una richiesta inviata dal sito non è una prenotazione confermata finché non ricevi conferma dal salone.',
      },
      {
        title: 'Proprietà intellettuale',
        body:
          'Il logo, i testi, le fotografie e gli altri contenuti di questo sito appartengono a Hair Color Technology di Francesca Polizza, salvo dove diversamente indicato, e non possono essere riprodotti o riutilizzati senza autorizzazione scritta. I marchi citati (Goldwell, Kerasilk) e i relativi loghi appartengono ai rispettivi titolari e sono richiamati unicamente per indicare i prodotti professionali impiegati in salone.',
      },
      {
        title: 'Collegamenti a siti esterni',
        body:
          'Il sito contiene collegamenti a siti di terzi (siti dei marchi, social network, Google Maps). Il titolare non ha controllo su tali siti e non risponde dei loro contenuti né del trattamento dei dati che vi avviene.',
      },
      {
        title: 'Disponibilità e aggiornamento',
        body:
          'Il titolare si impegna a mantenere il sito aggiornato e funzionante, ma non garantisce l’assenza di interruzioni o di errori e si riserva di modificarne in qualsiasi momento contenuti e struttura.',
      },
      {
        title: 'Dati personali e cookie',
        body:
          'Il trattamento dei dati che ci affidi tramite i moduli di contatto e di candidatura, e l’uso dei cookie, sono descritti nelle pagine Privacy Policy e Cookie Policy di questo sito.',
      },
      {
        title: 'Legge applicabile',
        body:
          'Il sito e i rapporti che ne derivano sono regolati dalla legge italiana. Per le controversie con i consumatori è competente il foro del luogo di residenza o di domicilio eletto del consumatore, ai sensi del Codice del Consumo.',
      },
    ],
  },
  notFound: {
    title: 'Questa pagina si è scolorita.',
    lead: 'Non troviamo la pagina che cerchi. Torniamo al banco e ripartiamo dal colore giusto.',
    home: 'Torna alla home',
    contact: 'Contattaci',
  },
  claim:
    'Salone boutique a Paola specializzato in salute del capello, colorazione tecnica avanzata e trattamenti non invasivi.',
  tagline: 'La scienza del colore, l’arte di curare i tuoi capelli.',
  cityRegion: 'Paola, Calabria',
  closed: 'Chiuso',
  days: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
  categories: {
    'color-tech': { label: 'Color&Tech', blurb: 'Colorazione e schiaritura con la tecnologia Goldwell, nel rispetto della fibra.' },
    taglio: { label: 'Taglio & Trasformazione', blurb: 'Studio morfologico del viso e taglio sartoriale, fino al cambio look.' },
    styling: { label: 'Styling & Piega', blurb: 'Piega, finish e acconciature con i prodotti Goldwell StyleSign.' },
    cura: { label: 'Trattamenti Health & Care', blurb: 'Ricostruzione, disciplina e benessere della cute con Kerasilk e Dualsenses.' },
    trucco: { label: 'Trucco & Estetica', blurb: 'Make-up professionale e ritocchi di estetica di base.' },
  },
  /** Il menù del salone. Testi dal documento "Menù Servizi";
   *  ordine, categorie e id stanno in src/content/catalog.ts. */
  services: {
    'colore-radice': {
      name: 'Colore Radice',
      tagline: 'Colorazione Goldwell Topchic / Colorance / Elumen',
      short:
        'Copertura impeccabile dei capelli bianchi e ritocco della ricrescita, con la tecnologia di colorazione più adatta alla tua fibra.',
      long:
        'Copertura impeccabile dei capelli bianchi, ritocco della ricrescita. Scegliamo la tecnologia in base a ciò che il tuo capello può sostenere: Goldwell Topchic, colorazione permanente alcalina per la massima copertura e durata; Goldwell Colorance, semi-permanente acida per riflessi intensi e massima idratazione; Goldwell Elumen, permanente acida senza ammoniaca e senza ossidanti, con copertura totale dei capelli bianchi.',
      duration: '65 min',
      price: '35 €',
      tech:
        'I tempi di posa e trattamento possono variare in base alla ricettività della struttura del capello: fino a 15 minuti in più su capelli particolarmente refrattari.',
      note: 'Servizio di piega escluso.',
    },
    'colorazione-totale': {
      name: 'Colorazione Totale',
      tagline: 'Colorazione totale con sistema di rigenerazione',
      short:
        'Rinnovo del colore dalle radici alle punte per uniformare, naturalizzare o cambiare tonalità, rigenerando la struttura.',
      long:
        'Rinnovo totale del colore dalle radici alle punte per uniformare, naturalizzare o cambiare tonalità. Colorazione luminosa e rigenerazione della struttura, reintegrando le aree danneggiate della fibra. Usiamo Goldwell Topchic per la massima copertura e durata, Goldwell Colorance per riflessi intensi e idratazione, Goldwell Elumen quando serve una permanente acida senza ammoniaca né ossidanti.',
      duration: '65 min (corti/medi) · 80 min (lunghi)',
      price: '45 €',
      note: 'Servizio di piega escluso. Sui capelli lunghi il tempo varia in base alla quantità di capelli da saturare.',
    },
    schiaritura: {
      name: 'Schiaritura',
      tagline: 'Schiaritura a mano libera o con supporti',
      short:
        'Tecniche di schiaritura personalizzate per creare sfumature ed effetti di luce naturali.',
      long:
        'Tecniche di schiaritura personalizzate, a mano libera o con supporti, per creare sfumature ed effetti di luce naturali. Goldwell Topchic Special Lift schiarisce in un unico processo per biondi naturali ricchi di espressività, con tecnologia IntraLipid brevettata. Goldwell Silk Lift integra IntraLipid e SilkProteinComplex per proteggere il capello durante la schiaritura, con tecnologia Cool Protect per biondi freddi ancora più duraturi.',
      duration: 'In base al risultato desiderato',
      price: '75 €',
      tech:
        'Un capello sano richiede tempi di posa pieni per schiarire; un capello danneggiato richiede ossigeno più basso e un controllo visivo costante, che può dilatare i tempi di applicazione e monitoraggio.',
      note: 'Servizio di piega escluso.',
    },
    tonalizzazione: {
      name: 'Tonalizzazione Gloss',
      tagline: 'Tonalizzazione Goldwell Colorance / Elumen / @Purepigments',
      short:
        'Servizio rapido a pH acido per tonalizzare le schiariture, spegnere i riflessi caldi e ridare lucentezza.',
      long:
        'Servizio rapido a pH acido e senza ammoniaca per tonalizzare le schiariture, spegnere i riflessi caldi indesiderati o semplicemente rimpolpare riflesso e lucentezza fra un colore e l’altro, riparando la cuticola per un risultato senza compromessi.',
      duration: 'Posa al lavatesta 10-30 min',
      price: '10 €',
      note: 'Servizi di shampoo e piega esclusi.',
    },
    elumen: {
      name: 'Elumen',
      tagline: 'Elumen High Performance — colore diretto senza ammoniaca',
      short:
        'Il servizio iconico dell’innovazione Goldwell: ripara il capello mentre colora, con lucentezza e durata eccezionali.',
      long:
        'Il servizio iconico dell’innovazione Goldwell. Una colorazione ad alta tecnologia senza ossidazione né ammoniaca, che agisce per attrazione magnetica. Ripara il capello mentre colora, riempiendo le porosità dall’interno e donando colori vibranti — dai pastello ai toni più intensi — con una lucentezza straordinaria e una durata eccezionale.',
      duration: '45-60 min',
      price: '25 €',
      tech:
        'Elumen agisce sulla struttura con un processo magnetico, fisico e non chimico. Per favorire l’ancoraggio del pigmento è fondamentale preparare la struttura con lo shampoo specifico ed Elumen Prepare. Adatto alla colorazione in radice su cute sensibile e sulle lunghezze.',
      note: 'Servizio di piega escluso.',
    },
    'taglio-sartoriale': {
      name: 'Taglio Sartoriale',
      tagline: 'Taglio basic, incluso il rituale di detersione Goldwell Dualsenses',
      short:
        'Studio morfologico del viso e consulenza personalizzata, con lavaggio della linea professionale Dualsenses.',
      long:
        'Studio morfologico del viso e consulenza personalizzata per un taglio sartoriale. Il lavaggio include shampoo e conditioner della linea professionale Goldwell Dualsenses, scelti in base alle esigenze specifiche della tua cute e del tuo capello.',
      duration: '45 min',
      price: '20 €',
      note: 'Servizio di piega escluso.',
    },
    'taglio-cambio-look': {
      name: 'Taglio Cambio Look',
      tagline: 'Trasformazione radicale con consulenza approfondita',
      short:
        'Per chi desidera un cambio netto: dai capelli lunghissimi a un bob o a un pixie cut.',
      long:
        'Dedicato a chi desidera una trasformazione radicale, per esempio da lunghissimi a un bob o a un pixie cut. Richiede una consulenza approfondita, passaggi di taglio dedicati e una finitura millimetrica.',
      duration: '60 min',
      price: '30 €',
      note: 'Servizio di piega escluso.',
    },
    'piega-corti': {
      name: 'Piega Corti/Medi',
      tagline: 'Piega & finish Goldwell StyleSign',
      short:
        'Shampoo con massaggio rilassante, conditioner e piega con spazzola, phon o strumenti a caldo.',
      long:
        'Shampoo con massaggio cutaneo rilassante, trattamento conditioner e piega con spazzola e phon o con strumenti a caldo. Lo styling viene rifinito con i prodotti della linea Goldwell StyleSign, che proteggono il colore dal calore e dall’umidità.',
      duration: '30-45 min',
      price: '18 €',
    },
    'piega-lunghi': {
      name: 'Piega Lunghi/Extralong',
      tagline: 'Piega & finish Goldwell StyleSign',
      short:
        'Lavaggio e piega dedicati a capelli lunghi o molto folti, con prodotti texturizzanti specifici.',
      long:
        'Servizio di lavaggio e asciugatura dedicato a capelli lunghi o particolarmente folti, che richiedono lavorazioni accurate e l’uso di prodotti texturizzanti specifici.',
      duration: '45-60 min',
      price: '25 €',
    },
    acconciatura: {
      name: 'Acconciatura Raccolto/Semiraccolto',
      tagline: 'Raccolti, intrecci e chignon per occasioni speciali',
      short:
        'Acconciature eleganti realizzate con fissativi professionali ad alta tenuta ma flessibili.',
      long:
        'Raccolti eleganti, intrecci, chignon o semiraccolti per occasioni speciali, realizzati con il supporto dei fissativi professionali Goldwell, ad alta tenuta ma flessibili.',
      duration: '45-60 min',
      price: '25 €',
    },
    'ricostruzione-kerasilk': {
      name: 'Ricostruzione Rapida Kerasilk',
      tagline: 'Rituale di ricostruzione rapida Kerasilk',
      short:
        'Trattamento intensivo che restituisce elasticità, idratazione e lucentezza ai capelli opachi o stressati.',
      long:
        'Un trattamento intensivo e mirato per restituire immediata elasticità, idratazione e lucentezza ai capelli opachi o stressati da agenti esterni e servizi chimici.',
      steps: [
        'Rituale di detersione: lavaggio accurato con lo shampoo Kerasilk specifico per il tuo tipo di cute e capello.',
        'Nutrizione e posa: maschera o concentrato a base di seta biomimetica, con massaggio cutaneo e sullo stelo per favorire la penetrazione degli attivi. Posa di circa 10-15 minuti.',
        'Risciacquo e sigillatura: risciacquo profondo e conditioner spray senza risciacquo, per chiudere le cuticole e garantire la massima protezione termica.',
        'Asciugatura: piega e finish protettivo.',
      ],
      duration: '20 min',
      price: '12 €',
      tech:
        'Sui capelli molto porosi e danneggiati la fibra assorbe istantaneamente il nutrimento: la tenuta della piega finale può richiedere qualche minuto in più, per via dell’idratazione profonda temporaneamente trattenuta.',
      note: 'Servizio di piega escluso.',
    },
    'lisciante-kerasilk': {
      name: 'Trattamento Lisciante Kerasilk',
      tagline: 'Effetto a lungo termine, fino a 6 mesi',
      short:
        'Il massimo della tecnologia Kerasilk per trasformare i capelli crespi o ribelli in una chioma liscia e facile da gestire.',
      long:
        'Il massimo della tecnologia Kerasilk per trasformare i capelli indisciplinati, crespi o ribelli in una chioma meravigliosamente liscia, morbida e facile da gestire a casa, fino a 6 mesi.',
      steps: [
        'Preparazione: detersione profonda con lo shampoo Kerasilk specifico, per rimuovere ogni residuo e preparare la cuticola.',
        'Applicazione e posa: asciugatura parziale e applicazione meticolosa della miscela lisciante, calibrata sul tuo riccio o crespo. Posa di circa 15-20 minuti.',
        'Attivazione termica: asciugatura completa a phon e passaggio della piastra su ciocche sottilissime. È la fase cruciale, in cui il calore attiva e fissa i nuovi legami di cheratina.',
        'Fissaggio: risciacquo profondo senza shampoo e conditioner sigillante post-trattamento, per stabilizzare l’effetto.',
        'Asciugatura finale e finish con prodotti protettivi.',
      ],
      duration: '120-150 min (corti/medi) · 180-210 min (lunghi o molto folti)',
      price: '150 €',
      tech:
        'Sui capelli sani o grossi il passaggio della piastra richiede temperature piene per modificare la struttura. Sui capelli danneggiati o fortemente sensibilizzati, temperatura e numero di passaggi vanno ridotti e monitorati costantemente per preservare l’integrità dello stelo: la lavorazione è più lenta e cauta.',
      note: 'Tempi comprensivi di asciugatura.',
    },
    'disciplinante-medium': {
      name: 'Trattamento Disciplinante Medium',
      tagline: 'Kerasilk Medium — effetto a medio termine, fino a 6 settimane',
      short:
        'La stessa tecnologia Kerasilk con un effetto più breve, per capelli disciplinati e facili da gestire fino a 6 settimane.',
      long:
        'Il massimo della tecnologia Kerasilk per trasformare i capelli indisciplinati, crespi o ribelli in una chioma meravigliosamente disciplinata e di facile gestione a casa, fino a 6 settimane.',
      steps: [
        'Preparazione: detersione profonda con lo shampoo Kerasilk specifico, per rimuovere ogni residuo e preparare la cuticola.',
        'Applicazione e posa: asciugatura parziale e applicazione meticolosa della miscela lisciante, calibrata sul tuo riccio o crespo. Posa di circa 15-20 minuti.',
        'Attivazione termica: asciugatura completa a phon e passaggio della piastra su ciocche sottilissime, per attivare e fissare i nuovi legami di cheratina.',
        'Fissaggio: risciacquo profondo senza shampoo e conditioner sigillante post-trattamento.',
        'Asciugatura finale e finish con prodotti protettivi.',
      ],
      duration: '120-150 min (corti/medi) · 180-210 min (lunghi o molto folti)',
      price: '',
      note: 'Tempi comprensivi di asciugatura.',
    },
    'scalp-specialist': {
      name: 'Rituale Scalp Specialist',
      tagline: 'Rituale benessere cute Goldwell Dualsenses Scalp Specialist',
      short:
        'Trattamento mirato con massaggio linfodrenante per riequilibrare sebo, forfora, sensibilità o caduta.',
      long:
        'Trattamento mirato, abbinato a un massaggio linfodrenante, per riequilibrare le anomalie della cute — sebo, forfora, sensibilità o caduta — utilizzando la linea specifica Goldwell Dualsenses Scalp Specialist.',
      duration: '15 min',
      price: '6-10 €',
      note: 'Servizio di piega escluso.',
    },
    'trucco-giorno-sera': {
      name: 'Trucco Giorno/Sera',
      tagline: 'Make-up professionale personalizzato',
      short:
        'Trucco studiato per valorizzare i tuoi lineamenti, adatto a un evento diurno o a una serata speciale.',
      long:
        'Make-up professionale personalizzato per valorizzare i lineamenti, adatto a un evento diurno o a una serata speciale.',
      duration: '30 min',
      price: '18 €',
    },
    'trucco-sposa': {
      name: 'Trucco Sposa',
      tagline: 'Servizio esclusivo, prova inclusa',
      short:
        'Studio della pelle, prova in salone e trucco nel giorno del matrimonio.',
      long:
        'Servizio esclusivo per la sposa, comprensivo di studio della pelle, prova in salone e trucco nel giorno del matrimonio.',
      duration: 'circa 60 min a sessione',
      price: '100 €',
    },
    'estetica-base': {
      name: 'Estetica Base',
      tagline: 'Sopracciglia e baffetto',
      short:
        'Definizione dell’arcata sopracciliare ed epilazione o pulizia del labbro superiore.',
      long:
        'Definizione dell’arcata sopracciliare ed epilazione del labbro superiore o pulizia.',
      duration: '10-15 min',
      price: 'da 8 a 15 €',
    },
  } as Record<ServiceId, ServiceCopy>,
  products: {
    'dualsenses-color': {
      name: 'Shampoo & Balsamo Colore',
      need: 'Protezione del colore',
      description:
        'La cura quotidiana per mantenere il colore brillante più a lungo. Deterge in delicatezza e protegge il riflesso tra un appuntamento e l’altro.',
      long:
        'La cura quotidiana per mantenere il colore brillante più a lungo. Deterge in delicatezza senza aggredire la fibra e protegge il riflesso fra un appuntamento e l’altro, così il lavoro fatto in salone dura di più. È il primo prodotto che consigliamo dopo una colorazione.',
      usage:
        'Shampoo sui capelli bagnati, massaggiando la cute; risciacqua e applica il balsamo sulle lunghezze, evitando le radici. Lascia agire un minuto e risciacqua bene.',
      tipo: 'Shampoo e balsamo',
      quando: 'A ogni lavaggio',
    },
    'kerasilk-reconstruct': {
      name: 'Maschera Ricostruttiva',
      need: 'Capelli danneggiati',
      description:
        'Ristruttura in profondità i capelli indeboliti da schiariture o stress termico, restituendo elasticità, corpo e una superficie liscia al tatto.',
      long:
        'Ristruttura in profondità i capelli indeboliti da schiariture, stiraggi o stress termico. Restituisce elasticità e corpo alla fibra e lascia una superficie liscia al tatto, che riflette meglio la luce. È il prosieguo a casa del rituale di ricostruzione che facciamo in salone.',
      usage:
        'Su capelli lavati e tamponati, distribuisci sulle lunghezze e sulle punte. Lascia in posa 5-10 minuti e risciacqua.',
      tipo: 'Maschera ristrutturante',
      quando: 'Una o due volte a settimana',
    },
    'kerasilk-control': {
      name: 'Trattamento Anti-Crespo',
      need: 'Crespo & disciplina',
      description:
        'Discipline e leggerezza per capelli ribelli o voluminosi: controlla il crespo e rende la piega semplice, anche con l’umidità.',
      long:
        'Disciplina e leggerezza per capelli ribelli, voluminosi o crespi. Controlla il crespo anche con l’umidità e rende la piega più semplice e veloce da rifare a casa, senza appesantire.',
      usage:
        'Su capelli umidi, prima dell’asciugatura, distribuisci sulle lunghezze. Procedi con phon o piastra.',
      tipo: 'Trattamento anti-crespo',
      quando: 'A ogni piega',
    },
    scalp: {
      name: 'Rituale Cuoio Capelluto',
      need: 'Cute in equilibrio',
      description:
        'Detersione delicata e riequilibrio per una cute sana: la base da cui nasce ogni capello luminoso.',
      long:
        'Detersione delicata e riequilibrio della cute, che è la base da cui nasce ogni capello luminoso. Studiato per le cuti che tendono al sebo, alla forfora o alla sensibilità, accompagna a casa il rituale Scalp Specialist del salone.',
      usage:
        'Massaggia sulla cute bagnata con i polpastrelli, lascia agire qualche istante e risciacqua.',
      tipo: 'Trattamento per la cute',
      quando: 'Secondo il consiglio in salone',
    },
    stylesign: {
      name: 'Styling & Finish',
      need: 'Tenuta & finish',
      description:
        'Texture, volume e tenuta per ricreare a casa il finish del salone, senza appesantire il capello.',
      long:
        'Texture, volume e tenuta per ricreare a casa il finish del salone. Una gamma che va dal fissaggio leggero a quello forte, sempre con l’obiettivo di non appesantire il capello né spegnere il colore.',
      usage:
        'Il gesto cambia da prodotto a prodotto: in salone ti indichiamo la texture giusta per la tua piega e la quantità da usare.',
      tipo: 'Prodotti di styling',
      quando: 'Al bisogno, in fase di finish',
    },
    'heat-protect': {
      name: 'Protezione Termica',
      need: 'Prima del calore',
      description:
        'Uno scudo leggero prima di phon e piastra: riduce lo stress termico e mantiene la fibra morbida e protetta.',
      long:
        'Uno scudo leggero da mettere prima di phon e piastra. Riduce lo stress termico sulla fibra e la mantiene morbida: è il gesto che più protegge il colore fra un servizio e l’altro, ed è anche il più spesso dimenticato.',
      usage:
        'Vaporizza sui capelli umidi o asciutti, in modo uniforme sulle lunghezze, prima di ogni fonte di calore.',
      tipo: 'Spray termoprotettivo',
      quando: 'Prima di ogni asciugatura o piastra',
    },
  } as Record<ProductId, ProductCopy>,
  faq: [
    { q: 'Come posso passare da un colore scuro a un biondo senza danneggiare i capelli?', a: 'Lo schiarimento graduale è la chiave. Utilizziamo decoloranti di ultima generazione arricchiti con sistemi di protezione dei ponti capillari. Spesso consigliamo un percorso a tappe per raggiungere il biondo desiderato preservando l’elasticità e la lucentezza del capello.' },
    { q: 'Come funziona l’analisi dell’armocromia applicata ai capelli?', a: 'Durante la consulenza valutiamo il sottotono della tua pelle, il colore degli occhi e le tue caratteristiche naturali per individuare la palette ideale (toni caldi o freddi) che valorizzi il tuo viso e illumini l’incarnato.' },
    { q: 'Cosa significa che il salone è Partner Goldwell?', a: 'Essere Partner Goldwell garantisce l’uso esclusivo di colorazioni e trattamenti di fascia alta formulati con tecnologie brevettate. Significa anche che il nostro team partecipa costantemente a corsi di aggiornamento internazionali su tecniche e tendenze colore.' },
    { q: 'Cos’è la colorazione Goldwell Elumen e perché è diversa dalle altre tinte?', a: 'Goldwell Elumen è una colorazione ad alta prestazione senza ammoniaca e senza ossidanti. Funziona per attrazione fisica/magnetica: i pigmenti penetrano in profondità riparando le porosità. Il risultato è un colore ultra-brillante, intenso e di lunghissima durata.' },
    { q: 'Le vostre tinte coprono i capelli bianchi al 100%?', a: 'Sì. Utilizziamo le linee di colorazione permanente Goldwell (come Topchic) che garantiscono una copertura totale e uniforme dei capelli bianchi, mantenendo un riflesso naturale e una lucentezza straordinaria senza appiattire il tono.' },
    { q: 'Usate colorazioni senza ammoniaca per pelli sensibili o allergiche?', a: 'Assolutamente. Disponiamo di linee delicate e colorazioni demi-permanenti (come Goldwell Colorance) prive di ammoniaca, ideali per pelli sensibili, per chi desidera tonalizzare senza schiarire o per chi si approccia al colore per la prima volta.' },
    { q: 'Ho i capelli molto sfibrati: posso fare comunque il colore?', a: 'Prima di applicare qualsiasi pigmento, effettuiamo un’analisi diagnostica della fibra capillare. Se il capello è troppo sensibilizzato, proponiamo un percorso di ricostruzione intensiva prima di procedere con la colorazione in totale sicurezza.' },
    { q: 'Cos’è la tonalizzazione (Gloss) e ogni quanto va fatta?', a: 'Il tonalizzante è un trattamento riflessante e lucidante che rinfresca le schiariture, corregge i riflessi indesiderati (come il giallo o l’arancio) e dona estrema morbidezza. È perfetto da fare tra una schiaritura e l’altra, ogni 4-6 settimane.' },
    { q: 'Come funziona il trattamento alla cheratina o disciplinante in salone?', a: 'Utilizziamo trattamenti disciplinanti (come Goldwell Kerasilk) che trasformano i capelli crespi e indisciplinati in chiome setose e facili da gestire a casa, con un effetto che dura diversi mesi senza alterare il colore.' },
    { q: 'Posso fare il colore se ho fatto da poco la stiratura o la permanente?', a: 'Sì, ma è fondamentale rispettare la tempistica corretta e utilizzare formule delicate. Valuteremo lo stato del capello in consulenza per stabilire l’intervallo ideale ed evitare di sovraccaricare la struttura.' },
    { q: 'Come evitare che il biondo viri verso il giallo o il verde in estate?', a: 'Utilizziamo tonalizzanti ad alta precisione con pigmenti neutralizzanti e applichiamo sigillanti cuticolari. Inoltre, forniamo protocolli di protezione specifici contro cloro, salsedine e raggi UV.' },
    { q: 'Il taglio viene strutturato in base al colore o viceversa?', a: 'Nel nostro salone taglio e colore si progettano sempre insieme. Un buon taglio valorizza i punti di luce del balayage, così come una schiaritura ben posizionata dona tridimensionalità e movimento al capello. Durante la consulenza personalizziamo la combinazione di forma e colore per valorizzare al massimo i tratti del tuo viso.' },
    { q: 'Come si svolge la prima consulenza colore nel vostro salone?', a: 'Dedichiamo i primi minuti dell’appuntamento all’ascolto delle tue esigenze, all’analisi visiva e tattile del capello e alla valutazione del tuo look desiderato. Ti mostreremo le opzioni realizzabili, con trasparenza su tempi e costi.' },
    { q: 'Quali prodotti devo usare a casa per non far sbiadire il colore?', a: 'Consigliamo sempre shampoo senza solfati aggressivi, maschere idratanti con pigmenti riflessanti e termoprotettori prima dell’uso di phon e piastra. La linea Care Goldwell permette di prolungare la brillantezza fatta in salone.' },
    { q: 'Come posso prenotare un appuntamento o richiedere un preventivo?', a: 'Puoi prenotare chiamando o inviando un messaggio WhatsApp. Per i cambi look radicali, ti invitiamo a passare in salone per una breve consulenza conoscitiva.' },
  ],
}
