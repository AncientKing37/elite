// /app/page.js
import Hero from "@/components/Hero";
import MarketplaceIntro from "@/components/MarketplaceIntro";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0e0e11] text-white">
      <Hero />
      <MarketplaceIntro />
      <Featured />
      <Footer />
    </main>
  );
}