// Componente de sino de notificações — exibe alertas de estoque baixo e zerado

"use client";

import { useEffect } from "react";
import { useNotificacoesStore } from "@/store/notificacoesStore";
import { getUser } from "@/lib/auth";
import { notificacaoConfig } from "@/services/notificacoesService";
import Link from "next/link";

export default function NotificacoesSino() {
  const {
    notificacoes,
    lidasIds,
    aberto,
    loading,
    carregar,
    marcarTodasComoLidas,
    toggleAberto,
    fechar,
  } = useNotificacoesStore();

  useEffect(() => {
    async function init() {
      const user = await getUser();
      if (user) carregar(user.id);
    }
    init();
  }, [carregar]);

  const naoLidas = notificacoes.filter((n) => !lidasIds.has(n.id));
  const count = naoLidas.length;

  return (
    <>
      <style>{`
        .sino-wrapper {
          position: relative;
        }

        .sino-btn {
          width: 36px;
          height: 36px;
          border: none;
          background: #FAF8F5;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: background 0.2s;
          position: relative;
          flex-shrink: 0;
        }

        .sino-btn:hover { background: #F0DDD0; }

        .sino-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 18px;
          height: 18px;
          background: #dc2626;
          color: #FFFFFF;
          border-radius: 50%;
          font-size: 10px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #FFFFFF;
        }

        .sino-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 320px;
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(28,25,23,0.12);
          z-index: 300;
          overflow: hidden;
        }

        .sino-dropdown-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px 12px;
          border-bottom: 1px solid #F3EFE9;
        }

        .sino-dropdown-titulo {
          font-size: 14px;
          font-weight: 700;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
        }

        .sino-marcar-btn {
          font-size: 12px;
          color: #C96A2B;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          background: none;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .sino-marcar-btn:hover { opacity: 0.7; }

        .sino-lista {
          max-height: 320px;
          overflow-y: auto;
        }

        .sino-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 18px;
          border-bottom: 1px solid #F3EFE9;
          transition: background 0.15s;
        }

        .sino-item:last-child { border-bottom: none; }
        .sino-item:hover { background: #FAF8F5; }
        .sino-item.lida { opacity: 0.5; }

        .sino-item-icone {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .sino-item-info { flex: 1; min-width: 0; }

        .sino-item-titulo {
          font-size: 13px;
          font-weight: 600;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 2px;
        }

        .sino-item-mensagem {
          font-size: 12px;
          color: #78716C;
          font-weight: 300;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.5;
        }

        .sino-vazio {
          padding: 32px 18px;
          text-align: center;
          font-size: 13px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
        }

        .sino-dropdown-footer {
          padding: 12px 18px;
          border-top: 1px solid #F3EFE9;
        }

        .sino-footer-link {
          display: block;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          color: #C96A2B;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .sino-footer-link:hover { opacity: 0.7; }

        .sino-overlay {
          position: fixed;
          inset: 0;
          z-index: 299;
        }
      `}</style>

      <div className="sino-wrapper">
        <button
          className="sino-btn"
          onClick={toggleAberto}
          aria-label="Notificações"
        >
          🔔
          {count > 0 && (
            <div className="sino-badge">{count > 9 ? "9+" : count}</div>
          )}
        </button>

        {aberto && (
          <>
            <div className="sino-overlay" onClick={fechar} />
            <div className="sino-dropdown">
              <div className="sino-dropdown-header">
                <span className="sino-dropdown-titulo">
                  Notificações {count > 0 && `(${count})`}
                </span>
                {count > 0 && (
                  <button
                    className="sino-marcar-btn"
                    onClick={marcarTodasComoLidas}
                  >
                    Marcar todas como lidas
                  </button>
                )}
              </div>

              <div className="sino-lista">
                {loading ? (
                  <div className="sino-vazio">Carregando...</div>
                ) : notificacoes.length === 0 ? (
                  <div className="sino-vazio">
                    ✅ Tudo em ordem! Sem alertas.
                  </div>
                ) : (
                  notificacoes.map((n) => {
                    const config = notificacaoConfig[n.tipo];
                    const lida = lidasIds.has(n.id);
                    return (
                      <div
                        key={n.id}
                        className={`sino-item ${lida ? "lida" : ""}`}
                      >
                        <div
                          className="sino-item-icone"
                          style={{ background: config.bg }}
                        >
                          {config.icone}
                        </div>
                        <div className="sino-item-info">
                          <div
                            className="sino-item-titulo"
                            style={{ color: config.cor }}
                          >
                            {n.titulo}
                          </div>
                          <div className="sino-item-mensagem">{n.mensagem}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="sino-dropdown-footer">
                <Link
                  href="/estoque"
                  className="sino-footer-link"
                  onClick={fechar}
                >
                  Ver controle de estoque →
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
