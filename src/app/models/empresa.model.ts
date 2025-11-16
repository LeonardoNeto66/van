export interface Empresa {
  id: string;
  nome: string;
  nomeFantasia?: string;
  cnpj?: string;
  responsavelLegal?: string;
  cpfResponsavel?: string;
  dataAbertura?: string;
  endereco?: string;
  telefone?: string;
  responsavel?: string; // legado
  solicitante?: string;
  createdAt: string;
  funcionarios?: string[];
  vans?: string[];
}
