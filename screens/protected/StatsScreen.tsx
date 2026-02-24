import React, {useMemo, useState} from 'react'
import {ScrollView, StyleSheet, Text} from 'react-native'
import {useTranslation} from 'react-i18next'

import {reportData} from '@store'
import {useAuth, useTheme} from '@hooks'
import {Leaderboard, SegmentedTabs, MonthlyBarChartCard} from '@components'
import {appColors} from '@config'
import {getLocalizedCalendarLabels, getMonthlyReportStats} from '@utils'
import {UserRank} from '@types'

type TabValue = 'open' | 'closed'

const StatsScreen = () => {
  const {t} = useTranslation()
  const {isDark} = useTheme()
  const {user} = useAuth()

  const {open, closed, months} = getMonthlyReportStats(reportData)
  const localizedLabels = getLocalizedCalendarLabels(t)

  const monthLabels = useMemo(
    () =>
      months
        .filter((m): m is number => m !== undefined)
        .map(m => localizedLabels.months[m - 1].substring(0, 3)),
    [months, localizedLabels.months],
  )

  const totalOpen = useMemo(() => open.reduce((sum, n) => sum + n, 0), [open])
  const totalClosed = useMemo(
    () => closed.reduce((sum, n) => sum + n, 0),
    [closed],
  )

  const [tab, setTab] = useState<TabValue>('open')

  const handleTabChange = (next: TabValue) => setTab(next)
  const chartData = tab === 'open' ? open : closed

  const chartColor =
    tab === 'open'
      ? isDark
        ? appColors.system.emerald[600].dark
        : appColors.system.emerald[600].light
      : isDark
        ? appColors.system.teal[600].dark
        : appColors.system.teal[600].light

  return (
    <ScrollView
      className="flex-1 px-8 pt-6 bg-background-light dark:bg-background-dark"
      contentContainerStyle={styles.contentContainer}>
      <Text className="text-xl dark:text-white font-titillium-bold mb-4">
        {t('stats.statsByMonth')}
      </Text>

      <SegmentedTabs
        value={tab}
        onChange={handleTabChange}
        openLabel={t('status.open')}
        closedLabel={t('status.closed')}
        openCount={totalOpen}
        closedCount={totalClosed}
      />

      <MonthlyBarChartCard
        monthLabels={monthLabels}
        data={chartData}
        color={chartColor}
      />

      {user?.rank === UserRank.Admin && <Leaderboard />}
    </ScrollView>
  )
}

export default StatsScreen

const styles = StyleSheet.create({
  contentContainer: {flexGrow: 1, paddingBottom: 40},
})
