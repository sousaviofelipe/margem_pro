// Regras de negócio do dashboard — consome apenas a interface IDashboardRepository, nunca a implementação direta

import type {
  IDashboardRepository,
  DashboardStats,
  PedidoRecente,
  ProdutoVendido,
} from "@/lib/db/interfaces/IDashboardRepository";
import { DashboardRepository } from "@/lib/db/supabase/dashboardRepository";

const repository: IDashboardRepository = new DashboardRepository();

export async function getDashboardStats(
  userId: string,
): Promise<DashboardStats> {
  return repository.getStats(userId);
}

export async function getPedidosRecentes(
  userId: string,
  limite = 5,
): Promise<PedidoRecente[]> {
  return repository.getPedidosRecentes(userId, limite);
}

export async function getProdutosMaisVendidos(
  userId: string,
  limite = 5,
): Promise<ProdutoVendido[]> {
  return repository.getProdutosMaisVendidos(userId, limite);
}

export function formatarStatus(status: PedidoRecente["status"]): {
  label: string;
  cor: string;
} {
  const mapa = {
    pendente: { label: "Pendente", cor: "#d97706" },
    em_producao: { label: "Em produção", cor: "#2563eb" },
    pronto: { label: "Pronto", cor: "#16a34a" },
    entregue: { label: "Entregue", cor: "#78716C" },
    cancelado: { label: "Cancelado", cor: "#dc2626" },
  };
  return mapa[status];
}
