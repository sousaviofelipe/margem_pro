// Implementação Supabase do repositório de estoque — consome apenas o client centralizado

import { createClient } from "./client";
import type {
  IEstoqueRepository,
  ItemEstoque,
  MovimentacaoEstoque,
} from "../interfaces/IEstoqueRepository";

export class EstoqueRepository implements IEstoqueRepository {
  async listar(userId: string): Promise<ItemEstoque[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("ingredientes")
      .select(
        "id, nome, categoria, unidade_medida, estoque_atual, estoque_minimo, preco_total, quantidade_total",
      )
      .eq("user_id", userId)
      .order("nome", { ascending: true });

    if (error) throw new Error(error.message);

    return (data ?? []).map((item) => {
      const custo_por_unidade =
        item.quantidade_total > 0
          ? item.preco_total / item.quantidade_total
          : 0;

      let status: ItemEstoque["status"] = "ok";
      if (item.estoque_atual <= 0) status = "zerado";
      else if (item.estoque_atual <= item.estoque_minimo) status = "baixo";

      return { ...item, custo_por_unidade, status };
    });
  }

  async ajustarEstoque(
    userId: string,
    dados: MovimentacaoEstoque,
  ): Promise<void> {
    const supabase = createClient();

    const { data: ingrediente, error: errBusca } = await supabase
      .from("ingredientes")
      .select("estoque_atual")
      .eq("id", dados.ingrediente_id)
      .eq("user_id", userId)
      .single();

    if (errBusca || !ingrediente)
      throw new Error("Ingrediente não encontrado.");

    let novoEstoque = ingrediente.estoque_atual;
    if (dados.tipo === "entrada") novoEstoque += dados.quantidade;
    else if (dados.tipo === "saida")
      novoEstoque = Math.max(0, novoEstoque - dados.quantidade);
    else if (dados.tipo === "ajuste") novoEstoque = dados.quantidade;

    const { error } = await supabase
      .from("ingredientes")
      .update({
        estoque_atual: novoEstoque,
        updated_at: new Date().toISOString(),
      })
      .eq("id", dados.ingrediente_id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  }
}
