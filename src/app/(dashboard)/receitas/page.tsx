// Página de receitas — conecta store e monta os componentes

"use client";

import { useEffect, useMemo } from "react";
import { useReceitasStore } from "@/store/receitasStore";
import { useIngredientesStore } from "@/store/ingredientesStore";
import { getUser } from "@/lib/auth";
import ReceitasHeader from "./_components/ReceitasHeader";
import ReceitaCard from "./_components/ReceitaCard";
import ReceitaForm from "./_components/ReceitaForm";
import type { ReceitaInput } from "@/lib/db/interfaces/IReceitasRepository";

export default function ReceitasPage() {
  const {
    receitas,
    loading,
    erro,
    modalAberto,
    receitaEditando,
    busca,
    carregar,
    criar,
    atualizar,
    deletar,
    abrirModal,
    fecharModal,
    setBusca,
  } = useReceitasStore();

  const { ingredientes, carregar: carregarIngredientes } =
    useIngredientesStore();

  useEffect(() => {
    async function init() {
      const user = await getUser();
      if (user) {
        carregar(user.id);
        carregarIngredientes(user.id);
      }
    }
    init();
  }, [carregar, carregarIngredientes]);

  const receitasFiltradas = useMemo(() => {
    return receitas.filter((r) =>
      r.nome.toLowerCase().includes(busca.toLowerCase()),
    );
  }, [receitas, busca]);

  async function handleSalvar(dados: ReceitaInput) {
    const user = await getUser();
    if (!user) return;
    if (receitaEditando) {
      await atualizar(receitaEditando.id, user.id, dados);
    } else {
      await criar(user.id, dados);
    }
  }

  async function handleDeletar(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta receita?")) return;
    const user = await getUser();
    if (user) deletar(id, user.id);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .rec-page { font-family: 'DM Sans', sans-serif; }

        .rec-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .rec-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          font-size: 14px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .rec-erro {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 16px 20px;
          font-size: 14px;
          color: #dc2626;
          margin-bottom: 20px;
        }

        .rec-vazio {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .rec-vazio p { font-size: 15px; font-weight: 300; margin-bottom: 16px; }

        .rec-vazio button {
          padding: 10px 24px;
          background: #C96A2B;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .rec-vazio button:hover { background: #A3511E; }

        @media (max-width: 1024px) { .rec-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .rec-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="rec-page">
        <ReceitasHeader
          busca={busca}
          total={receitas.length}
          onBusca={setBusca}
          onNova={() => abrirModal()}
        />

        {erro && <div className="rec-erro">{erro}</div>}

        {loading ? (
          <div className="rec-loading">Carregando receitas...</div>
        ) : (
          <div className="rec-grid">
            {receitasFiltradas.length === 0 ? (
              <div className="rec-vazio">
                <p>
                  {busca
                    ? "Nenhuma receita encontrada."
                    : "Você ainda não tem receitas cadastradas."}
                </p>
                {!busca && (
                  <button onClick={() => abrirModal()}>
                    + Criar primeira receita
                  </button>
                )}
              </div>
            ) : (
              receitasFiltradas.map((receita) => (
                <ReceitaCard
                  key={receita.id}
                  receita={receita}
                  onEditar={abrirModal}
                  onDeletar={handleDeletar}
                />
              ))
            )}
          </div>
        )}

        {modalAberto && (
          <ReceitaForm
            receita={receitaEditando}
            ingredientesDisponiveis={ingredientes}
            onSalvar={handleSalvar}
            onFechar={fecharModal}
          />
        )}
      </div>
    </>
  );
}
