// Lista de pedidos com valores pendentes — mostra o que ainda está a receber

import type { PedidoPendente } from "@/lib/db/interfaces/IFinanceiroRepository";
import { statusConfig } from "@/services/pedidosService";
import type { PedidoStatus } from "@/lib/db/interfaces/IPedidosRepository";

interface Props {
  pedidos: PedidoPendente[];
}

export default function PedidosPendentes({ pedidos }: Props) {
  const totalPendente = pedidos.reduce(
    (acc, p) => acc + (p.valor_pendente ?? 0),
    0,
  );

  return (
    <>
      <style>{`
        .pend-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 24px;
        }

        .pend-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .pend-titulo {
          font-family: 'Inter', serif;
          font-size: 18px;
          font-weight: 700;
          color: #1C1917;
        }

        .pend-total-badge {
          font-size: 13px;
          font-weight: 700;
          color: #dc2626;
          background: #fef2f2;
          padding: 4px 12px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
        }

        .pend-lista { display: flex; flex-direction: column; gap: 10px; }

        .pend-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #FAF8F5;
          border-radius: 10px;
          border: 1px solid #E5DDD4;
          gap: 12px;
        }

        .pend-item-info { flex: 1; min-width: 0; }

        .pend-item-cliente {
          font-size: 14px;
          font-weight: 600;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pend-item-data {
          font-size: 11px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          margin-top: 2px;
        }

        .pend-item-valores {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 3px;
        }

        .pend-item-pendente {
          font-size: 14px;
          font-weight: 700;
          color: #dc2626;
          font-family: 'DM Sans', sans-serif;
        }

        .pend-item-total {
          font-size: 11px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .pend-status {
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .pend-vazio {
          text-align: center;
          padding: 32px;
          color: #78716C;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
        }
      `}</style>

      <div className="pend-card">
        <div className="pend-card-header">
          <h3 className="pend-titulo">A Receber</h3>
          {totalPendente > 0 && (
            <div className="pend-total-badge">
              {totalPendente.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          )}
        </div>

        {pedidos.length === 0 ? (
          <div className="pend-vazio">
            🎉 Nenhum valor pendente. Tudo em dia!
          </div>
        ) : (
          <div className="pend-lista">
            {pedidos.map((pedido) => {
              const config = statusConfig[pedido.status as PedidoStatus];
              return (
                <div key={pedido.id} className="pend-item">
                  <div className="pend-item-info">
                    <div className="pend-item-cliente">
                      {pedido.cliente_nome}
                    </div>
                    <div className="pend-item-data">
                      Entrega:{" "}
                      {pedido.data_entrega
                        ? new Date(pedido.data_entrega).toLocaleDateString(
                            "pt-BR",
                          )
                        : "—"}
                    </div>
                  </div>
                  <div className="pend-item-valores">
                    <div className="pend-item-pendente">
                      {(pedido.valor_pendente ?? 0).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                    <div className="pend-item-total">
                      Total:{" "}
                      {pedido.valor_total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                  </div>
                  <div
                    className="pend-status"
                    style={{ color: config.cor, background: config.bg }}
                  >
                    {config.label}
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
