import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, IconButton, Text, Paragraph, Title, useTheme } from 'react-native-paper';
import { useLeitura } from '../contexts/LeituraContext';
import CircularProgress from '../components/CircularProgress';

export default function Favoritos() {
  const { livros, alternarFavorito } = useLeitura();
  const favoritos = livros.filter(l => l.favorito);
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 24,
      backgroundColor: theme.colors.background,
    },
    titulo: {
      fontSize: 20,
      color: theme.colors.primary,
      fontWeight: 'bold',
      marginBottom: 16,
      alignSelf: 'center',
    },
    vazio: {
      textAlign: 'center',
      marginTop: 32,
      fontSize: 16,
      color: theme.colors.outline,
    },
    list: {
      padding: 16,
      width: '100%',
    },
    card: {
      marginBottom: 18,
      borderRadius: 18,
      backgroundColor: theme.colors.surface,
      padding: 8,
    },
    cardFavorito: {
      borderWidth: 2,
      borderColor: '#FFD600',
    },
    rowHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 2,
    },
    cardTitulo: {
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
    favoritoIcon: {
      margin: 0,
      marginLeft: 8,
      alignSelf: 'flex-start',
    },
    progressSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 6,
    },
    progressDetails: {
      flex: 1,
      marginLeft: 16,
    },
    progressTxt: {
      fontSize: 15,
      color: theme.colors.primary,
      fontWeight: '600',
      marginBottom: 2,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Favoritos</Text>
      {favoritos.length === 0 ? (
        <Text style={styles.vazio}>Nenhum livro favorito.</Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const progresso = item.totalPaginas
              ? Math.min(item.progresso / item.totalPaginas, 1)
              : 0;
            return (
              <Card style={[styles.card, styles.cardFavorito]} elevation={5}>
                <View style={styles.rowHeader}>
                  <View style={{ flex: 1 }}>
                    <Title style={styles.cardTitulo}>{item.titulo}</Title>
                    <Paragraph style={styles.autorGenero}>
                      {item.autor} • {item.genero}
                    </Paragraph>
                  </View>
                  <IconButton
                    icon="star"
                    size={26}
                    iconColor="#FFD600"
                    style={styles.favoritoIcon}
                    onPress={() => alternarFavorito(item.id)}
                  />
                </View>
                <Paragraph style={styles.anoTxt}>Ano: {item.ano}</Paragraph>
                <View style={styles.progressSection}>
                  <CircularProgress progress={progresso}>
                    <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 15 }}>
                      {Math.round(progresso * 100)}%
                    </Text>
                  </CircularProgress>
                  <View style={styles.progressDetails}>
                    <Paragraph style={styles.progressTxt}>
                      {item.progresso} / {item.totalPaginas} páginas
                    </Paragraph>
                  </View>
                </View>
              </Card>
            );
          }}
        />
      )}
    </View>
  );
}