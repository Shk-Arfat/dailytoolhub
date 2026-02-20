import { useState } from "react";
import Header from "../../components/Header";
import { ArrowLeft, Copy, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const BinaryConverter = () => {
  const [binary, setBinary] = useState("");
  const [decimal, setDecimal] = useState("");
  const [hex, setHex] = useState("");
  const [ascii, setAscii] = useState("");

  // Binary → Others
  const convertBinary = (value) => {
    setBinary(value);

    if (!value) {
      setDecimal("");
      setHex("");
      setAscii("");
      return;
    }

    const dec = parseInt(value, 2);
    setDecimal(dec.toString());
    setHex(dec.toString(16).toUpperCase());

    const chars = value.match(/.{1,8}/g) || [];
    const text = chars.map((b) => String.fromCharCode(parseInt(b, 2))).join("");
    setAscii(text);
  };

  // Decimal → Binary
  const convertDecimal = (value) => {
    setDecimal(value);
    if (!value) return setBinary("");

    const bin = parseInt(value).toString(2);
    setBinary(bin);
    setHex(parseInt(value).toString(16).toUpperCase());
  };

  // ASCII → Binary
  const convertAscii = (value) => {
    setAscii(value);
    const bin = value
      .split("")
      .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
    setBinary(bin);
  };

  const copy = (text) => navigator.clipboard.writeText(text);
  const clear = () => {
    setBinary("");
    setDecimal("");
    setHex("");
    setAscii("");
  };

  return (
    <>
      <Helmet>
        <title>
          Binary to Decimal Converter - Online Number Converter | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Convert binary numbers to decimal and decimal to binary instantly. Free online binary converter tool."
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
            {/* Converter Card */}
            <div className="bg-white dark:bg-blue-900/20 p-8 rounded-2xl border shadow-sm">
              <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray-200">
                Binary Converter
              </h1>

              {/* Binary */}
              <div className="mb-4">
                <label className="font-semibold">Binary</label>
                <input
                  value={binary}
                  onChange={(e) => convertBinary(e.target.value)}
                  placeholder="Enter binary..."
                  className="w-full p-3 rounded-lg border dark:bg-gray-800"
                />
              </div>

              {/* Decimal */}
              <div className="mb-4">
                <label className="font-semibold">Decimal</label>
                <input
                  value={decimal}
                  onChange={(e) => convertDecimal(e.target.value)}
                  placeholder="Enter decimal..."
                  className="w-full p-3 rounded-lg border dark:bg-gray-800"
                />
              </div>

              {/* Hex */}
              <div className="mb-4">
                <label className="font-semibold">Hexadecimal</label>
                <input
                  value={hex}
                  readOnly
                  className="w-full p-3 rounded-lg border dark:bg-gray-800"
                />
              </div>

              {/* ASCII */}
              <div className="mb-4">
                <label className="font-semibold">ASCII Text</label>
                <input
                  value={ascii}
                  onChange={(e) => convertAscii(e.target.value)}
                  placeholder="Enter text..."
                  className="w-full p-3 rounded-lg border dark:bg-gray-800"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => copy(binary)}
                  className="bg-blue-600 text-white px-4 py-3 rounded-lg flex gap-2"
                >
                  <Copy size={18} /> Copy Binary
                </button>

                <button
                  onClick={clear}
                  className="bg-red-500 text-white px-4 py-3 rounded-lg flex gap-2"
                >
                  <Trash2 size={18} /> Clear
                </button>
              </div>
            </div>

            {/* How to Use */}
            <div className="mt-10 bg-white dark:bg-blue-900/20 p-6 rounded-2xl border">
              <h2 className="text-xl font-bold mb-4">How to Use</h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>Enter binary, decimal, or text.</li>
                <li>The converter updates all formats instantly.</li>
                <li>Copy results with one click.</li>
              </ul>
            </div>

            {/* Info Section */}
            <div className="mt-10 text-gray-600 dark:text-gray-300 space-y-4">
              <h2 className="text-2xl font-bold">About Binary Conversion</h2>
              <p>
                Binary is the language of computers using only 0 and 1. This
                tool converts binary numbers into decimal, hexadecimal, and
                ASCII text.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default BinaryConverter;
