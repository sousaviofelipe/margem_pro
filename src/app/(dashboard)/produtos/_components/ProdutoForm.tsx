// Modal de formulário para criar e editar produtos finais

"use client";

import { useState, useEffect } from "react";
import type {
  Produto,
  ProdutoInput,
  ProdutoReceita,
} from "@/lib/db/interfaces/IProdutosRepository";
import type { Receita } from "@/lib/db/interfaces/IReceitasRepository";
import {
  montarReceitaProduto,
  calcularTotais,
} from "@/services/produtosService";

interface Props {
  produto: Produto | null;
  receitasDisponiveis: Receita[];
  onSalvar: (dados: ProdutoInput) => Promise<void>;
  onFechar: () => void;
}

const vazio: ProdutoInput = {
  nome: "",
  descricao: "",
  preco_venda: 0,
  custo_embalagem: 0,
  custo_extras: 0,
  margem_lucro: 30,
  receitas: [],
};

export default function ProdutoForm({
  produto,
  receitasDisponiveis,
  onSalvar,
  onFechar,
}: Props) {
  const [form, setForm] = useState<ProdutoInput>(vazio);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [recSelecionada, setRecSelecionada] = useState("");
  const [recQtd, setRecQtd] = useState("");

  useEffect(() => {
    if (produto) {
      setForm({
        nome: produto.nome,
        descricao: produto.descricao ?? "",
        preco_venda: produto.preco_venda,
        custo_embalagem: produto.custo_embalagem,
        custo_extras: produto.custo_extras,
        margem_lucro: produto.margem_lucro,
        receitas: produto.receitas ?? [],
      });
    } else {
      setForm(vazio);
    }
  }, [produto]);

  const totais = calcularTotais(
    form.receitas,
    form.custo_embalagem,
    form.custo_extras,
    form.margem_lucro,
  );

  function atualizar(
    campo: keyof ProdutoInput,
    valor: string | number | ProdutoReceita[],
  ) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function adicionarReceita() {
    if (!recSelecionada || !recQtd) return;
    const receita = receitasDisponiveis.find((r) => r.id === recSelecionada);
    if (!receita) return;
    const quantidade = parseFloat(recQtd);
    if (isNaN(quantidade) || quantidade <= 0) return;
    const jaExiste = form.receitas.find((r) => r.receita_id === recSelecionada);
    if (jaExiste) return;
    const nova = montarReceitaProduto(receita, quantidade);
    atualizar("receitas", [...form.receitas, nova]);
    setRecSelecionada("");
    setRecQtd("");
  }

  function removerReceita(receitaId: string) {
    atualizar(
      "receitas",
      form.receitas.filter((r) => r.receita_id !== receitaId),
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
        .prod-overlay {
          position: fixed;
          inset: 0;
          background: rgba(28,25,23,0.5);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .prod-modal {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 32px;
          width: 100%;
          max-width: 580px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .prod-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .prod-modal-titulo {
          font-family: 'Inter', serif;
          font-size: 22px;
          font-weight: 700;
          color: #1C1917;
        }

        .prod-modal-fechar {
          width: 32px; height: 32px;
          border: none;
          background: #FAF8F5;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          color: #78716C;
          transition: all 0.2s;
        }

        .prod-modal-fechar:hover { background: #F0DDD0; color: #C96A2B; }

        .prod-form { display: flex; flex-direction: column; gap: 16px; }

        .prod-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .prod-form-field { display: flex; flex-direction: column; gap: 6px; }

        .prod-form-field label {
          font-size: 13px;
          font-weight: 600;
          color: #44403C;
          font-family: 'DM Sans', sans-serif;
        }

        .prod-form-field input,
        .prod-form-field select,
        .prod-form-field textarea {
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

        .prod-form-field input:focus,
        .prod-form-field select:focus,
        .prod-form-field textarea:focus { border-color: #C96A2B; }

        .prod-secao-titulo {
          font-size: 12px;
          font-weight: 700;
          color: #78716C;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: 'DM Sans', sans-serif;
          padding-bottom: 4px;
          border-bottom: 1px solid #F3EFE9;
        }

        .prod-add-rec {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .prod-add-rec select,
        .prod-add-rec input {
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

        .prod-add-rec select { flex: 2; }
        .prod-add-rec input { flex: 1; }

        .prod-btn-add-rec {
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

        .prod-btn-add-rec:hover { background: #A3511E; }

        .prod-rec-lista { display: flex; flex-direction: column; gap: 8px; }

        .prod-rec-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: #FAF8F5;
          border-radius: 8px;
          border: 1px solid #E5DDD4;
        }

        .prod-rec-item-nome {
          font-size: 13px;
          font-weight: 600;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
        }

        .prod-rec-item-detalhe {
          font-size: 11px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          margin-top: 2px;
        }

        .prod-rec-item-custo {
          font-size: 13px;
          font-weight: 700;
          color: #C96A2B;
          font-family: 'DM Sans', sans-serif;
          margin-right: 12px;
        }

        .prod-rec-remover {
          background: none;
          border: none;
          cursor: pointer;
          color: #78716C;
          font-size: 14px;
          padding: 4px;
          transition: color 0.2s;
        }

        .prod-rec-remover:hover { color: #dc2626; }

        .prod-margem-slider { display: flex; flex-direction: column; gap: 8px; }

        .prod-margem-slider label {
          font-size: 13px;
          font-weight: 600;
          color: #44403C;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          justify-content: space-between;
        }

        .prod-margem-slider label span { color: #C96A2B; font-weight: 700; }

        .prod-margem-slider input[type="range"] {
          width: 100%;
          accent-color: #C96A2B;
          padding: 0;
          border: none;
          background: transparent;
        }

        .prod-preview {
          background: #FAF8F5;
          border: 1px solid #E5DDD4;
          border-radius: 12px;
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .prod-preview-item { text-align: center; }

        .prod-preview-label {
          font-size: 11px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 4px;
        }

        .prod-preview-valor {
          font-family: 'Inter', serif;
          font-size: 15px;
          font-weight: 700;
          color: #1C1917;
        }

        .prod-preview-valor.terra { color: #C96A2B; }
        .prod-preview-valor.verde { color: #16a34a; }
        .prod-preview-valor.azul { color: #2563eb; }

        .prod-form-erro {
          font-size: 13px;
          color: #dc2626;
          background: #fef2f2;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #fecaca;
          font-family: 'DM Sans', sans-serif;
        }

        .prod-form-acoes { display: flex; gap: 10px; margin-top: 4px; }

        .prod-btn-cancelar {
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

        .prod-btn-cancelar:hover { border-color: #78716C; }

        .prod-btn-salvar {
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

        .prod-btn-salvar:hover:not(:disabled) { background: #A3511E; }
        .prod-btn-salvar:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div
        className="prod-overlay"
        onClick={(e) => e.target === e.currentTarget && onFechar()}
      >
        <div className="prod-modal">
          <div className="prod-modal-header">
            <h3 className="prod-modal-titulo">
              {produto ? "Editar Produto" : "Novo Produto"}
            </h3>
            <button className="prod-modal-fechar" onClick={onFechar}>
              ✕
            </button>
          </div>

          <form className="prod-form" onSubmit={handleSubmit}>
            <div className="prod-form-field">
              <label>Nome do produto *</label>
              <input
                type="text"
                placeholder="Ex: Bolo Red Velvet"
                value={form.nome}
                onChange={(e) => atualizar("nome", e.target.value)}
                required
              />
            </div>

            <div className="prod-form-field">
              <label>Descrição</label>
              <textarea
                rows={2}
                placeholder="Descrição opcional..."
                value={form.descricao}
                onChange={(e) => atualizar("descricao", e.target.value)}
              />
            </div>

            <div className="prod-secao-titulo">Receitas utilizadas</div>

            <div className="prod-add-rec">
              <select
                value={recSelecionada}
                onChange={(e) => setRecSelecionada(e.target.value)}
              >
                <option value="">Selecionar receita</option>
                {receitasDisponiveis.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nome} ({r.unidade_rendimento})
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0.001"
                step="0.001"
                placeholder="Qtd"
                value={recQtd}
                onChange={(e) => setRecQtd(e.target.value)}
              />
              <button
                type="button"
                className="prod-btn-add-rec"
                onClick={adicionarReceita}
              >
                + Adicionar
              </button>
            </div>

            {form.receitas.length > 0 && (
              <div className="prod-rec-lista">
                {form.receitas.map((rec) => (
                  <div key={rec.receita_id} className="prod-rec-item">
                    <div>
                      <div className="prod-rec-item-nome">
                        {rec.receita_nome}
                      </div>
                      <div className="prod-rec-item-detalhe">
                        {rec.quantidade} un.
                      </div>
                    </div>
                    <div className="prod-rec-item-custo">
                      {rec.custo.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                    <button
                      type="button"
                      className="prod-rec-remover"
                      onClick={() => removerReceita(rec.receita_id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="prod-secao-titulo">Custos adicionais</div>

            <div className="prod-form-row">
              <div className="prod-form-field">
                <label>Embalagem (R$)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.custo_embalagem || ""}
                  onChange={(e) =>
                    atualizar(
                      "custo_embalagem",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                />
              </div>
              <div className="prod-form-field">
                <label>Extras (laços, toppers...) (R$)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.custo_extras || ""}
                  onChange={(e) =>
                    atualizar("custo_extras", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
            </div>

            <div className="prod-margem-slider">
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

            <div className="prod-preview">
              <div className="prod-preview-item">
                <div className="prod-preview-label">Custo receitas</div>
                <div className="prod-preview-valor">
                  {totais.custoReceitas.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
              <div className="prod-preview-item">
                <div className="prod-preview-label">Custo total</div>
                <div className="prod-preview-valor terra">
                  {totais.custo_total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
              <div className="prod-preview-item">
                <div className="prod-preview-label">Preço de venda</div>
                <div className="prod-preview-valor azul">
                  {totais.preco_venda.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
              <div className="prod-preview-item">
                <div className="prod-preview-label">Lucro estimado</div>
                <div className="prod-preview-valor verde">
                  {totais.lucro_estimado.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
            </div>

            {erro && <div className="prod-form-erro">{erro}</div>}

            <div className="prod-form-acoes">
              <button
                type="button"
                className="prod-btn-cancelar"
                onClick={onFechar}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="prod-btn-salvar"
                disabled={loading}
              >
                {loading
                  ? "Salvando..."
                  : produto
                    ? "Salvar alterações"
                    : "Criar produto"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
