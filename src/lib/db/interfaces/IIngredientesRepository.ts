// Contrato TypeScript do repositório de ingredientes — implementado em lib/db/supabase/ingredientesRepository.ts

export interface Ingrediente {
  id: string;
  user_id: string;
  nome: string;
  categoria: string;
  unidade_medida: string;
  preco_total: number;
  quantidade_total: number;
  estoque_atual: number;
  estoque_minimo: number;
  custo_por_unidade?: number;
  created_at: string;
  updated_at: string;
}

export interface IngredienteInput {
  nome: string;
  categoria: string;
  unidade_medida: string;
  preco_total: number;
  quantidade_total: number;
  estoque_atual: number;
  estoque_minimo: number;
}

export interface IIngredientesRepository {
  listar(userId: string): Promise<Ingrediente[]>;
  buscarPorId(id: string, userId: string): Promise<Ingrediente | null>;
  criar(userId: string, dados: IngredienteInput): Promise<Ingrediente>;
  atualizar(
    id: string,
    userId: string,
    dados: Partial<IngredienteInput>,
  ): Promise<Ingrediente>;
  deletar(id: string, userId: string): Promise<void>;
}
