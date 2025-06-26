import React, {useState} from 'react';
import {Modal, Pressable} from 'react-native';

import {DateRangePicker, ReportFilterOptions} from '@components';

import {StatusOption} from '@types';

type FilterModalProps = {
  visible: boolean;
  closeModal: () => void;
  selectedStatus: StatusOption;
  setSelectedStatus: (status: StatusOption) => void;
  dateRange: {start: Date | null; end: Date | null};
  setDateRange: (range: {start: Date | null; end: Date | null}) => void;
};

const FilterModal = ({
  visible,
  closeModal,
  selectedStatus,
  setSelectedStatus,
  dateRange,
  setDateRange,
}: FilterModalProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => setShowDatePicker(wasVisible => !wasVisible);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}>
      <Pressable
        className="flex-1 bg-black/40 justify-center px-8"
        onPress={closeModal}>
        <Pressable
          className="bg-white rounded-xl p-6 shadow-lg"
          onPress={event => event.stopPropagation()}>
          {!showDatePicker ? (
            <ReportFilterOptions
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              dateRange={dateRange}
              setDateRange={setDateRange}
              closeModal={closeModal}
              toggleDatePicker={toggleDatePicker}
            />
          ) : (
            <DateRangePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
              toggleDatePicker={toggleDatePicker}
            />
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FilterModal;
