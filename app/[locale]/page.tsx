import Navbar from "../components/layout/Navbar";

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <>
      <Navbar params={params} />
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="h-screen w-full"></div>
        ))}
    </>
  );
}
