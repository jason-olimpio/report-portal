import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

type LocationFieldProps = {
  label?: string;
  location?: {latitude: number; longitude: number};
  error?: string | false;
};

const LocationField = ({label, location, error}: LocationFieldProps) => {
  const {t} = useTranslation();

  const hasLocation =
    location && (location.latitude !== 0 || location.longitude !== 0);

  return (
    <View className="mb-6">
      <Text
        className="mb-3 font-titillium-semibold dark:text-white"
        accessibilityLabel={label}>
        {label}
      </Text>

      <View
        className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 
      bg-white dark:bg-background-secondaryDark shadow-sm">
        {hasLocation ? (
          <>
            <Text className="text-neutral-500 dark:text-neutral-300 text-sm">
              {t('location.latitude')}: {location.latitude.toFixed(6)}
            </Text>

            <Text className="text-neutral-500 dark:text-neutral-300 text-sm">
              {t('location.longitude')}: {location.longitude.toFixed(6)}
            </Text>
          </>
        ) : (
          <Text className="text-neutral-500 dark:text-neutral-300 text-sm italic">
            {t('location.locationNotCaptured')}
          </Text>
        )}
      </View>

      {error && <Text className="text-red-500 mt-3 text-sm">{error}</Text>}
    </View>
  );
};

export default LocationField;
