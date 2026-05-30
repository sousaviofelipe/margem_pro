// Store Zustand do dashboard — consome apenas services, nunca repositórios diretamente

import { create } from "zustand";
import type {
  DashboardStats,
  PedidoRecente,
  ProdutoVendido,
} from "@/lib/db/interfaces/IDashboardRepository";
import {
  getDashboardStats,
  getPedidosRecentes,
  getProdutosMaisVendidos,
} from "@/services/dashboardService";

interface DashboardStore {
  stats: DashboardStats | null;
  pedidosRecentes: PedidoRecente[];
  produtosMaisVendidos: ProdutoVendido[];
  loading: boolean;
  erro: string | null;
  carregar: (userId: string) => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: null,
  pedidosRecentes: [],
  produtosMaisVendidos: [],
  loading: false,
  erro: null,

  carregar: async (userId: string) => {
    set({ loading: true, erro: null });
    try {
      const [stats, pedidos, produtos] = await Promise.all([
        getDashboardStats(userId),
        getPedidosRecentes(userId),
        getProdutosMaisVendidos(userId),
      ]);
      set({ stats, pedidosRecentes: pedidos, produtosMaisVendidos: produtos });
    } catch {
      set({ erro: "Erro ao carregar dados do dashboard." });
    } finally {
      set({ loading: false });
    }
  },
}));
