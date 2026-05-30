// Lista de ingredientes necessários e botão de compartilhar via WhatsApp

import type { PlanoProducao } from "@/lib/db/interfaces/IProducaoRepository";
import { gerarMensagemWhatsApp } from "@/services/producaoService";

interface Props {
  plano: PlanoProducao;
  executando: boolean;
  onExecutar: () => void;
}

export default function ListaCompras({ plano, executando, onExecutar }: Props) {
  const totalCompras = plano.ingredientes_necessarios.reduce(
    (acc, i) => acc + i.custo_estimado,
    0,
  );
  const precisaComprar = plano.ingredientes_necessarios.filter(
    (i) => !i.estoque_suficiente,
  );
  const temEstoque = plano.ingredientes_necessarios.filter(
    (i) => i.estoque_suficiente,
  );

  function compartilharWhatsApp() {
    const msg = gerarMensagemWhatsApp(plano);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  }

  return (
    <>
      <style>{`
        .lista-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 20px;
        }

        .lista-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .lista-titulo {
          font-family: 'Inter', serif;
          font-size: 18px;
          font-weight: 700;
          color: #1C1917;
        }

        .lista-pode-badge {
          padding: 4px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
        }

        .lista-secao {
          margin-bottom: 20px;
        }

        .lista-secao-titulo {
          font-size: 12px;
          font-weight: 700;
          color: #78716C;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 10px;
          padding-bottom: 4px;
          border-bottom: 1px solid #F3EFE9;
        }

        .lista-itens { display: flex; flex-direction: column; gap: 8px; }

        .lista-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid #E5DDD4;
        }

        .lista-item.comprar { background: #fef2f2; border-color: #fecaca; }
        .lista-item.ok { background: #f0fdf4; border-color: #bbf7d0; }

        .lista-item-nome {
          font-size: 13px;
          font-weight: 600;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
        }

        .lista-item-qtd {
          font-size: 11px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          margin-top: 2px;
        }

        .lista-item-direita {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }

        .lista-item-custo {
          font-size: 13px;
          font-weight: 700;
          color: #dc2626;
          font-family: 'DM Sans', sans-serif;
        }

        .lista-item-estoque {
          font-size: 11px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .lista-resumo {
          background: #FAF8F5;
          border: 1px solid #E5DDD4;
          border-radius: 12px;
          padding: 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }

        .lista-resumo-item { text-align: center; }

        .lista-resumo-label {
          font-size: 11px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 4px;
        }

        .lista-resumo-valor {
          font-family: 'Inter', serif;
          font-size: 20px;
          font-weight: 700;
          color: #1C1917;
        }

        .lista-resumo-valor.terra { color: #C96A2B; }
        .lista-resumo-valor.vermelho { color: #dc2626; }

        .lista-acoes {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .lista-btn-wpp {
          flex: 1;
          padding: 12px;
          background: #16a34a;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .lista-btn-wpp:hover { background: #15803d; }

        .lista-btn-executar {
          flex: 2;
          padding: 12px;
          background: #C96A2B;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
        }

        .lista-btn-executar:hover:not(:disabled) { background: #A3511E; }
        .lista-btn-executar:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div className="lista-card">
        <div className="lista-header">
          <h3 className="lista-titulo">Ingredientes Necessários</h3>
          <div
            className="lista-pode-badge"
            style={
              plano.pode_produzir
                ? { background: "#f0fdf4", color: "#16a34a" }
                : { background: "#fef2f2", color: "#dc2626" }
            }
          >
            {plano.pode_produzir ? "✅ Pode produzir" : "⚠️ Precisa comprar"}
          </div>
        </div>

        {precisaComprar.length > 0 && (
          <div className="lista-secao">
            <div className="lista-secao-titulo">
              🛒 Precisa comprar ({precisaComprar.length})
            </div>
            <div className="lista-itens">
              {precisaComprar.map((item) => (
                <div key={item.ingrediente_id} className="lista-item comprar">
                  <div>
                    <div className="lista-item-nome">
                      {item.ingrediente_nome}
                    </div>
                    <div className="lista-item-qtd">
                      Precisa: {item.quantidade_necessaria.toFixed(3)}{" "}
                      {item.unidade_medida} · Tem:{" "}
                      {item.estoque_atual.toFixed(3)}
                    </div>
                  </div>
                  <div className="lista-item-direita">
                    <div className="lista-item-custo">
                      {item.custo_estimado.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                    <div className="lista-item-estoque">
                      Comprar: {item.quantidade_comprar.toFixed(3)}{" "}
                      {item.unidade_medida}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {temEstoque.length > 0 && (
          <div className="lista-secao">
            <div className="lista-secao-titulo">
              ✅ Em estoque ({temEstoque.length})
            </div>
            <div className="lista-itens">
              {temEstoque.map((item) => (
                <div key={item.ingrediente_id} className="lista-item ok">
                  <div>
                    <div className="lista-item-nome">
                      {item.ingrediente_nome}
                    </div>
                    <div className="lista-item-qtd">
                      Precisa: {item.quantidade_necessaria.toFixed(3)}{" "}
                      {item.unidade_medida} · Tem:{" "}
                      {item.estoque_atual.toFixed(3)}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#16a34a",
                      fontFamily: "DM Sans, sans-serif",
                    }}
                  >
                    ✓
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="lista-resumo">
          <div className="lista-resumo-item">
            <div className="lista-resumo-label">Custo de produção</div>
            <div className="lista-resumo-valor terra">
              {plano.custo_total_estimado.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
          <div className="lista-resumo-item">
            <div className="lista-resumo-label">Custo de compras</div>
            <div className="lista-resumo-valor vermelho">
              {totalCompras.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
        </div>

        <div className="lista-acoes">
          {precisaComprar.length > 0 && (
            <button className="lista-btn-wpp" onClick={compartilharWhatsApp}>
              💬 Lista no WhatsApp
            </button>
          )}
          <button
            className="lista-btn-executar"
            onClick={onExecutar}
            disabled={executando}
          >
            {executando
              ? "Executando..."
              : "⚙️ Executar Produção e Descontar Estoque"}
          </button>
        </div>
      </div>
    </>
  );
}
