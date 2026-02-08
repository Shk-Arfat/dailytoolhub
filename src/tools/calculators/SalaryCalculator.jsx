import { useState } from "react";
import Header from "../../components/Header";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SalaryCalculator = () => {
  const [ctc, setCtc] = useState("");
  const [pfPercent, setPfPercent] = useState(12);
  const [taxPercent, setTaxPercent] = useState(10);
  const [result, setResult] = useState(null);

  const calculateSalary = () => {
    if (!ctc) return;

    const yearlyCTC = Number(ctc);

    // PF deduction
    const pf = (yearlyCTC * pfPercent) / 100;

    // Income tax estimate
    const tax = (yearlyCTC * taxPercent) / 100;

    // In-hand salary
    const yearlyInHand = yearlyCTC - pf - tax;
    const monthlyInHand = yearlyInHand / 12;

    setResult({
      pf: pf.toFixed(0),
      tax: tax.toFixed(0),
      yearlyInHand: yearlyInHand.toFixed(0),
      monthlyInHand: monthlyInHand.toFixed(0),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link to="/">
          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
            <ArrowLeft /> Back to Tools
          </button>
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Calculator Card */}
          <div className="bg-white dark:bg-blue-900/20 p-8 rounded-2xl border shadow-sm">
            <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray-200">
              Salary Calculator (CTC → In-Hand)
            </h1>

            {/* Inputs */}
            {/* Annual CTC */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Annual CTC (₹)
              </label>
              <input
                type="number"
                placeholder="Example: 600000"
                value={ctc}
                onChange={(e) => setCtc(e.target.value)}
                className="w-full p-3 rounded-lg border dark:bg-gray-800"
              />
            </div>

            {/* PF */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Provident Fund (PF %) — Default 12%
              </label>
              <input
                type="number"
                value={pfPercent}
                onChange={(e) => setPfPercent(e.target.value)}
                className="w-full p-3 rounded-lg border dark:bg-gray-800"
              />
              <p className="text-sm text-gray-500 mt-1">
                PF is retirement savings deducted by employer (usually 12% of
                salary).
              </p>
            </div>

            {/* Tax */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Estimated Income Tax (%) — Default 10%
              </label>
              <input
                type="number"
                value={taxPercent}
                onChange={(e) => setTaxPercent(e.target.value)}
                className="w-full p-3 rounded-lg border dark:bg-gray-800"
              />
              <p className="text-sm text-gray-500 mt-1">
                This is an estimated tax deduction. Actual tax depends on tax
                slab.
              </p>
            </div>

            <button
              onClick={calculateSalary}
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              Calculate Salary
            </button>

            {/* Results */}
            {result && (
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <p>PF Deduction (Yearly)</p>
                  <p className="font-bold text-lg">₹ {result.pf}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <p>Income Tax (Est.)</p>
                  <p className="font-bold text-lg">₹ {result.tax}</p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                  <p>Yearly In-Hand Salary</p>
                  <p className="font-bold text-lg">₹ {result.yearlyInHand}</p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                  <p>Monthly In-Hand Salary</p>
                  <p className="font-bold text-lg">₹ {result.monthlyInHand}</p>
                </div>
              </div>
            )}
          </div>

          {/* How to Use */}
          <div className="mt-10 bg-white dark:bg-blue-900/20 p-6 rounded-2xl border">
            <h2 className="text-xl font-bold mb-4">How to Use</h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Enter your annual CTC.</li>
              <li>Adjust PF and tax percentage if needed.</li>
              <li>Click calculate to see your estimated in-hand salary.</li>
            </ul>
          </div>

          {/* Info Section */}
          <div className="mt-10 text-gray-600 dark:text-gray-300">
            <h2 className="text-2xl font-bold">About Salary Calculator</h2>
            <p>
              This tool estimates your take-home salary after PF and income tax
              deductions. Actual salary may vary based on tax slabs and company
              benefits.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalaryCalculator;
