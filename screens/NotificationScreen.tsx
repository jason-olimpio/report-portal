import { View, Text, FlatList } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { Notification } from '@types';

import {notificationData} from '@store';
import {getTimeAgo} from '@utils';

const NotificationSeparator = () => (
	<View className="h-px bg-gray-100" />
);

const NotificationScreen = () => {
	const navigation = useNavigation();
	const { t, i18n } = useTranslation();

	const renderItem = ({ item}: { item: Notification; index: number }) => {
		const { title, description, date } = item;

		const timeAgo = getTimeAgo(date, i18n.language, t);

		return (
			<View className="flex-row items-center py-3 px-4">
				<View className="flex-1">
					<Text className="text-lg font-titillium-bold text-gray-900">{t(title)}</Text>
					<Text className="text-sm text-gray-500 mt-1">{t(description)}</Text>
				</View>

				<Text className="text-xs text-gray-400 ml-2 whitespace-nowrap">
					{timeAgo}
				</Text>
			</View>
		);
	};

	return (
		<View className="flex-1 bg-gray-50 pb-10">
			<View className="flex-row items-center px-4 pt-4 pb-2">
				<MaterialIcons name="arrow-back-ios" size={20} onPress={navigation.goBack} />

				<View className="flex-1 items-center -ml-8">
					<Text className="text-2xl font-titillium-bold">{t('notifications')}</Text>
				</View>
			</View>

			<View className="flex-1 px-4 pt-2">
				<View className="rounded-lg bg-white shadow-lg overflow-hidden mt-2">
					{notificationData.length === 0 ? (
						<View className="py-10 items-center justify-center">
							<Text className="text-neutral-gray-500 text-base">{t('noNotifications')}</Text>
						</View>
					) : (
						<View className="py-1">
							<FlatList
								data={notificationData}
								keyExtractor={({ id }) => id}
								renderItem={renderItem}
								ItemSeparatorComponent={NotificationSeparator}
							/>
						</View>
					)}
				</View>
			</View>
		</View>
	);
};

export default NotificationScreen;
