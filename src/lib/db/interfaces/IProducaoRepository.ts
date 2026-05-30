// Contrato TypeScript do repositório de produção — implementado em lib/db/supabase/producaoRepository.ts

export interface ItemProducao {
  receita_id: string;
  receita_nome: string;
  quantidade: number;
  custo_unitario: number;
  custo_total: number;
}

export interface IngredienteNecessario {
  ingrediente_id: string;
  ingrediente_nome: string;
  unidade_medida: string;
  quantidade_necessaria: number;
  estoque_atual: number;
  estoque_suficiente: boolean;
  quantidade_comprar: number;
  custo_estimado: number;
}

export interface PlanoProducao {
  itens: ItemProducao[];
  ingredientes_necessarios: IngredienteNecessario[];
  custo_total_estimado: number;
  pode_produzir: boolean;
}

export interface IProducaoRepository {
  calcularPlano(userId: string, itens: ItemProducao[]): Promise<PlanoProducao>;
  executarProducao(userId: string, itens: ItemProducao[]): Promise<void>;
}
