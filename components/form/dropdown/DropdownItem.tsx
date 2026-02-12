import {View, Text} from 'react-native'

type DropdownItemProps = {
  item: DropdownItemType
  isSelected: boolean
}

type DropdownItemType = {
  label: string
  value: string
}

const DropdownItem = ({item: {label}, isSelected}: DropdownItemProps) => (
  <View
    className={`p-4 bg-background-secondaryLight dark:bg-background-secondaryDark
   ${isSelected && 'bg-neutral-gray-200 dark:bg-neutral-gray-700'}`}>
    <Text className="dark:text-white text-lg font-titillium-regular">
      {label}
    </Text>
  </View>
)

export default DropdownItem
