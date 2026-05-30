// Regras de negócio dos ingredientes — consome apenas a interface IIngredientesRepository

import type {
  IIngredientesRepository,
  Ingrediente,
  IngredienteInput,
} from "@/lib/db/interfaces/IIngredientesRepository";
import { IngredientesRepository } from "@/lib/db/supabase/ingredientesRepository";

const repository: IIngredientesRepository = new IngredientesRepository();

export async function listarIngredientes(
  userId: string,
): Promise<Ingrediente[]> {
  return repository.listar(userId);
}

export async function criarIngrediente(
  userId: string,
  dados: IngredienteInput,
): Promise<Ingrediente> {
  if (!dados.nome.trim()) throw new Error("Nome do ingrediente é obrigatório.");
  if (dados.preco_total < 0) throw new Error("Preço não pode ser negativo.");
  if (dados.quantidade_total <= 0)
    throw new Error("Quantidade deve ser maior que zero.");
  return repository.criar(userId, dados);
}

export async function atualizarIngrediente(
  id: string,
  userId: string,
  dados: Partial<IngredienteInput>,
): Promise<Ingrediente> {
  return repository.atualizar(id, userId, dados);
}

export async function deletarIngrediente(
  id: string,
  userId: string,
): Promise<void> {
  return repository.deletar(id, userId);
}

export function estoqueStatus(
  ingrediente: Ingrediente,
): "ok" | "baixo" | "zerado" {
  if (ingrediente.estoque_atual <= 0) return "zerado";
  if (ingrediente.estoque_atual <= ingrediente.estoque_minimo) return "baixo";
  return "ok";
}

export const categorias = [
  "Laticínios",
  "Açúcares",
  "Farinhas",
  "Chocolates",
  "Frutas",
  "Ovos",
  "Gorduras",
  "Embalagens",
  "Decorações",
  "Outros",
];

export const unidades = ["kg", "g", "L", "ml", "un", "cx", "pct"];
