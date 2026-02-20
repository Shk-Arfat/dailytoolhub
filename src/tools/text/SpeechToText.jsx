import { useState, useRef } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Mic, Square, Copy, Download } from "lucide-react";
import { Helmet } from "react-helmet-async";

const SpeechToText = () => {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState("en-US");

  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setText((prev) => prev + " " + transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  const downloadTxt = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "speech-text.txt";
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>
          Speech to Text Converter - Voice Typing Online | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Convert speech to text in real-time using your microphone. Free online voice typing and speech recognition tool."
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
            <h1 className="text-4xl font-bold mb-2">Speech to Text</h1>
            <p className="text-gray-500 mb-10">
              Convert your voice into text in real-time
            </p>

            <div className="bg-white p-8 rounded-3xl shadow-xl space-y-6">
              {/* Language */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border p-2 rounded text-gray-800 dark:text-gray-600"
              >
                <option value="en-US">English</option>
                <option value="hi-IN">Hindi</option>
                <option value="ur-PK">Urdu</option>
              </select>

              {/* Mic buttons */}
              <div className="flex justify-center gap-4">
                {!listening ? (
                  <button
                    onClick={startListening}
                    className="bg-green-500 text-white px-6 py-3 rounded-xl flex gap-2"
                  >
                    <Mic /> Start
                  </button>
                ) : (
                  <button
                    onClick={stopListening}
                    className="bg-red-500 text-white px-6 py-3 rounded-xl flex gap-2"
                  >
                    <Square /> Stop
                  </button>
                )}
              </div>

              {/* Status */}
              <p className={listening ? "text-red-500" : "text-gray-400"}>
                {listening ? "🔴 Listening..." : "🟢 Idle"}
              </p>

              {/* Text output */}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-[250px] p-4 border rounded-xl text-gray-800 dark:text-gray-600"
                placeholder="Your speech will appear here..."
              />

              {/* Actions */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={copyText}
                  className="bg-blue-500 text-white px-6 py-2 rounded-xl flex gap-2"
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
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SpeechToText;
