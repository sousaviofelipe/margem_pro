// Implementação Supabase do repositório de produção — consome apenas o client centralizado

import { createClient } from "./client";
import type {
  IProducaoRepository,
  ItemProducao,
  PlanoProducao,
  IngredienteNecessario,
} from "../interfaces/IProducaoRepository";

export class ProducaoRepository implements IProducaoRepository {
  async calcularPlano(
    userId: string,
    itens: ItemProducao[],
  ): Promise<PlanoProducao> {
    const supabase = createClient();

    const receitaIds = itens.map((i) => i.receita_id);

    const { data: receitaIngredientes } = await supabase
      .from("receita_ingredientes")
      .select(
        "receita_id, ingrediente_id, ingrediente_nome, quantidade, unidade_medida, custo",
      )
      .in("receita_id", receitaIds);

    const { data: ingredientes } = await supabase
      .from("ingredientes")
      .select("id, estoque_atual, preco_total, quantidade_total")
      .eq("user_id", userId);

    const ingredientesMap = new Map((ingredientes ?? []).map((i) => [i.id, i]));

    const necessidadesMap = new Map<string, IngredienteNecessario>();

    for (const item of itens) {
      const ings = (receitaIngredientes ?? []).filter(
        (ri) => ri.receita_id === item.receita_id,
      );

      for (const ri of ings) {
        const qtdNecessaria = ri.quantidade * item.quantidade;
        const ingrediente = ingredientesMap.get(ri.ingrediente_id);
        const estoqueAtual = ingrediente?.estoque_atual ?? 0;
        const custoPorUnidade =
          ingrediente && ingrediente.quantidade_total > 0
            ? ingrediente.preco_total / ingrediente.quantidade_total
            : 0;

        if (necessidadesMap.has(ri.ingrediente_id)) {
          const existing = necessidadesMap.get(ri.ingrediente_id)!;
          existing.quantidade_necessaria += qtdNecessaria;
          existing.estoque_suficiente =
            estoqueAtual >= existing.quantidade_necessaria;
          existing.quantidade_comprar = Math.max(
            0,
            existing.quantidade_necessaria - estoqueAtual,
          );
          existing.custo_estimado =
            existing.quantidade_comprar * custoPorUnidade;
        } else {
          const estoque_suficiente = estoqueAtual >= qtdNecessaria;
          const quantidade_comprar = Math.max(0, qtdNecessaria - estoqueAtual);

          necessidadesMap.set(ri.ingrediente_id, {
            ingrediente_id: ri.ingrediente_id,
            ingrediente_nome: ri.ingrediente_nome,
            unidade_medida: ri.unidade_medida,
            quantidade_necessaria: qtdNecessaria,
            estoque_atual: estoqueAtual,
            estoque_suficiente,
            quantidade_comprar,
            custo_estimado: quantidade_comprar * custoPorUnidade,
          });
        }
      }
    }

    const ingredientes_necessarios = Array.from(necessidadesMap.values());
    const custo_total_estimado = itens.reduce(
      (acc, i) => acc + i.custo_total,
      0,
    );
    const pode_produzir = ingredientes_necessarios.every(
      (i) => i.estoque_suficiente,
    );

    return {
      itens,
      ingredientes_necessarios,
      custo_total_estimado,
      pode_produzir,
    };
  }

  async executarProducao(userId: string, itens: ItemProducao[]): Promise<void> {
    const supabase = createClient();

    const receitaIds = itens.map((i) => i.receita_id);

    const { data: receitaIngredientes } = await supabase
      .from("receita_ingredientes")
      .select("receita_id, ingrediente_id, quantidade")
      .in("receita_id", receitaIds);

    for (const item of itens) {
      const ings = (receitaIngredientes ?? []).filter(
        (ri) => ri.receita_id === item.receita_id,
      );

      for (const ri of ings) {
        const qtdUsada = ri.quantidade * item.quantidade;

        const { data: ingrediente } = await supabase
          .from("ingredientes")
          .select("estoque_atual")
          .eq("id", ri.ingrediente_id)
          .eq("user_id", userId)
          .single();

        if (ingrediente) {
          const novoEstoque = Math.max(0, ingrediente.estoque_atual - qtdUsada);
          await supabase
            .from("ingredientes")
            .update({
              estoque_atual: novoEstoque,
              updated_at: new Date().toISOString(),
            })
            .eq("id", ri.ingrediente_id)
            .eq("user_id", userId);
        }
      }
    }
  }
}
