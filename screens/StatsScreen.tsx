import React, {Fragment} from 'react';
import {Text, ScrollView, Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {useTranslation} from 'react-i18next';

import {reportData} from '@store';
import {useTheme} from '@hooks';

import {appColors} from '@config';
import {getMonthLabel, getMonthlyReportStats} from '@utils';

const chartConfigBase = {
  backgroundColor: 'white',
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  decimalPlaces: 0,
  barPercentage: 0.5,
};

type ChartSection = {
  label: string;
  data: number[];
  color: string;
};

const StatsScreen = () => {
  const {t} = useTranslation();
  const {open, closed, months} = getMonthlyReportStats(reportData);
  const screenWidth = Dimensions.get('window').width - 50;
  const {isDark} = useTheme();

  const monthLabels = months
    .filter((month): month is number => month !== undefined)
    .map(month => getMonthLabel(month, t));

  const renderBarChart = (data: number[], color: string) => (
    <BarChart
      data={{
        labels: monthLabels,
        datasets: [{data}],
      }}
      width={screenWidth}
      height={240}
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
      }}
      fromZero
      showBarTops
      showValuesOnTopOfBars
      withHorizontalLabels
      style={styles.chart}
    />
  );

  const chartSections: ChartSection[] = [
    {
      label: t('open'),
      data: open,
      color: isDark
        ? appColors.system.emerald[600].dark
        : appColors.system.emerald[600].light,
    },
    {
      label: t('closed'),
      data: closed,
      color: isDark
        ? appColors.system.teal[600].dark
        : appColors.system.teal[600].light,
    },
  ];

  return (
    <ScrollView className="flex-1 p-8 bg-background-light dark:bg-background-dark">
      <Text className="text-xl dark:text-white font-titillium-bold mb-4">
        {t('statsByMonth')}
      </Text>

      {chartSections.map(({label, data, color}, idx) => (
        <Fragment key={label}>
          <Text
            className={`dark:text-white font-titillium-semibold${idx === 0 ? ' mt-2' : ' mt-6'}`}>
            {label}
          </Text>

          {renderBarChart(data, color)}
        </Fragment>
      ))}
    </ScrollView>
  );
};

export default StatsScreen;

const styles = {
  chart: {borderRadius: 16, paddingTop: 24},
};
