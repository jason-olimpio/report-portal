import React, {useState} from 'react';

import {SectionHeader, ReportList, FilterModal} from '@components';
import {reportData} from '@store';
import {StatusOption} from '@types';

const AllReportsWithFilter = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusOption>('All');
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({start: null, end: null});

  const filteredReports = reportData.filter(({status, date}) => {
    const isStatusMatch = selectedStatus === 'All' || status === selectedStatus;
    const isStartDateValid = !dateRange.start || date >= dateRange.start;
    const isEndDateValid = !dateRange.end || date <= dateRange.end;

    return isStatusMatch && isStartDateValid && isEndDateValid;
  });

  const openFilterModal = () => setFilterModalVisible(true);
  const closeFilterModal = () => setFilterModalVisible(false);

  const resetFilters = () => {
    setSelectedStatus('All');
    setDateRange({start: null, end: null});
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

      <FilterModal
        visible={filterModalVisible}
        onClose={closeFilterModal}
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onResetFilter={resetFilters}
      />
    </>
  );
};

export default AllReportsWithFilter;
