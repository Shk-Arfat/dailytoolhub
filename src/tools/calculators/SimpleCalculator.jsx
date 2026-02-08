import { useState } from "react";
import Header from "../../components/Header";
import { ArrowLeft, Delete } from "lucide-react";
import { Link } from "react-router-dom";
import { evaluate } from "mathjs";

const SimpleCalculator = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clear = () => setInput("");
  const deleteLast = () => setInput((prev) => prev.slice(0, -1));

  const calculate = () => {
    try {
      const result = evaluate(input);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
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

        <div className="max-w-md mx-auto">
          {/* Calculator Card */}
          <div className="bg-black p-6 rounded-3xl shadow-2xl">
            <h1 className="text-2xl font-bold text-center mb-6 text-white">
              Calculator
            </h1>

            {/* Digital Display */}
            <div
              className="bg-green-900 text-green-200 font-mono text-right 
                  text-5xl p-4 rounded-lg mb-6 tracking-wider"
            >
              {input || "0"}
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-4 gap-3">
              {/* Top row */}
              <button
                onClick={clear}
                className="col-span-2 bg-red-600 text-white p-4 rounded-lg font-bold"
              >
                AC
              </button>

              <button
                onClick={deleteLast}
                className="bg-gray-500 text-white p-4 rounded-lg"
              >
                DEL
              </button>

              <button
                onClick={calculate}
                className="bg-green-600 text-white p-4 rounded-lg font-bold"
              >
                =
              </button>

              {/* Numbers + Operators */}
              {[
                "7",
                "8",
                "9",
                "/",
                "4",
                "5",
                "6",
                "*",
                "1",
                "2",
                "3",
                "-",
                "0",
                ".",
                "%",
                "+",
              ].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleClick(btn)}
                  className={`p-4 rounded-lg text-lg font-semibold ${
                    ["+", "-", "*", "/", "%"].includes(btn)
                      ? "bg-orange-400 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-10 text-gray-600 dark:text-gray-300">
            <h2 className="text-xl font-bold">About Simple Calculator</h2>
            <p>
              This calculator performs basic arithmetic operations such as
              addition, subtraction, multiplication, division and percentages.
            </p>
            <div className="p-4 rounded-lg bg-gray-100">
              Percentage = (Value × Percentage) / 100
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SimpleCalculator;
