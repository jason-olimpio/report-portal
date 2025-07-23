import {Text, View} from 'react-native'
import {useTranslation} from 'react-i18next'

import {ReportCard} from '@components'
import type {Report} from '@types'

type ReportListProps = {
  reports: Report[]
  menuOpenId?: string | null
  setMenuOpenId?: (id: string | null) => void
}

const ReportList = ({reports, menuOpenId, setMenuOpenId}: ReportListProps) => {
  const {t} = useTranslation()

  if (reports.length === 0)
    return (
      <Text className="text-center mt-5 text-base text-gray-500 dark:text-gray-200">
        {t('reports.noReportFound')}
      </Text>
    )

  return (
    <View className="w-full">
      {reports.map(report => (
        <ReportCard
          key={report.id}
          report={report}
          menuOpenId={menuOpenId}
          setMenuOpenId={setMenuOpenId}
        />
      ))}
    </View>
  )
}

export default ReportList
