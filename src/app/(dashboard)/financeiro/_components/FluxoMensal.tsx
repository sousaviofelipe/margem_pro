// Gráfico de barras do fluxo mensal — faturamento e recebido por mês

import type { FluxoMes } from "@/lib/db/interfaces/IFinanceiroRepository";

interface Props {
  fluxo: FluxoMes[];
}

export default function FluxoMensal({ fluxo }: Props) {
  const maiorValor = Math.max(
    ...fluxo.map((f) => Math.max(f.faturado, f.recebido)),
    1,
  );

  return (
    <>
      <style>{`
        .fluxo-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 20px;
        }

        .fluxo-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .fluxo-titulo {
          font-family: 'Inter', serif;
          font-size: 18px;
          font-weight: 700;
          color: #1C1917;
        }

        .fluxo-legenda {
          display: flex;
          gap: 16px;
        }

        .fluxo-legenda-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
        }

        .fluxo-legenda-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
        }

        .fluxo-grafico {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 180px;
        }

        .fluxo-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          height: 100%;
          justify-content: flex-end;
        }

        .fluxo-barras {
          display: flex;
          gap: 3px;
          align-items: flex-end;
          width: 100%;
          justify-content: center;
        }

        .fluxo-barra {
          width: 10px;
          border-radius: 4px 4px 0 0;
          transition: height 0.5s ease;
          min-height: 2px;
        }

        .fluxo-mes-label {
          font-size: 10px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          white-space: nowrap;
        }

        .fluxo-tooltip {
          font-size: 11px;
          color: #44403C;
          font-family: 'DM Sans', sans-serif;
          text-align: center;
          margin-bottom: 4px;
        }
      `}</style>

      <div className="fluxo-card">
        <div className="fluxo-card-header">
          <h3 className="fluxo-titulo">Fluxo Anual</h3>
          <div className="fluxo-legenda">
            <div className="fluxo-legenda-item">
              <div
                className="fluxo-legenda-dot"
                style={{ background: "#C96A2B" }}
              />
              Faturado
            </div>
            <div className="fluxo-legenda-item">
              <div
                className="fluxo-legenda-dot"
                style={{ background: "#16a34a" }}
              />
              Recebido
            </div>
          </div>
        </div>

        <div className="fluxo-grafico">
          {fluxo.map((f, i) => (
            <div key={i} className="fluxo-col">
              {f.pedidos > 0 && (
                <div className="fluxo-tooltip">{f.pedidos}p</div>
              )}
              <div className="fluxo-barras">
                <div
                  className="fluxo-barra"
                  style={{
                    height: `${Math.max((f.faturado / maiorValor) * 140, 2)}px`,
                    background: "#C96A2B",
                  }}
                  title={`Faturado: ${f.faturado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
                />
                <div
                  className="fluxo-barra"
                  style={{
                    height: `${Math.max((f.recebido / maiorValor) * 140, 2)}px`,
                    background: "#16a34a",
                  }}
                  title={`Recebido: ${f.recebido.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
                />
              </div>
              <div className="fluxo-mes-label">{f.mes}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
