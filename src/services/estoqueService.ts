// Regras de negócio do estoque — consome apenas a interface IEstoqueRepository

import type {
  IEstoqueRepository,
  ItemEstoque,
  MovimentacaoEstoque,
} from "@/lib/db/interfaces/IEstoqueRepository";
import { EstoqueRepository } from "@/lib/db/supabase/estoqueRepository";

const repository: IEstoqueRepository = new EstoqueRepository();

export async function listarEstoque(userId: string): Promise<ItemEstoque[]> {
  return repository.listar(userId);
}

export async function ajustarEstoque(
  userId: string,
  dados: MovimentacaoEstoque,
): Promise<void> {
  if (dados.quantidade < 0)
    throw new Error("Quantidade não pode ser negativa.");
  if (dados.tipo !== "ajuste" && dados.quantidade === 0)
    throw new Error("Quantidade deve ser maior que zero.");
  return repository.ajustarEstoque(userId, dados);
}

export function getAlertasEstoque(itens: ItemEstoque[]): ItemEstoque[] {
  return itens.filter((i) => i.status !== "ok");
}

export function getEstatisticasEstoque(itens: ItemEstoque[]) {
  return {
    total: itens.length,
    ok: itens.filter((i) => i.status === "ok").length,
    baixo: itens.filter((i) => i.status === "baixo").length,
    zerado: itens.filter((i) => i.status === "zerado").length,
  };
}

export const statusEstoqueConfig = {
  ok: { label: "Estoque OK", cor: "#16a34a", bg: "#f0fdf4" },
  baixo: { label: "Estoque Baixo", cor: "#d97706", bg: "#fffbeb" },
  zerado: { label: "Sem Estoque", cor: "#dc2626", bg: "#fef2f2" },
};
