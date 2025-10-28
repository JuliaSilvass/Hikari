import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { Usuario } from '../models/Usuario';

const COLLECTION_NAME = 'usuarios';

export class UsuarioController {
  // Cadastrar novo usuário (Auth + Firestore)
  static async cadastrarUsuario(usuario: Usuario, senha: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, usuario.email, senha);
      usuario.id = userCredential.user.uid;

      await addDoc(collection(db, COLLECTION_NAME), usuario.toFirestore());
      console.log('Usuário cadastrado com sucesso!');
      return userCredential.user;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Login com email e senha
  static async login(email: string, senha: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      console.log('Login realizado com sucesso!');
      return userCredential.user;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Logout
  static async logout() {
    try {
      await signOut(auth);
      console.log('Logout realizado!');
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
