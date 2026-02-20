import { useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Download } from "lucide-react";
import { Helmet } from "react-helmet-async";

const RemoveDuplicates = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [sortLines, setSortLines] = useState(false);

  const processText = () => {
    if (!input.trim()) return;

    let lines = input.split("\n").filter((line) => line.trim() !== "");

    const map = new Map();

    lines.forEach((line) => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!map.has(key)) map.set(key, line);
    });

    let result = Array.from(map.values());

    if (sortLines) result.sort();

    setOutput(result.join("\n"));
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    alert("Copied!");
  };

  const downloadTxt = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cleaned.txt";
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>
          Remove Duplicate Lines - Free Text Cleaner Tool | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Remove duplicate lines from text instantly. Clean and organize your content with this free online duplicate line remover."
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

          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-2">
              Remove Duplicate Lines
            </h1>
            <p className="text-center text-gray-500 mb-8">
              Clean your text by removing duplicate lines instantly
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Input */}
              <textarea
                placeholder="Paste text here..."
                className="w-full h-[350px] p-4 border rounded-xl text-gray-800 dark:text-gray-600"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              {/* Output */}
              <textarea
                placeholder="Cleaned text..."
                className="w-full h-[350px] p-4 border rounded-x text-gray-800 dark:text-gray-600"
                value={output}
                readOnly
              />
            </div>

            {/* Options */}
            <div className="flex justify-center gap-6 mt-6">
              <label>
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={() => setCaseSensitive(!caseSensitive)}
                />
                <span className="ml-2">Case sensitive</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={sortLines}
                  onChange={() => setSortLines(!sortLines)}
                />
                <span className="ml-2">Sort lines</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={processText}
                className="bg-blue-500 text-white px-6 py-3 rounded-xl"
              >
                Remove Duplicates
              </button>

              <button
                onClick={copyOutput}
                className="bg-green-500 text-white px-6 py-3 rounded-xl flex gap-2"
              >
                <Copy size={18} /> Copy
              </button>

              <button
                onClick={downloadTxt}
                className="bg-purple-500 text-white px-6 py-3 rounded-xl flex gap-2"
              >
                <Download size={18} /> Download
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RemoveDuplicates;
