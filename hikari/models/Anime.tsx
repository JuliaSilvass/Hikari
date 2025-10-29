export class Anime {
  public id?: string; 
  public titulo: string;
  public genero: string;
  public anoLancamento: number;
  public status: string;
  public estudioId: string;
  public userId: string;

  constructor(obj?: Partial<Anime>) {
    this.id = obj?.id;
    this.titulo = obj?.titulo || '';
    this.genero = obj?.genero || '';
    this.anoLancamento = obj?.anoLancamento || 0;
    this.status = obj?.status || 'Assistindo';
    this.estudioId = obj?.estudioId || '';
    this.userId = obj?.userId || '';
  }

  toFirestore() {
    return {
      titulo: this.titulo,
      genero: this.genero,
      anoLancamento: this.anoLancamento,
      status: this.status,
      estudioId: this.estudioId,
      userId: this.userId,
    };
  }
}
