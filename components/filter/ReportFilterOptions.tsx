import {Text, TouchableOpacity, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {ScrollView} from 'react-native-gesture-handler'

import {useAuth} from '@hooks'

import {getPriorityLabel, getStatusLabel} from '@utils'

import {StatusOption, PriorityOption, UserRank, FilterValues} from '@types'

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

  const hasSelectedDate = dateRange.start !== null && dateRange.end !== null

  const toggleStatus = (status: StatusOption) => setSelectedStatus(status)
  const togglePriority = (priority: PriorityOption) =>
    setSelectedPriority && setSelectedPriority(priority)

  const getDateRangeText = () => {
    const {start, end} = dateRange

    if (!start || !end) {
      return t('filter.selectDateRange')
    }

    const startDate = start.toLocaleDateString('it-IT')
    const endDate = end.toLocaleDateString('it-IT')

    return `${startDate} - ${endDate}`
  }

  const resetFilters = () => {
    setSelectedStatus(StatusOption.All)
    resetDateRange()

    if (setSelectedPriority) {
      setSelectedPriority(PriorityOption.All)
    }
  }

  const resetDateRange = () => setDateRange({start: null, end: null})

  return (
    <ScrollView>
      <Text className="font-titillium-bold mb-4 dark:text-white">
        {t('filter.filterByStatus')}
      </Text>

      {STATUS_OPTIONS.map(status => (
        <TouchableOpacity
          key={status}
          onPress={() => toggleStatus(status)}
          className={`py-3 px-4 rounded-full ${
            selectedStatus === status && 'bg-gray-200 dark:bg-gray-700'
          }`}>
          <Text className="dark:text-white">{getStatusLabel(status, t)}</Text>
        </TouchableOpacity>
      ))}

      {user?.rank === UserRank.Admin && (
        <>
          <Text className="font-bold mt-6 mb-4 dark:text-white">
            {t('filter.filterByPriority')}
          </Text>

          {PRIORITY_OPTIONS.map(priority => (
            <TouchableOpacity
              key={priority}
              onPress={() => togglePriority(priority)}
              className={`py-3 px-4 rounded-full ${
                selectedPriority === priority && 'bg-gray-200 dark:bg-gray-700'
              }`}>
              <Text className="dark:text-white">
                {getPriorityLabel(priority, t)}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      <Text className="font-bold mt-6 mb-4 dark:text-white">
        {t('filter.filterByDate')}
      </Text>

      <TouchableOpacity
        onPress={toggleDatePicker}
        className=" bg-gray-200 dark:bg-gray-700 rounded-lg p-4 flex-row items-center justify-between">
        <Text className="dark:text-white">{getDateRangeText()}</Text>

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
