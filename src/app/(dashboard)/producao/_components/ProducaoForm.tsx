// Formulário de planejamento de produção — seleção de receitas e quantidades

"use client";

import { useState } from "react";
import type { Receita } from "@/lib/db/interfaces/IReceitasRepository";
import type { ItemProducao } from "@/lib/db/interfaces/IProducaoRepository";
import { montarItemProducao } from "@/services/producaoService";

interface Props {
  receitas: Receita[];
  itens: ItemProducao[];
  loading: boolean;
  onAdicionar: (item: ItemProducao) => void;
  onRemover: (receitaId: string) => void;
  onCalcular: () => void;
}

export default function ProducaoForm({
  receitas,
  itens,
  loading,
  onAdicionar,
  onRemover,
  onCalcular,
}: Props) {
  const [receitaSelecionada, setReceitaSelecionada] = useState("");
  const [quantidade, setQuantidade] = useState("1");

  function handleAdicionar() {
    if (!receitaSelecionada) return;
    const receita = receitas.find((r) => r.id === receitaSelecionada);
    if (!receita) return;
    const qtd = parseInt(quantidade) || 1;
    const item = montarItemProducao(receita, qtd);
    onAdicionar(item);
    setReceitaSelecionada("");
    setQuantidade("1");
  }

  return (
    <>
      <style>{`
        .prc-form-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 20px;
        }

        .prc-form-titulo {
          font-family: 'Inter', serif;
          font-size: 18px;
          font-weight: 700;
          color: #1C1917;
          margin-bottom: 20px;
        }

        .prc-add-row {
          display: flex;
          gap: 10px;
          align-items: flex-end;
          margin-bottom: 16px;
        }

        .prc-add-row select,
        .prc-add-row input {
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

        .prc-add-row select:focus,
        .prc-add-row input:focus { border-color: #C96A2B; }

        .prc-add-row select { flex: 3; }
        .prc-add-row input { flex: 1; }

        .prc-btn-add {
          padding: 10px 18px;
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

        .prc-btn-add:hover { background: #A3511E; }

        .prc-itens-lista { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }

        .prc-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #FAF8F5;
          border-radius: 10px;
          border: 1px solid #E5DDD4;
        }

        .prc-item-info { flex: 1; }

        .prc-item-nome {
          font-size: 14px;
          font-weight: 600;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
        }

        .prc-item-detalhe {
          font-size: 12px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          margin-top: 2px;
        }

        .prc-item-custo {
          font-size: 14px;
          font-weight: 700;
          color: #C96A2B;
          font-family: 'DM Sans', sans-serif;
          margin-right: 12px;
        }

        .prc-item-remover {
          background: none;
          border: none;
          cursor: pointer;
          color: #78716C;
          font-size: 14px;
          padding: 4px;
          transition: color 0.2s;
        }

        .prc-item-remover:hover { color: #dc2626; }

        .prc-btn-calcular {
          width: 100%;
          padding: 14px;
          background: #1C1917;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }

        .prc-btn-calcular:hover:not(:disabled) { background: #44403C; }
        .prc-btn-calcular:disabled { opacity: 0.6; cursor: not-allowed; }

        .prc-vazio {
          text-align: center;
          padding: 24px;
          color: #78716C;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
        }
      `}</style>

      <div className="prc-form-card">
        <div className="prc-form-titulo">O que vai produzir?</div>

        <div className="prc-add-row">
          <select
            value={receitaSelecionada}
            onChange={(e) => setReceitaSelecionada(e.target.value)}
          >
            <option value="">Selecionar receita</option>
            {receitas.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nome} ({r.unidade_rendimento})
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            step="1"
            placeholder="Qtd"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <button
            type="button"
            className="prc-btn-add"
            onClick={handleAdicionar}
          >
            + Adicionar
          </button>
        </div>

        {itens.length === 0 ? (
          <div className="prc-vazio">Nenhuma receita adicionada ainda.</div>
        ) : (
          <div className="prc-itens-lista">
            {itens.map((item) => (
              <div key={item.receita_id} className="prc-item">
                <div className="prc-item-info">
                  <div className="prc-item-nome">{item.receita_nome}</div>
                  <div className="prc-item-detalhe">
                    {item.quantidade} unidade{item.quantidade !== 1 ? "s" : ""}
                  </div>
                </div>
                <div className="prc-item-custo">
                  {item.custo_total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
                <button
                  className="prc-item-remover"
                  onClick={() => onRemover(item.receita_id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          className="prc-btn-calcular"
          onClick={onCalcular}
          disabled={loading || itens.length === 0}
        >
          {loading ? "Calculando..." : "🔍 Calcular Ingredientes Necessários"}
        </button>
      </div>
    </>
  );
}
