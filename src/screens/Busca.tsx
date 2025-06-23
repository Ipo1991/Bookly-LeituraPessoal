import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, Card, Title, Paragraph, IconButton, Text, useTheme } from 'react-native-paper';
import { useLeitura } from '../contexts/LeituraContext';

export default function Busca() {
  const { livros, alternarFavorito } = useLeitura();
  const [busca, setBusca] = useState('');
  const theme = useTheme();

  const livrosFiltrados = livros.filter(livro =>
    livro.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    livro.autor.toLowerCase().includes(busca.toLowerCase()) ||
    livro.genero.toLowerCase().includes(busca.toLowerCase())
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 24,
      backgroundColor: theme.colors.background,
    },
    input: {
      width: '90%',
      marginBottom: 16,
      backgroundColor: theme.colors.elevation.level1, // para papel/textinput
    },
    list: {
      width: '100%',
      paddingHorizontal: 16,
    },
    empty: {
      marginTop: 32,
      fontSize: 16,
      color: theme.colors.outline,
      textAlign: 'center'
    },
    card: {
      marginBottom: 18,
      borderRadius: 18,
      backgroundColor: theme.colors.surface,
      padding: 8
    },
    rowHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 2,
    },
    titulo: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginBottom: 2,
    },
    autorGenero: {
      color: theme.colors.onSurface,
      fontSize: 15,
      marginBottom: 2,
    },
    anoTxt: {
      fontSize: 14,
      color: theme.colors.outline,
      marginBottom: 6,
      marginLeft: 2,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        label="Buscar por título, autor ou gênero"
        value={busca}
        onChangeText={setBusca}
        mode="outlined"
        style={styles.input}
        theme={{
          roundness: 12,
          colors: {
            primary: theme.colors.primary,
            background: theme.colors.elevation.level1,
            placeholder: theme.colors.outline,
          }
        }}
        autoFocus
      />
      {busca.length > 0 && livrosFiltrados.length === 0 ? (
        <Text style={styles.empty}>Nenhum livro encontrado.</Text>
      ) : (
        <FlatList
          data={livrosFiltrados}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Card style={styles.card} elevation={item.favorito ? 5 : 3}>
              <View style={styles.rowHeader}>
                <View style={{ flex: 1 }}>
                  <Title style={styles.titulo}>{item.titulo}</Title>
                  <Paragraph style={styles.autorGenero}>
                    {item.autor} • {item.genero}
                  </Paragraph>
                </View>
                <IconButton
                  icon={item.favorito ? "star" : "star-outline"}
                  size={26}
                  iconColor="#FFD600"
                  onPress={() => alternarFavorito(item.id)}
                />
              </View>
              <Paragraph style={styles.anoTxt}>Ano: {item.ano}</Paragraph>
            </Card>
          )}
        />
      )}
    </View>
  );
}