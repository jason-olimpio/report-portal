import {useState, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {ScrollView} from 'react-native'

import {SectionHeader, ReportList, Pagination, FilterModal} from '@components'
import {useReportFilters, usePagination} from '@hooks'
import {FilterValues} from '@types'

const ReportsScreen = () => {
  const {t} = useTranslation()

  const [modalVisible, setModalVisible] = useState(false)

  const {
    filteredReports,
    selectedStatus,
    setSelectedStatus,
    dateRange,
    setDateRange,
  } = useReportFilters()

  const filterProps: FilterValues = {
    selectedStatus,
    setSelectedStatus,
    dateRange,
    setDateRange,
  }

  const {currentPage, setCurrentPage, totalPages, currentItems, reset} =
    usePagination(filteredReports, 5)

  useEffect(() => reset(), [selectedStatus, dateRange])

  const toggleModal = (visible: boolean) => setModalVisible(visible)

  return (
    <ScrollView className="flex-1 dark:bg-background-dark px-8 pt-6">
      <SectionHeader
        title={t('reports.allReports')}
        action={t('filter.filter')}
        onPress={() => toggleModal(true)}
        className="mb-6"
      />

      <ReportList reports={currentItems} />

      {filteredReports.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="px-4"
        />
      )}

      <FilterModal
        visible={modalVisible}
        toggleModal={toggleModal}
        filters={filterProps}
      />
    </ScrollView>
  )
}

export default ReportsScreen
