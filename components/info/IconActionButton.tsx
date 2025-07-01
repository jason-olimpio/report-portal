import React, {ComponentProps} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

type IconActionButtonProps = {
  icon: ComponentProps<typeof MaterialIcons>['name'];
  iconColor: string;
  title: string;
  bgColorClass: string;
  onPress: () => void;
};

const IconActionButton = ({
  icon,
  iconColor,
  title,
  bgColorClass,
  onPress,
}: IconActionButtonProps) => {
  return (
    <View className="flex-1 items-center">
      <TouchableOpacity
        onPress={onPress}
        className={`p-5 rounded-full ${bgColorClass}`}
        activeOpacity={0.8}>
        <MaterialIcons
          name={icon}
          size={18}
          color={iconColor}
        />
      </TouchableOpacity>

      <Text className="text-sm mt-1">{title}</Text>
    </View>
  );
};

export default IconActionButton;
