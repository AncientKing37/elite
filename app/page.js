// /app/page.js
import Hero from "@/components/hero";
import MarketplaceIntro from "@/components/marketplaceIntro";
import Featured from "@/components/featured";
import Footer from "@/components/footer";

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