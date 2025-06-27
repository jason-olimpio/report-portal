import {ComponentProps, Fragment, useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import {z} from 'zod';
import {launchImageLibrary} from 'react-native-image-picker';
import {useTranslation} from 'react-i18next';

import {appColors} from '@config';

type FormState = {
  name: string;
  email: string;
  currentPassword: string;
  confirmPassword: string;
  image?: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const PersonalAreaScreen = () => {
  const {t} = useTranslation();

  const schema = z
    .object({
      name: z.string().min(1, t('errors.nameRequired')),
      email: z.string().email(t('errors.emailInvalid')),
      currentPassword: z.string().min(6, t('errors.currentPasswordRequired')),
      confirmPassword: z.string().min(6, t('errors.confirmPasswordRequired')),
    })
    .refine(data => data.currentPassword === data.confirmPassword, {
      message: t('errors.passwordsMustMatch'),
      path: ['confirmPassword'],
    });

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    currentPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const response = await launchImageLibrary({mediaType: 'photo', quality: 1});
    const uri = response.assets?.[0]?.uri ?? '';

    setForm(previousForm => ({...previousForm, image: uri}));
  };

  const handleChange = (field: keyof FormState, value: string) =>
    setForm(previousForm => ({...previousForm, [field]: value}));

  const handleSave = async () => {
    const result = schema.safeParse(form);

    if (!result.success) {
      const fieldErrors = Object.fromEntries(
        result.error.errors
          .filter(error => error.path[0])
          .map(error => [error.path[0] as keyof FormState, error.message]),
      ) as FormErrors;

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setUploading(true);

    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));

    setUploading(false);
    Alert.alert('Saved!');
  };

  const renderInput = (
    label: string,
    value: string,
    onChange: (text: string) => void,
    error?: string,
    props?: ComponentProps<typeof TextInput>,
  ) => (
    <View className="mb-4">
      <Text className="mb-2 font-titillium-semibold text-lg">{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        className="border border-neutral-gray-100 rounded-lg px-4 py-3"
        {...props}
      />

      {error && <Text className="text-red-500 mt-2">{error}</Text>}
    </View>
  );

  const inputFields = [
    {
      key: 'name',
      label: t('name'),
      props: {},
    },
    {
      key: 'email',
      label: t('email'),
      props: {keyboardType: 'email-address', autoCapitalize: 'none'},
    },
    {
      key: 'currentPassword',
      label: t('currentPassword'),
      props: {secureTextEntry: true},
    },
    {
      key: 'confirmPassword',
      label: t('confirmPassword'),
      props: {secureTextEntry: true},
    },
  ] as const;

  return (
    <View className="bg-white p-6 h-full">
      <Text className="text-xl text-center font-titillium-semibold">
        {t('personalArea')}
      </Text>

      <TouchableOpacity
        onPress={pickImage}
        className="my-7 items-center justify-center h-44 w-44 rounded-full self-center border-[1px] border-neutral-500">
        {form.image ? (
          <Image
            source={{uri: form.image}}
            className="h-44 w-44 rounded-full"
            resizeMode="cover"
          />
        ) : (
          <FontAwesome6
            name="camera"
            size={32}
            color={appColors.neutral.gray[500]}
            iconStyle="solid"
          />
        )}
      </TouchableOpacity>

      {errors.image && (
        <Text className="text-red-500 mb-2">{errors.image}</Text>
      )}

      {inputFields.map(({key, label, props}) => (
        <Fragment key={key}>
          {renderInput(
            label,
            form[key],
            (text: string) => handleChange(key, text),
            errors[key],
            props,
          )}
        </Fragment>
      ))}

      <TouchableOpacity
        onPress={handleSave}
        className="bg-system-emerald-600 rounded-full py-2 px-8 shadow-lg mt-4 items-center self-center w-auto min-w-[120px]"
        disabled={uploading}>
        <Text className="text-white font-titillium-bold text-base">
          {uploading ? t('saving') : t('save')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PersonalAreaScreen;
