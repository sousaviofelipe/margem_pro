// Contrato TypeScript do repositório de notificações — implementado em lib/db/supabase/notificacoesRepository.ts

export interface Notificacao {
  id: string;
  tipo: "estoque_baixo" | "estoque_zerado";
  titulo: string;
  mensagem: string;
  ingrediente_id: string;
  lida: boolean;
  created_at: string;
}

export interface INotificacoesRepository {
  listar(userId: string): Promise<Notificacao[]>;
  marcarComoLida(id: string, userId: string): Promise<void>;
  marcarTodasComoLidas(userId: string): Promise<void>;
}
