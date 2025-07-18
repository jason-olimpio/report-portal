import {useCallback} from 'react'
import type {Dispatch, SetStateAction} from 'react'
import {Platform, PermissionsAndroid, Alert} from 'react-native'
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation'

import {Location, Region} from 'types'

const useUserLocation = () => {
  const getCurrentPosition = useCallback(async (): Promise<Location> => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error('Location permission denied')
      }
    }

    const {coords} = await new Promise<GeolocationResponse>((resolve, reject) =>
      Geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }),
    )

    const {latitude, longitude} = coords

    return {
      latitude,
      longitude,
    }
  }, [])

  const centerOnUserLocation = useCallback(
    async (setRegion: Dispatch<SetStateAction<Region>>) => {
      try {
        const {latitude, longitude} = await getCurrentPosition()

        setRegion(region => ({
          ...region,
          latitude,
          longitude,
        }))
      } catch (error: any) {
        Alert.alert('Error', error.message)
      }
    },
    [getCurrentPosition],
  )

  return {getCurrentPosition, centerOnUserLocation}
}

export default useUserLocation
