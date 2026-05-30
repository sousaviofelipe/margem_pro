// Conteúdo do guia de uso da plataforma — passo a passo para novos usuários

"use client";

import Link from "next/link";
import { useState } from "react";

const passos = [
  {
    numero: "01",
    icone: "🧂",
    titulo: "Cadastre seus Ingredientes",
    descricao:
      "O primeiro passo é cadastrar todos os ingredientes e insumos que você usa na produção. Isso é a base de todos os cálculos da plataforma.",
    dicas: [
      "Informe o preço total da embalagem e a quantidade que ela contém",
      "O sistema calcula automaticamente o custo por unidade (kg, g, ml, etc)",
      "Cadastre também embalagens, laços e itens decorativos",
      "Defina o estoque mínimo para receber alertas de reposição",
    ],
    href: "/ingredientes",
    cta: "Ir para Ingredientes",
    cor: "#C96A2B",
    bg: "#F0DDD0",
  },
  {
    numero: "02",
    icone: "📋",
    titulo: "Monte suas Receitas Base",
    descricao:
      "Com os ingredientes cadastrados, crie suas receitas intermediárias: recheios, massas, coberturas, brigadeiros e similares.",
    dicas: [
      "Adicione os ingredientes e as quantidades usadas em cada receita",
      "Informe o rendimento total (ex: 50 brigadeiros)",
      "Inclua custos de energia, gás e mão de obra",
      "Use o controle deslizante para ajustar a margem de lucro em tempo real",
    ],
    href: "/receitas",
    cta: "Ir para Receitas",
    cor: "#2563eb",
    bg: "#eff6ff",
  },
  {
    numero: "03",
    icone: "🎂",
    titulo: "Crie seus Produtos Finais",
    descricao:
      "Monte os produtos que você vende ao cliente usando as receitas base já cadastradas. Adicione embalagens e itens extras para calcular o preço ideal.",
    dicas: [
      "Combine uma ou mais receitas base em cada produto",
      "Inclua custo de embalagem, laços e toppers",
      "Ajuste a margem de lucro com o controle deslizante",
      "O sistema calcula automaticamente o preço de venda ideal",
    ],
    href: "/produtos",
    cta: "Ir para Produtos",
    cor: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    numero: "04",
    icone: "👥",
    titulo: "Cadastre seus Clientes",
    descricao:
      "Mantenha um histórico completo dos seus clientes para facilitar o gerenciamento de pedidos e o relacionamento com cada um.",
    dicas: [
      "Informe nome, WhatsApp e e-mail do cliente",
      "Use o campo de observações para alergias, preferências e endereço",
      "O histórico de pedidos e total gasto são atualizados automaticamente",
      "Use o botão de WhatsApp para contato rápido direto do card",
    ],
    href: "/clientes",
    cta: "Ir para Clientes",
    cor: "#16a34a",
    bg: "#f0fdf4",
  },
  {
    numero: "05",
    icone: "🛍️",
    titulo: "Gerencie seus Pedidos",
    descricao:
      "Registre todos os pedidos com cliente, produtos, forma de pagamento, sinal pago e data de entrega. Acompanhe o status de cada pedido em tempo real.",
    dicas: [
      "Selecione o cliente e adicione os produtos do pedido",
      "Registre o sinal pago para controlar o valor pendente",
      "Avance o status do pedido com um clique: Pendente → Em produção → Pronto → Entregue",
      "Filtre pedidos por status para ver o que está em aberto",
    ],
    href: "/pedidos",
    cta: "Ir para Pedidos",
    cor: "#d97706",
    bg: "#fffbeb",
  },
  {
    numero: "06",
    icone: "📦",
    titulo: "Controle seu Estoque",
    descricao:
      "Acompanhe o nível de estoque de cada ingrediente. Receba alertas quando o estoque estiver baixo e faça ajustes manuais quando necessário.",
    dicas: [
      "O estoque é descontado automaticamente ao executar uma produção",
      "Use entrada para registrar compras de ingredientes",
      "Use ajuste manual para corrigir diferenças por perda ou desperdício",
      "Itens com estoque baixo ou zerado aparecem destacados em amarelo e vermelho",
    ],
    href: "/estoque",
    cta: "Ir para Estoque",
    cor: "#dc2626",
    bg: "#fef2f2",
  },
  {
    numero: "07",
    icone: "⚙️",
    titulo: "Planeje sua Produção",
    descricao:
      "Informe o que vai produzir e em que quantidade. O sistema gera automaticamente a lista de ingredientes necessários e verifica o estoque disponível.",
    dicas: [
      "Selecione as receitas e informe a quantidade de cada uma",
      "O sistema verifica automaticamente o que tem em estoque",
      "Itens que faltam aparecem na lista de compras com custo estimado",
      "Compartilhe a lista de compras diretamente pelo WhatsApp",
    ],
    href: "/producao",
    cta: "Ir para Produção",
    cor: "#0891b2",
    bg: "#ecfeff",
  },
  {
    numero: "08",
    icone: "💰",
    titulo: "Acompanhe o Financeiro",
    descricao:
      "Visualize o faturamento mensal, valores recebidos, pendências e o fluxo anual do seu negócio em um painel completo.",
    dicas: [
      "Filtre por mês e ano para ver períodos específicos",
      "O gráfico de barras mostra faturado vs recebido por mês",
      'A seção "A Receber" lista todos os pedidos com valores pendentes',
      "O ticket médio é calculado automaticamente com base nos pedidos",
    ],
    href: "/financeiro",
    cta: "Ir para Financeiro",
    cor: "#C96A2B",
    bg: "#F0DDD0",
  },
];

