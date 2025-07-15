import {createContext, ReactNode} from 'react';
import {useColorScheme} from 'nativewind';

enum ColorScheme {
  Light = 'light',
  Dark = 'dark',
}

type ThemeContextType = {
  colorScheme: ColorScheme;
  isDark: boolean;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const isDark = colorScheme === ColorScheme.Dark;

  return (
    <ThemeContext.Provider
      value={{
        colorScheme: (colorScheme as ColorScheme) || ColorScheme.Light,
        isDark,
        toggleTheme: toggleColorScheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
