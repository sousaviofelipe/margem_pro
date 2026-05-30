// Contrato TypeScript do repositório de receitas — implementado em lib/db/supabase/receitasRepository.ts

export interface ReceitaIngrediente {
  id?: string;
  receita_id?: string;
  ingrediente_id: string;
  ingrediente_nome: string;
  quantidade: number;
  unidade_medida: string;
  custo: number;
}

export interface Receita {
  id: string;
  user_id: string;
  nome: string;
  descricao: string;
  rendimento: number;
  unidade_rendimento: string;
  tempo_preparo_min: number;
  custo_energia: number;
  custo_gas: number;
  custo_mao_obra: number;
  margem_lucro: number;
  created_at: string;
  updated_at: string;
  ingredientes?: ReceitaIngrediente[];
  custo_ingredientes?: number;
  custo_total?: number;
  custo_por_unidade?: number;
  preco_sugerido?: number;
}

export interface ReceitaInput {
  nome: string;
  descricao: string;
  rendimento: number;
  unidade_rendimento: string;
  tempo_preparo_min: number;
  custo_energia: number;
  custo_gas: number;
  custo_mao_obra: number;
  margem_lucro: number;
  ingredientes: ReceitaIngrediente[];
}

export interface IReceitasRepository {
  listar(userId: string): Promise<Receita[]>;
  buscarPorId(id: string, userId: string): Promise<Receita | null>;
  criar(userId: string, dados: ReceitaInput): Promise<Receita>;
  atualizar(id: string, userId: string, dados: ReceitaInput): Promise<Receita>;
  deletar(id: string, userId: string): Promise<void>;
}
