import {TFunction} from 'i18next'

const MONTH_KEYS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

const getMonthLabel = (number: number, t: TFunction) => {
  const key = MONTH_KEYS[number - 1]

  return t(`months.${key}`)
}

export default getMonthLabel
