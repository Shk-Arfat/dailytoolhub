import { useState } from "react";
import Header from "../../components/Header";
import { ArrowLeft, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const TemperatureConverter = () => {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState("Celsius");
  const [to, setTo] = useState("Fahrenheit");

  const units = ["Celsius", "Fahrenheit", "Kelvin"];

  // Temperature conversion formulas
  const convertTemp = () => {
    let celsius;

    if (from === "Celsius") celsius = value;
    if (from === "Fahrenheit") celsius = ((value - 32) * 5) / 9;
    if (from === "Kelvin") celsius = value - 273.15;

    if (to === "Celsius") return celsius;
    if (to === "Fahrenheit") return (celsius * 9) / 5 + 32;
    if (to === "Kelvin") return celsius + 273.15;
  };

  const swapUnits = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const examples = [-40, 0, 10, 25, 37, 50, 100];

  return (
    <>
      <Helmet>
        <title>
          Temperature Converter - Celsius, Fahrenheit, Kelvin | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Convert temperature between Celsius, Fahrenheit and Kelvin instantly. Free online temperature converter calculator."
        />
      </Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Back button */}
          <Link to="/">
            <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-6 transition">
              <ArrowLeft /> Back to Tools
            </button>
          </Link>

          <div className="max-w-3xl mx-auto">
            {/* Converter Card */}
            <div className="bg-white dark:bg-blue-900/20 p-8 rounded-2xl border border-gray-200 dark:border-blue-800/30 shadow-sm">
              <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
                Temperature Converter
              </h1>

              {/* Input */}
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 
                         border border-gray-300 dark:border-blue-800/30 
                         text-gray-900 dark:text-gray-100 mb-4"
              />

              {/* Dropdowns */}
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="p-3 rounded-lg bg-white dark:bg-gray-800 border dark:border-blue-800/30"
                >
                  {units.map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>

                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="p-3 rounded-lg bg-white dark:bg-gray-800 border dark:border-blue-800/30"
                >
                  {units.map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <button
                onClick={swapUnits}
                className="mx-auto my-4 flex items-center gap-2 px-5 py-3 rounded-full 
                         bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              >
                <ArrowUpDown /> Swap
              </button>

              {/* Result */}
              <h2 className="text-3xl text-center font-bold text-blue-600 dark:text-blue-400">
                {convertTemp()?.toFixed(2)} {to}
              </h2>
            </div>

            {/* Quick Conversion Table */}
            <div className="mt-12 bg-white dark:bg-blue-900/20 p-8 rounded-2xl border border-gray-200 dark:border-blue-800/30">
              <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                Common Temperature Conversions
              </h2>

              {examples.map((v) => (
                <div
                  key={v}
                  className="flex justify-between py-4 border-b dark:border-blue-800/30"
                >
                  <span>
                    {v} {from}
                  </span>
                  <span>
                    {(() => {
                      let celsius;
                      if (from === "Celsius") celsius = v;
                      if (from === "Fahrenheit") celsius = ((v - 32) * 5) / 9;
                      if (from === "Kelvin") celsius = v - 273.15;

                      if (to === "Celsius") return celsius.toFixed(2);
                      if (to === "Fahrenheit")
                        return ((celsius * 9) / 5 + 32).toFixed(2);
                      if (to === "Kelvin") return (celsius + 273.15).toFixed(2);
                    })()}{" "}
                    {to}
                  </span>
                </div>
              ))}
            </div>

            {/* Info Section (SEO content) */}
            <div className="mt-12 space-y-4 text-gray-600 dark:text-gray-300">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Temperature Conversion Guide
              </h2>

              <p>
                Temperature conversion is used in weather forecasting, cooking,
                science, and engineering. The most common temperature scales are
                Celsius (°C), Fahrenheit (°F), and Kelvin (K).
              </p>

              <p>
                Celsius is widely used worldwide, Fahrenheit is commonly used in
                the United States, and Kelvin is used in scientific
                calculations. This tool helps you quickly convert between all
                major temperature units.
              </p>

              <p>
                Use this converter to switch between units instantly and
                understand how temperatures compare across different measurement
                systems.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TemperatureConverter;
