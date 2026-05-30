// Implementação Supabase do repositório de pedidos — consome apenas o client centralizado

import { createClient } from "./client";
import type {
  IPedidosRepository,
  Pedido,
  PedidoInput,
  PedidoStatus,
} from "../interfaces/IPedidosRepository";

export class PedidosRepository implements IPedidosRepository {
  async listar(userId: string): Promise<Pedido[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("pedidos")
      .select(`*, itens_pedido(*)`)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []).map((p) => ({ ...p, itens: p.itens_pedido }));
  }

  async buscarPorId(id: string, userId: string): Promise<Pedido | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("pedidos")
      .select(`*, itens_pedido(*)`)
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) return null;
    return { ...data, itens: data.itens_pedido };
  }

  async criar(userId: string, dados: PedidoInput): Promise<Pedido> {
    const supabase = createClient();
    const { itens, ...pedidoDados } = dados;

    const valor_total = itens.reduce((acc, i) => acc + i.subtotal, 0);
    const valor_pendente = valor_total - (dados.valor_sinal ?? 0);

    const { data: pedido, error } = await supabase
      .from("pedidos")
      .insert({ ...pedidoDados, user_id: userId, valor_total, valor_pendente })
      .select()
      .single();

    if (error) throw new Error(error.message);

    if (itens.length > 0) {
      const { error: errItens } = await supabase
        .from("itens_pedido")
        .insert(itens.map((i) => ({ ...i, pedido_id: pedido.id })));

      if (errItens) throw new Error(errItens.message);
    }

    // Atualiza total_pedidos e total_gasto do cliente
    if (dados.cliente_id) {
      const { data: cliente } = await supabase
        .from("clientes")
        .select("total_pedidos, total_gasto")
        .eq("id", dados.cliente_id)
        .single();

      if (cliente) {
        await supabase
          .from("clientes")
          .update({
            total_pedidos: (cliente.total_pedidos ?? 0) + 1,
            total_gasto: (cliente.total_gasto ?? 0) + valor_total,
          })
          .eq("id", dados.cliente_id);
      }
    }

    return this.buscarPorId(pedido.id, userId) as Promise<Pedido>;
  }

  async atualizar(
    id: string,
    userId: string,
    dados: PedidoInput,
  ): Promise<Pedido> {
    const supabase = createClient();
    const { itens, ...pedidoDados } = dados;

    const valor_total = itens.reduce((acc, i) => acc + i.subtotal, 0);
    const valor_pendente = valor_total - (dados.valor_sinal ?? 0);

    const { error } = await supabase
      .from("pedidos")
      .update({
        ...pedidoDados,
        valor_total,
        valor_pendente,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);

    await supabase.from("itens_pedido").delete().eq("pedido_id", id);

    if (itens.length > 0) {
      const { error: errItens } = await supabase
        .from("itens_pedido")
        .insert(itens.map((i) => ({ ...i, pedido_id: id })));

      if (errItens) throw new Error(errItens.message);
    }

    return this.buscarPorId(id, userId) as Promise<Pedido>;
  }

  async atualizarStatus(
    id: string,
    userId: string,
    status: PedidoStatus,
  ): Promise<Pedido> {
    const supabase = createClient();
    const { error } = await supabase
      .from("pedidos")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    return this.buscarPorId(id, userId) as Promise<Pedido>;
  }

  async deletar(id: string, userId: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from("pedidos")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  }
}
