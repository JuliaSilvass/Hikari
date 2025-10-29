import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { styles } from '../styles/style';
import { Personagem } from '../models/Personagem';
import { PersonagemController } from '../controllers/PersonagemController';
import { auth } from '../config/firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, any>;

export default function PersonagemFormScreen({ navigation, route }: Props) {
  const animeId = route.params?.animeId;
  const personagemEdicao: Personagem | undefined = route.params?.personagem;

  const [nome, setNome] = useState(personagemEdicao?.nome || '');
  const [papel, setPapel] = useState(personagemEdicao?.papel || '');
  const [idade, setIdade] = useState(personagemEdicao?.idade?.toString() || '');
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    if (!nome || !papel || !idade) {
      Toast.show({
        type: 'error',
        text1: 'Campos obrigatórios',
        text2: 'Preencha todos os campos antes de salvar.',
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

    try {
      if (personagemEdicao && personagemEdicao.id) {
        // Atualiza personagem existente
        const sucesso = await PersonagemController.atualizarPersonagem(personagemEdicao.id, {
          nome,
          papel,
          idade: parseInt(idade),
        });

        setLoading(false);

        if (sucesso) {
          Toast.show({ type: 'success', text1: 'Personagem atualizado com sucesso!' });
          navigation.goBack();
        } else {
          Toast.show({
            type: 'error',
            text1: 'Erro ao atualizar personagem',
            text2: 'Tente novamente.',
          });
        }
      } else {
        // Cria novo personagem
        const novoPersonagem = new Personagem({
          nome,
          papel,
          idade: parseInt(idade),
          animeId,
          userId: auth.currentUser.uid,
        });

        const id = await PersonagemController.adicionarPersonagem(novoPersonagem);
        setLoading(false);

        if (id) {
          Toast.show({ type: 'success', text1: 'Personagem adicionado!' });
          navigation.goBack();
        } else {
          Toast.show({
            type: 'error',
            text1: 'Erro ao adicionar personagem',
            text2: 'Tente novamente.',
          });
        }
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Erro inesperado',
        text2: 'Não foi possível salvar o personagem.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {personagemEdicao ? 'Editar Personagem' : 'Novo Personagem'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Papel (Protagonista, Antagonista...)"
        placeholderTextColor="#999"
        value={papel}
        onChangeText={setPapel}
      />

      <TextInput
        style={styles.input}
        placeholder="Idade"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={idade}
        onChangeText={setIdade}
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
            {personagemEdicao ? 'Salvar Alterações' : 'Cadastrar'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
