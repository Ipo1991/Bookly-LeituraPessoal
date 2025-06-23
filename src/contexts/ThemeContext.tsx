import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

type ThemeType = typeof MD3LightTheme;

const lightTheme: ThemeType = {
  ...MD3LightTheme,
  dark: false,
  colors: {
    ...MD3LightTheme.colors,
    background: '#f5f7fa',
    surface: '#fff',
    primary: '#1976d2',
    outline: '#888'
  }
};

const darkTheme: ThemeType = {
  ...MD3DarkTheme,
  dark: true,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#171c22',
    surface: '#222',
    primary: '#90caf9',
    outline: '#ccc'
  }
};

type ThemeContextType = {
  isDark: boolean;
  theme: ThemeType;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  theme: lightTheme,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((v) => !v);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}