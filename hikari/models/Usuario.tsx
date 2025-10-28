export class Usuario {
  public id: string;
  public nome: string;
  public email: string;
  public fone: string;
  public dataNascimento: Date;

  constructor(obj?: Partial<Usuario>) {
    this.id = obj?.id ?? '';
    this.nome = obj?.nome ?? '';
    this.email = obj?.email ?? '';
    this.fone = obj?.fone ?? '';
    
    if (obj?.dataNascimento instanceof Date) {
      this.dataNascimento = obj.dataNascimento;
    } else if (typeof obj?.dataNascimento === 'string' && obj.dataNascimento !== '') {
      this.dataNascimento = new Date(obj.dataNascimento);
    } else {
      this.dataNascimento = new Date();
    }
  }

  toString() {
    return `{
      "id"             : "${this.id}",
      "nome"           : "${this.nome}",
      "email"          : "${this.email}",
      "fone"           : "${this.fone}",
      "dataNascimento" : "${this.dataNascimento.toISOString()}"
    }`;
  }

  toFirestore() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      fone: this.fone,
      dataNascimento: this.dataNascimento,
    };
  }
}
