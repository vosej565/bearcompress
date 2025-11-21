// public/gs/pdf-worker.js

let gsInitialized = false;

function loadGhostscript() {
  if (gsInitialized) return;

  importScripts("/gs/gs-worker.js");

  // gs-worker.js 안에서 Module을 이미 전역에 등록함
  gsInitialized = true;
}

function runGhostscript(dataStruct, done) {
  loadGhostscript();

  const xhr = new XMLHttpRequest();
  xhr.open("GET", dataStruct.psDataURL);
  xhr.responseType = "arraybuffer";

  xhr.onload = function () {
    URL.revokeObjectURL(dataStruct.psDataURL);

    // Module은 Emscripten 런타임에서 전역에 이미 존재함
    Module.preRun = [
      () => {
        Module.FS.writeFile("input.pdf", new Uint8Array(xhr.response));
      },
    ];

    Module.postRun = [
      () => {
        const out = Module.FS.readFile("output.pdf", { encoding: "binary" });
        const blob = new Blob([out], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        done({ pdfDataURL: url });
      },
    ];

    Module.arguments = [
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      "-dPDFSETTINGS=/ebook",
      "-dNOPAUSE",
      "-dQUIET",
      "-dBATCH",
      "-sOutputFile=output.pdf",
      "input.pdf",
    ];

    // 첫 로드에서는 자동 실행됨 (gs-worker.js 내부 run())
    // 이후 다시 실행하려면 callMain 사용
    if (Module.calledRun) {
      Module.calledRun = false;
      Module.callMain([]);
    }
  };

  xhr.onerror = () => done({ error: "Failed to load PDF" });

  xhr.send();
}

self.onmessage = function (event) {
  const data = event.data;
  if (!data || data.target !== "wasm") return;

  runGhostscript(data, (result) => {
    self.postMessage(result);
  });
};

console.log("PDF worker ready");
