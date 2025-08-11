/**
 * getPriorityLabel.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Utility function for getting localized priority labels.
 */

import {TFunction} from 'i18next'

import {PriorityOption} from '@types'

const TRANSLATION_KEYS: Record<PriorityOption, string> = {
  [PriorityOption.All]: 'priority.all',
  [PriorityOption.Low]: 'priority.low',
  [PriorityOption.Medium]: 'priority.medium',
  [PriorityOption.High]: 'priority.high',
}

const getPriorityLabel = (
  priority: PriorityOption,
  t: TFunction,
): string | undefined => {
  const key = TRANSLATION_KEYS[priority]

  return t(key)
}

export default getPriorityLabel
