importScripts("/gs/gs-worker.js");

let ready = false;

Module.onRuntimeInitialized = () => {
  ready = true;
  postMessage({ ready: true });
};

self.onmessage = async (e) => {
  if (!ready) {
    postMessage({ error: "Ghostscript WASM not ready yet" });
    return;
  }

  const inputBytes = new Uint8Array(e.data.file);

  try {
    // 입력 파일을 가상 FS에 저장
    Module.FS.writeFile("input.pdf", inputBytes);

    const args = [
      "-dBATCH",
      "-dNOPAUSE",
      "-dSAFER",
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      "-dPDFSETTINGS=/ebook",
      "-sOutputFile=output.pdf",
      "input.pdf"
    ];

    Module.callMain(args);

    const output = Module.FS.readFile("output.pdf");

    postMessage({ result: output.buffer }, [output.buffer]);
  } catch (err) {
    postMessage({ error: err.toString() });
  }
};
