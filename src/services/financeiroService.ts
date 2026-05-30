// Regras de negócio do financeiro — consome apenas a interface IFinanceiroRepository

import type {
  IFinanceiroRepository,
  ResumoFinanceiro,
  FluxoMes,
  PedidoPendente,
} from "@/lib/db/interfaces/IFinanceiroRepository";
import { FinanceiroRepository } from "@/lib/db/supabase/financeiroRepository";

const repository: IFinanceiroRepository = new FinanceiroRepository();

export async function getResumoFinanceiro(
  userId: string,
  mes?: number,
  ano?: number,
): Promise<ResumoFinanceiro> {
  return repository.getResumo(userId, mes, ano);
}

export async function getFluxoAnual(
  userId: string,
  ano?: number,
): Promise<FluxoMes[]> {
  return repository.getFluxoAnual(userId, ano);
}

export async function getPedidosPendentes(
  userId: string,
): Promise<PedidoPendente[]> {
  return repository.getPedidosPendentes(userId);
}

export const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
