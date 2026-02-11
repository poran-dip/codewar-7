import TracksNavbar from "@/components/tracks/TracksNavbar"

export default function TracksWithTrackLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <TracksNavbar />
      {children}
    </>
  )
}
