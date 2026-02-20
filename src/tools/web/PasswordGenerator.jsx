import { useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, RefreshCw } from "lucide-react";
import { Helmet } from "react-helmet-async";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [avoidSimilar, setAvoidSimilar] = useState(false);
  const [password, setPassword] = useState("");

  const similar = "il1Lo0O";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const nums = "0123456789";
  const syms = "!@#$%^&*()_+-=[]{}<>?";

  const generatePassword = () => {
    let chars = "";
    if (uppercase) chars += upper;
    if (lowercase) chars += lower;
    if (numbers) chars += nums;
    if (symbols) chars += syms;

    if (avoidSimilar) {
      chars = chars
        .split("")
        .filter((c) => !similar.includes(c))
        .join("");
    }

    if (!chars) return alert("Select at least one option");

    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pass);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    alert("Copied!");
  };

  const strength = () => {
    let score = 0;
    if (length > 10) score++;
    if (numbers) score++;
    if (symbols) score++;
    if (uppercase && lowercase) score++;
    return ["Weak", "Medium", "Strong", "Very Strong"][score];
  };

  return (
    <>
      <Helmet>
        <title>
          Secure Password Generator - Create Strong Passwords | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Generate strong, secure and random passwords instantly. Free password generator with customizable length and complexity."
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

          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-2">Password Generator</h1>
            <p className="text-gray-500 mb-10">
              Create strong and secure passwords instantly
            </p>

            <div className="bg-white p-8 rounded-3xl shadow-xl space-y-6">
              {/* Output */}
              <div className="flex gap-2 text-gray-800 dark:text-gray-600">
                <input
                  value={password}
                  readOnly
                  className="flex-1 border p-3 rounded-xl text-lg"
                  placeholder="Click generate..."
                />
                <button
                  onClick={copyPassword}
                  className="bg-green-500 text-white px-4 rounded-xl"
                >
                  <Copy />
                </button>
              </div>

              {/* Strength */}
              {password && (
                <p className="font-semibold text-gray-800 dark:text-gray-600">
                  Strength: {strength()}
                </p>
              )}

              {/* Length */}
              <div className="text-gray-800 dark:text-gray-600">
                <p>Password Length: {length}</p>
                <input
                  type="range"
                  min="6"
                  max="32"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-4 text-left text-gray-800">
                <label>
                  <input
                    type="checkbox"
                    checked={uppercase}
                    onChange={() => setUppercase(!uppercase)}
                  />{" "}
                  Uppercase
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={lowercase}
                    onChange={() => setLowercase(!lowercase)}
                  />{" "}
                  Lowercase
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={numbers}
                    onChange={() => setNumbers(!numbers)}
                  />{" "}
                  Numbers
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={symbols}
                    onChange={() => setSymbols(!symbols)}
                  />{" "}
                  Symbols
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={avoidSimilar}
                    onChange={() => setAvoidSimilar(!avoidSimilar)}
                  />{" "}
                  Avoid similar chars
                </label>
              </div>

              <button
                onClick={generatePassword}
                className="bg-blue-500 text-white px-10 py-4 rounded-xl flex gap-2 mx-auto"
              >
                <RefreshCw /> Generate Password
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PasswordGenerator;
