// Header da página de ingredientes — título, busca, filtro e botão de novo ingrediente

interface Props {
  busca: string;
  categoria: string;
  total: number;
  onBusca: (v: string) => void;
  onCategoria: (v: string) => void;
  onNovo: () => void;
}

const categorias = [
  "Laticínios",
  "Açúcares",
  "Farinhas",
  "Chocolates",
  "Frutas",
  "Ovos",
  "Gorduras",
  "Embalagens",
  "Decorações",
  "Outros",
];

export default function IngredientesHeader({
  busca,
  categoria,
  total,
  onBusca,
  onCategoria,
  onNovo,
}: Props) {
  return (
    <>
      <style>{`
        .ing-header { margin-bottom: 28px; }

        .ing-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .ing-header-titulo h2 {
          font-family: 'Inter', serif;
          font-size: 26px;
          font-weight: 700;
          color: #1C1917;
          margin-bottom: 2px;
        }

        .ing-header-titulo p {
          font-size: 13px;
          color: #78716C;
          font-weight: 300;
          font-family: 'DM Sans', sans-serif;
        }

        .ing-btn-novo {
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
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ing-btn-novo:hover {
          background: #A3511E;
          transform: translateY(-1px);
        }

        .ing-filtros {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .ing-busca {
          flex: 1;
          min-width: 200px;
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

        .ing-busca:focus { border-color: #C96A2B; }

        .ing-select {
          padding: 10px 14px;
          border: 1.5px solid #E5DDD4;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1C1917;
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.2s;
          appearance: none;
          cursor: pointer;
          min-width: 160px;
        }

        .ing-select:focus { border-color: #C96A2B; }
      `}</style>

      <div className="ing-header">
        <div className="ing-header-top">
          <div className="ing-header-titulo">
            <h2>Ingredientes</h2>
            <p>
              {total} ingrediente{total !== 1 ? "s" : ""} cadastrado
              {total !== 1 ? "s" : ""}
            </p>
          </div>
          <button className="ing-btn-novo" onClick={onNovo}>
            + Novo Ingrediente
          </button>
        </div>
        <div className="ing-filtros">
          <input
            className="ing-busca"
            type="text"
            placeholder="Buscar ingrediente..."
            value={busca}
            onChange={(e) => onBusca(e.target.value)}
          />
          <select
            className="ing-select"
            value={categoria}
            onChange={(e) => onCategoria(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
