importScripts("/gs/gs-worker.js");

let ready = false;

Module.onRuntimeInitialized = () => {
  ready = true;
  postMessage({ ready: true });
};

// Ghostscript PDF 압축 실행 함수 (서명 고정)
async function runGhostscript(inputBytes) {
  return new Promise((resolve, reject) => {
    const args = [
      "-dSAFER",
      "-dBATCH",
      "-dNOPAUSE",
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      "-dPDFSETTINGS=/ebook",   // 압축 강도 (/screen /ebook /printer /prepress)
      "-sOutputFile=out.pdf",
      "-"
    ];

    Module.ccall(
      "gs_main",        // Ghostscript 엔트리 함수
      "number",
      ["number", "number", "number"],
      [args.length, Module.allocateUTF8OnStack(args.join("\0")), 0]
    );

    // 출력 후 output.pdf 읽기
    const output = Module.FS.readFile("out.pdf");
    resolve(output);
  });
}

self.onmessage = async (e) => {
  if (!ready) {
    postMessage({ error: "Ghostscript WASM not ready yet" });
    return;
  }

  const inputBytes = new Uint8Array(e.data.file);

  try {
    // 입력 파일을 WASM 가상 FS에 쓰기
    Module.FS.writeFile("input.pdf", inputBytes);

    const result = await runGhostscript(inputBytes);

    postMessage({ result: result.buffer }, [result.buffer]);

  } catch (err) {
    postMessage({ error: err.toString() });
  }
};
