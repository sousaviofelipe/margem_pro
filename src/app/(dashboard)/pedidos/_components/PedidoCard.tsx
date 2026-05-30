// Card individual de pedido — exibe dados, status e ações

import type {
  Pedido,
  PedidoStatus,
} from "@/lib/db/interfaces/IPedidosRepository";
import { statusConfig, formasPagamento } from "@/services/pedidosService";

interface Props {
  pedido: Pedido;
  onEditar: (pedido: Pedido) => void;
  onDeletar: (id: string) => void;
  onAtualizarStatus: (id: string, status: PedidoStatus) => void;
}

export default function PedidoCard({
  pedido,
  onEditar,
  onDeletar,
  onAtualizarStatus,
}: Props) {
  const config = statusConfig[pedido.status];

  const proximoStatus: Record<PedidoStatus, PedidoStatus | null> = {
    pendente: "em_producao",
    em_producao: "pronto",
    pronto: "entregue",
    entregue: null,
    cancelado: null,
  };

  const proximo = proximoStatus[pedido.status];

  function abrirWhatsApp(pedido: Pedido): void {
    const itens = (pedido.itens ?? [])
      .map(
        (i) =>
          `• ${i.quantidade}x ${i.produto_nome} — ${i.subtotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
      )
      .join("\n");

    const dataEntrega = pedido.data_entrega
      ? new Date(pedido.data_entrega).toLocaleDateString("pt-BR")
      : "—";

    const mensagem = [
      `Olá, ${pedido.cliente_nome}! 🎂`,
      "",
      "Segue o resumo do seu pedido:",
      "",
      itens,
      "",
      `💰 Total: ${pedido.valor_total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
      pedido.valor_sinal > 0
        ? `✅ Sinal pago: ${(pedido.valor_sinal ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
        : "",
      (pedido.valor_pendente ?? 0) > 0
        ? `⏳ Restante: ${(pedido.valor_pendente ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
        : "",
      "",
      `📅 Data de entrega: ${dataEntrega}`,
      "",
      "Qualquer dúvida é só falar! 😊",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/?text=${encodeURIComponent(mensagem)}`,
      "_blank",
    );
  }

  return (
    <>
      <style>{`


.ped-btn-wpp {
  padding: 8px 12px;
  border: 1.5px solid #E5DDD4;
  border-radius: 8px;
  font-size: 13px;
  color: #16a34a;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}

.ped-btn-wpp:hover {
  border-color: #16a34a;
  background: #f0fdf4;
}
        .ped-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 20px;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .ped-card:hover {
          box-shadow: 0 4px 20px rgba(28,25,23,0.07);
          border-color: #C96A2B30;
        }

        .ped-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }

        .ped-card-cliente {
          font-family: 'Inter', serif;
          font-size: 17px;
          font-weight: 700;
          color: #1C1917;
        }

        .ped-card-data {
          font-size: 12px;
          color: #78716C;
          font-weight: 400;
          font-family: 'DM Sans', sans-serif;
          margin-top: 3px;
        }

        .ped-status-badge {
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .ped-card-dados {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .ped-dado {
          background: #FAF8F5;
          border-radius: 8px;
          padding: 10px 12px;
        }

        .ped-dado-label {
          font-size: 11px;
          color: #78716C;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 3px;
        }

        .ped-dado-valor {
          font-size: 14px;
          font-weight: 700;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
        }

        .ped-dado-valor.terra { color: #C96A2B; }
        .ped-dado-valor.vermelho { color: #dc2626; }
        .ped-dado-valor.verde { color: #16a34a; }

        .ped-itens-lista {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ped-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          color: #44403C;
        }

        .ped-item-nome { font-weight: 500; }
        .ped-item-subtotal { font-weight: 700; color: #1C1917; }

        .ped-card-acoes {
          display: flex;
          gap: 8px;
          padding-top: 4px;
          border-top: 1px solid #F3EFE9;
          flex-wrap: wrap;
        }

        .ped-btn-avancar {
          flex: 2;
          padding: 8px;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          background: #C96A2B;
          color: #FFFFFF;
        }

        .ped-btn-avancar:hover { background: #A3511E; }

        .ped-btn-editar {
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

        .ped-btn-editar:hover { border-color: #C96A2B; color: #C96A2B; }

        .ped-btn-deletar {
          padding: 8px 12px;
          border: 1.5px solid #E5DDD4;
          border-radius: 8px;
          font-size: 13px;
          color: #78716C;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ped-btn-deletar:hover { border-color: #dc2626; color: #dc2626; background: #fef2f2; }
      `}</style>

      <div className="ped-card">
        <div className="ped-card-top">
          <div>
            <div className="ped-card-cliente">{pedido.cliente_nome}</div>
            <div className="ped-card-data">
              Entrega:{" "}
              {pedido.data_entrega
                ? new Date(pedido.data_entrega).toLocaleDateString("pt-BR")
                : "—"}
              {pedido.forma_pagamento &&
                ` · ${formasPagamento[pedido.forma_pagamento] ?? pedido.forma_pagamento}`}
            </div>
          </div>
          <div
            className="ped-status-badge"
            style={{ color: config.cor, background: config.bg }}
          >
            {config.label}
          </div>
        </div>

        <div className="ped-card-dados">
          <div className="ped-dado">
            <div className="ped-dado-label">Total do pedido</div>
            <div className="ped-dado-valor terra">
              {pedido.valor_total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
          <div className="ped-dado">
            <div className="ped-dado-label">Sinal pago</div>
            <div className="ped-dado-valor verde">
              {(pedido.valor_sinal ?? 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
          <div className="ped-dado">
            <div className="ped-dado-label">Valor pendente</div>
            <div
              className={`ped-dado-valor ${(pedido.valor_pendente ?? 0) > 0 ? "vermelho" : "verde"}`}
            >
              {(pedido.valor_pendente ?? 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
          <div className="ped-dado">
            <div className="ped-dado-label">Itens</div>
            <div className="ped-dado-valor">
              {(pedido.itens ?? []).length} produto
              {(pedido.itens ?? []).length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {(pedido.itens ?? []).length > 0 && (
          <div className="ped-itens-lista">
            {(pedido.itens ?? []).slice(0, 3).map((item, i) => (
              <div key={i} className="ped-item">
                <span className="ped-item-nome">
                  {item.quantidade}x {item.produto_nome}
                </span>
                <span className="ped-item-subtotal">
                  {item.subtotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            ))}
            {(pedido.itens ?? []).length > 3 && (
              <div
                style={{
                  fontSize: "12px",
                  color: "#78716C",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                +{(pedido.itens ?? []).length - 3} item(ns)...
              </div>
            )}
          </div>
        )}

        <div className="ped-card-acoes">
          {proximo && (
            <button
              className="ped-btn-avancar"
              onClick={() => onAtualizarStatus(pedido.id, proximo)}
            >
              → {statusConfig[proximo].label}
            </button>
          )}
          <button
            className="ped-btn-wpp"
            onClick={() => abrirWhatsApp(pedido)}
            title="Compartilhar pedido no WhatsApp"
          >
            ZAP
          </button>
          <button className="ped-btn-editar" onClick={() => onEditar(pedido)}>
            ✏️
          </button>
          <button
            className="ped-btn-deletar"
            onClick={() => onDeletar(pedido.id)}
          >
            🗑️
          </button>
        </div>
      </div>
    </>
  );
}
