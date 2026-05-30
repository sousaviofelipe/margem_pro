// Implementação Supabase do repositório do dashboard — consome apenas o client centralizado

import { createClient } from "./client";
import type {
  IDashboardRepository,
  DashboardStats,
  PedidoRecente,
  ProdutoVendido,
} from "../interfaces/IDashboardRepository";

export class DashboardRepository implements IDashboardRepository {
  async getStats(userId: string): Promise<DashboardStats> {
    const supabase = createClient();
    const agora = new Date();
    const inicioMes = new Date(
      agora.getFullYear(),
      agora.getMonth(),
      1,
    ).toISOString();

    const { data: pedidos } = await supabase
      .from("pedidos")
      .select("valor_total, status")
      .eq("user_id", userId)
      .gte("created_at", inicioMes);

    const { data: produtos } = await supabase
      .from("produtos")
      .select("id")
      .eq("user_id", userId);

    const { data: clientes } = await supabase
      .from("clientes")
      .select("id")
      .eq("user_id", userId);

    const pedidosArr = pedidos ?? [];
    const faturamentoMes = pedidosArr.reduce(
      (acc, p) => acc + (p.valor_total ?? 0),
      0,
    );
    const lucroEstimado = faturamentoMes * 0.35;
    const pedidosAbertos = pedidosArr.filter((p) =>
      ["pendente", "em_producao"].includes(p.status),
    ).length;
    const margemMedia = 35;

    return {
      faturamentoMes,
      lucroEstimado,
      pedidosAbertos,
      clientesAtivos: clientes?.length ?? 0,
      margemMedia,
      totalProdutos: produtos?.length ?? 0,
    };
  }

  async getPedidosRecentes(
    userId: string,
    limite = 5,
  ): Promise<PedidoRecente[]> {
    const supabase = createClient();
    const { data } = await supabase
      .from("pedidos")
      .select("id, cliente_nome, valor_total, status, data_entrega, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limite);

    return data ?? [];
  }

  async getProdutosMaisVendidos(
    userId: string,
    limite = 5,
  ): Promise<ProdutoVendido[]> {
    const supabase = createClient();
    const { data } = await supabase
      .from("itens_pedido")
      .select("produto_nome, quantidade, preco_unitario")
      .eq("user_id", userId)
      .order("quantidade", { ascending: false })
      .limit(limite);

    return (data ?? []).map((item) => ({
      produto_nome: item.produto_nome,
      quantidade: item.quantidade,
      receita_total: item.quantidade * item.preco_unitario,
    }));
  }
}
