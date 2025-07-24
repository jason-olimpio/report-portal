import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import {z} from 'zod'

import {FormHandler} from '@components'
import {useAuth} from '@hooks'
import {mockRegister} from '@api'
import {type RegisterData, type FieldConfig, FieldType} from '@types'

const RegisterScreen = () => {
  const {t} = useTranslation()
  const {login} = useAuth()

  const registerSchema = z
    .object({
      name: z
        .string()
        .min(1, t('validation.fullNameRequired'))
        .min(2, t('validation.fullNameMinLength'))
        .max(50, t('validation.fullNameMaxLength'))
        .regex(/^[a-zA-Z\s]+$/, t('validation.fullNameInvalid')),
      email: z
        .string()
        .min(1, t('validation.emailRequired'))
        .email(t('validation.emailInvalid')),
      password: z
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
        .min(1, t('validation.confirmPasswordRequired')),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('validation.passwordsDoNotMatch'),
      path: ['confirmPassword'],
    })

  const initialState: RegisterData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const fields: FieldConfig[] = [
    {
      type: FieldType.Text,
      key: 'name',
      label: t('forms.fullName'),
      inputProps: {
        placeholder: t('forms.enterFullName'),
        autoCapitalize: 'words',
        autoComplete: 'name',
        textContentType: 'name',
      },
    },
    {
      type: FieldType.Text,
      key: 'email',
      label: t('forms.email'),
      inputProps: {
        placeholder: t('forms.enterEmail'),
        keyboardType: 'email-address',
        autoCapitalize: 'none',
        autoComplete: 'email',
        textContentType: 'emailAddress',
      },
    },
    {
      type: FieldType.Text,
      key: 'password',
      label: t('forms.password'),
      inputProps: {
        placeholder: t('forms.enterPassword'),
        secureTextEntry: true,
        autoCapitalize: 'none',
        autoComplete: 'password-new',
        textContentType: 'newPassword',
      },
    },
    {
      type: FieldType.Text,
      key: 'confirmPassword',
      label: t('forms.confirmPassword'),
      inputProps: {
        placeholder: t('forms.confirmYourPassword'),
        secureTextEntry: true,
        autoCapitalize: 'none',
        autoComplete: 'password-new',
        textContentType: 'newPassword',
      },
    },
  ]

  const handleRegister = async (userData: RegisterData) => {
    try {
      const {user, token} = await mockRegister(userData)

      await login(user, token)

      Alert.alert(
        t('authentication.registrationSuccess'),
        t('authentication.welcomeToApp', {name: user.name}),
      )
    } catch (error) {
      Alert.alert(
        t('authentication.registrationError'),
        error instanceof Error
          ? error.message
          : t('authentication.registrationFailed'),
      )
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView contentContainerClassName="flex-grow justify-center">
        <View className="px-6 pt-6">
          <View className="mb-8">
            <Text
              className="text-3xl font-titillium-bold text-center 
                        text-text-primary-light dark:text-text-primary-dark mb-2">
              {t('authentication.createAccount')}
            </Text>

            <Text
              className="font-titillium-regular text-lg text-center 
            text-text-secondary-light dark:text-text-secondary-dark">
              {t('authentication.joinUsToday')}
            </Text>
          </View>

          <FormHandler
            schema={registerSchema}
            initialState={initialState}
            fields={fields}
            onSave={handleRegister}
            saveButtonLabel={t('authentication.register')}
            className="mb-6"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen
