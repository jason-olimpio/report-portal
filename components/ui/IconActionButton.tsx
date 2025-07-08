import {ComponentProps} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

type IconActionButtonProps = {
  icon: ComponentProps<typeof MaterialIcons>['name'];
  iconColor: string;
  title: string;
  bgColor: string;
  onPress: () => void;
  className?: string;
};

const IconActionButton = ({
  icon,
  iconColor,
  title,
  bgColor,
  onPress,
  className,
}: IconActionButtonProps) => (
    <View className={`flex-1 items-center ${className || ''}`}>
      <TouchableOpacity
        onPress={onPress}
        className="p-5 rounded-full"
        style={{backgroundColor: bgColor}}
        activeOpacity={0.8}>
        <MaterialIcons
          name={icon}
          size={20}
          color={iconColor}
        />
      </TouchableOpacity>

      <Text className="text-sm mt-1 dark:text-white">{title}</Text>
    </View>
  );

export default IconActionButton;
