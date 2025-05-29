import {appColors} from '@config';
import {Text, TouchableOpacity, View} from 'react-native';
import CalendarPicker, {DateParsable} from 'react-native-calendar-picker';

type CalendarPickerSectionProps = {
  tempDateRange: {start: Date | null; end: Date | null};
  handleDateChange: (date: Date, type: 'START_DATE' | 'END_DATE') => void;
  confirmDateRange: () => void;
  setShowDatePicker: (show: boolean) => void;
};

const ITALIAN_WEEKS = [
  'Lun',
  'Mar',
  'Mer',
  'Gio',
  'Ven',
  'Sab',
  'Dom',
];

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

const CalendarPickerSection: React.FC<CalendarPickerSectionProps> = ({
  tempDateRange,
  handleDateChange,
  confirmDateRange,
  setShowDatePicker,
}) => {
  return (
    <>
      <Text className="text-lg font-medium mb-6">
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
        <TouchableOpacity onPress={() => setShowDatePicker(false)}>
          <Text className="ml-4 text-medium text-red-500">Annulla</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={confirmDateRange}>
          <Text className="mr-4 text-medium text-primary">Conferma</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CalendarPickerSection;
