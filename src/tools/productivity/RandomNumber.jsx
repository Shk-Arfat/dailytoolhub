import { useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Download, Dice5 } from "lucide-react";
import { Helmet } from "react-helmet-async";

const RandomNumber = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [numbers, setNumbers] = useState([]);

  const generate = () => {
    let result = [];

    if (unique && count > max - min + 1) {
      alert("Range too small for unique numbers!");
      return;
    }

    while (result.length < count) {
      const num = Math.floor(Math.random() * (max - min + 1)) + Number(min);
      if (!unique || !result.includes(num)) result.push(num);
    }

    setNumbers(result);
  };

  const copyNumbers = () => {
    navigator.clipboard.writeText(numbers.join(", "));
    alert("Copied!");
  };

  const downloadTxt = () => {
    const blob = new Blob([numbers.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "random-numbers.txt";
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>
          Random Number Generator - Generate Numbers Online | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Generate random numbers within a custom range instantly. Free online random number generator tool."
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

          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-2">Random Number Generator</h1>
            <p className="text-gray-500 mb-10">
              Generate random numbers within a range
            </p>

            <div className="bg-white p-8 rounded-3xl shadow-xl space-y-6">
              {/* Inputs */}
              <div className="flex gap-4 justify-center text-gray-800 dark:text-gray-600">
                <div>MIN</div>
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  className="border p-2 rounded w-24"
                  placeholder="Min"
                />
                <div>MAX</div>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  className="border p-2 rounded w-24"
                  placeholder="Max"
                />
                <div>Count</div>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  className="border p-2 rounded w-24"
                  placeholder="Count"
                />
              </div>

              <label>
                <input
                  type="checkbox"
                  checked={unique}
                  onChange={() => setUnique(!unique)}
                />
                <span className="ml-2 text-gray-800 dark:text-gray-600">
                  No duplicates
                </span>
              </label>

              {/* Generate button */}
              <button
                onClick={generate}
                className="bg-blue-500 text-white px-10 py-4 rounded-xl flex gap-2 mx-auto"
              >
                <Dice5 /> Generate Numbers
              </button>

              {/* Results */}
              {numbers.length > 0 && (
                <>
                  <div className="bg-gray-100 p-4 rounded-xl text-xl font-semibold text-gray-800 dark:text-gray-600">
                    {numbers.join(", ")}
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={copyNumbers}
                      className="bg-green-500 text-white px-6 py-2 rounded-xl flex gap-2"
                    >
                      <Copy size={18} /> Copy
                    </button>

                    <button
                      onClick={downloadTxt}
                      className="bg-purple-500 text-white px-6 py-2 rounded-xl flex gap-2"
                    >
                      <Download size={18} /> Download
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RandomNumber;
