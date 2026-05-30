// Regras de negócio dos pedidos — consome apenas a interface IPedidosRepository

import type {
  IPedidosRepository,
  Pedido,
  PedidoInput,
  PedidoStatus,
  ItemPedido,
} from "@/lib/db/interfaces/IPedidosRepository";
import { PedidosRepository } from "@/lib/db/supabase/pedidosRepository";
import type { Produto } from "@/lib/db/interfaces/IProdutosRepository";

const repository: IPedidosRepository = new PedidosRepository();

export async function listarPedidos(userId: string): Promise<Pedido[]> {
  return repository.listar(userId);
}

export async function criarPedido(
  userId: string,
  dados: PedidoInput,
): Promise<Pedido> {
  if (!dados.cliente_nome.trim())
    throw new Error("Nome do cliente é obrigatório.");
  if (dados.itens.length === 0)
    throw new Error("Adicione pelo menos um produto ao pedido.");
  if (!dados.data_entrega) throw new Error("Data de entrega é obrigatória.");
  return repository.criar(userId, dados);
}

export async function atualizarPedido(
  id: string,
  userId: string,
  dados: PedidoInput,
): Promise<Pedido> {
  if (!dados.cliente_nome.trim())
    throw new Error("Nome do cliente é obrigatório.");
  return repository.atualizar(id, userId, dados);
}

export async function atualizarStatusPedido(
  id: string,
  userId: string,
  status: PedidoStatus,
): Promise<Pedido> {
  return repository.atualizarStatus(id, userId, status);
}

export async function deletarPedido(id: string, userId: string): Promise<void> {
  return repository.deletar(id, userId);
}

export function montarItemPedido(
  produto: Produto,
  quantidade: number,
): ItemPedido {
  return {
    produto_id: produto.id,
    produto_nome: produto.nome,
    quantidade,
    preco_unitario: produto.preco_venda,
    subtotal: produto.preco_venda * quantidade,
  };
}

export const statusConfig: Record<
  PedidoStatus,
  { label: string; cor: string; bg: string }
> = {
  pendente: { label: "Pendente", cor: "#d97706", bg: "#fffbeb" },
  em_producao: { label: "Em produção", cor: "#2563eb", bg: "#eff6ff" },
  pronto: { label: "Pronto", cor: "#16a34a", bg: "#f0fdf4" },
  entregue: { label: "Entregue", cor: "#78716C", bg: "#FAF8F5" },
  cancelado: { label: "Cancelado", cor: "#dc2626", bg: "#fef2f2" },
};

export const formasPagamento: Record<string, string> = {
  dinheiro: "Dinheiro",
  pix: "Pix",
  cartao_credito: "Cartão de Crédito",
  cartao_debito: "Cartão de Débito",
  transferencia: "Transferência",
};

export const statusOrdem: PedidoStatus[] = [
  "pendente",
  "em_producao",
  "pronto",
  "entregue",
  "cancelado",
];
