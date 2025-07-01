import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {useTranslation} from 'react-i18next';
import {format} from 'date-fns';

import {reportData} from '@store';
import {ReportStatusBadge, ReportPriorityBadge, RootStackParamList} from '@components';

import {getLocaleForDateFns} from '@utils';
import {appColors} from '@config';

type ReportDetailScreenRouteProp = RouteProp<RootStackParamList, 'ReportDetail'>;
type ReportDetailScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const ReportDetailScreen = () => {
    const {t, i18n} = useTranslation();
    const route = useRoute<ReportDetailScreenRouteProp>();
    const navigation = useNavigation<ReportDetailScreenNavigationProp>();
    const {reportId} = route.params;

    const report = reportData.find(report => report.id === reportId);

    if (!report) {
        return (
            <View className="flex-1 bg-white">
                <Text className="text-center mt-6 text-red-500">{t('reportNotFound')}</Text>
            </View>
        );
    }

    const {image, title, description, address, date, status, priority} = report;
    const locale = getLocaleForDateFns(i18n.resolvedLanguage);
    const formattedDate = format(date, 'PPP', {locale});

    return (
        <ScrollView className="flex-1 bg-white">
            <TouchableOpacity className="flex-row items-center p-4 pt-6" onPress={navigation.goBack}>
                <FontAwesome6
                    name="arrow-left"
                    size={12}
                    iconStyle="solid"
                />

                <Text className="flex-1 ml-2">{t('back')}</Text>
            </TouchableOpacity>

            <Image source={image} className="w-48 h-48 rounded-full shadow-lg self-center mb-4"/>

            <Text className="text-xl mb-2 font-titillium-bold text-neutral-gray-800 text-center">{title}</Text>

            <Text className="text-sm mx-10 mb-2 text-neutral-gray-500 text-center">{description}</Text>

            <View className="flex-row items-center justify-center">
                <FontAwesome6
                    name="location-dot"
                    size={12}
                    color={appColors.neutral.gray[500]}
                    iconStyle="solid"
                />

                <Text className="text-sm ml-2 text-neutral-gray-500">{address}</Text>
            </View>

            <Text className="text-sm ml-2 mb-4 text-neutral-gray-500 text-center">{formattedDate}</Text>

            <View className="flex-row justify-center">
                <ReportStatusBadge status={status}/>

                <View className="ml-2">
                    <ReportPriorityBadge priority={priority}/>
                </View>
            </View>
        </ScrollView>
    );
};

export default ReportDetailScreen;
