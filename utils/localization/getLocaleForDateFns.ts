/**
 * getLocaleForDateFns.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Utility function for getting date-fns locale objects.
 */

import {enUS, it, es, fr, de, type Locale} from 'date-fns/locale'

type SupportedDateFnsLocale = 'en' | 'it' | 'es' | 'fr' | 'de'

const dateFnsLocales: Record<SupportedDateFnsLocale, Locale> = {
  en: enUS,
  it: it,
  es: es,
  fr: fr,
  de: de,
}

const getLocaleForDateFns = (language: string | undefined): Locale => {
  if (!language) return enUS

  return dateFnsLocales[language as SupportedDateFnsLocale] || enUS
}

export default getLocaleForDateFns
