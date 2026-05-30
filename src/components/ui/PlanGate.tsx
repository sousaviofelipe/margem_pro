// Componente de bloqueio por plano — exibe conteúdo ou mensagem de upgrade

"use client";

import Link from "next/link";
import { usePlan } from "@/lib/plans/usePlan";
import { PLANO_INFO } from "@/lib/plans/limits";
import type { Plano } from "@/lib/plans/limits";

interface Props {
  modulo: "estoque" | "producao";
  children: React.ReactNode;
}

const moduloInfo: Record<
  string,
  { titulo: string; descricao: string; icone: string }
> = {
  estoque: {
    titulo: "Controle de Estoque",
    descricao:
      "Acompanhe o nível de cada ingrediente, receba alertas de reposição e gerencie entradas e saídas automaticamente.",
    icone: "📦",
  },
  producao: {
    titulo: "Planejamento de Produção",
    descricao:
      "Calcule ingredientes necessários, gere lista de compras e desconte o estoque automaticamente ao produzir.",
    icone: "⚙️",
  },
};

export function PlanGate({ modulo, children }: Props) {
  const { temAcesso: verificarAcesso, planoEfetivo } = usePlan();
  const acesso = verificarAcesso(modulo as any);

  if (acesso) return <>{children}</>;

  const info = moduloInfo[modulo];
  const proMaxInfo = PLANO_INFO.pro_max;

  return (
    <>
      <style>{`
        .plangate-overlay {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          padding: 32px 16px;
        }

        .plangate-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 20px;
          padding: 40px;
          max-width: 480px;
          width: 100%;
          text-align: center;
        }

        .plangate-icone {
          font-size: 48px;
          margin-bottom: 20px;
          display: block;
        }

        .plangate-badge {
          display: inline-block;
          padding: 4px 14px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .plangate-titulo {
          font-size: 20px;
          font-weight: 700;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 10px;
        }

        .plangate-descricao {
          font-size: 14px;
          color: #78716C;
          font-weight: 300;
          line-height: 1.7;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 28px;
        }

        .plangate-plano-atual {
          font-size: 12px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 20px;
        }

        .plangate-plano-atual strong { color: #1C1917; }

        .plangate-btn {
          display: inline-block;
          padding: 13px 32px;
          background: #C96A2B;
          color: #FFFFFF;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          transition: background 0.2s;
        }

        .plangate-btn:hover { background: #A3511E; }
      `}</style>

      <div className="plangate-overlay">
        <div className="plangate-card">
          <span className="plangate-icone">{info.icone}</span>
          <div
            className="plangate-badge"
            style={{
              background: proMaxInfo.bg,
              color: proMaxInfo.cor,
              border: `1px solid ${proMaxInfo.border}`,
            }}
          >
            Disponível no Pro Max
          </div>
          <div className="plangate-titulo">{info.titulo}</div>
          <div className="plangate-descricao">{info.descricao}</div>
          <div className="plangate-plano-atual">
            Seu plano atual:{" "}
            <strong>
              {PLANO_INFO[planoEfetivo as Plano]?.label ?? "Trial"}
            </strong>
          </div>
          <Link href="/precos" className="plangate-btn">
            ⚡ Ver planos e fazer upgrade
          </Link>
        </div>
      </div>
    </>
  );
}
