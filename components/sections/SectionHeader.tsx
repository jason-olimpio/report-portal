import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

type SectionHeaderProps = {
  title: string;
  action: string;
  onPress: () => void;
  className?: string;
};

const SectionHeader = ({
  title,
  action,
  onPress,
  className = '',
}: SectionHeaderProps) => (
  <View className={`flex-row justify-between items-center ${className}`}>
    <Text className="text-xl font-titillium-light">{title}</Text>

    <TouchableOpacity onPress={onPress}>
      <Text className="text-sm font-titillium-sans text-primary">{action}</Text>
    </TouchableOpacity>
  </View>
);

export default SectionHeader;
