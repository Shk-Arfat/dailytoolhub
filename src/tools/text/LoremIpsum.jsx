import { useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Download } from "lucide-react";
import { Helmet } from "react-helmet-async";

const baseText =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";

const wordsArr = baseText.split(" ");

const randomWord = () => wordsArr[Math.floor(Math.random() * wordsArr.length)];

const generateWords = (count) => {
  let result = [];
  for (let i = 0; i < count; i++) result.push(randomWord());
  return result.join(" ");
};

const generateSentence = () => {
  const length = Math.floor(Math.random() * 12) + 6;
  return generateWords(length) + ".";
};

const generateParagraph = () => {
  const sentences = Math.floor(Math.random() * 4) + 3;
  let paragraph = [];
  for (let i = 0; i < sentences; i++) paragraph.push(generateSentence());
  return paragraph.join(" ");
};

const LoremIpsum = () => {
  const [amount, setAmount] = useState(3);
  const [type, setType] = useState("paragraphs");
  const [output, setOutput] = useState("");

  const generate = () => {
    let result = [];

    if (type === "words") {
      result.push(generateWords(amount));
    }

    if (type === "sentences") {
      for (let i = 0; i < amount; i++) result.push(generateSentence());
    }

    if (type === "paragraphs") {
      for (let i = 0; i < amount; i++) result.push(generateParagraph());
    }

    setOutput(result.join("\n\n"));
  };

  const copyText = () => {
    navigator.clipboard.writeText(output);
    alert("Copied!");
  };

  const downloadTxt = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lorem-ipsum.txt";
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>
          Lorem Ipsum Generator - Dummy Text Creator Online | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Generate Lorem Ipsum placeholder text instantly for design and development projects. Free dummy text generator online."
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
            <h1 className="text-4xl font-bold mb-2">Lorem Ipsum Generator</h1>
            <p className="text-gray-500 mb-10">
              Generate placeholder text instantly
            </p>

            <div className="bg-white p-8 rounded-3xl shadow-xl space-y-6">
              {/* Controls */}
              <div className="flex justify-center gap-4 text-gray-800 dark:text-gray-600">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border p-2 rounded w-24 text-center"
                />

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="paragraphs">Paragraphs</option>
                  <option value="sentences">Sentences</option>
                  <option value="words">Words</option>
                </select>
              </div>

              <button
                onClick={generate}
                className="bg-blue-500 text-white px-10 py-4 rounded-xl"
              >
                Generate Text
              </button>

              {/* Output */}
              {output && (
                <>
                  <textarea
                    value={output}
                    readOnly
                    className="w-full h-[250px] p-4 border rounded-xl text-gray-800 dark:text-gray-600"
                  />

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={copyText}
                      className="bg-green-500 text-white px-6 py-2 rounded-xl flex gap-2"
                    >
                      <Copy size={18} /> Copy
                    </button>

                    <button
                      onClick={downloadTxt}
                      className="bg-purple-500 text-white px-6 py-2 rounded-xl flex gap-2"
                    >
                      <Download size={18} /> Download
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

export default LoremIpsum;
