importScripts("/pdf-wasm/wasm_exec.js");

const go = new Go();
let wasmReady = false;

WebAssembly.instantiateStreaming(fetch("/pdf-wasm/pdfcomprezzor.wasm"), go.importObject)
  .then((result) => {
    go.run(result.instance);
    wasmReady = true;
    postMessage({ ready: true });
  })
  .catch((err) => {
    postMessage({ error: "WASM load failed: " + err });
  });

onmessage = (e) => {
  if (!wasmReady) {
    postMessage({ error: "WASM is not ready yet" });
    return;
  }

  const input = new Uint8Array(e.data.file);
  const retInfo = { l: 0 };

  try {
    self.compress(input, retInfo);
    const result = input.slice(0, retInfo.l);
    postMessage({ result: result.buffer }, [result.buffer]);
  } catch (err) {
    postMessage({ error: err.toString() });
  }
};
