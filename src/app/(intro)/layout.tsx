'use client'

import IntroNavbar from '@/components/intro/IntroNavbar'

export default function IntroLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <IntroNavbar />
      {children}
    </>
  )
}
