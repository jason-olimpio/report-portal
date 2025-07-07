import {useState, useRef} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {useTranslation} from 'react-i18next';
import {format} from 'date-fns';
import {Camera, MapView, PointAnnotation, type CameraRef} from '@maplibre/maplibre-react-native';

import {reportData} from '@store';
import {ReportStatusBadge, RootStackParamList} from '@components';

import {appColors} from '@config';

import {getLocaleForDateFns} from '@utils';

type ReportDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ReportDetails'>;
type ReportDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const ReportDetailsScreen = () => {
    const [zoom, setZoom] = useState(14);
    const cameraRef = useRef<CameraRef | null>(null);

    const {t, i18n} = useTranslation();
    const route = useRoute<ReportDetailsScreenRouteProp>();
    const navigation = useNavigation<ReportDetailsScreenNavigationProp>();
    const {reportId} = route.params;

    const report = reportData.find(item => item.id === reportId);

    if (!report) {
        return (
            <View className="flex-1 bg-white">
                <Text className="text-center mt-6 text-red-500">{t('reportNotFound')}</Text>
            </View>
        );
    }

    const {image, title, description, address, location, date, status} = report;
    const { latitude, longitude } = location;

    const locale = getLocaleForDateFns(i18n.resolvedLanguage);
    const formattedDate = format(date, 'PPP', {locale});

    return (
        <ScrollView
            className="flex-1 bg-white"
            contentContainerStyle={[styles.scrollViewContent]}
            showsVerticalScrollIndicator={false}
        >
            <View className="flex-row justify-between items-center mb-10">
                <TouchableOpacity className="flex-row items-center" onPress={navigation.goBack}>
                    <MaterialIcons
                        name="arrow-back-ios"
                        size={15}
                    />

                    <Text className="ml-1">{t('back')}</Text>
                </TouchableOpacity>

                <ReportStatusBadge status={status}/>
            </View>

            <Image source={image} className="w-48 h-48 rounded-full shadow-lg self-center mb-4"/>

            <Text className="text-xl mb-2 font-titillium-bold text-neutral-gray-800 text-center">{title}</Text>

            <Text className="text-sm mx-10 mb-2 text-neutral-gray-500 text-center">{description}</Text>

            <View className="flex-row items-center justify-center">
                <MaterialIcons
                    name="location-on"
                    size={15}
                    color={appColors.neutral.gray[500]}
                />

                <Text className="text-sm ml-1 text-neutral-gray-500">{address}</Text>
            </View>

            <Text className="text-sm mb-10 text-neutral-gray-500 text-center">{formattedDate}</Text>

            <View className="mx-4 mb-4">
                <Text className="text-lg font-titillium-bold text-neutral-gray-800 mb-4">{t('location')}</Text>

                <View className="h-64 rounded-lg overflow-hidden shadow-lg">
                    <MapView
                        style={styles.mapView}
                        mapStyle="https://api.maptiler.com/maps/openstreetmap/style.json?key=Yj0eOO10ncmOC0nfSYY1"
                        attributionEnabled={false}
                        scrollEnabled={true}
                    >
                        <Camera
                            ref={cameraRef}
                            centerCoordinate={[longitude, latitude]}
                            zoomLevel={zoom}
                        />

                        <PointAnnotation
                            id="reportLocation"
                            coordinate={[longitude, latitude]}
                        >
                            <View className="bg-red-600 w-5 h-5 rounded-full shadow-xl items-center justify-center">
                                <MaterialIcons
                                    name="report-problem"
                                    size={10}
                                    color="white"
                                />
                            </View>
                        </PointAnnotation>
                    </MapView>

                    <View className="absolute right-2 top-2 flex-col z-10">
                        <TouchableOpacity
                            onPress={() => setZoom(value => Math.min(value + 1, 20))}
                            className="bg-white rounded-full p-1 mb-2 items-center justify-center shadow"
                        >
                            <MaterialIcons name="add" size={20} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setZoom(value => Math.max(value - 1, 1))}
                            className="bg-white rounded-full p-1 mb-2 items-center justify-center shadow"
                        >
                            <MaterialIcons name="remove" size={20} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>
                                cameraRef.current?.setCamera({
                                    centerCoordinate: [longitude, latitude],
                                    zoomLevel: zoom,
                                    animationDuration: 500,
                                })
                            }
                            className="bg-white rounded-full p-1 items-center justify-center shadow"
                        >
                            <MaterialIcons name="my-location" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text className="text-xs text-neutral-gray-500 mt-4 text-center">
                    {t('coordinates')}: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </Text>
            </View>

            {/*<ReportPriorityBadge priority={priority}/>*/}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    mapView: {
        flex: 1,
    },
});

export default ReportDetailsScreen;
