import {View, Text, TextInput} from 'react-native'

import {ErrorText} from '@components'

type TextFieldProps = {
  label: string
  value: string
  error?: string | false
  onChangeText: (value: string) => void
}

const TextField = ({
  label,
  value,
  error,
  onChangeText,
  ...inputProps
}: TextFieldProps) => (
  <View className="mb-6">
    <Text className="font-titillium-semibold mb-3 dark:text-white">
      {label}
    </Text>

    <TextInput
      className="border bg-white dark:bg-background-secondaryDark border-neutral-gray-100 font-titillium-regular
      dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 p-4 rounded-lg shadow-md"
      value={value}
      onChangeText={onChangeText}
      {...inputProps}
    />

    <ErrorText error={error} />
  </View>
)

export default TextField
