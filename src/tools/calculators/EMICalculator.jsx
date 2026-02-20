import { useState } from "react";
import Header from "../../components/Header";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Helmet } from "react-helmet-async";

const EMICalculator = () => {
  const [loan, setLoan] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const calculateEMI = () => {
    const P = loan;
    const r = rate / 12 / 100;
    const n = years * 12;

    if (!P || !r || !n) return;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult({
      emi: emi.toFixed(0),
      interest: totalInterest.toFixed(0),
      total: totalPayment.toFixed(0),
    });
  };

  const chartData = result
    ? [
        { name: "Principal", value: Number(loan) },
        { name: "Interest", value: Number(result.interest) },
      ]
    : [];

  return (
    <>
      <Helmet>
        <title>
          EMI Calculator - Loan EMI & Interest Calculator | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Calculate your loan EMI, total interest, and repayment amount instantly. Free and accurate EMI calculator for home, car, and personal loans."
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

          <div className="max-w-3xl mx-auto">
            {/* Card */}
            <div className="bg-white dark:bg-blue-900/20 p-8 rounded-2xl border shadow-sm">
              <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray-200">
                EMI Calculator
              </h1>

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Loan Amount"
                  value={loan}
                  onChange={(e) => setLoan(e.target.value)}
                  className="p-3 rounded-lg border dark:bg-gray-800"
                />

                <input
                  type="number"
                  placeholder="Interest Rate %"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="p-3 rounded-lg border dark:bg-gray-800"
                />

                <input
                  type="number"
                  placeholder="Loan Tenure (years)"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="p-3 rounded-lg border dark:bg-gray-800"
                />
              </div>

              <button
                onClick={calculateEMI}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg"
              >
                Calculate EMI
              </button>

              {result && (
                <div className="mt-10 space-y-6 text-center">
                  <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    ₹ {result.emi} / month
                  </h2>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                      <p>Total Interest</p>
                      <p className="font-bold">₹ {result.interest}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                      <p>Total Payment</p>
                      <p className="font-bold">₹ {result.total}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                      <p>Loan Amount</p>
                      <p className="font-bold">₹ {loan}</p>
                    </div>
                  </div>

                  {/* Pie Chart */}
                  <div className="h-64">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={chartData} dataKey="value" outerRadius={90}>
                          <Cell fill="#2563eb" />
                          <Cell fill="#f59e0b" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            {/* How EMI is Calculated */}
            <div className="mt-12 bg-white dark:bg-blue-900/20 p-6 rounded-2xl border border-gray-200 dark:border-blue-800/30 shadow-sm space-y-4 text-gray-600 dark:text-gray-300">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                How EMI is Calculated
              </h2>

              <p>
                EMI (Equated Monthly Installment) is the fixed amount you pay
                every month to repay your loan. It includes both the principal
                amount and the interest.
              </p>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-center">
                <p className="font-semibold">EMI Formula</p>
                <p className="text-lg font-bold mt-2">
                  EMI = P × r × (1+r)<sup>n</sup> / ((1+r)<sup>n</sup> − 1)
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <strong>P</strong> = Loan amount (Principal)
                </p>
                <p>
                  <strong>r</strong> = Monthly interest rate (Annual rate ÷ 12 ÷
                  100)
                </p>
                <p>
                  <strong>n</strong> = Total number of monthly payments (Years ×
                  12)
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Example
              </h3>

              <p>
                If you take a loan of ₹5,00,000 at 10% annual interest for 5
                years:
              </p>

              <ul className="list-disc pl-6 space-y-1">
                <li>Monthly interest rate = 10 ÷ 12 ÷ 100 = 0.00833</li>
                <li>Total months = 5 × 12 = 60</li>
                <li>EMI ≈ ₹10,624 per month</li>
              </ul>

              <p>
                The EMI remains constant every month, but in the beginning you
                pay more interest and later more principal.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EMICalculator;
