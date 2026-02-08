import { useState } from "react";
import Header from "../../components/Header";
import { ArrowLeft, Copy } from "lucide-react";
import { Link } from "react-router-dom";

const ColorConverter = () => {
  const [hex, setHex] = useState("#44a74b");

  // HEX → RGB
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  // RGB → HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) h = s = 0;
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const copy = (text) => navigator.clipboard.writeText(text);

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
          <div className="bg-white dark:bg-blue-900/20 p-8 rounded-2xl border shadow-sm">
            <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray-200">
              Color Converter
            </h1>

            {/* Color Picker */}
            <div className="flex flex-col items-center gap-4">
              <input
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="w-32 h-32 border-none cursor-pointer"
              />

              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="px-4 py-2 rounded-lg border dark:bg-gray-800 text-center"
              />
            </div>

            {/* Preview */}
            <div
              className="mt-6 h-24 rounded-xl border"
              style={{ backgroundColor: hex }}
            />

            {/* Values */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {/* HEX */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-500">HEX</p>
                <p className="font-bold text-lg">{hex}</p>
                <button
                  onClick={() => copy(hex)}
                  className="text-blue-600 mt-2 flex gap-1 mx-auto"
                >
                  <Copy size={16} /> Copy
                </button>
              </div>

              {/* RGB */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-500">RGB</p>
                <p className="font-bold text-lg">
                  rgb({rgb.r}, {rgb.g}, {rgb.b})
                </p>
                <button
                  onClick={() => copy(`rgb(${rgb.r},${rgb.g},${rgb.b})`)}
                  className="text-blue-600 mt-2 flex gap-1 mx-auto"
                >
                  <Copy size={16} /> Copy
                </button>
              </div>

              {/* HSL */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-500">HSL</p>
                <p className="font-bold text-lg">
                  hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                </p>
                <button
                  onClick={() => copy(`hsl(${hsl.h},${hsl.s}%,${hsl.l}%)`)}
                  className="text-blue-600 mt-2 flex gap-1 mx-auto"
                >
                  <Copy size={16} /> Copy
                </button>
              </div>
            </div>
          </div>
          {/* How To Use Card */}
          <div className="mt-10 bg-white dark:bg-blue-900/20 rounded-2xl p-6 border border-gray-200 dark:border-blue-800/30 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              How to Use the Color Converter
            </h2>

            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>
                🎨 Click the <strong>color picker box</strong> to open the color
                selection tool.
              </li>
              <li>
                🖱️ Choose any color from the palette to instantly see its HEX,
                RGB, and HSL values.
              </li>
              <li>
                ⌨️ You can also manually type a HEX color code (example:
                #ff5733).
              </li>
              <li>
                📋 Click the <strong>Copy</strong> button to copy the color
                value for use in your design or code.
              </li>
              <li>👀 The preview box shows the selected color in real-time.</li>
            </ul>
          </div>

          {/* Info Section */}
          <div className="mt-12 space-y-4 text-gray-600 dark:text-gray-300">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              About Color Conversion
            </h2>
            <p>
              Designers and developers use HEX, RGB, and HSL color formats when
              building websites, apps, and graphics. This tool instantly
              converts between color formats and lets you preview colors live.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ColorConverter;
