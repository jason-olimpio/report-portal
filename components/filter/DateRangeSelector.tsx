import {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import CalendarPicker, {DateParsable} from 'react-native-calendar-picker';
import {useTranslation} from 'react-i18next';

import {useTheme} from '@hooks';
import {appColors} from '@config';
import {getLocalizedCalendarLabels} from '@utils';

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
  const {isDark} = useTheme();
  const {t} = useTranslation();

  const [tempDateRange, setTempDateRange] = useState(dateRange);

  const screenWidth = Dimensions.get('window').width;
  const calendarWidth = Math.min(screenWidth - 50, 350);
  const calendarHeight = Math.min(calendarWidth, 350);

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

  const {weekdays, months} = getLocalizedCalendarLabels(t);

  return (
    <ScrollView>
      <Text className="text-lg font-titillium-semibold mb-6 dark:text-white text-center px-4">
        {t('selectDateRange')}
      </Text>

      <View className="max-h-96 w-full px-5">
        <CalendarPicker
          allowRangeSelection={true}
          minDate={new Date(2020, 1, 1)}
          maxDate={new Date()}
          todayBackgroundColor={
            isDark ? appColors.primary.light : appColors.primary.dark
          }
          selectedDayColor={
            isDark ? appColors.primary.light : appColors.primary.dark
          }
          selectedDayTextColor="#FFFFFF"
          textStyle={{
            color: isDark
              ? appColors.text.primary.dark
              : appColors.text.primary.light,
          }}
          dayShape="circle"
          monthTitleStyle={{
            color: isDark
              ? appColors.text.primary.dark
              : appColors.text.primary.light,
          }}
          yearTitleStyle={{
            color: isDark
              ? appColors.text.primary.dark
              : appColors.text.primary.light,
          }}
          previousTitleStyle={{
            color: isDark ? appColors.primary.light : appColors.primary.dark,
          }}
          nextTitleStyle={{
            color: isDark ? appColors.primary.light : appColors.primary.dark,
          }}
          weekdays={weekdays}
          months={months}
          previousTitle={t('previous')}
          nextTitle={t('next')}
          onDateChange={handleDateChange}
          selectedStartDate={tempDateRange.start as DateParsable}
          selectedEndDate={tempDateRange.end as DateParsable}
          width={calendarWidth}
          height={calendarHeight}
        />
      </View>

      <View className="flex-row justify-between items-center mt-6 px-4">
        <TouchableOpacity onPress={toggleDatePicker} className="flex-1">
          <Text className="text-center text-medium text-red-500">
            {t('cancel')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={confirmDateRange} className="flex-1">
          <Text className="text-center text-medium text-primary-dark dark:text-primary-light">
            {t('confirm')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DateRangeSelector;
