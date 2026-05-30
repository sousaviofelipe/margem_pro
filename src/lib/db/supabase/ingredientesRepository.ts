// Implementação Supabase do repositório de ingredientes — consome apenas o client centralizado

import { createClient } from "./client";
import type {
  IIngredientesRepository,
  Ingrediente,
  IngredienteInput,
} from "../interfaces/IIngredientesRepository";

export class IngredientesRepository implements IIngredientesRepository {
  async listar(userId: string): Promise<Ingrediente[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("ingredientes")
      .select("*")
      .eq("user_id", userId)
      .order("nome", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []).map(this.calcularCustoPorUnidade);
  }

  async buscarPorId(id: string, userId: string): Promise<Ingrediente | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("ingredientes")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) return null;
    return this.calcularCustoPorUnidade(data);
  }

  async criar(userId: string, dados: IngredienteInput): Promise<Ingrediente> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("ingredientes")
      .insert({ ...dados, user_id: userId })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.calcularCustoPorUnidade(data);
  }

  async atualizar(
    id: string,
    userId: string,
    dados: Partial<IngredienteInput>,
  ): Promise<Ingrediente> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("ingredientes")
      .update({ ...dados, updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.calcularCustoPorUnidade(data);
  }

  async deletar(id: string, userId: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from("ingredientes")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  }

  private calcularCustoPorUnidade(ingrediente: Ingrediente): Ingrediente {
    const custo_por_unidade =
      ingrediente.quantidade_total > 0
        ? ingrediente.preco_total / ingrediente.quantidade_total
        : 0;
    return { ...ingrediente, custo_por_unidade };
  }
}
