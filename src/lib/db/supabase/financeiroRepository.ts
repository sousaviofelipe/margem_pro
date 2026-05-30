// Implementação Supabase do repositório financeiro — consome apenas o client centralizado

import { createClient } from "./client";
import type {
  IFinanceiroRepository,
  ResumoFinanceiro,
  FluxoMes,
  PedidoPendente,
} from "../interfaces/IFinanceiroRepository";

export class FinanceiroRepository implements IFinanceiroRepository {
  async getResumo(
    userId: string,
    mes?: number,
    ano?: number,
  ): Promise<ResumoFinanceiro> {
    const supabase = createClient();
    const agora = new Date();
    const anoRef = ano ?? agora.getFullYear();
    const mesRef = mes ?? agora.getMonth();

    const inicio = new Date(anoRef, mesRef, 1).toISOString();
    const fim = new Date(anoRef, mesRef + 1, 0, 23, 59, 59).toISOString();

    const { data: pedidos } = await supabase
      .from("pedidos")
      .select("valor_total, valor_sinal, valor_pendente, status")
      .eq("user_id", userId)
      .gte("created_at", inicio)
      .lte("created_at", fim);

    const arr = pedidos ?? [];
    const totalFaturado = arr.reduce((acc, p) => acc + (p.valor_total ?? 0), 0);
    const totalRecebido = arr.reduce(
      (acc, p) =>
        acc +
        (p.valor_sinal ?? 0) +
        (p.status === "entregue" ? (p.valor_pendente ?? 0) : 0),
      0,
    );
    const totalPendente = arr.reduce(
      (acc, p) =>
        p.status !== "entregue" && p.status !== "cancelado"
          ? acc + (p.valor_pendente ?? 0)
          : acc,
      0,
    );
    const pedidosAbertos = arr.filter((p) =>
      ["pendente", "em_producao", "pronto"].includes(p.status),
    ).length;
    const pedidosConcluidos = arr.filter((p) => p.status === "entregue").length;
    const ticketMedio = arr.length > 0 ? totalFaturado / arr.length : 0;
    const margemMedia = 35;

    return {
      totalFaturado,
      totalRecebido,
      totalPendente,
      totalPedidos: arr.length,
      pedidosAbertos,
      pedidosConcluidos,
      ticketMedio,
      margemMedia,
    };
  }

  async getFluxoAnual(userId: string, ano?: number): Promise<FluxoMes[]> {
    const supabase = createClient();
    const anoRef = ano ?? new Date().getFullYear();
    const meses = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    const inicio = new Date(anoRef, 0, 1).toISOString();
    const fim = new Date(anoRef, 11, 31, 23, 59, 59).toISOString();

    const { data: pedidos } = await supabase
      .from("pedidos")
      .select("valor_total, valor_sinal, status, created_at")
      .eq("user_id", userId)
      .gte("created_at", inicio)
      .lte("created_at", fim);

    const fluxo: FluxoMes[] = meses.map((mes, idx) => {
      const pedidosMes = (pedidos ?? []).filter((p) => {
        const data = new Date(p.created_at);
        return data.getMonth() === idx;
      });

      const faturado = pedidosMes.reduce(
        (acc, p) => acc + (p.valor_total ?? 0),
        0,
      );
      const recebido = pedidosMes.reduce(
        (acc, p) =>
          acc +
          (p.valor_sinal ?? 0) +
          (p.status === "entregue"
            ? (p.valor_total ?? 0) - (p.valor_sinal ?? 0)
            : 0),
        0,
      );

      return { mes, faturado, recebido, pedidos: pedidosMes.length };
    });

    return fluxo;
  }

  async getPedidosPendentes(userId: string): Promise<PedidoPendente[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("pedidos")
      .select(
        "id, cliente_nome, valor_total, valor_sinal, valor_pendente, status, data_entrega",
      )
      .eq("user_id", userId)
      .in("status", ["pendente", "em_producao", "pronto"])
      .order("data_entrega", { ascending: true });

    if (error) throw new Error(error.message);
    return data ?? [];
  }
}
