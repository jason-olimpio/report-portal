import React from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {getPriorityLabel} from '@utils';

import {PriorityOption} from '@types';

type ReportPriorityBadgeProps = {
    priority: PriorityOption;
};

const ReportPriorityBadge = ({priority}: ReportPriorityBadgeProps) => {
    const {t} = useTranslation();

    const colors = {
        bg: 'bg-white',
        text: 'text-black',
    };

    const label = getPriorityLabel(priority, t) || t('unknown');

    return (
        <View
            className='flex-row items-center ${colors.bg} px-3 py-1 rounded-full drop-shadow-lg border border-neutral-500'>
            <Text className={`${colors.text} font-titillium-bold text-sm`}>{label}</Text>
        </View>
    );
};

export default ReportPriorityBadge;
