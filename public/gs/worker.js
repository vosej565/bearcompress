importScripts("/gs/gs.js");

let ModuleReady = false;

Module = {
  onRuntimeInitialized() {
    ModuleReady = true;
    console.log("Ghostscript WASM ready");
  }
};

self.onmessage = async (e) => {
  const input = new Uint8Array(e.data.file);

  try {
    // 준비 안됐으면 대기
    if (!ModuleReady) {
      await new Promise(r => {
        const check = setInterval(() => {
          if (ModuleReady) {
            clearInterval(check);
            r();
          }
        }, 10);
      });
    }

    // PDF 쓰기
    Module.FS.writeFile("input.pdf", input);

    // args 배열 작성
    const args = [
      "gs",
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      "-dPDFSETTINGS=/ebook",
      "-dNOPAUSE",
      "-dQUIET",
      "-dBATCH",
      "-sOutputFile=output.pdf",
      "input.pdf"
    ];

    // gs_main 직접 호출 (MODULARIZE=0 환경)
    Module.ccall(
      "gs_main",
      "number",
      ["number", "number"],
      [args.length, Module.allocateUTF8OnStack(args.join("\0"))]
    );

    // 결과 읽기
    const output = Module.FS.readFile("output.pdf");
    self.postMessage({ result: output.buffer }, [output.buffer]);

  } catch (err) {
    self.postMessage({ error: err.toString() });
  }
};
