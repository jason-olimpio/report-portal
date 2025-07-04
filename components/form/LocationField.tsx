import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

type LocationFieldProps = {
  label?: string;
  location?: { latitude: number; longitude: number };
  error?: string | false;
}

const LocationField = ({ label, location, error }: LocationFieldProps) => {
  const { t } = useTranslation();

  const hasLocation = location && (location.latitude !== 0 || location.longitude !== 0);

  console.log('boia d')
  return (
    <View className="mb-6">
      <Text className="mb-3 font-titillium-semibold" accessibilityLabel={label}>{label}</Text>

      <View className="p-4 rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {hasLocation ? (
          <>
            <Text className="text-neutral-500 text-sm">
              {t('latitude')}: {location.latitude.toFixed(6)}
            </Text>

            <Text className="text-neutral-500 text-sm">
              {t('longitude')}: {location.longitude.toFixed(6)}
            </Text>
          </>
        ) : (
          <Text className="text-neutral-100 text-sm italic">
            {t('locationNotCaptured')}
          </Text>
        )}
      </View>

      {error && <Text className="text-red-500 mt-3 text-sm">{error}</Text>}
    </View>
  );
};

export default LocationField;
