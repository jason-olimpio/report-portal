import React, {useState} from 'react'
import {Text, View, TouchableOpacity, Pressable, StyleSheet} from 'react-native'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import {useNavigation} from '@react-navigation/native'
import {useTranslation} from 'react-i18next'
import {format} from 'date-fns'

import {
  ConfirmCloseModal,
  ReportPriorityBadge,
  ReportStatusBadge,
} from '@components'
import {type Report, StatusOption, type ReportCardNavigationProp} from '@types'

import {useReports, useTheme} from '@hooks'
import {appColors} from '@config'
import {getLocaleForDateFns} from '@utils'

type AdminReportInfoProps = {
  report: Report
  menuOpenId?: string | null
  setMenuOpenId?: (id: string | null) => void
}

const AdminReportInfo = ({
  report,
  menuOpenId,
  setMenuOpenId,
}: AdminReportInfoProps) => {
  const {t, i18n} = useTranslation()
  const {isDark} = useTheme()
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation<ReportCardNavigationProp>()

  const {id, title, address, date, status, priority} = report

  const locale = getLocaleForDateFns(i18n.resolvedLanguage)
  const formattedDate = format(date, 'PPP', {locale})

  const handleMenuToggle = () => setMenuOpenId?.(menuOpenId === id ? null : id)

  const handleManage = () => {
    setMenuOpenId?.(null)
    navigation.navigate('ReportDetails', {reportId: id})
  }

  const handleClose = () => {
    setMenuOpenId?.(null)
    setModalVisible(true)
  }

  const {setReports} = useReports()

  const handleConfirmClose = () => {
    setReports((previousReports: Report[]) =>
      previousReports.map(item =>
        item.id === id ? {...item, status: StatusOption.Completed} : item,
      ),
    )

    setModalVisible(false)
  }

  const renderMenu = () => (
    <Pressable className="z-[9999]" onPress={handleMenuToggle}>
      <View
        style={styles.menuShadow}
        className="absolute items-center right-4 -top-14 bg-white dark:bg-neutral-800 rounded-xl shadow-lg">
        <TouchableOpacity
          className="flex-row items-center px-4 pt-2"
          onPress={handleManage}>
          <MaterialIcons name="settings" size={15} />

          <Text className="ml-1 text-sm">{t('menu.manage')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center px-4 py-2"
          onPress={handleClose}>
          <MaterialIcons name="close" size={15} color="red" />

          <Text className="ml-1 text-red-500 text-sm">{t('menu.close')}</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  )

  return (
    <>
      <Pressable
        className="bg-background-secondaryLight dark:bg-background-secondaryDark 
        flex-row mb-4 rounded-3xl shadow-md p-4 items-center justify-between relative"
        onPress={() => {
          if (menuOpenId === id) setMenuOpenId?.(null)
        }}>
        <View className="flex-1">
          <Text className="font-bold text-base dark:text-white">{title}</Text>

          <View className="flex-row items-center">
            <MaterialIcons
              name="location-on"
              size={12}
              color={
                isDark
                  ? appColors.neutral.gray[200]
                  : appColors.neutral.gray[500]
              }
            />

            <Text className="text-xs text-gray-400 dark:text-gray-200">
              {address}
            </Text>
          </View>

          <Text className="text-xs text-gray-400 dark:text-gray-200">
            {formattedDate}
          </Text>
        </View>

        <View className="flex-row items-center ml-4">
          <View className="flex flex-col items-center">
            <ReportStatusBadge status={status} />

            {priority && (
              <ReportPriorityBadge priority={priority} className="mt-2" />
            )}
          </View>

          <TouchableOpacity className="p-2" onPress={handleMenuToggle}>
            <MaterialIcons name="more-horiz" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </Pressable>

      {menuOpenId === id && (
        <>
          <Pressable
            className="absolute inset-0 z-[9998]"
            onPress={() => setMenuOpenId?.(null)}
          />

          {renderMenu()}
        </>
      )}

      <ConfirmCloseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmClose}
      />
    </>
  )
}

export default AdminReportInfo

const styles = StyleSheet.create({
  menuShadow: {
    elevation: 10,
  },
})