const perguntas = [
  {
    pergunta: "Qual a ordem certa para começar a usar a plataforma?",
    resposta:
      "Siga a ordem do guia: primeiro cadastre os Ingredientes, depois monte as Receitas Base, depois crie os Produtos Finais. Com produtos cadastrados você já pode criar Pedidos e acompanhar o Financeiro.",
  },
  {
    pergunta: "O estoque desconta automaticamente?",
    resposta:
      "Sim! Ao executar um plano de produção no módulo Produção, o estoque de todos os ingredientes utilizados é descontado automaticamente. Você também pode ajustar manualmente no módulo Estoque.",
  },
  {
    pergunta: "Como funciona o cálculo de preço sugerido?",
    resposta:
      "O sistema soma os custos de ingredientes, energia, gás e mão de obra para calcular o custo total. Depois aplica a margem de lucro que você definir para chegar ao preço de venda ideal.",
  },
  {
    pergunta: "Posso usar a plataforma no celular?",
    resposta:
      "Sim! A plataforma é um PWA (Progressive Web App) totalmente responsivo. Você pode usá-la no celular pelo navegador ou instalar como aplicativo na tela inicial do seu smartphone.",
  },
  {
    pergunta: "O que acontece quando o período de teste terminar?",
    resposta:
      "Após os 7 dias de teste você escolhe o plano que melhor se encaixa no seu negócio. Seus dados ficam salvos e você não perde nada do que cadastrou.",
  },
  {
    pergunta: "Como compartilhar a lista de compras pelo WhatsApp?",
    resposta:
      'No módulo de Produção, após calcular o plano de produção, clique no botão "Lista no WhatsApp". A mensagem com todos os ingredientes que precisam ser comprados será aberta automaticamente no WhatsApp.',
  },
];

