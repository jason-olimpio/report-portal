import {StyleSheet, View} from 'react-native'
import {Camera, MapView, PointAnnotation} from '@maplibre/maplibre-react-native'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import {useTranslation} from 'react-i18next'

import {useTheme, useMapScreenLogic} from '@hooks'
import {
  ReportDetailsBottomSheet,
  LoadingState,
  SearchBarOverlay,
} from '@components'
import type {Report} from '@types'
import {appColors, mapConfig} from '@config'

const MapScreen = () => {
  const {isDark} = useTheme()
  const {t} = useTranslation()

  const {
    search,
    selectedReport,
    setSelectedReport,

    regionReady,
    region,
    zoomLevel,
    currentLocation,

    visibleReports,

    handleSearchChange,
    handleMyLocationPress,
    handleMarkerSelect,
  } = useMapScreenLogic()

  if (!regionReady)
    return <LoadingState isDark={isDark} label={t('search.locatingUser')} />

  return (
    <View className="flex-1 bg-gray-100">
      <SearchBarOverlay
        isDark={isDark}
        value={search}
        placeholder={t('search.placeholder')}
        onChangeText={handleSearchChange}
        onMyLocationPress={handleMyLocationPress}
        myLocationA11yLabel={t('search.myLocation')}
      />

      <MapView
        style={styles.map}
        mapStyle={mapConfig.maptilerStyleUrl}
        attributionEnabled={false}
        onDidFailLoadingMap={() => console.error('Map failed to load style')}>
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

        {visibleReports.map(({id, location, ...rest}) => {
          const report: Report = {id, location, ...rest}

          return (
            <PointAnnotation
              key={id}
              id={id}
              coordinate={[location.longitude, location.latitude]}
              onSelected={() => handleMarkerSelect(report)}>
              <MaterialIcons
                name="not-listed-location"
                size={25}
                color={
                  isDark ? appColors.primary.dark : appColors.primary.light
                }
              />
            </PointAnnotation>
          )
        })}
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
  map: {flex: 1},
})
