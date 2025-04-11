export default function Info() {
    const features = [
      "✅ Crypto Payments",
      "✅ Live Chat Support",
      "✅ Verified Sellers",
      "✅ Instant Delivery",
    ];
  
    return (
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Why El1te Market?</h2>
        <ul className="max-w-3xl mx-auto grid gap-4 text-lg text-gray-700">
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </section>
    );
  }
  