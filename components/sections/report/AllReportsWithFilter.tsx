import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {SectionHeader, ReportList} from '@components';

import {ReportStatus} from '@types';
import {reportData} from '@store';

import { REPORT_STATUS_LABELS } from '@constants';

const ALL_STATUSES = [
  'All',
  ReportStatus.Pending,
  ReportStatus.Working,
  ReportStatus.Completed,
] as const;

const AllReportsWithFilter = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<(typeof ALL_STATUSES)[number]>('All');

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const filteredReports = reportData.filter(({status, date}) => {
    const isStatusMatch = selectedStatus === 'All' || status === selectedStatus;
    const isStartDateValid = !startDate || date >= startDate;
    const isEndDateValid = !endDate || date <= endDate;

    return isStatusMatch && isStartDateValid && isEndDateValid;
  });

  const openFilterModal = () => setFilterModalVisible(true);
  const closeFilterModal = () => setFilterModalVisible(false);

  const onSelectStatus = (status: (typeof ALL_STATUSES)[number]) => {
    setSelectedStatus(status);
  };

  const onStartDateChange = (_event: any, selected?: Date) => {
    setShowStartPicker(Platform.OS === 'ios');

    if (selected) {
      setStartDate(selected);
    }
  };

  const onEndDateChange = (_event: any, selected?: Date) => {
    setShowEndPicker(Platform.OS === 'ios');

    if (selected) {
      setEndDate(selected);
    }
  };

  const resetFilters = () => {
    setSelectedStatus('All');
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <>
      <SectionHeader
        title="Tutte le segnalazioni"
        action="Filtra"
        onPress={openFilterModal}
        className="mb-6"
      />

      <ReportList reports={filteredReports} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={closeFilterModal}>
        <Pressable
          className="flex-1 bg-black bg-opacity-40 justify-center px-8"
          onPress={closeFilterModal}>
          <Pressable
            className="bg-white rounded-lg p-5 shadow-lg"
            onPress={event => event.stopPropagation()}>
            <Text className="text-lg font-semibold mb-3">Filtra per stato</Text>

            {ALL_STATUSES.map(status => (
              <TouchableOpacity
                key={status}
                onPress={() => onSelectStatus(status)}
                className={`py-2 px-4 border-b border-gray-200 rounded-full ${
                  selectedStatus === status ? 'bg-gray-200' : ''
                }`}>
                <Text className="text-base">
                  {status === 'All' ? 'Tutti' : REPORT_STATUS_LABELS[status]}
                </Text>
              </TouchableOpacity>
            ))}

            <Text className="text-lg font-semibold mt-5 mb-3">
              Filtra per data
            </Text>

            <TouchableOpacity
              onPress={() => setShowStartPicker(true)}
              className="py-2 border-b border-gray-200">
              <Text>
                Data inizio:{' '}
                {startDate ? startDate.toLocaleDateString() : 'Seleziona'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowEndPicker(true)}
              className="py-2 border-b border-gray-200">
              <Text>
                Data fine:{' '}
                {endDate ? endDate.toLocaleDateString() : 'Seleziona'}
              </Text>
            </TouchableOpacity>

            {showStartPicker && (
              <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                display="default"
                onChange={onStartDateChange}
                maximumDate={endDate || undefined}
              />
            )}

            {showEndPicker && (
              <DateTimePicker
                value={endDate || new Date()}
                mode="date"
                display="default"
                onChange={onEndDateChange}
                minimumDate={startDate || undefined}
              />
            )}

            <View className="flex-row justify-between mt-4">
              <TouchableOpacity onPress={resetFilters} className="px-3 py-2">
                <Text className="text-red-600 text-base">Resetta filtri</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={closeFilterModal}
                className="px-3 py-2">
                <Text className="text-primary text-base">Chiudi</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default AllReportsWithFilter;
