// Header da página de produção — título e descrição

export default function ProducaoHeader() {
  return (
    <>
      <style>{`
        .prc-header { margin-bottom: 28px; }

        .prc-header h2 {
          font-family: 'Inter', serif;
          font-size: 26px;
          font-weight: 700;
          color: #1C1917;
          margin-bottom: 4px;
        }

        .prc-header p {
          font-size: 13px;
          color: #78716C;
          font-weight: 300;
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      <div className="prc-header">
        <h2>Planejamento de Produção</h2>
        <p>
          Informe o que vai produzir e veja a lista de ingredientes necessários
          automaticamente.
        </p>
      </div>
    </>
  );
}
