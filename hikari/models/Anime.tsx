export interface Anime {
  id?: string; 
  titulo: string;
  genero: string;
  anoLancamento: number;
  status: 'Assistindo' | 'Concluído' | 'Dropado';
  estudioId?: string; 
  imagemUrl?: string;
  userId: string; 
  dataCriacao?: Date;
}
