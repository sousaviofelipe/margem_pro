// Página de upgrade — exibida quando o trial expira, fora do layout do dashboard

"use client";

import Link from "next/link";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

const planos = [
  {
    nome: "Pro",
    preco: "R$ 47",
    periodo: "por mês",
    descricao: "Para quem está começando a escalar",
    features: [
      "Ingredientes e receitas",
      "Produtos finais",
      "Pedidos e clientes",
      "Painel financeiro",
    ],
    destaque: false,
    whatsapp: "Olá! Quero assinar o plano Pro da Margem Pro por R$ 47/mês.",
  },
  {
    nome: "Pro Max",
    preco: "R$ 79",
    periodo: "por mês",
    descricao: "Acesso completo à plataforma",
    features: [
      "Tudo do plano Pro",
      "Controle de estoque",
      "Planejamento de produção",
      "Lista de compras via WhatsApp",
      "Previsão de reposição",
    ],
    destaque: true,
    whatsapp: "Olá! Quero assinar o plano Pro Max da Margem Pro por R$ 79/mês.",
  },
];

export default function UpgradePage() {
  const router = useRouter();

  async function handleSair() {
    await signOut();
    router.push("/login");
  }

  return (
    <div className="upgrade-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --bg: #FAF8F5;
          --terra: #C96A2B;
          --terra-dark: #A3511E;
          --terra-light: #F0DDD0;
          --grafite: #1C1917;
          --grafite-soft: #78716C;
          --white: #FFFFFF;
          --border: #E5DDD4;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .upgrade-page {
          font-family: 'DM Sans', sans-serif;
          background: var(--grafite);
          color: var(--white);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }

        .upgrade-page::before {
          content: '';
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(201,106,43,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .upgrade-inner {
          position: relative;
          width: 100%;
          max-width: 860px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }

        .upgrade-header { text-align: center; }

        .upgrade-logo {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: var(--white);
          text-decoration: none;
          letter-spacing: -0.02em;
          display: block;
          margin-bottom: 24px;
        }

        .upgrade-logo span { color: var(--terra); }

        .upgrade-badge {
          display: inline-block;
          background: rgba(201,106,43,0.2);
          color: #F0DDD0;
          padding: 5px 16px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .upgrade-titulo {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 700;
          color: var(--white);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .upgrade-titulo em { font-style: italic; color: var(--terra); }

        .upgrade-subtitulo {
          font-size: 15px;
          color: rgba(255,255,255,0.55);
          font-weight: 300;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
        }

        .upgrade-planos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          width: 100%;
        }

        .upgrade-plano {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          transition: all 0.2s;
        }

        .upgrade-plano:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
        }

        .upgrade-plano.destaque {
          background: var(--terra);
          border-color: var(--terra);
          position: relative;
        }

        .upgrade-destaque-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--white);
          color: var(--terra);
          padding: 4px 16px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .upgrade-plano-nome {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          margin-bottom: 12px;
        }

        .upgrade-plano.destaque .upgrade-plano-nome {
          color: rgba(255,255,255,0.8);
        }

        .upgrade-plano-preco {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          margin-bottom: 6px;
        }

        .upgrade-plano-valor {
          font-family: 'Playfair Display', serif;
          font-size: 40px;
          font-weight: 700;
          color: var(--white);
          line-height: 1;
        }

        .upgrade-plano-periodo {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          padding-bottom: 6px;
        }

        .upgrade-plano-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          font-weight: 300;
          margin-bottom: 24px;
        }

        .upgrade-plano-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
          margin-bottom: 28px;
        }

        .upgrade-plano-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.75);
          font-weight: 400;
        }

        .upgrade-feature-check {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          flex-shrink: 0;
          font-weight: 700;
        }

        .upgrade-plano.destaque .upgrade-feature-check {
          background: rgba(255,255,255,0.25);
        }

        .upgrade-btn-wpp {
          display: block;
          text-align: center;
          padding: 14px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          transition: all 0.2s;
          background: rgba(255,255,255,0.1);
          color: var(--white);
          border: 1.5px solid rgba(255,255,255,0.2);
        }

        .upgrade-btn-wpp:hover {
          background: rgba(255,255,255,0.18);
          transform: translateY(-1px);
        }

        .upgrade-plano.destaque .upgrade-btn-wpp {
          background: var(--white);
          color: var(--terra);
          border-color: var(--white);
        }

        .upgrade-plano.destaque .upgrade-btn-wpp:hover {
          background: #FAF8F5;
        }

        .upgrade-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .upgrade-footer-texto {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          text-align: center;
        }

        .upgrade-btn-sair {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.2s;
          text-decoration: underline;
        }

        .upgrade-btn-sair:hover { color: rgba(255,255,255,0.6); }

        @media (max-width: 640px) {
          .upgrade-planos { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="upgrade-inner">
        <div className="upgrade-header">
          <Link href="/" className="upgrade-logo">
            Margem<span>Pro</span>
          </Link>
          <div className="upgrade-badge">Período de teste encerrado</div>
          <h1 className="upgrade-titulo">
            Continue tendo <em>controle real</em>
            <br />
            do seu negócio
          </h1>
          <p className="upgrade-subtitulo">
            Escolha o plano ideal e continue usando a Margem Pro sem
            interrupção. Fale com a gente pelo WhatsApp para ativar seu plano.
          </p>
        </div>

        <div className="upgrade-planos">
          {planos.map((plano) => (
            <div
              key={plano.nome}
              className={`upgrade-plano ${plano.destaque ? "destaque" : ""}`}
            >
              {plano.destaque && (
                <div className="upgrade-destaque-badge">⭐ Mais popular</div>
              )}
              <div className="upgrade-plano-nome">{plano.nome}</div>
              <div className="upgrade-plano-preco">
                <span className="upgrade-plano-valor">{plano.preco}</span>
                <span className="upgrade-plano-periodo">/{plano.periodo}</span>
              </div>
              <p className="upgrade-plano-desc">{plano.descricao}</p>
              <ul className="upgrade-plano-features">
                {plano.features.map((f) => (
                  <li key={f} className="upgrade-plano-feature">
                    <div className="upgrade-feature-check">✓</div>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/5583986177733?text=${encodeURIComponent(plano.whatsapp)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="upgrade-btn-wpp"
              >
                💬 Assinar via WhatsApp
              </a>
            </div>
          ))}
        </div>

        <div className="upgrade-footer">
          <p className="upgrade-footer-texto">
            Após o pagamento, seu plano é ativado manualmente em até 1 hora
            útil.
          </p>
          <button className="upgrade-btn-sair" onClick={handleSair}>
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}
