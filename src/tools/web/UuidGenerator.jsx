import { useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Download, RefreshCw } from "lucide-react";
import { Helmet } from "react-helmet-async";

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const UuidGenerator = () => {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState([]);

  const generate = () => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(generateUUID());
    }
    setUuids(list);
  };

  const copyOne = (id) => {
    navigator.clipboard.writeText(id);
    alert("Copied!");
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    alert("All copied!");
  };

  const downloadTxt = () => {
    const blob = new Blob([uuids.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uuids.txt";
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>
          UUID Generator - Generate Unique IDs Online | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Generate version 4 UUIDs instantly for your applications and development projects. Free online UUID generator tool."
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
            <h1 className="text-4xl font-bold mb-2">UUID Generator</h1>
            <p className="text-gray-500 mb-10">
              Generate random UUID v4 instantly
            </p>

            <div className="bg-white p-8 rounded-3xl shadow-xl space-y-6 text-gray-800 dark:text-gray-600">
              <div>
                <p>How many UUIDs?</p>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  className="border p-2 rounded mt-2 w-24 text-center text-gray-800 dark:text-gray-600"
                />
              </div>

              <button
                onClick={generate}
                className="bg-blue-500 text-white px-10 py-4 rounded-xl flex gap-2 mx-auto"
              >
                <RefreshCw /> Generate UUIDs
              </button>

              {uuids.length > 0 && (
                <>
                  <div className="bg-gray-100 rounded-xl p-4 max-h-64 overflow-auto text-left text-gray-800 dark:text-gray-600">
                    {uuids.map((id, i) => (
                      <div key={i} className="flex justify-between py-1">
                        <span className="font-mono">{id}</span>
                        <Copy
                          className="cursor-pointer"
                          size={18}
                          onClick={() => copyOne(id)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={copyAll}
                      className="bg-green-500 text-white px-6 py-2 rounded-xl"
                    >
                      Copy All
                    </button>
                    <button
                      onClick={downloadTxt}
                      className="bg-purple-500 text-white px-6 py-2 rounded-xl flex gap-2"
                    >
                      <Download size={18} /> Download TXT
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UuidGenerator;
