import { useState } from "react";
import Header from "../../components/Header";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const DiscountCalculator = () => {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [result, setResult] = useState(null);

  const calculateDiscount = () => {
    if (!price || !discount) return;

    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;

    setResult({
      saved: discountAmount.toFixed(2),
      final: finalPrice.toFixed(2),
    });
  };

  const quickDiscounts = [10, 20, 30, 50, 70];

  return (
    <>
      <Helmet>
        <title>
          Discount Calculator - Calculate Sale Price Online | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Calculate discounts, final prices, and savings instantly. Free online discount calculator for shopping and sales."
        />
      </Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <Link to="/">
            <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-6 transition">
              <ArrowLeft /> Back to Tools
            </button>
          </Link>

          <div className="max-w-2xl mx-auto">
            {/* Card */}
            <div className="bg-white dark:bg-blue-900/20 p-8 rounded-2xl border shadow-sm">
              <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray-200">
                Discount Calculator
              </h1>

              <input
                type="number"
                placeholder="Original Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 rounded-lg border dark:bg-gray-800 mb-4"
              />

              <input
                type="number"
                placeholder="Discount %"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full p-3 rounded-lg border dark:bg-gray-800 mb-4"
              />

              {/* Quick buttons */}
              <div className="flex gap-3 mb-6">
                {quickDiscounts.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDiscount(d)}
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                  >
                    {d}%
                  </button>
                ))}
              </div>

              <button
                onClick={calculateDiscount}
                className="w-full bg-blue-600 text-white py-3 rounded-lg"
              >
                Calculate Discount
              </button>

              {result && (
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                    <p>You Save</p>
                    <p className="font-bold text-lg">₹ {result.saved}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                    <p>Final Price</p>
                    <p className="font-bold text-lg">₹ {result.final}</p>
                  </div>
                </div>
              )}
            </div>

            {/* How to Use */}
            <div className="mt-10 bg-white dark:bg-blue-900/20 p-6 rounded-2xl border">
              <h2 className="text-xl font-bold mb-4">How to Use</h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>Enter original product price.</li>
                <li>Enter discount percentage.</li>
                <li>Click calculate to see final price and savings.</li>
              </ul>
            </div>

            {/* Info */}
            <div className="mt-10 text-gray-600 dark:text-gray-300">
              <h2 className="text-2xl font-bold">About Discount Calculator</h2>
              <p>
                This tool helps you calculate sale prices quickly and find out
                how much money you save during discounts.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DiscountCalculator;
