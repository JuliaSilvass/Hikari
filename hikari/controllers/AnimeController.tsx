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
import { Anime } from '../models/Anime';

const COLLECTION_NAME = 'animes';

export class AnimeController {
  // Criar novo anime
  static async adicionarAnime(anime: Anime): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), anime.toFirestore());
      console.log('Anime adicionado com ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar anime:', error);
      return null;
    }
  }

  // Listar animes por usuário
  static async listarAnimesPorUsuario(userId: string): Promise<Anime[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), where('userId', '==', userId));
      const snapshot = await getDocs(q);

      return snapshot.docs.map((d) => {
        const data = d.data();
        return new Anime({ id: d.id, ...data });
      });
    } catch (error) {
      console.error('Erro ao listar animes:', error);
      return [];
    }
  }

  // Atualizar anime existente
  static async atualizarAnime(id: string, novosDados: Partial<Anime>): Promise<boolean> {
    try {
      if (!id) throw new Error('ID inválido para atualização');
      const ref = doc(db, COLLECTION_NAME, id);
      await updateDoc(ref, novosDados);
      console.log('Anime atualizado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao atualizar anime:', error);
      return false;
    }
  }

  // Excluir anime
  static async excluirAnime(id: string): Promise<boolean> {
    try {
      if (!id) throw new Error('ID inválido para exclusão');
      const ref = doc(db, COLLECTION_NAME, id);
      await deleteDoc(ref);
      console.log('Anime excluído com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao excluir anime:', error);
      return false;
    }
  }
}