export default function GuiaContent() {
  const [faqAberto, setFaqAberto] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .guia-page {
          font-family: 'DM Sans', sans-serif;
          color: #1C1917;
          max-width: 860px;
        }

        .guia-hero {
          margin-bottom: 40px;
        }

        .guia-hero h2 {
          font-size: 24px;
          font-weight: 700;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 8px;
        }

        .guia-hero p {
          font-size: 14px;
          color: #78716C;
          font-weight: 300;
          line-height: 1.7;
          max-width: 560px;
        }

        .guia-progresso {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .guia-step-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          background: #F3EFE9;
          color: #78716C;
          flex-shrink: 0;
        }

        .guia-step-linha {
          flex: 1;
          height: 2px;
          background: #E5DDD4;
          border-radius: 1px;
          min-width: 12px;
          max-width: 32px;
        }

        .guia-secao-titulo {
          font-size: 13px;
          font-weight: 700;
          color: #78716C;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 20px;
          margin-top: 8px;
        }

        .guia-passos {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 48px;
        }

        .guia-passo {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 16px;
          padding: 24px;
          transition: box-shadow 0.2s;
        }

        .guia-passo:hover {
          box-shadow: 0 4px 20px rgba(28,25,23,0.06);
        }

        .guia-passo-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
        }

        .guia-passo-numero {
          font-size: 11px;
          font-weight: 700;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.06em;
          background: #FAF8F5;
          border: 1px solid #E5DDD4;
          border-radius: 6px;
          padding: 3px 8px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .guia-passo-icone {
          font-size: 28px;
          flex-shrink: 0;
          line-height: 1;
        }

        .guia-passo-info { flex: 1; }

        .guia-passo-titulo {
          font-size: 17px;
          font-weight: 700;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 6px;
        }

        .guia-passo-descricao {
          font-size: 13px;
          color: #78716C;
          font-weight: 300;
          line-height: 1.7;
        }

        .guia-dicas {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
          padding: 14px 16px;
          background: #FAF8F5;
          border-radius: 10px;
        }

        .guia-dica {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: #44403C;
          font-weight: 400;
          line-height: 1.6;
          font-family: 'DM Sans', sans-serif;
        }

        .guia-dica-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 6px;
        }

        .guia-passo-footer {
          display: flex;
          justify-content: flex-end;
        }

        .guia-btn-ir {
          padding: 8px 18px;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #FFFFFF;
        }

        .guia-btn-ir:hover { opacity: 0.85; transform: translateY(-1px); }

        .guia-faq {
          margin-bottom: 48px;
        }

        .guia-faq-lista {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .guia-faq-item {
          background: #FFFFFF;
          border: 1px solid #E5DDD4;
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .guia-faq-item.aberto { border-color: #C96A2B40; }

        .guia-faq-pergunta {
          width: 100%;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s;
        }

        .guia-faq-pergunta:hover { background: #FAF8F5; }

        .guia-faq-pergunta-texto {
          font-size: 14px;
          font-weight: 600;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.4;
        }

        .guia-faq-icone {
          font-size: 18px;
          color: #C96A2B;
          flex-shrink: 0;
          transition: transform 0.2s;
        }

        .guia-faq-icone.aberto { transform: rotate(45deg); }

        .guia-faq-resposta {
          padding: 0 20px 16px;
          font-size: 13px;
          color: #78716C;
          font-weight: 300;
          line-height: 1.7;
          font-family: 'DM Sans', sans-serif;
        }

        .guia-cta {
          background: #1C1917;
          border-radius: 16px;
          padding: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .guia-cta-texto h3 {
          font-size: 18px;
          font-weight: 700;
          color: #FFFFFF;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 6px;
        }

        .guia-cta-texto p {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          font-weight: 300;
        }

        .guia-cta-btn {
          padding: 12px 24px;
          background: #C96A2B;
          color: #FFFFFF;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          transition: background 0.2s;
          white-space: nowrap;
        }

        .guia-cta-btn:hover { background: #A3511E; }
      `}</style>

      <div className="guia-page">
        <div className="guia-hero">
          <h2>📖 Guia de Uso</h2>
          <p>
            Aprenda a usar a Margem Pro do zero. Siga os passos abaixo na ordem
            sugerida para configurar seu negócio corretamente e aproveitar ao
            máximo a plataforma.
          </p>
          <div className="guia-progresso">
            {passos.map((passo, i) => (
              <div
                key={passo.numero}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  className="guia-step-dot"
                  style={{ background: passo.bg, color: passo.cor }}
                >
                  {passo.numero}
                </div>
                {i < passos.length - 1 && <div className="guia-step-linha" />}
              </div>
            ))}
          </div>
        </div>

        <div className="guia-secao-titulo">Passo a passo</div>

        <div className="guia-passos">
          {passos.map((passo) => (
            <div key={passo.numero} className="guia-passo">
              <div className="guia-passo-header">
                <div className="guia-passo-numero">PASSO {passo.numero}</div>
                <div className="guia-passo-icone">{passo.icone}</div>
                <div className="guia-passo-info">
                  <div className="guia-passo-titulo">{passo.titulo}</div>
                  <div className="guia-passo-descricao">{passo.descricao}</div>
                </div>
              </div>

              <div className="guia-dicas">
                {passo.dicas.map((dica, i) => (
                  <div key={i} className="guia-dica">
                    <div
                      className="guia-dica-dot"
                      style={{ background: passo.cor }}
                    />
                    {dica}
                  </div>
                ))}
              </div>

              <div className="guia-passo-footer">
                <Link
                  href={passo.href}
                  className="guia-btn-ir"
                  style={{ background: passo.cor }}
                >
                  {passo.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="guia-secao-titulo">Perguntas frequentes</div>

        <div className="guia-faq">
          <div className="guia-faq-lista">
            {perguntas.map((item, i) => (
              <div
                key={i}
                className={`guia-faq-item ${faqAberto === i ? "aberto" : ""}`}
              >
                <button
                  className="guia-faq-pergunta"
                  onClick={() => setFaqAberto(faqAberto === i ? null : i)}
                >
                  <span className="guia-faq-pergunta-texto">
                    {item.pergunta}
                  </span>
                  <span
                    className={`guia-faq-icone ${faqAberto === i ? "aberto" : ""}`}
                  >
                    +
                  </span>
                </button>
                {faqAberto === i && (
                  <div className="guia-faq-resposta">{item.resposta}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="guia-cta">
          <div className="guia-cta-texto">
            <h3>Precisa de ajuda personalizada?</h3>
            <p>Entre em contato pelo WhatsApp e tire todas as suas dúvidas.</p>
          </div>
          <a
            href="https://wa.me/5583986177733"
            target="_blank"
            rel="noopener noreferrer"
            className="guia-cta-btn"
          >
            💬 Falar no WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
