import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, Square } from "lucide-react";
import { Helmet } from "react-helmet-async";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [voice, setVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const v = speechSynthesis.getVoices();
      setVoices(v);
      setVoice(v[0]);
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = () => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    speechSynthesis.speak(utterance);
    setSpeaking(true);

    utterance.onend = () => setSpeaking(false);
  };

  const pause = () => speechSynthesis.pause();
  const stop = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <>
      <Helmet>
        <title>
          Text to Speech - Convert Text to Voice Online | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Convert text into natural sounding speech instantly. Free online text-to-speech tool with fast audio generation."
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
            <h1 className="text-4xl font-bold mb-2">Text to Speech</h1>
            <p className="text-gray-500 mb-10">
              Convert text into natural sounding speech
            </p>

            <div className="bg-white p-8 rounded-3xl shadow-xl space-y-6">
              {/* Text input */}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-[200px] p-4 border rounded-xl text-gray-800 dark:text-gray-600"
                placeholder="Type or paste text..."
              />

              {/* Voice selection */}
              <select
                onChange={(e) => setVoice(voices[e.target.value])}
                className="border p-2 rounded w-full text-gray-800 dark:text-gray-600"
              >
                {voices.map((v, i) => (
                  <option key={i} value={i}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>

              {/* Sliders */}
              <div className="flex gap-6 text-gray-800 dark:text-gray-600">
                <div className="flex-1">
                  <p>Speed: {rate}</p>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="flex-1 text-gray-800 dark:text-gray-600">
                  <p>Pitch: {pitch}</p>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={speak}
                  className="bg-green-500 text-white px-6 py-3 rounded-xl flex gap-2"
                >
                  <Play /> Play
                </button>

                <button
                  onClick={pause}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-xl flex gap-2"
                >
                  <Pause /> Pause
                </button>

                <button
                  onClick={stop}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl flex gap-2"
                >
                  <Square /> Stop
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TextToSpeech;
