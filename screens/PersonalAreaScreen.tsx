import {useState} from 'react';
import {ScrollView, Alert, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Pressable} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {z} from 'zod';

import {FormHandler, FieldConfig, LanguagePicker} from '@components';
import {useTheme} from '@hooks';

import {appColors} from '@config';

const PersonalAreaScreen = () => {
  const {t} = useTranslation();
  const {isDark, toggleTheme} = useTheme();

  const [languagePickerVisible, setLanguagePickerVisible] = useState(false);

  const schema = z
    .object({
      name: z.string().min(1, t('errors.nameRequired')),
      email: z.string().email(t('errors.emailInvalid')),
      currentPassword: z.string().min(6, t('errors.currentPasswordRequired')),
      confirmPassword: z.string().min(6, t('errors.confirmPasswordRequired')),
      image: z.array(z.string()).optional(),
    })
    .refine(data => data.currentPassword === data.confirmPassword, {
      message: t('errors.passwordsMustMatch'),
      path: ['confirmPassword'],
    });

  const initialState: z.infer<typeof schema> = {
    name: '',
    email: '',
    currentPassword: '',
    confirmPassword: '',
    image: undefined,
  };

  const fields: FieldConfig[] = [
    {key: 'image', label: t('image'), isImageSlider: true, maxImages: 1},
    {key: 'name', label: t('name')},
    {
      key: 'email',
      label: t('email'),
      inputProps: {keyboardType: 'email-address', autoCapitalize: 'none'},
    },
    {
      key: 'currentPassword',
      label: t('currentPassword'),
      inputProps: {secureTextEntry: true},
    },
    {
      key: 'confirmPassword',
      label: t('confirmPassword'),
      inputProps: {secureTextEntry: true},
    },
  ];

  return (
    <ScrollView className="flex-1 p-8 mb-10 bg-background-light dark:bg-background-dark">
      <Pressable
        onPress={() => setLanguagePickerVisible(true)}
        className="self-start flex-row items-center mb-6">
        <MaterialIcons
          name="language"
          size={20}
          color={isDark ? appColors.primary.light : appColors.primary.dark}
        />

        <Text className="text-primary font-titillium-bold ml-1 dark:text-white">
          {t('changeLanguage')}
        </Text>
      </Pressable>

      <Pressable
        onPress={toggleTheme}
        className="self-start flex-row items-center mb-6">
        <MaterialIcons
          name={isDark ? 'dark-mode' : 'light-mode'}
          size={20}
          color={isDark ? appColors.primary.light : appColors.primary.dark}
        />
        <Text className="text-primary font-titillium-bold ml-1 dark:text-white">
          {isDark ? t('switchToLightMode') : t('switchToDarkMode')}
        </Text>
      </Pressable>

      <LanguagePicker
        visible={languagePickerVisible}
        onClose={() => setLanguagePickerVisible(false)}
      />

      <FormHandler
        schema={schema}
        initialState={initialState}
        fields={fields}
        onSave={async () => Alert.alert('Saved!')}
        className="bg-white"
      />
    </ScrollView>
  );
};

export default PersonalAreaScreen;
