// Store Zustand dos produtos finais — consome apenas services, nunca repositórios diretamente

import { create } from "zustand";
import type {
  Produto,
  ProdutoInput,
} from "@/lib/db/interfaces/IProdutosRepository";
import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} from "@/services/produtosService";

interface ProdutosStore {
  produtos: Produto[];
  loading: boolean;
  erro: string | null;
  modalAberto: boolean;
  produtoEditando: Produto | null;
  busca: string;
  carregar: (userId: string) => Promise<void>;
  criar: (userId: string, dados: ProdutoInput) => Promise<void>;
  atualizar: (id: string, userId: string, dados: ProdutoInput) => Promise<void>;
  deletar: (id: string, userId: string) => Promise<void>;
  abrirModal: (produto?: Produto) => void;
  fecharModal: () => void;
  setBusca: (busca: string) => void;
}

export const useProdutosStore = create<ProdutosStore>((set) => ({
  produtos: [],
  loading: false,
  erro: null,
  modalAberto: false,
  produtoEditando: null,
  busca: "",

  carregar: async (userId) => {
    set({ loading: true, erro: null });
    try {
      const produtos = await listarProdutos(userId);
      set({ produtos });
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao carregar produtos.",
      });
    } finally {
      set({ loading: false });
    }
  },

  criar: async (userId, dados) => {
    set({ erro: null });
    try {
      const novo = await criarProduto(userId, dados);
      set((state) => ({
        produtos: [...state.produtos, novo],
        modalAberto: false,
      }));
    } catch (e: unknown) {
      set({ erro: e instanceof Error ? e.message : "Erro ao criar produto." });
      throw e;
    }
  },

  atualizar: async (id, userId, dados) => {
    set({ erro: null });
    try {
      const atualizado = await atualizarProduto(id, userId, dados);
      set((state) => ({
        produtos: state.produtos.map((p) => (p.id === id ? atualizado : p)),
        modalAberto: false,
        produtoEditando: null,
      }));
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao atualizar produto.",
      });
      throw e;
    }
  },

  deletar: async (id, userId) => {
    set({ erro: null });
    try {
      await deletarProduto(id, userId);
      set((state) => ({ produtos: state.produtos.filter((p) => p.id !== id) }));
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao deletar produto.",
      });
    }
  },

  abrirModal: (produto) =>
    set({ modalAberto: true, produtoEditando: produto ?? null }),
  fecharModal: () => set({ modalAberto: false, produtoEditando: null }),
  setBusca: (busca) => set({ busca }),
}));
