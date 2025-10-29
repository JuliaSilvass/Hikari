import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { styles } from '../styles/style';
import { PersonagemController } from '../controllers/PersonagemController';
import { Personagem } from '../models/Personagem';

export default function PersonagemListScreen({ navigation, route }: any) {
  const animeId = route.params?.animeId;
  const animeTitulo = route.params?.animeTitulo || 'Anime';
  const [personagens, setPersonagens] = useState<Personagem[]>([]);

  const carregar = async () => {
    try {
      const lista = await PersonagemController.listarPorAnime(animeId);
      setPersonagens(lista);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao carregar personagens',
        text2: 'Tente novamente mais tarde.',
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  const handleExcluir = (personagem: Personagem) => {
    Alert.alert(
      'Excluir Personagem',
      `Deseja excluir "${personagem.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const sucesso = await PersonagemController.excluirPersonagem(personagem.id);
            if (sucesso) {
              Toast.show({ type: 'success', text1: 'Personagem excluído com sucesso!' });
              carregar();
            } else {
              Toast.show({ type: 'error', text1: 'Erro ao excluir personagem.' });
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personagens de {animeTitulo}</Text>

      {personagens.length === 0 ? (
        <Text style={styles.text}>Nenhum personagem cadastrado ainda.</Text>
      ) : (
        <FlatList
          data={personagens}
          keyExtractor={(item) => item.id || item.nome}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.info}>
                {item.papel} • {item.idade} anos
              </Text>

              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity
                  style={[styles.button, { flex: 1, marginRight: 5, padding: 8 }]}
                  onPress={() =>
                    navigation.navigate('PersonagemForm', { personagem: item, animeId })
                  }
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    { flex: 1, backgroundColor: '#d81b60', padding: 8 },
                  ]}
                  onPress={() => handleExcluir(item)}
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Botão flutuante para novo personagem */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('PersonagemForm', { animeId })}
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
