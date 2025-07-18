import {
  Image,
  Text,
  View,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import MaterialIcons from '@react-native-vector-icons/material-icons'
import {useTranslation} from 'react-i18next'

import {ReportStatusBadge} from '@components'
import {StatusOption, type ReportCardNavigationProp} from '@types'

import {getTimeAgo} from '@utils'

import {PlaceholderImage} from '@assets'

type ReportCardProps = {
  id: string
  images: ImageSourcePropType[]
  title: string
  address: string
  date: Date
  status: StatusOption
}

const getImageSource = (images: ImageSourcePropType[] = []) => {
  if (!Array.isArray(images) || images.length === 0) {
    return PlaceholderImage
  }

  return images[0]
}

const ReportCard = ({
  id,
  images,
  title,
  address,
  date,
  status,
}: ReportCardProps) => {
  const {t, i18n} = useTranslation()
  const navigation = useNavigation<ReportCardNavigationProp>()

  const handlePress = () => navigation.navigate('ReportDetails', {reportId: id})

  const timeAgo = getTimeAgo(date, i18n.language, t)
  const source = getImageSource(images)

  return (
    <TouchableOpacity
      className="bg-white dark:bg-background-secondaryDark p-4 rounded-lg shadow-lg mb-4"
      onPress={handlePress}
      activeOpacity={0.7}>
      <View className="flex-row items-end justify-between">
        <View className="flex-row flex-1 min-w-0">
          <Image
            source={source}
            className="w-16 h-16 mr-4 rounded-full shadow-lg"
          />

          <View className="min-w-0">
            <Text className="font-titillium-semibold dark:text-white">
              {title}
            </Text>

            <View className="flex-row items-center flex-wrap">
              <MaterialIcons name="location-on" size={15} color="gray" />

              <Text
                className="text-sm text-neutral-gray-500 dark:text-neutral-gray-200 ml-0.5 flex-shrink min-w-0"
                numberOfLines={1}
                ellipsizeMode="tail">
                {address}
              </Text>
            </View>

            <Text className="text-sm text-neutral-gray-500 dark:text-neutral-gray-200">
              {timeAgo}
            </Text>
          </View>
        </View>

        <ReportStatusBadge status={status} />
      </View>
    </TouchableOpacity>
  )
}

export default ReportCard
