import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {z} from 'zod';

import {ValidatedForm, FieldConfig} from '@components';

const PersonalAreaScreen = () => {
  const {t} = useTranslation();

  const schema = z
    .object({
      name: z.string().min(1, t('errors.nameRequired')),
      email: z.string().email(t('errors.emailInvalid')),
      currentPassword: z.string().min(6, t('errors.currentPasswordRequired')),
      confirmPassword: z.string().min(6, t('errors.confirmPasswordRequired')),
      image: z.string().optional(),
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
    {key: 'image', label: t('image'), isImage: true},
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
    <ValidatedForm
      schema={schema}
      initialState={initialState}
      fields={fields}
      onSave={async () => Alert.alert('Saved!')}
    />
  );
};

export default PersonalAreaScreen;
