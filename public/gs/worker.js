// public/gs/worker.js

importScripts("/gs/gs.js");  // MODULARIZE=1일 때도 그냥 로드만 하면 됨

let GS = null;

self.onmessage = async (e) => {
  const fileBuffer = e.data.file;

  // Load Ghostscript only once
  if (!GS) {
    GS = await GhostscriptModule({
      locateFile: (path) => {
        if (path.endsWith(".wasm")) return "/gs/gs.wasm";
        return path;
      },
    });

    console.log("Ghostscript WASM loaded!");
  }

  try {
    GS.FS.writeFile("input.pdf", new Uint8Array(fileBuffer));

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

    const out = GS.FS.readFile("output.pdf");
    self.postMessage({ result: out.buffer }, [out.buffer]);

  } catch (err) {
    self.postMessage({ error: err.toString() });
  }
};
