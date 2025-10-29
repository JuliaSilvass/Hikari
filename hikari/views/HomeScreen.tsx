import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { AnimeController } from '../controllers/AnimeController';
import { EstudioController } from '../controllers/EstudioController';
import { Anime } from '../models/Anime';
import { Estudio } from '../models/Estudio';
import { auth } from '../config/firebase';
import { styles } from '../styles/style';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function HomeScreen({ navigation }: any) {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [estudios, setEstudios] = useState<Estudio[]>([]);

  const carregar = async () => {
    if (!auth.currentUser) {
      Toast.show({
        type: 'error',
        text1: 'Sessão expirada',
        text2: 'Faça login novamente.',
      });
      navigation.replace('Login');
      return;
    }

    try {
      const [listaAnimes, listaEstudios] = await Promise.all([
        AnimeController.listarAnimesPorUsuario(auth.currentUser.uid),
        EstudioController.listarEstudiosPorUsuario(auth.currentUser.uid),
      ]);

      setAnimes(listaAnimes);
      setEstudios(listaEstudios);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao carregar dados',
        text2: 'Tente novamente mais tarde.',
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  const getNomeEstudio = (estudioId: string) => {
    const estudio = estudios.find((e) => e.id === estudioId);
    return estudio ? estudio.nome : '-';
  };

  const handleExcluir = (anime: Anime) => {
    Alert.alert(
      'Excluir Anime',
      `Tem certeza que deseja excluir "${anime.titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            if (!anime.id) return;
            const sucesso = await AnimeController.excluirAnime(anime.id);
            if (sucesso) {
              Toast.show({ type: 'success', text1: 'Anime excluído com sucesso!' });
              carregar();
            } else {
              Toast.show({ type: 'error', text1: 'Erro ao excluir anime.' });
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Animes</Text>

      {animes.length === 0 ? (
        <Text style={styles.text}>Você ainda não adicionou nenhum anime.</Text>
      ) : (
        <FlatList
          data={animes}
          keyExtractor={(item) => item.id || item.titulo}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>{item.titulo}</Text>
              <Text style={styles.info}>
                {item.genero} • {item.status} • {item.anoLancamento}
              </Text>
              <Text style={[styles.info, { fontStyle: 'italic', color: '#d81b60' }]}>
                {getNomeEstudio(item.estudioId)}
              </Text>

              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity
                  style={[styles.button, { flex: 1, marginRight: 5, padding: 8 }]}
                  onPress={() => navigation.navigate('AnimeForm', { anime: item })}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { flex: 1, backgroundColor: '#d81b60', padding: 8 }]}
                  onPress={() => handleExcluir(item)}
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>

              {/* Botão Personagens */}
              <TouchableOpacity
                style={[styles.button, { marginTop: 10, padding: 8 }]}
                onPress={() =>
                  navigation.navigate('PersonagemList', {
                    animeId: item.id,
                    animeTitulo: item.titulo,
                  })
                }
              >
                <Text style={styles.buttonText}>Ver Personagens</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Botão para acessar os estúdios */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            position: 'absolute',
            bottom: 100,
            right: 30,
            width: 120,
            borderRadius: 50,
          },
        ]}
        onPress={() => navigation.navigate('EstudioList')}
      >
        <Text style={styles.buttonText}>Estúdios</Text>
      </TouchableOpacity>

      {/* Botão flutuante para novo anime */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AnimeForm')}
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
