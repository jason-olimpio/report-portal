/**
 * MapScreen.tsx
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Displays reports on a map with search functionality and user location tracking.
 * Allows users to view report details by selecting map markers.
 */

import {useState, useEffect} from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native'
import {Camera, MapView, PointAnnotation} from '@maplibre/maplibre-react-native'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import {useTranslation} from 'react-i18next'

import {useRegion, useTheme, useUserLocation} from '@hooks'
import {reportData} from '@store'
import {ReportDetailsBottomSheet} from '@components'
import type {Report, Region, Location} from '@types'
import {appColors, mapConfig} from '@config'

const MapScreen = () => {
  const {centerOnUserLocation, getCurrentPosition} = useUserLocation()
  const {isDark} = useTheme()
  const {t} = useTranslation()
  const initialRegion = useRegion()

  const [search, setSearch] = useState('')
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  const [regionReady, setRegionReady] = useState(false)
  const [region, setRegion] = useState<Region>(initialRegion)

  const [zoomLevel, setZoomLevel] = useState(13)

  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const location = await getCurrentPosition()
        setCurrentLocation(location)
      } catch {
        setCurrentLocation(null)
      }
    }

    fetchCurrentLocation()
  }, [getCurrentPosition])

  useEffect(() => {
    const initializeRegion = async () => {
      await centerOnUserLocation(setRegion)
      setRegionReady(true)
    }

    initializeRegion()
  }, [centerOnUserLocation])

  const visibleReports = reportData.filter(
    ({title, address}: Report) =>
      search === '' ||
      title.toLowerCase().includes(search.toLowerCase()) ||
      address.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSearchAndMoveToMarker = (searchTerm: string) => {
    setSearch(searchTerm)

    const matchingReport = reportData.find(
      ({title, address}) =>
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        address.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (!matchingReport) return

    const {latitude, longitude} = matchingReport.location

    setRegion(currentRegion => ({
      ...currentRegion,
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta:
        0.005 * (currentRegion.longitudeDelta / currentRegion.latitudeDelta),
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

  if (!regionReady)
    return (
      <View className="flex-1 justify-center items-center bg-neutral-gray-100 dark:bg-neutral-gray-900">
        <ActivityIndicator
          size={32}
          color={isDark ? appColors.primary.light : appColors.primary.dark}
        />

        <TextInput
          editable={false}
          value={t('search.locatingUser')}
          className="font-titillium-regular text-center text-base bg-transparent border-0 
          text-primary-dark dark:text-primary-light"
        />
      </View>
    )

  return (
    <View className="flex-1 bg-gray-100">
      <View
        className="absolute top-4 left-4 right-4 z-10 flex-row items-center 
      bg-white dark:bg-black rounded-lg px-4 shadow">
        <MaterialIcons
          name="search"
          size={20}
          color={isDark ? 'white' : 'black'}
        />

        <TextInput
          className={`flex-1 font-titillium-regular ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
          placeholder={t('search.placeholder')}
          placeholderTextColor={
            isDark ? appColors.neutral.gray[300] : appColors.neutral.gray[500]
          }
          value={search}
          onChangeText={handleSearchAndMoveToMarker}
          returnKeyType="search"
          onSubmitEditing={() => Keyboard.dismiss()}
        />

        <TouchableOpacity
          onPress={handleMyLocationPress}
          accessibilityLabel={t('search.myLocation')}>
          <MaterialIcons
            name="my-location"
            size={18}
            color={isDark ? appColors.primary.light : appColors.primary.dark}
          />
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        mapStyle={mapConfig.maptilerStyleUrl}
        attributionEnabled={false}>
        <Camera
          centerCoordinate={[region.longitude, region.latitude]}
          zoomLevel={zoomLevel}
        />

        {currentLocation && (
          <PointAnnotation
            id="user-location-dot"
            coordinate={[currentLocation.longitude, currentLocation.latitude]}>
            <View className="w-4 h-4 rounded-full bg-primary-light dark:bg-primary-dark border-2 border-white" />
          </PointAnnotation>
        )}

        {visibleReports.map(({id, location, ...rest}) => (
          <PointAnnotation
            key={id}
            id={id}
            coordinate={[location.longitude, location.latitude]}
            onSelected={() => handleMarkerSelect({id, location, ...rest})}>
            <MaterialIcons
              name="not-listed-location"
              size={25}
              color={isDark ? appColors.primary.dark : appColors.primary.light}
            />
          </PointAnnotation>
        ))}
      </MapView>

      <ReportDetailsBottomSheet
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})
