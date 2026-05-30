// Card individual de ingrediente — exibe dados e ações de editar e deletar

import type { Ingrediente } from "@/lib/db/interfaces/IIngredientesRepository";
import { estoqueStatus } from "@/services/ingredientesService";

interface Props {
  ingrediente: Ingrediente;
  onEditar: (ingrediente: Ingrediente) => void;
  onDeletar: (id: string) => void;
}

const statusConfig = {
  ok: { label: "Estoque OK", cor: "#16a34a", bg: "#f0fdf4" },
  baixo: { label: "Estoque Baixo", cor: "#d97706", bg: "#fffbeb" },
  zerado: { label: "Sem Estoque", cor: "#dc2626", bg: "#fef2f2" },
};

export default function IngredienteCard({
  ingrediente,
  onEditar,
  onDeletar,
}: Props) {
  const status = estoqueStatus(ingrediente);
  const config = statusConfig[status];

  return (
    <>
      <style>{`
        .ing-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 20px;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .ing-card:hover {
          box-shadow: 0 4px 20px rgba(28,25,23,0.07);
          border-color: #C96A2B30;
        }

        .ing-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }

        .ing-card-nome {
          font-family: 'Inter', serif;
          font-size: 17px;
          font-weight: 700;
          color: #1C1917;
          line-height: 1.2;
        }

        .ing-card-categoria {
          font-size: 11px;
          color: #78716C;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          margin-top: 3px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .ing-status-badge {
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .ing-card-dados {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .ing-dado {
          background: #FAF8F5;
          border-radius: 8px;
          padding: 10px 12px;
        }

        .ing-dado-label {
          font-size: 11px;
          color: #78716C;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 3px;
        }

        .ing-dado-valor {
          font-size: 14px;
          font-weight: 700;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
        }

        .ing-dado-valor.destaque { color: #C96A2B; }

        .ing-card-acoes {
          display: flex;
          gap: 8px;
          padding-top: 4px;
          border-top: 1px solid #F3EFE9;
        }

        .ing-btn-editar {
          flex: 1;
          padding: 8px;
          border: 1.5px solid #E5DDD4;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: #44403C;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ing-btn-editar:hover {
          border-color: #C96A2B;
          color: #C96A2B;
        }

        .ing-btn-deletar {
          padding: 8px 12px;
          border: 1.5px solid #E5DDD4;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: #78716C;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ing-btn-deletar:hover {
          border-color: #dc2626;
          color: #dc2626;
          background: #fef2f2;
        }
      `}</style>

      <div className="ing-card">
        <div className="ing-card-top">
          <div>
            <div className="ing-card-nome">{ingrediente.nome}</div>
            <div className="ing-card-categoria">{ingrediente.categoria}</div>
          </div>
          <div
            className="ing-status-badge"
            style={{ color: config.cor, background: config.bg }}
          >
            {config.label}
          </div>
        </div>

        <div className="ing-card-dados">
          <div className="ing-dado">
            <div className="ing-dado-label">
              Custo por {ingrediente.unidade_medida}
            </div>
            <div className="ing-dado-valor destaque">
              {(ingrediente.custo_por_unidade ?? 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
          <div className="ing-dado">
            <div className="ing-dado-label">Preço total</div>
            <div className="ing-dado-valor">
              {ingrediente.preco_total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
          <div className="ing-dado">
            <div className="ing-dado-label">Estoque atual</div>
            <div className="ing-dado-valor">
              {ingrediente.estoque_atual} {ingrediente.unidade_medida}
            </div>
          </div>
          <div className="ing-dado">
            <div className="ing-dado-label">Qtd. total</div>
            <div className="ing-dado-valor">
              {ingrediente.quantidade_total} {ingrediente.unidade_medida}
            </div>
          </div>
        </div>

        <div className="ing-card-acoes">
          <button
            className="ing-btn-editar"
            onClick={() => onEditar(ingrediente)}
          >
            ✏️ Editar
          </button>
          <button
            className="ing-btn-deletar"
            onClick={() => onDeletar(ingrediente.id)}
          >
            🗑️
          </button>
        </div>
      </div>
    </>
  );
}
