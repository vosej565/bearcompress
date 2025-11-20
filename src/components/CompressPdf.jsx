import React, { useState } from "react";
import { compressPdfInWasm } from "@/utils/pdfWasm";
import { useLocation } from "react-router-dom";

export default function CompressPdf() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const location = useLocation();
  const isKorean = location.pathname.startsWith("/ko");

  // 🔵 다국어 텍스트 정의
  const text = {
    selectFile: isKorean ? "파일 선택" : "Select File",
    noFile: isKorean ? "PDF 파일을 선택하세요!" : "Please select a PDF file!",
    compressing: isKorean
      ? "압축 중... 잠시만 기다려 주세요."
      : "Compressing... Please wait.",
    complete: isKorean ? "압축 완료! 다운로드가 시작됩니다." : "Compression complete! Download started.",
    startBtn: isKorean ? "압축 시작" : "Start Compression",
    error: isKorean ? "오류 발생: " : "Error: ",
  };

  const handleCompress = async () => {
    if (!file) return alert(text.noFile);

    try {
      setStatus(text.compressing);

      const compressedBlob = await compressPdfInWasm(file);

      const url = URL.createObjectURL(compressedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed_${file.name}`;
      a.click();

      setStatus(text.complete);
    } catch (err) {
      setStatus(text.error + err);
    }
  };

  return (
    <div className="p-6 border rounded-xl bg-white shadow-md max-w-xl mx-auto">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleCompress}
        className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg"
      >
        {text.startBtn}
      </button>

      {status && (
        <p className="mt-4 text-gray-700 text-sm whitespace-pre-line">{status}</p>
      )}
    </div>
  );
}
