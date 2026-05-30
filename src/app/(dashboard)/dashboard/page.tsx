// Página do dashboard — conecta store e monta os componentes de visualização

"use client";

import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { getUser } from "@/lib/auth";
import StatsCards from "./_components/StatsCards";
import PedidosRecentes from "./_components/PedidosRecentes";
import ProdutosMaisVendidos from "./_components/ProdutosMaisVendidos";

export default function DashboardPage() {
  const {
    stats,
    pedidosRecentes,
    produtosMaisVendidos,
    loading,
    erro,
    carregar,
  } = useDashboardStore();

  useEffect(() => {
    async function init() {
      const user = await getUser();
      if (user) carregar(user.id);
    }
    init();
  }, [carregar]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .dashboard-page {
          font-family: 'DM Sans', sans-serif;
          color: #1C1917;
        }

        .dashboard-boas-vindas {
          margin-bottom: 28px;
        }

        .dashboard-boas-vindas h2 {
          font-family: 'Inter', serif;
          font-size: 28px;
          font-weight: 700;
          color: #1C1917;
          margin-bottom: 4px;
        }

        .dashboard-boas-vindas p {
          font-size: 14px;
          color: #78716C;
          font-weight: 300;
        }

        .dashboard-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 8px;
        }

        .dashboard-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          font-size: 14px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .dashboard-erro {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 16px 20px;
          font-size: 14px;
          color: #dc2626;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .dashboard-bottom { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dashboard-page">
        <div className="dashboard-boas-vindas">
          <h2>Bem-vinda de volta 👋</h2>
          <p>Aqui está um resumo do seu negócio hoje.</p>
        </div>

        {erro && <div className="dashboard-erro">{erro}</div>}

        {loading ? (
          <div className="dashboard-loading">Carregando dados...</div>
        ) : (
          <>
            {stats && <StatsCards stats={stats} />}
            <div className="dashboard-bottom">
              <PedidosRecentes pedidos={pedidosRecentes} />
              <ProdutosMaisVendidos produtos={produtosMaisVendidos} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
