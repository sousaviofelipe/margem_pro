// Cards de estatísticas do dashboard — recebe dados via props da page

import type { DashboardStats } from "@/lib/db/interfaces/IDashboardRepository";

interface Props {
  stats: DashboardStats;
}

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const cards = (stats: DashboardStats) => [
  {
    label: "Faturamento do mês",
    valor: formatarMoeda(stats.faturamentoMes),
    icon: "💰",
    cor: "#C96A2B",
  },
  {
    label: "Lucro estimado",
    valor: formatarMoeda(stats.lucroEstimado),
    icon: "📈",
    cor: "#16a34a",
  },
  {
    label: "Pedidos em aberto",
    valor: String(stats.pedidosAbertos),
    icon: "🛍️",
    cor: "#2563eb",
  },
  {
    label: "Clientes ativos",
    valor: String(stats.clientesAtivos),
    icon: "👥",
    cor: "#7c3aed",
  },
  {
    label: "Margem média",
    valor: `${stats.margemMedia}%`,
    icon: "📊",
    cor: "#C96A2B",
  },
  {
    label: "Produtos cadastrados",
    valor: String(stats.totalProdutos),
    icon: "🎂",
    cor: "#d97706",
  },
];

export default function StatsCards({ stats }: Props) {
  return (
    <>
      <style>{`
        .stats-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: box-shadow 0.2s;
        }

        .stat-card:hover { box-shadow: 0 4px 20px rgba(28,25,23,0.06); }

        .stat-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: #FAF8F5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .stat-info { flex: 1; min-width: 0; }

        .stat-label {
          font-size: 12px;
          color: #78716C;
          font-weight: 500;
          margin-bottom: 4px;
          font-family: 'DM Sans', sans-serif;
        }

        .stat-valor {
          font-family: 'Inter', serif;
          font-size: 22px;
          font-weight: 700;
          color: #1C1917;
          line-height: 1;
        }

        @media (max-width: 1024px) { .stats-cards { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .stats-cards { grid-template-columns: 1fr; } }
      `}</style>

      <div className="stats-cards">
        {cards(stats).map((card) => (
          <div key={card.label} className="stat-card">
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-info">
              <div className="stat-label">{card.label}</div>
              <div className="stat-valor" style={{ color: card.cor }}>
                {card.valor}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
