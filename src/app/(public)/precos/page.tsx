// Página de planos e preços da plataforma Margem Pro

import Link from "next/link";

const planos = [
  {
    nome: "Teste Grátis",
    preco: "R$ 0",
    periodo: "7 dias",
    descricao: "Experimente tudo sem compromisso",
    features: [
      { texto: "Todos os módulos liberados", ativo: true },
      { texto: "Ingredientes e receitas", ativo: true },
      { texto: "Produtos e estoque", ativo: true },
      { texto: "Pedidos e clientes", ativo: true },
      { texto: "Painel financeiro", ativo: true },
    ],
    cta: "Começar grátis",
    href: "/cadastro",
    destaque: false,
  },
  {
    nome: "Pro",
    preco: "R$ 47",
    periodo: "por mês",
    descricao: "Para quem está começando a escalar",
    features: [
      { texto: "Ingredientes e receitas", ativo: true },
      { texto: "Produtos finais", ativo: true },
      { texto: "Pedidos e clientes", ativo: true },
      { texto: "Painel financeiro", ativo: true },
      { texto: "Estoque e produção", ativo: false },
    ],
    cta: "Assinar Pro",
    href: "/cadastro",
    destaque: false,
  },
  {
    nome: "Pro Max",
    preco: "R$ 79",
    periodo: "por mês",
    descricao: "Acesso completo à plataforma",
    features: [
      { texto: "Tudo do plano Pro", ativo: true },
      { texto: "Controle de estoque", ativo: true },
      { texto: "Planejamento de produção", ativo: true },
      { texto: "Lista de compras via WhatsApp", ativo: true },
      { texto: "Previsão de reposição", ativo: true },
    ],
    cta: "Assinar Pro Max",
    href: "/cadastro",
    destaque: true,
  },
];

const faq = [
  {
    pergunta: "Preciso de cartão de crédito para testar?",
    resposta:
      "Não. O teste grátis de 7 dias não exige nenhum dado de pagamento. Você só precisa criar sua conta.",
  },
  {
    pergunta: "Posso cancelar a qualquer momento?",
    resposta:
      "Sim. Não há fidelidade. Você pode cancelar sua assinatura quando quiser, sem multa.",
  },
  {
    pergunta: "O que acontece após os 7 dias de teste?",
    resposta:
      "Após o período de teste você escolhe o plano que melhor se encaixa no seu negócio. Sem cobranças automáticas.",
  },
  {
    pergunta: "Posso mudar de plano depois?",
    resposta:
      "Sim. Você pode fazer upgrade ou downgrade do seu plano a qualquer momento pelo painel.",
  },
];

