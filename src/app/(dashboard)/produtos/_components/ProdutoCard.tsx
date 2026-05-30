// Card individual de produto final — exibe custos, preço de venda e ações

import type { Produto } from "@/lib/db/interfaces/IProdutosRepository";

interface Props {
  produto: Produto;
  onEditar: (produto: Produto) => void;
  onDeletar: (id: string) => void;
}

export default function ProdutoCard({ produto, onEditar, onDeletar }: Props) {
  return (
    <>
      <style>{`
        .prod-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 20px;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .prod-card:hover {
          box-shadow: 0 4px 20px rgba(28,25,23,0.07);
          border-color: #C96A2B30;
        }

        .prod-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }

        .prod-card-nome {
          font-family: 'Inter', serif;
          font-size: 17px;
          font-weight: 700;
          color: #1C1917;
        }

        .prod-card-desc {
          font-size: 12px;
          color: #78716C;
          font-weight: 300;
          font-family: 'DM Sans', sans-serif;
          margin-top: 3px;
          line-height: 1.4;
        }

        .prod-margem-badge {
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

        .prod-card-dados {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .prod-dado {
          background: #FAF8F5;
          border-radius: 8px;
          padding: 10px 12px;
        }

        .prod-dado-label {
          font-size: 11px;
          color: #78716C;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 3px;
        }

        .prod-dado-valor {
          font-size: 14px;
          font-weight: 700;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
        }

        .prod-dado-valor.terra { color: #C96A2B; }
        .prod-dado-valor.verde { color: #16a34a; }
        .prod-dado-valor.azul { color: #2563eb; }

        .prod-receitas-lista {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .prod-rec-tag {
          padding: 3px 10px;
          background: #F3EFE9;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 500;
          color: #44403C;
          font-family: 'DM Sans', sans-serif;
        }

        .prod-card-acoes {
          display: flex;
          gap: 8px;
          padding-top: 4px;
          border-top: 1px solid #F3EFE9;
        }

        .prod-btn-editar {
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

        .prod-btn-editar:hover { border-color: #C96A2B; color: #C96A2B; }

        .prod-btn-deletar {
          padding: 8px 12px;
          border: 1.5px solid #E5DDD4;
          border-radius: 8px;
          font-size: 13px;
          color: #78716C;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .prod-btn-deletar:hover { border-color: #dc2626; color: #dc2626; background: #fef2f2; }
      `}</style>

      <div className="prod-card">
        <div className="prod-card-top">
          <div>
            <div className="prod-card-nome">{produto.nome}</div>
            {produto.descricao && (
              <div className="prod-card-desc">{produto.descricao}</div>
            )}
          </div>
          <div className="prod-margem-badge">
            {produto.margem_lucro}% margem
          </div>
        </div>

        <div className="prod-card-dados">
          <div className="prod-dado">
            <div className="prod-dado-label">Custo total</div>
            <div className="prod-dado-valor terra">
              {produto.custo_total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
          <div className="prod-dado">
            <div className="prod-dado-label">Preço de venda</div>
            <div className="prod-dado-valor azul">
              {produto.preco_venda.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
          <div className="prod-dado">
            <div className="prod-dado-label">Lucro estimado</div>
            <div className="prod-dado-valor verde">
              {produto.lucro_estimado.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
          <div className="prod-dado">
            <div className="prod-dado-label">Embalagem + extras</div>
            <div className="prod-dado-valor">
              {(produto.custo_embalagem + produto.custo_extras).toLocaleString(
                "pt-BR",
                { style: "currency", currency: "BRL" },
              )}
            </div>
          </div>
        </div>

        {(produto.receitas ?? []).length > 0 && (
          <div className="prod-receitas-lista">
            {(produto.receitas ?? []).slice(0, 3).map((r, i) => (
              <span key={i} className="prod-rec-tag">
                {r.receita_nome}
              </span>
            ))}
            {(produto.receitas ?? []).length > 3 && (
              <span className="prod-rec-tag">
                +{(produto.receitas ?? []).length - 3}
              </span>
            )}
          </div>
        )}

        <div className="prod-card-acoes">
          <button className="prod-btn-editar" onClick={() => onEditar(produto)}>
            ✏️ Editar
          </button>
          <button
            className="prod-btn-deletar"
            onClick={() => onDeletar(produto.id)}
          >
            🗑️
          </button>
        </div>
      </div>
    </>
  );
}
