import {useState, useRef} from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import {useRoute} from '@react-navigation/native'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import {useTranslation} from 'react-i18next'
import {format} from 'date-fns'
import {
  Camera,
  MapView,
  PointAnnotation,
  type CameraRef,
} from '@maplibre/maplibre-react-native'

import {reportData} from '@store'
import {
  ReportStatusBadge,
  BackButton,
  ReportImageGallery,
  ReportPriorityBadge,
} from '@components'

import {useAuth, useTheme} from '@hooks'

import {appColors, mapConfig} from '@config'

import {UserRank, type ReportDetailsScreenRouteProp} from '@types'
import {getLocaleForDateFns} from '@utils'

const ReportDetailsScreen = () => {
  const [zoom] = useState(14)
  const cameraRef = useRef<CameraRef | null>(null)

  const {isDark} = useTheme()
  const {t, i18n} = useTranslation()
  const route = useRoute<ReportDetailsScreenRouteProp>()
  const {user} = useAuth()
  const {reportId} = route.params

  const report = reportData.find(item => item.id === reportId)

  if (!report) {
    return (
      <View className="flex-1 bg-background-light dark:bg-background-dark">
        <Text className="text-center mt-6 text-red-500">
          {t('reports.reportNotFound')}
        </Text>
      </View>
    )
  }

  const {
    images,
    title,
    description,
    address,
    location,
    date,
    status,
    priority,
  } = report
  const {latitude, longitude} = location

  const locale = getLocaleForDateFns(i18n.resolvedLanguage)
  const formattedDate = format(date, 'PPP', {locale})

  const handleCenterToMarker = () =>
    cameraRef.current?.setCamera({
      centerCoordinate: [longitude, latitude],
      zoomLevel: zoom,
      animationDuration: 500,
    })

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View className="flex-row justify-between items-center mb-10">
        <BackButton />

        <View className="flex-row items-center">
          {user?.rank === UserRank.Admin && (
            <ReportPriorityBadge priority={priority} className="mr-1" />
          )}

          <ReportStatusBadge status={status} />
        </View>
      </View>

      <ReportImageGallery images={images} />

      <Text className="text-xl mb-2 font-titillium-bold text-neutral-gray-800 text-center dark:text-white">
        {title}
      </Text>

      <Text className="text-sm mx-10 mb-2 text-neutral-gray-500 dark:text-neutral-gray-200 text-center">
        {description}
      </Text>

      <View className="flex-row items-center justify-center">
        <MaterialIcons
          name="location-on"
          size={15}
          color={
            isDark ? appColors.neutral.gray[200] : appColors.neutral.gray[500]
          }
        />

        <Text className="text-sm ml-1 text-neutral-gray-500 dark:text-neutral-gray-200">
          {address}
        </Text>
      </View>

      <Text className="text-sm mb-10 text-neutral-gray-500 dark:text-neutral-gray-200 text-center">
        {formattedDate}
      </Text>

      <View className="mx-4 mb-4">
        <Text className="text-lg font-titillium-bold text-neutral-gray-800 mb-4 dark:text-white">
          {t('location.location')}
        </Text>

        <View className="h-64 rounded-lg overflow-hidden shadow-lg">
          <MapView
            style={styles.mapView}
            mapStyle={mapConfig.maptilerStyleUrl}
            attributionEnabled={false}
            scrollEnabled={true}>
            <Camera
              ref={cameraRef}
              centerCoordinate={[longitude, latitude]}
              zoomLevel={zoom}
            />

            <PointAnnotation
              id="reportLocation"
              coordinate={[longitude, latitude]}>
              <MaterialIcons name="report-problem" size={15} color="red" />
            </PointAnnotation>
          </MapView>

          <TouchableOpacity
            onPress={handleCenterToMarker}
            className="absolute right-2 top-2 bg-background-light dark:bg-background-dark 
            rounded-full p-1 mb-2 items-center justify-center shadow z-10">
            <MaterialIcons
              name="my-location"
              size={15}
              color={isDark ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </View>

        <Text className="text-xs text-neutral-gray-500 dark:text-neutral-gray-100 mt-4 text-center">
          {t('location.coordinates')}: {latitude.toFixed(4)},{' '}
          {longitude.toFixed(4)}
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  mapView: {
    flex: 1,
  },
})

export default ReportDetailsScreen
