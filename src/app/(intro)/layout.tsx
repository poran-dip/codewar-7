'use client'

import IntroNavbar from '@/components/intro/IntroNavbar'
import IntroSectionsContainer from '@/components/IntroSectionsContainer';

export default function IntroLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <IntroNavbar />

      <IntroSectionsContainer>
        {children}
      </IntroSectionsContainer>
    </>
  )
}
