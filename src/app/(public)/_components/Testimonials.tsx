// Seção de depoimentos da Landing Page — provas sociais de usuários reais

const depoimentos = [
  {
    nome: "Ana Paula",
    negocio: "Ateliê de Bolos",
    texto:
      "Antes eu precificava no chute e sempre vendia no prejuízo. Com o Margem Pro finalmente sei o custo real de cada bolo.",
    estrelas: 5,
  },
  {
    nome: "Fernanda Lima",
    negocio: "Doceria da Fê",
    texto:
      "Controlava tudo em caderno e WhatsApp. Agora tenho todos os pedidos organizados e nunca mais esqueci uma entrega.",
    estrelas: 5,
  },
  {
    nome: "Carla Souza",
    negocio: "Brigadeiros da Carla",
    texto:
      "O controle de estoque automático mudou minha vida. Sei exatamente quantas unidades consigo produzir hoje.",
    estrelas: 5,
  },
];

export default function Testimonials() {
  return (
    <>
      <style>{`
        .testimonials-section {
          padding: 100px 5vw;
          max-width: 1200px;
          margin: 0 auto;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 56px;
        }

        .testimonial-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
        }

        .stars {
          color: var(--terra);
          font-size: 14px;
          margin-bottom: 14px;
          letter-spacing: 2px;
        }

        .testimonial-text {
          font-size: 15px;
          line-height: 1.7;
          color: var(--grafite-mid);
          font-weight: 300;
          font-style: italic;
          margin-bottom: 20px;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .author-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: var(--terra-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--terra-dark);
        }

        .author-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--grafite);
        }

        .author-business {
          font-size: 12px;
          color: var(--grafite-soft);
        }

        @media (max-width: 768px) {
          .testimonials-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="testimonials-section" id="depoimentos">
        <div className="section-tag">Depoimentos</div>
        <h2 className="section-title">Quem já usa o Margem Pro</h2>
        <div className="testimonials-grid">
          {depoimentos.map((d, i) => (
            <div key={i} className="testimonial-card">
              <div className="stars">{"★".repeat(d.estrelas)}</div>
              <p className="testimonial-text">"{d.texto}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{d.nome[0]}</div>
                <div>
                  <div className="author-name">{d.nome}</div>
                  <div className="author-business">{d.negocio}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
