import {ImageSourcePropType} from 'react-native';

import {StatusOption, PriorityOption} from '@types';

type Report = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  description: string;
  address: string;
  date: Date;
  status: StatusOption;
  priority: PriorityOption;
};

export default Report;
