import { useState } from "react";
import Header from "../../components/Header";
import { ArrowLeft, Delete } from "lucide-react";
import { Link } from "react-router-dom";
import { evaluate } from "mathjs";
import { Helmet } from "react-helmet-async";

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
  const btnBase = `
  p-3 rounded-xl font-bold
  transition-all duration-150
  shadow-[0_6px_0_rgb(0,0,0),0_10px_15px_rgba(0,0,0,0.4)]
  active:translate-y-[4px]
  active:shadow-[0_2px_0_rgb(0,0,0)]
`;

  const numberBtn = `bg-gradient-to-b from-gray-100 to-gray-300 text-black`;
  const operatorBtn = `bg-gradient-to-b from-orange-300 to-orange-500 text-white`;
  const functionBtn = `bg-gradient-to-b from-gray-400 to-gray-600 text-white`;
  const dangerBtn = `bg-gradient-to-b from-red-400 to-red-600 text-white`;
  const equalBtn = `bg-gradient-to-b from-green-400 to-green-600 text-white`;

  return (
    <>
      <Helmet>
        <title>
          Scientific Calculator Online - Advanced Calculator | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Advanced scientific calculator for trigonometry, logarithms, exponents, and complex calculations. Free and easy to use."
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
            <div
              className="
  p-8 rounded-[40px]
  bg-gradient-to-b from-gray-700 to-gray-900
  shadow-[inset_0_4px_8px_rgba(255,255,255,0.1),_0_20px_40px_rgba(0,0,0,0.8)]
  border border-gray-800
"
            >
              <h1 className="text-2xl font-bold text-center mb-6 text-white">
                Scientific Calculator
              </h1>

              {/* Digital Screen */}
              <div
                className="
  bg-gradient-to-b from-green-200 to-green-400
  text-gray-900 font-mono text-right text-3xl p-5 mb-6 rounded-xl tracking-wider
  shadow-[inset_0_4px_10px_rgba(0,0,0,0.4),_inset_0_-3px_6px_rgba(255,255,255,0.6)]
  border border-green-300
"
              >
                {input || "0"}
              </div>

              {/* Top row */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                <button
                  onClick={() => add("pi")}
                  className={`${btnBase} ${functionBtn}`}
                >
                  π
                </button>
                <button
                  onClick={() => add("e")}
                  className={`${btnBase} ${functionBtn}`}
                >
                  e
                </button>
                <button onClick={clear} className={`${btnBase} ${dangerBtn}`}>
                  AC
                </button>
                <button onClick={del} className={`${btnBase} ${functionBtn}`}>
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
                    className={`${btnBase} ${functionBtn} text-sm`}
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
                    className={`${btnBase} ${
                      ["+", "-", "*", "/"].includes(btn)
                        ? operatorBtn
                        : numberBtn
                    }`}
                  >
                    {btn}
                  </button>
                ))}

                <button
                  onClick={calculate}
                  className={`col-span-4 ${btnBase} ${equalBtn} text-lg`}
                >
                  =
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="mt-10 text-gray-600 dark:text-gray-300">
              <h2 className="text-xl font-bold">About Scientific Calculator</h2>
              <p>
                Perform advanced math including trigonometry, logarithms,
                powers, roots and engineering calculations.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ScientificCalculator;
