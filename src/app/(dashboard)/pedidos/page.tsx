// Página de pedidos — conecta store e monta os componentes

"use client";

import { useEffect, useMemo } from "react";
import { usePedidosStore } from "@/store/pedidosStore";
import { useClientesStore } from "@/store/clientesStore";
import { useProdutosStore } from "@/store/produtosStore";
import { getUser } from "@/lib/auth";
import PedidosHeader from "./_components/PedidosHeader";
import PedidoCard from "./_components/PedidoCard";
import PedidoForm from "./_components/PedidoForm";
import type {
  PedidoInput,
  PedidoStatus,
} from "@/lib/db/interfaces/IPedidosRepository";

export default function PedidosPage() {
  const {
    pedidos,
    loading,
    erro,
    modalAberto,
    pedidoEditando,
    filtroStatus,
    busca,
    carregar,
    criar,
    atualizar,
    atualizarStatus,
    deletar,
    abrirModal,
    fecharModal,
    setFiltroStatus,
    setBusca,
  } = usePedidosStore();

  const { clientes, carregar: carregarClientes } = useClientesStore();
  const { produtos, carregar: carregarProdutos } = useProdutosStore();

  useEffect(() => {
    async function init() {
      const user = await getUser();
      if (user) {
        carregar(user.id);
        carregarClientes(user.id);
        carregarProdutos(user.id);
      }
    }
    init();
  }, [carregar, carregarClientes, carregarProdutos]);

  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter((p) => {
      const matchBusca = p.cliente_nome
        .toLowerCase()
        .includes(busca.toLowerCase());
      const matchStatus = !filtroStatus || p.status === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [pedidos, busca, filtroStatus]);

  async function handleSalvar(dados: PedidoInput) {
    const user = await getUser();
    if (!user) return;
    if (pedidoEditando) {
      await atualizar(pedidoEditando.id, user.id, dados);
    } else {
      await criar(user.id, dados);
    }
  }

  async function handleAtualizarStatus(id: string, status: PedidoStatus) {
    const user = await getUser();
    if (user) atualizarStatus(id, user.id, status);
  }

  async function handleDeletar(id: string) {
    if (!confirm("Tem certeza que deseja excluir este pedido?")) return;
    const user = await getUser();
    if (user) deletar(id, user.id);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ped-page { font-family: 'DM Sans', sans-serif; }

        .ped-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .ped-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          font-size: 14px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .ped-erro {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 16px 20px;
          font-size: 14px;
          color: #dc2626;
          margin-bottom: 20px;
        }

        .ped-vazio {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .ped-vazio p { font-size: 15px; font-weight: 300; margin-bottom: 16px; }

        .ped-vazio button {
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

        .ped-vazio button:hover { background: #A3511E; }

        @media (max-width: 1024px) { .ped-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .ped-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="ped-page">
        <PedidosHeader
          busca={busca}
          filtroStatus={filtroStatus}
          total={pedidos.length}
          onBusca={setBusca}
          onFiltroStatus={setFiltroStatus}
          onNovo={() => abrirModal()}
        />

        {erro && <div className="ped-erro">{erro}</div>}

        {loading ? (
          <div className="ped-loading">Carregando pedidos...</div>
        ) : (
          <div className="ped-grid">
            {pedidosFiltrados.length === 0 ? (
              <div className="ped-vazio">
                <p>
                  {busca || filtroStatus
                    ? "Nenhum pedido encontrado."
                    : "Você ainda não tem pedidos cadastrados."}
                </p>
                {!busca && !filtroStatus && (
                  <button onClick={() => abrirModal()}>
                    + Criar primeiro pedido
                  </button>
                )}
              </div>
            ) : (
              pedidosFiltrados.map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  pedido={pedido}
                  onEditar={abrirModal}
                  onDeletar={handleDeletar}
                  onAtualizarStatus={handleAtualizarStatus}
                />
              ))
            )}
          </div>
        )}

        {modalAberto && (
          <PedidoForm
            pedido={pedidoEditando}
            clientes={clientes}
            produtos={produtos}
            onSalvar={handleSalvar}
            onFechar={fecharModal}
          />
        )}
      </div>
    </>
  );
}
