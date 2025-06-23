import * as React from 'react';
import { NavigationContainer, Theme as NavigationTheme, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { LeituraProvider } from './src/contexts/LeituraContext';
import { ThemeProvider, useThemeContext } from './src/contexts/ThemeContext';
import MainStack from './src/routes/MainStack';

function getNavigationTheme(paperTheme: any): NavigationTheme {
  return {
    ...(paperTheme.dark ? NavigationDarkTheme : NavigationDefaultTheme),
    colors: {
      ...(paperTheme.dark ? NavigationDarkTheme.colors : NavigationDefaultTheme.colors),
      background: paperTheme.colors.background,
      card: paperTheme.colors.surface,
      primary: paperTheme.colors.primary,
      text: paperTheme.colors.onBackground || paperTheme.colors.primary,
      border: paperTheme.colors.outline || (paperTheme.dark ? '#fff' : '#000'),
      notification: paperTheme.colors.error,
    }
  };
}

function Main() {
  const { theme } = useThemeContext();
  const navigationTheme = getNavigationTheme(theme);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={navigationTheme}>
        <MainStack />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LeituraProvider>
        <Main />
      </LeituraProvider>
    </ThemeProvider>
  );
}