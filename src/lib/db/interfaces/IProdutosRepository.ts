// Contrato TypeScript do repositório de produtos finais — implementado em lib/db/supabase/produtosRepository.ts

export interface ProdutoReceita {
  id?: string;
  produto_id?: string;
  receita_id: string;
  receita_nome: string;
  quantidade: number;
  custo: number;
}

export interface Produto {
  id: string;
  user_id: string;
  nome: string;
  descricao: string;
  preco_venda: number;
  custo_total: number;
  custo_embalagem: number;
  custo_extras: number;
  margem_lucro: number;
  lucro_estimado: number;
  created_at: string;
  updated_at: string;
  receitas?: ProdutoReceita[];
}

export interface ProdutoInput {
  nome: string;
  descricao: string;
  preco_venda: number;
  custo_embalagem: number;
  custo_extras: number;
  margem_lucro: number;
  receitas: ProdutoReceita[];
}

export interface IProdutosRepository {
  listar(userId: string): Promise<Produto[]>;
  buscarPorId(id: string, userId: string): Promise<Produto | null>;
  criar(userId: string, dados: ProdutoInput): Promise<Produto>;
  atualizar(id: string, userId: string, dados: ProdutoInput): Promise<Produto>;
  deletar(id: string, userId: string): Promise<void>;
}
