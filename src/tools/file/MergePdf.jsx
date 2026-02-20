import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import {
  UploadCloud,
  FileText,
  X,
  Download,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const generatePreview = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();

    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
    });

    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 1.2 });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("PDF preview error:", error);
    return null;
  }
};

const MergePdf = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [previews, setPreviews] = useState([]);
  const [outputName, setOutputName] = useState("merged");

  // Add files
  const handleFiles = async (selectedFiles) => {
    const pdfFiles = Array.from(selectedFiles).filter(
      (file) => file.type === "application/pdf",
    );

    const newPreviews = [];

    for (let file of pdfFiles) {
      const preview = await generatePreview(file);
      newPreviews.push(preview);
    }

    setFiles((prev) => [...prev, ...pdfFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove file
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  // Reorder files
  const moveUp = (index) => {
    if (index === 0) return;

    const newFiles = [...files];
    const newPreviews = [...previews];

    [newFiles[index], newFiles[index - 1]] = [
      newFiles[index - 1],
      newFiles[index],
    ];

    [newPreviews[index], newPreviews[index - 1]] = [
      newPreviews[index - 1],
      newPreviews[index],
    ];

    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const moveDown = (index) => {
    if (index === files.length - 1) return;

    const newFiles = [...files];
    const newPreviews = [...previews];

    // swap with NEXT item
    [newFiles[index], newFiles[index + 1]] = [
      newFiles[index + 1],
      newFiles[index],
    ];

    [newPreviews[index], newPreviews[index + 1]] = [
      newPreviews[index + 1],
      newPreviews[index],
    ];

    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  // Merge PDFs
  const mergePdfs = async () => {
    if (files.length < 2) return alert("Add at least 2 PDFs");

    setLoading(true);

    const mergedPdf = await PDFDocument.create();

    for (let file of files) {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();
    const blob = new Blob([mergedBytes], { type: "application/pdf" });
    setDownloadUrl(URL.createObjectURL(blob));

    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>
          Merge PDF Files Online Free - Combine PDFs | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Merge multiple PDF files into one document in seconds. Rearrange pages and download instantly. 100% free and secure."
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
          <div className="max-w-5xl mx-auto px-6 py-10">
            {/* Page title */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold mb-2">Merge PDF</h1>
              <p className="text-gray-500">
                Combine PDFs in the order you want
              </p>
            </div>

            {/* Upload box */}
            {files.length === 0 && (
              <label className="w-full border-2 border-dashed rounded-3xl p-16 text-center bg-white cursor-pointer hover:shadow-xl transition block">
                <UploadCloud
                  size={60}
                  className="mx-auto text-orange-500 mb-4"
                />
                <p className="text-xl font-semibold">Select PDF files</p>
                <p className="text-gray-400">or drag & drop PDFs here</p>

                <input
                  type="file"
                  multiple
                  accept="application/pdf"
                  hidden
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>
            )}

            {/* File list */}
            {files.length > 0 && (
              <div className="flex justify-center">
                <div
                  className="grid gap-6 justify-center"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    maxWidth: "800px",
                  }}
                >
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow p-3 relative"
                    >
                      {/* Thumbnail */}
                      {previews[index] ? (
                        <img
                          src={previews[index]}
                          alt="preview"
                          className="rounded-lg mb-2 w-full h-40 object-cover"
                        />
                      ) : (
                        <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-lg mb-2">
                          <FileText size={40} className="text-gray-400" />
                        </div>
                      )}

                      {/* File name */}
                      <p className="text-sm font-medium truncate text-gray-400 dark:text-gray-800">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-800">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>

                      {/* Controls */}
                      <div className="flex justify-between mt-2">
                        <ArrowUp
                          size={18}
                          className="cursor-pointer"
                          onClick={() => moveUp(index)}
                        />
                        <ArrowDown
                          size={18}
                          className="cursor-pointer"
                          onClick={() => moveDown(index)}
                        />
                        <X
                          size={18}
                          className="cursor-pointer text-red-400"
                          onClick={() => removeFile(index)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {files.length > 0 && !downloadUrl && (
              <div className="mt-8 text-center">
                <p className="mb-2 text-sm text-gray-500">Output file name</p>
                <input
                  value={outputName}
                  onChange={(e) => setOutputName(e.target.value)}
                  className="border rounded-lg px-1 py-2 text-center text-gray-400 dark:text-gray-800"
                />
                <span className="ml-1 text-gray-400">.pdf</span>
              </div>
            )}

            {/* Merge button */}
            {files.length > 0 && !downloadUrl && (
              <div className="text-center">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={mergePdfs}
                  className="mt-8 bg-orange-500 text-white px-10 py-4 rounded-xl text-lg shadow-xl"
                >
                  {loading ? "Merging..." : "Merge PDFs"}
                </motion.button>
              </div>
            )}

            {/* Download */}
            {downloadUrl && (
              <div className="text-center">
                <a
                  href={downloadUrl}
                  download={`${outputName || "merged"}.pdf`}
                  className="mt-8 bg-green-500 text-white px-10 py-4 rounded-xl inline-flex gap-2 rounded-xl"
                >
                  <Download /> Download Merged PDF
                </a>
              </div>
            )}
          </div>
          <section className="mt-16 max-w-4xl mx-auto text-left space-y-6">
            <h2 className="text-2xl font-bold">About This Tool</h2>
            <h2 className="text-2xl font-bold">
              Combine Multiple PDF Files Into One
            </h2>
            <p>
              The Merge PDF tool allows you to combine multiple PDF documents
              into a single file quickly and securely. Whether you are
              submitting assignments, business reports, or scanned documents,
              merging PDFs helps keep everything organized in one file.
            </p>
            <p>
              You can upload multiple PDFs, rearrange their order, and download
              the merged document instantly. The entire process runs in your
              browser, ensuring your files remain private.
            </p>
            <h4 className="text-xl font-bold">Key Features:</h4>
            <ul className="list-disc ml-6 space-y-2">
              <li>Merge unlimited PDFs</li>
              <li>Rearrange file order easily</li>
              <li>Instant download</li>
              <li>No watermark</li>
              <li>Completely free</li>
            </ul>
            <p>
              This tool is ideal for students, professionals, and anyone who
              needs to manage PDF documents efficiently.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default MergePdf;
