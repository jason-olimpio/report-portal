import {Fragment, useState, useEffect} from 'react'
import {Text, ScrollView, Dimensions} from 'react-native'
import {BarChart} from 'react-native-chart-kit'
import {useTranslation} from 'react-i18next'
import type {ChartConfig} from 'react-native-chart-kit/dist/HelperTypes'

import {reportData} from '@store'
import {useTheme} from '@hooks'

import {appColors} from '@config'
import {getMonthLabel, getMonthlyReportStats} from '@utils'

const chartConfigBase: ChartConfig = {
  backgroundColor: 'white',
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  decimalPlaces: 0,
  barPercentage: 0.5,
}

type ChartSection = {
  label: string
  data: number[]
  color: string
}

const StatsScreen = () => {
  const {t} = useTranslation()
  const {open, closed, months} = getMonthlyReportStats(reportData)
  const {isDark} = useTheme()

  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width - 60,
  )

  useEffect(() => {
    const onChange = ({window}: {window: {width: number}}) =>
      setScreenWidth(window.width - 60)

    const subscription = Dimensions.addEventListener('change', onChange)

    return () => subscription.remove()
  }, [])

  const monthLabels = months
    .filter((month): month is number => month !== undefined)
    .map(month => getMonthLabel(month, t))
    .map(label => label.substring(0, 3))

  const renderBarChart = (data: number[], color: string) => (
    <BarChart
      data={{
        labels: monthLabels,
        datasets: [{data}],
      }}
      width={screenWidth}
      height={280}
      yAxisLabel=""
      yAxisSuffix=""
      yLabelsOffset={40}
      chartConfig={{
        ...chartConfigBase,
        backgroundColor: isDark
          ? appColors.background.secondaryDark
          : appColors.background.secondaryLight,
        backgroundGradientFrom: isDark
          ? appColors.background.secondaryDark
          : appColors.background.secondaryLight,
        backgroundGradientTo: isDark
          ? appColors.background.secondaryDark
          : appColors.background.secondaryLight,
        color: () => color,
        labelColor: () =>
          isDark ? appColors.text.primary.dark : appColors.text.primary.light,
        propsForVerticalLabels: {
          fontSize: 10,
        },
        propsForHorizontalLabels: {
          fontSize: 12,
        },
      }}
      fromZero
      showBarTops
      showValuesOnTopOfBars
      withHorizontalLabels
      style={styles.chart}
    />
  )

  const chartSections: ChartSection[] = [
    {
      label: t('status.open'),
      data: open,
      color: isDark
        ? appColors.system.emerald[600].dark
        : appColors.system.emerald[600].light,
    },
    {
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

      {chartSections.map(({label, data, color}) => (
        <Fragment key={label}>
          <Text className="dark:text-white font-titillium-semibold mt-2">
            {label}
          </Text>

          {renderBarChart(data, color)}
        </Fragment>
      ))}
    </ScrollView>
  )
}

export default StatsScreen

const styles = {
  chart: {borderRadius: 16, paddingTop: 24, paddingBottom: 20},
  contentContainer: {flexGrow: 1, paddingBottom: 40},
}
