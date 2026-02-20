import { useState } from "react";
import TurndownService from "turndown";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Download } from "lucide-react";
import { Helmet } from "react-helmet-async";

const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

const HtmlToMarkdown = () => {
  const [html, setHtml] = useState("");
  const [markdown, setMarkdown] = useState("");

  const convert = () => {
    if (!html.trim()) return;
    const md = turndownService.turndown(html);
    setMarkdown(md);
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    alert("Copied!");
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.md";
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>HTML to Markdown Converter Online | DailyTools Hub</title>
        <meta
          name="description"
          content="Convert HTML code into Markdown format instantly. Free online HTML to Markdown converter tool for developers."
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
              HTML → Markdown
            </h1>
            <p className="text-center text-gray-500 mb-8">
              Convert HTML code into clean Markdown
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* HTML Input */}
              <textarea
                placeholder="Paste HTML here..."
                className="w-full h-[400px] p-4 border rounded-xl font-mono text-gray-800 dark:text-gray-600"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
              />

              {/* Markdown Output */}
              <textarea
                placeholder="Markdown result..."
                className="w-full h-[400px] p-4 border rounded-xl font-mono text-gray-800 dark:text-gray-600"
                value={markdown}
                readOnly
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={convert}
                className="bg-blue-500 text-white px-6 py-3 rounded-xl"
              >
                Convert
              </button>

              <button
                onClick={copyMarkdown}
                className="bg-green-500 text-white px-6 py-3 rounded-xl flex gap-2"
              >
                <Copy size={18} /> Copy
              </button>

              <button
                onClick={downloadMarkdown}
                className="bg-purple-500 text-white px-6 py-3 rounded-xl flex gap-2"
              >
                <Download size={18} /> Download .MD
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default HtmlToMarkdown;
