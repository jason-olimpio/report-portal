/**
 * ReportCard.tsx
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Component for displaying a report card in a list.
 * Shows report image, title, address, date, status, and priority.
 */

import {
  Image,
  View,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native'
import {useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import {useTranslation} from 'react-i18next'
import {format} from 'date-fns'

import {
  type Report,
  UserRank,
  StatusOption,
  type ReportCardNavigationProp,
} from '@types'
import {getTimeAgo, getLocaleForDateFns} from '@utils'
import {PlaceholderImage} from '@assets'
import {appColors} from '@config'
import {useAuth, useTheme, useReports} from '@hooks'

import {
  ConfirmCloseModal,
  ReportStatusBadge,
  ReportPriorityBadge,
} from '@components'

type ReportCardProps = {
  report: Report
}

const getImageSource = (images: ImageSourcePropType[] = []) => {
  if (!Array.isArray(images) || images.length === 0) return PlaceholderImage

  return images[0]
}

const ReportCard = ({report}: ReportCardProps) => {
  const {t, i18n} = useTranslation()
  const navigation = useNavigation<ReportCardNavigationProp>()
  const {user} = useAuth()
  const {isDark} = useTheme()
  const {setReports} = useReports()

  const [modalVisible, setModalVisible] = useState(false)

  const {id, images, date, title, address, status, priority} = report

  const timeAgo = getTimeAgo(date, i18n.language, t)
  const locale = getLocaleForDateFns(i18n.resolvedLanguage)
  const formattedDate = format(date, 'PPP', {locale})

  const source = getImageSource(images)

  const handlePress = () => navigation.navigate('ReportDetails', {reportId: id})

  const handleConfirmClose = () => {
    setReports((previousReports: Report[]) =>
      previousReports.map(item =>
        item.id === report.id
          ? {...item, status: StatusOption.Completed}
          : item,
      ),
    )

    setModalVisible(false)
  }

  const isAdmin = user?.rank === UserRank.Admin

  return (
    <>
      <TouchableOpacity
        className="bg-white dark:bg-background-secondaryDark p-4 rounded-lg 
        shadow-lg mb-4 flex-row items-center justify-center"
        onPress={handlePress}
        activeOpacity={0.7}>
        {!isAdmin && (
          <Image
            source={source}
            className="w-16 h-16 mr-4 rounded-full shadow-lg"
          />
        )}

        <View className="flex-1">
          <Text className="font-titillium-bold dark:text-white">{title}</Text>

          <View className="flex-row items-center">
            <MaterialIcons
              name="location-on"
              size={12}
              color={
                isDark
                  ? appColors.neutral.gray[200]
                  : appColors.neutral.gray[500]
              }
            />

            <Text className="flex-1 font-titillium-regular text-xs ml-0.5 text-gray-400 dark:text-gray-200">
              {address}
            </Text>
          </View>

          <Text className="font-titillium-regular text-xs text-gray-400 dark:text-gray-200">
            {isAdmin ? formattedDate : timeAgo}
          </Text>
        </View>

        <View className="flex-row items-center ml-4 justify-center">
          <View className="flex flex-col mr-1 items-center justify-center">
            <ReportStatusBadge status={status} />

            {isAdmin && (
              <ReportPriorityBadge
                priority={priority}
                className="mt-2 self-center"
              />
            )}
          </View>

          {isAdmin && (
            <TouchableOpacity
              className="p-2 self-center"
              onPress={() => setModalVisible(true)}>
              <MaterialIcons name="close" size={15} color="red" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      {isAdmin && (
        <ConfirmCloseModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleConfirmClose}
        />
      )}
    </>
  )
}

export default ReportCard
