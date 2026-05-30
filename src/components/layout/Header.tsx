// Header do dashboard — título da página, badge do plano e nome do usuário

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import type { Plano } from "@/lib/plans/limits";
import NotificacoesSino from "@/components/layout/NotificacoesSino";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/ingredientes": "Ingredientes",
  "/receitas": "Receitas Base",
  "/produtos": "Produtos Finais",
  "/estoque": "Controle de Estoque",
  "/producao": "Planejamento de Produção",
  "/pedidos": "Pedidos",
  "/clientes": "Clientes",
  "/financeiro": "Financeiro",
  "/perfil": "Perfil",
  "/guia": "Guia de Uso",
};

interface Props {
  plano: Plano;
  planoInfo: { label: string; cor: string; bg: string; border: string };
}

export default function Header({ plano, planoInfo }: Props) {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Margem Pro";
  const [nome, setNome] = useState("");
  const [inicial, setInicial] = useState("U");

  useEffect(() => {
    async function carregarUsuario() {
      const user = await getUser();
      if (user) {
        const nomeCompleto = user.user_metadata?.name ?? user.email ?? "";
        setNome(nomeCompleto);
        setInicial(nomeCompleto.charAt(0).toUpperCase());
      }
    }
    carregarUsuario();
  }, []);

  return (
    <>
      <style>{`
        .dash-header {
          height: 60px;
          background: #FFFFFF;
          border-bottom: 1px solid #E5DDD4;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .dash-header-titulo {
          font-size: 15px;
          font-weight: 700;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
        }

        .dash-header-direita {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dash-plano-badge {
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          transition: opacity 0.2s;
          border: 1px solid transparent;
        }

        .dash-plano-badge:hover { opacity: 0.8; }

        .dash-header-nome {
          font-size: 13px;
          font-weight: 500;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          max-width: 160px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dash-header-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #F0DDD0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: #C96A2B;
          font-family: 'DM Sans', sans-serif;
          flex-shrink: 0;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .dash-header { display: none; }
        }
      `}</style>

      <header className="dash-header">
        <span className="dash-header-titulo">{title}</span>
        <div className="dash-header-direita">
          <NotificacoesSino />
          <Link
            href="/precos"
            className="dash-plano-badge"
            style={{
              background: planoInfo.bg,
              color: planoInfo.cor,
              borderColor: planoInfo.border,
            }}
          >
            ⚡ {planoInfo.label}
          </Link>
          {nome && <span className="dash-header-nome">{nome}</span>}
          <Link href="/perfil" className="dash-header-avatar">
            {inicial}
          </Link>
        </div>
      </header>
    </>
  );
}
