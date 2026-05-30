// Seção de funcionalidades da Landing Page — cards com os módulos da plataforma

const funcionalidades = [
  {
    icone: "🧾",
    titulo: "Precificação Inteligente",
    descricao:
      "Calcule o preço ideal de cada produto com base nos custos reais de ingredientes, energia, gás e mão de obra.",
  },
  {
    icone: "📦",
    titulo: "Controle de Estoque",
    descricao:
      "O estoque é descontado automaticamente a cada produção. Alertas de reposição antes de faltar.",
  },
  {
    icone: "🍫",
    titulo: "Cadastro de Receitas",
    descricao:
      "Monte receitas base com ingredientes cadastrados. O sistema calcula custo, rendimento e margem em tempo real.",
  },
  {
    icone: "🛍️",
    titulo: "Gestão de Pedidos",
    descricao:
      "Controle pedidos, clientes, formas de pagamento, sinal pago e data de entrega em um único lugar.",
  },
  {
    icone: "📊",
    titulo: "Dashboard Financeiro",
    descricao:
      "Veja faturamento, lucro estimado, produtos mais vendidos e clientes que mais compram.",
  },
  {
    icone: "📋",
    titulo: "Planejamento de Produção",
    descricao:
      "Informe quantas unidades vai produzir e receba a lista de ingredientes e custo estimado automaticamente.",
  },
];

export default function Features() {
  return (
    <>
      <style>{`
        .features-section {
          padding: 100px 5vw;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-tag {
          display: inline-block;
          background: var(--terra-light);
          color: var(--terra-dark);
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .section-title {
          font-family: 'Inter', serif;
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--grafite);
          margin-bottom: 12px;
        }

        .section-sub {
          font-size: 16px;
          color: var(--grafite-soft);
          font-weight: 300;
          margin-bottom: 56px;
          max-width: 480px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .feature-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
          transition: all 0.25s;
        }

        .feature-card:hover {
          border-color: var(--terra-light);
          box-shadow: 0 12px 40px rgba(201,106,43,0.1);
          transform: translateY(-2px);
        }

        .feature-icon {
          font-size: 28px;
          margin-bottom: 16px;
          display: block;
        }

        .feature-title {
          font-family: 'Inter', serif;
          font-size: 18px;
          font-weight: 600;
          color: var(--grafite);
          margin-bottom: 10px;
        }

        .feature-desc {
          font-size: 14px;
          line-height: 1.7;
          color: var(--grafite-soft);
          font-weight: 300;
        }

        @media (max-width: 768px) {
          .features-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="features-section" id="funcionalidades">
        <div className="section-tag">Funcionalidades</div>
        <h2 className="section-title">Tudo que o seu negócio precisa</h2>
        <p className="section-sub">
          Módulos integrados que trabalham juntos para simplificar sua operação
          do início ao fim.
        </p>
        <div className="features-grid">
          {funcionalidades.map((f, i) => (
            <div key={i} className="feature-card">
              <span className="feature-icon">{f.icone}</span>
              <div className="feature-title">{f.titulo}</div>
              <div className="feature-desc">{f.descricao}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
