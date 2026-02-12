import {View, Text, TouchableOpacity} from 'react-native'

type SectionHeaderProps = {
  title: string
  action: string
  onPress: () => void
  className?: string
}

const SectionHeader = ({
  title,
  action,
  onPress,
  className = '',
}: SectionHeaderProps) => (
  <View className={`flex-row justify-between items-center ${className}`}>
    <Text className="text-xl font-titillium-light dark:text-white">
      {title}
    </Text>

    <TouchableOpacity onPress={onPress}>
      <Text className="font-titillium-regular text-sm text-primary-light dark:text-white">
        {action}
      </Text>
    </TouchableOpacity>
  </View>
)

export default SectionHeader
