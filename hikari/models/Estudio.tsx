export class Estudio {
  public id?: string;        
  public nome: string;
  public pais: string;
  public anoFundacao: number;
  public userId: string;

  constructor(obj?: Partial<Estudio>) {
    this.id = obj?.id;
    this.nome = obj?.nome || '';
    this.pais = obj?.pais || '';
    this.anoFundacao = obj?.anoFundacao || 0;
    this.userId = obj?.userId || '';
  }

  toFirestore() {
    return {
      nome: this.nome,
      pais: this.pais,
      anoFundacao: this.anoFundacao,
      userId: this.userId,
    };
  }
}
