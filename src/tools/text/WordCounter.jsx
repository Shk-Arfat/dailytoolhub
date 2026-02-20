import { useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy } from "lucide-react";
import { Helmet } from "react-helmet-async";

const WordCounter = () => {
  const [text, setText] = useState("");

  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const paragraphs = text.split(/\n+/).filter((p) => p.trim() !== "");

  const stats = {
    words: words.length,
    characters: text.length,
    charactersNoSpace: text.replace(/\s/g, "").length,
    sentences: sentences.length,
    paragraphs: paragraphs.length,
    readingTime: Math.ceil(words.length / 200), // 200 wpm
    speakingTime: Math.ceil(words.length / 130), // 130 wpm
  };

  // Keyword density
  const keywordDensity = () => {
    const freq = {};
    words.forEach((w) => {
      const word = w.toLowerCase();
      freq[word] = (freq[word] || 0) + 1;
    });

    const sorted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return sorted;
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <>
      <Helmet>
        <title>Word Counter - Free Online Tool | DailyTools Hub</title>
        <meta
          name="description"
          content="Free online word counter tool to count words, characters, sentences and reading time instantly."
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
              Word Counter
            </h1>
            <p className="text-center text-gray-500 mb-8">
              Count words, characters, reading time and more
            </p>

            {/* Text area */}
            <textarea
              placeholder="Type or paste your text here..."
              className="w-full h-[250px] p-4 border rounded-xl text-gray-800 dark:text-gray-600"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              onClick={copyText}
              className="mt-3 bg-green-500 text-white px-6 py-2 rounded-lg flex gap-2"
            >
              <Copy size={18} /> Copy Text
            </button>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 text-gray-800 dark:text-gray-600">
              {Object.entries(stats).map(([key, val]) => (
                <div
                  key={key}
                  className="bg-white p-6 rounded-2xl shadow text-center"
                >
                  <p className="text-3xl font-bold">{val}</p>
                  <p className="text-gray-500 capitalize">{key}</p>
                </div>
              ))}
            </div>

            {/* Keyword density */}
            {words.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Top Keywords</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-gray-800 dark:text-gray-600">
                  {keywordDensity().map(([word, count]) => (
                    <div
                      key={word}
                      className="bg-white p-4 rounded-xl shadow text-center"
                    >
                      <p className="font-semibold">{word}</p>
                      <p className="text-gray-500">
                        {((count / words.length) * 100).toFixed(1)}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <section className="mt-16 max-w-4xl mx-auto text-left space-y-6">
            <h2 className="text-2xl font-bold">About This Tool</h2>
            <h2 className="text-2xl font-bold">Word Counter</h2>
            <p>
              Our Word Counter is a fast and accurate online tool designed to
              instantly calculate the number of words, characters, sentences,
              and paragraphs in your text. Whether you are writing an essay,
              blog post, academic assignment, or social media caption, knowing
              your word count is essential. This tool helps writers stay within
              required limits while improving clarity and structure.
            </p>
            <p>
              Unlike many online tools, everything works directly in your
              browser. Your content is not uploaded or stored on any server,
              ensuring complete privacy and security. The tool updates results
              in real time as you type, making it perfect for SEO writers,
              students, and professionals.
            </p>
            <h4 className="text-xl font-bold">Key Features:</h4>
            <ul className="list-disc ml-6 space-y-2">
              <li>Real-time word and character counting</li>
              <li>Sentence and paragraph detection</li>
              <li>Reading time estimation</li>
              <li>100% free and secure</li>
              <li>No login required</li>
            </ul>
          </section>
        </main>
      </div>
    </>
  );
};

export default WordCounter;
