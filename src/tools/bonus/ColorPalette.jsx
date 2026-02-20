import { useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, RefreshCw, Lock, Unlock } from "lucide-react";
import { Helmet } from "react-helmet-async";

const randomColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

const ColorPalette = () => {
  const [colors, setColors] = useState(
    Array.from({ length: 5 }, () => ({ hex: randomColor(), locked: false })),
  );

  const generatePalette = () => {
    setColors(
      colors.map((c) => (c.locked ? c : { hex: randomColor(), locked: false })),
    );
  };

  const toggleLock = (i) => {
    const newColors = [...colors];
    newColors[i].locked = !newColors[i].locked;
    setColors(newColors);
  };

  const copyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    alert("Copied " + hex);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(colors.map((c) => c.hex).join(", "));
    alert("Palette copied!");
  };

  return (
    <>
      <Helmet>
        <title>Color Palette Generator - Create Beautiful Color Schemes | DailyTools Hub</title>
        <meta
          name="description"
          content="Generate beautiful and modern color palettes instantly. Perfect for designers, developers, and creative projects."
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

          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2">Color Palette Generator</h1>
            <p className="text-gray-500">
              Generate beautiful color palettes instantly
            </p>
          </div>

          {/* Palette */}
          <div className="flex flex-wrap justify-center gap-6 text-gray-800 dark:text-gray-600">
            {colors.map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                <div style={{ background: c.hex }} className="w-40 h-40"></div>

                <div className="p-4 text-center space-y-2">
                  <p className="font-semibold">{c.hex}</p>

                  <div className="flex justify-center gap-3">
                    <Copy
                      className="cursor-pointer"
                      onClick={() => copyColor(c.hex)}
                    />
                    {c.locked ? (
                      <Lock
                        className="cursor-pointer"
                        onClick={() => toggleLock(i)}
                      />
                    ) : (
                      <Unlock
                        className="cursor-pointer"
                        onClick={() => toggleLock(i)}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={generatePalette}
              className="bg-blue-500 text-white px-8 py-3 rounded-xl flex gap-2"
            >
              <RefreshCw /> Generate Palette
            </button>

            <button
              onClick={copyAll}
              className="bg-green-500 text-white px-8 py-3 rounded-xl"
            >
              Copy All Colors
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default ColorPalette;
