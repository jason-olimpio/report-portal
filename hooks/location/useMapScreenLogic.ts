import {useEffect, useState} from 'react'
import {Keyboard} from 'react-native'

import {useRegion, useUserLocation} from '@hooks'
import {reportData} from '@store'
import type {Location, Region, Report} from '@types'

const normalize = (_string: string) => _string.trim().toLowerCase()

const useMapScreenLogic = () => {
  const {centerOnUserLocation, getCurrentPosition} = useUserLocation()
  const initialRegion = useRegion()

  const [search, setSearch] = useState('')
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  const [regionReady, setRegionReady] = useState(false)
  const [region, setRegion] = useState<Region>(initialRegion)

  const [zoomLevel, setZoomLevel] = useState(13)
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        const location = await getCurrentPosition()
        setCurrentLocation(location)
      } catch {
        setCurrentLocation(null)
      }
    }

    run()
  }, [getCurrentPosition])

  useEffect(() => {
    let alive = true

    const run = async () => {
      try {
        await centerOnUserLocation(next => {
          if (alive) setRegion(next)
        })
      } finally {
        if (alive) setRegionReady(true)
      }
    }

    run()

    return () => {
      alive = false
    }
  }, [centerOnUserLocation])

  const term = normalize(search)

  const visibleReports =
    term === ''
      ? reportData
      : reportData.filter(({title, address}: Report) => {
          const hayTitle = normalize(title)
          const hayAddress = normalize(address)
          return hayTitle.includes(term) || hayAddress.includes(term)
        })

  const handleSearchChange = (searchTerm: string) => {
    setSearch(searchTerm)

    const nextTerm = normalize(searchTerm)
    if (!nextTerm) return

    const match = reportData.find(({title, address}) => {
      const hayTitle = normalize(title)
      const hayAddress = normalize(address)

      return hayTitle.includes(nextTerm) || hayAddress.includes(nextTerm)
    })

    if (!match) return

    const {latitude, longitude} = match.location

    setRegion(current => ({
      ...current,
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005 * (current.longitudeDelta / current.latitudeDelta),
    }))
  }

  const handleMyLocationPress = async () => {
    await centerOnUserLocation(setRegion)
    setZoomLevel(13)
    setSelectedReport(null)
    setSearch('')
  }

  const handleMarkerSelect = (report: Report) => {
    Keyboard.dismiss()
    setSelectedReport(report)
    setZoomLevel(17)
  }

  return {
    search,
    setSearch,
    selectedReport,
    setSelectedReport,

    regionReady,
    region,
    setRegion,
    zoomLevel,
    setZoomLevel,
    currentLocation,

    visibleReports,

    handleSearchChange,
    handleMyLocationPress,
    handleMarkerSelect,
  }
}

export default useMapScreenLogic
