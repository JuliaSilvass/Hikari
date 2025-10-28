export class Estudio {
  public id: string;
  public nome: string;
  public pais: string;
  public anoFundacao: number;
  public userId: string;

  constructor(obj?: Partial<Estudio>) {
    if (obj) {
      this.id = obj.id || '';
      this.nome = obj.nome || '';
      this.pais = obj.pais || '';
      this.anoFundacao = obj.anoFundacao || 0;
      this.userId = obj.userId || '';
    }
  }

  toString() {
    return JSON.stringify({
      id: this.id,
      nome: this.nome,
      pais: this.pais,
      anoFundacao: this.anoFundacao,
      userId: this.userId,
    });
  }

  toFirestore() {
    return {
      id: this.id,
      nome: this.nome,
      pais: this.pais,
      anoFundacao: this.anoFundacao,
      userId: this.userId,
    };
  }
}
