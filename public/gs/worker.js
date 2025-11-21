importScripts("/gs/gs.js");

let GS = null;

self.onmessage = async (e) => {
  const fileBuffer = e.data.file;
  const file = new Uint8Array(fileBuffer);

  try {
    if (!GS) {
      GS = await GhostscriptModule({
        locateFile: (path) => {
          if (path.endsWith(".wasm")) return "/gs/gs.wasm";
          return "/gs/" + path;
        }
      });
      console.log("Ghostscript WASM loaded");
    }

    GS.FS.writeFile("input.pdf", file);

    GS.callMain([
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      "-dPDFSETTINGS=/ebook",
      "-dNOPAUSE",
      "-dQUIET",
      "-dBATCH",
      "-sOutputFile=output.pdf",
      "input.pdf"
    ]);

    const result = GS.FS.readFile("output.pdf");

    self.postMessage({ result: result.buffer }, [result.buffer]);

  } catch (err) {
    self.postMessage({ error: err.toString() });
  }
};
