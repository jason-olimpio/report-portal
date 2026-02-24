import React, {useState} from 'react'
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import {z} from 'zod'

import {FormHandler} from '@components'
import {useAuth} from '@hooks'
import {mockLogin} from '@api'
import {FormField, type FieldConfig, type LoginCredentials} from '@types'

const LoginScreen = () => {
  const {t} = useTranslation()
  const {login} = useAuth()

  const [formValues, setFormValues] = useState<LoginCredentials>({
    email: '',
    password: '',
  })

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, t('validation.emailRequired'))
      .trim()
      .pipe(z.email({message: t('validation.emailInvalid')})),
    password: z
      .string()
      .min(1, t('validation.passwordRequired'))
      .min(8, t('validation.passwordMinLength'))
      .max(100, t('validation.passwordMaxLength'))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        t('validation.passwordMustContain'),
      ),
  })

  const fields: FieldConfig[] = [
    {
      type: FormField.Text,
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
      type: FormField.Text,
      key: 'password',
      label: t('forms.password'),
      inputProps: {
        placeholder: t('forms.enterPassword'),
        secureTextEntry: true,
        autoCapitalize: 'none',
        autoComplete: 'password',
        textContentType: 'password',
      },
    },
  ]

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const {user, token} = await mockLogin(credentials)

      await login(user, token)

      Alert.alert(
        t('authentication.loginSuccess'),
        t('authentication.welcomeBack', {name: user.name}),
      )
    } catch (error) {
      Alert.alert(
        t('authentication.loginError'),
        error instanceof Error
          ? error.message
          : t('authentication.loginFailed'),
      )
    }
  }

  const handleQuickFill = (role: 'admin' | 'user') => {
    const credentials = {
      admin: {
        email: 'admin@example.com',
        password: 'Password123!',
      },
      user: {
        email: 'user@example.com',
        password: 'Password123!',
      },
    }

    setFormValues(credentials[role])
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView contentContainerClassName="flex-grow px-6 mt-6">
        <View className="mb-8">
          <Text
            className="text-3xl font-titillium-bold text-center 
          text-text-primary-light dark:text-text-primary-dark mb-2">
            {t('authentication.welcome')}
          </Text>

          <Text
            className="font-titillium-regular text-lg text-center 
          text-text-secondary-light dark:text-text-secondary-dark">
            {t('authentication.signInToYourAccount')}
          </Text>
        </View>

        <FormHandler
          key={`${formValues.email}-${formValues.password}`}
          schema={loginSchema}
          initialState={formValues}
          fields={fields}
          onSave={handleLogin}
          saveButtonLabel={t('authentication.signIn')}
          className="mb-6"
        />

        <View className="mt-4 border-t border-neutral-gray-200 dark:border-neutral-gray-800 pt-6">
          <Text
            className="text-center font-titillium-regular 
          text-text-secondary-light dark:text-text-secondary-dark mb-4">
            {t('authentication.quickAccess')}
          </Text>

          <View className="flex-row justify-between gap-x-4">
            <TouchableOpacity
              onPress={() => handleQuickFill('admin')}
              className="flex-1 bg-primary-dark dark:bg-primary-light py-3 rounded-xl items-center">
              <Text className="text-white dark:text-black font-titillium-bold">
                {t('authentication.admin')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleQuickFill('user')}
              className="flex-1 border border-primary-dark dark:border-primary-light py-3 rounded-xl items-center">
              <Text className="text-primary-dark dark:text-primary-light font-titillium-bold">
                {t('authentication.user')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
