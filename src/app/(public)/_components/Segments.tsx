// Seção de segmentos da Landing Page — para quem é a plataforma

const segmentos = [
  "Confeitaria",
  "Doceria",
  "Bolos Personalizados",
  "Brigadeiros",
  "Salgados Artesanais",
  "Pães e Massas",
  "Marmitas",
  "Produtos Caseiros",
];

export default function Segments() {
  return (
    <>
      <style>{`
        .segments-section {
          background: var(--bg2);
          padding: 80px 5vw;
          text-align: center;
        }

        .segments-inner { max-width: 800px; margin: 0 auto; }

        .segments-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-top: 40px;
        }

        .seg-tag {
          padding: 10px 20px;
          border: 1.5px solid var(--border);
          border-radius: 100px;
          font-size: 14px;
          font-weight: 500;
          color: var(--grafite-mid);
          background: var(--white);
          transition: all 0.2s;
          cursor: default;
        }

        .seg-tag:hover {
          border-color: var(--terra);
          color: var(--terra);
          background: var(--terra-light);
        }
      `}</style>

      <section className="segments-section" id="segmentos">
        <div className="segments-inner">
          <div className="section-tag">Para quem é</div>
          <h2 className="section-title">Feito para produtores artesanais</h2>
          <p
            className="section-sub"
            style={{ margin: "12px auto 0", textAlign: "center" }}
          >
            Se você produz e vende alimentos artesanais, o Margem Pro foi criado
            para você.
          </p>
          <div className="segments-tags">
            {segmentos.map((s, i) => (
              <div key={i} className="seg-tag">
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
