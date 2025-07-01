import {TFunction} from 'i18next';

import {PriorityOption} from '@types';

const translationKeys: Record<PriorityOption, string> = {
  [PriorityOption.Low]: 'priority.low',
  [PriorityOption.Medium]: 'priority.medium',
  [PriorityOption.High]: 'priority.high',
};

const getPriorityLabel = (priority: PriorityOption, t: TFunction): string => {
  const key = translationKeys[priority];

  return t(key);
};

export default getPriorityLabel;
