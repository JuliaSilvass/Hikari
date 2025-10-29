export class Personagem {
  public id: string;
  public nome: string;
  public papel: string;
  public idade: number;
  public animeId: string;
  public userId: string;

  constructor(obj?: Partial<Personagem>) {
    this.id = obj?.id || '';
    this.nome = obj?.nome || '';
    this.papel = obj?.papel || '';
    this.idade = obj?.idade ?? 0;
    this.animeId = obj?.animeId || '';
    this.userId = obj?.userId || '';
  }

  toString(): string {
    return JSON.stringify(
      {
        id: this.id,
        nome: this.nome,
        papel: this.papel,
        idade: this.idade,
        animeId: this.animeId,
        userId: this.userId,
      },
      null,
      2
    );
  }

  toFirestore() {
    return {
      nome: this.nome,
      papel: this.papel,
      idade: this.idade,
      animeId: this.animeId,
      userId: this.userId,
    };
  }
}