export default function PrecosPage() {
  return (
    <div className="precos-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --bg: #FAF8F5;
          --bg2: #F3EFE9;
          --terra: #C96A2B;
          --terra-dark: #A3511E;
          --terra-light: #F0DDD0;
          --grafite: #1C1917;
          --grafite-mid: #44403C;
          --grafite-soft: #78716C;
          --white: #FFFFFF;
          --border: #E5DDD4;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .precos-page {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--grafite);
          min-height: 100vh;
        }

        .precos-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(250,248,245,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          padding: 0 5vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        .precos-logo {
          font-family: 'Inter', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--grafite);
          text-decoration: none;
          letter-spacing: -0.02em;
        }

        .precos-logo span { color: var(--terra); }

        .precos-nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .precos-nav-actions a {
          font-size: 14px;
          font-weight: 500;
          color: var(--grafite-mid);
          text-decoration: none;
          transition: color 0.2s;
        }

        .precos-nav-actions a:hover { color: var(--terra); }

        .btn-nav-primary {
          padding: 9px 20px;
          background: var(--terra);
          color: var(--white) !important;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s;
        }

        .btn-nav-primary:hover { background: var(--terra-dark) !important; }

        .precos-hero {
          text-align: center;
          padding: 80px 5vw 60px;
          max-width: 700px;
          margin: 0 auto;
        }

        .precos-tag {
          display: inline-block;
          background: var(--terra-light);
          color: var(--terra-dark);
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .precos-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 700;
          color: var(--grafite);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }

        .precos-hero h1 em { font-style: italic; color: var(--terra); }

        .precos-hero p {
          font-size: 16px;
          color: var(--grafite-soft);
          font-weight: 300;
          line-height: 1.7;
        }

        .planos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 5vw 80px;
        }

        .plano-card {
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          transition: all 0.25s;
        }

        .plano-card:hover {
          box-shadow: 0 12px 40px rgba(28,25,23,0.08);
          transform: translateY(-2px);
        }

        .plano-card.destaque {
          background: var(--grafite);
          border-color: var(--grafite);
          position: relative;
        }

        .destaque-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--terra);
          color: var(--white);
          padding: 4px 16px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .plano-nome {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--terra);
          margin-bottom: 12px;
        }

        .plano-card.destaque .plano-nome { color: var(--terra-light); }

        .plano-preco {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          margin-bottom: 6px;
        }

        .plano-valor {
          font-family: 'Inter', serif;
          font-size: 42px;
          font-weight: 700;
          color: var(--grafite);
          line-height: 1;
        }

        .plano-card.destaque .plano-valor { color: var(--white); }

        .plano-periodo {
          font-size: 13px;
          color: var(--grafite-soft);
          font-weight: 400;
          padding-bottom: 6px;
        }

        .plano-card.destaque .plano-periodo { color: rgba(255,255,255,0.5); }

        .plano-descricao {
          font-size: 13px;
          color: var(--grafite-soft);
          font-weight: 300;
          margin-bottom: 28px;
          line-height: 1.5;
        }

        .plano-card.destaque .plano-descricao { color: rgba(255,255,255,0.55); }

        .plano-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
          margin-bottom: 28px;
        }

        .plano-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--grafite-mid);
          font-weight: 400;
        }

        .plano-card.destaque .plano-feature { color: rgba(255,255,255,0.75); }

        .plano-feature-check {
          width: 18px; height: 18px;
          background: var(--terra-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: var(--terra-dark);
          flex-shrink: 0;
          font-weight: 700;
        }

        .plano-card.destaque .plano-feature-check {
          background: rgba(201,106,43,0.25);
          color: var(--terra-light);
        }

        .plano-cta {
          display: block;
          text-align: center;
          padding: 13px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          background: var(--terra);
          color: var(--white);
        }

        .plano-cta:hover {
          background: var(--terra-dark);
          transform: translateY(-1px);
        }

        .plano-card.destaque .plano-cta {
          background: var(--white);
          color: var(--terra-dark);
        }

        .plano-card.destaque .plano-cta:hover { background: var(--terra-light); }

        .faq-section {
          background: var(--white);
          padding: 80px 5vw;
        }

        .faq-inner {
          max-width: 700px;
          margin: 0 auto;
        }

        .faq-title {
          font-family: 'Inter', serif;
          font-size: 32px;
          font-weight: 700;
          color: var(--grafite);
          margin-bottom: 40px;
          letter-spacing: -0.02em;
          text-align: center;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-item {
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px 24px;
        }

        .faq-pergunta {
          font-size: 15px;
          font-weight: 600;
          color: var(--grafite);
          margin-bottom: 10px;
        }

        .faq-resposta {
          font-size: 14px;
          color: var(--grafite-soft);
          font-weight: 300;
          line-height: 1.7;
        }

        .precos-footer {
          background: var(--grafite);
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 32px 5vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .precos-footer-copy {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
        }

        .precos-footer-links {
          display: flex;
          gap: 20px;
        }

        .precos-footer-links a {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: color 0.2s;
        }

        .precos-footer-links a:hover { color: var(--terra); }

        @media (max-width: 768px) {
          .planos-grid { grid-template-columns: 1fr; }
          .precos-footer { flex-direction: column; gap: 12px; text-align: center; }
        }
      `}</style>

      <header className="precos-header">
        <Link href="/" className="precos-logo">
          Margem<span>Pro</span>
        </Link>
        <div className="precos-nav-actions">
          <Link href="/login">Entrar</Link>
          <Link href="/cadastro" className="btn-nav-primary">
            Teste grátis
          </Link>
        </div>
      </header>

      <div className="precos-hero">
        <div className="precos-tag">Planos e Preços</div>
        <h1>
          Simples, transparente e <em>sem surpresas</em>
        </h1>
        <p>
          Comece grátis por 7 dias e escolha o plano que melhor se encaixa no
          tamanho do seu negócio.
        </p>
      </div>

      <div className="planos-grid">
        {planos.map((plano) => (
          <div
            key={plano.nome}
            className={`plano-card ${plano.destaque ? "destaque" : ""}`}
          >
            {plano.destaque && (
              <div className="destaque-badge">⭐ Mais popular</div>
            )}
            <div className="plano-nome">{plano.nome}</div>
            <div className="plano-preco">
              <span className="plano-valor">{plano.preco}</span>
              <span className="plano-periodo">/{plano.periodo}</span>
            </div>
            <p className="plano-descricao">{plano.descricao}</p>
            <ul className="plano-features">
              {plano.features.map((f) => (
                <li key={f.texto} className="plano-feature">
                  <div className="plano-feature-check">
                    {f.ativo ? "✓" : "✕"}
                  </div>

                  <span
                    style={{
                      opacity: f.ativo ? 1 : 0.5,
                      textDecoration: f.ativo ? "none" : "line-through",
                    }}
                  >
                    {f.texto}
                  </span>
                </li>
              ))}
            </ul>
            <Link href={plano.href} className="plano-cta">
              {plano.cta}
            </Link>
          </div>
        ))}
      </div>

      <section className="faq-section">
        <div className="faq-inner">
          <h2 className="faq-title">Perguntas frequentes</h2>
          <div className="faq-list">
            {faq.map((item, i) => (
              <div key={i} className="faq-item">
                <div className="faq-pergunta">{item.pergunta}</div>
                <div className="faq-resposta">{item.resposta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="precos-footer">
        <span className="precos-footer-copy">
          © 2025 Margem Pro. Todos os direitos reservados.
        </span>
        <div className="precos-footer-links">
          <Link href="/termos">Termos</Link>
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/">Início</Link>
        </div>
      </footer>
    </div>
  );
}
