// Implementação Supabase do repositório de receitas — consome apenas o client centralizado

import { createClient } from "./client";

import type {
  IReceitasRepository,
  Receita,
  ReceitaInput,
  ReceitaIngrediente,
} from "../interfaces/IReceitasRepository";

export class ReceitasRepository implements IReceitasRepository {
  async listar(userId: string): Promise<Receita[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("receitas")
      .select(`*, receita_ingredientes(*)`)
      .eq("user_id", userId)
      .order("nome", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []).map(this.calcularCustos);
  }

  async buscarPorId(id: string, userId: string): Promise<Receita | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("receitas")
      .select(`*, receita_ingredientes(*)`)
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) return null;
    return this.calcularCustos(data);
  }

  async criar(userId: string, dados: ReceitaInput): Promise<Receita> {
    const supabase = createClient();
    const { ingredientes, ...receitaDados } = dados;

    const { data: receita, error } = await supabase
      .from("receitas")
      .insert({ ...receitaDados, user_id: userId })
      .select()
      .single();

    if (error) throw new Error(error.message);

    if (ingredientes.length > 0) {
      const { error: errIng } = await supabase
        .from("receita_ingredientes")
        .insert(ingredientes.map((i) => ({ ...i, receita_id: receita.id })));

      if (errIng) throw new Error(errIng.message);
    }

    return this.buscarPorId(receita.id, userId) as Promise<Receita>;
  }

  async atualizar(
    id: string,
    userId: string,
    dados: ReceitaInput,
  ): Promise<Receita> {
    const supabase = createClient();
    const { ingredientes, ...receitaDados } = dados;

    const { error } = await supabase
      .from("receitas")
      .update({ ...receitaDados, updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);

    await supabase.from("receita_ingredientes").delete().eq("receita_id", id);

    if (ingredientes.length > 0) {
      const { error: errIng } = await supabase
        .from("receita_ingredientes")
        .insert(ingredientes.map((i) => ({ ...i, receita_id: id })));

      if (errIng) throw new Error(errIng.message);
    }

    return this.buscarPorId(id, userId) as Promise<Receita>;
  }

  async deletar(id: string, userId: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from("receitas")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  }

  private calcularCustos(
    receita: Receita & { receita_ingredientes?: ReceitaIngrediente[] },
  ): Receita {
    const ingredientes = receita.receita_ingredientes ?? [];
    const custo_ingredientes = ingredientes.reduce(
      (acc, i) => acc + (i.custo ?? 0),
      0,
    );
    const custo_total =
      custo_ingredientes +
      receita.custo_energia +
      receita.custo_gas +
      receita.custo_mao_obra;
    const custo_por_unidade =
      receita.rendimento > 0 ? custo_total / receita.rendimento : 0;
    const preco_sugerido = custo_por_unidade * (1 + receita.margem_lucro / 100);

    return {
      ...receita,
      ingredientes,
      custo_ingredientes,
      custo_total,
      custo_por_unidade,
      preco_sugerido,
    };
  }
}
