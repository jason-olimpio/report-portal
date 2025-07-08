import {render} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {PersonalAreaScreen} from '@screens';
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

jest.mock('@react-native-vector-icons/material-icons', () => 'MaterialIcons');

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

describe('PersonalAreaScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  it('should render without crashing', () => {
    const component = render(
      <ThemeProvider>
        <PersonalAreaScreen />
      </ThemeProvider>
    );
    
    expect(component).toBeTruthy();
  });

  it('should call useTranslation hook', () => {
    render(
      <ThemeProvider>
        <PersonalAreaScreen />
      </ThemeProvider>
    );
    expect(useTranslation).toHaveBeenCalled();
  });
});
