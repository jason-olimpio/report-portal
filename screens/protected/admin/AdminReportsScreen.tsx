import {useEffect, useState} from 'react'
import {ScrollView} from 'react-native'
import {useTranslation} from 'react-i18next'

import {usePagination, useReportFilters} from '@hooks'
import {FilterModal, Pagination, ReportList, SectionHeader} from '@components'
import {FilterValues} from '@types'

const AdminReportsScreen = () => {
  const {t} = useTranslation()
  const [modalVisible, setModalVisible] = useState(false)

  const {
    filteredReports,
    selectedStatus,
    setSelectedStatus,
    dateRange,
    setDateRange,
    selectedPriority,
    setSelectedPriority,
  } = useReportFilters()

  const filterProps: FilterValues = {
    selectedStatus,
    setSelectedStatus,
    dateRange,
    setDateRange,
    selectedPriority,
    setSelectedPriority,
  }

  const {currentPage, setCurrentPage, totalPages, currentItems, reset} =
    usePagination(filteredReports, 5)

  useEffect(() => reset(), [selectedStatus, selectedPriority, dateRange])

  const toggleModal = (visible: boolean) => setModalVisible(visible)

  return (
    <ScrollView className="flex-1 dark:bg-background-dark px-8 pt-6">
      <SectionHeader
        title={t('reports.reportManagement')}
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

export default AdminReportsScreen
