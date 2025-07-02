import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CalendarPicker, {DateParsable} from 'react-native-calendar-picker';
import {useTranslation} from 'react-i18next';

import {appColors} from '@config';

type DateRangeSelectorProps = {
  dateRange: {start: Date | null; end: Date | null};
  setDateRange: (range: {start: Date | null; end: Date | null}) => void;
  toggleDatePicker: () => void;
};

const DateRangeSelector = ({
  dateRange,
  setDateRange,
  toggleDatePicker,
}: DateRangeSelectorProps) => {
  const {t} = useTranslation();

  const [tempDateRange, setTempDateRange] = useState(dateRange);

  const handleDateChange = (date: Date, type: 'START_DATE' | 'END_DATE') =>
    setTempDateRange(previousRange => ({
      ...previousRange,
      start: type === 'START_DATE' ? date : previousRange.start,
      end: type === 'START_DATE' ? null : date,
    }));

  const confirmDateRange = () => {
    setDateRange(tempDateRange);
    toggleDatePicker();
  };

  const weekdays = [
    t('weekdays.monday'),
    t('weekdays.tuesday'),
    t('weekdays.wednesday'),
    t('weekdays.thursday'),
    t('weekdays.friday'),
    t('weekdays.saturday'),
    t('weekdays.sunday'),
  ];

  const months = [
    t('months.january'),
    t('months.february'),
    t('months.march'),
    t('months.april'),
    t('months.may'),
    t('months.june'),
    t('months.july'),
    t('months.august'),
    t('months.september'),
    t('months.october'),
    t('months.november'),
    t('months.december'),
  ];

  return (
    <>
      <Text className="text-lg font-titillium-semibold mb-6">
        {t('selectDateRange')}
      </Text>

      <View className="max-h-96 w-full">
        <CalendarPicker
          allowRangeSelection={true}
          minDate={new Date(2020, 1, 1)}
          maxDate={new Date()}
          todayBackgroundColor={appColors.primary}
          selectedDayColor={appColors.primary}
          selectedDayTextColor="#FFFFFF"
          onDateChange={handleDateChange}
          weekdays={weekdays}
          months={months}
          previousTitle={t('previous')}
          nextTitle={t('next')}
          selectedStartDate={tempDateRange.start as DateParsable}
          selectedEndDate={tempDateRange.end as DateParsable}
          width={350}
          height={350}
        />
      </View>

      <View className="flex-row justify-between mt-6">
        <TouchableOpacity onPress={toggleDatePicker}>
          <Text className="ml-4 text-medium text-red-500">{t('cancel')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={confirmDateRange}>
          <Text className="mr-4 text-medium text-primary">{t('confirm')}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DateRangeSelector;
