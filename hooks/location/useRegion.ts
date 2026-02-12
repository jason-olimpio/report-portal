import {useWindowDimensions} from 'react-native'
import type {Location} from '@types'

const INITIAL_REGION: Location = {
  latitude: 45.4654,
  longitude: 9.1859,
}

const useRegion = () => {
  const {width, height} = useWindowDimensions()
  const aspectRatio = width / height
  const latitudeDelta = 0.05
  const longitudeDelta = latitudeDelta * aspectRatio

  return {
    latitude: INITIAL_REGION.latitude,
    longitude: INITIAL_REGION.longitude,
    latitudeDelta,
    longitudeDelta,
  }
}

export default useRegion
