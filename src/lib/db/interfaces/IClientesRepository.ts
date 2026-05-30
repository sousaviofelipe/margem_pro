// Contrato TypeScript do repositório de clientes — implementado em lib/db/supabase/clientesRepository.ts

export interface Cliente {
  id: string;
  user_id: string;
  nome: string;
  telefone: string;
  email: string;
  observacoes: string;
  total_pedidos: number;
  total_gasto: number;
  created_at: string;
  updated_at: string;
}

export interface ClienteInput {
  nome: string;
  telefone: string;
  email: string;
  observacoes: string;
}

export interface IClientesRepository {
  listar(userId: string): Promise<Cliente[]>;
  buscarPorId(id: string, userId: string): Promise<Cliente | null>;
  criar(userId: string, dados: ClienteInput): Promise<Cliente>;
  atualizar(
    id: string,
    userId: string,
    dados: Partial<ClienteInput>,
  ): Promise<Cliente>;
  deletar(id: string, userId: string): Promise<void>;
}
