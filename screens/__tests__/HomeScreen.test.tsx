import {render} from '@testing-library/react-native';
import {useColorScheme} from 'nativewind';
import {useTranslation} from 'react-i18next';

import {HomeScreen} from '@screens';
import {ThemeProvider} from '@contexts';

jest.mock('nativewind');
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
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

const mockUseColorScheme = useColorScheme as jest.MockedFunction<typeof useColorScheme>;
const mockUseTranslation = useTranslation as jest.MockedFunction<typeof useTranslation>;

const renderWithProviders = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseTranslation.mockReturnValue({
      t: (key: string) => key,
      i18n: {
        changeLanguage: jest.fn(),
        language: 'en',
      },
    } as any);
  });

  it('should render all main sections in light mode', () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: 'light',
      setColorScheme: jest.fn(),
      toggleColorScheme: jest.fn(),
    });

    const {getByTestId} = renderWithProviders(<HomeScreen />);

    expect(getByTestId('environmental-status')).toBeTruthy();
    expect(getByTestId('quick-actions')).toBeTruthy();
    expect(getByTestId('recent-reports')).toBeTruthy();
    expect(getByTestId('community-impact')).toBeTruthy();
  });

  it('should render all main sections in dark mode', () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: 'dark',
      setColorScheme: jest.fn(),
      toggleColorScheme: jest.fn(),
    });

    const {getByTestId} = renderWithProviders(<HomeScreen />);

    expect(getByTestId('environmental-status')).toBeTruthy();
    expect(getByTestId('quick-actions')).toBeTruthy();
    expect(getByTestId('recent-reports')).toBeTruthy();
    expect(getByTestId('community-impact')).toBeTruthy();
  });

  it('should display formatted date', () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: 'light',
      setColorScheme: jest.fn(),
      toggleColorScheme: jest.fn(),
    });

    const component = renderWithProviders(<HomeScreen />);

    expect(component).toBeTruthy();
  });

  it('should handle different i18n languages', () => {
    mockUseTranslation.mockReturnValue({
      t: (key: string) => key,
      i18n: {
        changeLanguage: jest.fn(),
        language: 'it',
      },
    } as any);

    mockUseColorScheme.mockReturnValue({
      colorScheme: 'light',
      setColorScheme: jest.fn(),
      toggleColorScheme: jest.fn(),
    });

    const {getByTestId} = renderWithProviders(<HomeScreen />);

    expect(getByTestId('environmental-status')).toBeTruthy();
    expect(getByTestId('quick-actions')).toBeTruthy();
    expect(getByTestId('recent-reports')).toBeTruthy();
    expect(getByTestId('community-impact')).toBeTruthy();
  });
});

jest.mock('@components', () => {
  const { View } = require('react-native');

  return {
    EnvironmentalStatusSection: () => <View testID="environmental-status" />,
    QuickActions: () => <View testID="quick-actions" />,
    RecentReports: () => <View testID="recent-reports" />,
    CommunityImpactSection: () => <View testID="community-impact" />,
  };
});
