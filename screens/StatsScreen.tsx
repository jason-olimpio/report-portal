import {CommunityImpactSection} from '@components';
import {View} from 'react-native';

const StatsScreen = () => {
  return (
    <View className="flex-1 p-8">
      <CommunityImpactSection
        reports={5}
        solvedReports={20}
        successRate={30}
      />
    </View>
  );
};

export default StatsScreen;
