import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import {useTheme} from '@hooks';
import {STATUS_COLORS} from '@utils';
import {appColors} from '@config';
import type {Report, StatusOption, CalendarRouteProp} from '@types';

type CalendarReportItemProps = {
  report: Report;
};

const CalendarReportItem = ({report}: CalendarReportItemProps) => {
  const navigation = useNavigation<CalendarRouteProp>();
  const {isDark} = useTheme();

  const {id, status, title, description, address} = report;

  const handlePress = () =>
    navigation.navigate('ReportDetails', {reportId: id});

  const getBorderColor = () =>
    isDark
      ? STATUS_COLORS.dark[status as Exclude<StatusOption, StatusOption.All>]
      : STATUS_COLORS.light[status as Exclude<StatusOption, StatusOption.All>];

  return (
    <TouchableOpacity
      className="bg-white dark:bg-neutral-gray-800 rounded-lg p-3 mb-3 border-l-8 shadow"
      style={{
        borderLeftColor: getBorderColor(),
      }}
      onPress={handlePress}>
      <Text className="font-titillium-bold text-lg mb-1 text-neutral-gray-800 dark:text-white">
        {title}
      </Text>

      <Text className="text-neutral-gray-600 mb-1 dark:text-neutral-gray-300">
        {description}
      </Text>

      <View className="flex-row mt-1">
        <MaterialIcons
          name="location-on"
          size={15}
          color={
            isDark ? appColors.neutral.gray[200] : appColors.neutral.gray[400]
          }
        />

        <Text className="text-sm ml-1 text-neutral-gray-400 dark:text-neutral-gray-200">
          {address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CalendarReportItem;
