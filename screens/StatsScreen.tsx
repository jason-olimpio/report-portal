import React, { Fragment } from 'react';
import {Text, ScrollView, Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import { useTranslation } from 'react-i18next';

import {reportData} from '@store';

import {appColors} from "@config";
import {getMonthlyReportStats} from '@utils';

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
  };

  const monthLabels = monthNumbers.map(getMonthLabel);

  const renderBarChart = (data: number[], color: string) => (
    <BarChart
      data={{
        labels: monthLabels,
        datasets: [
          { data },
        ],
      }}
      width={screenWidth}
      height={240}
      yAxisLabel=""
      yAxisSuffix=""
      yLabelsOffset={40}
      chartConfig={{
        ...chartConfigBase,
        color: () => color,
      }}
      fromZero
      showBarTops
      showValuesOnTopOfBars
      withHorizontalLabels
      style={{borderRadius: 16, paddingTop: 24}}
    />
  );

  const chartSections: ChartSection[] = [
    { label: t('open'), data: open, color: appColors.system.emerald[600] },
    { label: t('closed'), data: closed, color: appColors.system.teal[600] },
  ];

  return (
    <ScrollView className="flex-1 p-8">
      <Text className="text-xl font-titillium-bold mb-4">{t('statsByMonth')}</Text>

      {chartSections.map(({ label, data, color }, idx) => (
        <Fragment key={label}>
          <Text className={`font-titillium-semibold${idx === 0 ? ' mt-2' : ' mt-6'}`}>{label}</Text>

          {renderBarChart(data, color)}
        </Fragment>
      ))}
    </ScrollView>
  );
};

export default StatsScreen;
