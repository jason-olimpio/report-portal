import {Text, View} from 'react-native'
import {useTranslation} from 'react-i18next'

import {ReportCard} from '@components'
import type {Report} from '@types'

type ReportListProps = {
  reports: Report[]
}

const ReportList = ({reports}: ReportListProps) => {
  const {t} = useTranslation()

  if (reports.length === 0) {
    return (
      <Text className="text-center mt-5 text-base text-gray-500 dark:text-gray-200">
        {t('reports.noReportFound')}
      </Text>
    )
  }

  return (
    <View className="w-full">
      {reports.map(({id, images, title, address, date, status}) => (
        <ReportCard
          key={id}
          id={id}
          images={images}
          title={title}
          address={address}
          date={date}
          status={status}
        />
      ))}
    </View>
  )
}

export default ReportList
