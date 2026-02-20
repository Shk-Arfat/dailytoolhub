import { useState } from "react";
import Header from "../../components/Header";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const TipCalculator = () => {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(10);
  const [people, setPeople] = useState(1);
  const [result, setResult] = useState(null);

  const calculateTip = () => {
    if (!bill) return;

    const tipAmount = (bill * tipPercent) / 100;
    const totalBill = Number(bill) + tipAmount;
    const perPerson = totalBill / people;

    setResult({
      tip: tipAmount.toFixed(2),
      total: totalBill.toFixed(2),
      perPerson: perPerson.toFixed(2),
    });
  };

  const quickTips = [5, 10, 15, 18, 20];

  return (
    <>
      <Helmet>
        <title>
          Tip Calculator - Calculate Restaurant Tip Online | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Calculate restaurant tips and split bills easily. Free online tip calculator for quick and accurate results."
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
                Tip Calculator
              </h1>

              {/* Bill */}
              <input
                type="number"
                placeholder="Bill Amount"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                className="w-full p-3 rounded-lg border dark:bg-gray-800 mb-4"
              />

              {/* Tip buttons */}
              <div className="flex gap-3 mb-4">
                {quickTips.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipPercent(t)}
                    className={`px-4 py-2 rounded-lg ${tipPercent === t ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                  >
                    {t}%
                  </button>
                ))}
              </div>

              {/* People */}
              <input
                type="number"
                placeholder="Number of People"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="w-full p-3 rounded-lg border dark:bg-gray-800 mb-4"
              />

              <button
                onClick={calculateTip}
                className="w-full bg-blue-600 text-white py-3 rounded-lg"
              >
                Calculate Tip
              </button>

              {result && (
                <div className="mt-8 grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                    <p>Tip Amount</p>
                    <p className="font-bold text-lg">₹ {result.tip}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                    <p>Total Bill</p>
                    <p className="font-bold text-lg">₹ {result.total}</p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                    <p>Per Person</p>
                    <p className="font-bold text-lg">₹ {result.perPerson}</p>
                  </div>
                </div>
              )}
            </div>

            {/* How to Use */}
            <div className="mt-10 bg-white dark:bg-blue-900/20 p-6 rounded-2xl border">
              <h2 className="text-xl font-bold mb-4">How to Use</h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>Enter your restaurant bill amount.</li>
                <li>Select tip percentage.</li>
                <li>Enter number of people to split the bill.</li>
              </ul>
            </div>

            {/* Info */}
            <div className="mt-10 text-gray-600 dark:text-gray-300">
              <h2 className="text-2xl font-bold">About Tip Calculator</h2>
              <p>
                This calculator helps you quickly calculate tips and split
                restaurant bills fairly among friends.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TipCalculator;
