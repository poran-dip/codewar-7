import IntroHero from "@/components/intro/IntroHero";

const IntroPage = () => {
  return (
    <main className="relative h-screen w-screen text-white">
      <div className="h-[200vh]">
        <div className="sticky top-0 h-screen w-screen flex items-center justify-center">
          <IntroHero />
        </div>
      </div>
    </main>
  );
};

export default IntroPage;
