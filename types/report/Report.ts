/**
 * Report.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Type definitions for environmental issue reports.
 */

import {ImageSourcePropType} from 'react-native'

import {StatusOption, PriorityOption} from '.'

export type Report = {
  id: string
  images: ImageSourcePropType[]
  title: string
  description: string
  address: string
  location: Location
  date: Date
  status: StatusOption
  priority: PriorityOption
}

export type Location = {
  latitude: number
  longitude: number
}
