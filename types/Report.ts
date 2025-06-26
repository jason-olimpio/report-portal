import {ImageSourcePropType} from 'react-native';

import {StatusOption} from '@types';

type Report = {
  image: ImageSourcePropType;
  title: string;
  address: string;
  date: Date;
  status: StatusOption;
};

export default Report;
