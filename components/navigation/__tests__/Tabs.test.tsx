jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {Tabs} from '@components';
import {ThemeProvider} from '@contexts';

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: jest.fn(() => ({
    Navigator: ({children}: {children: React.ReactNode}) => <>{children}</>,
    Screen: ({children}: {children: React.ReactNode}) => <>{children}</>,
  })),
}));

jest.mock('@screens', () => ({
  HomeScreen: () => 'HomeScreen',
  ReportsScreen: () => 'ReportsScreen',
  StatsScreen: () => 'StatsScreen',
}));

jest.mock('@react-native-vector-icons/material-icons', () => 'MaterialIcons');

jest.mock('@config', () => ({
  appColors: {
    primary: {light: '#fff', dark: '#000'},
    neutral: {gray: {200: '#eee', 500: '#888'}},
    system: {
      red: {600: '#dc2626'},
      emerald: {600: '#059669'},
    },
    background: {
      secondaryDark: '#222',
      secondaryLight: '#eee',
    },
    text: {
      primary: {dark: '#fff', light: '#000'},
    },
  },
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

describe('Tabs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  it('should render without crashing', () => {
    const component = render(
      <ThemeProvider>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </ThemeProvider>,
    );

    expect(component).toBeTruthy();
  });

  it('should call useTranslation hook', () => {
    render(
      <ThemeProvider>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </ThemeProvider>,
    );

    expect(useTranslation).toHaveBeenCalled();
  });
});
