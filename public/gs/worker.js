/* public/gs/worker.js */

importScripts("/gs/gs.js");

let ModuleReady = false;

// Ghostscript 9.26은 자동으로 Module이 전역에 생성됨
Module = {
  noExitRuntime: true,
  print: () => {},
  printErr: () => {},

  onRuntimeInitialized() {
    ModuleReady = true;
    console.log("Ghostscript runtime ready");
  }
};

self.onmessage = async (e) => {
  const fileBuffer = e.data.file;

  if (!ModuleReady) {
    console.log("WASM not ready yet, waiting...");
    await waitForReady();
  }

  try {
    // PDF 저장
    Module.FS.writeFile("input.pdf", new Uint8Array(fileBuffer));

    // Ghostscript 9.26은 callMain 없음 → _gs_main 직접 호출
    const args = [
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      "-dPDFSETTINGS=/ebook",
      "-dNOPAUSE",
      "-dQUIET",
      "-dBATCH",
      "-sOutputFile=output.pdf",
      "input.pdf",
    ];

    Module.callMain(args); // ⛔ 9.26은 없기 때문에 아래로 대체해야 함
    // 위 라인 제거하고 아래 원본 방식 사용 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

    Module.ccall(
      "gs_main",
      "number",
      ["number", "number", "number"],
      [args.length, Module.allocateUTF8OnStack(args.join("\0")), 0]
    );

    // 결과 읽기
    const output = Module.FS.readFile("output.pdf");

    self.postMessage({ result: output.buffer }, [output.buffer]);

  } catch (err) {
    console.error(err);
    self.postMessage({ error: err.toString() });
  }
};

function waitForReady() {
  return new Promise((resolve) => {
    const check = () => {
      if (ModuleReady) return resolve();
      setTimeout(check, 10);
    };
    check();
  });
}
