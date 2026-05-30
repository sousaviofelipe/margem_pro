// Card individual de cliente — exibe dados e histórico resumido

import type { Cliente } from "@/lib/db/interfaces/IClientesRepository";
import { inicialNome, formatarTelefone } from "@/services/clientesService";

interface Props {
  cliente: Cliente;
  onEditar: (cliente: Cliente) => void;
  onDeletar: (id: string) => void;
}

export default function ClienteCard({ cliente, onEditar, onDeletar }: Props) {
  return (
    <>
      <style>{`
        .cli-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 20px;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cli-card:hover {
          box-shadow: 0 4px 20px rgba(28,25,23,0.07);
          border-color: #C96A2B30;
        }

        .cli-card-top {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .cli-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: #F0DDD0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', serif;
          font-size: 18px;
          font-weight: 700;
          color: #A3511E;
          flex-shrink: 0;
        }

        .cli-card-info { flex: 1; min-width: 0; }

        .cli-card-nome {
          font-family: 'Inter', serif;
          font-size: 16px;
          font-weight: 700;
          color: #1C1917;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cli-card-contato {
          font-size: 12px;
          color: #78716C;
          font-weight: 400;
          font-family: 'DM Sans', sans-serif;
          margin-top: 2px;
        }

        .cli-card-dados {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .cli-dado {
          background: #FAF8F5;
          border-radius: 8px;
          padding: 10px 12px;
        }

        .cli-dado-label {
          font-size: 11px;
          color: #78716C;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 3px;
        }

        .cli-dado-valor {
          font-size: 14px;
          font-weight: 700;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
        }

        .cli-dado-valor.terra { color: #C96A2B; }

        .cli-obs {
          font-size: 12px;
          color: #78716C;
          font-weight: 300;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.5;
          background: #FAF8F5;
          border-radius: 8px;
          padding: 10px 12px;
        }

        .cli-card-acoes {
          display: flex;
          gap: 8px;
          padding-top: 4px;
          border-top: 1px solid #F3EFE9;
        }

        .cli-btn-editar {
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

        .cli-btn-editar:hover { border-color: #C96A2B; color: #C96A2B; }

        .cli-btn-wpp {
          padding: 8px 12px;
          border: 1.5px solid #E5DDD4;
          border-radius: 8px;
          font-size: 13px;
          color: #78716C;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        .cli-btn-wpp:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }

        .cli-btn-deletar {
          padding: 8px 12px;
          border: 1.5px solid #E5DDD4;
          border-radius: 8px;
          font-size: 13px;
          color: #78716C;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cli-btn-deletar:hover { border-color: #dc2626; color: #dc2626; background: #fef2f2; }
      `}</style>

      <div className="cli-card">
        <div className="cli-card-top">
          <div className="cli-avatar">{inicialNome(cliente.nome)}</div>
          <div className="cli-card-info">
            <div className="cli-card-nome">{cliente.nome}</div>
            <div className="cli-card-contato">
              {cliente.telefone ? formatarTelefone(cliente.telefone) : ""}
              {cliente.telefone && cliente.email ? " · " : ""}
              {cliente.email ?? ""}
            </div>
          </div>
        </div>

        <div className="cli-card-dados">
          <div className="cli-dado">
            <div className="cli-dado-label">Total de pedidos</div>
            <div className="cli-dado-valor">{cliente.total_pedidos}</div>
          </div>
          <div className="cli-dado">
            <div className="cli-dado-label">Total gasto</div>
            <div className="cli-dado-valor terra">
              {cliente.total_gasto.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
        </div>

        {cliente.observacoes && (
          <div className="cli-obs">💬 {cliente.observacoes}</div>
        )}

        <div className="cli-card-acoes">
          <button className="cli-btn-editar" onClick={() => onEditar(cliente)}>
            ✏️ Editar
          </button>
          {cliente.telefone && (
            <a
              className="cli-btn-wpp"
              href={`https://wa.me/55${cliente.telefone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬
            </a>
          )}
          <button
            className="cli-btn-deletar"
            onClick={() => onDeletar(cliente.id)}
          >
            🗑️
          </button>
        </div>
      </div>
    </>
  );
}
