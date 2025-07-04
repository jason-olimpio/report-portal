import { Text, View } from 'react-native';
import {useTranslation} from 'react-i18next';

type LocationFieldProps = {
  label?: string;
  location?: { latitude: number; longitude: number };
  error?: string | false;
}

const LocationField = ({ label, location, error }: LocationFieldProps) => {
  const { t } = useTranslation();

  const latitude = location?.latitude || 0;
  const longitude = location?.longitude || 0;

  return (
    <View className="mb-6">
      <Text className="mb-3 font-titillium-semibold" accessibilityLabel={label}>{label}</Text>

      <View className="p-4 rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <Text className="text-neutral-500 text-sm">
          {t('latitude')}: {latitude.toFixed(6)}
        </Text>

        <Text className="text-neutral-500 text-sm">
          {t('longitude')}: {longitude.toFixed(6)}
        </Text>
      </View>

      {error && <Text className="text-red-500 mt-3 text-sm font-medium">{error}</Text>}
    </View>
  );
};

export default LocationField;
