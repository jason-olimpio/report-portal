/**
 * Home Screen Component
 *
 * @author Jason Olimpio
 * @date August 11, 2025
 *
 * @description The main dashboard screen that users see after logging in.
 * Displays the current date, environmental status, quick actions for common tasks,
 * recent reports, and community impact metrics. Serves as the primary navigation
 * hub for the application.
 *
 * @component
 * @example
 * ```tsx
 * <HomeScreen />
 * ```
 */
import {JSX} from 'react'
import {Text, ScrollView} from 'react-native'
import {useTranslation} from 'react-i18next'

import {
  CommunityImpactSection,
  EnvironmentalStatusSection,
  QuickActions,
  RecentReports,
} from '@components'

/**
 * Main home screen component displaying dashboard information
 *
 * @returns {JSX.Element} The home screen with dashboard sections
 */
const HomeScreen = (): JSX.Element => {
  const {i18n} = useTranslation()

  /**
   * Get current date formatted according to user's language preference
   * @type {Date} Formatted date string
   */
  const currentDate: Date = new Date()

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
