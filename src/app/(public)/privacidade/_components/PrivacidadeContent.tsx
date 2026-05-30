// Conteúdo da página de Política de Privacidade da plataforma Margem Pro

import Link from "next/link";

export default function PrivacidadeContent() {
  return (
    <div className="priv-page">
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

        .priv-page {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--grafite);
          min-height: 100vh;
        }

        .priv-header {
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

        .priv-logo {
          font-family: 'Inter', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--grafite);
          text-decoration: none;
          letter-spacing: -0.02em;
        }

        .priv-logo span { color: var(--terra); }

        .priv-back {
          font-size: 13px;
          color: var(--grafite-soft);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .priv-back:hover { color: var(--terra); }

        .priv-content {
          max-width: 760px;
          margin: 0 auto;
          padding: 60px 5vw 100px;
        }

        .priv-hero {
          margin-bottom: 48px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--border);
        }

        .priv-tag {
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

        .priv-hero h1 {
          font-family: 'Inter', serif;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700;
          color: var(--grafite);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .priv-hero p {
          font-size: 14px;
          color: var(--grafite-soft);
          font-weight: 300;
          line-height: 1.7;
        }

        .priv-secao { margin-bottom: 40px; }

        .priv-secao h2 {
          font-family: 'Inter', serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--grafite);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .priv-secao h2::before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 20px;
          background: var(--terra);
          border-radius: 2px;
          flex-shrink: 0;
        }

        .priv-secao p {
          font-size: 14px;
          color: var(--grafite-mid);
          font-weight: 300;
          line-height: 1.8;
          margin-bottom: 12px;
        }

        .priv-secao ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }

        .priv-secao ul li {
          font-size: 14px;
          color: var(--grafite-mid);
          font-weight: 300;
          line-height: 1.7;
          padding-left: 16px;
          position: relative;
        }

        .priv-secao ul li::before {
          content: '·';
          position: absolute;
          left: 0;
          color: var(--terra);
          font-weight: 700;
          font-size: 18px;
          line-height: 1.4;
        }

        .priv-destaque {
          background: #F0DDD0;
          border-left: 3px solid var(--terra);
          border-radius: 0 8px 8px 0;
          padding: 14px 16px;
          margin-bottom: 12px;
          font-size: 14px;
          color: var(--terra-dark);
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.6;
        }

        .priv-footer {
          margin-top: 60px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .priv-footer p {
          font-size: 13px;
          color: var(--grafite-soft);
          font-weight: 300;
        }

        .priv-footer a {
          font-size: 13px;
          color: var(--terra);
          text-decoration: none;
          font-weight: 500;
        }

        .priv-footer a:hover { text-decoration: underline; }
      `}</style>

      <header className="priv-header">
        <Link href="/" className="priv-logo">
          Margem<span>Pro</span>
        </Link>
        <Link href="/" className="priv-back">
          ← Voltar ao início
        </Link>
      </header>

      <div className="priv-content">
        <div className="priv-hero">
          <div className="priv-tag">Legal</div>
          <h1>Política de Privacidade</h1>
          <p>
            Última atualização: janeiro de 2025. Esta política descreve como
            coletamos, usamos e protegemos suas informações pessoais na
            plataforma Margem Pro.
          </p>
        </div>

        <div className="priv-secao">
          <h2>1. Nosso Compromisso</h2>
          <div className="priv-destaque">
            🔒 Seus dados são seus. Nunca vendemos ou compartilhamos suas
            informações pessoais com terceiros para fins comerciais.
          </div>
          <p>
            A privacidade dos nossos usuários é fundamental. Esta política
            explica de forma clara e transparente como tratamos suas
            informações.
          </p>
        </div>

        <div className="priv-secao">
          <h2>2. Dados que Coletamos</h2>
          <p>
            Coletamos apenas as informações necessárias para o funcionamento da
            plataforma:
          </p>
          <ul>
            <li>
              <strong>Dados de cadastro:</strong> nome, e-mail, telefone e
              segmento do negócio
            </li>
            <li>
              <strong>Dados do negócio:</strong> ingredientes, receitas,
              produtos, pedidos e clientes que você cadastra
            </li>
            <li>
              <strong>Dados de uso:</strong> páginas visitadas, funcionalidades
              utilizadas e tempo de sessão
            </li>
            <li>
              <strong>Dados técnicos:</strong> endereço IP, tipo de dispositivo
              e navegador
            </li>
          </ul>
        </div>

        <div className="priv-secao">
          <h2>3. Como Usamos seus Dados</h2>
          <p>Utilizamos suas informações exclusivamente para:</p>
          <ul>
            <li>Fornecer e melhorar os serviços da plataforma</li>
            <li>Processar pagamentos de forma segura</li>
            <li>Enviar comunicações sobre sua conta e o serviço</li>
            <li>Oferecer suporte técnico quando necessário</li>
            <li>Gerar relatórios e análises anônimas para melhorias</li>
          </ul>
        </div>

        <div className="priv-secao">
          <h2>4. Armazenamento e Segurança</h2>
          <p>
            Seus dados são armazenados em servidores seguros com criptografia em
            trânsito e em repouso. Utilizamos o Supabase como banco de dados,
            que é certificado com os padrões internacionais de segurança.
          </p>
          <ul>
            <li>Criptografia SSL/TLS em todas as comunicações</li>
            <li>Autenticação segura com tokens JWT</li>
            <li>Isolamento de dados por usuário com Row Level Security</li>
            <li>Backups automáticos diários</li>
          </ul>
        </div>

        <div className="priv-secao">
          <h2>5. Compartilhamento de Dados</h2>
          <p>Não vendemos seus dados. Compartilhamos informações apenas com:</p>
          <ul>
            <li>
              <strong>Processadores de pagamento:</strong> para processar
              cobranças de assinatura
            </li>
            <li>
              <strong>Provedores de infraestrutura:</strong> Supabase (banco de
              dados) e Vercel (hospedagem)
            </li>
            <li>
              <strong>Autoridades legais:</strong> apenas quando exigido por lei
            </li>
          </ul>
        </div>

        <div className="priv-secao">
          <h2>6. Seus Direitos (LGPD)</h2>
          <p>
            Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você
            tem direito a:
          </p>
          <ul>
            <li>Acessar todos os dados que temos sobre você</li>
            <li>Corrigir informações incorretas ou desatualizadas</li>
            <li>Solicitar a exclusão de seus dados</li>
            <li>Exportar seus dados em formato legível</li>
            <li>Revogar consentimentos previamente dados</li>
            <li>Ser informado sobre o uso de seus dados</li>
          </ul>
          <p>
            Para exercer qualquer um desses direitos, entre em contato conosco
            pelo WhatsApp ou e-mail de suporte.
          </p>
        </div>

        <div className="priv-secao">
          <h2>7. Cookies</h2>
          <p>
            Utilizamos cookies essenciais para o funcionamento da plataforma,
            incluindo cookies de autenticação e preferências de sessão. Não
            utilizamos cookies de rastreamento ou publicidade.
          </p>
        </div>

        <div className="priv-secao">
          <h2>8. Retenção de Dados</h2>
          <p>
            Mantemos seus dados enquanto sua conta estiver ativa. Após o
            cancelamento:
          </p>
          <ul>
            <li>Seus dados ficam disponíveis por 30 dias para exportação</li>
            <li>Após 30 dias, todos os dados são permanentemente excluídos</li>
            <li>
              Dados de faturamento podem ser mantidos por até 5 anos por
              obrigação legal
            </li>
          </ul>
        </div>

        <div className="priv-secao">
          <h2>9. Menores de Idade</h2>
          <p>
            A plataforma Margem Pro não é destinada a menores de 18 anos. Não
            coletamos intencionalmente dados de menores. Se identificarmos tal
            situação, a conta será encerrada imediatamente.
          </p>
        </div>

        <div className="priv-secao">
          <h2>10. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta política periodicamente. Alterações
            significativas serão comunicadas por e-mail com antecedência mínima
            de 15 dias. Recomendamos revisar esta política regularmente.
          </p>
        </div>

        <div className="priv-secao">
          <h2>11. Contato</h2>
          <p>
            Para dúvidas, solicitações ou exercício dos seus direitos, entre em
            contato conosco pelo WhatsApp disponível na plataforma ou pelo
            e-mail de suporte. Respondemos em até 48 horas úteis.
          </p>
        </div>

        <div className="priv-footer">
          <p>© 2025 Margem Pro. Todos os direitos reservados.</p>
          <Link href="/termos">Termos de Uso →</Link>
        </div>
      </div>
    </div>
  );
}
