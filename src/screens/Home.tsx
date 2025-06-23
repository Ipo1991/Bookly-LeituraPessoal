import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Modal, Platform, Alert } from 'react-native';
import { Card, Title, Paragraph, IconButton, Button, TextInput, Text, useTheme } from 'react-native-paper';
import { useLeitura } from '../contexts/LeituraContext';
import CircularProgress from '../components/CircularProgress';

export default function Home() {
  const { livros, alternarFavorito, atualizarProgresso, excluirLivro } = useLeitura();
  const theme = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLivro, setSelectedLivro] = useState<any>(null);
  const [novoProgresso, setNovoProgresso] = useState('');

  const abrirModalProgresso = (livro: any) => {
    setSelectedLivro(livro);
    setNovoProgresso(livro.progresso.toString());
    setModalVisible(true);
  };

  const salvarProgresso = () => {
    if (selectedLivro && novoProgresso !== '') {
      let progressoNum = Number(novoProgresso);

      if (isNaN(progressoNum)) {
        Alert.alert('Erro', 'Digite um número válido!');
        return;
      }
      if (progressoNum < 0) {
        Alert.alert('Erro', 'O número de páginas não pode ser negativo!');
        return;
      }
      if (progressoNum > selectedLivro.totalPaginas) {
        Alert.alert('Erro', `O valor não pode ser maior que o total de páginas (${selectedLivro.totalPaginas})!`);
        return;
      }

      atualizarProgresso(selectedLivro.id, progressoNum);
      setModalVisible(false);
      setSelectedLivro(null);
      setNovoProgresso('');
    }
  };

  const confirmarExclusao = (livroId: string, titulo: string) => {
    if (Platform.OS === 'web') {
      if (window.confirm(`Tem certeza que deseja excluir "${titulo}"?`)) {
        excluirLivro(livroId);
      }
    } else {
      Alert.alert(
        'Excluir livro',
        `Tem certeza que deseja excluir "${titulo}"?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Excluir', style: 'destructive', onPress: () => excluirLivro(livroId) },
        ]
      );
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 24,
      backgroundColor: theme.colors.background
    },
    text: {
      fontSize: 20,
      marginBottom: 16,
      color: theme.colors.primary,
      fontWeight: 'bold'
    },
    empty: {
      marginTop: 32,
      fontSize: 16,
      color: theme.colors.outline,
      textAlign: 'center'
    },
    list: {
      padding: 16,
      width: '100%'
    },
    card: {
      marginBottom: 18,
      borderRadius: 18,
      backgroundColor: theme.colors.surface,
      padding: 8
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
    favoritoIcon: {
      margin: 0,
      marginLeft: 8,
      alignSelf: 'flex-start',
    },
    deleteIcon: {
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
      marginLeft: 16
    },
    progressTxt: {
      fontSize: 15,
      color: theme.colors.primary,
      fontWeight: '600',
      marginBottom: 2,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '90%',
      backgroundColor: theme.colors.surface,
      borderRadius: 18,
      padding: 24,
      elevation: 6,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bookly, seu app de leitura pessoal!</Text>
      <View style={{ flex: 1, width: '100%' }}>
        {livros.length === 0 ? (
          <Text style={styles.empty}>Nenhum livro adicionado ainda. Para começar clique em Novo Livro.</Text>
        ) : (
          <FlatList
            data={livros}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => {
              const progresso = item.totalPaginas
                ? Math.min(item.progresso / item.totalPaginas, 1)
                : 0;
              return (
                <Card
                  style={[
                    styles.card,
                    item.favorito && styles.cardFavorito
                  ]}
                  elevation={item.favorito ? 5 : 3}
                >
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
                      style={styles.favoritoIcon}
                      onPress={() => alternarFavorito(item.id)}
                    />
                    <IconButton
                      icon="delete"
                      size={24}
                      iconColor="#F44336"
                      style={styles.deleteIcon}
                      onPress={() => confirmarExclusao(item.id, item.titulo)}
                      accessibilityLabel="Excluir livro"
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
                      <IconButton
                        icon="pencil"
                        size={20}
                        onPress={() => abrirModalProgresso(item)}
                        accessibilityLabel="Editar progresso"
                      />
                    </View>
                  </View>
                </Card>
              );
            }}
          />
        )}
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Title>Editar Progresso</Title>
            <TextInput
              label="Páginas lidas"
              value={novoProgresso}
              onChangeText={setNovoProgresso}
              keyboardType="numeric"
              mode="outlined"
              theme={{
                colors: {
                  primary: theme.colors.primary,
                  background: theme.colors.background,
                  placeholder: theme.colors.outline
                },
                roundness: 12
              }}
              style={{ marginBottom: 12 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button onPress={() => setModalVisible(false)}>Cancelar</Button>
              <Button
                mode="contained"
                onPress={salvarProgresso}
                style={{ marginLeft: 8 }}
              >
                Salvar
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}