import 'react-native-gesture-handler/jestSetup';

jest.mock('nativewind', () => ({
  useColorScheme: jest.fn(() => ({
    colorScheme: 'light',
    setColorScheme: jest.fn(),
  })),
}));

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

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
}));

global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

jest.mock('react-native/Libraries/Utilities/Appearance', () => ({
  getColorScheme: () => 'light',
  addChangeListener: () => ({ remove: jest.fn() }),
}));

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
  addEventListener: jest.fn(),
}));

jest.mock('react-native-sqlite-storage');

jest.mock('react-native-safe-area-context', () => {
  const SafeAreaProvider = (props) => props.children;

  SafeAreaProvider.displayName = 'SafeAreaProvider';

  const SafeAreaView = (props) => props.children;

  SafeAreaView.displayName = 'SafeAreaView';

  return {
    SafeAreaProvider,
    SafeAreaView,
    useSafeAreaInsets: () => ({top: 0, right: 0, bottom: 0, left: 0}),
    useSafeAreaFrame: () => ({x: 0, y: 0, width: 0, height: 0}),
  };
});

const safeAreaContext = require('react-native-safe-area-context');

if (safeAreaContext.SafeAreaProvider) {
  safeAreaContext.SafeAreaProvider.displayName = 'SafeAreaProvider';
}

if (safeAreaContext.SafeAreaView) {
  safeAreaContext.SafeAreaView.displayName = 'SafeAreaView';
}
