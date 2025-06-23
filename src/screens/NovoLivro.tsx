import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Snackbar, Title, useTheme } from 'react-native-paper';
import { useLeitura } from '../contexts/LeituraContext';
import { v4 as uuidv4 } from 'uuid';

export default function NovoLivro({ navigation }: any) {
  const { adicionarLivro } = useLeitura();
  const theme = useTheme();

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [ano, setAno] = useState('');
  const [totalPaginas, setTotalPaginas] = useState('');
  const [erro, setErro] = useState('');

  const handleAdicionar = () => {
    if (!titulo || !autor || !genero || !ano || !totalPaginas) {
      setErro('Preencha todos os campos.');
      return;
    }
    if (isNaN(Number(ano)) || isNaN(Number(totalPaginas))) {
      setErro('Ano e Total de Páginas devem ser números.');
      return;
    }
    adicionarLivro({
      id: uuidv4(),
      titulo,
      autor,
      genero,
      ano: Number(ano),
      totalPaginas: Number(totalPaginas),
      progresso: 0,
      favorito: false,
    });
    setTitulo('');
    setAutor('');
    setGenero('');
    setAno('');
    setTotalPaginas('');
    setErro('');
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    card: {
      width: '100%',
      maxWidth: 420,
      borderRadius: 24,
      backgroundColor: theme.colors.surface,
      shadowColor: theme.colors.primary,
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 16,
      elevation: 8,
      marginBottom: 16,
    },
    header: {
      alignItems: 'center',
      marginBottom: 12,
    },
    title: {
      color: theme.colors.primary,
      fontWeight: 'bold',
      fontSize: 22,
      letterSpacing: 1,
      marginBottom: 12,
    },
    input: {
      marginBottom: 14,
      backgroundColor: theme.colors.elevation.level1,
      color: theme.colors.onSurface
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      gap: 8,
    },
    button: {
      flex: 1,
      borderRadius: 12,
      marginHorizontal: 4,
    },
  });

  return (
    <View style={styles.container}>
      <Card style={styles.card} elevation={5}>
        <Card.Content>
          <View style={styles.header}>
            <Title style={styles.title}>Adicionar Novo Livro</Title>
          </View>
          <TextInput
            label="Título"
            value={titulo}
            onChangeText={setTitulo}
            style={styles.input}
            mode="outlined"
            theme={{ roundness: 12 }}
          />
          <TextInput
            label="Autor"
            value={autor}
            onChangeText={setAutor}
            style={styles.input}
            mode="outlined"
            theme={{ roundness: 12 }}
          />
          <TextInput
            label="Gênero"
            value={genero}
            onChangeText={setGenero}
            style={styles.input}
            mode="outlined"
            theme={{ roundness: 12 }}
          />
          <TextInput
            label="Ano"
            value={ano}
            onChangeText={setAno}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            theme={{ roundness: 12 }}
          />
          <TextInput
            label="Total de Páginas"
            value={totalPaginas}
            onChangeText={setTotalPaginas}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            theme={{ roundness: 12 }}
          />
          <View style={styles.actions}>
            <Button
              onPress={handleAdicionar}
              mode="contained"
              style={styles.button}
              buttonColor={theme.colors.primary}
              textColor={theme.colors.onPrimary}
              contentStyle={{ height: 48 }}
              labelStyle={{ fontWeight: 'bold', letterSpacing: 1 }}
            >
              Adicionar
            </Button>
            <Button
              onPress={() => navigation.goBack()}
              mode="outlined"
              style={styles.button}
              textColor={theme.colors.primary}
              contentStyle={{ height: 48 }}
              labelStyle={{ fontWeight: 'bold', letterSpacing: 1 }}
            >
              Cancelar
            </Button>
          </View>
        </Card.Content>
      </Card>
      <Snackbar
        visible={!!erro}
        onDismiss={() => setErro('')}
        duration={3000}
        style={{ backgroundColor: theme.colors.error }}
      >
        {erro}
      </Snackbar>
    </View>
  );
}