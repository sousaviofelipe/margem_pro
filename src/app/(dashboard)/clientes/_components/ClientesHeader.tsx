// Header da página de clientes — título, busca e botão de novo cliente

interface Props {
  busca: string;
  total: number;
  onBusca: (v: string) => void;
  onNovo: () => void;
}

export default function ClientesHeader({
  busca,
  total,
  onBusca,
  onNovo,
}: Props) {
  return (
    <>
      <style>{`
        .cli-header { margin-bottom: 28px; }

        .cli-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .cli-header-titulo h2 {
          font-family: 'Inter', serif;
          font-size: 26px;
          font-weight: 700;
          color: #1C1917;
          margin-bottom: 2px;
        }

        .cli-header-titulo p {
          font-size: 13px;
          color: #78716C;
          font-weight: 300;
          font-family: 'DM Sans', sans-serif;
        }

        .cli-btn-novo {
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

        .cli-btn-novo:hover { background: #A3511E; transform: translateY(-1px); }

        .cli-busca {
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

        .cli-busca:focus { border-color: #C96A2B; }
      `}</style>

      <div className="cli-header">
        <div className="cli-header-top">
          <div className="cli-header-titulo">
            <h2>Clientes</h2>
            <p>
              {total} cliente{total !== 1 ? "s" : ""} cadastrado
              {total !== 1 ? "s" : ""}
            </p>
          </div>
          <button className="cli-btn-novo" onClick={onNovo}>
            + Novo Cliente
          </button>
        </div>
        <input
          className="cli-busca"
          type="text"
          placeholder="Buscar cliente..."
          value={busca}
          onChange={(e) => onBusca(e.target.value)}
        />
      </div>
    </>
  );
}
