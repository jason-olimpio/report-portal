import {TFunction} from 'i18next'

import {StatusOption} from '@types'

const TRANSLATION_KEYS: Record<StatusOption, string> = {
  [StatusOption.All]: 'status.all',
  [StatusOption.Pending]: 'status.pending',
  [StatusOption.Working]: 'status.working',
  [StatusOption.Completed]: 'status.completed',
}

const getStatusLabel = (
  status: StatusOption,
  t: TFunction,
): string | undefined => {
  const key = TRANSLATION_KEYS[status]

  return t(key)
}

export default getStatusLabel
