import { useState } from "react";
import Header from "../../components/Header";
import { ArrowLeft, Delete } from "lucide-react";
import { Link } from "react-router-dom";
import { evaluate } from "mathjs";
import { Helmet } from "react-helmet-async";

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
  const btnBase = `
  p-4 text-lg font-bold rounded-xl
  transition-all duration-150
  shadow-[0_6px_0_rgb(0,0,0),0_10px_15px_rgba(0,0,0,0.4)]
  active:translate-y-[4px]
  active:shadow-[0_2px_0_rgb(0,0,0)]
`;

  const numberBtn = `
  bg-gradient-to-b from-gray-100 to-gray-300 text-black
`;

  const operatorBtn = `
  bg-gradient-to-b from-orange-300 to-orange-500 text-white
`;

  const functionBtn = `
  bg-gradient-to-b from-red-400 to-red-600 text-white
`;

  const equalBtn = `
  bg-gradient-to-b from-green-400 to-green-600 text-white
`;

  return (
    <>
      <Helmet>
        <title>
          Simple Calculator - Free Online Calculator | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Free simple calculator for basic arithmetic operations like addition, subtraction, multiplication, and division."
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

          <div className="max-w-md mx-auto">
            {/* Calculator Card */}
            <div
              className="
  p-8 rounded-[40px] 
  bg-gradient-to-b from-gray-700 to-gray-900
  shadow-[inset_0_4px_8px_rgba(255,255,255,0.1),_0_20px_40px_rgba(0,0,0,0.8)]
  border border-gray-800
"
            >
              <h1 className="text-2xl font-bold text-center mb-6 text-white">
                Calculator
              </h1>
              <p className="text-gray-300 text-sm mb-2 tracking-widest text-center">
                v.01
              </p>

              {/* Digital Display */}
              <div
                className="
  bg-gradient-to-b from-green-200 to-green-400
  text-gray-900 font-mono text-right text-5xl p-5 mb-8 rounded-xl tracking-wider
  shadow-[inset_0_4px_10px_rgba(0,0,0,0.4),_inset_0_-3px_6px_rgba(255,255,255,0.6)]
  border border-green-300
"
              >
                {input || "0"}
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-4 gap-3">
                {/* Top row */}
                <button
                  onClick={clear}
                  className={`col-span-2 ${btnBase} ${functionBtn}`}
                >
                  AC
                </button>

                <button
                  onClick={deleteLast}
                  className={`${btnBase} bg-gradient-to-b from-gray-400 to-gray-600 text-white`}
                >
                  DEL
                </button>

                <button
                  onClick={calculate}
                  className={`${btnBase} ${equalBtn}`}
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
                    className={`${btnBase} ${
                      ["+", "-", "*", "/", "%"].includes(btn)
                        ? operatorBtn
                        : numberBtn
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
    </>
  );
};

export default SimpleCalculator;
