// Contrato TypeScript do repositório de estoque — implementado em lib/db/supabase/estoqueRepository.ts

export interface ItemEstoque {
  id: string;
  nome: string;
  categoria: string;
  unidade_medida: string;
  estoque_atual: number;
  estoque_minimo: number;
  preco_total: number;
  quantidade_total: number;
  custo_por_unidade: number;
  status: "ok" | "baixo" | "zerado";
}

export interface MovimentacaoEstoque {
  ingrediente_id: string;
  tipo: "entrada" | "saida" | "ajuste";
  quantidade: number;
  observacao?: string;
}

export interface IEstoqueRepository {
  listar(userId: string): Promise<ItemEstoque[]>;
  ajustarEstoque(userId: string, dados: MovimentacaoEstoque): Promise<void>;
}
