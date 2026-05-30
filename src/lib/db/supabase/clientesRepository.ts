// Implementação Supabase do repositório de clientes — consome apenas o client centralizado

import { createClient } from "./client";
import type {
  IClientesRepository,
  Cliente,
  ClienteInput,
} from "../interfaces/IClientesRepository";

export class ClientesRepository implements IClientesRepository {
  async listar(userId: string): Promise<Cliente[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .eq("user_id", userId)
      .order("nome", { ascending: true });

    if (error) throw new Error(error.message);
    return data ?? [];
  }

  async buscarPorId(id: string, userId: string): Promise<Cliente | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) return null;
    return data;
  }

  async criar(userId: string, dados: ClienteInput): Promise<Cliente> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("clientes")
      .insert({ ...dados, user_id: userId })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async atualizar(
    id: string,
    userId: string,
    dados: Partial<ClienteInput>,
  ): Promise<Cliente> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("clientes")
      .update({ ...dados, updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async deletar(id: string, userId: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from("clientes")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  }
}
