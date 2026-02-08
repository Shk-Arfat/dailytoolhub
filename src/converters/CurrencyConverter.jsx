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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link to="/">
          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-6">
            <ArrowLeft /> Back to Tools
          </button>
        </Link>

        <div className="max-w-6xl mx-auto">
          {/* Converter Box */}
          <div className="bg-white dark:bg-blue-900/20 rounded-2xl p-8 border border-gray-200 dark:border-blue-800/30 shadow-sm">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
              Currency Converter
            </h1>

            {/* Amount */}
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border mb-4 dark:bg-gray-800"
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
              className="mx-auto my-4 flex items-center gap-2 px-5 py-3 rounded-full 
             bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            >
              <ArrowUpDown /> Swap
            </button>

            <button
              onClick={convert}
              className="w-full mt-6 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              Convert
            </button>

            {result && (
              <h2 className="text-3xl font-bold text-center mt-6 text-blue-600 dark:text-blue-400">
                {amount} {from} = {result.toFixed(2)} {to}
              </h2>
            )}
          </div>
          {/* Examples & History Chart */}
          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {/* FROM → TO */}
            <div className="bg-white dark:bg-blue-900/20 p-10 rounded-2xl border">
              <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                Convert {from} to {to}
              </h2>

              {examples.map((v) => (
                <div key={v} className="flex justify-between py-3 border-b">
                  <span className="text-blue-600 font-medium">
                    {v} {from}
                  </span>
                  <span>
                    {(v * (result / amount)).toFixed(4)} {to}
                  </span>
                </div>
              ))}
            </div>

            {/* TO → FROM */}
            <div className="bg-white dark:bg-blue-900/20 p-10 rounded-2xl border">
              <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                Convert {to} to {from}
              </h2>

              {examples.map((v) => (
                <div key={v} className="flex justify-between py-3 border-b">
                  <span className="text-blue-600 font-medium">
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
          <div className="mt-16 bg-white dark:bg-blue-900/20 p-9 rounded-2xl border">
            {/* Current rate info */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
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
                  <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                <CartesianGrid
                  stroke="#52555a" // gray-700
                  strokeDasharray="1 4"
                  opacity={0.3}
                />

                <XAxis
                  dataKey="date"
                  tick={{ fill: "#9CA3AF", fontSize: 12 }} // gray-400
                  axisLine={{ stroke: "#374151" }} // gray-700
                  tickLine={{ stroke: "#374151" }}
                />

                <YAxis
                  domain={["auto", "auto"]}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
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
  );
};

export default CurrencyConverter;
