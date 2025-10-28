import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { EstudioController } from '../controllers/EstudioController';
import { Estudio } from '../models/Estudio';
import { auth } from '../config/firebase';
import { styles } from '../styles/style';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function EstudioListScreen({ navigation }: any) {
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

    const lista = await EstudioController.listarEstudiosPorUsuario(auth.currentUser.uid);
    setEstudios(lista);
  };

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  const handleExcluir = (estudio: Estudio) => {
    Alert.alert(
      'Excluir Estúdio',
      `Tem certeza que deseja excluir "${estudio.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            if (!estudio.id) return;
            const sucesso = await EstudioController.excluirEstudio(estudio.id);
            if (sucesso) {
              Toast.show({ type: 'success', text1: 'Estúdio excluído com sucesso!' });
              carregar();
            } else {
              Toast.show({ type: 'error', text1: 'Erro ao excluir estúdio.' });
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 Meus Estúdios</Text>

      {estudios.length === 0 ? (
        <Text style={styles.text}>Você ainda não cadastrou nenhum estúdio.</Text>
      ) : (
        <FlatList
          data={estudios}
          keyExtractor={(item) => item.id || item.nome}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.info}>
                {item.pais} • Fundado em {item.anoFundacao}
              </Text>

              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity
                  style={[styles.button, { flex: 1, marginRight: 5, padding: 8 }]}
                  onPress={() => navigation.navigate('EstudioForm', { estudio: item })}
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

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('EstudioForm')}
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
