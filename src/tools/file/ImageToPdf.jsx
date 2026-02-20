import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import {
  UploadCloud,
  Image as ImageIcon,
  X,
  ArrowUp,
  ArrowDown,
  Download,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const ImageToPdf = () => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [outputName, setOutputName] = useState("images");
  const [orientation, setOrientation] = useState("portrait");
  const [pageSize, setPageSize] = useState("A4");

  // A4 & Letter sizes in PDF points
  const sizes = {
    A4: { w: 595, h: 842 },
    Letter: { w: 612, h: 792 },
  };

  // Upload images
  const handleFiles = (files) => {
    const imgs = Array.from(files).filter((f) => f.type.startsWith("image/"));

    const newPreviews = imgs.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...imgs]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (i) => {
    setImages(images.filter((_, index) => index !== i));
    setPreviews(previews.filter((_, index) => index !== i));
  };

  const moveUp = (i) => {
    if (i === 0) return;
    const newImages = [...images];
    const newPreviews = [...previews];

    [newImages[i], newImages[i - 1]] = [newImages[i - 1], newImages[i]];
    [newPreviews[i], newPreviews[i - 1]] = [newPreviews[i - 1], newPreviews[i]];

    setImages(newImages);
    setPreviews(newPreviews);
  };

  const moveDown = (i) => {
    if (i === images.length - 1) return;
    const newImages = [...images];
    const newPreviews = [...previews];

    [newImages[i], newImages[i + 1]] = [newImages[i + 1], newImages[i]];
    [newPreviews[i], newPreviews[i + 1]] = [newPreviews[i + 1], newPreviews[i]];

    setImages(newImages);
    setPreviews(newPreviews);
  };

  // Convert images → PDF
  const convertToPdf = async () => {
    if (!images.length) return;
    setLoading(true);

    const pdf = await PDFDocument.create();
    let { w, h } = sizes[pageSize];

    if (orientation === "landscape") [w, h] = [h, w];

    for (let file of images) {
      const bytes = await file.arrayBuffer();
      let img;

      if (file.type.includes("png")) img = await pdf.embedPng(bytes);
      else img = await pdf.embedJpg(bytes);

      const page = pdf.addPage([w, h]);
      const { width, height } = img.scale(1);

      const scale = Math.min(w / width, h / height);
      const imgW = width * scale;
      const imgH = height * scale;

      page.drawImage(img, {
        x: (w - imgW) / 2,
        y: (h - imgH) / 2,
        width: imgW,
        height: imgH,
      });
    }

    const pdfBytes = await pdf.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    setDownloadUrl(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>
          Image to PDF Converter - JPG & PNG to PDF Online | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Convert JPG, PNG and WebP images into a single PDF document instantly. Free online Image to PDF converter with fast and secure processing."
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
            <h1 className="text-4xl font-bold mb-2">Image → PDF</h1>
            <p className="text-gray-500 mb-10">
              Convert JPG, PNG, WEBP images to PDF
            </p>

            {/* Upload */}
            {images.length === 0 && (
              <label className="border-2 border-dashed p-16 rounded-3xl bg-white cursor-pointer hover:shadow-2xl transition block">
                <UploadCloud
                  size={60}
                  className="mx-auto mb-4 text-green-500"
                />
                <p className="text-gray-400">Click to Upload</p>
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

            {/* Image grid */}
            {images.length > 0 && (
              <div className="flex justify-center">
                <div
                  className="grid gap-6 justify-center"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    maxWidth: "800px",
                  }}
                >
                  {previews.map((src, i) => (
                    <div key={i} className="bg-white p-3 rounded-2xl shadow">
                      <img
                        src={src}
                        className="h-40 w-40 object-cover rounded"
                      />
                      <p className="text-sm mt-2 truncate">{images[i].name}</p>

                      <div className="flex justify-between mt-2">
                        <ArrowUp
                          size={18}
                          onClick={() => moveUp(i)}
                          className="cursor-pointer"
                        />
                        <ArrowDown
                          size={18}
                          onClick={() => moveDown(i)}
                          className="cursor-pointer"
                        />
                        <X
                          size={18}
                          onClick={() => removeImage(i)}
                          className="cursor-pointer text-red-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Options */}
            {images.length > 0 && !downloadUrl && (
              <div className="mt-10 space-y-4">
                <input
                  value={outputName}
                  onChange={(e) => setOutputName(e.target.value)}
                  className="border px-4 py-2 rounded"
                />

                <div className="flex gap-4 justify-center">
                  <select
                    onChange={(e) => setOrientation(e.target.value)}
                    className="border px-3 py-2 rounded"
                  >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>

                  <select
                    onChange={(e) => setPageSize(e.target.value)}
                    className="border px-3 py-2 rounded"
                  >
                    <option value="A4">A4</option>
                    <option value="Letter">Letter</option>
                  </select>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={convertToPdf}
                  className="bg-green-500 text-white px-10 py-4 rounded-xl text-lg"
                >
                  {loading ? "Converting..." : "Convert to PDF"}
                </motion.button>
              </div>
            )}

            {/* Download */}
            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`${outputName}.pdf`}
                className="bg-blue-500 text-white px-10 py-4 rounded-xl inline-flex gap-2 mt-8"
              >
                <Download /> Download PDF
              </a>
            )}
          </div>
          <section className="mt-16 max-w-4xl mx-auto text-left space-y-6">
            <h2 className="text-2xl font-bold">About This Tool</h2>
            <h2 className="text-2xl font-bold">
              Convert Images to PDF Online Free
            </h2>
            <p>
              Our Image to PDF converter allows you to quickly transform JPG,
              PNG, and WebP images into a professional PDF document. Whether you
              need to submit scanned documents, combine screenshots, or organize
              photos, this tool makes the process simple and fast.
            </p>
            <p>
              The conversion happens directly in your browser, ensuring that
              your files remain private and secure. You can upload multiple
              images, arrange them in your preferred order, and download a
              single merged PDF instantly. There is no watermark, no login
              requirement, and no file storage on our servers.
            </p>
            <h4 className="text-xl font-bold">
              Why Use Our Image to PDF Tool?
            </h4>
            <ul className="list-disc ml-6 space-y-2">
              <li>Convert JPG, PNG, and WebP to PDF</li>
              <li>Arrange images before generating PDF</li>
              <li>Fast and secure browser-based processing</li>
              <li>No watermark or registration required</li>
              <li>Completely free to use</li>
            </ul>
            <p>
              This tool is ideal for students, professionals, and designers who
              need a quick and reliable way to create PDF documents from images.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default ImageToPdf;
