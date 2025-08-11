/**
 * BackButton.tsx
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Component for displaying a back navigation button.
 * Shows an arrow icon with optional text label.
 */

import {TouchableOpacity, Text} from 'react-native'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import {useTranslation} from 'react-i18next'
import {useNavigation} from '@react-navigation/native'

import {useTheme} from '@hooks'
import {appColors} from '@config'

type BackButtonProps = {
  showText?: boolean
}

const BackButton = ({showText = true}: BackButtonProps) => {
  const {isDark} = useTheme()
  const {t} = useTranslation()
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      className="flex-row items-center"
      onPress={navigation.goBack}>
      <MaterialIcons
        name="arrow-back-ios"
        size={!showText ? 20 : 15}
        color={
          isDark ? appColors.neutral.gray[200] : appColors.neutral.gray[800]
        }
      />

      {showText && (
        <Text className="font-titillium-regular selection:ml-1 dark:text-white">
          {t('navigation.back')}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default BackButton
