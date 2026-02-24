import React from 'react'
import {ActivityIndicator, TextInput, View} from 'react-native'

import {appColors} from '@config'

type Props = {
  isDark: boolean
  label: string
}

const LoadingState = ({isDark, label}: Props) => (
  <View className="flex-1 justify-center items-center bg-neutral-gray-100 dark:bg-neutral-gray-900">
    <ActivityIndicator
      size={32}
      color={isDark ? appColors.primary.light : appColors.primary.dark}
    />

    <TextInput
      editable={false}
      value={label}
      className="font-titillium-regular text-center text-base 
        bg-transparent border-0 text-primary-dark dark:text-primary-light"
    />
  </View>
)

export default LoadingState
