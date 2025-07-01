import React, { ComponentProps } from 'react';
import {View, Text} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

type InfoCardWidgetProps = {
  icon: ComponentProps<typeof MaterialIcons>['name'];
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
          <MaterialIcons
            name={icon}
            size={16}
            color={iconColor}
          />

          <Text className="text-lg font-titillium-light text-gray-800 ml-2">{title}</Text>
        </View>

        <Text className={`text-2xl mb-1 ${valueColorClass}`}>
          {value}
        </Text>

        <Text className="text-xs font-titillium-light text-gray-600">{subInfo}</Text>
      </View>
    </View>
  );
};

export default InfoCardWidget;
