import {useMemo} from 'react';
import {i18nLocale, AppString} from '@localization';

export const useLocalization = () => {
  return useMemo(() => {
    const localizedStrings: Record<string, string> = {} as Record<
      AppStringKey,
      string
    >;

    (Object.keys(AppString) as AppStringKey[]).forEach(key => {
      localizedStrings[key] = i18nLocale.t(AppString[key]);
    });

    return localizedStrings;
  }, []);
};
