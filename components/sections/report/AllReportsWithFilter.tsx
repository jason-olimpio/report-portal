import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {SectionHeader, ReportList, FilterModal} from '@components';
import {reportData} from '@store';

import {StatusOption} from '@types';

const AllReportsWithFilter = () => {
  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);

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

  const toggleModal = (visible: boolean) => setModalVisible(visible);

  return (
    <View className="mb-10">
      <SectionHeader
        title={t('allReports')}
        action={t('filter')}
        onPress={toggleModal.bind(null, true)}
        className="mb-6"
      />

      <ReportList reports={filteredReports} />

      <FilterModal
        visible={modalVisible}
        closeModal={toggleModal.bind(null, false)}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
    </View>
  );
};

export default AllReportsWithFilter;
