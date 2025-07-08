import {ReactNode} from 'react';
import {render} from '@testing-library/react-native';

import App from '../App';

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}: {children: ReactNode}) => children,
}));

jest.mock('@components', () => {
  const {Text} = require('react-native');
  
  return {
    RootStack: () => <Text testID="root-stack">Root Stack</Text>,
  };
});

jest.mock('@contexts', () => ({
  ThemeProvider: ({children}: {children: ReactNode}) => children,
}));

jest.mock('../global.css', () => ({}));

jest.mock('../i18n', () => ({}));

describe('App', () => {
  it('should render without crashing', () => {
    const {getByTestId} = render(<App />);
    expect(getByTestId('root-stack')).toBeTruthy();
  });

  it('should wrap components with NavigationContainer and ThemeProvider', () => {
    // This test verifies the structure is correct by checking the mock calls
    const NavigationContainerSpy = jest.spyOn(require('@react-navigation/native'), 'NavigationContainer');
    const ThemeProviderSpy = jest.spyOn(require('@contexts'), 'ThemeProvider');

    render(<App />);

    expect(NavigationContainerSpy).toHaveBeenCalled();
    expect(ThemeProviderSpy).toHaveBeenCalled();
  });
});
