// Store Zustand das notificações — consome apenas services, nunca repositórios diretamente

import { create } from "zustand";
import type { Notificacao } from "@/lib/db/interfaces/INotificacoesRepository";
import { listarNotificacoes } from "@/services/notificacoesService";

interface NotificacoesStore {
  notificacoes: Notificacao[];
  lidasIds: Set<string>;
  aberto: boolean;
  loading: boolean;
  carregar: (userId: string) => Promise<void>;
  marcarComoLida: (id: string) => void;
  marcarTodasComoLidas: () => void;
  toggleAberto: () => void;
  fechar: () => void;
}

export const useNotificacoesStore = create<NotificacoesStore>((set, get) => ({
  notificacoes: [],
  lidasIds: new Set(),
  aberto: false,
  loading: false,

  carregar: async (userId) => {
    set({ loading: true });
    try {
      const notificacoes = await listarNotificacoes(userId);
      set({ notificacoes });
    } finally {
      set({ loading: false });
    }
  },

  marcarComoLida: (id) => {
    set((state) => {
      const novas = new Set(state.lidasIds);
      novas.add(id);
      return { lidasIds: novas };
    });
  },

  marcarTodasComoLidas: () => {
    set((state) => ({
      lidasIds: new Set(state.notificacoes.map((n) => n.id)),
    }));
  },

  toggleAberto: () => set((state) => ({ aberto: !state.aberto })),
  fechar: () => set({ aberto: false }),
}));
