import {TouchableOpacity, Text} from 'react-native'
import React from 'react'

type OptionListProps<T> = {
  options: T[]
  selected: T | undefined
  onSelect: ((option: T) => void) | undefined
  getLabel: (option: T) => string | undefined
}

const OptionList = <T extends string | number | symbol>({
  options,
  selected,
  onSelect,
  getLabel,
}: OptionListProps<T>) => (
  <>
    {options.map(option => (
      <TouchableOpacity
        onPress={() => onSelect && onSelect(option)}
        className={`py-3 px-4 rounded-full ${selected === option && 'bg-gray-200 dark:bg-gray-700'}`}>
        <Text className="dark:text-white">{getLabel(option)}</Text>
      </TouchableOpacity>
    ))}
  </>
)

export default OptionList
