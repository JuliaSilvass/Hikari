import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Usuario } from '../models/Usuario';
import { UsuarioController } from '../controllers/UsuarioController';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from '../styles/style';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<any, any>;

export default function RegisterScreen({ navigation }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [fone, setFone] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Toast.show({
        type: 'error',
        text1: 'Campos obrigatórios',
        text2: 'Preencha nome, e-mail e senha para continuar.',
      });
      return;
    }

    try {
      setLoading(true);
      const usuario = new Usuario({
        nome,
        email,
        fone,
        dataNascimento,
      });

      await UsuarioController.cadastrarUsuario(usuario, senha);
      Toast.show({
        type: 'success',
        text1: 'Cadastro realizado com sucesso!',
      });
      navigation.replace('Home');
    } catch (error: any) {
      let message = 'Erro ao cadastrar.';

      if (error.code === 'auth/email-already-in-use') {
        message = 'Este e-mail já está em uso.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Formato de e-mail inválido.';
      } else if (error.code === 'auth/weak-password') {
        message = 'A senha deve ter pelo menos 6 caracteres.';
      }

      Toast.show({
        type: 'error',
        text1: 'Erro no cadastro',
        text2: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta 🌸</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="#999"
        value={fone}
        onChangeText={setFone}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* 🌸 Campo de data com estilo de input */}
      <TouchableOpacity
        style={styles.dateBox}
        onPress={() => setShowDate(true)}
      >
        <Text style={styles.dateText}>
          Data de nascimento: {dataNascimento.toLocaleDateString('pt-BR')}
        </Text>
      </TouchableOpacity>

      {showDate && (
        <DateTimePicker
          value={dataNascimento}
          mode="date"
          display="default"
          onChange={(_, date) => {
            setShowDate(false);
            if (date) setDataNascimento(date);
          }}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tenho uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}
