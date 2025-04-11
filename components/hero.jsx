export default function Hero() {
    return (
      <section className="relative bg-gradient-to-r from-[#1b0e2f] via-[#2b1a45] to-[#000000] px-6 py-20 text-white">
        <div className="max-w-5xl mx-auto z-10 relative">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Leading Marketplace <br /> for Gamers
          </h1>
          <p className="text-lg mb-6">
            Trade securely with gamers throughout the world.
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 rounded-md font-semibold text-black hover:opacity-90">
            Start Trading
          </button>
          <p className="mt-6 text-sm text-gray-400">
            3,360,000+ registered traders · 200+ active game marketplaces · 100% fraud protection
          </p>
        </div>
      </section>
    );
  }
  