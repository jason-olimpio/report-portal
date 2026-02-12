import {View, Text} from 'react-native'
import {useTranslation} from 'react-i18next'

import {getPriorityLabel} from '@utils'

import {PriorityOption} from '@types'

type ReportPriorityBadgeProps = {
  priority: PriorityOption
  className?: string
}

const ReportPriorityBadge = ({
  priority,
  className,
}: ReportPriorityBadgeProps) => {
  const {t} = useTranslation()

  const colors = {
    bg: 'bg-white dark:bg-neutral-gray-500',
    text: 'text-black dark:text-white',
  }

  const label = getPriorityLabel(priority, t) || t('unknown')

  return (
    <View
      className={`flex-row items-center justify-center ${colors.bg} px-3 py-0.5
    rounded-full drop-shadow-lg border border-neutral-500 ${className}`}>
      <Text className={`${colors.text} font-titillium-bold text-xs`}>
        {label}
      </Text>
    </View>
  )
}

export default ReportPriorityBadge
