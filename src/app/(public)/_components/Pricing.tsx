// Seção de planos e preços da Landing Page

import Link from "next/link";

const plans = [
  {
    name: "Teste Grátis",
    price: "R$ 0",
    period: "7 dias",
    description: "Experimente tudo sem compromisso",
    features: [
      "Todos os módulos liberados",
      "Ingredientes e receitas",
      "Produtos e estoque",
      "Pedidos e clientes",
      "Painel financeiro",
    ],
    cta: "Começar grátis",
    href: "/cadastro",
    highlight: false,
  },
  {
    name: "Pro",
    price: "R$ 47",
    period: "por mês",
    description: "Para quem está começando a escalar",
    features: [
      "Ingredientes e receitas",
      "Produtos finais",
      "Pedidos e clientes",
      "Painel financeiro",
      "Sem estoque e produção",
    ],
    cta: "Assinar Pro",
    href: "/cadastro",
    highlight: false,
  },
  {
    name: "Pro Max",
    price: "R$ 79",
    period: "por mês",
    description: "Acesso completo à plataforma",
    features: [
      "Tudo do plano Pro",
      "Controle de estoque",
      "Planejamento de produção",
      "Lista de compras via WhatsApp",
      "Previsão de reposição",
    ],
    cta: "Assinar Pro Max",
    href: "/cadastro",
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-24 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="inline-block text-xs font-sans font-medium text-[#C96A2B] bg-[#C96A2B]/10 px-3 py-1 rounded-full mb-4">
            Planos
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[#1C1917] leading-tight tracking-tight">
            Simples e transparente
          </h2>
          <p className="mt-4 text-[#1C1917]/50 font-sans">
            Comece grátis e evolua conforme seu negócio cresce
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border flex flex-col ${
                plan.highlight
                  ? "bg-[#C96A2B] border-[#C96A2B] text-white"
                  : "bg-white border-[#E2DDD8] text-[#1C1917]"
              }`}
            >
              <div className="mb-6">
                <p
                  className={`text-xs font-sans font-medium mb-2 ${plan.highlight ? "text-white/70" : "text-[#C96A2B]"}`}
                >
                  {plan.name}
                </p>
                <div className="flex items-end gap-1">
                  <span className="font-display text-4xl">{plan.price}</span>
                  <span
                    className={`text-sm font-sans mb-1 ${plan.highlight ? "text-white/60" : "text-[#1C1917]/40"}`}
                  >
                    /{plan.period}
                  </span>
                </div>
                <p
                  className={`text-sm font-sans mt-2 ${plan.highlight ? "text-white/70" : "text-[#1C1917]/50"}`}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm font-sans"
                  >
                    <span
                      className={
                        plan.highlight ? "text-white/80" : "text-[#C96A2B]"
                      }
                    >
                      ✓
                    </span>
                    <span
                      className={
                        plan.highlight ? "text-white/80" : "text-[#1C1917]/70"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`text-center py-3 rounded-xl text-sm font-sans font-medium transition ${
                  plan.highlight
                    ? "bg-white text-[#C96A2B] hover:bg-[#FAF8F5]"
                    : "bg-[#C96A2B] text-white hover:bg-[#A0521F]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
