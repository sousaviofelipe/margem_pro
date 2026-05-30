// Card individual de item de estoque — exibe nível e ação de ajuste

import type { ItemEstoque } from "@/lib/db/interfaces/IEstoqueRepository";
import { statusEstoqueConfig } from "@/services/estoqueService";

interface Props {
  item: ItemEstoque;
  onAjustar: (item: ItemEstoque) => void;
}

export default function EstoqueCard({ item, onAjustar }: Props) {
  const config = statusEstoqueConfig[item.status];
  const percentual =
    item.estoque_minimo > 0
      ? Math.min((item.estoque_atual / (item.estoque_minimo * 3)) * 100, 100)
      : item.estoque_atual > 0
        ? 100
        : 0;

  return (
    <>
      <style>{`
        .est-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 20px;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .est-card:hover {
          box-shadow: 0 4px 20px rgba(28,25,23,0.07);
          border-color: #C96A2B30;
        }

        .est-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }

        .est-card-nome {
          font-family: 'Inter', serif;
          font-size: 16px;
          font-weight: 700;
          color: #1C1917;
        }

        .est-card-categoria {
          font-size: 11px;
          color: #78716C;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          margin-top: 3px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .est-status-badge {
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .est-nivel {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .est-nivel-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .est-nivel-atual {
          font-size: 20px;
          font-family: 'Inter', serif;
          font-weight: 700;
          color: #1C1917;
        }

        .est-nivel-minimo {
          font-size: 12px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .est-barra-bg {
          height: 8px;
          background: #F3EFE9;
          border-radius: 100px;
          overflow: hidden;
        }

        .est-barra-fill {
          height: 100%;
          border-radius: 100px;
          transition: width 0.5s ease;
        }

        .est-card-dados {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .est-dado {
          background: #FAF8F5;
          border-radius: 8px;
          padding: 10px 12px;
        }

        .est-dado-label {
          font-size: 11px;
          color: #78716C;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 3px;
        }

        .est-dado-valor {
          font-size: 14px;
          font-weight: 700;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
        }

        .est-dado-valor.terra { color: #C96A2B; }

        .est-btn-ajustar {
          width: 100%;
          padding: 10px;
          border: 1.5px solid #E5DDD4;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          color: #44403C;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 4px;
        }

        .est-btn-ajustar:hover { border-color: #C96A2B; color: #C96A2B; background: #FAF8F5; }
      `}</style>

      <div className="est-card">
        <div className="est-card-top">
          <div>
            <div className="est-card-nome">{item.nome}</div>
            <div className="est-card-categoria">{item.categoria}</div>
          </div>
          <div
            className="est-status-badge"
            style={{ color: config.cor, background: config.bg }}
          >
            {config.label}
          </div>
        </div>

        <div className="est-nivel">
          <div className="est-nivel-info">
            <span className="est-nivel-atual">
              {item.estoque_atual} {item.unidade_medida}
            </span>
            <span className="est-nivel-minimo">
              mín: {item.estoque_minimo} {item.unidade_medida}
            </span>
          </div>
          <div className="est-barra-bg">
            <div
              className="est-barra-fill"
              style={{
                width: `${percentual}%`,
                background: config.cor,
              }}
            />
          </div>
        </div>

        <div className="est-card-dados">
          <div className="est-dado">
            <div className="est-dado-label">
              Custo por {item.unidade_medida}
            </div>
            <div className="est-dado-valor terra">
              {item.custo_por_unidade.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
          <div className="est-dado">
            <div className="est-dado-label">Valor em estoque</div>
            <div className="est-dado-valor">
              {(item.custo_por_unidade * item.estoque_atual).toLocaleString(
                "pt-BR",
                { style: "currency", currency: "BRL" },
              )}
            </div>
          </div>
        </div>

        <button className="est-btn-ajustar" onClick={() => onAjustar(item)}>
          ⚖️ Ajustar Estoque
        </button>
      </div>
    </>
  );
}
