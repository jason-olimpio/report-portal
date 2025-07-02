import { formatDistanceToNow } from 'date-fns';
import { getLocaleForDateFns } from './getLocaleForDateFns';

const getTimeAgo = (
  reportDate: Date,
  language: string = 'en',
  fallbackText: string
): string => {
  if (isNaN(reportDate.getTime())) {
    return fallbackText;
  }

  const locale = getLocaleForDateFns(language);

  return formatDistanceToNow(reportDate, {
    addSuffix: true,
    locale,
  });
};

export default getTimeAgo;
