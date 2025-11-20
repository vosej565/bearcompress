import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// PDF.js worker (Vite)
import Worker from "pdfjs-dist/build/pdf.worker.mjs?worker";

// Register worker (pdfjs v4)
pdfjsLib.GlobalWorkerOptions.workerSrc = new Worker();



export default function CompressPdf() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(0.6);
  const [status, setStatus] = useState("");

  const handleCompress = async () => {
    if (!file) {
      alert("PDF 파일을 선택하세요.");
      return;
    }

    try {
      setStatus("PDF 로딩 중...");
      const arrayBuffer = await file.arrayBuffer();

      // PDF.js 로딩
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      setStatus(`총 ${numPages} 페이지 - 압축 시작`);

      // 새로운 PDF 생성
      const pdfOut = new jsPDF({
        orientation: "p",
        unit: "pt",
        format: "a4", // 페이지 기준은 A4로 고정하거나, 페이지마다 조정 가능
      });

      for (let i = 1; i <= numPages; i++) {
        setStatus(`${i}/${numPages} 페이지 처리 중...`);

        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });

        // Canvas 생성
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;

        const imgData = canvas.toDataURL("image/jpeg", quality);

        if (i > 1) {
          pdfOut.addPage([viewport.width, viewport.height]);
          pdfOut.setPage(i);
        }

        pdfOut.addImage(
          imgData,
          "JPEG",
          0,
          0,
          viewport.width,
          viewport.height
        );
      }

      setStatus("PDF 생성 중...");
      const blob = pdfOut.output("blob");

      // 파일 다운로드
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed_${file.name}`;
      a.click();

      setStatus("압축 완료! 파일 다운로드가 시작되었습니다.");
    } catch (err) {
      console.error(err);
      setStatus("오류 발생: " + err.message);
    }
  };

  return (
    <div className="p-6 border rounded-xl bg-white shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">PDF 압축 (브라우저 방식)</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <label className="block mb-2 font-medium">
        압축 품질 ({quality})
        <input
          type="range"
          min="0.3"
          max="0.9"
          step="0.1"
          value={quality}
          onChange={(e) => setQuality(parseFloat(e.target.value))}
          className="w-full mt-1"
        />
      </label>

      <button
        onClick={handleCompress}
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg"
      >
        압축 시작
      </button>

      {status && (
        <p className="mt-4 text-gray-700 text-sm whitespace-pre-line">{status}</p>
      )}
    </div>
  );
}
