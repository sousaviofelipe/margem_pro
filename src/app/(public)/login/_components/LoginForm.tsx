// Formulário de login com identidade visual Margem Pro

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError("E-mail ou senha inválidos.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <>
      <style>{`
        .login-form-side {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 48px clamp(32px, 5vw, 72px);
          overflow-y: auto;
          background: var(--bg);
        }

        .login-form-header { margin-bottom: 36px; }

        .login-form-header h1 {
          font-family: 'Inter', serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--grafite);
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .login-form-header p {
          font-size: 14px;
          color: var(--grafite-soft);
          font-weight: 300;
        }

        .login-form-header a {
          color: var(--terra);
          font-weight: 500;
          text-decoration: none;
        }

        .login-form-header a:hover { text-decoration: underline; }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .login-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .login-field label {
          font-size: 13px;
          font-weight: 600;
          color: var(--grafite-mid);
          letter-spacing: 0.01em;
        }

        .login-field input {
          padding: 11px 14px;
          border: 1.5px solid var(--border);
          border-radius: 9px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: var(--grafite);
          background: var(--white);
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }

        .login-field input:focus { border-color: var(--terra); }
        .login-field input.erro { border-color: var(--error); background: var(--error-bg); }

        .login-field-senha { position: relative; }
        .login-field-senha input { padding-right: 44px; }

        .login-senha-toggle {
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

        .login-senha-toggle:hover { color: var(--terra); }

        .login-error {
          font-size: 13px;
          color: var(--error);
          font-weight: 500;
          background: var(--error-bg);
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #fecaca;
        }

        .login-btn-submit {
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

        .login-btn-submit:hover:not(:disabled) {
          background: var(--terra-dark);
          transform: translateY(-1px);
        }

        .login-btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .login-divider {
          text-align: center;
          font-size: 13px;
          color: var(--grafite-soft);
          font-weight: 300;
          margin-top: 8px;
        }

        .login-divider a {
          color: var(--terra);
          font-weight: 500;
          text-decoration: none;
        }

        .login-divider a:hover { text-decoration: underline; }

        @media (max-width: 768px) {
          .login-form-side { padding: 40px 24px; justify-content: flex-start; padding-top: 60px; }
        }
      `}</style>

      <div className="login-form-side">
        <div className="login-form-header">
          <h1>Entrar na conta</h1>
          <p>
            Não tem conta? <Link href="/cadastro">Criar gratuitamente</Link>
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="senha">Senha</label>
            <div className="login-field-senha">
              <input
                id="senha"
                type={senhaVisivel ? "text" : "password"}
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="login-senha-toggle"
                onClick={() => setSenhaVisivel((v) => !v)}
                aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
              >
                {senhaVisivel ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-btn-submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar →"}
          </button>

          <p className="login-divider">
            Não tem conta? <Link href="/cadastro">Criar conta grátis</Link>
          </p>
        </form>
      </div>
    </>
  );
}
