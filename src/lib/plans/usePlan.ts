// Hook de plano — retorna o plano efetivo, limites e flags de acesso do usuário

"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import { createClient } from "@/lib/db/supabase/client";
import type { Plano } from "@/lib/plans/limits";
import { PLANO_LIMITES, temAcesso } from "@/lib/plans/limits";

interface PlanoDados {
  plano: Plano;
  planoExpiraEm: string | null;
  expirado: boolean;
  planoEfetivo: Plano;
  diasRestantes: number | null;
  isPro: boolean;
  isProMax: boolean;
  isTrial: boolean;
  temAcesso: (modulo: keyof typeof PLANO_LIMITES.trial) => boolean;
}

export function usePlan(): PlanoDados {
  const [plano, setPlano] = useState<Plano>("trial");
  const [planoExpiraEm, setPlanoExpiraEm] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      const user = await getUser();
      if (!user) return;

      const supabase = createClient();
      const { data: profile } = await supabase
        .from("profiles")
        .select("plano, plano_expira_em")
        .eq("id", user.id)
        .single();

      if (profile) {
        setPlano((profile.plano as Plano) ?? "trial");
        setPlanoExpiraEm(profile.plano_expira_em ?? null);
      }
    }
    carregar();
  }, []);

  const expirado = planoExpiraEm ? new Date(planoExpiraEm) < new Date() : false;

  const planoEfetivo: Plano = expirado && plano === "trial" ? "trial" : plano;

  const diasRestantes = planoExpiraEm
    ? Math.ceil((new Date(planoExpiraEm).getTime() - Date.now()) / 86400000)
    : null;

  return {
    plano,
    planoExpiraEm,
    expirado,
    planoEfetivo,
    diasRestantes,
    isPro: planoEfetivo === "pro" || planoEfetivo === "pro_max",
    isProMax: planoEfetivo === "pro_max",
    isTrial: planoEfetivo === "trial",
    temAcesso: (modulo) => temAcesso(planoEfetivo, modulo),
  };
}
