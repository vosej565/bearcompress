// public/gs/worker.js

// 1) WASM JS 로드 (return 없음!)
importScripts("/gs/gs.js");

let GS = null;

self.onmessage = async (e) => {
  const arrayBuffer = e.data.file;

  // 최초 로딩
  if (!GS) {
    // importScripts 후에는 전역 변수 GhostscriptModule이 생김
    GS = await GhostscriptModule({
      locateFile: (path) => {
        if (path.endsWith(".wasm")) return "/gs/gs.wasm";
        return path;
      }
    });

    console.log("Ghostscript WASM initialized");
  }

  try {
    // PDF 파일 입력
    GS.FS.writeFile("input.pdf", new Uint8Array(arrayBuffer));

    // Ghostscript 실행
    GS.callMain([
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      "-dPDFSETTINGS=/ebook",
      "-dNOPAUSE",
      "-dQUIET",
      "-dBATCH",
      "-sOutputFile=output.pdf",
      "input.pdf",
    ]);

    // 출력 파일 읽기
    const out = GS.FS.readFile("output.pdf");

    // main thread로 전송
    self.postMessage({ result: out.buffer }, [out.buffer]);

  } catch (err) {
    self.postMessage({ error: err.toString() });
  }
};
