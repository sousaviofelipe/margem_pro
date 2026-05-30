// Contrato TypeScript do repositório de pedidos — implementado em lib/db/supabase/pedidosRepository.ts

export type PedidoStatus =
  | "pendente"
  | "em_producao"
  | "pronto"
  | "entregue"
  | "cancelado";
export type FormaPagamento =
  | "dinheiro"
  | "pix"
  | "cartao_credito"
  | "cartao_debito"
  | "transferencia";

export interface ItemPedido {
  id?: string;
  pedido_id?: string;
  produto_id?: string;
  produto_nome: string;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
}

export interface Pedido {
  id: string;
  user_id: string;
  cliente_id?: string;
  cliente_nome: string;
  valor_total: number;
  valor_sinal: number;
  valor_pendente: number;
  status: PedidoStatus;
  forma_pagamento: FormaPagamento;
  data_entrega: string;
  observacoes: string;
  created_at: string;
  updated_at: string;
  itens?: ItemPedido[];
}

export interface PedidoInput {
  cliente_id?: string;
  cliente_nome: string;
  valor_sinal: number;
  status: PedidoStatus;
  forma_pagamento: FormaPagamento;
  data_entrega: string;
  observacoes: string;
  itens: ItemPedido[];
}

export interface IPedidosRepository {
  listar(userId: string): Promise<Pedido[]>;
  buscarPorId(id: string, userId: string): Promise<Pedido | null>;
  criar(userId: string, dados: PedidoInput): Promise<Pedido>;
  atualizar(id: string, userId: string, dados: PedidoInput): Promise<Pedido>;
  atualizarStatus(
    id: string,
    userId: string,
    status: PedidoStatus,
  ): Promise<Pedido>;
  deletar(id: string, userId: string): Promise<void>;
}
