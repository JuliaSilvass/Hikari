export interface Personagem {
  id?: string;
  nome: string;
  papel: 'Protagonista' | 'Vilão' | 'Secundário';
  idade?: number;
  animeId: string; 
  userId: string;
}
