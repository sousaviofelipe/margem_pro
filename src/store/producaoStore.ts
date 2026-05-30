// Store Zustand da produção — consome apenas services, nunca repositórios diretamente

import { create } from "zustand";
import type {
  ItemProducao,
  PlanoProducao,
} from "@/lib/db/interfaces/IProducaoRepository";
import {
  calcularPlanoProducao,
  executarProducao,
} from "@/services/producaoService";

interface ProducaoStore {
  itens: ItemProducao[];
  plano: PlanoProducao | null;
  loading: boolean;
  executando: boolean;
  erro: string | null;
  sucesso: boolean;
  adicionarItem: (item: ItemProducao) => void;
  removerItem: (receitaId: string) => void;
  calcular: (userId: string) => Promise<void>;
  executar: (userId: string) => Promise<void>;
  limpar: () => void;
}

export const useProducaoStore = create<ProducaoStore>((set, get) => ({
  itens: [],
  plano: null,
  loading: false,
  executando: false,
  erro: null,
  sucesso: false,

  adicionarItem: (item) => {
    const { itens } = get();
    const existe = itens.find((i) => i.receita_id === item.receita_id);
    if (existe) {
      set({
        itens: itens.map((i) => (i.receita_id === item.receita_id ? item : i)),
      });
    } else {
      set({ itens: [...itens, item], plano: null });
    }
  },

  removerItem: (receitaId) => {
    set((state) => ({
      itens: state.itens.filter((i) => i.receita_id !== receitaId),
      plano: null,
    }));
  },

  calcular: async (userId) => {
    set({ loading: true, erro: null, plano: null });
    try {
      const plano = await calcularPlanoProducao(userId, get().itens);
      set({ plano });
    } catch (e: unknown) {
      set({ erro: e instanceof Error ? e.message : "Erro ao calcular plano." });
    } finally {
      set({ loading: false });
    }
  },

  executar: async (userId) => {
    set({ executando: true, erro: null });
    try {
      await executarProducao(userId, get().itens);
      set({ sucesso: true, itens: [], plano: null });
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao executar produção.",
      });
    } finally {
      set({ executando: false });
    }
  },

  limpar: () => set({ itens: [], plano: null, erro: null, sucesso: false }),
}));
