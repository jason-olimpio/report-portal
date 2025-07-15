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

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
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
