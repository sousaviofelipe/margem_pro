// Contrato TypeScript do repositório financeiro — implementado em lib/db/supabase/financeiroRepository.ts

export interface ResumoFinanceiro {
  totalFaturado: number;
  totalRecebido: number;
  totalPendente: number;
  totalPedidos: number;
  pedidosAbertos: number;
  pedidosConcluidos: number;
  ticketMedio: number;
  margemMedia: number;
}

export interface FluxoMes {
  mes: string;
  faturado: number;
  recebido: number;
  pedidos: number;
}

export interface PedidoPendente {
  id: string;
  cliente_nome: string;
  valor_total: number;
  valor_sinal: number;
  valor_pendente: number;
  status: string;
  data_entrega: string;
}

export interface IFinanceiroRepository {
  getResumo(
    userId: string,
    mes?: number,
    ano?: number,
  ): Promise<ResumoFinanceiro>;
  getFluxoAnual(userId: string, ano?: number): Promise<FluxoMes[]>;
  getPedidosPendentes(userId: string): Promise<PedidoPendente[]>;
}
