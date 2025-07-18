import {Text, TouchableOpacity, StyleSheet, View} from 'react-native'
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet'
import {useNavigation} from '@react-navigation/native'
import {useTranslation} from 'react-i18next'
import MaterialIcons from '@react-native-vector-icons/material-icons'

import ReportImageGallery from './ReportImageGallery'

import {useTheme} from '@hooks'
import type {ReportCardNavigationProp, Report} from '@types'
import {appColors} from '@config'

type ReportDetailsBottomSheetProps = {
  report: Report | null
  onClose: () => void
}

const ReportDetailsBottomSheet = ({
  report,
  onClose,
}: ReportDetailsBottomSheetProps) => {
  const {t} = useTranslation()
  const navigation = useNavigation<ReportCardNavigationProp>()
  const {isDark} = useTheme()

  if (!report) {
    return null
  }

  const {id, title, address, description, images} = report

  const styles = StyleSheet.create({
    sheetBackground: {
      backgroundColor: isDark ? 'black' : 'white',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    handleIndicator: {
      width: 40,
      height: 5,
      borderRadius: 3,
      alignSelf: 'center',
      marginTop: 8,
      marginBottom: 8,
    },
  })

  const handleIndicatorStyle = [
    {
      backgroundColor: isDark
        ? appColors.neutral.gray[300]
        : appColors.neutral.gray[700],
    },
    styles.handleIndicator,
  ]

  const handlePress = () => navigation.navigate('ReportDetails', {reportId: id})

  return (
    <BottomSheet
      index={report ? 0 : -1}
      snapPoints={['45%', '70%']}
      enablePanDownToClose
      onClose={onClose}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={handleIndicatorStyle}>
      <BottomSheetScrollView className="flex-1 px-4 bg-white dark:bg-black">
        <ReportImageGallery images={images} />

        <Text className="text-lg font-bold text-black mt-4 dark:text-white">
          {title}
        </Text>

        <View className="flex-row">
          <MaterialIcons
            name="location-on"
            size={15}
            color={
              isDark ? appColors.neutral.gray[200] : appColors.neutral.gray[500]
            }
          />

          <Text className="text-neutral-gray-400 mb-1 ml-1 dark:text-neutral-gray-200 text-sm">
            {address}
          </Text>
        </View>

        <Text className="mb-4 text-black dark:text-white">{description}</Text>

        <TouchableOpacity
          className="bg-primary-light dark:bg-primary-dark p-3 rounded-2xl"
          onPress={handlePress}>
          <Text className="text-white text-center font-titillium-bold">
            {t('reports.viewReport')}
          </Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

export default ReportDetailsBottomSheet
