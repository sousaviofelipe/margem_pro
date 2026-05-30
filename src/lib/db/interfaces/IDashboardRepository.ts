// Contrato TypeScript do repositório do dashboard — implementado em lib/db/supabase/dashboardRepository.ts

export interface DashboardStats {
  faturamentoMes: number;
  lucroEstimado: number;
  pedidosAbertos: number;
  clientesAtivos: number;
  margemMedia: number;
  totalProdutos: number;
}

export interface PedidoRecente {
  id: string;
  cliente_nome: string;
  valor_total: number;
  status: "pendente" | "em_producao" | "pronto" | "entregue" | "cancelado";
  data_entrega: string;
  created_at: string;
}

export interface ProdutoVendido {
  produto_nome: string;
  quantidade: number;
  receita_total: number;
}

export interface IDashboardRepository {
  getStats(userId: string): Promise<DashboardStats>;
  getPedidosRecentes(userId: string, limite?: number): Promise<PedidoRecente[]>;
  getProdutosMaisVendidos(
    userId: string,
    limite?: number,
  ): Promise<ProdutoVendido[]>;
}
