import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title, useTheme, Text } from 'react-native-paper';

export default function BoasVindas({ onEntrar }: { onEntrar: () => void }) {
  const theme = useTheme();

  return (
    <View style={styles(theme).container}>
      <Title style={styles(theme).titulo}>Boas-vindas ao Bookly</Title>
      <Text style={styles(theme).descricao}>
        Para começar, clique em iniciar.
      </Text>
      <Button
        mode="contained"
        onPress={onEntrar}
        style={styles(theme).botao}
        contentStyle={{ height: 48 }}
        labelStyle={{ fontWeight: 'bold', letterSpacing: 1 }}
      >
        Iniciar
      </Button>
    </View>
  );
}

const styles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 28,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 16,
    color: theme.colors.onBackground,
    marginBottom: 32,
    textAlign: 'center',
  },
  botao: {
    width: '90%',
    borderRadius: 12,
    marginTop: 12,
  },
});