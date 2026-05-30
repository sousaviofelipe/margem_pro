// Seção de estatísticas da Landing Page — números de impacto sobre a plataforma

const stats = [
  { valor: "3x", label: "mais rápido para precificar" },
  { valor: "100%", label: "controle do seu negócio" },
  { valor: "0", label: "planilhas necessárias" },
  { valor: "7 dias", label: "grátis para testar" },
];

export default function Stats() {
  return (
    <>
      <style>{`
        .stats-section {
          background: var(--grafite);
          padding: 56px 5vw;
        }

        .stats-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          text-align: center;
        }

        .stat-valor {
          font-family: 'Inter', serif;
          font-size: 40px;
          font-weight: 700;
          color: var(--terra);
          display: block;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }
      `}</style>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i}>
              <span className="stat-valor">{s.valor}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
