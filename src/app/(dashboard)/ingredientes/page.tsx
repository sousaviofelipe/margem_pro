// Página de ingredientes — conecta store e monta os componentes

"use client";

import { useEffect, useMemo } from "react";
import { useIngredientesStore } from "@/store/ingredientesStore";
import { getUser } from "@/lib/auth";
import IngredientesHeader from "./_components/IngredientesHeader";
import IngredienteCard from "./_components/IngredienteCard";
import IngredienteForm from "./_components/IngredienteForm";
import type { IngredienteInput } from "@/lib/db/interfaces/IIngredientesRepository";

export default function IngredientesPage() {
  const {
    ingredientes,
    loading,
    erro,
    modalAberto,
    ingredienteEditando,
    busca,
    categoriaSelecionada,
    carregar,
    criar,
    atualizar,
    deletar,
    abrirModal,
    fecharModal,
    setBusca,
    setCategoria,
  } = useIngredientesStore();

  useEffect(() => {
    async function init() {
      const user = await getUser();
      if (user) carregar(user.id);
    }
    init();
  }, [carregar]);

  const ingredientesFiltrados = useMemo(() => {
    return ingredientes.filter((i) => {
      const matchBusca = i.nome.toLowerCase().includes(busca.toLowerCase());
      const matchCategoria =
        !categoriaSelecionada || i.categoria === categoriaSelecionada;
      return matchBusca && matchCategoria;
    });
  }, [ingredientes, busca, categoriaSelecionada]);

  async function handleSalvar(dados: IngredienteInput) {
    const user = await getUser();
    if (!user) return;
    if (ingredienteEditando) {
      await atualizar(ingredienteEditando.id, user.id, dados);
    } else {
      await criar(user.id, dados);
    }
  }

  async function handleDeletar(id: string) {
    if (!confirm("Tem certeza que deseja excluir este ingrediente?")) return;
    const user = await getUser();
    if (user) deletar(id, user.id);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ing-page { font-family: 'DM Sans', sans-serif; }

        .ing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .ing-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          font-size: 14px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .ing-erro {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 16px 20px;
          font-size: 14px;
          color: #dc2626;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 20px;
        }

        .ing-vazio {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .ing-vazio p { font-size: 15px; font-weight: 300; margin-bottom: 16px; }

        .ing-vazio button {
          padding: 10px 24px;
          background: #C96A2B;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
        }

        .ing-vazio button:hover { background: #A3511E; }

        @media (max-width: 1024px) { .ing-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .ing-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="ing-page">
        <IngredientesHeader
          busca={busca}
          categoria={categoriaSelecionada}
          total={ingredientes.length}
          onBusca={setBusca}
          onCategoria={setCategoria}
          onNovo={() => abrirModal()}
        />

        {erro && <div className="ing-erro">{erro}</div>}

        {loading ? (
          <div className="ing-loading">Carregando ingredientes...</div>
        ) : (
          <div className="ing-grid">
            {ingredientesFiltrados.length === 0 ? (
              <div className="ing-vazio">
                <p>
                  {busca || categoriaSelecionada
                    ? "Nenhum ingrediente encontrado com esses filtros."
                    : "Você ainda não tem ingredientes cadastrados."}
                </p>
                {!busca && !categoriaSelecionada && (
                  <button onClick={() => abrirModal()}>
                    + Cadastrar primeiro ingrediente
                  </button>
                )}
              </div>
            ) : (
              ingredientesFiltrados.map((ingrediente) => (
                <IngredienteCard
                  key={ingrediente.id}
                  ingrediente={ingrediente}
                  onEditar={abrirModal}
                  onDeletar={handleDeletar}
                />
              ))
            )}
          </div>
        )}

        {modalAberto && (
          <IngredienteForm
            ingrediente={ingredienteEditando}
            onSalvar={handleSalvar}
            onFechar={fecharModal}
          />
        )}
      </div>
    </>
  );
}
