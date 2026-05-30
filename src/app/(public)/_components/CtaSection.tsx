// Seção CTA final da Landing Page — chamada para ação antes do footer

import Link from "next/link";

export default function CtaSection() {
  return (
    <>
      <style>{`

.btn-cta-entrar {
  padding: 15px 32px;
  background: transparent;
  color: var(--white);
  border: 1.5px solid rgba(255,255,255,0.2);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cta-entrar:hover { border-color: rgba(255,255,255,0.5); }

.btn-cta-wpp {
  padding: 15px 32px;
  background: #16a34a;
  color: var(--white);
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cta-wpp:hover { background: #15803d; transform: translateY(-1px); }

        .cta-section {
          background: var(--grafite);
          padding: 100px 5vw;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: -100px; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(201,106,43,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-inner { position: relative; max-width: 600px; margin: 0 auto; }

        .cta-section h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 700;
          color: var(--white);
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .cta-section h2 em { color: var(--terra); font-style: italic; }

        .cta-section p {
          font-size: 16px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 40px;
          font-weight: 300;
        }

        .cta-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-cta-primary {
          padding: 15px 32px;
          background: var(--terra);
          color: var(--white);
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cta-primary:hover {
          background: var(--terra-dark);
          transform: translateY(-1px);
        }

        .btn-cta-secondary {
          padding: 15px 32px;
          background: transparent;
          color: var(--white);
          border: 1.5px solid rgba(255,255,255,0.2);
          border-radius: 10px;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cta-secondary:hover { border-color: rgba(255,255,255,0.5); }
      `}</style>

      <section className="cta-section">
        <div className="cta-inner">
          <h2>
            Pronto para ter <em>controle real</em> do seu negócio?
          </h2>
          <p>
            Comece grátis por 7 dias. Sem cartão de crédito. Cancele quando
            quiser.
          </p>
          <div className="cta-buttons">
            <Link href="/cadastro" className="btn-cta-primary">
              Teste grátis
            </Link>
            <Link href="/login" className="btn-cta-entrar">
              Entrar
            </Link>
            <a
              href="https://wa.me/5583986177733"
              className="btn-cta-wpp"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
