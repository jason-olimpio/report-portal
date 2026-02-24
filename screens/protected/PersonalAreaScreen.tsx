import {useState} from 'react'
import {ScrollView, Alert, Text} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Pressable} from 'react-native'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import {z} from 'zod'

import {FormHandler, LanguagePicker} from '@components'
import {useTheme, useAuth} from '@hooks'

import {appColors} from '@config'
import {type FieldConfig, FormField} from '@types'

const PersonalAreaScreen = () => {
  const {t} = useTranslation()
  const {isDark, toggleTheme} = useTheme()
  const {isAuthenticated, user} = useAuth()

  const [languagePickerVisible, setLanguagePickerVisible] = useState(false)

  const schema = z
    .object({
      name: z.string().min(1, t('errors.nameRequired')),
      email: z.email({message: t('errors.emailInvalid')}),
      currentPassword: z
        .string()
        .min(1, t('validation.passwordRequired'))
        .min(8, t('validation.passwordMinLength'))
        .max(100, t('validation.passwordMaxLength'))
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          t('validation.passwordMustContain'),
        ),
      confirmPassword: z
        .string()
        .min(1, t('validation.passwordRequired'))
        .min(8, t('validation.passwordMinLength'))
        .max(100, t('validation.passwordMaxLength'))
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          t('validation.passwordMustContain'),
        ),
      image: z.array(z.string()).optional(),
    })
    .refine(data => data.currentPassword === data.confirmPassword, {
      message: t('errors.passwordsMustMatch'),
      path: ['confirmPassword'],
    })

  const initialState: z.infer<typeof schema> = {
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    confirmPassword: '',
  }

  const fields: FieldConfig[] = [
    {
      type: FormField.ImageSlider,
      key: 'image',
      label: t('media.image'),
      maxImages: 1,
    },
    {type: FormField.Text, key: 'name', label: t('forms.name')},
    {
      type: FormField.Text,
      key: 'email',
      label: t('forms.email'),
      inputProps: {keyboardType: 'email-address', autoCapitalize: 'none'},
    },
    {
      type: FormField.Text,
      key: 'currentPassword',
      label: t('forms.currentPassword'),
      inputProps: {secureTextEntry: true},
    },
    {
      type: FormField.Text,
      key: 'confirmPassword',
      label: t('forms.confirmPassword'),
      inputProps: {secureTextEntry: true},
    },
  ]

  return (
    <ScrollView className="flex-1 p-6 bg-background-light dark:bg-background-dark">
      <Pressable
        onPress={() => setLanguagePickerVisible(true)}
        className="self-start flex-row items-center mb-6">
        <MaterialIcons
          name="language"
          size={20}
          color={isDark ? appColors.primary.light : appColors.primary.dark}
        />

        <Text className="text-primary font-titillium-bold ml-1 dark:text-white">
          {t('settings.changeLanguage')}
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
          {isDark
            ? t('settings.switchToLightMode')
            : t('settings.switchToDarkMode')}
        </Text>
      </Pressable>

      <LanguagePicker
        visible={languagePickerVisible}
        onClose={() => setLanguagePickerVisible(false)}
      />

      {isAuthenticated && (
        <FormHandler
          schema={schema}
          initialState={initialState}
          fields={fields}
          onSave={async () => Alert.alert('Saved!')}
          className="bg-white"
        />
      )}
    </ScrollView>
  )
}

export default PersonalAreaScreen
