// Lado esquerdo da página de cadastro — branding e benefícios da plataforma

import Link from "next/link";

const itens = [
  { icon: "🧾", texto: "Precificação automática e inteligente" },
  { icon: "📦", texto: "Controle de estoque integrado à produção" },
  { icon: "🛍️", texto: "Gestão completa de pedidos e clientes" },
  { icon: "📊", texto: "Dashboard financeiro em tempo real" },
];

export default function BrandingSide() {
  return (
    <>
      <style>{`
        .branding {
          background: var(--grafite);
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .branding::before {
          content: '';
          position: absolute;
          bottom: -80px; right: -80px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(201,106,43,0.2) 0%, transparent 70%);
          pointer-events: none;
        }

        .branding-logo {
          font-family: 'Inter', serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--white);
          text-decoration: none;
        }

        .branding-logo span { color: var(--terra); }

        .branding-content { position: relative; }

        .branding-tag {
          display: inline-block;
          background: rgba(201,106,43,0.2);
          color: var(--terra-light);
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .branding h2 {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 700;
          color: var(--white);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }

        .branding h2 em { font-style: italic; color: var(--terra); }

        .branding p {
          font-size: 15px;
          color: rgba(255,255,255,0.55);
          font-weight: 300;
          line-height: 1.7;
          margin-bottom: 40px;
        }

        .branding-items {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .branding-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          font-weight: 400;
        }

        .branding-item-icon {
          width: 32px; height: 32px;
          background: rgba(201,106,43,0.15);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
        }

        .branding-footer {
          font-size: 12px;
          color: rgba(255,255,255,0.25);
          font-weight: 300;
        }

        @media (max-width: 768px) {
          .branding { display: none; }
        }
      `}</style>

      <div className="branding">
        <Link href="/" className="branding-logo">
          Margem<span>Pro</span>
        </Link>
        <div className="branding-content">
          <div className="branding-tag">✨ 7 dias grátis</div>
          <h2>
            Comece a ter <em>controle real</em> do seu negócio
          </h2>
          <p>
            Cadastre-se agora e acesse todos os módulos gratuitamente por 7
            dias. Sem cartão de crédito.
          </p>
          <div className="branding-items">
            {itens.map((item, i) => (
              <div key={i} className="branding-item">
                <div className="branding-item-icon">{item.icon}</div>
                {item.texto}
              </div>
            ))}
          </div>
        </div>
        <div className="branding-footer">
          © 2025 Margem Pro. Todos os direitos reservados.
        </div>
      </div>
    </>
  );
}
