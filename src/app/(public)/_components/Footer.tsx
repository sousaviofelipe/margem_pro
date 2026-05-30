// Rodapé completo da Landing Page com links e informações legais

export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          background: var(--grafite);
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 60px 5vw 32px;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .footer-logo {
          font-family: 'Inter', serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--white);
          text-decoration: none;
          display: block;
          margin-bottom: 12px;
        }

        .footer-logo span { color: var(--terra); }

        .footer-desc {
          font-size: 13px;
          line-height: 1.7;
          color: rgba(255,255,255,0.45);
          font-weight: 300;
          margin-bottom: 20px;
        }

        .footer-col-title {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 16px;
        }

        .footer-col a {
          display: block;
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          margin-bottom: 10px;
          transition: color 0.2s;
          font-weight: 300;
        }

        .footer-col a:hover { color: var(--terra); }

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .footer-copy {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          font-weight: 300;
        }

        .footer-legal {
          display: flex;
          gap: 20px;
        }

        .footer-legal a {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-legal a:hover { color: var(--terra); }

        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
          .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-top">
          <div>
            <a href="/" className="footer-logo">
              Margem<span>Pro</span>
            </a>
            <p className="footer-desc">
              Plataforma de gestão, precificação e vendas para confeiteiros e
              produtores artesanais.
            </p>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Plataforma</div>
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="/precos">Planos e preços</a>
            <a href="/cadastro">Cadastrar</a>
            <a href="/login">Entrar</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Suporte</div>
            <a
              href="https://wa.me/5583986177733"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Legal</div>
            <a href="/termos">Termos de Uso</a>
            <a href="/privacidade">Privacidade</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">
            © 2025 Margem Pro. Todos os direitos reservados.
          </span>
          <div className="footer-legal">
            <a href="/termos">Termos</a>
            <a href="/privacidade">Privacidade</a>
          </div>
        </div>
      </footer>
    </>
  );
}
