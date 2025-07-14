import {useState, useMemo} from 'react';
import {LocaleConfig} from 'react-native-calendars';
import {TFunction} from 'i18next';

import {reportData} from '@store';
import {ReportsByDate} from '@types';
import {
  getReportsByDate,
  getMarkedDatesWithSelection,
  getLocalizedCalendarLabels,
} from '@utils';

export const useCalendar = (t: TFunction, isDark: boolean) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const reportsByDate: ReportsByDate = getReportsByDate(reportData);

  const markedDates = useMemo(
    () => getMarkedDatesWithSelection(reportsByDate, isDark, selectedDate),
    [reportsByDate, isDark, selectedDate],
  );

  const configureCalendarLocale = (t: TFunction) => {
    const {months, weekdays} = getLocalizedCalendarLabels(t);

    LocaleConfig.locales['custom'] = {
      monthNames: months,
      monthNamesShort: months.map(month => month.slice(0, 3)),
      dayNames: weekdays,
      dayNamesShort: weekdays.map(day => day.slice(0, 3)),
      today: t('calendar.today'),
    };

    LocaleConfig.defaultLocale = 'custom';
  };

  const handleDayPress = (day: {dateString: string}) =>
    setSelectedDate(day.dateString);

  const selectedReports = selectedDate
    ? reportsByDate[selectedDate] || null
    : null;

  return {
    selectedDate,
    selectedReports,
    markedDates,
    handleDayPress,
    configureCalendarLocale,
  };
};

export default useCalendar;
