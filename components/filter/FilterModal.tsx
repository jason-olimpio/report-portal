import React, {useState} from 'react';
import {Modal, Pressable} from 'react-native';

import {DateRangeSelector, ReportFilterOptions} from '@components';

import {StatusOption} from '@types';

type FilterModalProps = {
  visible: boolean;
  toggleModal: (visible: boolean) => void;
  selectedStatus: StatusOption;
  setSelectedStatus: (status: StatusOption) => void;
  dateRange: {start: Date | null; end: Date | null};
  setDateRange: (range: {start: Date | null; end: Date | null}) => void;
};

const FilterModal = ({
  visible,
  toggleModal,
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
      onRequestClose={() => toggleModal(false)}>
      <Pressable
        className="flex-1 bg-black/40 justify-center px-8"
        onPress={() => toggleModal(false)}>
        <Pressable
          className="bg-white rounded-xl p-6 shadow-lg"
          onPress={event => event.stopPropagation()}>
          {!showDatePicker ? (
            <ReportFilterOptions
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              dateRange={dateRange}
              setDateRange={setDateRange}
              toggleModal={toggleModal}
              toggleDatePicker={toggleDatePicker}
            />
          ) : (
            <DateRangeSelector
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
