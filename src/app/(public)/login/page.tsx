// Página de login — layout split com branding e formulário

import BrandingSide from "./_components/BrandingSide";
import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="login-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --bg: #FAF8F5;
          --bg2: #F3EFE9;
          --terra: #C96A2B;
          --terra-dark: #A3511E;
          --terra-light: #F0DDD0;
          --grafite: #1C1917;
          --grafite-mid: #44403C;
          --grafite-soft: #78716C;
          --white: #FFFFFF;
          --border: #E5DDD4;
          --error: #dc2626;
          --error-bg: #fef2f2;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .login-page {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--grafite);
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 768px) {
          .login-page { grid-template-columns: 1fr; }
        }
      `}</style>
      <BrandingSide />
      <LoginForm />
    </div>
  );
}
