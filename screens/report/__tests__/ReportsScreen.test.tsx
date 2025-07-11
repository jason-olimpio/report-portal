import {render} from '@testing-library/react-native';

import {ReportsScreen} from '@screens';

jest.mock('@components', () => ({
  SectionHeader: jest.fn(() => null),
  ReportList: jest.fn(() => null),
  Pagination: jest.fn(() => null),
  FilterModal: jest.fn(() => null),
}));

jest.mock('@store', () => ({
  reportData: [
    {
      id: '1',
      images: [],
      title: 'Test Report',
      description: 'Test description',
      address: 'Test address',
      location: {
        latitude: 0,
        longitude: 0,
      },
      date: new Date(),
      status: 1, // StatusOption.Pending
      priority: 1, // PriorityOption.Medium
    },
  ],
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@maplibre/maplibre-react-native', () => ({
  Camera: () => null,
  MapView: () => null,
  PointAnnotation: () => null,
}));

describe('ReportsScreen', () => {
  it('should render without crashing', () => {
    const component = render(<ReportsScreen />);

    expect(component).toBeTruthy();
  });

  it('should render SectionHeader component', () => {
    const {SectionHeader} = require('@components');
    render(<ReportsScreen />);

    expect(SectionHeader).toHaveBeenCalled();
  });

  it('should render ReportList component', () => {
    const {ReportList} = require('@components');
    render(<ReportsScreen />);

    expect(ReportList).toHaveBeenCalled();
  });

  it('should render FilterModal component', () => {
    const {FilterModal} = require('@components');
    render(<ReportsScreen />);

    expect(FilterModal).toHaveBeenCalled();
  });

  it('should render Pagination component when there are reports', () => {
    const {Pagination} = require('@components');
    render(<ReportsScreen />);

    expect(Pagination).toHaveBeenCalled();
  });
});
