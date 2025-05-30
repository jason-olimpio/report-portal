import {enUS, it, es, fr, de, type Locale} from 'date-fns/locale';

export const dateFnsLocales: {[key: string]: Locale} = {
  en: enUS,
  it: it,
  es: es,
  fr: fr,
  de: de,
};

export const getLocaleForDateFns = (language: string | undefined): Locale => {
  if (!language) {
    return enUS;
  }

  if (!dateFnsLocales[language]) {
    return enUS;
  }

  return dateFnsLocales[language];
};
