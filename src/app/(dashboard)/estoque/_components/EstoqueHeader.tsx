// Header da página de estoque — título, alertas, busca e filtro de status

import { getEstatisticasEstoque } from "@/services/estoqueService";
import type { ItemEstoque } from "@/lib/db/interfaces/IEstoqueRepository";

interface Props {
  itens: ItemEstoque[];
  busca: string;
  filtroStatus: string;
  onBusca: (v: string) => void;
  onFiltroStatus: (v: string) => void;
}

export default function EstoqueHeader({
  itens,
  busca,
  filtroStatus,
  onBusca,
  onFiltroStatus,
}: Props) {
  const stats = getEstatisticasEstoque(itens);

  return (
    <>
      <style>{`
        .est-header { margin-bottom: 28px; }

        .est-header-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .est-header-titulo h2 {
          font-family: 'Inter', serif;
          font-size: 26px;
          font-weight: 700;
          color: #1C1917;
          margin-bottom: 8px;
        }

        .est-stats {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .est-stat-badge {
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
        }

        .est-filtros { display: flex; gap: 10px; flex-wrap: wrap; }

        .est-busca {
          flex: 1;
          min-width: 200px;
          padding: 10px 14px;
          border: 1.5px solid #E5DDD4;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1C1917;
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.2s;
        }

        .est-busca:focus { border-color: #C96A2B; }

        .est-status-filtros { display: flex; gap: 6px; flex-wrap: wrap; }

        .est-status-btn {
          padding: 8px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          border: 1.5px solid #E5DDD4;
          background: #FFFFFF;
          color: #78716C;
        }

        .est-status-btn:hover { border-color: #C96A2B; color: #C96A2B; }
        .est-status-btn.ativo { background: #C96A2B; color: #FFFFFF; border-color: #C96A2B; }
      `}</style>

      <div className="est-header">
        <div className="est-header-top">
          <div className="est-header-titulo">
            <h2>Controle de Estoque</h2>
            <div className="est-stats">
              <div
                className="est-stat-badge"
                style={{ background: "#f0fdf4", color: "#16a34a" }}
              >
                {stats.ok} OK
              </div>
              {stats.baixo > 0 && (
                <div
                  className="est-stat-badge"
                  style={{ background: "#fffbeb", color: "#d97706" }}
                >
                  ⚠️ {stats.baixo} baixo{stats.baixo !== 1 ? "s" : ""}
                </div>
              )}
              {stats.zerado > 0 && (
                <div
                  className="est-stat-badge"
                  style={{ background: "#fef2f2", color: "#dc2626" }}
                >
                  🚨 {stats.zerado} zerado{stats.zerado !== 1 ? "s" : ""}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="est-filtros">
          <input
            className="est-busca"
            type="text"
            placeholder="Buscar ingrediente..."
            value={busca}
            onChange={(e) => onBusca(e.target.value)}
          />
        </div>

        <div className="est-status-filtros" style={{ marginTop: "10px" }}>
          {[
            { value: "", label: "Todos" },
            { value: "ok", label: "OK" },
            { value: "baixo", label: "Baixo" },
            { value: "zerado", label: "Zerado" },
          ].map((f) => (
            <button
              key={f.value}
              className={`est-status-btn ${filtroStatus === f.value ? "ativo" : ""}`}
              onClick={() => onFiltroStatus(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
