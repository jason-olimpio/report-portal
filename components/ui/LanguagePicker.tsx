import {Modal, TouchableOpacity, View, Text, TouchableWithoutFeedback} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import {useTranslation} from 'react-i18next';

import {appColors} from '@config';

type LanguagePickerProps = {
  visible: boolean;
  onClose: () => void;
}

const LanguagePicker = ({visible, onClose}: LanguagePickerProps) => {
  const {t, i18n} = useTranslation();

  const handleSwitch = async (language: string) => {
      await i18n.changeLanguage(language);

      onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/40">
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-lg p-6 w-72">
              <Text className="text-lg font-titillium-bold mb-6 text-center">
                {t('selectLanguage')}
              </Text>

              <TouchableOpacity
                className="flex-row items-center mb-3"
                onPress={() => handleSwitch('en')}
              >
                <MaterialIcons name="flag" size={20} color={appColors.system.red[600]} style={{marginRight: 6}} />

                <Text className="text-base font-titillium-semibold">English</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => handleSwitch('it')}
              >
                <MaterialIcons name="flag" size={20} color={appColors.system.emerald[600]} style={{marginRight: 6}} />

                <Text className="text-base font-titillium-semibold">Italiano</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="mt-6 items-center"
                onPress={onClose}
              >
                <Text className="text-base text-gray-500 font-titillium-bold">{t('cancel')}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LanguagePicker;
