import { useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Download } from "lucide-react";
import { Helmet } from "react-helmet-async";

const TextSorter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [ascending, setAscending] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);

  const sortText = () => {
    if (!input.trim()) return;

    let lines = input.split("\n");

    if (removeEmpty) {
      lines = lines.filter((line) => line.trim() !== "");
    }

    if (removeDuplicates) {
      lines = [...new Set(lines)];
    }

    lines.sort((a, b) => (ascending ? a.localeCompare(b) : b.localeCompare(a)));

    setOutput(lines.join("\n"));
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
    a.download = "sorted.txt";
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>
          Text Sorter - Sort Lines Alphabetically Online | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Sort text lines alphabetically (A-Z or Z-A) instantly. Free online text sorting tool for quick formatting and data organization."
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
            <h1 className="text-4xl font-bold text-center mb-2">Text Sorter</h1>
            <p className="text-center text-gray-500 mb-8">
              Sort text lines alphabetically or reverse order
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
                placeholder="Sorted result..."
                className="w-full h-[350px] p-4 border rounded-xl text-gray-800 dark:text-gray-600"
                value={output}
                readOnly
              />
            </div>

            {/* Options */}
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              <label>
                <input
                  type="checkbox"
                  checked={ascending}
                  onChange={() => setAscending(!ascending)}
                />
                <span className="ml-2">Ascending (A → Z)</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={removeEmpty}
                  onChange={() => setRemoveEmpty(!removeEmpty)}
                />
                <span className="ml-2">Remove empty lines</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={removeDuplicates}
                  onChange={() => setRemoveDuplicates(!removeDuplicates)}
                />
                <span className="ml-2">Remove duplicates</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={sortText}
                className="bg-blue-500 text-white px-6 py-3 rounded-xl"
              >
                Sort Text
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

export default TextSorter;
