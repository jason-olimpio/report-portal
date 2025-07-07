import {TFunction} from 'i18next';

import {StatusOption} from '@types';

const translationKeys: Record<StatusOption, string> = {
  [StatusOption.All]: 'status.all',
  [StatusOption.Pending]: 'status.pending',
  [StatusOption.Working]: 'status.working',
  [StatusOption.Completed]: 'status.completed',
};

const getStatusLabel = (status: StatusOption, t: TFunction): string | undefined => {
  const key = translationKeys[status];

  return t(key);
};

export default getStatusLabel;
