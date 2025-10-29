import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { Personagem } from '../models/Personagem';

const COLLECTION_NAME = 'personagens';

export class PersonagemController {
  // Adicionar novo personagem
  static async adicionarPersonagem(personagem: Personagem): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), personagem.toFirestore());
      console.log('Personagem adicionado com ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar personagem:', error);
      return null;
    }
  }

  // Listar personagens de um anime específico
  static async listarPorAnime(animeId: string): Promise<Personagem[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), where('animeId', '==', animeId));
      const snapshot = await getDocs(q);

      const lista: Personagem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        lista.push(new Personagem({ id: docSnap.id, ...data }));
      });

      return lista;
    } catch (error) {
      console.error('Erro ao listar personagens:', error);
      return [];
    }
  }

  // Atualizar um personagem existente
  static async atualizarPersonagem(id: string, novosDados: Partial<Personagem>): Promise<boolean> {
    try {
      if (!id) throw new Error('ID inválido para atualização');
      const ref = doc(db, COLLECTION_NAME, id);
      await updateDoc(ref, novosDados);
      console.log('Personagem atualizado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao atualizar personagem:', error);
      return false;
    }
  }

  // Excluir personagem
  static async excluirPersonagem(id: string): Promise<boolean> {
    try {
      if (!id) throw new Error('ID inválido para exclusão');
      const ref = doc(db, COLLECTION_NAME, id);
      await deleteDoc(ref);
      console.log('Personagem excluído com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao excluir personagem:', error);
      return false;
    }
  }
}
