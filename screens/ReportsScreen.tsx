import {View} from 'react-native';

import {AllReportsWithFilter} from '@components';

const ReportsScreen = () => {
  return (
    <View className="flex-1 p-8">
      <AllReportsWithFilter />
    </View>
  );
};

export default ReportsScreen;
