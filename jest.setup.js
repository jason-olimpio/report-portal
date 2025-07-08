import 'react-native-gesture-handler/jestSetup';

// Mock NativeWind
jest.mock('nativewind', () => ({
  useColorScheme: jest.fn(() => ({
    colorScheme: 'light',
    setColorScheme: jest.fn(),
  })),
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  useFocusEffect: jest.fn(),
}));

// Mock React Native modules
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
}));

// Silence console warnings in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock Appearance
jest.mock('react-native/Libraries/Utilities/Appearance', () => ({
  getColorScheme: () => 'light',
  addChangeListener: () => ({ remove: jest.fn() }),
}));
