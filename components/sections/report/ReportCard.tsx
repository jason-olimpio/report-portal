import React from 'react';
import {Image, Text, View, ImageSourcePropType, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import MaterialIcons from '@react-native-vector-icons/material-icons';
import {useTranslation} from 'react-i18next';

import {ReportStatusBadge, RootStackParamList} from '@components';

import {StatusOption} from '@types';

import {getTimeAgo} from '@utils';

type ReportCardNavigationProp = StackNavigationProp<RootStackParamList>;

type ReportCardProps = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  address: string;
  date: Date;
  status: StatusOption;
};

const ReportCard = ({id, image, title, address, date, status}: ReportCardProps) => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation<ReportCardNavigationProp>();

  const handlePress = () => navigation.navigate('ReportDetail', {reportId: id});

  const timeAgo = getTimeAgo(date, i18n.language, t('invalidDate'));

  return (
    <TouchableOpacity
      className="bg-white p-4 rounded-lg shadow-lg mb-4"
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-end justify-between">
        <View className="flex-row">
          <Image source={image} className="w-16 h-16 mr-4 rounded-xl" />

          <View>
            <Text>{title}</Text>

            <View className="flex-row items-center">
              <MaterialIcons
                name="location-on"
                size={15}
                color="gray"
              />

              <Text className="text-sm text-neutral-gray-500 ml-1">
                {address}
              </Text>
            </View>

            <Text className="text-sm text-neutral-gray-500">
              {timeAgo}
            </Text>
          </View>
        </View>

        <ReportStatusBadge status={status} />
      </View>
    </TouchableOpacity>
  );
};

export default ReportCard;
