import {format} from 'date-fns'
import React, {ReactNode} from 'react'
import {useTranslation} from 'react-i18next'
import {TouchableOpacity, View, Text} from 'react-native'
import MaterialIcons from '@react-native-vector-icons/material-icons'

import {ReportStatusBadge, ReportPriorityBadge} from './badge'

import {appColors} from '@config'
import {useTheme} from '@hooks'
import {getLocaleForDateFns} from '@utils'
import type {Report} from '@types'

type ReportInfoContentProps = {
  report: Report
  onPress?: () => void
  rightContent?: ReactNode
}

const ReportInfoContent = ({
  report,
  onPress,
  rightContent,
}: ReportInfoContentProps) => {
  const {i18n} = useTranslation()
  const {isDark} = useTheme()

  const {title, address, date, status, priority} = report

  const locale = getLocaleForDateFns(i18n.resolvedLanguage)
  const formattedDate = format(date, 'PPP', {locale})

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-background-secondaryLight dark:bg-background-secondaryDark 
        flex-row mb-4 rounded-lg shadow-md p-4 items-center justify-between relative">
      <View className="flex-1">
        <Text className="font-titillium-bold text-base dark:text-white">
          {title}
        </Text>

        <View className="flex-row items-center">
          <MaterialIcons
            name="location-on"
            size={12}
            color={
              isDark ? appColors.neutral.gray[200] : appColors.neutral.gray[500]
            }
          />

          <Text className="font-titillium-regular text-xs text-gray-400 dark:text-gray-200">
            {address}
          </Text>
        </View>

        <Text className="font-titillium-regular text-xs text-gray-400 dark:text-gray-200">
          {formattedDate}
        </Text>
      </View>

      <View className="flex-row items-center ml-4">
        <View className="flex flex-col mr-1">
          <ReportStatusBadge status={status} />

          {priority && (
            <ReportPriorityBadge priority={priority} className="mt-2" />
          )}
        </View>

        {rightContent}
      </View>
    </TouchableOpacity>
  )
}

export default ReportInfoContent
