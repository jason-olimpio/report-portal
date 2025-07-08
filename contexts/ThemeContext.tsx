import {createContext, ReactNode} from 'react';
import {useColorScheme} from 'nativewind';

export type ThemeContextType = {
  colorScheme: 'light' | 'dark';
  isDark: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemeContext.Provider
      value={{
        colorScheme: colorScheme || 'light',
        isDark,
        toggleTheme: toggleColorScheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
