import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { ArrowLeft, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";
import { Helmet } from "react-helmet-async";

const API = "https://api.frankfurter.app";

// currency → country code map (for flags)
const currencyCountry = {
  USD: "US",
  EUR: "EU",
  GBP: "GB",
  INR: "IN",
  JPY: "JP",
  AUD: "AU",
  CAD: "CA",
  CHF: "CH",
  CNY: "CN",
  AED: "AE",
  NZD: "NZ",
  SGD: "SG",
  HKD: "HK",
  KRW: "KR",
  ZAR: "ZA",
  SEK: "SE",
  NOK: "NO",
  DKK: "DK",
  PLN: "PL",
  TRY: "TR",
  THB: "TH",
  MYR: "MY",
  IDR: "ID",
  PHP: "PH",
  SAR: "SA",
  MXN: "MX",
  BRL: "BR",
  RUB: "RU",
  CZK: "CZ",
  HUF: "HU",
  ILS: "IL",
  PKR: "PK",
  BDT: "BD",
  LKR: "LK",
  VND: "VN",
};

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [currentRate, setCurrentRate] = useState(null);

  // convert currency
  const convert = async () => {
    try {
      const res = await fetch(
        `${API}/latest?amount=${amount}&from=${from}&to=${to}`,
      );
      const data = await res.json();

      setResult(data.rates[to]);
      setCurrentRate(data.rates[to] / amount);

      // format last updated time
      const now = new Date();
      setLastUpdated(
        now.toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      );
    } catch (err) {
      console.log("convert error", err);
    }
  };

  // history chart data
  // const fetchHistory = async () => {
  //   try {
  //     const today = new Date();
  //     const lastYear = new Date();
  //     lastYear.setFullYear(today.getFullYear() - 1);

  //     const end = today.toISOString().split("T")[0];
  //     const start = lastYear.toISOString().split("T")[0];

  //     const res = await fetch(`${API}/${start}..${end}?from=${from}&to=${to}`);

  //     const data = await res.json();

  //     // Convert API object → chart array
  //     const chartData = Object.entries(data.rates).map(([date, value]) => ({
  //       date: date.substring(0, 7), // show YYYY-MM only
  //       rate: value[to],
  //     }));

  //     setHistory(chartData);
  //   } catch (err) {
  //     console.log("History API error", err);
  //   }
  // };

  const options = currencies.map((c) => ({
    value: c,
    label: (
      <div className="flex items-center gap-2">
        <ReactCountryFlag countryCode={currencyCountry[c] || "US"} svg />
        {c}
      </div>
    ),
  }));
  const examples = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000];

  // load currencies
  useEffect(() => {
    fetch(`${API}/currencies`)
      .then((res) => res.json())
      .then((data) => setCurrencies(Object.keys(data)));
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 1️⃣ Fetch latest conversion
        const latestRes = await fetch(
          `${API}/latest?amount=${amount}&from=${from}&to=${to}`,
        );
        const latestData = await latestRes.json();

        // 2️⃣ Fetch last year history
        const today = new Date();
        const lastYear = new Date();
        lastYear.setFullYear(today.getFullYear() - 1);

        const end = today.toISOString().split("T")[0];
        const start = lastYear.toISOString().split("T")[0];

        const historyRes = await fetch(
          `${API}/${start}..${end}?from=${from}&to=${to}`,
        );
        const historyData = await historyRes.json();

        // 3️⃣ Prepare chart data
        const chartData = Object.entries(historyData.rates).map(
          ([date, value]) => ({
            date: date.substring(0, 7),
            rate: value[to],
          }),
        );

        // 4️⃣ Prepare time string
        const now = new Date();
        const formattedTime = now.toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        });

        // ⭐ SINGLE STATE UPDATE BATCH
        setResult(latestData.rates[to]);
        setCurrentRate(latestData.rates[to] / amount);
        setLastUpdated(formattedTime);
        setHistory(chartData);
      } catch (err) {
        console.log("API error:", err);
      }
    };

    fetchAllData();
  }, [from, to, amount]);

  return (
    <>
      <Helmet>
        <title>
          Currency Converter - Live Exchange Rate Calculator | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Convert currencies instantly using live exchange rates. Free online currency converter for USD, INR, EUR, GBP and more."
        />
      </Helmet>
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1220]">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <Link to="/">
            <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-6 transition">
              <ArrowLeft /> Back to Tools
            </button>
          </Link>

          <div className="max-w-6xl mx-auto">
            {/* Converter Box */}
            <div className="bg-white dark:bg-[#111827] rounded-xl p-8 border border-gray-200 dark:border-[#1F2937] shadow-sm">
              <h1 className="text-3xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
                Currency Converter
              </h1>

              {/* Amount */}
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#0F172A] border border-gray-300 dark:border-[#1F2937] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />

              {/* Dropdowns */}
              <div className="grid grid-cols-2 gap-4 text-gray-800 dark:text-gray-800">
                <Select options={options} onChange={(e) => setFrom(e.value)} />
                <Select options={options} onChange={(e) => setTo(e.value)} />
              </div>
              <button
                onClick={() => {
                  const temp = from;
                  setFrom(to);
                  setTo(temp);
                }}
                className="mx-auto my-4 flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-100 dark:bg-[#1F2937] hover:bg-gray-200 dark:hover:bg-[#273449] text-gray-800 dark:text-gray-200 transition"
              >
                <ArrowUpDown /> Swap
              </button>

              <button
                onClick={convert}
                className="w-full mt-6 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
              >
                Convert
              </button>

              {result && (
                <h2 className="text-4xl font-bold text-center mt-6 text-gray-900 dark:text-white tracking-tight">
                  {amount} {from} = {result.toFixed(2)} {to}
                </h2>
              )}
            </div>
            {/* Examples & History Chart */}
            <div className="grid md:grid-cols-2 gap-8 mt-14">
              {/* FROM → TO */}
              <div className="bg-white dark:bg-[#111827] p-8 rounded-xl border border-gray-200 dark:border-[#1F2937]">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                  Convert {from} to {to}
                </h2>

                {examples.map((v) => (
                  <div key={v} className="flex justify-between py-3 border-b border-gray-200 dark:border-[#1F2937]">
                    <span className="text-gray-900 dark:text-white font-medium">
                      {v} {from}
                    </span>
                    <span>
                      {(v * (result / amount)).toFixed(4)} {to}
                    </span>
                  </div>
                ))}
              </div>

              {/* TO → FROM */}
              <div className="bg-white dark:bg-[#111827] p-8 rounded-xl border border-gray-200 dark:border-[#1F2937]">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                  Convert {to} to {from}
                </h2>

                {examples.map((v) => (
                  <div key={v} className="flex justify-between py-3 border-b border-gray-200 dark:border-[#1F2937]">
                    <span className="text-gray-900 dark:text-white font-medium">
                      {v} {to}
                    </span>
                    <span>
                      {(v / (result / amount)).toFixed(4)} {from}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Exchange Rate Chart */}
            <div className="mt-16 bg-white dark:bg-[#111827] p-9 rounded-xl border border-gray-200 dark:border-[#1F2937]">
              {/* Current rate info */}
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  1 {from} = {currentRate?.toFixed(4)} {to}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {lastUpdated}
                </p>
              </div>

              <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                {from} to {to} Trend for the Past Year
              </h2>

              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={history}>
                  {/* Gradient */}
                  <defs>
                    <linearGradient
                      id="rateGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#2563eb"
                        stopOpacity={0.55}
                      />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  <CartesianGrid
                    stroke="#E5E7EB" // gray-700
                    strokeDasharray="3 3"
                    opacity={0.3}
                    className="dark:stroke-[#1F2937]"
                  />

                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6B7280", fontSize: 12 }} // gray-400
                    axisLine={{ stroke: "#374151" }} // gray-700
                    tickLine={{ stroke: "#374151" }}
                  />

                  <YAxis
                    domain={["auto", "auto"]}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    axisLine={{ stroke: "#374151" }}
                    tickLine={{ stroke: "#374151" }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827", // gray-900
                      border: "1px solid #374151",
                      borderRadius: "10px",
                      color: "#E5E7EB", // gray-200
                    }}
                    labelStyle={{ color: "#9CA3AF" }}
                  />

                  {/* Line + Gradient Fill */}
                  <Area
                    type="monotone"
                    dataKey="rate"
                    stroke="#2563eb"
                    strokeWidth={1.8}
                    fill="url(#rateGradient)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CurrencyConverter;
