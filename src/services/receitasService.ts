// Regras de negócio das receitas — consome apenas a interface IReceitasRepository

import type {
  IReceitasRepository,
  Receita,
  ReceitaInput,
  ReceitaIngrediente,
} from "@/lib/db/interfaces/IReceitasRepository";
import { ReceitasRepository } from "@/lib/db/supabase/receitasRepository";
import type { Ingrediente } from "@/lib/db/interfaces/IIngredientesRepository";

const repository: IReceitasRepository = new ReceitasRepository();

export async function listarReceitas(userId: string): Promise<Receita[]> {
  return repository.listar(userId);
}

export async function criarReceita(
  userId: string,
  dados: ReceitaInput,
): Promise<Receita> {
  if (!dados.nome.trim()) throw new Error("Nome da receita é obrigatório.");
  if (dados.rendimento <= 0)
    throw new Error("Rendimento deve ser maior que zero.");
  return repository.criar(userId, dados);
}

export async function atualizarReceita(
  id: string,
  userId: string,
  dados: ReceitaInput,
): Promise<Receita> {
  if (!dados.nome.trim()) throw new Error("Nome da receita é obrigatório.");
  return repository.atualizar(id, userId, dados);
}

export async function deletarReceita(
  id: string,
  userId: string,
): Promise<void> {
  return repository.deletar(id, userId);
}

export function calcularCustoIngrediente(
  ingrediente: Ingrediente,
  quantidade: number,
): number {
  const custoPorUnidade =
    ingrediente.quantidade_total > 0
      ? ingrediente.preco_total / ingrediente.quantidade_total
      : 0;
  return custoPorUnidade * quantidade;
}

export function montarIngredienteReceita(
  ingrediente: Ingrediente,
  quantidade: number,
): ReceitaIngrediente {
  return {
    ingrediente_id: ingrediente.id,
    ingrediente_nome: ingrediente.nome,
    quantidade,
    unidade_medida: ingrediente.unidade_medida,
    custo: calcularCustoIngrediente(ingrediente, quantidade),
  };
}

export const unidadesRendimento = [
  "un",
  "kg",
  "g",
  "L",
  "ml",
  "fatia",
  "porção",
];
