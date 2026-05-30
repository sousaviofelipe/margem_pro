// Card individual de receita — exibe custos, margem e ações

import type { Receita } from "@/lib/db/interfaces/IReceitasRepository";

interface Props {
  receita: Receita;
  onEditar: (receita: Receita) => void;
  onDeletar: (id: string) => void;
}

export default function ReceitaCard({ receita, onEditar, onDeletar }: Props) {
  const lucro =
    (receita.preco_sugerido ?? 0) - (receita.custo_por_unidade ?? 0);

  return (
    <>
      <style>{`
        .rec-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 20px;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .rec-card:hover {
          box-shadow: 0 4px 20px rgba(28,25,23,0.07);
          border-color: #C96A2B30;
        }

        .rec-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }

        .rec-card-nome {
          font-family: 'Inter', serif;
          font-size: 17px;
          font-weight: 700;
          color: #1C1917;
        }

        .rec-card-rendimento {
          font-size: 11px;
          color: #78716C;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          margin-top: 3px;
        }

        .rec-margem-badge {
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          background: #F0DDD0;
          color: #A3511E;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .rec-card-dados {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .rec-dado {
          background: #FAF8F5;
          border-radius: 8px;
          padding: 10px 12px;
        }

        .rec-dado-label {
          font-size: 11px;
          color: #78716C;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 3px;
        }

        .rec-dado-valor {
          font-size: 14px;
          font-weight: 700;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
        }

        .rec-dado-valor.terra { color: #C96A2B; }
        .rec-dado-valor.verde { color: #16a34a; }

        .rec-ingredientes-lista {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .rec-ing-tag {
          padding: 3px 10px;
          background: #F3EFE9;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 500;
          color: #44403C;
          font-family: 'DM Sans', sans-serif;
        }

        .rec-card-acoes {
          display: flex;
          gap: 8px;
          padding-top: 4px;
          border-top: 1px solid #F3EFE9;
        }

        .rec-btn-editar {
          flex: 1;
          padding: 8px;
          border: 1.5px solid #E5DDD4;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: #44403C;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .rec-btn-editar:hover { border-color: #C96A2B; color: #C96A2B; }

        .rec-btn-deletar {
          padding: 8px 12px;
          border: 1.5px solid #E5DDD4;
          border-radius: 8px;
          font-size: 13px;
          color: #78716C;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .rec-btn-deletar:hover { border-color: #dc2626; color: #dc2626; background: #fef2f2; }
      `}</style>

      <div className="rec-card">
        <div className="rec-card-top">
          <div>
            <div className="rec-card-nome">{receita.nome}</div>
            <div className="rec-card-rendimento">
              Rende {receita.rendimento} {receita.unidade_rendimento}
              {receita.tempo_preparo_min > 0 &&
                ` • ${receita.tempo_preparo_min} min`}
            </div>
          </div>
          <div className="rec-margem-badge">{receita.margem_lucro}% margem</div>
        </div>

        <div className="rec-card-dados">
          <div className="rec-dado">
            <div className="rec-dado-label">Custo total</div>
            <div className="rec-dado-valor terra">
              {(receita.custo_total ?? 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
          <div className="rec-dado">
            <div className="rec-dado-label">
              Custo por {receita.unidade_rendimento}
            </div>
            <div className="rec-dado-valor">
              {(receita.custo_por_unidade ?? 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
          <div className="rec-dado">
            <div className="rec-dado-label">Preço sugerido</div>
            <div className="rec-dado-valor verde">
              {(receita.preco_sugerido ?? 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
          <div className="rec-dado">
            <div className="rec-dado-label">Lucro estimado</div>
            <div className="rec-dado-valor verde">
              {lucro.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
        </div>

        {(receita.ingredientes ?? []).length > 0 && (
          <div className="rec-ingredientes-lista">
            {(receita.ingredientes ?? []).slice(0, 4).map((i, idx) => (
              <span key={idx} className="rec-ing-tag">
                {i.ingrediente_nome}
              </span>
            ))}
            {(receita.ingredientes ?? []).length > 4 && (
              <span className="rec-ing-tag">
                +{(receita.ingredientes ?? []).length - 4}
              </span>
            )}
          </div>
        )}

        <div className="rec-card-acoes">
          <button className="rec-btn-editar" onClick={() => onEditar(receita)}>
            ✏️ Editar
          </button>
          <button
            className="rec-btn-deletar"
            onClick={() => onDeletar(receita.id)}
          >
            🗑️
          </button>
        </div>
      </div>
    </>
  );
}
