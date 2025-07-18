import {View, Text} from 'react-native'
import {useTranslation} from 'react-i18next'

import {getStatusLabel} from '@utils'
import {useTheme} from '@hooks'

import {StatusOption} from '@types'

type StatusColor = Exclude<StatusOption, StatusOption.All>

const REPORT_STATUS_COLORS: Record<
  StatusColor,
  {bg: string; bgDark: string; text: string; textDark: string}
> = {
  [StatusOption.Pending]: {
    bg: 'bg-system-orange-50-light',
    bgDark: 'bg-system-orange-50-dark',
    text: 'text-system-orange-600-light',
    textDark: 'text-system-orange-600-dark',
  },
  [StatusOption.Completed]: {
    bg: 'bg-system-emerald-50-light',
    bgDark: 'bg-system-emerald-50-dark',
    text: 'text-system-emerald-600-light',
    textDark: 'text-system-emerald-600-dark',
  },
  [StatusOption.Working]: {
    bg: 'bg-system-teal-50-light',
    bgDark: 'bg-system-teal-50-dark',
    text: 'text-system-teal-600-light',
    textDark: 'text-system-teal-600-dark',
  },
}

type ReportStatusBadgeProps = {
  status: StatusOption
}

const ReportStatusBadge = ({status}: ReportStatusBadgeProps) => {
  const {t} = useTranslation()
  const {isDark} = useTheme()

  const colors =
    status in REPORT_STATUS_COLORS
      ? REPORT_STATUS_COLORS[status as StatusColor]
      : {
          bg: 'bg-gray-600',
          bgDark: 'bg-gray-800',
          text: 'text-white',
          textDark: 'text-white',
        }

  const label = getStatusLabel(status, t) || t('unknown')

  return (
    <View
      className={`flex-row items-center ${isDark ? colors.bgDark : colors.bg} px-3 py-0.5 rounded-full`}>
      <Text className={`${isDark ? colors.textDark : colors.text} text-xs`}>
        {label}
      </Text>
    </View>
  )
}

export default ReportStatusBadge
