export type Region = {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
  [key: string]: any
}

export type RegionPayloadFeature = {
  geometry?: {
    coordinates?: number[]
  }
}
