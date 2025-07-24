import {
  Image,
  Text,
  View,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useTranslation} from 'react-i18next'

import ReportInfoContent from './ReportInfoContent'
import {AdminReportInfo} from '@components'
import {useAuth} from '@hooks'
import {Report, UserRank, type ReportCardNavigationProp} from '@types'
import {getTimeAgo} from '@utils'
import {PlaceholderImage} from '@assets'

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

  const {id, images, date} = report

  const handlePress = () => navigation.navigate('ReportDetails', {reportId: id})
  const timeAgo = getTimeAgo(date, i18n.language, t)
  const source = getImageSource(images)

  if (user?.rank === UserRank.Admin) return <AdminReportInfo report={report} />

  return (
    <TouchableOpacity
      className="bg-white dark:bg-background-secondaryDark p-4 rounded-lg 
      shadow-lg mb-4 flex-row items-end justify-between"
      onPress={handlePress}
      activeOpacity={0.7}>
      <Image
        source={source}
        className="w-16 h-16 mr-4 rounded-full shadow-lg"
      />

      <View className="flex-1 min-w-0">
        <ReportInfoContent
          report={report}
          onPress={undefined}
          rightContent={null}
        />

        <Text className="font-titillium-regular text-sm text-neutral-gray-500 dark:text-neutral-gray-200">
          {timeAgo}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ReportCard
