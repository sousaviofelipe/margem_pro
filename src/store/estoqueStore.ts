// Store Zustand do estoque — consome apenas services, nunca repositórios diretamente

import { create } from "zustand";
import type {
  ItemEstoque,
  MovimentacaoEstoque,
} from "@/lib/db/interfaces/IEstoqueRepository";
import { listarEstoque, ajustarEstoque } from "@/services/estoqueService";

interface EstoqueStore {
  itens: ItemEstoque[];
  loading: boolean;
  erro: string | null;
  modalAberto: boolean;
  itemSelecionado: ItemEstoque | null;
  busca: string;
  filtroStatus: string;
  carregar: (userId: string) => Promise<void>;
  ajustar: (userId: string, dados: MovimentacaoEstoque) => Promise<void>;
  abrirModal: (item: ItemEstoque) => void;
  fecharModal: () => void;
  setBusca: (busca: string) => void;
  setFiltroStatus: (status: string) => void;
}

export const useEstoqueStore = create<EstoqueStore>((set) => ({
  itens: [],
  loading: false,
  erro: null,
  modalAberto: false,
  itemSelecionado: null,
  busca: "",
  filtroStatus: "",

  carregar: async (userId) => {
    set({ loading: true, erro: null });
    try {
      const itens = await listarEstoque(userId);
      set({ itens });
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao carregar estoque.",
      });
    } finally {
      set({ loading: false });
    }
  },

  ajustar: async (userId, dados) => {
    set({ erro: null });
    try {
      await ajustarEstoque(userId, dados);
      const itens = await listarEstoque(userId);
      set({ itens, modalAberto: false, itemSelecionado: null });
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao ajustar estoque.",
      });
      throw e;
    }
  },

  abrirModal: (item) => set({ modalAberto: true, itemSelecionado: item }),
  fecharModal: () => set({ modalAberto: false, itemSelecionado: null }),
  setBusca: (busca) => set({ busca }),
  setFiltroStatus: (filtroStatus) => set({ filtroStatus }),
}));
