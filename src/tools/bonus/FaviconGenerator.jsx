import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, Download } from "lucide-react";
import { Helmet } from "react-helmet-async";

const sizes = [16, 32, 48, 64];

const FaviconGenerator = () => {
  const [images, setImages] = useState([]);

  const resizeImage = (file, size) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, size, size);

        canvas.toBlob((blob) => {
          resolve({
            blob,
            url: URL.createObjectURL(blob),
            size,
          });
        });
      };
    });

  const handleUpload = async (file) => {
    const results = [];
    for (let size of sizes) {
      const resized = await resizeImage(file, size);
      results.push(resized);
    }
    setImages(results);
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    images.forEach((img) => {
      zip.file(`favicon-${img.size}.png`, img.blob);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "favicons.zip");
  };

  return (
    <>
      <Helmet>
        <title>
          Favicon Generator - Create Website Icons Online | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Create and download website favicons in multiple sizes instantly. Free online favicon generator tool."
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
            <h1 className="text-4xl font-bold mb-2">Favicon Generator</h1>
            <p className="text-gray-500 mb-10">
              Upload an image and generate favicon sizes instantly
            </p>

            {/* Upload */}
            {!images.length && (
              <label className="border-2 border-dashed p-16 rounded-3xl bg-white cursor-pointer block">
                <Upload size={60} className="mx-auto mb-4 text-purple-500" />
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-600">
                  Upload Image
                </p>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleUpload(e.target.files[0])}
                />
              </label>
            )}

            {/* Preview */}
            {images.length > 0 && (
              <>
                <div className="flex justify-center gap-8 mb-8">
                  {images.map((img) => (
                    <div key={img.size} className="text-center">
                      <img
                        src={img.url}
                        alt=""
                        className="border p-2 rounded"
                      />
                      <p className="mt-2">
                        {img.size}×{img.size}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={downloadZip}
                  className="bg-purple-500 text-white px-10 py-4 rounded-xl flex gap-2 mx-auto"
                >
                  <Download /> Download Favicons ZIP
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default FaviconGenerator;
