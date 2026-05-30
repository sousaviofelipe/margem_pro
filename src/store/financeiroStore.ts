// Store Zustand do financeiro — consome apenas services, nunca repositórios diretamente

import { create } from "zustand";
import type {
  ResumoFinanceiro,
  FluxoMes,
  PedidoPendente,
} from "@/lib/db/interfaces/IFinanceiroRepository";
import {
  getResumoFinanceiro,
  getFluxoAnual,
  getPedidosPendentes,
} from "@/services/financeiroService";

interface FinanceiroStore {
  resumo: ResumoFinanceiro | null;
  fluxo: FluxoMes[];
  pedidosPendentes: PedidoPendente[];
  loading: boolean;
  erro: string | null;
  mesSelecionado: number;
  anoSelecionado: number;
  carregar: (userId: string) => Promise<void>;
  setMes: (mes: number) => void;
  setAno: (ano: number) => void;
}

export const useFinanceiroStore = create<FinanceiroStore>((set, get) => ({
  resumo: null,
  fluxo: [],
  pedidosPendentes: [],
  loading: false,
  erro: null,
  mesSelecionado: new Date().getMonth(),
  anoSelecionado: new Date().getFullYear(),

  carregar: async (userId) => {
    set({ loading: true, erro: null });
    try {
      const { mesSelecionado, anoSelecionado } = get();
      const [resumo, fluxo, pedidosPendentes] = await Promise.all([
        getResumoFinanceiro(userId, mesSelecionado, anoSelecionado),
        getFluxoAnual(userId, anoSelecionado),
        getPedidosPendentes(userId),
      ]);
      set({ resumo, fluxo, pedidosPendentes });
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao carregar financeiro.",
      });
    } finally {
      set({ loading: false });
    }
  },

  setMes: (mes) => set({ mesSelecionado: mes }),
  setAno: (ano) => set({ anoSelecionado: ano }),
}));
