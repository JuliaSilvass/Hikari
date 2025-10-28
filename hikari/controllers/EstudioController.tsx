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
import { Estudio } from '../models/Estudio';

const COLLECTION_NAME = 'estudios';

export class EstudioController {
  // Criar novo estúdio
  static async adicionarEstudio(estudio: Estudio): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), estudio.toFirestore());
      console.log('Estúdio adicionado com ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar estúdio:', error);
      return null;
    }
  }

  // Listar estúdios por usuário logado
  static async listarEstudiosPorUsuario(userId: string): Promise<Estudio[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), where('userId', '==', userId));
      const snapshot = await getDocs(q);

      const lista: Estudio[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        lista.push(new Estudio({ id: docSnap.id, ...data }));
      });

      return lista;
    } catch (error) {
      console.error('Erro ao listar estúdios:', error);
      return [];
    }
  }

  // Atualizar um estúdio existente
  static async atualizarEstudio(id: string, novosDados: Partial<Estudio>): Promise<boolean> {
    try {
      if (!id) throw new Error('ID inválido para atualização');
      const ref = doc(db, COLLECTION_NAME, id);
      await updateDoc(ref, novosDados);
      console.log('Estúdio atualizado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao atualizar estúdio:', error);
      return false;
    }
  }

  // Excluir um estúdio
  static async excluirEstudio(id: string): Promise<boolean> {
    try {
      if (!id) throw new Error('ID inválido para exclusão');
      const ref = doc(db, COLLECTION_NAME, id);
      await deleteDoc(ref);
      console.log('Estúdio excluído com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao excluir estúdio:', error);
      return false;
    }
  }
}
