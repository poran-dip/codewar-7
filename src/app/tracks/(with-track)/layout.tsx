import TracksNavbar from "@/components/tracks/TracksNavbar"
import TracksSectionsContainer from "@/components/TracksSectionsContainer";

export default function TracksWithTrackLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <TracksNavbar />

      <TracksSectionsContainer>
        {children}
      </TracksSectionsContainer>
    </>
  )
}
