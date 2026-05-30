// Seção Hero da Landing Page — header fixo + apresentação principal com mock do dashboard

import Link from "next/link";

export default function Hero() {
  return (
    <>
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

        .landing {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--grafite);
          overflow-x: hidden;
        }

        .trial-bar {
          background: var(--terra);
          color: var(--white);
          text-align: center;
          padding: 10px 16px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .btn-wpp-green {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #FFFFFF;
  text-decoration: none;
  transition: all 0.2s;
  background: #16a34a;
  cursor: pointer;
}

.btn-wpp-green:hover { background: #15803d; }

.btn-entrar {
  padding: 9px 20px;
  background: transparent;
  color: var(--grafite-mid);
  border: 1.5px solid var(--border);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-entrar:hover { border-color: var(--grafite-soft); color: var(--grafite); }

        .header {
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

        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--grafite);
          text-decoration: none;
          letter-spacing: -0.02em;
        }

        .logo span { color: var(--terra); }

        .nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav a {
          font-size: 14px;
          font-weight: 500;
          color: var(--grafite-mid);
          text-decoration: none;
          transition: color 0.2s;
        }

        .nav a:hover { color: var(--terra); }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-wpp {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--grafite-mid);
          text-decoration: none;
          transition: all 0.2s;
          background: transparent;
          cursor: pointer;
        }

        .btn-wpp:hover { border-color: var(--terra); color: var(--terra); }

        .btn-primary {
          padding: 9px 20px;
          background: var(--terra);
          color: var(--white);
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-primary:hover { background: var(--terra-dark); }

        .hero {
          padding: 100px 5vw 80px;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--terra-light);
          color: var(--terra-dark);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 4vw, 54px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--grafite);
          margin-bottom: 20px;
        }

        .hero h1 em {
          font-style: italic;
          color: var(--terra);
        }

        .hero p {
          font-size: 17px;
          line-height: 1.7;
          color: var(--grafite-soft);
          margin-bottom: 36px;
          font-weight: 300;
        }

        .hero-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-hero-primary {
          padding: 14px 28px;
          background: var(--terra);
          color: var(--white);
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-hero-primary:hover {
          background: var(--terra-dark);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(201,106,43,0.3);
        }

        .btn-hero-secondary {
          padding: 14px 28px;
          background: transparent;
          color: var(--grafite);
          border: 1.5px solid var(--border);
          border-radius: 10px;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-hero-secondary:hover { border-color: var(--grafite-soft); }

        .hero-visual {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 20px 60px rgba(28,25,23,0.08);
          position: relative;
        }

        .hero-visual::before {
          content: '';
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          border-radius: 22px;
          background: linear-gradient(135deg, var(--terra-light), transparent 60%);
          z-index: -1;
        }

        .mock-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }

        .mock-logo {
          font-family: 'Inter', serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--grafite);
        }

        .mock-badge {
          background: var(--terra-light);
          color: var(--terra-dark);
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
        }

        .mock-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }

        .mock-stat {
          background: var(--bg);
          border-radius: 10px;
          padding: 14px;
          border: 1px solid var(--border);
        }

        .mock-stat-label {
          font-size: 11px;
          color: var(--grafite-soft);
          margin-bottom: 4px;
          font-weight: 500;
        }

        .mock-stat-value {
          font-family: 'Inter', serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--grafite);
        }

        .mock-stat-value.green { color: #16a34a; }

        .mock-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mock-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background: var(--bg);
          border-radius: 8px;
          border: 1px solid var(--border);
        }

        .mock-item-left {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 500;
          color: var(--grafite);
        }

        .mock-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--terra);
        }

        .mock-dot.green { background: #16a34a; }
        .mock-dot.amber { background: #d97706; }

        .mock-price {
          font-size: 13px;
          font-weight: 600;
          color: var(--grafite);
        }

        @media (max-width: 768px) {
          .nav { display: none; }
          .hero { grid-template-columns: 1fr; gap: 40px; padding: 60px 5vw; }
          .hero-visual { display: none; }
        }
      `}</style>

      <div className="trial-bar">
        ✨ Teste grátis por 7 dias — sem cartão de crédito
      </div>

      <header className="header">
        <a href="/" className="logo">
          Margem<span>Pro</span>
        </a>
        <nav className="nav">
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#segmentos">Para quem é</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="/precos">Planos</a>
        </nav>
        <div className="header-actions">
          <a
            href="https://wa.me/5583986177733"
            className="btn-wpp-green"
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 WhatsApp
          </a>
          <Link href="/login" className="btn-entrar">
            Entrar
          </Link>
          <Link href="/cadastro" className="btn-primary">
            Teste grátis
          </Link>
        </div>
      </header>

      <section className="hero">
        <div>
          <div className="hero-tag">
            🍰 Para confeiteiros e produtores artesanais
          </div>
          <h1>
            Gerencie seu negócio com <em>precisão e leveza</em>
          </h1>
          <p>
            Precifique produtos, controle estoque, organize pedidos e acompanhe
            seu financeiro — tudo em um único sistema. Chega de planilhas e
            achismos.
          </p>
          <div className="hero-ctas">
            <Link href="/cadastro" className="btn-hero-primary">
              Começar teste grátis →
            </Link>
            <a
              href="https://wa.me/5500000000000"
              className="btn-hero-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Falar no WhatsApp
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="mock-header">
            <span className="mock-logo">
              Margem<span style={{ color: "var(--terra)" }}>Pro</span>
            </span>
            <span className="mock-badge">Pro Max</span>
          </div>
          <div className="mock-stats">
            <div className="mock-stat">
              <div className="mock-stat-label">Faturamento do mês</div>
              <div className="mock-stat-value">R$ 4.280</div>
            </div>
            <div className="mock-stat">
              <div className="mock-stat-label">Lucro estimado</div>
              <div className="mock-stat-value green">R$ 1.640</div>
            </div>
            <div className="mock-stat">
              <div className="mock-stat-label">Pedidos abertos</div>
              <div className="mock-stat-value">12</div>
            </div>
            <div className="mock-stat">
              <div className="mock-stat-label">Margem média</div>
              <div className="mock-stat-value">38%</div>
            </div>
          </div>
          <div className="mock-list">
            <div className="mock-item">
              <div className="mock-item-left">
                <div className="mock-dot"></div>Bolo Red Velvet
              </div>
              <div className="mock-price">R$ 89,90</div>
            </div>
            <div className="mock-item">
              <div className="mock-item-left">
                <div className="mock-dot green"></div>Caixa Brigadeiros
              </div>
              <div className="mock-price">R$ 45,00</div>
            </div>
            <div className="mock-item">
              <div className="mock-item-left">
                <div className="mock-dot amber"></div>Torta Morango
              </div>
              <div className="mock-price">R$ 120,00</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
