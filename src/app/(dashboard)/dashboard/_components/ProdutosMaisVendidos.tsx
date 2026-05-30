// Lista de produtos mais vendidos do dashboard — recebe dados via props da page

import type { ProdutoVendido } from "@/lib/db/interfaces/IDashboardRepository";
import Link from "next/link";

interface Props {
  produtos: ProdutoVendido[];
}

export default function ProdutosMaisVendidos({ produtos }: Props) {
  const maiorQuantidade = produtos[0]?.quantidade ?? 1;

  return (
    <>
      <style>{`
        .produtos-card {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 24px;
        }

        .produtos-lista {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 20px;
        }

        .produto-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .produto-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .produto-nome {
          font-size: 14px;
          font-weight: 600;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
        }

        .produto-qtd {
          font-size: 12px;
          color: #78716C;
          font-weight: 400;
          font-family: 'DM Sans', sans-serif;
        }

        .produto-barra-bg {
          height: 6px;
          background: #F3EFE9;
          border-radius: 100px;
          overflow: hidden;
        }

        .produto-barra-fill {
          height: 100%;
          background: #C96A2B;
          border-radius: 100px;
          transition: width 0.6s ease;
        }

        .produto-receita {
          font-size: 12px;
          color: #78716C;
          font-weight: 300;
          font-family: 'DM Sans', sans-serif;
        }

        .produtos-vazio {
          text-align: center;
          padding: 32px;
          color: #78716C;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          margin-top: 20px;
        }
      `}</style>

      <div className="produtos-card">
        <div className="card-header">
          <h3 className="card-titulo">Produtos Mais Vendidos</h3>
          <Link href="/produtos" className="card-link">
            Ver todos →
          </Link>
        </div>

        {produtos.length === 0 ? (
          <div className="produtos-vazio">
            Nenhum produto vendido ainda.{" "}
            <Link href="/produtos" style={{ color: "#C96A2B" }}>
              Cadastrar produto
            </Link>
          </div>
        ) : (
          <div className="produtos-lista">
            {produtos.map((produto, i) => (
              <div key={i} className="produto-item">
                <div className="produto-top">
                  <span className="produto-nome">{produto.produto_nome}</span>
                  <span className="produto-qtd">{produto.quantidade} und.</span>
                </div>
                <div className="produto-barra-bg">
                  <div
                    className="produto-barra-fill"
                    style={{
                      width: `${(produto.quantidade / maiorQuantidade) * 100}%`,
                    }}
                  />
                </div>
                <div className="produto-receita">
                  Receita:{" "}
                  {produto.receita_total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
