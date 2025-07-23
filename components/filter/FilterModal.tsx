import {useState} from 'react'
import {Modal, Pressable} from 'react-native'

import {DateRangeSelector, ReportFilterOptions} from '@components'

import type {FilterValues} from '@types'

type FilterModalProps = {
  visible: boolean
  toggleModal: (visible: boolean) => void
  filters: FilterValues
}

export const FilterModal = ({
  visible,
  toggleModal,
  filters,
}: FilterModalProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false)

  const toggleDatePicker = () => setShowDatePicker(wasVisible => !wasVisible)

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
          className="bg-background-light dark:bg-background-dark rounded-xl p-4 shadow-lg"
          onPress={event => event.stopPropagation()}>
          {!showDatePicker ? (
            <ReportFilterOptions
              key={`filter-options-${visible}`}
              filters={filters}
              toggleModal={toggleModal}
              toggleDatePicker={toggleDatePicker}
            />
          ) : (
            <DateRangeSelector
              dateRange={filters.dateRange}
              setDateRange={filters.setDateRange}
              toggleDatePicker={toggleDatePicker}
            />
          )}
        </Pressable>
      </Pressable>
    </Modal>
  )
}
