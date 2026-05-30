// Store Zustand dos ingredientes — consome apenas services, nunca repositórios diretamente

import { create } from "zustand";
import type {
  Ingrediente,
  IngredienteInput,
} from "@/lib/db/interfaces/IIngredientesRepository";
import {
  listarIngredientes,
  criarIngrediente,
  atualizarIngrediente,
  deletarIngrediente,
} from "@/services/ingredientesService";

interface IngredientesStore {
  ingredientes: Ingrediente[];
  loading: boolean;
  erro: string | null;
  modalAberto: boolean;
  ingredienteEditando: Ingrediente | null;
  busca: string;
  categoriaSelecionada: string;
  carregar: (userId: string) => Promise<void>;
  criar: (userId: string, dados: IngredienteInput) => Promise<void>;
  atualizar: (
    id: string,
    userId: string,
    dados: Partial<IngredienteInput>,
  ) => Promise<void>;
  deletar: (id: string, userId: string) => Promise<void>;
  abrirModal: (ingrediente?: Ingrediente) => void;
  fecharModal: () => void;
  setBusca: (busca: string) => void;
  setCategoria: (categoria: string) => void;
}

export const useIngredientesStore = create<IngredientesStore>((set, get) => ({
  ingredientes: [],
  loading: false,
  erro: null,
  modalAberto: false,
  ingredienteEditando: null,
  busca: "",
  categoriaSelecionada: "",

  carregar: async (userId) => {
    set({ loading: true, erro: null });
    try {
      const ingredientes = await listarIngredientes(userId);
      set({ ingredientes });
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao carregar ingredientes.",
      });
    } finally {
      set({ loading: false });
    }
  },

  criar: async (userId, dados) => {
    set({ erro: null });
    try {
      const novo = await criarIngrediente(userId, dados);
      set((state) => ({
        ingredientes: [...state.ingredientes, novo],
        modalAberto: false,
      }));
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao criar ingrediente.",
      });
      throw e;
    }
  },

  atualizar: async (id, userId, dados) => {
    set({ erro: null });
    try {
      const atualizado = await atualizarIngrediente(id, userId, dados);
      set((state) => ({
        ingredientes: state.ingredientes.map((i) =>
          i.id === id ? atualizado : i,
        ),
        modalAberto: false,
        ingredienteEditando: null,
      }));
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao atualizar ingrediente.",
      });
      throw e;
    }
  },

  deletar: async (id, userId) => {
    set({ erro: null });
    try {
      await deletarIngrediente(id, userId);
      set((state) => ({
        ingredientes: state.ingredientes.filter((i) => i.id !== id),
      }));
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao deletar ingrediente.",
      });
    }
  },

  abrirModal: (ingrediente) =>
    set({ modalAberto: true, ingredienteEditando: ingrediente ?? null }),
  fecharModal: () => set({ modalAberto: false, ingredienteEditando: null }),
  setBusca: (busca) => set({ busca }),
  setCategoria: (categoriaSelecionada) => set({ categoriaSelecionada }),
}));
