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

  try {
    const input = new Uint8Array(e.data.file);

    Module.FS.writeFile("input.pdf", input);

    const args = [
      "-dSAFER",
      "-dBATCH",
      "-dNOPAUSE",
      "-sDEVICE=pdfwrite",
      "-dPDFSETTINGS=/ebook",
      "-sOutputFile=out.pdf",
      "input.pdf"
    ];

    Module.ccall(
      "gs_main",
      "number",
      ["number", "number", "number"],
      [args.length, Module.allocateUTF8OnStack(args.join("\0")), 0]
    );

    const output = Module.FS.readFile("out.pdf");
    postMessage({ result: output.buffer }, [output.buffer]);

  } catch (err) {
    postMessage({ error: err.toString() });
  }
};
