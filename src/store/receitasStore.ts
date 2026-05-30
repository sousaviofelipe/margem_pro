// Store Zustand das receitas — consome apenas services, nunca repositórios diretamente

import { create } from "zustand";
import type {
  Receita,
  ReceitaInput,
} from "@/lib/db/interfaces/IReceitasRepository";
import {
  listarReceitas,
  criarReceita,
  atualizarReceita,
  deletarReceita,
} from "@/services/receitasService";

interface ReceitasStore {
  receitas: Receita[];
  loading: boolean;
  erro: string | null;
  modalAberto: boolean;
  receitaEditando: Receita | null;
  busca: string;
  carregar: (userId: string) => Promise<void>;
  criar: (userId: string, dados: ReceitaInput) => Promise<void>;
  atualizar: (id: string, userId: string, dados: ReceitaInput) => Promise<void>;
  deletar: (id: string, userId: string) => Promise<void>;
  abrirModal: (receita?: Receita) => void;
  fecharModal: () => void;
  setBusca: (busca: string) => void;
}

export const useReceitasStore = create<ReceitasStore>((set) => ({
  receitas: [],
  loading: false,
  erro: null,
  modalAberto: false,
  receitaEditando: null,
  busca: "",

  carregar: async (userId) => {
    set({ loading: true, erro: null });
    try {
      const receitas = await listarReceitas(userId);
      set({ receitas });
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao carregar receitas.",
      });
    } finally {
      set({ loading: false });
    }
  },

  criar: async (userId, dados) => {
    set({ erro: null });
    try {
      const nova = await criarReceita(userId, dados);
      set((state) => ({
        receitas: [...state.receitas, nova],
        modalAberto: false,
      }));
    } catch (e: unknown) {
      set({ erro: e instanceof Error ? e.message : "Erro ao criar receita." });
      throw e;
    }
  },

  atualizar: async (id, userId, dados) => {
    set({ erro: null });
    try {
      const atualizada = await atualizarReceita(id, userId, dados);
      set((state) => ({
        receitas: state.receitas.map((r) => (r.id === id ? atualizada : r)),
        modalAberto: false,
        receitaEditando: null,
      }));
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao atualizar receita.",
      });
      throw e;
    }
  },

  deletar: async (id, userId) => {
    set({ erro: null });
    try {
      await deletarReceita(id, userId);
      set((state) => ({ receitas: state.receitas.filter((r) => r.id !== id) }));
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao deletar receita.",
      });
    }
  },

  abrirModal: (receita) =>
    set({ modalAberto: true, receitaEditando: receita ?? null }),
  fecharModal: () => set({ modalAberto: false, receitaEditando: null }),
  setBusca: (busca) => set({ busca }),
}));
