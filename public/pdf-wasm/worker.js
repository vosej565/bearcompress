importScripts("/pdf-wasm/wasm_exec.js");

const go = new Go();
let wasmReady = false;

// Load WASM
WebAssembly.instantiateStreaming(fetch("/pdf-wasm/pdfcomprezzor.wasm"), go.importObject)
  .then((result) => {
    go.run(result.instance);
    wasmReady = true;
    postMessage({ ready: true });
  })
  .catch((err) => {
    postMessage({ error: "WASM load failed: " + err });
  });

onmessage = async (e) => {
  if (!wasmReady) {
    postMessage({ error: "WASM is not ready yet" });
    return;
  }

  const fileArray = new Uint8Array(e.data.file);

  try {
    // prepare return length holder
    const returnInfo = { l: 0 };

    // Call Go function — THIS MATCHES YOUR main.go
    const newSize = self.compress(fileArray, returnInfo);

    const resultBytes = fileArray.slice(0, returnInfo.l);

    postMessage({ result: resultBytes.buffer }, [resultBytes.buffer]);

  } catch (err) {
    postMessage({ error: err.toString() });
  }
};
