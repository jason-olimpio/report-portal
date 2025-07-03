import React from 'react';
import {Text, ScrollView, Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import { useTranslation } from 'react-i18next';

import {reportData} from '@store';

import {appColors} from "@config";
import {getMonthlyReportStats} from '@utils';

const StatsScreen = () => {
  const { t } = useTranslation();
  const {open, closed, monthNumbers} = getMonthlyReportStats(reportData);
  const screenWidth = Dimensions.get('window').width - 50;

  const monthKeys = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  const getMonthLabel = (number?: number) => {
    if (!number) return '';

    const key = monthKeys[number - 1];

    return t(`months.${key}`);
  }

  const monthLabels = monthNumbers.map(getMonthLabel);

  return (
    <ScrollView className="flex-1 p-8">
      <Text className="text-xl font-titillium-bold mb-4">{t('statsByMonth')}</Text>

      <Text className="font-titillium-semibold mt-2">{t('open')}</Text>

      <BarChart
        data={{
          labels: monthLabels,
          datasets: [
            {
              data: open,
            },
          ],
        }}
        width={screenWidth}
        height={240}
        yAxisLabel=""
        yAxisSuffix=""
        yLabelsOffset={40}
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 0,
          color: () => appColors.system.emerald[600],
          barPercentage: 0.5,
        }}
        fromZero
        showBarTops
        showValuesOnTopOfBars
        withHorizontalLabels
        style={{borderRadius: 16, paddingTop: 24}}
      />

      <Text className="font-titillium-semibold mt-6">{t('closed')}</Text>

      <BarChart
        data={{
          labels: monthLabels,
          datasets: [
            {
              data: closed,
            },
          ],
        }}
        width={screenWidth}
        height={240}
        yAxisLabel=""
        yAxisSuffix=""
        yLabelsOffset={40}
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 0,
          color: () => appColors.system.teal[600],
          barPercentage: 0.5,
        }}
        fromZero
        showBarTops
        showValuesOnTopOfBars
        withHorizontalLabels
        style={{borderRadius: 16, paddingTop: 24}}
      />
    </ScrollView>
  );
};

export default StatsScreen;
