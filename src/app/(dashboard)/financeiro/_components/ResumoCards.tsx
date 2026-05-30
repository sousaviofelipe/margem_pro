// Cards de resumo financeiro — faturamento, recebido, pendente e métricas

import type { ResumoFinanceiro } from "@/lib/db/interfaces/IFinanceiroRepository";

interface Props {
  resumo: ResumoFinanceiro;
}

export default function ResumoCards({ resumo }: Props) {
  const cards = [
    {
      label: "Faturamento do mês",
      valor: resumo.totalFaturado,
      tipo: "moeda",
      icon: "💰",
      cor: "#C96A2B",
    },
    {
      label: "Total recebido",
      valor: resumo.totalRecebido,
      tipo: "moeda",
      icon: "✅",
      cor: "#16a34a",
    },
    {
      label: "A receber",
      valor: resumo.totalPendente,
      tipo: "moeda",
      icon: "⏳",
      cor: "#d97706",
    },
    {
      label: "Ticket médio",
      valor: resumo.ticketMedio,
      tipo: "moeda",
      icon: "🎯",
      cor: "#2563eb",
    },
    {
      label: "Total de pedidos",
      valor: resumo.totalPedidos,
      tipo: "numero",
      icon: "🛍️",
      cor: "#7c3aed",
    },
    {
      label: "Pedidos em aberto",
      valor: resumo.pedidosAbertos,
      tipo: "numero",
      icon: "📋",
      cor: "#d97706",
    },
    {
      label: "Pedidos entregues",
      valor: resumo.pedidosConcluidos,
      tipo: "numero",
      icon: "🎉",
      cor: "#16a34a",
    },
    {
      label: "Margem média",
      valor: resumo.margemMedia,
      tipo: "percentual",
      icon: "📊",
      cor: "#C96A2B",
    },
  ];

  function formatar(valor: number, tipo: string) {
    if (tipo === "moeda")
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    if (tipo === "percentual") return `${valor}%`;
    return String(valor);
  }

  return (
    <>
      <style>{`
        .fin-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        .fin-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: box-shadow 0.2s;
        }

        .fin-card:hover { box-shadow: 0 4px 20px rgba(28,25,23,0.06); }

        .fin-card-icon {
          width: 42px; height: 42px;
          border-radius: 12px;
          background: #FAF8F5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .fin-card-label {
          font-size: 11px;
          color: #78716C;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 4px;
        }

        .fin-card-valor {
          font-family: 'Inter', serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
        }

        @media (max-width: 1200px) { .fin-cards { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 900px) { .fin-cards { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .fin-cards { grid-template-columns: 1fr; } }
      `}</style>

      <div className="fin-cards">
        {cards.map((card) => (
          <div key={card.label} className="fin-card">
            <div className="fin-card-icon">{card.icon}</div>
            <div>
              <div className="fin-card-label">{card.label}</div>
              <div className="fin-card-valor" style={{ color: card.cor }}>
                {formatar(card.valor, card.tipo)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
