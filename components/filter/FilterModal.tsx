import React, {useState} from 'react';
import {Modal, Pressable} from 'react-native';

import {DateRangePicker, ReportFilterOptions} from '@components';
import {StatusOption} from '@types';

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedStatus: StatusOption;
  onSelectStatus: (status: StatusOption) => void;
  dateRange: {start: Date | null; end: Date | null};
  onDateRangeChange: (range: {start: Date | null; end: Date | null}) => void;
  onResetFilter: () => void;
};

const FilterModal = ({
  visible,
  onClose,
  selectedStatus,
  onSelectStatus,
  dateRange,
  onDateRangeChange,
  onResetFilter,
}: FilterModalProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDateRange, setTempDateRange] = useState(dateRange);

  const hasSelectedDate = dateRange.start !== null && dateRange.end !== null;

  const getDateRangeText = () => {
    return dateRange.start && dateRange.end
      ? `${dateRange.start.toLocaleDateString(
          'it-IT',
        )} - ${dateRange.end.toLocaleDateString('it-IT')}`
      : 'Seleziona intervallo date';
  };

  const handleDateChange = (date: Date, type: 'START_DATE' | 'END_DATE') => {
    setTempDateRange(previousState => ({
      ...previousState,
      start: type === 'START_DATE' ? date : previousState.start,
      end: type === 'START_DATE' ? null : date,
    }));
  };

  const confirmDateRange = () => {
    onDateRangeChange(tempDateRange);
    setShowDatePicker(false);
  };

  const resetDateRange = () => {
    onDateRangeChange({start: null, end: null});
    setTempDateRange({start: null, end: null});
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <Pressable
        className="flex-1 bg-black/40 justify-center px-8"
        onPress={onClose}>
        <Pressable
          className="bg-white rounded-xl p-6 shadow-lg"
          onPress={event => event.stopPropagation()}>
          {!showDatePicker ? (
            <ReportFilterOptions
              selectedStatus={selectedStatus}
              onSelectStatus={onSelectStatus}
              getDateRangeText={getDateRangeText}
              onResetDateRange={resetDateRange}
              onResetFilter={onResetFilter}
              onClose={onClose}
              onPress={() => setShowDatePicker(true)}
              hasSelectedDate={hasSelectedDate}
            />
          ) : (
            <DateRangePicker
              tempDateRange={tempDateRange}
              handleDateChange={handleDateChange}
              confirmDateRange={confirmDateRange}
              setShowDatePicker={setShowDatePicker}
            />
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FilterModal;
