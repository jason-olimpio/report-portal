import axios from 'axios';

type NominatimResponse = {
  display_name?: string;
};

type GetAddressFromLocationParams = {
  latitude: number;
  longitude: number;
};

const getAddressFromLocation = async ({
  latitude,
  longitude,
}: GetAddressFromLocationParams): Promise<string> => {
  try {
    const {data} = await axios.get<NominatimResponse>(
      'https://nominatim.openstreetmap.org/reverse',
      {
        params: {
          format: 'json',
          lat: latitude,
          lon: longitude,
        },
      },
    );

    return data.display_name || '';
  } catch {
    return '';
  }
};

export default getAddressFromLocation;
