import {Text, TouchableOpacity, View} from 'react-native';

import {ALL_STATUSES, REPORT_STATUS_LABELS} from '@constants';
import {StatusOption} from '@types';

type ReportFilterOptionsProps = {
  selectedStatus: StatusOption;
  onSelectStatus: (status: StatusOption) => void;
  getDateRangeText: () => string;
  onResetDateRange: () => void;
  onResetFilter: () => void;
  onClose: () => void;
  onPress: () => void;
  hasSelectedDate: boolean;
};

const ReportFilterOptions = ({
  selectedStatus,
  onSelectStatus,
  getDateRangeText,
  onResetDateRange,
  onResetFilter,
  onClose,
  onPress,
  hasSelectedDate,
}: ReportFilterOptionsProps) => {
  return (
    <>
      <Text className="font-bold mb-4">Filtra per stato</Text>

      {ALL_STATUSES.map(status => (
        <TouchableOpacity
          key={status}
          onPress={() => onSelectStatus(status)}
          className={`py-3 px-4 rounded-full ${
            selectedStatus === status && 'bg-gray-200'
          }`}>
          <Text>
            {status === 'All' ? 'Tutti' : REPORT_STATUS_LABELS[status]}
          </Text>
        </TouchableOpacity>
      ))}

      <Text className="font-bold mt-6 mb-4">Filtra per data</Text>

      <TouchableOpacity
        onPress={onPress}
        className=" bg-gray-100 rounded-lg p-4 flex-row items-center justify-between">
        <Text>{getDateRangeText()}</Text>

        {hasSelectedDate && (
          <TouchableOpacity onPress={onResetDateRange} className="ml-2">
            <Text className="text-red-600 text-sm font-medium">X</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-between mt-3">
        <TouchableOpacity
          onPress={onResetFilter}
          className="px-4 py-2 rounded-lg">
          <Text className="text-base text-red-600 font-medium">
            Resetta filtri
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose} className="px-4 py-2">
          <Text className="text-base text-utility-blue-600 font-medium">
            Chiudi
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ReportFilterOptions;
