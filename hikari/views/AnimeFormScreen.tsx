import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { styles } from '../styles/style';
import { Anime } from '../models/Anime';
import { AnimeController } from '../controllers/AnimeController';
import { EstudioController } from '../controllers/EstudioController';
import { Estudio } from '../models/Estudio';
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
  const [estudios, setEstudios] = useState<Estudio[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Carrega todos os estúdios do usuário logado
  useEffect(() => {
    const carregarEstudios = async () => {
      if (!auth.currentUser) return;
      const lista = await EstudioController.listarEstudiosPorUsuario(auth.currentUser.uid);
      setEstudios(lista);
    };
    carregarEstudios();
  }, []);

  const handleSalvar = async () => {
    if (!titulo || !genero || !anoLancamento || !estudioId) {
      Toast.show({
        type: 'error',
        text1: 'Campos obrigatórios',
        text2: 'Preencha título, gênero, ano e selecione um estúdio.',
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
        {animeEdicao ? 'Editar Anime' : 'Novo Anime'}
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

      {/* 🔹 Picker para selecionar o estúdio */}
      <View style={styles.input}>
        <Picker
          selectedValue={estudioId}
          onValueChange={(itemValue) => setEstudioId(itemValue)}
          style={{ color: '#333' }}
        >
          <Picker.Item label="Selecione um estúdio" value="" />
          {estudios.map((e) => (
            <Picker.Item key={e.id} label={e.nome} value={e.id} />
          ))}
        </Picker>
      </View>

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
