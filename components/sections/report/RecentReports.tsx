import {View} from 'react-native'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {useTranslation} from 'react-i18next'

import {ReportList, SectionHeader} from '@components'

import {useReports} from '@hooks'

import {StatusOption, type MainTabParamList} from '@types'

const RecentReports = () => {
  const {reports} = useReports()
  const {t} = useTranslation()

  const navigation = useNavigation<NavigationProp<MainTabParamList>>()
  const recentReports = [...reports]
    .filter(({status}) => status !== StatusOption.Completed)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 3)

  const navigateToAllReports = () => navigation.navigate('Reports')

  return (
    <View className="mb-2">
      <SectionHeader
        title={t('reports.recentReports')}
        action={t('reports.viewAll')}
        onPress={navigateToAllReports}
        className="mb-6"
      />

      <ReportList reports={recentReports} />
    </View>
  )
}

export default RecentReports
