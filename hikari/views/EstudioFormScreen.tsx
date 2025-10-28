import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { styles } from '../styles/style';
import { Estudio } from '../models/Estudio';
import { EstudioController } from '../controllers/EstudioController';
import { auth } from '../config/firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, any>;

export default function EstudioFormScreen({ navigation, route }: Props) {
  const estudioEdicao: Estudio | undefined = route.params?.estudio;

  const [nome, setNome] = useState(estudioEdicao?.nome || '');
  const [pais, setPais] = useState(estudioEdicao?.pais || '');
  const [anoFundacao, setAnoFundacao] = useState(
    estudioEdicao?.anoFundacao?.toString() || ''
  );
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    if (!nome || !pais || !anoFundacao) {
      Toast.show({
        type: 'error',
        text1: 'Campos obrigatórios',
        text2: 'Preencha todos os campos antes de continuar.',
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

    if (estudioEdicao && estudioEdicao.id) {
      const sucesso = await EstudioController.atualizarEstudio(estudioEdicao.id, {
        nome,
        pais,
        anoFundacao: parseInt(anoFundacao),
      });

      setLoading(false);

      if (sucesso) {
        Toast.show({ type: 'success', text1: 'Estúdio atualizado!' });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao atualizar estúdio',
          text2: 'Tente novamente.',
        });
      }
    } else {
      const novoEstudio = new Estudio({
        nome,
        pais,
        anoFundacao: parseInt(anoFundacao),
        userId: auth.currentUser.uid,
      });

      const id = await EstudioController.adicionarEstudio(novoEstudio);

      setLoading(false);

      if (id) {
        Toast.show({ type: 'success', text1: 'Estúdio adicionado!' });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao adicionar estúdio',
          text2: 'Tente novamente.',
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {estudioEdicao ? 'Editar Estúdio ✏️' : 'Novo Estúdio 🌸'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do estúdio"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="País"
        placeholderTextColor="#999"
        value={pais}
        onChangeText={setPais}
      />

      <TextInput
        style={styles.input}
        placeholder="Ano de fundação"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={anoFundacao}
        onChangeText={setAnoFundacao}
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
            {estudioEdicao ? 'Salvar Alterações' : 'Cadastrar'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
