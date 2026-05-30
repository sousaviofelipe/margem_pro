// Helper de limites por plano — define o que cada plano pode acessar na Margem Pro

export type Plano = "trial" | "pro" | "pro_max";

export const PLANO_LIMITES = {
  trial: {
    ingredientes: null,
    receitas: null,
    produtos: null,
    clientes: null,
    pedidos: null,
    estoque: true,
    producao: true,
    financeiro: true,
  },
  pro: {
    ingredientes: null,
    receitas: null,
    produtos: null,
    clientes: null,
    pedidos: null,
    estoque: false,
    producao: false,
    financeiro: true,
  },
  pro_max: {
    ingredientes: null,
    receitas: null,
    produtos: null,
    clientes: null,
    pedidos: null,
    estoque: true,
    producao: true,
    financeiro: true,
  },
};

export function temAcesso(
  plano: Plano,
  modulo: keyof typeof PLANO_LIMITES.trial,
): boolean {
  const limites = PLANO_LIMITES[plano];
  const valor = limites[modulo];
  if (typeof valor === "boolean") return valor;
  return true;
}

export const PLANO_INFO = {
  trial: {
    label: "Teste Grátis",
    cor: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
  },
  pro: {
    label: "Pro",
    cor: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
  pro_max: {
    label: "Pro Max",
    cor: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
};
