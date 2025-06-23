import React from 'react';
import { View } from 'react-native';
import { List, Switch, Text } from 'react-native-paper';
import { useThemeContext } from '../contexts/ThemeContext';

export default function Configuracoes() {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <List.Section>
        <List.Item
          title="Tema escuro"
          left={() => <List.Icon icon="theme-light-dark" />}
          right={() => (
            <Switch value={isDark} onValueChange={toggleTheme} />
          )}
        />
      </List.Section>
      <Text style={{ marginTop: 16 }}>Personalize seu app!</Text>
    </View>
  );
}