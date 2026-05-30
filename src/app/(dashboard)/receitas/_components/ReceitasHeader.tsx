// Header da página de receitas — título, busca e botão de nova receita

interface Props {
  busca: string;
  total: number;
  onBusca: (v: string) => void;
  onNova: () => void;
}

export default function ReceitasHeader({
  busca,
  total,
  onBusca,
  onNova,
}: Props) {
  return (
    <>
      <style>{`
        .rec-header { margin-bottom: 28px; }

        .rec-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .rec-header-titulo h2 {
          font-family: 'Inter', serif;
          font-size: 26px;
          font-weight: 700;
          color: #1C1917;
          margin-bottom: 2px;
        }

        .rec-header-titulo p {
          font-size: 13px;
          color: #78716C;
          font-weight: 300;
          font-family: 'DM Sans', sans-serif;
        }

        .rec-btn-novo {
          padding: 10px 20px;
          background: #C96A2B;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }

        .rec-btn-novo:hover { background: #A3511E; transform: translateY(-1px); }

        .rec-busca {
          width: 100%;
          padding: 10px 14px;
          border: 1.5px solid #E5DDD4;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1C1917;
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.2s;
        }

        .rec-busca:focus { border-color: #C96A2B; }
      `}</style>

      <div className="rec-header">
        <div className="rec-header-top">
          <div className="rec-header-titulo">
            <h2>Receitas Base</h2>
            <p>
              {total} receita{total !== 1 ? "s" : ""} cadastrada
              {total !== 1 ? "s" : ""}
            </p>
          </div>
          <button className="rec-btn-novo" onClick={onNova}>
            + Nova Receita
          </button>
        </div>
        <input
          className="rec-busca"
          type="text"
          placeholder="Buscar receita..."
          value={busca}
          onChange={(e) => onBusca(e.target.value)}
        />
      </div>
    </>
  );
}
