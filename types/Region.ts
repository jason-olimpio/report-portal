/**
 * Region.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Type definitions for geographic region data structures.
 */

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
