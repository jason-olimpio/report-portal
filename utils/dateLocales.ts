import {enUS, it, es, fr, de, type Locale} from 'date-fns/locale';

export const dateFnsLocales: {[key: string]: Locale} = {
  en: enUS,
  'en-US': enUS,
  it: it,
  es: es,
  fr: fr,
  de: de,
};

export const getLocaleForDateFns = (language: string | undefined): Locale => {
  if (!language) {
    return enUS;
  }

  if (dateFnsLocales[language]) {
    return dateFnsLocales[language];
  }

  const primaryLanguage = language.split('-')[0];

  if (dateFnsLocales[primaryLanguage]) {
    return dateFnsLocales[primaryLanguage];
  }

  return enUS;
};
