import {render} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {NotificationScreen} from '@screens';
import { ThemeProvider } from '@contexts';

jest.mock('@react-navigation/native', () => {
  const actualNavigation = jest.requireActual('@react-navigation/native');

  return {
    ...actualNavigation,
    useNavigation: jest.fn(),
    createNavigatorFactory: jest.fn(() => jest.fn()),
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('@store', () => ({
  notificationData: [
    {
      id: '1',
      title: 'Test Notification',
      description: 'Test Description',
      date: new Date('2023-01-01'),
      isRead: false,
    },
    {
      id: '2',
      title: 'Another Notification',
      description: 'Another Description',
      date: new Date('2023-01-02'),
      isRead: true,
    },
  ],
}));

jest.mock('@utils', () => ({
  getTimeAgo: jest.fn(() => '2 days ago'),
}));

jest.mock('@react-native-vector-icons/material-icons', () => 'MaterialIcons');

jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
}));

jest.mock('@maplibre/maplibre-react-native', () => ({
  Camera: () => null,
  MapView: () => null,
  PointAnnotation: () => null,
}));

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockTranslation = {
  t: jest.fn((key: string) => key),
  i18n: {
    language: 'en',
  },
};

describe('NotificationScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  it('should render without crashing', () => {
    const { getByText } = render(
      <ThemeProvider>
        <NotificationScreen />
      </ThemeProvider>
    );

    expect(getByText('Test Notification')).toBeTruthy();
  });

  it('should display notification list', () => {
    const { getByText } = render(
      <ThemeProvider>
        <NotificationScreen />
      </ThemeProvider>
    );

    expect(getByText('Test Notification')).toBeTruthy();
    expect(getByText('Another Notification')).toBeTruthy();
  });

  it('should show time ago for notifications', () => {
    const { getAllByText } = render(
      <ThemeProvider>
        <NotificationScreen />
      </ThemeProvider>
    );
    expect(getAllByText('2 days ago').length).toBeGreaterThan(0);
  });

  it('should call useTranslation hook', () => {
    render(
      <ThemeProvider>
        <NotificationScreen />
      </ThemeProvider>
    );

    expect(useTranslation).toHaveBeenCalled();
  });

  it('should call useNavigation hook', () => {
    render(
      <ThemeProvider>
        <NotificationScreen />
      </ThemeProvider>
    );

    expect(useNavigation).toHaveBeenCalled();
  });
});
