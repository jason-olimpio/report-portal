import {Alert, TouchableOpacity, Text, View} from 'react-native';
import {z} from 'zod';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import {ValidatedForm, FieldConfig} from '@components';

const NewReportScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const reportSchema = z.object({
    title: z.string().min(3, {message: t('errors.titleTooShort')}),
    description: z.string().min(10, {message: t('errors.descriptionTooShort')}),
    image: z.string().min(1, {message: t('errors.imageRequired')}),
  });

  const initialState: z.infer<typeof reportSchema> = {
    title: '',
    description: '',
    image: '',
  };

  const fields: FieldConfig[] = [
    {key: 'image', label: t('image'), isImage: true},
    {key: 'title', label: t('title')},
    {
      key: 'description',
      label: t('description'),
      inputProps: {multiline: true, style: {minHeight: 80}},
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="mt-4 ml-4 mb-2 self-start px-4 py-2 border border-neutral-gray-100 rounded-lg flex-row items-center">
        <FontAwesome6 name="arrow-left" size={15} iconStyle="solid" />
        <Text className="ml-2">{t('back')}</Text>
      </TouchableOpacity>

      <ValidatedForm
        schema={reportSchema}
        initialState={initialState}
        fields={fields}
        onSave={async () => Alert.alert(t('reportSaved'))}
      />
    </View>
  );
};

export default NewReportScreen;
