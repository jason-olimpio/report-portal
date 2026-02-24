import axios from 'axios'

type Location = {
  latitude: number
  longitude: number
}

type AddressResponse = {
  address: {
    road?: string
    house_number?: string
    city?: string
    town?: string
    village?: string
  }
}

const getAddressFromLocation = async ({
  latitude,
  longitude,
}: Location): Promise<string> => {
  if (!latitude || !longitude) return ''

  const {data} = await axios.get<AddressResponse>(
    'https://nominatim.openstreetmap.org/reverse',
    {
      params: {
        format: 'jsonv2',
        lat: latitude,
        lon: longitude,
        addressdetails: 1,
      },
      headers: {'User-Agent': 'Report-Portal'},
    },
  )

  const {road, house_number, city, town, village} = data.address

  return [road, house_number, city || town || village]
    .filter(Boolean)
    .join(', ')
}

export default getAddressFromLocation
