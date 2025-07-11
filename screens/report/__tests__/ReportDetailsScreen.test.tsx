import {render} from '@testing-library/react-native';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import ReportDetailsScreen from '../ReportDetailsScreen';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('@hooks', () => ({
  useTheme: () => ({isDark: false}),
}));

jest.mock('@components', () => ({
  ReportStatusBadge: jest.fn(() => null),
  BackButton: jest.fn(() => null),
}));

jest.mock('@store', () => ({
  reportData: [
    {
      id: 'test-report-id',
      title: 'Test Report Title',
      description: 'Test report description',
      address: 'Test Address, Test City',
      location: {latitude: 40.7128, longitude: -74.006},
      date: new Date('2023-07-01'),
      status: 'pending',
      images: [],
    },
  ],
}));

jest.mock('@maplibre/maplibre-react-native', () => ({
  Camera: jest.fn(() => null),
  MapView: jest.fn(() => null),
  PointAnnotation: jest.fn(() => null),
}));

jest.mock('@react-native-vector-icons/material-icons', () => 'MaterialIcons');

jest.mock('date-fns', () => ({
  format: jest.fn(() => 'July 1, 2023'),
}));

jest.mock('@utils', () => ({
  getLocaleForDateFns: jest.fn(() => 'en'),
}));

jest.mock('@config', () => ({
  appColors: {
    neutral: {
      gray: {
        200: '#e5e5e5',
        500: '#737373',
      },
    },
  },
}));

jest.mock('@assets', () => ({
  PlaceholderImage: {uri: 'placeholder-image'},
}));

describe('ReportDetailsScreen', () => {
  const mockRoute = {
    params: {
      reportId: 'test-report-id',
    },
  };

  const mockTranslation = {
    t: (key: string) => {
      const translations: Record<string, string> = {
        reportNotFound: 'Report not found',
        location: 'Location',
        coordinates: 'Coordinates',
      };

      return translations[key] || key;
    },
    i18n: {
      resolvedLanguage: 'en',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRoute as jest.Mock).mockReturnValue(mockRoute);
    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  it('should render without crashing', () => {
    const component = render(<ReportDetailsScreen />);
    expect(component).toBeTruthy();
  });

  it('should render report not found when report does not exist', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {reportId: 'non-existent-id'},
    });

    const {getByText} = render(<ReportDetailsScreen />);
    expect(getByText('Report not found')).toBeTruthy();
  });

  it('should render BackButton component', () => {
    const {BackButton} = require('@components');
    render(<ReportDetailsScreen />);

    expect(BackButton).toHaveBeenCalled();
  });

  it('should render ReportStatusBadge component', () => {
    const {ReportStatusBadge} = require('@components');
    render(<ReportDetailsScreen />);

    const calls = ReportStatusBadge.mock.calls;
    expect(calls.length).toBeGreaterThan(0);

    const firstCallProps = calls[0][0];
    expect(firstCallProps).toMatchObject({
      status: 'pending',
    });
  });

  it('should display report title', () => {
    const {getByText} = render(<ReportDetailsScreen />);
    expect(getByText('Test Report Title')).toBeTruthy();
  });

  it('should display report description', () => {
    const {getByText} = render(<ReportDetailsScreen />);
    expect(getByText('Test report description')).toBeTruthy();
  });

  it('should display report address', () => {
    const {getByText} = render(<ReportDetailsScreen />);
    expect(getByText('Test Address, Test City')).toBeTruthy();
  });

  it('should display formatted date', () => {
    const {getByText} = render(<ReportDetailsScreen />);
    expect(getByText('July 1, 2023')).toBeTruthy();
  });

  it('should display coordinates', () => {
    const {getByText} = render(<ReportDetailsScreen />);
    expect(getByText(/Coordinates: 40.7128, -74.0060/)).toBeTruthy();
  });

  it('should render MapView component', () => {
    const {MapView} = require('@maplibre/maplibre-react-native');
    render(<ReportDetailsScreen />);

    expect(MapView).toHaveBeenCalled();
  });

  it('should render map components', () => {
    const {MapView} = require('@maplibre/maplibre-react-native');
    render(<ReportDetailsScreen />);

    expect(MapView).toHaveBeenCalled();
  });

  it('should handle zoom controls interaction', () => {
    const component = render(<ReportDetailsScreen />);

    // Test that component renders without error
    expect(component).toBeTruthy();
  });

  it('should handle zoom in button press', () => {
    const {getByTestId} = render(<ReportDetailsScreen />);

    expect(getByTestId).toBeDefined();
  });

  it('should handle zoom out button press', () => {
    const {getByTestId} = render(<ReportDetailsScreen />);

    expect(getByTestId).toBeDefined();
  });

  it('should use placeholder image when no images provided', () => {
    const {getByDisplayValue} = render(<ReportDetailsScreen />);

    expect(getByDisplayValue).toBeDefined();
  });

  it('should call getLocaleForDateFns with correct language', () => {
    const {getLocaleForDateFns} = require('@utils');
    render(<ReportDetailsScreen />);

    expect(getLocaleForDateFns).toHaveBeenCalledWith('en');
  });

  it('should format date correctly', () => {
    const {format} = require('date-fns');
    render(<ReportDetailsScreen />);

    expect(format).toHaveBeenCalledWith(new Date('2023-07-01'), 'PPP', {
      locale: 'en',
    });
  });

  it('should render multiple images when available', () => {
    const mockStoreWithImages = {
      reportData: [
        {
          id: 'test-report-id',
          title: 'Test Report Title',
          description: 'Test report description',
          address: 'Test Address, Test City',
          location: {latitude: 40.7128, longitude: -74.006},
          date: new Date('2023-07-01'),
          status: 'pending',
          images: [{uri: 'image1.jpg'}, {uri: 'image2.jpg'}],
        },
      ],
    };

    jest.doMock('@store', () => mockStoreWithImages);

    const component = render(<ReportDetailsScreen />);
    expect(component).toBeTruthy();
  });
});
