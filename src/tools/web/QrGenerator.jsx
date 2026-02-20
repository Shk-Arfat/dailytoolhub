import { useState, useEffect } from "react";
import QRCode from "qrcode";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Helmet } from "react-helmet-async";

const QrGenerator = () => {
  const [text, setText] = useState("https://dailytools.com");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(300);
  const [qrUrl, setQrUrl] = useState("");

  // Generate QR automatically
  useEffect(() => {
    generateQR();
  }, [text, color, bgColor, size]);

  const generateQR = async () => {
    if (!text) return;

    const url = await QRCode.toDataURL(text, {
      width: size,
      color: {
        dark: color,
        light: bgColor,
      },
      margin: 2,
    });

    setQrUrl(url);
  };

  const downloadPNG = () => {
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "qr-code.png";
    link.click();
  };

  const downloadSVG = async () => {
    const svg = await QRCode.toString(text, {
      type: "svg",
      color: { dark: color, light: bgColor },
    });

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.svg";
    link.click();
  };

  return (
    <>
      <Helmet>
        <title>
          QR Code Generator - Create QR Codes Online Free | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Generate QR codes for URLs, text and data instantly. Free online QR code generator with download option."
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

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-2">QR Code Generator</h1>
            <p className="text-gray-500 mb-10">
              Create QR codes for links, text, email, phone
            </p>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Controls */}
              <div className="space-y-5">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text or URL"
                  className="w-full border p-3 rounded-xl text-gray-800 dark:text-gray-600"
                />

                <div className="flex gap-4 justify-center">
                  <div>
                    <p className="text-sm">QR Color</p>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>

                  <div>
                    <p className="text-sm">Background</p>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <p>Size: {size}px</p>
                  <input
                    type="range"
                    min="150"
                    max="500"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white p-8 rounded-3xl shadow-xl">
                {qrUrl && <img src={qrUrl} className="mx-auto" />}

                <div className="flex gap-4 justify-center mt-6">
                  <button
                    onClick={downloadPNG}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg flex gap-2"
                  >
                    <Download size={18} /> PNG
                  </button>

                  <button
                    onClick={downloadSVG}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg flex gap-2"
                  >
                    <Download size={18} /> SVG
                  </button>
                </div>
              </div>
            </div>
          </div>
          <section className="mt-16 max-w-4xl mx-auto text-left space-y-6">
            <h2 className="text-2xl font-bold">About This QR Code Generator</h2>

            <p>
              Our QR Code Generator allows you to create QR codes instantly for
              URLs, text, email addresses, phone numbers, and more. QR codes
              make it easy to share information quickly by scanning with a
              smartphone camera. This tool works directly in your browser and
              does not store any data, ensuring privacy and security.
            </p>

            <h3 className="text-xl font-semibold">
              How to Use the QR Code Generator
            </h3>

            <ol className="list-decimal ml-6 space-y-2">
              <li>Enter the URL or text you want to convert into a QR code.</li>
              <li>Select size or customization options available</li>
              <li>Download the generated QR code image instantly in PNG or SVG format.</li>
            </ol>

            <h3 className="text-xl font-semibold">Why Use Our QR Code Tool?</h3>

            <ul className="list-disc ml-6 space-y-2">
              <li>Instant QR code generation</li>
              <li>Free and easy to use</li>
              <li>No registration required</li>
              <li>Secure client-side processing</li>
              <li>Download in high quality</li>
            </ul>

            <p>
              This QR code generator is ideal for businesses, students,
              marketers, and developers who need a fast and reliable way to
              share information digitally.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default QrGenerator;
