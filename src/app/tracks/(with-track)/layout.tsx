import TracksSectionsContainer from "@/components/TracksSectionsContainer";
import TracksNavbar from "@/components/tracks/TracksNavbar";

export default function TracksWithTrackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TracksNavbar />

      <TracksSectionsContainer>{children}</TracksSectionsContainer>
    </>
  );
}
