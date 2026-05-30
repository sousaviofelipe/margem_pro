// Modal de formulário para criar e editar receitas com ingredientes dinâmicos

"use client";

import { useState, useEffect } from "react";
import type {
  Receita,
  ReceitaInput,
  ReceitaIngrediente,
} from "@/lib/db/interfaces/IReceitasRepository";
import type { Ingrediente } from "@/lib/db/interfaces/IIngredientesRepository";
import {
  unidadesRendimento,
  montarIngredienteReceita,
} from "@/services/receitasService";

interface Props {
  receita: Receita | null;
  ingredientesDisponiveis: Ingrediente[];
  onSalvar: (dados: ReceitaInput) => Promise<void>;
  onFechar: () => void;
}

const vazio: ReceitaInput = {
  nome: "",
  descricao: "",
  rendimento: 1,
  unidade_rendimento: "un",
  tempo_preparo_min: 0,
  custo_energia: 0,
  custo_gas: 0,
  custo_mao_obra: 0,
  margem_lucro: 30,
  ingredientes: [],
};

export default function ReceitaForm({
  receita,
  ingredientesDisponiveis,
  onSalvar,
  onFechar,
}: Props) {
  const [form, setForm] = useState<ReceitaInput>(vazio);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [ingSelecionado, setIngSelecionado] = useState("");
  const [ingQtd, setIngQtd] = useState("");

  useEffect(() => {
    if (receita) {
      setForm({
        nome: receita.nome,
        descricao: receita.descricao ?? "",
        rendimento: receita.rendimento,
        unidade_rendimento: receita.unidade_rendimento,
        tempo_preparo_min: receita.tempo_preparo_min,
        custo_energia: receita.custo_energia,
        custo_gas: receita.custo_gas,
        custo_mao_obra: receita.custo_mao_obra,
        margem_lucro: receita.margem_lucro,
        ingredientes: receita.ingredientes ?? [],
      });
    } else {
      setForm(vazio);
    }
  }, [receita]);

  const custoIngredientes = form.ingredientes.reduce(
    (acc, i) => acc + i.custo,
    0,
  );
  const custoTotal =
    custoIngredientes +
    form.custo_energia +
    form.custo_gas +
    form.custo_mao_obra;
  const custoPorUnidade =
    form.rendimento > 0 ? custoTotal / form.rendimento : 0;
  const precoSugerido = custoPorUnidade * (1 + form.margem_lucro / 100);

  function atualizar(
    campo: keyof ReceitaInput,
    valor: string | number | ReceitaIngrediente[],
  ) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function adicionarIngrediente() {
    if (!ingSelecionado || !ingQtd) return;
    const ingrediente = ingredientesDisponiveis.find(
      (i) => i.id === ingSelecionado,
    );
    if (!ingrediente) return;
    const quantidade = parseFloat(ingQtd);
    if (isNaN(quantidade) || quantidade <= 0) return;
    const jaExiste = form.ingredientes.find(
      (i) => i.ingrediente_id === ingSelecionado,
    );
    if (jaExiste) return;
    const novo = montarIngredienteReceita(ingrediente, quantidade);
    atualizar("ingredientes", [...form.ingredientes, novo]);
    setIngSelecionado("");
    setIngQtd("");
  }

  function removerIngrediente(ingredienteId: string) {
    atualizar(
      "ingredientes",
      form.ingredientes.filter((i) => i.ingrediente_id !== ingredienteId),
    );
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
        .rec-overlay {
          position: fixed;
          inset: 0;
          background: rgba(28,25,23,0.5);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .rec-modal {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 32px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .rec-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .rec-modal-titulo {
          font-family: 'Inter', serif;
          font-size: 22px;
          font-weight: 700;
          color: #1C1917;
        }

        .rec-modal-fechar {
          width: 32px; height: 32px;
          border: none;
          background: #FAF8F5;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          color: #78716C;
          transition: all 0.2s;
        }

        .rec-modal-fechar:hover { background: #F0DDD0; color: #C96A2B; }

        .rec-form { display: flex; flex-direction: column; gap: 16px; }

        .rec-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .rec-form-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }

        .rec-form-field { display: flex; flex-direction: column; gap: 6px; }

        .rec-form-field label {
          font-size: 13px;
          font-weight: 600;
          color: #44403C;
          font-family: 'DM Sans', sans-serif;
        }

        .rec-form-field input,
        .rec-form-field select,
        .rec-form-field textarea {
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
          resize: none;
        }

        .rec-form-field input:focus,
        .rec-form-field select:focus,
        .rec-form-field textarea:focus { border-color: #C96A2B; }

        .rec-secao-titulo {
          font-size: 12px;
          font-weight: 700;
          color: #78716C;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: 'DM Sans', sans-serif;
          padding-bottom: 4px;
          border-bottom: 1px solid #F3EFE9;
        }

        .rec-add-ing {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .rec-add-ing select,
        .rec-add-ing input {
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

        .rec-add-ing select:focus,
        .rec-add-ing input:focus { border-color: #C96A2B; }

        .rec-add-ing select { flex: 2; }
        .rec-add-ing input { flex: 1; }

        .rec-btn-add-ing {
          padding: 10px 16px;
          background: #C96A2B;
          color: #FFFFFF;
          border: none;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }

        .rec-btn-add-ing:hover { background: #A3511E; }

        .rec-ing-lista { display: flex; flex-direction: column; gap: 8px; }

        .rec-ing-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: #FAF8F5;
          border-radius: 8px;
          border: 1px solid #E5DDD4;
        }

        .rec-ing-item-info { flex: 1; }

        .rec-ing-item-nome {
          font-size: 13px;
          font-weight: 600;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
        }

        .rec-ing-item-detalhe {
          font-size: 11px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          margin-top: 2px;
        }

        .rec-ing-item-custo {
          font-size: 13px;
          font-weight: 700;
          color: #C96A2B;
          font-family: 'DM Sans', sans-serif;
          margin-right: 12px;
        }

        .rec-ing-remover {
          background: none;
          border: none;
          cursor: pointer;
          color: #78716C;
          font-size: 14px;
          padding: 4px;
          transition: color 0.2s;
        }

        .rec-ing-remover:hover { color: #dc2626; }

        .rec-preview {
          background: #FAF8F5;
          border: 1px solid #E5DDD4;
          border-radius: 12px;
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .rec-preview-item { text-align: center; }

        .rec-preview-label {
          font-size: 11px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 4px;
        }

        .rec-preview-valor {
          font-family: 'Inter', serif;
          font-size: 16px;
          font-weight: 700;
          color: #1C1917;
        }

        .rec-preview-valor.terra { color: #C96A2B; }
        .rec-preview-valor.verde { color: #16a34a; }

        .rec-margem-slider { display: flex; flex-direction: column; gap: 8px; }

        .rec-margem-slider label {
          font-size: 13px;
          font-weight: 600;
          color: #44403C;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          justify-content: space-between;
        }

        .rec-margem-slider label span {
          color: #C96A2B;
          font-weight: 700;
        }

        .rec-margem-slider input[type="range"] {
          width: 100%;
          accent-color: #C96A2B;
          padding: 0;
          border: none;
          background: transparent;
        }

        .rec-form-erro {
          font-size: 13px;
          color: #dc2626;
          background: #fef2f2;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #fecaca;
          font-family: 'DM Sans', sans-serif;
        }

        .rec-form-acoes { display: flex; gap: 10px; margin-top: 4px; }

        .rec-btn-cancelar {
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

        .rec-btn-cancelar:hover { border-color: #78716C; }

        .rec-btn-salvar {
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

        .rec-btn-salvar:hover:not(:disabled) { background: #A3511E; }
        .rec-btn-salvar:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div
        className="rec-overlay"
        onClick={(e) => e.target === e.currentTarget && onFechar()}
      >
        <div className="rec-modal">
          <div className="rec-modal-header">
            <h3 className="rec-modal-titulo">
              {receita ? "Editar Receita" : "Nova Receita"}
            </h3>
            <button className="rec-modal-fechar" onClick={onFechar}>
              ✕
            </button>
          </div>

          <form className="rec-form" onSubmit={handleSubmit}>
            <div className="rec-form-field">
              <label>Nome da receita *</label>
              <input
                type="text"
                placeholder="Ex: Brigadeiro Tradicional"
                value={form.nome}
                onChange={(e) => atualizar("nome", e.target.value)}
                required
              />
            </div>

            <div className="rec-form-field">
              <label>Descrição</label>
              <textarea
                rows={2}
                placeholder="Descrição opcional..."
                value={form.descricao}
                onChange={(e) => atualizar("descricao", e.target.value)}
              />
            </div>

            <div className="rec-form-row">
              <div className="rec-form-field">
                <label>Rendimento *</label>
                <input
                  type="number"
                  min="0.001"
                  step="0.001"
                  value={form.rendimento || ""}
                  onChange={(e) =>
                    atualizar("rendimento", parseFloat(e.target.value) || 0)
                  }
                  required
                />
              </div>
              <div className="rec-form-field">
                <label>Unidade do rendimento</label>
                <select
                  value={form.unidade_rendimento}
                  onChange={(e) =>
                    atualizar("unidade_rendimento", e.target.value)
                  }
                >
                  {unidadesRendimento.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rec-secao-titulo">Custos adicionais</div>

            <div className="rec-form-row-3">
              <div className="rec-form-field">
                <label>Energia (R$)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.custo_energia || ""}
                  onChange={(e) =>
                    atualizar("custo_energia", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
              <div className="rec-form-field">
                <label>Gás (R$)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.custo_gas || ""}
                  onChange={(e) =>
                    atualizar("custo_gas", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
              <div className="rec-form-field">
                <label>Mão de obra (R$)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.custo_mao_obra || ""}
                  onChange={(e) =>
                    atualizar("custo_mao_obra", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
            </div>

            <div className="rec-secao-titulo">Ingredientes</div>

            <div className="rec-add-ing">
              <select
                value={ingSelecionado}
                onChange={(e) => setIngSelecionado(e.target.value)}
              >
                <option value="">Selecionar ingrediente</option>
                {ingredientesDisponiveis.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.nome} ({i.unidade_medida})
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0.001"
                step="0.001"
                placeholder="Qtd"
                value={ingQtd}
                onChange={(e) => setIngQtd(e.target.value)}
              />
              <button
                type="button"
                className="rec-btn-add-ing"
                onClick={adicionarIngrediente}
              >
                + Adicionar
              </button>
            </div>

            {form.ingredientes.length > 0 && (
              <div className="rec-ing-lista">
                {form.ingredientes.map((ing) => (
                  <div key={ing.ingrediente_id} className="rec-ing-item">
                    <div className="rec-ing-item-info">
                      <div className="rec-ing-item-nome">
                        {ing.ingrediente_nome}
                      </div>
                      <div className="rec-ing-item-detalhe">
                        {ing.quantidade} {ing.unidade_medida}
                      </div>
                    </div>
                    <div className="rec-ing-item-custo">
                      {ing.custo.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                    <button
                      type="button"
                      className="rec-ing-remover"
                      onClick={() => removerIngrediente(ing.ingrediente_id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="rec-margem-slider">
              <label>
                Margem de lucro
                <span>{form.margem_lucro}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="200"
                step="1"
                value={form.margem_lucro}
                onChange={(e) =>
                  atualizar("margem_lucro", parseInt(e.target.value))
                }
              />
            </div>

            <div className="rec-preview">
              <div className="rec-preview-item">
                <div className="rec-preview-label">Custo ingredientes</div>
                <div className="rec-preview-valor">
                  {custoIngredientes.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
              <div className="rec-preview-item">
                <div className="rec-preview-label">Custo total</div>
                <div className="rec-preview-valor terra">
                  {custoTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
              <div className="rec-preview-item">
                <div className="rec-preview-label">Custo por unidade</div>
                <div className="rec-preview-valor">
                  {custoPorUnidade.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
              <div className="rec-preview-item">
                <div className="rec-preview-label">Preço sugerido</div>
                <div className="rec-preview-valor verde">
                  {precoSugerido.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
            </div>

            {erro && <div className="rec-form-erro">{erro}</div>}

            <div className="rec-form-acoes">
              <button
                type="button"
                className="rec-btn-cancelar"
                onClick={onFechar}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rec-btn-salvar"
                disabled={loading}
              >
                {loading
                  ? "Salvando..."
                  : receita
                    ? "Salvar alterações"
                    : "Criar receita"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
