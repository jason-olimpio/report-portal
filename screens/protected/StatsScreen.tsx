/**
 * StatsScreen.tsx
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Displays monthly report statistics with bar charts for open and closed reports.
 * Shows leaderboard for admin users.
 */

import {Fragment, useState} from 'react'
import {Text, ScrollView, View, StyleSheet} from 'react-native'
import {CartesianChart, Bar} from 'victory-native'
import {useTranslation} from 'react-i18next'

import {reportData} from '@store'
import {useTheme, useAuth} from '@hooks'

import {Leaderboard} from '@components'

import {appColors} from '@config'
import {getLocalizedCalendarLabels, getMonthlyReportStats} from '@utils'
import {UserRank} from '@types'

type ExpandedChartContent = {
  key: ExpandedChart
  visible: boolean
  label: string
  data: number[]
  color: string
}

enum ExpandedChart {
  Open,
  Closed,
}

const StatsScreen = () => {
  const {t} = useTranslation()
  const {isDark} = useTheme()
  const {user} = useAuth()

  const {open, closed, months} = getMonthlyReportStats(reportData)

  const localizedLabels = getLocalizedCalendarLabels(t)

  const monthLabels = months
    .filter((month): month is number => month !== undefined)
    .map(month => localizedLabels.months[month - 1].substring(0, 3))

  const renderBarChart = (data: number[], color: string) => {
    const chartData = [
      {x: '', y: 0},
      ...monthLabels.map((label, i) => ({
        x: label,
        y: data[i] ?? 0,
      })),
      {x: '', y: 0},
    ]

    const maxY = Math.max(...data, 5)
    const minY = 0
    const steps = 5
    const stepSize = Math.ceil((maxY - minY) / (steps - 1)) || 1
    const yTicks = Array.from({length: steps}, (_, i) => maxY - i * stepSize)

    return (
      <View className="my-4 items-center">
        <View className="w-full">
          <View className="bg-white/70 dark:bg-gray-900/60 rounded-2xl shadow-sm py-6 items-center">
            <View className="flex-row w-full items-center">
              <View className="h-56 justify-between items-end mr-1 py-2">
                {yTicks.map((tick, idx) => (
                  <Text
                    key={idx}
                    className="text-xs text-gray-400 dark:text-gray-500 
                    font-titillium-semibold text-right min-w-[24px]">
                    {tick}
                  </Text>
                ))}
              </View>

              <View className="h-56 flex-1 px-2">
                <CartesianChart data={chartData} xKey="x" yKeys={['y']}>
                  {({points, chartBounds}) => (
                    <Bar
                      points={points.y}
                      chartBounds={chartBounds}
                      color={color}
                      barWidth={9}
                      roundedCorners={{topLeft: 6, topRight: 6}}
                    />
                  )}
                </CartesianChart>
              </View>
            </View>

            <View className="flex-row items-center mt-1 w-full">
              <View className="min-w-[24px] mr-1" />
              {['', ...monthLabels, ''].map((label, idx) => (
                <Text
                  key={idx}
                  className="flex-1 text-xs text-gray-500 dark:text-gray-300 font-titillium-semibold text-center">
                  {label}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    )
  }

  const totalOpen = open.reduce((sum, count) => sum + count, 0)
  const totalClosed = closed.reduce((sum, count) => sum + count, 0)

  const [expandedChart, setExpandedChart] = useState<ExpandedChart>(
    ExpandedChart.Open,
  )

  const expandedChartContent: ExpandedChartContent[] = [
    {
      key: ExpandedChart.Open,
      visible: expandedChart === ExpandedChart.Open,
      label: t('status.open'),
      data: open,
      color: isDark
        ? appColors.system.emerald[600].dark
        : appColors.system.emerald[600].light,
    },
    {
      key: ExpandedChart.Closed,
      visible: expandedChart === ExpandedChart.Closed,
      label: t('status.closed'),
      data: closed,
      color: isDark
        ? appColors.system.teal[600].dark
        : appColors.system.teal[600].light,
    },
  ]

  return (
    <ScrollView
      className="flex-1 px-8 pt-6 bg-background-light dark:bg-background-dark"
      contentContainerStyle={styles.contentContainer}>
      <Text className="text-xl dark:text-white font-titillium-bold mb-4">
        {t('stats.statsByMonth')}
      </Text>

      <View className="flex-row justify-center items-center mb-4">
        <View
          className="flex-row bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden border 
        border-gray-300 dark:border-gray-700">
          <Text
            className={`px-6 py-2 font-titillium-bold text-center ${
              expandedChart === ExpandedChart.Open
                ? 'bg-white dark:bg-emerald-800 text-emerald-700 dark:text-emerald-100 shadow-sm z-10 rounded-l-xl'
                : 'text-emerald-700 dark:text-emerald-200 opacity-70'
            }`}
            onPress={() => setExpandedChart(ExpandedChart.Open)}>
            {t('status.open')} ({totalOpen})
          </Text>

          <Text
            className={`px-6 py-2 font-titillium-bold text-center ${
              expandedChart === ExpandedChart.Closed
                ? 'bg-white dark:bg-teal-800 text-teal-700 dark:text-teal-100 shadow-sm z-10 rounded-r-xl'
                : 'text-teal-700 dark:text-teal-200 opacity-70'
            }`}
            onPress={() => setExpandedChart(ExpandedChart.Closed)}>
            {t('status.closed')} ({totalClosed})
          </Text>
        </View>
      </View>

      {expandedChartContent
        .filter(item => item.visible)
        .map(({key, data, color}) => (
          <Fragment key={key}>{renderBarChart(data, color)}</Fragment>
        ))}

      {user?.rank === UserRank.Admin && <Leaderboard />}
    </ScrollView>
  )
}

export default StatsScreen

const styles = StyleSheet.create({
  contentContainer: {flexGrow: 1, paddingBottom: 40},
})
