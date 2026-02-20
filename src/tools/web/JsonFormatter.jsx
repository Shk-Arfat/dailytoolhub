import { useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Download } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Helmet } from "react-helmet-async";

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (err) {
      setError("Invalid JSON ❌");
      setOutput("");
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (err) {
      setError("Invalid JSON ❌");
      setOutput("");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    alert("Copied!");
  };

  const downloadJSON = () => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>JSON Formatter & Validator Online | DailyTools Hub</title>
        <meta
          name="description"
          content="Format, beautify and validate JSON data instantly. Free online JSON formatter and validator tool for developers."
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
              JSON Formatter
            </h1>
            <p className="text-center text-gray-500 mb-8">
              Beautify, validate and minify JSON instantly
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Input */}
              <textarea
                placeholder="Paste JSON here..."
                className="w-full h-[400px] p-4 border rounded-xl text-gray-800 dark:text-gray-600"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              {/* Output */}
              <div className="bg-white rounded-xl shadow p-4 h-[400px] overflow-auto">
                {error && <p className="text-red-500">{error}</p>}
                {output && (
                  <SyntaxHighlighter language="json" style={materialLight}>
                    {output}
                  </SyntaxHighlighter>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={formatJSON}
                className="bg-blue-500 text-white px-6 py-3 rounded-xl"
              >
                Format
              </button>
              <button
                onClick={minifyJSON}
                className="bg-purple-500 text-white px-6 py-3 rounded-xl"
              >
                Minify
              </button>
              <button
                onClick={copyOutput}
                className="bg-green-500 text-white px-6 py-3 rounded-xl flex gap-2"
              >
                <Copy size={18} /> Copy
              </button>
              <button
                onClick={downloadJSON}
                className="bg-orange-500 text-white px-6 py-3 rounded-xl flex gap-2"
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

export default JsonFormatter;
