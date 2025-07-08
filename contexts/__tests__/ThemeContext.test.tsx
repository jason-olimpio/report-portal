import {useContext} from 'react';

import {render} from '@testing-library/react-native';
import {useColorScheme} from 'nativewind';
import {View, Text} from 'react-native';

import {ThemeProvider, ThemeContext, type ThemeContextType} from '@contexts';

jest.mock('nativewind');

const mockUseColorScheme = useColorScheme as jest.MockedFunction<typeof useColorScheme>;

const TestComponent = () => {
  const context = useContext(ThemeContext) as ThemeContextType | undefined;

  if (!context) return null;

  return (
    <View testID="test-component">
      <Text>
        {context.colorScheme}-{context.isDark ? 'dark' : 'light'}
      </Text>
    </View>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide light theme context when colorScheme is light', () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: 'light',
      setColorScheme: jest.fn(),
      toggleColorScheme: jest.fn(),
    });

    const {getByTestId} = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByTestId('test-component')).toHaveTextContent('light-light');
  });

  it('should provide dark theme context when colorScheme is dark', () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: 'dark',
      setColorScheme: jest.fn(),
      toggleColorScheme: jest.fn(),
    });

    const {getByTestId} = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByTestId('test-component')).toHaveTextContent('dark-dark');
  });

  it('should default to light theme when colorScheme is null', () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: undefined,
      setColorScheme: jest.fn(),
      toggleColorScheme: jest.fn(),
    });

    const {getByTestId} = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByTestId('test-component')).toHaveTextContent('light-light');
  });

  it('should provide isDark as true when colorScheme is dark', () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: 'dark',
      setColorScheme: jest.fn(),
      toggleColorScheme: jest.fn(),
    });

    const TestIsDark = () => {
      const context = useContext(ThemeContext) as ThemeContextType | undefined;

      if (!context) return null;

      return (
        <View testID="is-dark">
          <Text>{String(context.isDark)}</Text>
        </View>
      );
    };

    const {getByTestId} = render(
      <ThemeProvider>
        <TestIsDark />
      </ThemeProvider>
    );

    expect(getByTestId('is-dark')).toHaveTextContent('true');
  });

  it('should provide isDark as false when colorScheme is light', () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: 'light',
      setColorScheme: jest.fn(),
      toggleColorScheme: jest.fn(),
    });

    const TestIsDark = () => {
      const context = useContext(ThemeContext) as ThemeContextType | undefined;
      
      if (!context) return null;

      return (
        <View testID="is-dark">
          <Text>{String(context.isDark)}</Text>
        </View>
      );
    };

    const {getByTestId} = render(
      <ThemeProvider>
        <TestIsDark />
      </ThemeProvider>
    );

    expect(getByTestId('is-dark')).toHaveTextContent('false');
  });
});
