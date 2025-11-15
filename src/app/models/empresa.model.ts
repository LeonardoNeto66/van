export interface Empresa {
  id: string;
  nome: string;
  cnpj?: string;
  responsavel?: string;
  solicitante?: string;
  createdAt: string;
  funcionarios?: string[]; // nomes simples
  vans?: string[]; // van ids
}
