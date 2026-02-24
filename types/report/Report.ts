import {StatusOption, PriorityOption} from '.'

export type Report = {
  id: string
  images: string[]
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
