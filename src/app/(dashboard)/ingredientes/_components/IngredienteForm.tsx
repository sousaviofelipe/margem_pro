// Modal de formulário para criar e editar ingredientes

"use client";

import { useState, useEffect } from "react";
import type {
  Ingrediente,
  IngredienteInput,
} from "@/lib/db/interfaces/IIngredientesRepository";
import { categorias, unidades } from "@/services/ingredientesService";

interface Props {
  ingrediente: Ingrediente | null;
  onSalvar: (dados: IngredienteInput) => Promise<void>;
  onFechar: () => void;
}

const vazio: IngredienteInput = {
  nome: "",
  categoria: "",
  unidade_medida: "kg",
  preco_total: 0,
  quantidade_total: 0,
  estoque_atual: 0,
  estoque_minimo: 0,
};

export default function IngredienteForm({
  ingrediente,
  onSalvar,
  onFechar,
}: Props) {
  const [form, setForm] = useState<IngredienteInput>(vazio);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (ingrediente) {
      setForm({
        nome: ingrediente.nome,
        categoria: ingrediente.categoria,
        unidade_medida: ingrediente.unidade_medida,
        preco_total: ingrediente.preco_total,
        quantidade_total: ingrediente.quantidade_total,
        estoque_atual: ingrediente.estoque_atual,
        estoque_minimo: ingrediente.estoque_minimo,
      });
    } else {
      setForm(vazio);
    }
  }, [ingrediente]);

  const custoPorUnidade =
    form.quantidade_total > 0 ? form.preco_total / form.quantidade_total : 0;

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

  function atualizar(campo: keyof IngredienteInput, valor: string | number) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  return (
    <>
      <style>{`
        .ing-overlay {
          position: fixed;
          inset: 0;
          background: rgba(28,25,23,0.5);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .ing-modal {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 32px;
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .ing-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .ing-modal-titulo {
          font-family: 'Inter', serif;
          font-size: 22px;
          font-weight: 700;
          color: #1C1917;
        }

        .ing-modal-fechar {
          width: 32px; height: 32px;
          border: none;
          background: #FAF8F5;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          color: #78716C;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .ing-modal-fechar:hover { background: #F0DDD0; color: #C96A2B; }

        .ing-form { display: flex; flex-direction: column; gap: 16px; }

        .ing-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .ing-form-field { display: flex; flex-direction: column; gap: 6px; }

        .ing-form-field label {
          font-size: 13px;
          font-weight: 600;
          color: #44403C;
          font-family: 'DM Sans', sans-serif;
        }

        .ing-form-field input,
        .ing-form-field select {
          padding: 10px 14px;
          border: 1.5px solid #E5DDD4;
          border-radius: 9px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1C1917;
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.2s;
          appearance: none;
        }

        .ing-form-field input:focus,
        .ing-form-field select:focus { border-color: #C96A2B; }

        .ing-custo-preview {
          background: #FAF8F5;
          border: 1px solid #E5DDD4;
          border-radius: 10px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ing-custo-label {
          font-size: 13px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .ing-custo-valor {
          font-family: 'Inter', serif;
          font-size: 20px;
          font-weight: 700;
          color: #C96A2B;
        }

        .ing-form-erro {
          font-size: 13px;
          color: #dc2626;
          background: #fef2f2;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #fecaca;
          font-family: 'DM Sans', sans-serif;
        }

        .ing-form-acoes {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .ing-btn-cancelar {
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

        .ing-btn-cancelar:hover { border-color: #78716C; }

        .ing-btn-salvar {
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

        .ing-btn-salvar:hover:not(:disabled) { background: #A3511E; }
        .ing-btn-salvar:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div
        className="ing-overlay"
        onClick={(e) => e.target === e.currentTarget && onFechar()}
      >
        <div className="ing-modal">
          <div className="ing-modal-header">
            <h3 className="ing-modal-titulo">
              {ingrediente ? "Editar Ingrediente" : "Novo Ingrediente"}
            </h3>
            <button className="ing-modal-fechar" onClick={onFechar}>
              ✕
            </button>
          </div>

          <form className="ing-form" onSubmit={handleSubmit}>
            <div className="ing-form-field">
              <label>Nome do ingrediente *</label>
              <input
                type="text"
                placeholder="Ex: Leite condensado"
                value={form.nome}
                onChange={(e) => atualizar("nome", e.target.value)}
                required
              />
            </div>

            <div className="ing-form-row">
              <div className="ing-form-field">
                <label>Categoria</label>
                <select
                  value={form.categoria}
                  onChange={(e) => atualizar("categoria", e.target.value)}
                >
                  <option value="">Selecionar</option>
                  {categorias.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ing-form-field">
                <label>Unidade de medida *</label>
                <select
                  value={form.unidade_medida}
                  onChange={(e) => atualizar("unidade_medida", e.target.value)}
                >
                  {unidades.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="ing-form-row">
              <div className="ing-form-field">
                <label>Preço total (R$) *</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0,00"
                  value={form.preco_total || ""}
                  onChange={(e) =>
                    atualizar("preco_total", parseFloat(e.target.value) || 0)
                  }
                  required
                />
              </div>
              <div className="ing-form-field">
                <label>Quantidade total *</label>
                <input
                  type="number"
                  min="0"
                  step="0.001"
                  placeholder="0"
                  value={form.quantidade_total || ""}
                  onChange={(e) =>
                    atualizar(
                      "quantidade_total",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  required
                />
              </div>
            </div>

            <div className="ing-custo-preview">
              <span className="ing-custo-label">
                Custo por {form.unidade_medida || "unidade"}
              </span>
              <span className="ing-custo-valor">
                {custoPorUnidade.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            <div className="ing-form-row">
              <div className="ing-form-field">
                <label>Estoque atual</label>
                <input
                  type="number"
                  min="0"
                  step="0.001"
                  placeholder="0"
                  value={form.estoque_atual || ""}
                  onChange={(e) =>
                    atualizar("estoque_atual", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
              <div className="ing-form-field">
                <label>Estoque mínimo</label>
                <input
                  type="number"
                  min="0"
                  step="0.001"
                  placeholder="0"
                  value={form.estoque_minimo || ""}
                  onChange={(e) =>
                    atualizar("estoque_minimo", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
            </div>

            {erro && <div className="ing-form-erro">{erro}</div>}

            <div className="ing-form-acoes">
              <button
                type="button"
                className="ing-btn-cancelar"
                onClick={onFechar}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="ing-btn-salvar"
                disabled={loading}
              >
                {loading
                  ? "Salvando..."
                  : ingrediente
                    ? "Salvar alterações"
                    : "Criar ingrediente"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
