import {Modal, TouchableOpacity, View, Text, TouchableWithoutFeedback} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import {useTranslation} from 'react-i18next';

import {useTheme} from '@hooks';

import {appColors} from '@config';

type LanguagePickerProps = {
  visible: boolean;
  onClose: () => void;
}

type Language = {
  code: string;
  label: string;
  iconColor: string;
};

const LanguagePicker = ({visible, onClose}: LanguagePickerProps) => {
  const {t, i18n} = useTranslation();
  const {isDark} = useTheme()

  const languages: Language[] = [
    {
      code: 'en',
      label: 'English',
      iconColor: isDark ? appColors.system.red[600].dark : appColors.system.red[600].light,
    },
    {
      code: 'it',
      label: 'Italiano',
      iconColor: isDark ? appColors.system.emerald[600].dark : appColors.system.emerald[600].light,
    },
  ];

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
            <View className="bg-white dark:bg-background-secondaryDark rounded-lg p-6 w-72">
              <Text className="text-lg font-titillium-bold mb-6 text-center dark:text-white">
                {t('selectLanguage')}
              </Text>

              {languages.map(({ code, label, iconColor }) => (
                <TouchableOpacity
                  key={code}
                  className="flex-row items-center mb-3"
                  onPress={() => handleSwitch(code)}
                >
                  <MaterialIcons name="emoji-flags" size={20} color={iconColor} style={styles.icon} />

                  <Text className="text-base font-titillium-semibold dark:text-white">{label}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                className="mt-6 items-center"
                onPress={onClose}
              >
                <Text className="text-base text-gray-500 dark:text-gray-300 font-titillium-bold">{t('cancel')}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = {
  icon: { marginRight: 6 },
};

export default LanguagePicker;
