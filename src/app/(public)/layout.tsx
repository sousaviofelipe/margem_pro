// Layout das páginas públicas — sem autenticação, sem sidebar

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
