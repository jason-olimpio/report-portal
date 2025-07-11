import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import CalendarReportItem from './CalendarReportItem';

import {Report} from '@types';

type CalendarReportsListProps = {
  reports: Report[] | null;
  selectedDate: string | null;
};

const CalendarReportsList = ({
  reports,
  selectedDate,
}: CalendarReportsListProps) => {
  const {t} = useTranslation();

  if (!selectedDate || !reports || reports.length === 0) {
    return (
      <Text className="text-center text-neutral-gray-400 mt-6">
        {t('calendar.noReports')}
      </Text>
    );
  }

  return (
    <View className="w-full p-4">
      {reports.map(report => (
        <CalendarReportItem key={report.id} report={report} />
      ))}
    </View>
  );
};

export default CalendarReportsList;
