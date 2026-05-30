// Header da página de pedidos — título, filtros de status e botão de novo pedido

import { statusConfig, statusOrdem } from "@/services/pedidosService";

interface Props {
  busca: string;
  filtroStatus: string;
  total: number;
  onBusca: (v: string) => void;
  onFiltroStatus: (v: string) => void;
  onNovo: () => void;
}

export default function PedidosHeader({
  busca,
  filtroStatus,
  total,
  onBusca,
  onFiltroStatus,
  onNovo,
}: Props) {
  return (
    <>
      <style>{`
        .ped-header { margin-bottom: 28px; }

        .ped-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .ped-header-titulo h2 {
          font-family: 'Inter', serif;
          font-size: 26px;
          font-weight: 700;
          color: #1C1917;
          margin-bottom: 2px;
        }

        .ped-header-titulo p {
          font-size: 13px;
          color: #78716C;
          font-weight: 300;
          font-family: 'DM Sans', sans-serif;
        }

        .ped-btn-novo {
          padding: 10px 20px;
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

        .ped-btn-novo:hover { background: #A3511E; transform: translateY(-1px); }

        .ped-filtros {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .ped-busca {
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

        .ped-busca:focus { border-color: #C96A2B; }

        .ped-status-filtros {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .ped-status-btn {
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

        .ped-status-btn:hover { border-color: #C96A2B; color: #C96A2B; }
        .ped-status-btn.ativo { background: #C96A2B; color: #FFFFFF; border-color: #C96A2B; }
      `}</style>

      <div className="ped-header">
        <div className="ped-header-top">
          <div className="ped-header-titulo">
            <h2>Pedidos</h2>
            <p>
              {total} pedido{total !== 1 ? "s" : ""} no total
            </p>
          </div>
          <button className="ped-btn-novo" onClick={onNovo}>
            + Novo Pedido
          </button>
        </div>
        <div className="ped-filtros">
          <input
            className="ped-busca"
            type="text"
            placeholder="Buscar por cliente..."
            value={busca}
            onChange={(e) => onBusca(e.target.value)}
          />
        </div>
        <div className="ped-status-filtros" style={{ marginTop: "10px" }}>
          <button
            className={`ped-status-btn ${filtroStatus === "" ? "ativo" : ""}`}
            onClick={() => onFiltroStatus("")}
          >
            Todos
          </button>
          {statusOrdem.map((s) => (
            <button
              key={s}
              className={`ped-status-btn ${filtroStatus === s ? "ativo" : ""}`}
              onClick={() => onFiltroStatus(s)}
              style={
                filtroStatus === s
                  ? {}
                  : {
                      color: statusConfig[s].cor,
                      borderColor: statusConfig[s].cor + "40",
                    }
              }
            >
              {statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
