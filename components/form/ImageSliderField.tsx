import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {useTranslation} from 'react-i18next';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Geolocation from '@react-native-community/geolocation';

import {IconActionButton, ErrorText, type QuickAction} from '@components';
import {useTheme} from '@hooks';

import {appColors} from '@config';

type ImageSliderFieldProps = {
  label: string;
  imageUris?: string[];
  error?: string | false;
  onImagesSelected: (uris: string[]) => void;
  onLocationCaptured?: (location: {
    latitude: number;
    longitude: number;
  }) => void;
  maxImages?: number;
};

const ImageSliderField = ({
  label,
  imageUris = [],
  error,
  onImagesSelected,
  onLocationCaptured,
  maxImages = 5,
}: ImageSliderFieldProps) => {
  const {isDark} = useTheme();
  const {t} = useTranslation();

  const pickImage = async (source: 'camera' | 'gallery') => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit:
        source === 'gallery' ? Math.max(1, maxImages - imageUris.length) : 1,
    };

    const picker = source === 'camera' ? launchCamera : launchImageLibrary;
    const response = await picker(options);

    if (response.didCancel || response.errorCode) {
      return;
    }

    const selectedUris =
      (response.assets?.map(asset => asset.uri).filter(Boolean) as string[]) ||
      [];

    if (selectedUris.length < 0) {
      return;
    }

    const newUris = [...imageUris, ...selectedUris].slice(0, maxImages);

    onImagesSelected(newUris);
    captureLocation();
  };

  const removeImage = (indexToRemove: number) => {
    const newUris = imageUris.filter((_, index) => index !== indexToRemove);

    onImagesSelected(newUris);
  };

  const captureLocation = () =>
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        onLocationCaptured?.({latitude, longitude});
      },
      () => Alert.alert(t('errors.locationError')),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

  const actions: QuickAction[] = [
    {
      icon: 'camera-alt',
      iconColor: isDark
        ? appColors.neutral.gray[200]
        : appColors.neutral.gray[500],
      title: t('media.imageSource.camera'),
      bgColor:
        'bg-background-light dark:bg-background-dark border border-neutral-gray-500 dark:border-neutral-gray-200',
      onPress: () => pickImage('camera'),
    },
    {
      icon: 'photo-library',
      iconColor: isDark
        ? appColors.neutral.gray[200]
        : appColors.neutral.gray[500],
      title: t('media.imageSource.gallery'),
      bgColor:
        'bg-background-light dark:bg-background-dark border border-neutral-gray-500 dark:border-neutral-gray-200',
      onPress: () => pickImage('gallery'),
    },
  ];

  const canAddMore = imageUris.length < maxImages;

  return (
    <View className="mb-4">
      {maxImages > 1 && imageUris.length === 0 && (
        <Text className="text-neutral-gray-500 dark:text-white mb-6 text-center">
          {t('media.imageSource.hint', {value: maxImages})}
        </Text>
      )}

      {imageUris.length > 0 && (
        <View className="items-center">
          {maxImages > 1 && (
            <Text className="text-neutral-gray-600 dark:text-white mb-6 font-medium">
              {imageUris.length} / {maxImages} {t('media.imageSource.images')}
            </Text>
          )}

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {imageUris.map((uri, index) => (
              <View key={index} className="relative mr-4 mb-6">
                <Image
                  source={{uri}}
                  className="h-32 w-32 rounded-xl shadow-lg"
                  resizeMode="cover"
                  accessibilityLabel={label}
                />

                <TouchableOpacity
                  onPress={() => removeImage(index)}
                  className="absolute p-2">
                  <MaterialIcons name="close" size={14} color="black" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {canAddMore && (
        <View className="flex-row w-full justify-center gap-4 px-4">
          {actions.map(({icon, iconColor, title, bgColor, onPress}) => (
            <IconActionButton
              key={title}
              icon={icon}
              iconColor={iconColor}
              title={title}
              bgColor={bgColor}
              onPress={onPress}
              className="flex-1"
            />
          ))}
        </View>
      )}

      <ErrorText error={error} className="mt-4 text-center" />
    </View>
  );
};

export default ImageSliderField;
