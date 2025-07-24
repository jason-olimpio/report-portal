import {Text, TouchableOpacity, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {ScrollView} from 'react-native-gesture-handler'

import {useAuth} from '@hooks'
import {getPriorityLabel, getStatusLabel} from '@utils'
import {StatusOption, PriorityOption, UserRank, FilterValues} from '@types'

import OptionList from './OptionList'

type ReportFilterOptionsProps = {
  filters: FilterValues
  toggleModal: (visible: boolean) => void
  toggleDatePicker: () => void
}

const STATUS_OPTIONS: StatusOption[] = [
  StatusOption.All,
  StatusOption.Pending,
  StatusOption.Working,
  StatusOption.Completed,
]

const PRIORITY_OPTIONS: PriorityOption[] = [
  PriorityOption.All,
  PriorityOption.Low,
  PriorityOption.Medium,
  PriorityOption.High,
]

const ReportFilterOptions = ({
  filters,
  toggleModal,
  toggleDatePicker,
}: ReportFilterOptionsProps) => {
  const {t} = useTranslation()
  const {user} = useAuth()
  const {
    selectedStatus,
    setSelectedStatus,
    dateRange,
    setDateRange,
    selectedPriority,
    setSelectedPriority,
  } = filters

  const getDateRangeText = () => {
    const {start, end} = dateRange

    if (!start || !end) return t('filter.selectDateRange')

    return `${start.toLocaleDateString('it-IT')} - ${end.toLocaleDateString('it-IT')}`
  }

  const resetDateRange = () => setDateRange({start: null, end: null})

  const resetFilters = () => {
    setSelectedStatus(StatusOption.All)
    resetDateRange()
    setSelectedPriority?.(PriorityOption.All)
  }

  return (
    <ScrollView>
      <Text className="font-titillium-bold dark:text-white">
        {t('filter.filterByStatus')}
      </Text>

      <OptionList
        options={STATUS_OPTIONS}
        selected={selectedStatus}
        onSelect={setSelectedStatus}
        getLabel={(status: StatusOption) => getStatusLabel(status, t)}
      />

      {user?.rank === UserRank.Admin && (
        <>
          <Text className="font-titillium-bold mt-6 mb-4 dark:text-white">
            {t('filter.filterByPriority')}
          </Text>

          <OptionList
            options={PRIORITY_OPTIONS}
            selected={selectedPriority}
            onSelect={setSelectedPriority}
            getLabel={priority => getPriorityLabel(priority, t)}
          />
        </>
      )}

      <Text className="font-titillium-bold mt-6 mb-4 dark:text-white">
        {t('filter.filterByDate')}
      </Text>

      <TouchableOpacity
        onPress={toggleDatePicker}
        className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 flex-row items-center justify-between">
        <Text className="font-titillium-regular dark:text-white">
          {getDateRangeText()}
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-between mt-3">
        <TouchableOpacity
          onPress={resetFilters}
          className="px-4 py-2 rounded-lg">
          <Text className="text-base font-titillium-semibold text-system-red-600-light dark:text-system-red-600-dark">
            {t('filter.resetFilters')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleModal(false)}
          className="px-4 py-2">
          <Text className="text-base font-titillium-semibold text-system-teal-600-light dark:text-system-teal-600-dark">
            {t('forms.close')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default ReportFilterOptions
