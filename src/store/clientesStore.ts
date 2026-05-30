// Store Zustand dos clientes — consome apenas services, nunca repositórios diretamente

import { create } from "zustand";
import type {
  Cliente,
  ClienteInput,
} from "@/lib/db/interfaces/IClientesRepository";
import {
  listarClientes,
  criarCliente,
  atualizarCliente,
  deletarCliente,
} from "@/services/clientesService";

interface ClientesStore {
  clientes: Cliente[];
  loading: boolean;
  erro: string | null;
  modalAberto: boolean;
  clienteEditando: Cliente | null;
  busca: string;
  carregar: (userId: string) => Promise<void>;
  criar: (userId: string, dados: ClienteInput) => Promise<void>;
  atualizar: (
    id: string,
    userId: string,
    dados: Partial<ClienteInput>,
  ) => Promise<void>;
  deletar: (id: string, userId: string) => Promise<void>;
  abrirModal: (cliente?: Cliente) => void;
  fecharModal: () => void;
  setBusca: (busca: string) => void;
}

export const useClientesStore = create<ClientesStore>((set) => ({
  clientes: [],
  loading: false,
  erro: null,
  modalAberto: false,
  clienteEditando: null,
  busca: "",

  carregar: async (userId) => {
    set({ loading: true, erro: null });
    try {
      const clientes = await listarClientes(userId);
      set({ clientes });
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao carregar clientes.",
      });
    } finally {
      set({ loading: false });
    }
  },

  criar: async (userId, dados) => {
    set({ erro: null });
    try {
      const novo = await criarCliente(userId, dados);
      set((state) => ({
        clientes: [...state.clientes, novo],
        modalAberto: false,
      }));
    } catch (e: unknown) {
      set({ erro: e instanceof Error ? e.message : "Erro ao criar cliente." });
      throw e;
    }
  },

  atualizar: async (id, userId, dados) => {
    set({ erro: null });
    try {
      const atualizado = await atualizarCliente(id, userId, dados);
      set((state) => ({
        clientes: state.clientes.map((c) => (c.id === id ? atualizado : c)),
        modalAberto: false,
        clienteEditando: null,
      }));
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao atualizar cliente.",
      });
      throw e;
    }
  },

  deletar: async (id, userId) => {
    set({ erro: null });
    try {
      await deletarCliente(id, userId);
      set((state) => ({ clientes: state.clientes.filter((c) => c.id !== id) }));
    } catch (e: unknown) {
      set({
        erro: e instanceof Error ? e.message : "Erro ao deletar cliente.",
      });
    }
  },

  abrirModal: (cliente) =>
    set({ modalAberto: true, clienteEditando: cliente ?? null }),
  fecharModal: () => set({ modalAberto: false, clienteEditando: null }),
  setBusca: (busca) => set({ busca }),
}));
