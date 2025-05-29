import {ImageSourcePropType} from 'react-native';

import {ReportStatus} from '@types';

type Report = {
  image: ImageSourcePropType;
  title: string;
  address: string;
  date: Date;
  status: ReportStatus;
};

export default Report;
