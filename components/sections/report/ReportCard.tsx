import React from 'react';
import {Image, Text, View, ImageSourcePropType} from 'react-native';

import {formatDistanceToNow} from 'date-fns';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {useTranslation} from 'react-i18next';

import {ReportStatusBadge} from '@components';

import {StatusOption} from '@types';

import {getLocaleForDateFns} from '@utils';

type ReportCardProps = {
  image: ImageSourcePropType;
  title: string;
  address: string;
  date: Date;
  status: StatusOption;
};

const ReportCard = ({image, title, address, date, status}: ReportCardProps) => {
  const {i18n} = useTranslation();

  const getTimeAgo = (reportDate: Date): string => {
    if (!(reportDate instanceof Date) || isNaN(reportDate.getTime())) {
      return 'Invalid date';
    }

    const locale = getLocaleForDateFns(i18n.resolvedLanguage);

    return formatDistanceToNow(reportDate, {
      addSuffix: true,
      locale,
    });
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-lg flex-row items-end justify-between mb-4">
      <View className="flex-row">
        <Image source={image} className="w-16 h-16 mr-4 rounded-xl" />

        <View>
          <Text>{title}</Text>

          <View className="flex-row items-center">
            <FontAwesome6
              name="location-dot"
              size={12}
              color="gray"
              iconStyle="solid"
            />

            <Text className="text-sm text-neutral-gray-500 ml-1">
              {address}
            </Text>
          </View>

          <Text className="text-sm text-neutral-gray-500">
            {getTimeAgo(date)}
          </Text>
        </View>
      </View>

      <ReportStatusBadge status={status} />
    </View>
  );
};

export default ReportCard;
