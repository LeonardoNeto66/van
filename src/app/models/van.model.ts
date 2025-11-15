export interface Van {
  id: string; // uuid
  placa: string;
  renavam: string;
  marcaModelo: string;
  tipo: string;
  especie: string;
  combustivel: string;
  anoModelo: number;
  anoFabricacao: number;
  potencia: number;
  cilindradas: number;
  empresaId?: string;
  createdAt: string;
}
