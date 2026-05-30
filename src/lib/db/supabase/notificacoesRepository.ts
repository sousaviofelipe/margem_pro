// Implementação do repositório de notificações — gera notificações a partir do estoque

import { createClient } from "./client";
import type {
  INotificacoesRepository,
  Notificacao,
} from "../interfaces/INotificacoesRepository";

export class NotificacoesRepository implements INotificacoesRepository {
  async listar(userId: string): Promise<Notificacao[]> {
    const supabase = createClient();

    const { data: ingredientes } = await supabase
      .from("ingredientes")
      .select("id, nome, estoque_atual, estoque_minimo")
      .eq("user_id", userId)
      .order("nome", { ascending: true });

    const notificacoes: Notificacao[] = [];

    for (const ing of ingredientes ?? []) {
      if (ing.estoque_atual <= 0) {
        notificacoes.push({
          id: `zerado-${ing.id}`,
          tipo: "estoque_zerado",
          titulo: "Sem estoque",
          mensagem: `${ing.nome} está sem estoque.`,
          ingrediente_id: ing.id,
          lida: false,
          created_at: new Date().toISOString(),
        });
      } else if (
        ing.estoque_minimo > 0 &&
        ing.estoque_atual <= ing.estoque_minimo
      ) {
        notificacoes.push({
          id: `baixo-${ing.id}`,
          tipo: "estoque_baixo",
          titulo: "Estoque baixo",
          mensagem: `${ing.nome} está com estoque baixo (${ing.estoque_atual}).`,
          ingrediente_id: ing.id,
          lida: false,
          created_at: new Date().toISOString(),
        });
      }
    }

    return notificacoes;
  }

  async marcarComoLida(id: string, userId: string): Promise<void> {
    // Gerenciado localmente no store — sem persistência no banco por ora
  }

  async marcarTodasComoLidas(userId: string): Promise<void> {
    // Gerenciado localmente no store — sem persistência no banco por ora
  }
}
