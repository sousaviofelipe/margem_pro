// Header da página financeira — título e seletor de mês/ano

import { meses } from "@/services/financeiroService";

interface Props {
  mes: number;
  ano: number;
  onMes: (mes: number) => void;
  onAno: (ano: number) => void;
  onAtualizar: () => void;
}

const anos = [2023, 2024, 2025, 2026];

export default function FinanceiroHeader({
  mes,
  ano,
  onMes,
  onAno,
  onAtualizar,
}: Props) {
  return (
    <>
      <style>{`
        .fin-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .fin-header-titulo h2 {
          font-family: 'Inter', serif;
          font-size: 26px;
          font-weight: 700;
          color: #1C1917;
          margin-bottom: 2px;
        }

        .fin-header-titulo p {
          font-size: 13px;
          color: #78716C;
          font-weight: 300;
          font-family: 'DM Sans', sans-serif;
        }

        .fin-header-filtros {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .fin-select {
          padding: 9px 14px;
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
        }

        .fin-select:focus { border-color: #C96A2B; }

        .fin-btn-atualizar {
          padding: 9px 18px;
          background: #C96A2B;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
        }

        .fin-btn-atualizar:hover { background: #A3511E; }
      `}</style>

      <div className="fin-header">
        <div className="fin-header-titulo">
          <h2>Financeiro</h2>
          <p>Visão geral das suas finanças</p>
        </div>
        <div className="fin-header-filtros">
          <select
            className="fin-select"
            value={mes}
            onChange={(e) => onMes(parseInt(e.target.value))}
          >
            {meses.map((m, i) => (
              <option key={i} value={i}>
                {m}
              </option>
            ))}
          </select>
          <select
            className="fin-select"
            value={ano}
            onChange={(e) => onAno(parseInt(e.target.value))}
          >
            {anos.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <button className="fin-btn-atualizar" onClick={onAtualizar}>
            Atualizar
          </button>
        </div>
      </div>
    </>
  );
}
