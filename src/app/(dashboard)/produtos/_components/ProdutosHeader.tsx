// Header da página de produtos — título, busca e botão de novo produto

interface Props {
  busca: string;
  total: number;
  onBusca: (v: string) => void;
  onNovo: () => void;
}

export default function ProdutosHeader({
  busca,
  total,
  onBusca,
  onNovo,
}: Props) {
  return (
    <>
      <style>{`
        .prod-header { margin-bottom: 28px; }

        .prod-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .prod-header-titulo h2 {
          font-family: 'Inter', serif;
          font-size: 26px;
          font-weight: 700;
          color: #1C1917;
          margin-bottom: 2px;
        }

        .prod-header-titulo p {
          font-size: 13px;
          color: #78716C;
          font-weight: 300;
          font-family: 'DM Sans', sans-serif;
        }

        .prod-btn-novo {
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

        .prod-btn-novo:hover { background: #A3511E; transform: translateY(-1px); }

        .prod-busca {
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

        .prod-busca:focus { border-color: #C96A2B; }
      `}</style>

      <div className="prod-header">
        <div className="prod-header-top">
          <div className="prod-header-titulo">
            <h2>Produtos Finais</h2>
            <p>
              {total} produto{total !== 1 ? "s" : ""} cadastrado
              {total !== 1 ? "s" : ""}
            </p>
          </div>
          <button className="prod-btn-novo" onClick={onNovo}>
            + Novo Produto
          </button>
        </div>
        <input
          className="prod-busca"
          type="text"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => onBusca(e.target.value)}
        />
      </div>
    </>
  );
}
