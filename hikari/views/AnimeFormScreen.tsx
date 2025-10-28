import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { styles } from '../styles/style';
import { Anime } from '../models/Anime';
import { AnimeController } from '../controllers/AnimeController';
import { auth } from '../config/firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, any>;

export default function AnimeFormScreen({ navigation, route }: Props) {
  const animeEdicao: Anime | undefined = route.params?.anime;

  const [titulo, setTitulo] = useState(animeEdicao?.titulo || '');
  const [genero, setGenero] = useState(animeEdicao?.genero || '');
  const [anoLancamento, setAnoLancamento] = useState(
    animeEdicao?.anoLancamento?.toString() || ''
  );
  const [status, setStatus] = useState(animeEdicao?.status || '');
  const [estudioId, setEstudioId] = useState(animeEdicao?.estudioId || '');
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    if (!titulo || !genero || !anoLancamento) {
      Toast.show({
        type: 'error',
        text1: 'Campos obrigatórios',
        text2: 'Preencha título, gênero e ano.',
      });
      return;
    }

    if (!auth.currentUser) {
      Toast.show({
        type: 'error',
        text1: 'Sessão expirada',
        text2: 'Faça login novamente.',
      });
      navigation.replace('Login');
      return;
    }

    setLoading(true);

    if (animeEdicao && animeEdicao.id) {
      const sucesso = await AnimeController.atualizarAnime(animeEdicao.id, {
        titulo,
        genero,
        anoLancamento: parseInt(anoLancamento),
        status,
        estudioId,
      });

      setLoading(false);

      if (sucesso) {
        Toast.show({ type: 'success', text1: 'Anime atualizado!' });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao atualizar anime',
          text2: 'Tente novamente.',
        });
      }
    } else {
      const novoAnime = new Anime({
        titulo,
        genero,
        anoLancamento: parseInt(anoLancamento),
        status,
        estudioId,
        userId: auth.currentUser.uid,
      });

      const id = await AnimeController.adicionarAnime(novoAnime);

      setLoading(false);

      if (id) {
        Toast.show({ type: 'success', text1: 'Anime adicionado!' });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao adicionar anime',
          text2: 'Tente novamente.',
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {animeEdicao ? 'Editar Anime ✏️' : 'Novo Anime 🌸'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#999"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={styles.input}
        placeholder="Gênero"
        placeholderTextColor="#999"
        value={genero}
        onChangeText={setGenero}
      />

      <TextInput
        style={styles.input}
        placeholder="Ano de lançamento"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={anoLancamento}
        onChangeText={setAnoLancamento}
      />

      <TextInput
        style={styles.input}
        placeholder="Status (Assistindo, Completo...)"
        placeholderTextColor="#999"
        value={status}
        onChangeText={setStatus}
      />

      <TextInput
        style={styles.input}
        placeholder="Estúdio"
        placeholderTextColor="#999"
        value={estudioId}
        onChangeText={setEstudioId}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSalvar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {animeEdicao ? 'Salvar Alterações' : 'Cadastrar'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
