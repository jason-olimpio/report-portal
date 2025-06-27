import {Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {getStatusLabel} from '@utils';

import {StatusOption} from '@types';

type ReportFilterOptionsProps = {
  selectedStatus: StatusOption;
  setSelectedStatus: (status: StatusOption) => void;
  dateRange: {start: Date | null; end: Date | null};
  setDateRange: (range: {start: Date | null; end: Date | null}) => void;
  toggleModal: (visible: boolean) => void;
  toggleDatePicker: () => void;
};

const STATUS_OPTIONS: StatusOption[] = [
  StatusOption.All,
  StatusOption.Pending,
  StatusOption.Working,
  StatusOption.Completed,
];

const ReportFilterOptions = ({
  selectedStatus,
  setSelectedStatus,
  dateRange,
  setDateRange,
  toggleModal,
  toggleDatePicker,
}: ReportFilterOptionsProps) => {
  const {t} = useTranslation();

  const hasSelectedDate = dateRange.start !== null && dateRange.end !== null;

  const toggleStatus = (status: StatusOption) => setSelectedStatus(status);

  const getDateRangeText = () => {
    const {start, end} = dateRange;

    if (!start || !end) {
      return t('selectDateRange');
    }

    const startDate = start.toLocaleDateString('it-IT');
    const endDate = end.toLocaleDateString('it-IT');

    return `${startDate} - ${endDate}`;
  };

  const resetFilters = () => {
    setSelectedStatus(StatusOption.All);
    resetDateRange();
  };

  const resetDateRange = () => setDateRange({start: null, end: null});

  return (
    <>
      <Text className="font-titillium-bold mb-4">{t('filterByStatus')}</Text>

      {STATUS_OPTIONS.map(status => (
        <TouchableOpacity
          key={status}
          onPress={toggleStatus.bind(null, status)}
          className={`py-3 px-4 rounded-full ${
            selectedStatus === status && 'bg-gray-200'
          }`}>
          <Text>
            {status === StatusOption.All ? t('all') : getStatusLabel(status, t)}
          </Text>
        </TouchableOpacity>
      ))}

      <Text className="font-bold mt-6 mb-4">{t('filterByDate')}</Text>

      <TouchableOpacity
        onPress={toggleDatePicker}
        className=" bg-gray-100 rounded-lg p-4 flex-row items-center justify-between">
        <Text>{getDateRangeText()}</Text>

        {hasSelectedDate && (
          <TouchableOpacity onPress={resetDateRange} className="ml-2">
            <Text className="text-red-600 text-sm">X</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-between mt-3">
        <TouchableOpacity
          onPress={resetFilters}
          className="px-4 py-2 rounded-lg">
          <Text className="text-base font-titillium-semibold text-system-red-600">
            {t('resetFilters')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleModal(false)} className="px-4 py-2">
          <Text className="text-base font-titillium-semibold text-system-teal-600">
            {t('close')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ReportFilterOptions;
