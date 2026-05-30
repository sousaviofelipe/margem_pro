// Store Zustand dos pedidos — consome apenas services, nunca repositórios diretamente

import { create } from "zustand";
import type {
  Pedido,
  PedidoInput,
  PedidoStatus,
} from "@/lib/db/interfaces/IPedidosRepository";
import {
  listarPedidos,
  criarPedido,
  atualizarPedido,
  atualizarStatusPedido,
  deletarPedido,
} from "@/services/pedidosService";

interface PedidosStore {
  pedidos: Pedido[];
  loading: boolean;
  erro: string | null;
  modalAberto: boolean;
  pedidoEditando: Pedido | null;
  filtroStatus: string;
  busca: string;
  carregar: (userId: string) => Promise<void>;
  criar: (userId: string, dados: PedidoInput) => Promise<void>;
  atualizar: (id: string, userId: string, dados: PedidoInput) => Promise<void>;
  atualizarStatus: (
    id: string,
    userId: string,
    status: PedidoStatus,
  ) => Promise<void>;
  deletar: (id: string, userId: string) => Promise<void>;
  abrirModal: (pedido?: Pedido) => void;
  fecharModal: () => void;
  setFiltroStatus: (status: string) => void;
  setBusca: (busca: string) => void;
}

export const usePedidosStore = create<PedidosStore>((set) => ({
  pedidos: [],
  loading: false,
  erro: null,
  modalAberto: false,
  pedidoEditando: null,
  filtroStatus: "",
  busca: "",

  carregar: async (userId) => {
    set({ loading: true, erro: null });
    try {
      const pedidos = await listarPedidos(userId);
      set({ pedidos });
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao carregar pedidos.",
      });
    } finally {
      set({ loading: false });
    }
  },

  criar: async (userId, dados) => {
    set({ erro: null });
    try {
      const novo = await criarPedido(userId, dados);
      set((state) => ({
        pedidos: [novo, ...state.pedidos],
        modalAberto: false,
      }));
    } catch (e: unknown) {
      set({ erro: e instanceof Error ? e.message : "Erro ao criar pedido." });
      throw e;
    }
  },

  atualizar: async (id, userId, dados) => {
    set({ erro: null });
    try {
      const atualizado = await atualizarPedido(id, userId, dados);
      set((state) => ({
        pedidos: state.pedidos.map((p) => (p.id === id ? atualizado : p)),
        modalAberto: false,
        pedidoEditando: null,
      }));
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao atualizar pedido.",
      });
      throw e;
    }
  },

  atualizarStatus: async (id, userId, status) => {
    set({ erro: null });
    try {
      const atualizado = await atualizarStatusPedido(id, userId, status);
      set((state) => ({
        pedidos: state.pedidos.map((p) => (p.id === id ? atualizado : p)),
      }));
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao atualizar status.",
      });
    }
  },

  deletar: async (id, userId) => {
    set({ erro: null });
    try {
      await deletarPedido(id, userId);
      set((state) => ({ pedidos: state.pedidos.filter((p) => p.id !== id) }));
    } catch (e: unknown) {
      set({ erro: e instanceof Error ? e.message : "Erro ao deletar pedido." });
    }
  },

  abrirModal: (pedido) =>
    set({ modalAberto: true, pedidoEditando: pedido ?? null }),
  fecharModal: () => set({ modalAberto: false, pedidoEditando: null }),
  setFiltroStatus: (filtroStatus) => set({ filtroStatus }),
  setBusca: (busca) => set({ busca }),
}));
