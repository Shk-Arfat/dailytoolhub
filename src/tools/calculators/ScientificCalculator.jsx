import { useState } from "react";
import Header from "../../components/Header";
import { ArrowLeft, Delete } from "lucide-react";
import { Link } from "react-router-dom";
import { evaluate } from "mathjs";

const ScientificCalculator = () => {
  const [input, setInput] = useState("");

  const add = (val) => setInput((prev) => prev + val);
  const clear = () => setInput("");
  const del = () => setInput((prev) => prev.slice(0, -1));

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
          <div className="bg-black p-6 rounded-3xl shadow-2xl">
            <h1 className="text-2xl font-bold text-center mb-6 text-white">
              Scientific Calculator
            </h1>

            {/* Digital Screen */}
            <div
              className="bg-green-900 text-green-300 font-mono text-right 
                  text-2xl p-4 rounded-lg mb-4 tracking-wider"
            >
              {input || "0"}
            </div>

            {/* Top row */}
            <div className="grid grid-cols-4 gap-2 mb-2">
              <button
                onClick={() => add("pi")}
                className="bg-gray-600 text-white p-2 rounded"
              >
                π
              </button>
              <button
                onClick={() => add("e")}
                className="bg-gray-600 text-white p-2 rounded"
              >
                e
              </button>
              <button
                onClick={clear}
                className="bg-red-600 text-white p-2 rounded"
              >
                AC
              </button>
              <button
                onClick={del}
                className="bg-gray-500 text-white p-2 rounded"
              >
                DEL
              </button>
            </div>

            {/* Scientific functions */}
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[
                "sin(",
                "cos(",
                "tan(",
                "log(",
                "ln(",
                "sqrt(",
                "^",
                "(",
                ")",
                "abs(",
                "exp(",
                "1/",
              ].map((btn) => (
                <button
                  key={btn}
                  onClick={() => add(btn)}
                  className="bg-gray-700 text-white p-2 rounded text-sm"
                >
                  {btn}
                </button>
              ))}
            </div>

            {/* Numbers */}
            <div className="grid grid-cols-4 gap-2">
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
                "+",
              ].map((btn) => (
                <button
                  key={btn}
                  onClick={() => add(btn)}
                  className={`p-3 rounded font-semibold ${
                    ["+", "-", "*", "/"].includes(btn)
                      ? "bg-orange-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {btn}
                </button>
              ))}

              <button
                onClick={calculate}
                className="col-span-4 bg-green-600 text-white p-3 rounded-lg font-bold text-lg"
              >
                =
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="mt-10 text-gray-600 dark:text-gray-300">
            <h2 className="text-xl font-bold">About Scientific Calculator</h2>
            <p>
              Perform advanced math including trigonometry, logarithms, powers,
              roots and engineering calculations.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScientificCalculator;
