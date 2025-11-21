importScripts("/gs/gs.js");

let GS = null;

self.onmessage = async (e) => {
  const arrayBuffer = e.data.file;

  if (!GS) {
    GS = await GhostscriptModule({
      noInitialRun: true,   // ★★★★★ 핵심!!!
      locateFile: (path) => {
        if (path.endsWith(".wasm")) return "/gs/gs.wasm";
        return path;
      },
    });

    console.log("Ghostscript WASM initialized");
  }

  try {
    GS.FS.writeFile("input.pdf", new Uint8Array(arrayBuffer));

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
