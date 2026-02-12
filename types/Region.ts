import {Location} from './report'

export type Region = Location & {
  latitudeDelta: number
  longitudeDelta: number
}

export type RegionPayloadFeature = {
  geometry?: {
    coordinates?: number[]
  }
}
