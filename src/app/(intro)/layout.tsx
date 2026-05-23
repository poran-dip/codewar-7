"use client";

import IntroSectionsContainer from "@/components/IntroSectionsContainer";
import IntroNavbar from "@/components/intro/IntroNavbar";

export default function IntroLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <IntroNavbar />

      <IntroSectionsContainer>{children}</IntroSectionsContainer>
    </>
  );
}
