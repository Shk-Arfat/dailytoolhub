import { useState } from "react";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import {
  UploadCloud,
  Download,
  ArrowLeft,
  Image as ImageIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const ImageCompressor = () => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [compressed, setCompressed] = useState([]);
  const [quality, setQuality] = useState(0.7);
  const [loading, setLoading] = useState(false);

  const handleFiles = (files) => {
    const imgs = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const previewUrls = imgs.map((img) => URL.createObjectURL(img));
    setImages(imgs);
    setPreviews(previewUrls);
  };

  const compressImages = async () => {
    if (!images.length) return;
    setLoading(true);

    const results = [];

    for (const img of images) {
      const compressedFile = await imageCompression(img, {
        maxSizeMB: quality,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      // 📊 calculate stats INSIDE loop
      const savedBytes = img.size - compressedFile.size;
      const percent = ((savedBytes / img.size) * 100).toFixed(1);

      results.push({
        file: compressedFile,
        url: URL.createObjectURL(compressedFile),
        originalSize: img.size,
        newSize: compressedFile.size,
        savedBytes: savedBytes,
        percent: percent,
        name: img.name,
      });
    }

    setCompressed(results);
    setLoading(false);
  };

  const downloadZip = async () => {
    const zip = new JSZip();

    compressed.forEach((img) => {
      zip.file(img.name, img.file);
    });

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "compressed-images.zip");
  };

  return (
    <>
      <Helmet>
        <title>
          Image Compressor - Reduce Image Size Online Free | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Compress JPG, PNG and WebP images online for free. Reduce image file size instantly without noticeable quality loss. No upload to server."
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
            <h1 className="text-4xl font-bold mb-2">Image Compressor</h1>
            <p className="text-gray-500 mb-10">
              Reduce image size without losing quality
            </p>

            {/* Upload */}
            {images.length === 0 && (
              <label className="border-2 border-dashed p-16 rounded-3xl bg-white cursor-pointer block">
                <UploadCloud size={60} className="mx-auto mb-4 text-blue-500" />
                <p className="text-xl font-semibold text-gray-800">
                  Select Images
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>
            )}

            {/* Preview grid */}
            {images.length > 0 && (
              <div className="flex justify-center">
                <div
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    maxWidth: "900px",
                  }}
                >
                  {previews.map((src, i) => (
                    <div key={i} className="bg-white p-3 rounded-2xl shadow">
                      <img
                        src={src}
                        className="h-40 w-full object-cover rounded"
                      />
                      <p className="text-sm mt-2 truncate text-gray-400 dark:text-gray-500">
                        {images[i].name}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {(images[i].size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compression slider */}
            {images.length > 0 && !compressed.length && (
              <div className="mt-10">
                <p className="mb-2">Compression Level</p>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-64"
                />

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={compressImages}
                  className="block mx-auto mt-6 bg-blue-500 text-white px-10 py-4 rounded-xl"
                >
                  {loading ? "Compressing..." : "Compress Images"}
                </motion.button>
              </div>
            )}

            {/* Results */}
            {compressed.length > 0 && (
              <div className="mt-12">
                {/* <h2 className="text-2xl font-semibold mb-8">Compressed Images</h2> */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-10">
                  <h3 className="text-2xl font-semibold text-green-700">
                    Compression Complete Successfully
                  </h3>
                  <p className="text-green-600">
                    Your images are ready to download.
                  </p>
                </div>

                <div className="flex justify-center">
                  <div
                    className="grid gap-6"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      maxWidth: "900px",
                    }}
                  >
                    {compressed.map((img, i) => (
                      <div
                        key={i}
                        className="bg-white p-5 rounded-3xl shadow-xl border"
                      >
                        {/* success badge */}
                        <div className="text-green-600 text-sm font-semibold mb-2">
                          {img.percent}% smaller
                        </div>

                        <img
                          src={img.url}
                          className="h-44 w-full object-cover rounded-xl mb-3"
                        />

                        <p className="text-sm font-semibold truncate text-gray-400 dark:text-gray-500">
                          {img.name}
                        </p>

                        {/* before vs after */}
                        <div className="text-xs text-gray-500 mt-1 mb-2">
                          {(img.originalSize / 1024 / 1024).toFixed(2)}MB →{" "}
                          <span className="text-green-600 font-bold">
                            {(img.newSize / 1024 / 1024).toFixed(2)}MB
                          </span>
                        </div>

                        {/* progress bar */}
                        <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${img.percent}%` }}
                          />
                        </div>

                        <p className="text-xs text-gray-400 mb-4">
                          Saved {(img.savedBytes / 1024).toFixed(0)} KB
                        </p>

                        <a
                          href={img.url}
                          download={`compressed-${img.name}`}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2 w-full justify-center"
                        >
                          <Download size={16} /> Download Image
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* optional bulk download */}
                <button
                  onClick={downloadZip}
                  className="mt-8 text-sm text-gray-500 bg-gray-100 dark:blue-800 border rounded-lg px-5 py-3 inline-flex items-center gap-2 hover:bg-gray-200 underline transition"
                >
                  Download all as ZIP (optional)
                </button>
              </div>
            )}
          </div>
          <section className="mt-16 max-w-4xl mx-auto text-left space-y-6">
            <h2 className="text-2xl font-bold">About This Tool</h2>
            <h2 className="text-2xl font-bold">
              Compress Images Without Losing Quality
            </h2>
            <p>
              Our Image Compressor helps you reduce image file size while
              maintaining visual quality. Large images can slow down websites,
              increase upload times, and consume unnecessary storage space. With
              this tool, you can compress JPG, PNG, and WebP images instantly in
              your browser.
            </p>
            <p>
              The compression process happens locally, which means your images
              never leave your device. This ensures privacy and faster
              performance. You can adjust compression levels and download the
              optimized image immediately.
            </p>
            <h4 className="text-xl font-bold">Key Features:</h4>
            <ul className="list-disc ml-6 space-y-2">
              <li>Reduce image size for faster uploads</li>
              <li>Improve website loading speed</li>
              <li>Maintain high image clarity</li>
              <li>Works with JPG, PNG, WebP</li>
              <li>No file stored on server</li>
            </ul>
            <p>
              This tool is perfect for developers, designers, bloggers, and
              anyone who needs smaller image files for email, websites, or
              social media.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default ImageCompressor;
