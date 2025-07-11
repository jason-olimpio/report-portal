import {ImageSourcePropType} from 'react-native';

import {StatusOption, PriorityOption} from '@types';

export type Report = {
  id: string;
  images: ImageSourcePropType[];
  title: string;
  description: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  date: Date;
  status: StatusOption;
  priority: PriorityOption;
};

export type ReportsByDate = Record<string, Report[]>;
