import {StatusOption} from '@types';
import {TFunction} from 'i18next';

const statusTranslationKeys: Record<StatusOption, string> = {
  [StatusOption.All]: 'status.all',
  [StatusOption.Pending]: 'status.pending',
  [StatusOption.Working]: 'status.working',
  [StatusOption.Completed]: 'status.completed',
};

const getStatusLabel = (status: StatusOption, t: TFunction): string => {
  const key = statusTranslationKeys[status];

  if (typeof key === 'string') {
    return t(key);
  }

  return status.toString();
};

export default getStatusLabel;
