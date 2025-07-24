import React, {useState} from 'react'
import {TouchableOpacity} from 'react-native'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import {useNavigation} from '@react-navigation/native'

import {ConfirmCloseModal, ReportInfoContent} from '@components'
import {type Report, type ReportCardNavigationProp, StatusOption} from '@types'

import {useReports} from '@hooks'

type AdminReportInfoProps = {
  report: Report
}

const AdminReportInfo = ({report}: AdminReportInfoProps) => {
  const navigation = useNavigation<ReportCardNavigationProp>()
  const {setReports} = useReports()

  const [modalVisible, setModalVisible] = useState(false)

  const {id} = report

  const handlePress = () => navigation.navigate('ReportDetails', {reportId: id})

  const handleConfirmClose = () => {
    setReports((previousReports: Report[]) =>
      previousReports.map(item =>
        item.id === report.id
          ? {...item, status: StatusOption.Completed}
          : item,
      ),
    )

    setModalVisible(false)
  }

  return (
    <>
      <ReportInfoContent
        report={report}
        onPress={handlePress}
        rightContent={
          <TouchableOpacity
            className="p-2"
            onPress={() => setModalVisible(true)}>
            <MaterialIcons name="close" size={15} color="red" />
          </TouchableOpacity>
        }
      />

      <ConfirmCloseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmClose}
      />
    </>
  )
}

export default AdminReportInfo
