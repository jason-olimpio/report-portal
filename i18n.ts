/**
 * i18n.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Sets up i18next with translations, configures fallback
 * language, namespaces, and interpolation settings.
 */

import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import {en, it} from '@translations'

const resources = {
  en: {
    translation: en,
  },
  it: {
    translation: it,
  },
} as const

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  ns: ['translation'],
  defaultNS: 'translation',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
})
