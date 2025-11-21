// public/gs/worker.js

// 메인 스레드에서 { file: ArrayBuffer } 보내면
// Ghostscript WASM으로 압축해서 { result: ArrayBuffer } 로 돌려줌.
self.onmessage = function (event) {
  const data = event.data || {};
  const fileBuffer = data.file;

  if (!fileBuffer) {
    self.postMessage({ error: "No file received" });
    return;
  }

  console.log("PDF worker: got file of size", fileBuffer.byteLength);

  // 👇 이 Module 객체를 먼저 만들어두고
  //   바로 밑에서 importScripts("/gs/gs-worker.js") 하면
  //   Emscripten이 이 설정을 가져다 씁니다.
  self.Module = {
    noInitialRun: true, // 자동으로 main() 실행하지 말고 우리가 직접 callMain 할 거라서

    print: function (text) {
      console.log(text);
    },

    printErr: function (text) {
      console.error(text);
    },

    preRun: [
      function () {
        const FS = self.Module.FS;
        const inputName = "input.pdf";
        const outputName = "output.pdf";

        // 혹시 이전 실행에서 남은 파일 있으면 삭제
        try {
          if (FS.analyzePath(inputName).exists) FS.unlink(inputName);
        } catch (e) {}
        try {
          if (FS.analyzePath(outputName).exists) FS.unlink(outputName);
        } catch (e) {}

        // 가상파일시스템에 input.pdf 쓰기
        FS.writeFile(inputName, new Uint8Array(fileBuffer));
      },
    ],

    postRun: [
      function () {
        try {
          const FS = self.Module.FS;
          const outputName = "output.pdf";

          const out = FS.readFile(outputName, { encoding: "binary" });

          // Uint8Array → ArrayBuffer로 만들어서 transferable로 전송
          const buf = out.buffer.slice(
            out.byteOffset,
            out.byteOffset + out.byteLength
          );

          self.postMessage({ result: buf }, [buf]);
        } catch (err) {
          console.error("Failed to read output.pdf:", err);
          self.postMessage({ error: String(err) });
        }
      },
    ],

    // main()에 넘겨줄 인자들 (argv[1]부터)
    arguments: [
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      "-dPDFSETTINGS=/ebook",
      "-dNOPAUSE",
      "-dQUIET",
      "-dBATCH",
      "-sOutputFile=output.pdf",
      "input.pdf",
    ],

    // WASM 런타임 준비되면 여기서 main 실행
    onRuntimeInitialized: function () {
      try {
        console.log("Ghostscript runtime ready, running command...");
        // Emscripten이 argv[0]은 알아서 채워주니까 나머지 인자만 넘기면 됨
        self.Module.callMain(self.Module.arguments);
      } catch (err) {
        console.error("callMain failed:", err);
        self.postMessage({ error: String(err) });
      }
    },
  };

  // 👇 실제 Ghostscript JS + WASM 로더
  //   (같은 폴더에 gs-worker.js, gs-worker.wasm 있어야 함)
  importScripts("/gs/gs-worker.js");
};
