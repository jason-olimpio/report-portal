import {ImageSourcePropType} from 'react-native';

import {StatusOption, PriorityOption} from '.';

export type Location = {
  latitude: number;
  longitude: number;
};

export type Report = {
  id: string;
  images: ImageSourcePropType[];
  title: string;
  description: string;
  address: string;
  location: Location;
  date: Date;
  status: StatusOption;
  priority: PriorityOption;
};
