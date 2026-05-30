// Página de planejamento de produção — conecta store e monta os componentes

"use client";

import { useEffect } from "react";
import { useProducaoStore } from "@/store/producaoStore";
import { useReceitasStore } from "@/store/receitasStore";
import { getUser } from "@/lib/auth";
import ProducaoHeader from "./_components/ProducaoHeader";
import ProducaoForm from "./_components/ProducaoForm";
import ListaCompras from "./_components/ListaCompras";
import { PlanGate } from "@/components/ui/PlanGate";
import type { ItemProducao } from "@/lib/db/interfaces/IProducaoRepository";

export default function ProducaoPage() {
  const {
    itens,
    plano,
    loading,
    executando,
    erro,
    sucesso,
    adicionarItem,
    removerItem,
    calcular,
    executar,
    limpar,
  } = useProducaoStore();

  const { receitas, carregar: carregarReceitas } = useReceitasStore();

  useEffect(() => {
    async function init() {
      const user = await getUser();
      if (user) carregarReceitas(user.id);
    }
    init();
  }, [carregarReceitas]);

  async function handleCalcular() {
    const user = await getUser();
    if (user) calcular(user.id);
  }

  async function handleExecutar() {
    if (
      !confirm(
        "Confirma a execução da produção? O estoque será descontado automaticamente.",
      )
    )
      return;
    const user = await getUser();
    if (user) executar(user.id);
  }

  return (
    <PlanGate modulo="producao">
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

          .prc-page { font-family: 'DM Sans', sans-serif; max-width: 800px; }

          .prc-erro {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 12px;
            padding: 16px 20px;
            font-size: 14px;
            color: #dc2626;
            margin-bottom: 20px;
            font-family: 'DM Sans', sans-serif;
          }

          .prc-sucesso {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 12px;
            padding: 20px 24px;
            margin-bottom: 20px;
            text-align: center;
          }

          .prc-sucesso-titulo {
            font-size: 20px;
            font-weight: 700;
            color: #16a34a;
            font-family: 'DM Sans', sans-serif;
            margin-bottom: 6px;
          }

          .prc-sucesso-texto {
            font-size: 14px;
            color: #15803d;
            font-family: 'DM Sans', sans-serif;
            margin-bottom: 16px;
          }

          .prc-btn-nova {
            padding: 10px 24px;
            background: #16a34a;
            color: #FFFFFF;
            border: none;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 600;
            font-family: 'DM Sans', sans-serif;
            cursor: pointer;
            transition: background 0.2s;
          }

          .prc-btn-nova:hover { background: #15803d; }
        `}</style>

        <div className="prc-page">
          <ProducaoHeader />

          {erro && <div className="prc-erro">{erro}</div>}

          {sucesso ? (
            <div className="prc-sucesso">
              <div className="prc-sucesso-titulo">
                🎉 Produção executada com sucesso!
              </div>
              <div className="prc-sucesso-texto">
                O estoque foi descontado automaticamente.
              </div>
              <button className="prc-btn-nova" onClick={limpar}>
                + Planejar nova produção
              </button>
            </div>
          ) : (
            <>
              <ProducaoForm
                receitas={receitas}
                itens={itens}
                loading={loading}
                onAdicionar={(item: ItemProducao) => adicionarItem(item)}
                onRemover={removerItem}
                onCalcular={handleCalcular}
              />

              {plano && (
                <ListaCompras
                  plano={plano}
                  executando={executando}
                  onExecutar={handleExecutar}
                />
              )}
            </>
          )}
        </div>
      </>
    </PlanGate>
  );
}
