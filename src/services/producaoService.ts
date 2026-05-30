// Regras de negócio da produção — consome apenas a interface IProducaoRepository

import type {
  IProducaoRepository,
  ItemProducao,
  PlanoProducao,
} from "@/lib/db/interfaces/IProducaoRepository";
import { ProducaoRepository } from "@/lib/db/supabase/producaoRepository";
import type { Receita } from "@/lib/db/interfaces/IReceitasRepository";

const repository: IProducaoRepository = new ProducaoRepository();

export async function calcularPlanoProducao(
  userId: string,
  itens: ItemProducao[],
): Promise<PlanoProducao> {
  if (itens.length === 0)
    throw new Error("Adicione pelo menos uma receita ao plano.");
  return repository.calcularPlano(userId, itens);
}

export async function executarProducao(
  userId: string,
  itens: ItemProducao[],
): Promise<void> {
  return repository.executarProducao(userId, itens);
}

export function montarItemProducao(
  receita: Receita,
  quantidade: number,
): ItemProducao {
  const custo_unitario = receita.custo_total ?? 0;
  return {
    receita_id: receita.id,
    receita_nome: receita.nome,
    quantidade,
    custo_unitario,
    custo_total: custo_unitario * quantidade,
  };
}

export function gerarMensagemWhatsApp(plano: PlanoProducao): string {
  const linhas = [
    "🛒 *Lista de Compras — Margem Pro*",
    "",
    "*Ingredientes necessários:*",
    ...plano.ingredientes_necessarios
      .filter((i) => !i.estoque_suficiente)
      .map(
        (i) =>
          `• ${i.ingrediente_nome}: ${i.quantidade_comprar.toFixed(3)} ${i.unidade_medida} — ${i.custo_estimado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
      ),
    "",
    `💰 *Custo estimado de compras: ${plano.ingredientes_necessarios.reduce((acc, i) => acc + i.custo_estimado, 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}*`,
  ];
  return encodeURIComponent(linhas.join("\n"));
}
