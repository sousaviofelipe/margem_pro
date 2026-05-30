// Sidebar de navegação do dashboard — responsiva com menu hambúrguer no mobile

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "▦" },
  { label: "Ingredientes", href: "/ingredientes", icon: "🧂" },
  { label: "Receitas", href: "/receitas", icon: "📋" },
  { label: "Produtos", href: "/produtos", icon: "🎂" },
  { label: "Estoque", href: "/estoque", icon: "📦" },
  { label: "Produção", href: "/producao", icon: "⚙️" },
  { label: "Pedidos", href: "/pedidos", icon: "🛍️" },
  { label: "Clientes", href: "/clientes", icon: "👥" },
  { label: "Financeiro", href: "/financeiro", icon: "💰" },
  { label: "Guia de Uso", href: "/guia", icon: "📖" },
  { label: "Perfil", href: "/perfil", icon: "👤" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileAberto, setMobileAberto] = useState(false);

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  const NavLinks = () => (
    <>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileAberto(false)}
              className={`sidebar-link ${isActive ? "ativo" : ""}`}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <button className="sidebar-signout" onClick={handleSignOut}>
        <span>→</span>
        Sair
      </button>
    </>
  );

  return (
    <>
      <style>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          width: 240px;
          min-height: 100vh;
          background: #FFFFFF;
          border-right: 1px solid #E5DDD4;
          padding: 24px 16px;
          flex-shrink: 0;
        }

        .sidebar-logo {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #1C1917;
          letter-spacing: -0.02em;
          margin-bottom: 32px;
          padding: 0 8px;
          text-decoration: none;
          display: block;
        }

        .sidebar-logo span { color: #C96A2B; }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: #78716C;
          text-decoration: none;
          transition: all 0.15s;
        }

        .sidebar-link:hover {
          background: #FAF8F5;
          color: #1C1917;
        }

        .sidebar-link.ativo {
          background: #F0DDD0;
          color: #C96A2B;
          font-weight: 600;
        }

        .sidebar-link-icon { font-size: 16px; flex-shrink: 0; }

        .sidebar-signout {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: #78716C;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          width: 100%;
          margin-top: 8px;
        }

        .sidebar-signout:hover {
          background: #fef2f2;
          color: #dc2626;
        }

        /* Mobile header */
        .mobile-header {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: #FFFFFF;
          border-bottom: 1px solid #E5DDD4;
          height: 56px;
          padding: 0 16px;
          align-items: center;
          justify-content: space-between;
        }

        .mobile-logo {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #1C1917;
          letter-spacing: -0.02em;
          text-decoration: none;
        }

        .mobile-logo span { color: #C96A2B; }

        .mobile-hamburger {
          width: 36px;
          height: 36px;
          border: none;
          background: #FAF8F5;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 8px;
          transition: background 0.2s;
        }

        .mobile-hamburger:hover { background: #F0DDD0; }

        .hamburger-linha {
          width: 18px;
          height: 2px;
          background: #1C1917;
          border-radius: 2px;
          transition: all 0.25s;
          transform-origin: center;
        }

        .hamburger-aberto .hamburger-linha:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }

        .hamburger-aberto .hamburger-linha:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        .hamburger-aberto .hamburger-linha:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* Mobile overlay */
        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(28,25,23,0.4);
          z-index: 150;
        }

        /* Mobile drawer */
        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 280px;
          background: #FFFFFF;
          z-index: 200;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 4px 0 24px rgba(28,25,23,0.12);
        }

        .mobile-drawer.aberto {
          transform: translateX(0);
        }

        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }

        .mobile-drawer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #1C1917;
          letter-spacing: -0.02em;
          text-decoration: none;
        }

        .mobile-drawer-logo span { color: #C96A2B; }

        .mobile-drawer-fechar {
          width: 32px;
          height: 32px;
          border: none;
          background: #FAF8F5;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          color: #78716C;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .mobile-drawer-fechar:hover { background: #F0DDD0; color: #C96A2B; }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .mobile-header { display: flex; }
          .mobile-overlay { display: block; }
        }
      `}</style>

      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <Link href="/dashboard" className="sidebar-logo">
          Margem<span>Pro</span>
        </Link>
        <NavLinks />
      </aside>

      {/* Mobile Header */}
      <div className="mobile-header">
        <Link href="/dashboard" className="mobile-logo">
          Margem<span>Pro</span>
        </Link>
        <button
          className={`mobile-hamburger ${mobileAberto ? "hamburger-aberto" : ""}`}
          onClick={() => setMobileAberto(!mobileAberto)}
          aria-label="Menu"
        >
          <div className="hamburger-linha" />
          <div className="hamburger-linha" />
          <div className="hamburger-linha" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileAberto && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileAberto(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileAberto ? "aberto" : ""}`}>
        <div className="mobile-drawer-header">
          <Link
            href="/dashboard"
            className="mobile-drawer-logo"
            onClick={() => setMobileAberto(false)}
          >
            Margem<span>Pro</span>
          </Link>
          <button
            className="mobile-drawer-fechar"
            onClick={() => setMobileAberto(false)}
          >
            ✕
          </button>
        </div>
        <NavLinks />
      </div>
    </>
  );
}
