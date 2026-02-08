import { useState } from 'react';
import Header from '../../components/Header';
import { ArrowLeft, Copy, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const TextCaseConverter = () => {
  const [text, setText] = useState("");

  const toUpper = () => setText(text.toUpperCase());
  const toLower = () => setText(text.toLowerCase());

  const toTitleCase = () =>
    setText(text.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()));

  const toSentenceCase = () =>
    setText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());

  const capitalizeWords = () =>
    setText(text.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "));

  const copyText = () => navigator.clipboard.writeText(text);
  const clearText = () => setText("");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link to="/">
          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
            <ArrowLeft /> Back to Tools
          </button>
        </Link>

        <div className="max-w-4xl mx-auto">

          {/* Converter Card */}
          <div className="bg-white dark:bg-blue-900/20 rounded-2xl p-8 border shadow-sm">

            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
              Text Case Converter
            </h1>

            {/* Textarea */}
            <textarea
              rows="7"
              placeholder="Type or paste your text here..."
              value={text}
              onChange={(e)=>setText(e.target.value)}
              className="w-full p-4 rounded-lg border dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />

            {/* Buttons */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <button onClick={toUpper} className="bg-green-900 text-white py-3 rounded-lg">UPPERCASE</button>
              <button onClick={toLower} className="bg-green-900 text-white py-3 rounded-lg">lowercase</button>
              <button onClick={toTitleCase} className="bg-green-900 text-white py-3 rounded-lg">Title Case</button>
              <button onClick={toSentenceCase} className="bg-green-900 text-white py-3 rounded-lg">Sentence case</button>
              <button onClick={capitalizeWords} className="bg-green-900 text-white py-3 rounded-lg">Capitalize Words</button>

              <button onClick={copyText} className="bg-green-600 text-white py-3 rounded-lg flex justify-center gap-2">
                <Copy size={18}/> Copy
              </button>

              <button onClick={clearText} className="bg-red-500 text-white py-3 rounded-lg flex justify-center gap-2">
                <Trash2 size={18}/> Clear
              </button>

            </div>
          </div>

          {/* How to Use Card */}
          <div className="mt-10 bg-white dark:bg-blue-900/20 p-6 rounded-2xl border">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              How to Use the Text Case Converter
            </h2>

            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>✍️ Paste or type your text in the text box.</li>
              <li>🔠 Choose a case conversion button.</li>
              <li>📋 Click Copy to copy the converted text.</li>
              <li>🧹 Use Clear to reset the text.</li>
            </ul>
          </div>

          {/* Info Section */}
          <div className="mt-10 space-y-4 text-gray-600 dark:text-gray-300">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              About Text Case Conversion
            </h2>

            <p>
              Text case converters help writers, students, and developers quickly
              format text into uppercase, lowercase, title case, or sentence case.
            </p>

            <p>
              This tool is useful for content writing, social media, coding, and
              formatting documents.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default TextCaseConverter;
