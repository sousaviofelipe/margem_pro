// Página de produtos finais — conecta store e monta os componentes

"use client";

import { useEffect, useMemo } from "react";
import { useProdutosStore } from "@/store/produtosStore";
import { useReceitasStore } from "@/store/receitasStore";
import { getUser } from "@/lib/auth";
import ProdutosHeader from "./_components/ProdutosHeader";
import ProdutoCard from "./_components/ProdutoCard";
import ProdutoForm from "./_components/ProdutoForm";
import type { ProdutoInput } from "@/lib/db/interfaces/IProdutosRepository";

export default function ProdutosPage() {
  const {
    produtos,
    loading,
    erro,
    modalAberto,
    produtoEditando,
    busca,
    carregar,
    criar,
    atualizar,
    deletar,
    abrirModal,
    fecharModal,
    setBusca,
  } = useProdutosStore();

  const { receitas, carregar: carregarReceitas } = useReceitasStore();

  useEffect(() => {
    async function init() {
      const user = await getUser();
      if (user) {
        carregar(user.id);
        carregarReceitas(user.id);
      }
    }
    init();
  }, [carregar, carregarReceitas]);

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()),
    );
  }, [produtos, busca]);

  async function handleSalvar(dados: ProdutoInput) {
    const user = await getUser();
    if (!user) return;
    if (produtoEditando) {
      await atualizar(produtoEditando.id, user.id, dados);
    } else {
      await criar(user.id, dados);
    }
  }

  async function handleDeletar(id: string) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    const user = await getUser();
    if (user) deletar(id, user.id);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .prod-page { font-family: 'DM Sans', sans-serif; }

        .prod-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .prod-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          font-size: 14px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .prod-erro {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 16px 20px;
          font-size: 14px;
          color: #dc2626;
          margin-bottom: 20px;
        }

        .prod-vazio {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .prod-vazio p { font-size: 15px; font-weight: 300; margin-bottom: 16px; }

        .prod-vazio button {
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

        .prod-vazio button:hover { background: #A3511E; }

        @media (max-width: 1024px) { .prod-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .prod-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="prod-page">
        <ProdutosHeader
          busca={busca}
          total={produtos.length}
          onBusca={setBusca}
          onNovo={() => abrirModal()}
        />

        {erro && <div className="prod-erro">{erro}</div>}

        {loading ? (
          <div className="prod-loading">Carregando produtos...</div>
        ) : (
          <div className="prod-grid">
            {produtosFiltrados.length === 0 ? (
              <div className="prod-vazio">
                <p>
                  {busca
                    ? "Nenhum produto encontrado."
                    : "Você ainda não tem produtos cadastrados."}
                </p>
                {!busca && (
                  <button onClick={() => abrirModal()}>
                    + Criar primeiro produto
                  </button>
                )}
              </div>
            ) : (
              produtosFiltrados.map((produto) => (
                <ProdutoCard
                  key={produto.id}
                  produto={produto}
                  onEditar={abrirModal}
                  onDeletar={handleDeletar}
                />
              ))
            )}
          </div>
        )}

        {modalAberto && (
          <ProdutoForm
            produto={produtoEditando}
            receitasDisponiveis={receitas}
            onSalvar={handleSalvar}
            onFechar={fecharModal}
          />
        )}
      </div>
    </>
  );
}
