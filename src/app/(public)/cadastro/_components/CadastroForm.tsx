// Formulário de cadastro com validação Zod e identidade visual Margem Pro

"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";

const cadastroSchema = z.object({
  segmento: z.string().min(1, "Selecione seu segmento"),
  nome_empresa: z.string().min(2, "Informe o nome do seu negócio"),
  telefone: z.string().min(10, "Informe um telefone válido"),
  email: z.string().email("Informe um e-mail válido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  termos: z.literal(true, {
    errorMap: () => ({ message: "Você precisa aceitar os termos" }),
  }),
});

type CadastroForm = z.infer<typeof cadastroSchema>;

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

export default function CadastroForm() {
  const router = useRouter();
  const [form, setForm] = useState<Partial<CadastroForm>>({
    termos: undefined,
  });
  const [erros, setErros] = useState<
    Partial<Record<keyof CadastroForm, string>>
  >({});
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  function atualizar(campo: keyof CadastroForm, valor: string | boolean) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    if (erros[campo]) setErros((prev) => ({ ...prev, [campo]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const resultado = cadastroSchema.safeParse({ ...form });
    if (!resultado.success) {
      const mapa: Partial<Record<keyof CadastroForm, string>> = {};
      resultado.error.errors.forEach((err) => {
        const campo = err.path[0] as keyof CadastroForm;
        if (!mapa[campo]) mapa[campo] = err.message;
      });
      setErros(mapa);
      return;
    }
    setLoading(true);
    const { error } = await signUp(
      resultado.data.email,
      resultado.data.senha,
      resultado.data.nome_empresa,
    );
    if (error) {
      setErros({ email: "Este e-mail já está em uso." });
      setLoading(false);
      return;
    }
    setLoading(false);
    setSucesso(true);
  }

  return (
    <>
      <style>{`
        .form-side {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 48px clamp(32px, 5vw, 72px);
          overflow-y: auto;
          background: var(--bg);
        }

        .form-header { margin-bottom: 36px; }

        .form-header h1 {
          font-family: 'Inter', serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--grafite);
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .form-header p {
          font-size: 14px;
          color: var(--grafite-soft);
          font-weight: 300;
        }

        .form-header a {
          color: var(--terra);
          font-weight: 500;
          text-decoration: none;
        }

        .form-header a:hover { text-decoration: underline; }

        .form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field label {
          font-size: 13px;
          font-weight: 600;
          color: var(--grafite-mid);
          letter-spacing: 0.01em;
        }

        .field input,
        .field select {
          padding: 11px 14px;
          border: 1.5px solid var(--border);
          border-radius: 9px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: var(--grafite);
          background: var(--white);
          outline: none;
          transition: border-color 0.2s;
          appearance: none;
          -webkit-appearance: none;
        }

        .field input:focus,
        .field select:focus { border-color: var(--terra); }

        .field input.erro,
        .field select.erro { border-color: var(--error); background: var(--error-bg); }

        .field-error {
          font-size: 12px;
          color: var(--error);
          font-weight: 500;
        }

        .field-senha { position: relative; }
        .field-senha input { padding-right: 44px; width: 100%; }

        .senha-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          color: var(--grafite-soft);
          padding: 4px;
          transition: color 0.2s;
        }

        .senha-toggle:hover { color: var(--terra); }

        .termos-field {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .termos-field input[type="checkbox"] {
          width: 16px;
          height: 16px;
          margin-top: 2px;
          accent-color: var(--terra);
          flex-shrink: 0;
          cursor: pointer;
        }

        .termos-label {
          font-size: 13px;
          color: var(--grafite-soft);
          font-weight: 300;
          line-height: 1.5;
        }

        .termos-label a {
          color: var(--terra);
          font-weight: 500;
          text-decoration: none;
        }

        .termos-label a:hover { text-decoration: underline; }

        .btn-submit {
          padding: 14px;
          background: var(--terra);
          color: var(--white);
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 4px;
        }

        .btn-submit:hover:not(:disabled) {
          background: var(--terra-dark);
          transform: translateY(-1px);
        }

        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .sucesso-box {
          text-align: center;
          padding: 40px 0;
        }

        .sucesso-icon {
          font-size: 48px;
          margin-bottom: 20px;
          display: block;
        }

        .sucesso-box h2 {
          font-family: 'Inter', serif;
          font-size: 26px;
          font-weight: 700;
          color: var(--grafite);
          margin-bottom: 10px;
        }

        .sucesso-box p {
          font-size: 14px;
          color: var(--grafite-soft);
          font-weight: 300;
          line-height: 1.7;
          margin-bottom: 28px;
        }

        .btn-login {
          display: inline-block;
          padding: 13px 28px;
          background: var(--terra);
          color: var(--white);
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s;
        }

        .btn-login:hover { background: var(--terra-dark); }

        @media (max-width: 768px) {
          .form-side { padding: 40px 24px; justify-content: flex-start; padding-top: 60px; }
        }
      `}</style>

      <div className="form-side">
        {sucesso ? (
          <div className="sucesso-box">
            <span className="sucesso-icon">🎉</span>
            <h2>Conta criada com sucesso!</h2>
            <p>
              Enviamos um e-mail de confirmação. Verifique sua caixa de entrada
              e clique no link para ativar sua conta.
            </p>
            <Link href="/login" className="btn-login">
              Ir para o login →
            </Link>
          </div>
        ) : (
          <>
            <div className="form-header">
              <h1>Criar conta grátis</h1>
              <p>
                Já tem conta? <Link href="/login">Fazer login</Link>
              </p>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="segmento">Seu segmento</label>
                <select
                  id="segmento"
                  className={erros.segmento ? "erro" : ""}
                  value={form.segmento ?? ""}
                  onChange={(e) => atualizar("segmento", e.target.value)}
                >
                  <option value="">Selecione seu segmento</option>
                  {segmentos.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {erros.segmento && (
                  <span className="field-error">{erros.segmento}</span>
                )}
              </div>

              <div className="field">
                <label htmlFor="nome_empresa">Nome do seu negócio</label>
                <input
                  id="nome_empresa"
                  type="text"
                  placeholder="Ex: Doceria da Ana"
                  className={erros.nome_empresa ? "erro" : ""}
                  value={form.nome_empresa ?? ""}
                  onChange={(e) => atualizar("nome_empresa", e.target.value)}
                />
                {erros.nome_empresa && (
                  <span className="field-error">{erros.nome_empresa}</span>
                )}
              </div>

              <div className="field">
                <label htmlFor="telefone">WhatsApp / Telefone</label>
                <input
                  id="telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  className={erros.telefone ? "erro" : ""}
                  value={form.telefone ?? ""}
                  onChange={(e) => atualizar("telefone", e.target.value)}
                />
                {erros.telefone && (
                  <span className="field-error">{erros.telefone}</span>
                )}
              </div>

              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className={erros.email ? "erro" : ""}
                  value={form.email ?? ""}
                  onChange={(e) => atualizar("email", e.target.value)}
                />
                {erros.email && (
                  <span className="field-error">{erros.email}</span>
                )}
              </div>

              <div className="field">
                <label htmlFor="senha">Senha</label>
                <div className="field-senha">
                  <input
                    id="senha"
                    type={senhaVisivel ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    className={erros.senha ? "erro" : ""}
                    value={form.senha ?? ""}
                    onChange={(e) => atualizar("senha", e.target.value)}
                  />
                  <button
                    type="button"
                    className="senha-toggle"
                    onClick={() => setSenhaVisivel((v) => !v)}
                    aria-label={
                      senhaVisivel ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    {senhaVisivel ? "🙈" : "👁️"}
                  </button>
                </div>
                {erros.senha && (
                  <span className="field-error">{erros.senha}</span>
                )}
              </div>

              <div className="field">
                <div className="termos-field">
                  <input
                    id="termos"
                    type="checkbox"
                    checked={form.termos === true}
                    onChange={(e) => atualizar("termos", e.target.checked)}
                  />
                  <label htmlFor="termos" className="termos-label">
                    Li e aceito os{" "}
                    <Link href="/termos" target="_blank">
                      Termos de Uso
                    </Link>{" "}
                    e a{" "}
                    <Link href="/privacidade" target="_blank">
                      Política de Privacidade
                    </Link>
                  </label>
                </div>
                {erros.termos && (
                  <span className="field-error">{erros.termos}</span>
                )}
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Criando sua conta..." : "Iniciar Teste Grátis →"}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
