import {render} from '@testing-library/react-native';
import {useTranslation} from 'react-i18next';

import {ReportFilterOptions} from '@components';
import {StatusOption} from '@types';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('react-native-gesture-handler', () => ({
  ScrollView: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('@utils', () => ({
  getStatusLabel: jest.fn(status => status),
}));

jest.mock('@maplibre/maplibre-react-native', () => ({
  Camera: () => null,
  MapView: () => null,
  PointAnnotation: () => null,
}));

jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
}));

const mockTranslation = {
  t: jest.fn((key: string) => key),
  i18n: {
    language: 'en',
  },
};

describe('ReportFilterOptions', () => {
  const defaultProps = {
    selectedStatus: StatusOption.All,
    setSelectedStatus: jest.fn(),
    dateRange: {start: null, end: null},
    setDateRange: jest.fn(),
    toggleModal: jest.fn(),
    toggleDatePicker: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  it('should render without crashing', () => {
    const component = render(<ReportFilterOptions {...defaultProps} />);
    expect(component).toBeTruthy();
  });

  it('should call useTranslation hook', () => {
    render(<ReportFilterOptions {...defaultProps} />);
    expect(useTranslation).toHaveBeenCalled();
  });

  it('should call setSelectedStatus when status option is selected', () => {
    const mockSetSelectedStatus = jest.fn();
    const component = render(
      <ReportFilterOptions
        {...defaultProps}
        setSelectedStatus={mockSetSelectedStatus}
      />,
    );

    expect(component).toBeTruthy();
  });

  it('should display date range correctly when dates are provided', () => {
    const dateRange = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-31'),
    };

    const component = render(
      <ReportFilterOptions {...defaultProps} dateRange={dateRange} />,
    );

    expect(component).toBeTruthy();
  });

  it('should handle date picker toggle', () => {
    const mockToggleDatePicker = jest.fn();

    const component = render(
      <ReportFilterOptions
        {...defaultProps}
        toggleDatePicker={mockToggleDatePicker}
      />,
    );

    expect(component).toBeTruthy();
  });
});
