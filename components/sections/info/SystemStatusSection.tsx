import {ComponentProps} from 'react'
import {View} from 'react-native'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import {useTranslation} from 'react-i18next'

import {SectionHeader, InfoCardWidget} from '@components'

import {useTheme} from '@hooks'
import {appColors} from '@config'

type StatusData = {
  icon: ComponentProps<typeof MaterialIcons>['name']
  iconColor: string
  title: string
  value: string
  subInfo: string
  bgColorClass: string
  valueColorClass: string
}

const SystemStatusSection = () => {
  const {isDark} = useTheme()
  const {t} = useTranslation()

  const statusData: StatusData[] = [
    {
      icon: 'report-problem',
      iconColor: isDark
        ? appColors.system.red[600].dark
        : appColors.system.red[600].light,
      title: t('reportStatus.incidents'),
      value: t('reportStatus.incidentsValue', {value: '3 open'}),
      subInfo: t('reportStatus.incidentsSubInfo', {value: '2 need action'}),
      bgColorClass: isDark ? 'bg-system-red-50-dark' : 'bg-system-red-50-light',
      valueColorClass: isDark
        ? 'text-system-red-600-dark'
        : 'text-system-red-600-light',
    },
    {
      icon: 'insights',
      iconColor: isDark
        ? appColors.system.teal[600].dark
        : appColors.system.teal[600].light,
      title: t('reportStatus.score'),
      value: t('reportStatus.scoreValue', {value: '78/100'}),
      subInfo: t('reportStatus.scoreSubInfo', {value: '+4 vs last week'}),
      bgColorClass: isDark
        ? 'bg-system-teal-50-dark'
        : 'bg-system-teal-50-light',
      valueColorClass: isDark
        ? 'text-system-teal-600-dark'
        : 'text-system-teal-600-light',
    },
    {
      icon: 'check-circle',
      iconColor: isDark
        ? appColors.system.emerald[600].dark
        : appColors.system.emerald[600].light,
      title: t('reportStatus.completion'),
      value: t('reportStatus.completionValue', {value: '92%'}),
      subInfo: t('reportStatus.completionSubInfo', {value: '46/50 tasks'}),
      bgColorClass: isDark
        ? 'bg-system-emerald-50-dark'
        : 'bg-system-emerald-50-light',
      valueColorClass: isDark
        ? 'text-system-emerald-600-dark'
        : 'text-system-emerald-600-light',
    },
    {
      icon: 'schedule',
      iconColor: isDark
        ? appColors.system.orange[600].dark
        : appColors.system.orange[600].light,
      title: t('reportStatus.avgResolutionTime'),
      value: t('reportStatus.avgResolutionTimeValue', {value: '18m'}),
      subInfo: t('reportStatus.avgResolutionTimeSubInfo', {
        value: '-6m vs last week',
      }),
      bgColorClass: isDark
        ? 'bg-system-orange-50-dark'
        : 'bg-system-orange-50-light',
      valueColorClass: isDark
        ? 'text-system-orange-600-dark'
        : 'text-system-orange-600-light',
    },
  ]

  return (
    <View className="bg-background-secondaryLight dark:bg-background-secondaryDark p-4 rounded-lg shadow-lg">
      <SectionHeader
        title={t('reportStatus.title')}
        action={t('reportStatus.updatedToday')}
        onPress={() => null}
        className="mb-2 pointer-events-none"
      />

      <View className="flex-row flex-wrap">
        {statusData.map(
          ({
            icon,
            iconColor,
            title,
            value,
            subInfo,
            bgColorClass,
            valueColorClass,
          }) => (
            <InfoCardWidget
              key={icon}
              icon={icon}
              iconColor={iconColor}
              title={title}
              value={value}
              subInfo={subInfo}
              bgColorClass={bgColorClass}
              valueColorClass={valueColorClass}
            />
          ),
        )}
      </View>
    </View>
  )
}

export default SystemStatusSection
