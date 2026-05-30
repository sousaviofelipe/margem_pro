// Modal de formulário para criar e editar clientes

"use client";

import { useState, useEffect } from "react";
import type {
  Cliente,
  ClienteInput,
} from "@/lib/db/interfaces/IClientesRepository";

interface Props {
  cliente: Cliente | null;
  onSalvar: (dados: ClienteInput) => Promise<void>;
  onFechar: () => void;
}

const vazio: ClienteInput = {
  nome: "",
  telefone: "",
  email: "",
  observacoes: "",
};

export default function ClienteForm({ cliente, onSalvar, onFechar }: Props) {
  const [form, setForm] = useState<ClienteInput>(vazio);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (cliente) {
      setForm({
        nome: cliente.nome,
        telefone: cliente.telefone ?? "",
        email: cliente.email ?? "",
        observacoes: cliente.observacoes ?? "",
      });
    } else {
      setForm(vazio);
    }
  }, [cliente]);

  function atualizar(campo: keyof ClienteInput, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      await onSalvar(form);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        .cli-overlay {
          position: fixed;
          inset: 0;
          background: rgba(28,25,23,0.5);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .cli-modal {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 32px;
          width: 100%;
          max-width: 480px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .cli-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .cli-modal-titulo {
          font-family: 'Inter', serif;
          font-size: 22px;
          font-weight: 700;
          color: #1C1917;
        }

        .cli-modal-fechar {
          width: 32px; height: 32px;
          border: none;
          background: #FAF8F5;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          color: #78716C;
          transition: all 0.2s;
        }

        .cli-modal-fechar:hover { background: #F0DDD0; color: #C96A2B; }

        .cli-form { display: flex; flex-direction: column; gap: 16px; }

        .cli-form-field { display: flex; flex-direction: column; gap: 6px; }

        .cli-form-field label {
          font-size: 13px;
          font-weight: 600;
          color: #44403C;
          font-family: 'DM Sans', sans-serif;
        }

        .cli-form-field input,
        .cli-form-field textarea {
          padding: 10px 14px;
          border: 1.5px solid #E5DDD4;
          border-radius: 9px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1C1917;
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.2s;
          resize: none;
        }

        .cli-form-field input:focus,
        .cli-form-field textarea:focus { border-color: #C96A2B; }

        .cli-form-erro {
          font-size: 13px;
          color: #dc2626;
          background: #fef2f2;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #fecaca;
          font-family: 'DM Sans', sans-serif;
        }

        .cli-form-acoes { display: flex; gap: 10px; margin-top: 4px; }

        .cli-btn-cancelar {
          flex: 1;
          padding: 12px;
          border: 1.5px solid #E5DDD4;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: #44403C;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cli-btn-cancelar:hover { border-color: #78716C; }

        .cli-btn-salvar {
          flex: 2;
          padding: 12px;
          background: #C96A2B;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cli-btn-salvar:hover:not(:disabled) { background: #A3511E; }
        .cli-btn-salvar:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div
        className="cli-overlay"
        onClick={(e) => e.target === e.currentTarget && onFechar()}
      >
        <div className="cli-modal">
          <div className="cli-modal-header">
            <h3 className="cli-modal-titulo">
              {cliente ? "Editar Cliente" : "Novo Cliente"}
            </h3>
            <button className="cli-modal-fechar" onClick={onFechar}>
              ✕
            </button>
          </div>

          <form className="cli-form" onSubmit={handleSubmit}>
            <div className="cli-form-field">
              <label>Nome completo *</label>
              <input
                type="text"
                placeholder="Ex: Maria Silva"
                value={form.nome}
                onChange={(e) => atualizar("nome", e.target.value)}
                required
              />
            </div>

            <div className="cli-form-field">
              <label>WhatsApp / Telefone</label>
              <input
                type="tel"
                placeholder="(00) 00000-0000"
                value={form.telefone}
                onChange={(e) => atualizar("telefone", e.target.value)}
              />
            </div>

            <div className="cli-form-field">
              <label>E-mail</label>
              <input
                type="email"
                placeholder="cliente@email.com"
                value={form.email}
                onChange={(e) => atualizar("email", e.target.value)}
              />
            </div>

            <div className="cli-form-field">
              <label>Observações</label>
              <textarea
                rows={3}
                placeholder="Preferências, alergias, endereço..."
                value={form.observacoes}
                onChange={(e) => atualizar("observacoes", e.target.value)}
              />
            </div>

            {erro && <div className="cli-form-erro">{erro}</div>}

            <div className="cli-form-acoes">
              <button
                type="button"
                className="cli-btn-cancelar"
                onClick={onFechar}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="cli-btn-salvar"
                disabled={loading}
              >
                {loading
                  ? "Salvando..."
                  : cliente
                    ? "Salvar alterações"
                    : "Cadastrar cliente"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
