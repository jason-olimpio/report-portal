import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import {useTranslation} from 'react-i18next';

type LanguagePickerProps = {
  visible: boolean;
  onClose: () => void;
};

type Language = {
  code: string;
  label: string;
  flag: string;
};

const LanguagePicker = ({visible, onClose}: LanguagePickerProps) => {
  const {t, i18n} = useTranslation();

  const languages: Language[] = [
    {
      code: 'en',
      label: 'English',
      flag: '🇬🇧',
    },
    {
      code: 'it',
      label: 'Italiano',
      flag: '🇮🇹',
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
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/40">
          <TouchableWithoutFeedback>
            <View className="bg-white dark:bg-background-secondaryDark rounded-lg p-6 w-72 items-center">
              <Text className="text-lg font-titillium-bold mb-6 text-center dark:text-white">
                {t('settings.selectLanguage')}
              </Text>

              {languages.map(({code, label, flag}) => (
                <TouchableOpacity
                  key={code}
                  className="flex-row items-center justify-center mb-3 w-full"
                  onPress={() => handleSwitch(code)}>
                  <Text className="text-xl text-center mr-2">{flag}</Text>

                  <Text className="text-base font-titillium-semibold dark:text-white text-center">
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                className="mt-2 items-center w-full justify-center"
                onPress={onClose}>
                <Text
                  className="text-base text-system-red-600-light 
                dark:text-system-red-600-dark font-titillium-bold text-center">
                  {t('forms.cancel')}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LanguagePicker;
