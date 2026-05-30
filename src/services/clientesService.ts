// Regras de negócio dos clientes — consome apenas a interface IClientesRepository

import type {
  IClientesRepository,
  Cliente,
  ClienteInput,
} from "@/lib/db/interfaces/IClientesRepository";
import { ClientesRepository } from "@/lib/db/supabase/clientesRepository";

const repository: IClientesRepository = new ClientesRepository();

export async function listarClientes(userId: string): Promise<Cliente[]> {
  return repository.listar(userId);
}

export async function criarCliente(
  userId: string,
  dados: ClienteInput,
): Promise<Cliente> {
  if (!dados.nome.trim()) throw new Error("Nome do cliente é obrigatório.");
  return repository.criar(userId, dados);
}

export async function atualizarCliente(
  id: string,
  userId: string,
  dados: Partial<ClienteInput>,
): Promise<Cliente> {
  return repository.atualizar(id, userId, dados);
}

export async function deletarCliente(
  id: string,
  userId: string,
): Promise<void> {
  return repository.deletar(id, userId);
}

export function inicialNome(nome: string): string {
  return nome.trim().charAt(0).toUpperCase();
}

export function formatarTelefone(telefone: string): string {
  const nums = telefone.replace(/\D/g, "");
  if (nums.length === 11)
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
  if (nums.length === 10)
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 6)}-${nums.slice(6)}`;
  return telefone;
}
