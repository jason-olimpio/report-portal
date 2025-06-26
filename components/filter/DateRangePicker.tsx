import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CalendarPicker, {DateParsable} from 'react-native-calendar-picker';

import {appColors} from '@config';

type DateRangePickerProps = {
  dateRange: {start: Date | null; end: Date | null};
  setDateRange: (range: {start: Date | null; end: Date | null}) => void;
  toggleDatePicker: () => void;
};

const ITALIAN_WEEKS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

const ITALIAN_MONTHS = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];

const DateRangePicker = ({
  dateRange,
  setDateRange,
  toggleDatePicker,
}: DateRangePickerProps) => {
  const [tempDateRange, setTempDateRange] = useState(dateRange);

  const handleDateChange = (date: Date, type: 'START_DATE' | 'END_DATE') => {
    setTempDateRange(previousState => ({
      ...previousState,
      start: type === 'START_DATE' ? date : previousState.start,
      end: type === 'START_DATE' ? null : date,
    }));
  };

  const confirmDateRange = () => {
    setDateRange(tempDateRange);
    toggleDatePicker();
  };

  return (
    <>
      <Text className="text-lg font-titillium-semibold mb-6">
        Seleziona intervallo date
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
          weekdays={ITALIAN_WEEKS}
          months={ITALIAN_MONTHS}
          previousTitle="Precedente"
          nextTitle="Prossimo"
          selectedStartDate={tempDateRange.start as DateParsable}
          selectedEndDate={tempDateRange.end as DateParsable}
          width={350}
          height={350}
        />
      </View>

      <View className="flex-row justify-between mt-6">
        <TouchableOpacity onPress={toggleDatePicker}>
          <Text className="ml-4 text-medium text-red-500">Annulla</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={confirmDateRange}>
          <Text className="mr-4 text-medium text-primary">Conferma</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DateRangePicker;
