// Conteúdo da página de Termos de Uso da plataforma Margem Pro

import Link from "next/link";

export default function TermosContent() {
  return (
    <div className="termos-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --bg: #FAF8F5;
          --terra: #C96A2B;
          --terra-dark: #A3511E;
          --grafite: #1C1917;
          --grafite-mid: #44403C;
          --grafite-soft: #78716C;
          --white: #FFFFFF;
          --border: #E5DDD4;
        }

        .termos-page {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--grafite);
          min-height: 100vh;
        }

        .termos-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(250,248,245,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          padding: 0 5vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        .termos-logo {
          font-family: 'Inter', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--grafite);
          text-decoration: none;
          letter-spacing: -0.02em;
        }

        .termos-logo span { color: var(--terra); }

        .termos-back {
          font-size: 13px;
          color: var(--grafite-soft);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .termos-back:hover { color: var(--terra); }

        .termos-content {
          max-width: 760px;
          margin: 0 auto;
          padding: 60px 5vw 100px;
        }

        .termos-hero {
          margin-bottom: 48px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--border);
        }

        .termos-tag {
          display: inline-block;
          background: #F0DDD0;
          color: var(--terra-dark);
          padding: 4px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .termos-hero h1 {
          font-family: 'Inter', serif;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700;
          color: var(--grafite);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .termos-hero p {
          font-size: 14px;
          color: var(--grafite-soft);
          font-weight: 300;
          line-height: 1.7;
        }

        .termos-secao {
          margin-bottom: 40px;
        }

        .termos-secao h2 {
          font-family: 'Inter', serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--grafite);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .termos-secao h2::before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 20px;
          background: var(--terra);
          border-radius: 2px;
          flex-shrink: 0;
        }

        .termos-secao p {
          font-size: 14px;
          color: var(--grafite-mid);
          font-weight: 300;
          line-height: 1.8;
          margin-bottom: 12px;
        }

        .termos-secao ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }

        .termos-secao ul li {
          font-size: 14px;
          color: var(--grafite-mid);
          font-weight: 300;
          line-height: 1.7;
          padding-left: 16px;
          position: relative;
        }

        .termos-secao ul li::before {
          content: '·';
          position: absolute;
          left: 0;
          color: var(--terra);
          font-weight: 700;
          font-size: 18px;
          line-height: 1.4;
        }

        .termos-footer {
          margin-top: 60px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .termos-footer p {
          font-size: 13px;
          color: var(--grafite-soft);
          font-weight: 300;
        }

        .termos-footer a {
          font-size: 13px;
          color: var(--terra);
          text-decoration: none;
          font-weight: 500;
        }

        .termos-footer a:hover { text-decoration: underline; }
      `}</style>

      <header className="termos-header">
        <Link href="/" className="termos-logo">
          Margem<span>Pro</span>
        </Link>
        <Link href="/" className="termos-back">
          ← Voltar ao início
        </Link>
      </header>

      <div className="termos-content">
        <div className="termos-hero">
          <div className="termos-tag">Legal</div>
          <h1>Termos de Uso</h1>
          <p>
            Última atualização: janeiro de 2025. Ao utilizar a plataforma Margem
            Pro, você concorda com os termos descritos abaixo.
          </p>
        </div>

        <div className="termos-secao">
          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao criar uma conta e utilizar a plataforma Margem Pro, você declara
            que leu, compreendeu e concorda com estes Termos de Uso. Caso não
            concorde com qualquer parte destes termos, você não deve utilizar a
            plataforma.
          </p>
          <p>
            Estes termos se aplicam a todos os usuários da plataforma,
            independentemente do plano contratado.
          </p>
        </div>

        <div className="termos-secao">
          <h2>2. Descrição do Serviço</h2>
          <p>
            O Margem Pro é uma plataforma SaaS (Software as a Service) voltada
            para confeiteiros, doceiros e pequenos produtores alimentícios. A
            plataforma oferece ferramentas para:
          </p>
          <ul>
            <li>Cadastro e controle de ingredientes e insumos</li>
            <li>Criação e precificação de receitas e produtos</li>
            <li>Controle de estoque integrado à produção</li>
            <li>Gestão de pedidos e clientes</li>
            <li>Planejamento de produção com lista de compras</li>
            <li>Painel financeiro e relatórios de desempenho</li>
          </ul>
        </div>

        <div className="termos-secao">
          <h2>3. Cadastro e Conta</h2>
          <p>
            Para utilizar a plataforma, é necessário criar uma conta fornecendo
            informações verdadeiras e precisas. Você é responsável por:
          </p>
          <ul>
            <li>Manter a confidencialidade da sua senha</li>
            <li>Todas as atividades realizadas em sua conta</li>
            <li>Notificar imediatamente qualquer uso não autorizado</li>
            <li>Manter seus dados de contato atualizados</li>
          </ul>
        </div>

        <div className="termos-secao">
          <h2>4. Planos e Pagamentos</h2>
          <p>A plataforma oferece os seguintes planos:</p>
          <ul>
            <li>
              <strong>Teste Grátis:</strong> 7 dias com acesso completo, sem
              cartão de crédito
            </li>
            <li>
              <strong>Plano Pro:</strong> R$ 47/mês com acesso aos módulos
              básicos
            </li>
            <li>
              <strong>Plano Pro Max:</strong> R$ 79/mês com acesso completo
              incluindo estoque e produção
            </li>
          </ul>
          <p>
            Os valores podem ser alterados mediante aviso prévio de 30 dias. O
            cancelamento pode ser realizado a qualquer momento, sem multa ou
            fidelidade.
          </p>
        </div>

        <div className="termos-secao">
          <h2>5. Uso Aceitável</h2>
          <p>
            Você concorda em utilizar a plataforma apenas para fins legítimos
            relacionados à gestão do seu negócio alimentício. É proibido:
          </p>
          <ul>
            <li>Compartilhar credenciais de acesso com terceiros</li>
            <li>Utilizar a plataforma para fins ilegais ou fraudulentos</li>
            <li>Tentar acessar dados de outros usuários</li>
            <li>Realizar engenharia reversa ou copiar o software</li>
            <li>Sobrecarregar deliberadamente os servidores da plataforma</li>
          </ul>
        </div>

        <div className="termos-secao">
          <h2>6. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo, código, design e funcionalidades da plataforma
            Margem Pro são de propriedade exclusiva dos seus desenvolvedores. Os
            dados inseridos por você (ingredientes, receitas, pedidos, clientes)
            são de sua propriedade.
          </p>
        </div>

        <div className="termos-secao">
          <h2>7. Limitação de Responsabilidade</h2>
          <p>
            A plataforma é fornecida "como está". Não nos responsabilizamos por:
          </p>
          <ul>
            <li>
              Decisões de negócio tomadas com base nos dados da plataforma
            </li>
            <li>
              Perdas financeiras decorrentes do uso ou não uso da plataforma
            </li>
            <li>Interrupções temporárias do serviço por manutenção</li>
            <li>
              Erros de cálculo causados por dados incorretos inseridos pelo
              usuário
            </li>
          </ul>
        </div>

        <div className="termos-secao">
          <h2>8. Cancelamento e Encerramento</h2>
          <p>
            Você pode cancelar sua conta a qualquer momento através das
            configurações da plataforma. Após o cancelamento, seus dados ficam
            disponíveis por 30 dias para exportação. Após esse prazo, os dados
            são permanentemente excluídos.
          </p>
          <p>
            Reservamo-nos o direito de encerrar contas que violem estes termos,
            sem aviso prévio.
          </p>
        </div>

        <div className="termos-secao">
          <h2>9. Alterações nos Termos</h2>
          <p>
            Podemos atualizar estes termos periodicamente. Alterações
            significativas serão comunicadas por e-mail com antecedência mínima
            de 15 dias. O uso continuado da plataforma após as alterações
            implica na aceitação dos novos termos.
          </p>
        </div>

        <div className="termos-secao">
          <h2>10. Contato</h2>
          <p>
            Em caso de dúvidas sobre estes termos, entre em contato conosco pelo
            WhatsApp ou pelo e-mail de suporte disponível na plataforma.
          </p>
        </div>

        <div className="termos-footer">
          <p>© 2025 Margem Pro. Todos os direitos reservados.</p>
          <Link href="/privacidade">Política de Privacidade →</Link>
        </div>
      </div>
    </div>
  );
}
