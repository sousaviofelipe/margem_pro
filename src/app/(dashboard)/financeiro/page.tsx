// Página financeira — conecta store e monta os componentes

"use client";

import { useEffect } from "react";
import { useFinanceiroStore } from "@/store/financeiroStore";
import { getUser } from "@/lib/auth";
import FinanceiroHeader from "./_components/FinanceiroHeader";
import ResumoCards from "./_components/ResumoCards";
import FluxoMensal from "./_components/FluxoMensal";
import PedidosPendentes from "./_components/PedidosPendentes";

export default function FinanceiroPage() {
  const {
    resumo,
    fluxo,
    pedidosPendentes,
    loading,
    erro,
    mesSelecionado,
    anoSelecionado,
    carregar,
    setMes,
    setAno,
  } = useFinanceiroStore();

  useEffect(() => {
    async function init() {
      const user = await getUser();
      if (user) carregar(user.id);
    }
    init();
  }, [carregar]);

  async function handleAtualizar() {
    const user = await getUser();
    if (user) carregar(user.id);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .fin-page { font-family: 'DM Sans', sans-serif; }

        .fin-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          font-size: 14px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .fin-erro {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 16px 20px;
          font-size: 14px;
          color: #dc2626;
          margin-bottom: 20px;
        }

        .fin-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 900px) {
          .fin-bottom { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="fin-page">
        <FinanceiroHeader
          mes={mesSelecionado}
          ano={anoSelecionado}
          onMes={setMes}
          onAno={setAno}
          onAtualizar={handleAtualizar}
        />

        {erro && <div className="fin-erro">{erro}</div>}

        {loading ? (
          <div className="fin-loading">Carregando dados financeiros...</div>
        ) : (
          <>
            {resumo && <ResumoCards resumo={resumo} />}
            <div className="fin-bottom">
              <FluxoMensal fluxo={fluxo} />
              <PedidosPendentes pedidos={pedidosPendentes} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
