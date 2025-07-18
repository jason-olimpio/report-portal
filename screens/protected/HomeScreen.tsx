import {Text, ScrollView} from 'react-native'
import {useTranslation} from 'react-i18next'

import {
  CommunityImpactSection,
  EnvironmentalStatusSection,
  QuickActions,
  RecentReports,
} from '@components'

const HomeScreen = () => {
  const {i18n} = useTranslation()

  const currentDate = new Date()

  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(currentDate)

  return (
    <ScrollView className="flex-1 bg-background-light dark:bg-background-dark px-8 pt-6">
      <Text className="text-neutral-gray-500 dark:text-white text-center font-titillium-light text-sm mb-6">
        {formattedDate}
      </Text>

      <EnvironmentalStatusSection />

      <QuickActions />

      <RecentReports />

      <CommunityImpactSection
        reports={127}
        solvedReports={89}
        successRate={70}
      />
    </ScrollView>
  )
}

export default HomeScreen
