import {
  Alert,
  TouchableOpacity,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import {useEffect} from 'react';
import {z} from 'zod';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import {FormHandler, FieldConfig} from '@components';
import {useTheme} from '@hooks';

import {initPendingReportsTable, addPendingReport} from '@db';

import {type Report, StatusOption, PriorityOption} from '@types';

import {isOnline, getAddressFromLocation} from '@utils';

const NewReportScreen = () => {
  const {isDark} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const schema = z.object({
    title: z.string().min(3, {message: t('errors.titleTooShort')}),
    description: z.string().min(10, {message: t('errors.descriptionTooShort')}),
    images: z.array(z.custom<ImageSourcePropType>()),
    location: z
      .object({
        latitude: z.number(),
        longitude: z.number(),
      })
      .refine(location => location.latitude && location.longitude, {
        message: t('errors.locationRequired'),
      }),
  });

  const initialState: z.infer<typeof schema> = {
    title: '',
    description: '',
    images: [],
    location: {latitude: 0, longitude: 0},
  };

  const fields: FieldConfig[] = [
    {key: 'image', label: t('image'), isImageSlider: true, maxImages: 5},
    {key: 'title', label: t('title')},
    {
      key: 'description',
      label: t('description'),
      inputProps: {multiline: true, style: {minHeight: 80}},
    },
    {key: 'location', label: t('location'), isLocation: true},
  ];

  useEffect(() => {
    initPendingReportsTable();
  }, []);

  const handleReportSave = async ({
    images,
    title,
    description,
    location,
  }: z.infer<typeof schema>) => {
    try {
      const address = await getAddressFromLocation(location);

      const report: Report = {
        id: Date.now().toString(),
        images,
        title,
        description,
        address,
        location,
        date: new Date(),
        status: StatusOption.Pending,
        priority: PriorityOption.Medium,
      };

      if (!(await isOnline())) {
        await addPendingReport(report);
        Alert.alert(t('reportSavedOffline'));

        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      Alert.alert(t('reportSaved'));
    } catch {
      Alert.alert(t('error'), t('errors.reportSendFailed'));
    }
  };

  return (
    <View className="flex-1 bg-background-secondaryLight dark:bg-background-secondaryDark">
      <TouchableOpacity
        onPress={navigation.goBack}
        className="mt-4 ml-4 mb-2 self-start px-4 py-2 flex-row items-center">
        <MaterialIcons
          name="arrow-back-ios"
          size={15}
          color={isDark ? 'white' : 'black'}
        />

        <Text className="ml-1 dark:text-white">{t('back')}</Text>
      </TouchableOpacity>

      <FormHandler
        schema={schema}
        initialState={initialState}
        fields={fields}
        onSave={handleReportSave}
      />
    </View>
  );
};

export default NewReportScreen;
