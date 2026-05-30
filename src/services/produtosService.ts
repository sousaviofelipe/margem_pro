// Regras de negócio dos produtos finais — consome apenas a interface IProdutosRepository

import type {
  IProdutosRepository,
  Produto,
  ProdutoInput,
  ProdutoReceita,
} from "@/lib/db/interfaces/IProdutosRepository";
import { ProdutosRepository } from "@/lib/db/supabase/produtosRepository";
import type { Receita } from "@/lib/db/interfaces/IReceitasRepository";

const repository: IProdutosRepository = new ProdutosRepository();

export async function listarProdutos(userId: string): Promise<Produto[]> {
  return repository.listar(userId);
}

export async function criarProduto(
  userId: string,
  dados: ProdutoInput,
): Promise<Produto> {
  if (!dados.nome.trim()) throw new Error("Nome do produto é obrigatório.");
  return repository.criar(userId, dados);
}

export async function atualizarProduto(
  id: string,
  userId: string,
  dados: ProdutoInput,
): Promise<Produto> {
  if (!dados.nome.trim()) throw new Error("Nome do produto é obrigatório.");
  return repository.atualizar(id, userId, dados);
}

export async function deletarProduto(
  id: string,
  userId: string,
): Promise<void> {
  return repository.deletar(id, userId);
}

export function montarReceitaProduto(
  receita: Receita,
  quantidade: number,
): ProdutoReceita {
  const custoPorUnidade = receita.custo_por_unidade ?? 0;
  return {
    receita_id: receita.id,
    receita_nome: receita.nome,
    quantidade,
    custo: custoPorUnidade * quantidade,
  };
}

export function calcularTotais(
  receitas: ProdutoReceita[],
  custo_embalagem: number,
  custo_extras: number,
  margem_lucro: number,
) {
  const custoReceitas = receitas.reduce((acc, r) => acc + r.custo, 0);
  const custo_total = custoReceitas + custo_embalagem + custo_extras;
  const preco_venda = custo_total * (1 + margem_lucro / 100);
  const lucro_estimado = preco_venda - custo_total;
  return { custoReceitas, custo_total, preco_venda, lucro_estimado };
}
