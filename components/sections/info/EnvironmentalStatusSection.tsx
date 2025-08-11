/**
 * EnvironmentalStatusSection.tsx
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Component for displaying environmental status information.
 * Shows cards for green areas, recycling, water quality, and air quality.
 */

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

const EnvironmentalStatusSection = () => {
  const {isDark} = useTheme()
  const {t} = useTranslation()

  const statusData: StatusData[] = [
    {
      icon: 'park',
      iconColor: isDark
        ? appColors.system.emerald[600].dark
        : appColors.system.emerald[600].light,
      title: t('environmentalStatus.greenAreas'),
      value: '85%',
      subInfo: t('environmentalStatus.growthThisMonth', {value: '+2%'}),
      bgColorClass: isDark
        ? 'bg-system-emerald-50-dark'
        : 'bg-system-emerald-50-light',
      valueColorClass: isDark
        ? 'text-system-emerald-600-dark'
        : 'text-system-emerald-600-light',
    },
    {
      icon: 'recycling',
      iconColor: isDark
        ? appColors.system.orange[600].dark
        : appColors.system.orange[600].light,
      title: t('environmentalStatus.recycling'),
      value: '73%',
      subInfo: t('environmentalStatus.monthlyRate'),
      bgColorClass: isDark
        ? 'bg-system-orange-50-dark'
        : 'bg-system-orange-50-light',
      valueColorClass: isDark
        ? 'text-system-orange-600-dark'
        : 'text-system-orange-600-light',
    },
    {
      icon: 'water',
      iconColor: isDark
        ? appColors.system.teal[600].dark
        : appColors.system.teal[600].light,
      title: t('environmentalStatus.water'),
      value: t('environmentalStatus.waterQualityValue'),
      subInfo: t('environmentalStatus.waterQuality', {value: '98%'}),
      bgColorClass: isDark
        ? 'bg-system-teal-50-dark'
        : 'bg-system-teal-50-light',
      valueColorClass: isDark
        ? 'text-system-teal-600-dark'
        : 'text-system-teal-600-light',
    },
    {
      icon: 'air',
      iconColor: isDark
        ? appColors.system.red[600].dark
        : appColors.system.red[600].light,
      title: t('environmentalStatus.air'),
      value: t('environmentalStatus.airQualityValue'),
      subInfo: t('environmentalStatus.airQuality', {value: 'PM 2.5: 12μg/m³'}),
      bgColorClass: isDark ? 'bg-system-red-50-dark' : 'bg-system-red-50-light',
      valueColorClass: isDark
        ? 'text-system-red-600-dark'
        : 'text-system-red-600-light',
    },
  ]

  return (
    <View className="bg-background-secondaryLight dark:bg-background-secondaryDark p-4 rounded-lg shadow-lg">
      <SectionHeader
        title={t('environmentalStatus.title')}
        action={t('environmentalStatus.updatedToday')}
        onPress={() => null}
        className="mb-2"
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
              key={title}
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

export default EnvironmentalStatusSection
