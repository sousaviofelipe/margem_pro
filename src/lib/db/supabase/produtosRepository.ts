// Implementação Supabase do repositório de produtos finais — consome apenas o client centralizado

import { createClient } from "./client";
import type {
  IProdutosRepository,
  Produto,
  ProdutoInput,
} from "../interfaces/IProdutosRepository";

export class ProdutosRepository implements IProdutosRepository {
  async listar(userId: string): Promise<Produto[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("produtos")
      .select(`*, produto_receitas(*)`)
      .eq("user_id", userId)
      .order("nome", { ascending: true });

    if (error) throw new Error(error.message);
    return data ?? [];
  }

  async buscarPorId(id: string, userId: string): Promise<Produto | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("produtos")
      .select(`*, produto_receitas(*)`)
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) return null;
    return data;
  }

  async criar(userId: string, dados: ProdutoInput): Promise<Produto> {
    const supabase = createClient();
    const { receitas, ...produtoDados } = dados;

    const custoReceitas = receitas.reduce((acc, r) => acc + r.custo, 0);
    const custo_total =
      custoReceitas + dados.custo_embalagem + dados.custo_extras;
    const preco_venda = custo_total * (1 + dados.margem_lucro / 100);
    const lucro_estimado = preco_venda - custo_total;

    const { data: produto, error } = await supabase
      .from("produtos")
      .insert({
        ...produtoDados,
        user_id: userId,
        custo_total,
        preco_venda,
        lucro_estimado,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    if (receitas.length > 0) {
      const { error: errRec } = await supabase
        .from("produto_receitas")
        .insert(receitas.map((r) => ({ ...r, produto_id: produto.id })));

      if (errRec) throw new Error(errRec.message);
    }

    return this.buscarPorId(produto.id, userId) as Promise<Produto>;
  }

  async atualizar(
    id: string,
    userId: string,
    dados: ProdutoInput,
  ): Promise<Produto> {
    const supabase = createClient();
    const { receitas, ...produtoDados } = dados;

    const custoReceitas = receitas.reduce((acc, r) => acc + r.custo, 0);
    const custo_total =
      custoReceitas + dados.custo_embalagem + dados.custo_extras;
    const preco_venda = custo_total * (1 + dados.margem_lucro / 100);
    const lucro_estimado = preco_venda - custo_total;

    const { error } = await supabase
      .from("produtos")
      .update({
        ...produtoDados,
        custo_total,
        preco_venda,
        lucro_estimado,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);

    await supabase.from("produto_receitas").delete().eq("produto_id", id);

    if (receitas.length > 0) {
      const { error: errRec } = await supabase
        .from("produto_receitas")
        .insert(receitas.map((r) => ({ ...r, produto_id: id })));

      if (errRec) throw new Error(errRec.message);
    }

    return this.buscarPorId(id, userId) as Promise<Produto>;
  }

  async deletar(id: string, userId: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from("produtos")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  }
}
