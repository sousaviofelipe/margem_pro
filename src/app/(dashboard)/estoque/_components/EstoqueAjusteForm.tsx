// Modal para ajustar estoque — entrada, saída ou ajuste manual

"use client";

import { useState } from "react";
import type { ItemEstoque } from "@/lib/db/interfaces/IEstoqueRepository";
import type { MovimentacaoEstoque } from "@/lib/db/interfaces/IEstoqueRepository";

interface Props {
  item: ItemEstoque;
  onSalvar: (dados: MovimentacaoEstoque) => Promise<void>;
  onFechar: () => void;
}

type Tipo = "entrada" | "saida" | "ajuste";

export default function EstoqueAjusteForm({ item, onSalvar, onFechar }: Props) {
  const [tipo, setTipo] = useState<Tipo>("entrada");
  const [quantidade, setQuantidade] = useState("");
  const [observacao, setObservacao] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const novoEstoque = () => {
    const qtd = parseFloat(quantidade) || 0;
    if (tipo === "entrada") return item.estoque_atual + qtd;
    if (tipo === "saida") return Math.max(0, item.estoque_atual - qtd);
    return qtd;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      await onSalvar({
        ingrediente_id: item.id,
        tipo,
        quantidade: parseFloat(quantidade) || 0,
        observacao,
      });
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao ajustar.");
    } finally {
      setLoading(false);
    }
  }

  const tipoConfig = {
    entrada: { label: "Entrada", cor: "#16a34a", bg: "#f0fdf4", icon: "📥" },
    saida: { label: "Saída", cor: "#dc2626", bg: "#fef2f2", icon: "📤" },
    ajuste: {
      label: "Ajuste Manual",
      cor: "#2563eb",
      bg: "#eff6ff",
      icon: "⚖️",
    },
  };

  return (
    <>
      <style>{`
        .est-overlay {
          position: fixed;
          inset: 0;
          background: rgba(28,25,23,0.5);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .est-modal {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 32px;
          width: 100%;
          max-width: 440px;
        }

        .est-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .est-modal-titulo {
          font-family: 'Inter', serif;
          font-size: 20px;
          font-weight: 700;
          color: #1C1917;
        }

        .est-modal-subtitulo {
          font-size: 13px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          margin-top: 2px;
        }

        .est-modal-fechar {
          width: 32px; height: 32px;
          border: none;
          background: #FAF8F5;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          color: #78716C;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .est-modal-fechar:hover { background: #F0DDD0; color: #C96A2B; }

        .est-form { display: flex; flex-direction: column; gap: 16px; }

        .est-tipo-tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .est-tipo-tab {
          padding: 10px 8px;
          border: 1.5px solid #E5DDD4;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          background: #FFFFFF;
          color: #78716C;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .est-tipo-tab.ativo {
          border-color: currentColor;
        }

        .est-estoque-preview {
          background: #FAF8F5;
          border: 1px solid #E5DDD4;
          border-radius: 12px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .est-preview-label {
          font-size: 13px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .est-preview-valor {
          font-family: 'Inter', serif;
          font-size: 22px;
          font-weight: 700;
          color: #C96A2B;
        }

        .est-form-field { display: flex; flex-direction: column; gap: 6px; }

        .est-form-field label {
          font-size: 13px;
          font-weight: 600;
          color: #44403C;
          font-family: 'DM Sans', sans-serif;
        }

        .est-form-field input,
        .est-form-field textarea {
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

        .est-form-field input:focus,
        .est-form-field textarea:focus { border-color: #C96A2B; }

        .est-form-erro {
          font-size: 13px;
          color: #dc2626;
          background: #fef2f2;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #fecaca;
          font-family: 'DM Sans', sans-serif;
        }

        .est-form-acoes { display: flex; gap: 10px; margin-top: 4px; }

        .est-btn-cancelar {
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

        .est-btn-cancelar:hover { border-color: #78716C; }

        .est-btn-salvar {
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

        .est-btn-salvar:hover:not(:disabled) { background: #A3511E; }
        .est-btn-salvar:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div
        className="est-overlay"
        onClick={(e) => e.target === e.currentTarget && onFechar()}
      >
        <div className="est-modal">
          <div className="est-modal-header">
            <div>
              <div className="est-modal-titulo">Ajustar Estoque</div>
              <div className="est-modal-subtitulo">{item.nome}</div>
            </div>
            <button className="est-modal-fechar" onClick={onFechar}>
              ✕
            </button>
          </div>

          <form className="est-form" onSubmit={handleSubmit}>
            <div className="est-tipo-tabs">
              {(Object.keys(tipoConfig) as Tipo[]).map((t) => {
                const cfg = tipoConfig[t];
                return (
                  <button
                    key={t}
                    type="button"
                    className={`est-tipo-tab ${tipo === t ? "ativo" : ""}`}
                    style={
                      tipo === t
                        ? {
                            color: cfg.cor,
                            background: cfg.bg,
                            borderColor: cfg.cor,
                          }
                        : {}
                    }
                    onClick={() => setTipo(t)}
                  >
                    <span>{cfg.icon}</span>
                    {cfg.label}
                  </button>
                );
              })}
            </div>

            <div className="est-estoque-preview">
              <div>
                <div className="est-preview-label">Estoque atual</div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1C1917",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  {item.estoque_atual} {item.unidade_medida}
                </div>
              </div>
              <div style={{ fontSize: "20px", color: "#78716C" }}>→</div>
              <div>
                <div className="est-preview-label">Novo estoque</div>
                <div className="est-preview-valor">
                  {novoEstoque()} {item.unidade_medida}
                </div>
              </div>
            </div>

            <div className="est-form-field">
              <label>
                {tipo === "ajuste"
                  ? "Novo valor do estoque"
                  : `Quantidade a ${tipo === "entrada" ? "adicionar" : "remover"}`}{" "}
                *
              </label>
              <input
                type="number"
                min="0"
                step="0.001"
                placeholder={`0 ${item.unidade_medida}`}
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
              />
            </div>

            <div className="est-form-field">
              <label>Observação</label>
              <textarea
                rows={2}
                placeholder="Motivo do ajuste..."
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              />
            </div>

            {erro && <div className="est-form-erro">{erro}</div>}

            <div className="est-form-acoes">
              <button
                type="button"
                className="est-btn-cancelar"
                onClick={onFechar}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="est-btn-salvar"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Confirmar ajuste"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
