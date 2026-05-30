// Lista de pedidos recentes do dashboard — recebe dados via props da page

import type { PedidoRecente } from "@/lib/db/interfaces/IDashboardRepository";
import { formatarStatus } from "@/services/dashboardService";
import Link from "next/link";

interface Props {
  pedidos: PedidoRecente[];
}

export default function PedidosRecentes({ pedidos }: Props) {
  return (
    <>
      <style>{`
        .pedidos-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 24px;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .card-titulo {
          font-family: 'Inter', serif;
          font-size: 18px;
          font-weight: 700;
          color: #1C1917;
        }

        .card-link {
          font-size: 13px;
          color: #C96A2B;
          font-weight: 500;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
        }

        .card-link:hover { text-decoration: underline; }

        .pedidos-lista {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pedido-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #FAF8F5;
          border-radius: 10px;
          border: 1px solid #E5DDD4;
        }

        .pedido-info { flex: 1; min-width: 0; }

        .pedido-cliente {
          font-size: 14px;
          font-weight: 600;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pedido-data {
          font-size: 12px;
          color: #78716C;
          font-weight: 300;
          font-family: 'DM Sans', sans-serif;
          margin-top: 2px;
        }

        .pedido-direita {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          margin-left: 12px;
        }

        .pedido-valor {
          font-size: 14px;
          font-weight: 700;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
        }

        .pedido-status {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
        }

        .pedidos-vazio {
          text-align: center;
          padding: 32px;
          color: #78716C;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
        }
      `}</style>

      <div className="pedidos-card">
        <div className="card-header">
          <h3 className="card-titulo">Pedidos Recentes</h3>
          <Link href="/pedidos" className="card-link">
            Ver todos →
          </Link>
        </div>

        {pedidos.length === 0 ? (
          <div className="pedidos-vazio">
            Nenhum pedido ainda.{" "}
            <Link href="/pedidos" style={{ color: "#C96A2B" }}>
              Criar pedido
            </Link>
          </div>
        ) : (
          <div className="pedidos-lista">
            {pedidos.map((pedido) => {
              const status = formatarStatus(pedido.status);
              return (
                <div key={pedido.id} className="pedido-item">
                  <div className="pedido-info">
                    <div className="pedido-cliente">{pedido.cliente_nome}</div>
                    <div className="pedido-data">
                      Entrega:{" "}
                      {new Date(pedido.data_entrega).toLocaleDateString(
                        "pt-BR",
                      )}
                    </div>
                  </div>
                  <div className="pedido-direita">
                    <div className="pedido-valor">
                      {pedido.valor_total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                    <div
                      className="pedido-status"
                      style={{
                        color: status.cor,
                        background: `${status.cor}18`,
                      }}
                    >
                      {status.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
