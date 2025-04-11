export default function Featured() {
    return (
      <section className="bg-[#1b1b1b] px-6 py-16 text-white">
        <h3 className="text-2xl font-semibold text-center mb-8">Featured Marketplaces</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-[#222] p-6 rounded-xl shadow-lg hover:bg-[#2a2a2a]">
            <h4 className="text-xl font-semibold mb-2">Fortnite</h4>
            <p className="text-sm text-gray-400">Boosting, Accounts, V-Bucks</p>
          </div>
          <div className="bg-[#222] p-6 rounded-xl shadow-lg hover:bg-[#2a2a2a]">
            <h4 className="text-xl font-semibold mb-2">Valorant</h4>
            <p className="text-sm text-gray-400">Skins, Elo Boost, Accounts</p>
          </div>
          <div className="bg-[#222] p-6 rounded-xl shadow-lg hover:bg-[#2a2a2a]">
            <h4 className="text-xl font-semibold mb-2">Clash of Clans</h4>
            <p className="text-sm text-gray-400">Max Accounts, Gems, Clan Wars</p>
          </div>
        </div>
      </section>
    )
  }
  