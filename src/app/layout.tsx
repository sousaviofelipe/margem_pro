// Layout raiz da aplicação — define fontes, metadados globais e estrutura base

import type { Metadata, Viewport } from "next";
import { Inter, DM_Sans } from "next/font/google";
import PwaRegister from "@/components/PwaRegister";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Margem Pro — Gestão para Confeiteiros",
  description:
    "Plataforma de gestão, precificação e produção para confeiteiros e pequenos negócios alimentícios.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#C96A2B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-[#FAF8F5] text-[#1C1917] antialiased">
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
