export default function DecodeLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="theme-decode">
      {children}
    </div>
  )
}
