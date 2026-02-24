import React from 'react'
import {Keyboard, TextInput, TouchableOpacity, View} from 'react-native'
import MaterialIcons from '@react-native-vector-icons/material-icons'

import {appColors} from '@config'

type Props = {
  isDark: boolean
  value: string
  placeholder: string
  onChangeText: (text: string) => void
  onMyLocationPress: () => void
  myLocationA11yLabel: string
}

const SearchBarOverlay = ({
  isDark,
  value,
  placeholder,
  onChangeText,
  onMyLocationPress,
  myLocationA11yLabel,
}: Props) => {
  return (
    <View
      className="absolute top-4 left-4 right-4 z-10 flex-row 
    items-center bg-white dark:bg-black rounded-lg px-4 shadow">
      <MaterialIcons
        name="search"
        size={20}
        color={isDark ? 'white' : 'black'}
      />

      <TextInput
        className={`flex-1 font-titillium-regular ${
          isDark ? 'bg-black text-white' : 'bg-white text-black'
        }`}
        placeholder={placeholder}
        placeholderTextColor={
          isDark ? appColors.neutral.gray[300] : appColors.neutral.gray[500]
        }
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={() => Keyboard.dismiss()}
      />

      <TouchableOpacity
        onPress={onMyLocationPress}
        accessibilityLabel={myLocationA11yLabel}>
        <MaterialIcons
          name="my-location"
          size={18}
          color={isDark ? appColors.primary.light : appColors.primary.dark}
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchBarOverlay
