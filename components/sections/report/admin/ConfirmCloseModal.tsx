import {Modal, Pressable, Text, TouchableOpacity, View} from 'react-native'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import {useTranslation} from 'react-i18next'

type ConfirmCloseModalProps = {
  visible: boolean
  onClose: () => void
  onConfirm: () => void
}

const ConfirmCloseModal = ({
  visible,
  onClose,
  onConfirm,
}: ConfirmCloseModalProps) => {
  const {t} = useTranslation()

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable
        className="flex-1 justify-center items-center bg-black bg-opacity-40"
        onPress={onClose}>
        <View
          className="bg-white justify-center items-center dark:bg-neutral-800 p-6 rounded-lg w-4/5"
          onStartShouldSetResponder={() => true}>
          <MaterialIcons name="priority-high" size={45} color="red" />

          <Text className="text-xl font-titillium-bold mb-8 mt-4 dark:text-white text-center">
            {t('modal.confirmCloseReport')}
          </Text>

          <View className="flex-row justify-end gap-2">
            <TouchableOpacity
              className="px-6 py-3 mr-2 rounded-full bg-system-red-600-light dark:bg-system-red-600-dark"
              onPress={onConfirm}>
              <Text className="font-titillium-bold text-white">
                {t('common.yes')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="px-6 py-3 mr-2 rounded-full border 
              border-system-emerald-600-light dark:border-system-emerald-600-dark"
              onPress={onClose}>
              <Text className="font-titillium-bold text-system-emerald-600-light dark:text-system-emerald-600-dark">
                {t('common.no')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}

export default ConfirmCloseModal
