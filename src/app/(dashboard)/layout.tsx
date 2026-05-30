// Layout autenticado do dashboard — controle de plano, banner de trial e redirecionamento

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUser } from "@/lib/auth";
import { createClient } from "@/lib/db/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import type { Plano } from "@/lib/plans/limits";
import { PLANO_INFO } from "@/lib/plans/limits";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [plano, setPlano] = useState<Plano>("trial");
  const [expiraEm, setExpiraEm] = useState<string | null>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    async function verificar() {
      const user = await getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const supabase = createClient();
      const { data: profile } = await supabase
        .from("profiles")
        .select("plano, plano_expira_em")
        .eq("id", user.id)
        .single();

      const planoAtual = (profile?.plano as Plano) ?? "trial";
      const expira = profile?.plano_expira_em ?? null;

      setPlano(planoAtual);
      setExpiraEm(expira);

      // Redireciona para /upgrade se trial expirado
      if (pathname !== "/upgrade") {
        const expirado = expira ? new Date(expira) < new Date() : false;
        if (planoAtual === "trial" && expirado) {
          router.push("/upgrade");
          return;
        }
      }

      setPronto(true);
    }
    verificar();
  }, [pathname, router]);

  const diasRestantes = expiraEm
    ? Math.ceil((new Date(expiraEm).getTime() - Date.now()) / 86400000)
    : null;

  const mostrarBanner =
    plano === "trial" &&
    diasRestantes !== null &&
    diasRestantes > 0 &&
    diasRestantes <= 3;

  const planoInfo = PLANO_INFO[plano];

  if (!pronto) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#FAF8F5",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          color: "#78716C",
        }}
      >
        Carregando...
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <style>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background: #FAF8F5;
        }

        .dashboard-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .trial-banner {
          background: #fffbeb;
          border-bottom: 1px solid #fde68a;
          padding: 10px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .trial-banner-texto {
          font-size: 13px;
          color: #92400e;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
        }

        .trial-banner-texto strong { font-weight: 700; }

        .trial-banner-btn {
          font-size: 12px;
          font-weight: 600;
          color: #C96A2B;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          transition: opacity 0.2s;
        }

        .trial-banner-btn:hover { opacity: 0.7; }

        @media (max-width: 768px) {
          .dashboard-main { padding-top: 56px; }
        }
      `}</style>

      <Sidebar />
      <div className="dashboard-main">
        <Header plano={plano} planoInfo={planoInfo} />

        {mostrarBanner && (
          <div className="trial-banner">
            <p className="trial-banner-texto">
              ⚠️ Seu período de teste expira em{" "}
              <strong>
                {diasRestantes} dia{diasRestantes !== 1 ? "s" : ""}
              </strong>
              . Faça upgrade para não perder o acesso.
            </p>
            <Link href="/precos" className="trial-banner-btn">
              Ver planos →
            </Link>
          </div>
        )}

        <main style={{ flex: 1, padding: "24px" }}>{children}</main>
      </div>
    </div>
  );
}
