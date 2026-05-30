// Regras de negócio das notificações — consome apenas a interface INotificacoesRepository

import type {
  INotificacoesRepository,
  Notificacao,
} from "@/lib/db/interfaces/INotificacoesRepository";
import { NotificacoesRepository } from "@/lib/db/supabase/notificacoesRepository";

const repository: INotificacoesRepository = new NotificacoesRepository();

export async function listarNotificacoes(
  userId: string,
): Promise<Notificacao[]> {
  return repository.listar(userId);
}

export const notificacaoConfig = {
  estoque_zerado: { cor: "#dc2626", bg: "#fef2f2", icone: "🚨" },
  estoque_baixo: { cor: "#d97706", bg: "#fffbeb", icone: "⚠️" },
};
