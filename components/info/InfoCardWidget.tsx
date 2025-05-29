import React, { ComponentProps } from 'react';
import {View, Text} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

type InfoCardWidgetProps = {
  icon: ComponentProps<typeof FontAwesome6>['name'];
  iconColor: string;
  title: string;
  value: string;
  subInfo: string;
  bgColorClass: string;
  valueColorClass: string;
};

const InfoCardWidget = ({
  icon,
  iconColor,
  title,
  value,
  subInfo,
  bgColorClass,
  valueColorClass,
}: InfoCardWidgetProps) => {
  return (
    <View className="w-1/2 p-2">
      <View className={`p-3 rounded-xl shadow-md ${bgColorClass}`}>
        <View className="flex-row items-center mb-5">
          <FontAwesome6
            name={icon as any}
            size={16}
            color={iconColor}
            iconStyle="solid"
          />

          <Text className="text-lg font-light text-gray-800 ml-2">{title}</Text>
        </View>

        <Text className={`text-2xl font-normal mb-1 ${valueColorClass}`}>
          {value}
        </Text>

        <Text className="text-xs font-light text-gray-600">{subInfo}</Text>
      </View>
    </View>
  );
};

export default InfoCardWidget;
