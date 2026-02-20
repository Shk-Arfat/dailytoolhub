import { useState } from "react";
import Header from "../../components/Header";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const GSTCalculator = () => {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState(18);
  const [type, setType] = useState("add");
  const [result, setResult] = useState(null);

  const calculateGST = () => {
    if (!amount) return;

    let gstAmount, finalAmount;

    if (type === "add") {
      gstAmount = (amount * gstRate) / 100;
      finalAmount = Number(amount) + gstAmount;
    } else {
      gstAmount = amount - amount / (1 + gstRate / 100);
      finalAmount = amount;
      setAmount((amount / (1 + gstRate / 100)).toFixed(2));
    }

    setResult({
      gst: gstAmount.toFixed(2),
      final: finalAmount.toFixed(2),
      cgst: (gstAmount / 2).toFixed(2),
      sgst: (gstAmount / 2).toFixed(2),
    });
  };

  const quickRates = [5, 12, 18, 28];

  return (
    <>
      <Helmet>
        <title>
          GST Calculator - Calculate GST Online India | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Free GST calculator to add or remove GST instantly. Calculate CGST, SGST, and IGST quickly and accurately."
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
                GST Calculator
              </h1>

              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 rounded-lg border dark:bg-gray-800 mb-4"
              />

              {/* Add / Remove */}
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setType("add")}
                  className={`px-4 py-2 rounded-lg ${type === "add" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  Add GST
                </button>

                <button
                  onClick={() => setType("remove")}
                  className={`px-4 py-2 rounded-lg ${type === "remove" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  Remove GST
                </button>
              </div>

              {/* GST rates */}
              <div className="flex gap-3 mb-6">
                {quickRates.map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setGstRate(rate)}
                    className={`px-4 py-2 rounded-lg ${gstRate === rate ? "bg-green-600 text-white" : "bg-gray-200"}`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>

              <button
                onClick={calculateGST}
                className="w-full bg-blue-600 text-white py-3 rounded-lg"
              >
                Calculate GST
              </button>

              {result && (
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                    <p>GST Amount</p>
                    <p className="font-bold text-lg">₹ {result.gst}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                    <p>Total Amount</p>
                    <p className="font-bold text-lg">₹ {result.final}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                    <p>CGST (Half)</p>
                    <p className="font-bold">₹ {result.cgst}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                    <p>SGST (Half)</p>
                    <p className="font-bold">₹ {result.sgst}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="mt-10 space-y-4 text-gray-600 dark:text-gray-300">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                About GST Calculator
              </h2>
              <p>
                GST (Goods and Services Tax) is an indirect tax used in India.
                This tool helps you calculate GST and split it into CGST and
                SGST.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default GSTCalculator;
