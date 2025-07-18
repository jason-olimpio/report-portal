import type {Notification} from '@types'

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Benvenuto!',
    description: 'Grazie per aver installato l’app.',
    date: new Date(),
    read: false,
  },
  {
    id: '2',
    title: 'Nuovo report disponibile',
    description: 'Un nuovo report è stato pubblicato.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 ore fa
    read: false,
  },
  {
    id: '3',
    title: 'Aggiornamento sistema',
    description: 'Il sistema sarà in manutenzione domani dalle 22:00.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 giorno fa
    read: true,
  },
  {
    id: '4',
    title: 'Nuova funzionalità',
    description: 'È ora possibile filtrare i report per data.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 ore fa
    read: true,
  },
  {
    id: '5',
    title: 'Promemoria',
    description: 'Non dimenticare di aggiornare il tuo profilo.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 giorni fa
    read: true,
  },
  {
    id: '6',
    title: 'Promemoria raccolta',
    description: 'Ricordati che domani è prevista la raccolta della plastica.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 ore fa
    read: false,
  },
  {
    id: '7',
    title: 'Messaggio importante',
    description:
      'Si prega di aggiornare l’app per continuare a ricevere notifiche.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 giorni fa
    read: false,
  },
  {
    id: '8',
    title: 'Evento in arrivo',
    description:
      'Partecipa al webinar sulla sostenibilità ambientale il 10 luglio.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 giorni fa
    read: true,
  },
  {
    id: '9',
    title: 'Aggiornamento privacy',
    description:
      'Abbiamo aggiornato la nostra informativa sulla privacy. Leggi le novità.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 giorni fa
    read: true,
  },
  {
    id: '10',
    title: 'Nuovo badge ottenuto',
    description:
      'Complimenti! Hai ottenuto il badge “Cittadino virtuoso” per la tua attività.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 ore fa
    read: false,
  },
  {
    id: '11',
    title: 'Servizio sospeso',
    description:
      'Il servizio di raccolta carta sarà sospeso il 5 luglio per festività.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 giorni fa
    read: false,
  },
  {
    id: '12',
    title: 'Nuova area ecologica',
    description: 'È stata aperta una nuova area ecologica in Via Roma 12.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 30), // 1 giorno e 6 ore fa
    read: false,
  },
  {
    id: '13',
    title: 'Raccolta straordinaria',
    description:
      'Raccolta straordinaria di rifiuti ingombranti sabato prossimo.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 200), // 8 giorni fa
    read: true,
  },
  {
    id: '14',
    title: 'Avviso importante',
    description:
      'Attenzione: possibili ritardi nella raccolta a causa di lavori stradali.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 15), // 15 ore fa
    read: false,
  },
  {
    id: '15',
    title: 'Suggerimento',
    description: 'Consulta la sezione FAQ per risolvere i dubbi più comuni.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 60), // 2 giorni e 12 ore fa
    read: true,
  },
]

export default notifications
