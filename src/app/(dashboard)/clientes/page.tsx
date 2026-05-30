// Página de clientes — conecta store e monta os componentes

"use client";

import { useEffect, useMemo } from "react";
import { useClientesStore } from "@/store/clientesStore";
import { getUser } from "@/lib/auth";
import ClientesHeader from "./_components/ClientesHeader";
import ClienteCard from "./_components/ClienteCard";
import ClienteForm from "./_components/ClienteForm";
import type { ClienteInput } from "@/lib/db/interfaces/IClientesRepository";

export default function ClientesPage() {
  const {
    clientes,
    loading,
    erro,
    modalAberto,
    clienteEditando,
    busca,
    carregar,
    criar,
    atualizar,
    deletar,
    abrirModal,
    fecharModal,
    setBusca,
  } = useClientesStore();

  useEffect(() => {
    async function init() {
      const user = await getUser();
      if (user) carregar(user.id);
    }
    init();
  }, [carregar]);

  const clientesFiltrados = useMemo(() => {
    return clientes.filter(
      (c) =>
        c.nome.toLowerCase().includes(busca.toLowerCase()) ||
        c.telefone?.includes(busca) ||
        c.email?.toLowerCase().includes(busca.toLowerCase()),
    );
  }, [clientes, busca]);

  async function handleSalvar(dados: ClienteInput) {
    const user = await getUser();
    if (!user) return;
    if (clienteEditando) {
      await atualizar(clienteEditando.id, user.id, dados);
    } else {
      await criar(user.id, dados);
    }
  }

  async function handleDeletar(id: string) {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return;
    const user = await getUser();
    if (user) deletar(id, user.id);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .cli-page { font-family: 'DM Sans', sans-serif; }

        .cli-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .cli-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          font-size: 14px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .cli-erro {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 16px 20px;
          font-size: 14px;
          color: #dc2626;
          margin-bottom: 20px;
        }

        .cli-vazio {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .cli-vazio p { font-size: 15px; font-weight: 300; margin-bottom: 16px; }

        .cli-vazio button {
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

        .cli-vazio button:hover { background: #A3511E; }

        @media (max-width: 1024px) { .cli-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .cli-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="cli-page">
        <ClientesHeader
          busca={busca}
          total={clientes.length}
          onBusca={setBusca}
          onNovo={() => abrirModal()}
        />

        {erro && <div className="cli-erro">{erro}</div>}

        {loading ? (
          <div className="cli-loading">Carregando clientes...</div>
        ) : (
          <div className="cli-grid">
            {clientesFiltrados.length === 0 ? (
              <div className="cli-vazio">
                <p>
                  {busca
                    ? "Nenhum cliente encontrado."
                    : "Você ainda não tem clientes cadastrados."}
                </p>
                {!busca && (
                  <button onClick={() => abrirModal()}>
                    + Cadastrar primeiro cliente
                  </button>
                )}
              </div>
            ) : (
              clientesFiltrados.map((cliente) => (
                <ClienteCard
                  key={cliente.id}
                  cliente={cliente}
                  onEditar={abrirModal}
                  onDeletar={handleDeletar}
                />
              ))
            )}
          </div>
        )}

        {modalAberto && (
          <ClienteForm
            cliente={clienteEditando}
            onSalvar={handleSalvar}
            onFechar={fecharModal}
          />
        )}
      </div>
    </>
  );
}
