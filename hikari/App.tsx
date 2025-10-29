import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';

// Telas
import LoginScreen from './views/LoginScreen';
import RegisterScreen from './views/RegisterScreen';
import HomeScreen from './views/HomeScreen';
import AnimeFormScreen from './views/AnimeFormScreen';
import EstudioListScreen from './views/EstudioListScreen';
import EstudioFormScreen from './views/EstudioFormScreen';
import PersonagemListScreen from './views/PersonagemListScreen';
import PersonagemFormScreen from './views/PersonagemFormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: '#ec407a' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Hikari' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Criar Conta' }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Meus Animes' }} />
          <Stack.Screen name="AnimeForm" component={AnimeFormScreen} options={{ title: 'Novo Anime' }} />
          <Stack.Screen name="EstudioList" component={EstudioListScreen} options={{ title: 'Meus Estúdios' }} />
          <Stack.Screen name="EstudioForm" component={EstudioFormScreen} options={{ title: 'Novo Estúdio' }} />
          <Stack.Screen name="PersonagemList" component={PersonagemListScreen} options={{ title: 'Personagens' }} />
          <Stack.Screen name="PersonagemForm" component={PersonagemFormScreen} options={{ title: 'Novo Personagem' }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
