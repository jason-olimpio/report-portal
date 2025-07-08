import {renderHook} from '@testing-library/react-native';
import {useColorScheme} from 'nativewind';

import {useTheme} from '@hooks';
import {ThemeProvider} from '@contexts';

// Mock useColorScheme
jest.mock('nativewind');
const mockUseColorScheme = useColorScheme as jest.MockedFunction<typeof useColorScheme>;

const wrapper = ({children}: {children: React.ReactNode}) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('useTheme', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return light theme data when colorScheme is light', () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: 'light',
      setColorScheme: jest.fn(),
      toggleColorScheme: jest.fn(),
    });

    const {result} = renderHook(() => useTheme(), {wrapper});

    expect(result.current.colorScheme).toBe('light');
    expect(result.current.isDark).toBe(false);
  });

  it('should return dark theme data when colorScheme is dark', () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: 'dark',
      setColorScheme: jest.fn(),
      toggleColorScheme: jest.fn(),
    });

    const {result} = renderHook(() => useTheme(), {wrapper});

    expect(result.current.colorScheme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });

  it('should throw error when used outside ThemeProvider', () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: 'light',
      setColorScheme: jest.fn(),
      toggleColorScheme: jest.fn(),
    });

    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');

    console.error = originalError;
  });

  it('should handle undefined colorScheme gracefully', () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: undefined,
      setColorScheme: jest.fn(),
      toggleColorScheme: jest.fn(),
    });

    const {result} = renderHook(() => useTheme(), {wrapper});

    expect(result.current.colorScheme).toBe('light');
    expect(result.current.isDark).toBe(false);
  });
});
