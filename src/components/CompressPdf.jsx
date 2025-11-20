import React, { useState } from "react";
import { compressPdfInWasm } from "@/utils/pdfWasm";

export default function CompressPdf() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleCompress = async () => {
    if (!file) return alert("PDF 파일을 선택하세요!");

    try {
      setStatus("압축 중... 잠시만 기다려 주세요.");

      const compressedBlob = await compressPdfInWasm(file);

      const url = URL.createObjectURL(compressedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed_${file.name}`;
      a.click();

      setStatus("압축 완료!");
    } catch (err) {
      setStatus("오류 발생: " + err);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleCompress}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        압축 시작
      </button>

      {status && <p className="mt-2 text-gray-700">{status}</p>}
    </div>
  );
}
