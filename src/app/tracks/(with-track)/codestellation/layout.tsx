export default function CodestellationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="theme-codestellation">{children}</div>;
}
