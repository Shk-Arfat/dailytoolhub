import { useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Upload, Download } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Base64Encoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // Encode text
  const encodeText = () => {
    try {
      setOutput(btoa(input));
    } catch {
      alert("Invalid text ❌");
    }
  };

  // Decode text
  const decodeText = () => {
    try {
      setOutput(atob(input));
    } catch {
      alert("Invalid Base64 ❌");
    }
  };

  // Upload file → convert to base64
  const handleFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setOutput(reader.result);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    alert("Copied!");
  };

  const downloadDecoded = () => {
    const link = document.createElement("a");
    link.href = "data:text/plain;base64," + btoa(output);
    link.download = "decoded.txt";
    link.click();
  };

  return (
    <>
      <Helmet>
        <title>Base64 Encoder & Decoder Online | DailyTools Hub</title>
        <meta
          name="description"
          content="Encode and decode Base64 strings instantly. Free online Base64 converter tool for developers and data encoding."
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

          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-2">
              Base64 Encoder / Decoder
            </h1>
            <p className="text-gray-500 mb-8">
              Encode and decode Base64 instantly
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Input */}
              <textarea
                placeholder="Enter text or Base64..."
                className="w-full h-[300px] p-4 border rounded-xl text-gray-800 dark:text-gray-600"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              {/* Output */}
              <textarea
                placeholder="Result..."
                className="w-full h-[300px] p-4 border rounded-xl text-gray-800 dark:text-gray-600"
                value={output}
                readOnly
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button
                onClick={encodeText}
                className="bg-blue-500 text-white px-6 py-3 rounded-xl"
              >
                Encode Text
              </button>

              <button
                onClick={decodeText}
                className="bg-purple-500 text-white px-6 py-3 rounded-xl"
              >
                Decode Base64
              </button>

              <label className="bg-orange-500 text-white px-6 py-3 rounded-xl flex gap-2 cursor-pointer">
                <Upload /> Upload File
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFile(e.target.files[0])}
                />
              </label>

              <button
                onClick={copyOutput}
                className="bg-green-500 text-white px-6 py-3 rounded-xl flex gap-2"
              >
                <Copy /> Copy
              </button>

              <button
                onClick={downloadDecoded}
                className="bg-gray-700 text-white px-6 py-3 rounded-xl flex gap-2"
              >
                <Download /> Download Text
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Base64Encoder;
