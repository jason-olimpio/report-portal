/**
 * getTimeAgo.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Utility function for getting time ago formatted strings.
 */

import {formatDistanceToNow} from 'date-fns'
import {TFunction} from 'i18next'

import {getLocaleForDateFns} from '@utils'

const getTimeAgo = (
  reportDate: Date,
  language: string = 'en',
  t: TFunction,
): string => {
  if (isNaN(reportDate.getTime())) return t('errors.invalidDate')

  const locale = getLocaleForDateFns(language)

  return formatDistanceToNow(reportDate, {
    addSuffix: true,
    locale,
  })
}

export default getTimeAgo
