import IntroHero from "@/components/intro/IntroHero";

const IntroPage = () => {
  return (
    <main className="relative h-screen w-screen overflow-hidden text-white">
      <div className="h-full">
        <div className="flex h-full w-screen items-center justify-center">
          <IntroHero />
        </div>
      </div>
    </main>
  );
};

export default IntroPage;
