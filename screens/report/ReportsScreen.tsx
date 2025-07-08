import {ScrollView} from 'react-native';

import {AllReportsWithFilter} from '@components';

const ReportsScreen = () => {
  return (
    <ScrollView className="flex-1 dark:bg-background-dark p-8">
      <AllReportsWithFilter />
    </ScrollView>
  );
};

export default ReportsScreen;
