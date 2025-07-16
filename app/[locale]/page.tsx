import HeroSection from "../components/landing/HeroSection";

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <>
      <HeroSection params={params} />
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="h-screen w-full"></div>
        ))}
    </>
  );
}
