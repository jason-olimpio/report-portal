import {Text, View} from 'react-native'
import {useTranslation} from 'react-i18next'

import {ErrorText} from '@components'

import type {Location} from '@types'

type LocationFieldProps = {
  label?: string
  location?: Location
  error?: string | false
}

const LocationField = ({label, location, error}: LocationFieldProps) => {
  const {t} = useTranslation()

  const {latitude, longitude} = location || {}
  const hasValidLocation = latitude !== 0 && longitude !== 0

  return (
    <View className="mb-6">
      <Text
        className="mb-3 font-titillium-semibold dark:text-white"
        accessibilityLabel={label}>
        {label}
      </Text>

      <View
        className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 
      bg-white dark:bg-background-secondaryDark shadow-sm">
        {hasValidLocation ? (
          <>
            <Text className="text-neutral-500 dark:text-neutral-300 font-titillium-regular text-sm">
              {t('location.latitude')}: {latitude?.toFixed(6)}
            </Text>

            <Text className="text-neutral-500 dark:text-neutral-300 font-titillium-regular text-sm">
              {t('location.longitude')}: {longitude?.toFixed(6)}
            </Text>
          </>
        ) : (
          <Text className="text-neutral-500 dark:text-neutral-300 font-titillium-regular text-sm italic">
            {t('location.locationNotCaptured')}
          </Text>
        )}
      </View>

      <ErrorText error={error} />
    </View>
  )
}

export default LocationField
