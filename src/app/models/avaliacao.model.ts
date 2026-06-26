export interface Avaliacao {
  id: string;
  clinicaId: string;
  nomeClinica: string;
  nomeUsuario: string;
  nota: number;
  comentario: string;
  dataCriacao: string;
}

export interface CriarAvaliacao {
  clinicaId: string;
  nota: number;
  comentario: string;
}

export interface AtualizarAvaliacao {
  nota: number;
  comentario: string;
}