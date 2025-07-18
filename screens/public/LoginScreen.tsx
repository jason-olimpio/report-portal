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

import {mockLogin} from '@api'

import {FieldType, type FieldConfig, type LoginCredentials} from '@types'

const LoginScreen = () => {
  const {t} = useTranslation()
  const {login} = useAuth()

  const loginSchema = z.object({
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
  })

  const initialState: LoginCredentials = {
    email: 'admin@example.com',
    password: 'Admin123!',
  }

  const fields: FieldConfig[] = [
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

          <Text className="text-lg text-center text-text-secondary-light dark:text-text-secondary-dark">
            {t('authentication.signInToYourAccount')}
          </Text>
        </View>

        <FormHandler
          schema={loginSchema}
          initialState={initialState}
          fields={fields}
          onSave={handleLogin}
          saveButtonLabel={t('authentication.signIn')}
          className="mb-6"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
