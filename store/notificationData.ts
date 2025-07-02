import {Notification} from '@types';

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
        title: 'Messaggio importante',
        description: 'Leggi le nuove linee guida della community.',
        date: new Date(Date.now() - 1000 * 60 * 15), // 15 minuti fa
        read: true,
    },
];

export default notifications;
