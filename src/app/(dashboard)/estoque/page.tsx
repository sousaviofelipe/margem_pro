// Página de estoque — conecta store e monta os componentes

"use client";

import { useEffect, useMemo } from "react";
import { useEstoqueStore } from "@/store/estoqueStore";
import { getUser } from "@/lib/auth";
import EstoqueHeader from "./_components/EstoqueHeader";
import EstoqueCard from "./_components/EstoqueCard";
import EstoqueAjusteForm from "./_components/EstoqueAjusteForm";
import { PlanGate } from "@/components/ui/PlanGate";
import type { MovimentacaoEstoque } from "@/lib/db/interfaces/IEstoqueRepository";

export default function EstoquePage() {
  const {
    itens,
    loading,
    erro,
    modalAberto,
    itemSelecionado,
    busca,
    filtroStatus,
    carregar,
    ajustar,
    abrirModal,
    fecharModal,
    setBusca,
    setFiltroStatus,
  } = useEstoqueStore();

  useEffect(() => {
    async function init() {
      const user = await getUser();
      if (user) carregar(user.id);
    }
    init();
  }, [carregar]);

  const itensFiltrados = useMemo(() => {
    return itens.filter((i) => {
      const matchBusca = i.nome.toLowerCase().includes(busca.toLowerCase());
      const matchStatus = !filtroStatus || i.status === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [itens, busca, filtroStatus]);

  async function handleAjustar(dados: MovimentacaoEstoque) {
    const user = await getUser();
    if (user) await ajustar(user.id, dados);
  }

  return (
    <PlanGate modulo="estoque">
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

          .est-page { font-family: 'DM Sans', sans-serif; }

          .est-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }

          .est-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            font-size: 14px;
            color: #78716C;
            font-family: 'DM Sans', sans-serif;
          }

          .est-erro {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 12px;
            padding: 16px 20px;
            font-size: 14px;
            color: #dc2626;
            margin-bottom: 20px;
          }

          .est-vazio {
            grid-column: 1 / -1;
            text-align: center;
            padding: 60px 20px;
            color: #78716C;
            font-family: 'DM Sans', sans-serif;
          }

          .est-vazio p { font-size: 15px; font-weight: 300; }

          @media (max-width: 1024px) { .est-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 640px) { .est-grid { grid-template-columns: 1fr; } }
        `}</style>

        <div className="est-page">
          <EstoqueHeader
            itens={itens}
            busca={busca}
            filtroStatus={filtroStatus}
            onBusca={setBusca}
            onFiltroStatus={setFiltroStatus}
          />

          {erro && <div className="est-erro">{erro}</div>}

          {loading ? (
            <div className="est-loading">Carregando estoque...</div>
          ) : (
            <div className="est-grid">
              {itensFiltrados.length === 0 ? (
                <div className="est-vazio">
                  <p>
                    {busca || filtroStatus
                      ? "Nenhum item encontrado com esses filtros."
                      : "Cadastre ingredientes para controlar o estoque."}
                  </p>
                </div>
              ) : (
                itensFiltrados.map((item) => (
                  <EstoqueCard
                    key={item.id}
                    item={item}
                    onAjustar={abrirModal}
                  />
                ))
              )}
            </div>
          )}

          {modalAberto && itemSelecionado && (
            <EstoqueAjusteForm
              item={itemSelecionado}
              onSalvar={handleAjustar}
              onFechar={fecharModal}
            />
          )}
        </div>
      </>
    </PlanGate>
  );
}
