// Modal de formulário para criar e editar pedidos

"use client";

import { useState, useEffect } from "react";
import type {
  Pedido,
  PedidoInput,
  ItemPedido,
  PedidoStatus,
  FormaPagamento,
} from "@/lib/db/interfaces/IPedidosRepository";
import type { Cliente } from "@/lib/db/interfaces/IClientesRepository";
import type { Produto } from "@/lib/db/interfaces/IProdutosRepository";
import {
  montarItemPedido,
  statusConfig,
  statusOrdem,
} from "@/services/pedidosService";

interface Props {
  pedido: Pedido | null;
  clientes: Cliente[];
  produtos: Produto[];
  onSalvar: (dados: PedidoInput) => Promise<void>;
  onFechar: () => void;
}

const vazio: PedidoInput = {
  cliente_nome: "",
  cliente_id: undefined,
  valor_sinal: 0,
  status: "pendente",
  forma_pagamento: "pix",
  data_entrega: "",
  observacoes: "",
  itens: [],
};

export default function PedidoForm({
  pedido,
  clientes,
  produtos,
  onSalvar,
  onFechar,
}: Props) {
  const [form, setForm] = useState<PedidoInput>(vazio);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [prodSelecionado, setProdSelecionado] = useState("");
  const [prodQtd, setProdQtd] = useState("1");

  useEffect(() => {
    if (pedido) {
      setForm({
        cliente_nome: pedido.cliente_nome,
        cliente_id: pedido.cliente_id,
        valor_sinal: pedido.valor_sinal ?? 0,
        status: pedido.status,
        forma_pagamento: pedido.forma_pagamento,
        data_entrega: pedido.data_entrega
          ? pedido.data_entrega.split("T")[0]
          : "",
        observacoes: pedido.observacoes ?? "",
        itens: pedido.itens ?? [],
      });
    } else {
      setForm(vazio);
    }
  }, [pedido]);

  const valor_total = form.itens.reduce((acc, i) => acc + i.subtotal, 0);
  const valor_pendente = valor_total - form.valor_sinal;

  function atualizar(
    campo: keyof PedidoInput,
    valor: string | number | ItemPedido[] | undefined,
  ) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function selecionarCliente(clienteId: string) {
    const cliente = clientes.find((c) => c.id === clienteId);
    if (cliente) {
      atualizar("cliente_id", cliente.id);
      atualizar("cliente_nome", cliente.nome);
    } else {
      atualizar("cliente_id", undefined);
    }
  }

  function adicionarItem() {
    if (!prodSelecionado) return;
    const produto = produtos.find((p) => p.id === prodSelecionado);
    if (!produto) return;
    const quantidade = parseFloat(prodQtd) || 1;
    const jaExiste = form.itens.find((i) => i.produto_id === prodSelecionado);
    if (jaExiste) return;
    const item = montarItemPedido(produto, quantidade);
    atualizar("itens", [...form.itens, item]);
    setProdSelecionado("");
    setProdQtd("1");
  }

  function removerItem(produtoId: string | undefined) {
    atualizar(
      "itens",
      form.itens.filter((i) => i.produto_id !== produtoId),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      await onSalvar(form);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        .ped-overlay {
          position: fixed;
          inset: 0;
          background: rgba(28,25,23,0.5);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .ped-modal {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 32px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .ped-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .ped-modal-titulo {
          font-family: 'Inter', serif;
          font-size: 22px;
          font-weight: 700;
          color: #1C1917;
        }

        .ped-modal-fechar {
          width: 32px; height: 32px;
          border: none;
          background: #FAF8F5;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          color: #78716C;
          transition: all 0.2s;
        }

        .ped-modal-fechar:hover { background: #F0DDD0; color: #C96A2B; }

        .ped-form { display: flex; flex-direction: column; gap: 16px; }

        .ped-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .ped-form-field { display: flex; flex-direction: column; gap: 6px; }

        .ped-form-field label {
          font-size: 13px;
          font-weight: 600;
          color: #44403C;
          font-family: 'DM Sans', sans-serif;
        }

        .ped-form-field input,
        .ped-form-field select,
        .ped-form-field textarea {
          padding: 10px 14px;
          border: 1.5px solid #E5DDD4;
          border-radius: 9px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1C1917;
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.2s;
          appearance: none;
          resize: none;
        }

        .ped-form-field input:focus,
        .ped-form-field select:focus,
        .ped-form-field textarea:focus { border-color: #C96A2B; }

        .ped-secao-titulo {
          font-size: 12px;
          font-weight: 700;
          color: #78716C;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: 'DM Sans', sans-serif;
          padding-bottom: 4px;
          border-bottom: 1px solid #F3EFE9;
        }

        .ped-add-item {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .ped-add-item select,
        .ped-add-item input {
          padding: 10px 14px;
          border: 1.5px solid #E5DDD4;
          border-radius: 9px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1C1917;
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.2s;
          appearance: none;
        }

        .ped-add-item select { flex: 2; }
        .ped-add-item input { flex: 1; }

        .ped-btn-add-item {
          padding: 10px 16px;
          background: #C96A2B;
          color: #FFFFFF;
          border: none;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }

        .ped-btn-add-item:hover { background: #A3511E; }

        .ped-itens-lista { display: flex; flex-direction: column; gap: 8px; }

        .ped-item-form {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: #FAF8F5;
          border-radius: 8px;
          border: 1px solid #E5DDD4;
        }

        .ped-item-nome {
          font-size: 13px;
          font-weight: 600;
          color: #1C1917;
          font-family: 'DM Sans', sans-serif;
        }

        .ped-item-detalhe {
          font-size: 11px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          margin-top: 2px;
        }

        .ped-item-subtotal {
          font-size: 13px;
          font-weight: 700;
          color: #C96A2B;
          font-family: 'DM Sans', sans-serif;
          margin-right: 12px;
        }

        .ped-item-remover {
          background: none;
          border: none;
          cursor: pointer;
          color: #78716C;
          font-size: 14px;
          padding: 4px;
          transition: color 0.2s;
        }

        .ped-item-remover:hover { color: #dc2626; }

        .ped-totais {
          background: #FAF8F5;
          border: 1px solid #E5DDD4;
          border-radius: 12px;
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .ped-total-item { text-align: center; }

        .ped-total-label {
          font-size: 11px;
          color: #78716C;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 4px;
        }

        .ped-total-valor {
          font-family: 'Inter', serif;
          font-size: 18px;
          font-weight: 700;
          color: #1C1917;
        }

        .ped-total-valor.terra { color: #C96A2B; }
        .ped-total-valor.verde { color: #16a34a; }
        .ped-total-valor.vermelho { color: #dc2626; }

        .ped-form-erro {
          font-size: 13px;
          color: #dc2626;
          background: #fef2f2;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #fecaca;
          font-family: 'DM Sans', sans-serif;
        }

        .ped-form-acoes { display: flex; gap: 10px; margin-top: 4px; }

        .ped-btn-cancelar {
          flex: 1;
          padding: 12px;
          border: 1.5px solid #E5DDD4;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: #44403C;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ped-btn-cancelar:hover { border-color: #78716C; }

        .ped-btn-salvar {
          flex: 2;
          padding: 12px;
          background: #C96A2B;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ped-btn-salvar:hover:not(:disabled) { background: #A3511E; }
        .ped-btn-salvar:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div
        className="ped-overlay"
        onClick={(e) => e.target === e.currentTarget && onFechar()}
      >
        <div className="ped-modal">
          <div className="ped-modal-header">
            <h3 className="ped-modal-titulo">
              {pedido ? "Editar Pedido" : "Novo Pedido"}
            </h3>
            <button className="ped-modal-fechar" onClick={onFechar}>
              ✕
            </button>
          </div>

          <form className="ped-form" onSubmit={handleSubmit}>
            <div className="ped-form-field">
              <label>Cliente</label>
              <select
                value={form.cliente_id ?? ""}
                onChange={(e) => selecionarCliente(e.target.value)}
              >
                <option value="">Selecionar cliente cadastrado</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="ped-form-field">
              <label>Nome do cliente *</label>
              <input
                type="text"
                placeholder="Ex: Maria Silva"
                value={form.cliente_nome}
                onChange={(e) => atualizar("cliente_nome", e.target.value)}
                required
              />
            </div>

            <div className="ped-form-row">
              <div className="ped-form-field">
                <label>Data de entrega *</label>
                <input
                  type="date"
                  value={form.data_entrega}
                  onChange={(e) => atualizar("data_entrega", e.target.value)}
                  required
                />
              </div>
              <div className="ped-form-field">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    atualizar("status", e.target.value as PedidoStatus)
                  }
                >
                  {statusOrdem.map((s) => (
                    <option key={s} value={s}>
                      {statusConfig[s].label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="ped-form-row">
              <div className="ped-form-field">
                <label>Forma de pagamento</label>
                <select
                  value={form.forma_pagamento}
                  onChange={(e) =>
                    atualizar(
                      "forma_pagamento",
                      e.target.value as FormaPagamento,
                    )
                  }
                >
                  <option value="pix">Pix</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="cartao_credito">Cartão de Crédito</option>
                  <option value="cartao_debito">Cartão de Débito</option>
                  <option value="transferencia">Transferência</option>
                </select>
              </div>
              <div className="ped-form-field">
                <label>Sinal pago (R$)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.valor_sinal || ""}
                  onChange={(e) =>
                    atualizar("valor_sinal", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
            </div>

            <div className="ped-secao-titulo">Produtos do pedido</div>

            <div className="ped-add-item">
              <select
                value={prodSelecionado}
                onChange={(e) => setProdSelecionado(e.target.value)}
              >
                <option value="">Selecionar produto</option>
                {produtos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome} —{" "}
                    {p.preco_venda.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                step="1"
                placeholder="Qtd"
                value={prodQtd}
                onChange={(e) => setProdQtd(e.target.value)}
              />
              <button
                type="button"
                className="ped-btn-add-item"
                onClick={adicionarItem}
              >
                + Adicionar
              </button>
            </div>

            {form.itens.length > 0 && (
              <div className="ped-itens-lista">
                {form.itens.map((item) => (
                  <div key={item.produto_id} className="ped-item-form">
                    <div>
                      <div className="ped-item-nome">{item.produto_nome}</div>
                      <div className="ped-item-detalhe">
                        {item.quantidade}x{" "}
                        {item.preco_unitario.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </div>
                    </div>
                    <div className="ped-item-subtotal">
                      {item.subtotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                    <button
                      type="button"
                      className="ped-item-remover"
                      onClick={() => removerItem(item.produto_id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="ped-totais">
              <div className="ped-total-item">
                <div className="ped-total-label">Total do pedido</div>
                <div className="ped-total-valor terra">
                  {valor_total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
              <div className="ped-total-item">
                <div className="ped-total-label">Sinal pago</div>
                <div className="ped-total-valor verde">
                  {form.valor_sinal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
              <div className="ped-total-item">
                <div className="ped-total-label">Valor pendente</div>
                <div
                  className={`ped-total-valor ${valor_pendente > 0 ? "vermelho" : "verde"}`}
                >
                  {valor_pendente.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
            </div>

            <div className="ped-form-field">
              <label>Observações</label>
              <textarea
                rows={2}
                placeholder="Detalhes do pedido, personalização..."
                value={form.observacoes}
                onChange={(e) => atualizar("observacoes", e.target.value)}
              />
            </div>

            {erro && <div className="ped-form-erro">{erro}</div>}

            <div className="ped-form-acoes">
              <button
                type="button"
                className="ped-btn-cancelar"
                onClick={onFechar}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="ped-btn-salvar"
                disabled={loading}
              >
                {loading
                  ? "Salvando..."
                  : pedido
                    ? "Salvar alterações"
                    : "Criar pedido"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
