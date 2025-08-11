/**
 * ReportList.tsx
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Component for displaying a list of reports.
 */

import {Text, View} from 'react-native'
import {useTranslation} from 'react-i18next'

import {ReportCard} from '@components'
import type {Report} from '@types'

type ReportListProps = {
  reports: Report[]
}

const ReportList = ({reports}: ReportListProps) => {
  const {t} = useTranslation()

  if (reports.length === 0)
    return (
      <Text className="font-titillium-regular text-center mt-5 text-base text-gray-500 dark:text-gray-200">
        {t('reports.noReportFound')}
      </Text>
    )

  return (
    <View className="w-full">
      {reports.map(report => (
        <ReportCard key={report.id} report={report} />
      ))}
    </View>
  )
}

export default ReportList
