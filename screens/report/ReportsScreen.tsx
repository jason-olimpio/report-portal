import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';

import {SectionHeader, ReportList, Pagination, FilterModal} from '@components';
import {reportData} from '@store';
import {StatusOption} from '@types';

const ReportsScreen = () => {
  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(5);

  const [selectedStatus, setSelectedStatus] = useState<StatusOption>(
    StatusOption.All,
  );
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({start: null, end: null});

  const filteredReports = reportData.filter(({status, date}) => {
    const isStatusMatch =
      selectedStatus === StatusOption.All || status === selectedStatus;
    const isStartDateValid = !dateRange.start || date >= dateRange.start;
    const isEndDateValid = !dateRange.end || date <= dateRange.end;

    return isStatusMatch && isStartDateValid && isEndDateValid;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, dateRange]);

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(
    indexOfFirstReport,
    indexOfLastReport,
  );
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const toggleModal = (visible: boolean) => setModalVisible(visible);

  return (
    <ScrollView className="flex-1 dark:bg-background-dark p-8">
      <SectionHeader
        title={t('reports.allReports')}
        action={t('filter.filter')}
        onPress={() => toggleModal(true)}
        className="mb-6"
      />

      <ReportList reports={currentReports} />

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
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
    </ScrollView>
  );
};

export default ReportsScreen;
