import {View, Text, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Notification} from '@types';

import {BackButton} from '@components';

import {notificationData} from '@store';
import {getTimeAgo} from '@utils';

const NotificationScreen = () => {
  const {t, i18n} = useTranslation();

  const sortedNotifications = [...notificationData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const renderItem = ({item}: {item: Notification; index: number}) => {
    const {title, description, date} = item;
    const timeAgo = getTimeAgo(date, i18n.language, t);

    return (
      <View className="flex-row bg-background-secondaryLight dark:bg-background-secondaryDark items-center py-3 px-4">
        <View className="flex-1">
          <Text className="text-lg font-titillium-bold text-gray-900 dark:text-white">
            {title}
          </Text>

          <Text className="text-sm text-gray-500 dark:text-gray-200 mt-1 pr-10">
            {description}
          </Text>
        </View>

        <Text className="text-xs text-gray-400 dark:text-gray-200 ml-2 whitespace-nowrap">
          {timeAgo}
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark pb-10">
      <View className="flex-row items-center px-4 pt-6 pb-2">
        <BackButton showText={false} />

        <View className="flex-1 items-center -ml-8">
          <Text className="text-2xl font-titillium-bold dark:text-white">
            {t('navigation.notifications')}
          </Text>
        </View>
      </View>

      <View className="flex-1 px-4 pt-2">
        <View className="rounded-2xl shadow-lg overflow-hidden mt-2">
          {sortedNotifications.length === 0 ? (
            <View className="py-10 items-center justify-center">
              <Text className="text-neutral-gray-500 text-base">
                {t('general.noNotifications')}
              </Text>
            </View>
          ) : (
            <View className="py-1">
              <FlatList
                data={sortedNotifications}
                keyExtractor={({id}) => id}
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

const NotificationSeparator = () => (
  <View className="h-px bg-gray-100 dark:bg-gray-600" />
);

export default NotificationScreen;
