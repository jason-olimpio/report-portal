import React from 'react'
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native'
import {useTranslation} from 'react-i18next'

type SaveButtonProps = {
  onPress: () => void
  disabled: boolean
  isSubmitting: boolean
  label?: string
  className?: string
}

const SaveButton = ({
  onPress,
  disabled,
  isSubmitting,
  label,
  className,
}: SaveButtonProps) => {
  const {t} = useTranslation()

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`rounded-full w-full self-center items-center p-3 
        bg-primary-light dark:bg-primary-dark ${className || ''}`}
      accessibilityLabel={label || t('save')}>
      {isSubmitting ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="font-titillium-bold text-white">
          {label || t('forms.save')}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default SaveButton
