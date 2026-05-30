// Formulário de perfil e configurações da conta do usuário

"use client";

import { useState, useEffect } from "react";
import { getUser, signOut } from "@/lib/auth";
import { createClient } from "@/lib/db/supabase/client";
import { useRouter } from "next/navigation";

interface PerfilDados {
  nome: string;
  nome_empresa: string;
  telefone: string;
  segmento: string;
  email: string;
}

const segmentos = [
  "Confeitaria",
  "Doceria",
  "Bolos Personalizados",
  "Brigadeiros",
  "Salgados Artesanais",
  "Pães e Massas",
  "Marmitas",
  "Produtos Caseiros",
  "Outro",
];

export default function PerfilForm() {
  const router = useRouter();
  const [form, setForm] = useState<PerfilDados>({
    nome: "",
    nome_empresa: "",
    telefone: "",
    segmento: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");
  const [plano, setPlano] = useState("trial");

  useEffect(() => {
    async function carregar() {
      const user = await getUser();
      if (!user) return;

      const supabase = createClient();
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setForm({
        nome: profile?.nome ?? user.user_metadata?.name ?? "",
        nome_empresa: profile?.nome_empresa ?? "",
        telefone: profile?.telefone ?? "",
        segmento: profile?.segmento ?? "",
        email: user.email ?? "",
      });
      setPlano(profile?.plano ?? "trial");
      setLoading(false);
    }
    carregar();
  }, []);

  function atualizar(campo: keyof PerfilDados, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setSucesso(false);
  }

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro("");
    setSucesso(false);

    try {
      const user = await getUser();
      if (!user) throw new Error("Usuário não encontrado.");

      const supabase = createClient();
      const { error } = await supabase
        .from("profiles")
        .update({
          nome: form.nome,
          nome_empresa: form.nome_empresa,
          telefone: form.telefone,
          segmento: form.segmento,
        })
        .eq("id", user.id);

      if (error) throw new Error(error.message);
      setSucesso(true);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao salvar.");
    } finally {
      setSalvando(false);
    }
  }

  async function handleSair() {
    await signOut();
    router.push("/login");
  }

  const planoConfig: Record<
    string,
    { label: string; cor: string; bg: string }
  > = {
    trial: { label: "Teste Grátis", cor: "#d97706", bg: "#fffbeb" },
    pro: { label: "Pro", cor: "#2563eb", bg: "#eff6ff" },
    pro_max: { label: "Pro Max", cor: "#16a34a", bg: "#f0fdf4" },
  };

  const planoInfo = planoConfig[plano] ?? planoConfig.trial;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .perf-page {
          font-family: 'DM Sans', sans-serif;
          max-width: 640px;
        }

        .perf-header { margin-bottom: 32px; }

        .perf-header h2 {
          font-size: 22px;
          font-weight: 700;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 4px;
        }

        .perf-header p {
          font-size: 13px;
          color: #78716C;
          font-weight: 300;
        }

        .perf-plano-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 20px 24px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .perf-plano-info { display: flex; align-items: center; gap: 12px; }

        .perf-plano-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: #FAF8F5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .perf-plano-titulo {
          font-size: 13px;
          color: #78716C;
          font-weight: 400;
          margin-bottom: 3px;
        }

        .perf-plano-badge {
          padding: 3px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          display: inline-block;
        }

        .perf-btn-upgrade {
          padding: 9px 18px;
          background: #C96A2B;
          color: #FFFFFF;
          border: none;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
          text-decoration: none;
          display: inline-block;
        }

        .perf-btn-upgrade:hover { background: #A3511E; }

        .perf-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 20px;
        }

        .perf-card-titulo {
          font-size: 15px;
          font-weight: 700;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid #F3EFE9;
        }

        .perf-form { display: flex; flex-direction: column; gap: 16px; }

        .perf-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .perf-field { display: flex; flex-direction: column; gap: 6px; }

        .perf-field label {
          font-size: 13px;
          font-weight: 600;
          color: #44403C;
          font-family: 'DM Sans', sans-serif;
        }

        .perf-field input,
        .perf-field select {
          padding: 10px 14px;
          border: 1.5px solid #E5DDD4;
          border-radius: 9px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1C1917;
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.2s;
          appearance: none;
        }

        .perf-field input:focus,
        .perf-field select:focus { border-color: #C96A2B; }

        .perf-field input:disabled {
          background: #FAF8F5;
          color: #78716C;
          cursor: not-allowed;
        }

        .perf-field-hint {
          font-size: 11px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .perf-sucesso {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 9px;
          padding: 10px 14px;
          font-size: 13px;
          color: #16a34a;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
        }

        .perf-erro {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 9px;
          padding: 10px 14px;
          font-size: 13px;
          color: #dc2626;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
        }

        .perf-btn-salvar {
          padding: 12px;
          background: #C96A2B;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          margin-top: 4px;
        }

        .perf-btn-salvar:hover:not(:disabled) { background: #A3511E; }
        .perf-btn-salvar:disabled { opacity: 0.6; cursor: not-allowed; }

        .perf-danger-zona {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .perf-danger-info h4 {
          font-size: 14px;
          font-weight: 600;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 3px;
        }

        .perf-danger-info p {
          font-size: 12px;
          color: #78716C;
          font-weight: 300;
          font-family: 'DM Sans', sans-serif;
        }

        .perf-btn-sair {
          padding: 9px 20px;
          background: transparent;
          color: #dc2626;
          border: 1.5px solid #fecaca;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }

        .perf-btn-sair:hover { background: #fef2f2; border-color: #dc2626; }

        .perf-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          font-size: 14px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        @media (max-width: 640px) {
          .perf-form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="perf-page">
        <div className="perf-header">
          <h2>Perfil e Configurações</h2>
          <p>Gerencie suas informações pessoais e preferências da conta</p>
        </div>

        {loading ? (
          <div className="perf-loading">Carregando perfil...</div>
        ) : (
          <>
            {/* Plano atual */}
            <div className="perf-plano-card">
              <div className="perf-plano-info">
                <div className="perf-plano-icon">🎯</div>
                <div>
                  <div className="perf-plano-titulo">Seu plano atual</div>
                  <div
                    className="perf-plano-badge"
                    style={{ color: planoInfo.cor, background: planoInfo.bg }}
                  >
                    {planoInfo.label}
                  </div>
                </div>
              </div>
              {plano !== "pro_max" && (
                <a href="/precos" className="perf-btn-upgrade">
                  ⚡ Fazer upgrade
                </a>
              )}
            </div>

            {/* Dados pessoais */}
            <div className="perf-card">
              <div className="perf-card-titulo">Dados Pessoais</div>
              <form className="perf-form" onSubmit={handleSalvar}>
                <div className="perf-form-row">
                  <div className="perf-field">
                    <label>Seu nome</label>
                    <input
                      type="text"
                      placeholder="Maria Silva"
                      value={form.nome}
                      onChange={(e) => atualizar("nome", e.target.value)}
                    />
                  </div>
                  <div className="perf-field">
                    <label>Nome do negócio</label>
                    <input
                      type="text"
                      placeholder="Doceria da Maria"
                      value={form.nome_empresa}
                      onChange={(e) =>
                        atualizar("nome_empresa", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="perf-form-row">
                  <div className="perf-field">
                    <label>WhatsApp / Telefone</label>
                    <input
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={form.telefone}
                      onChange={(e) => atualizar("telefone", e.target.value)}
                    />
                  </div>
                  <div className="perf-field">
                    <label>Segmento</label>
                    <select
                      value={form.segmento}
                      onChange={(e) => atualizar("segmento", e.target.value)}
                    >
                      <option value="">Selecionar</option>
                      {segmentos.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="perf-field">
                  <label>E-mail</label>
                  <input type="email" value={form.email} disabled />
                  <span className="perf-field-hint">
                    O e-mail não pode ser alterado.
                  </span>
                </div>

                {sucesso && (
                  <div className="perf-sucesso">
                    ✅ Perfil atualizado com sucesso!
                  </div>
                )}
                {erro && <div className="perf-erro">{erro}</div>}

                <button
                  type="submit"
                  className="perf-btn-salvar"
                  disabled={salvando}
                >
                  {salvando ? "Salvando..." : "Salvar alterações"}
                </button>
              </form>
            </div>

            {/* Zona de perigo */}
            <div className="perf-card">
              <div className="perf-card-titulo">Conta</div>
              <div className="perf-danger-zona">
                <div className="perf-danger-info">
                  <h4>Sair da conta</h4>
                  <p>Você será redirecionado para a página de login.</p>
                </div>
                <button className="perf-btn-sair" onClick={handleSair}>
                  Sair da conta
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
