let wasmReady = false;

export function compressPdfInWasm(file) {
  return new Promise(async (resolve, reject) => {
    const worker = new Worker("/pdf-wasm/worker.js");

    worker.onmessage = (e) => {
      if (e.data.error) return reject(e.data.error);

      if (e.data.ready) {
        wasmReady = true;
        return;
      }

      if (!wasmReady) {
        return reject("WASM is not ready yet");
      }

      if (e.data.result) {
        resolve(new Blob([e.data.result], { type: "application/pdf" }));
      }
    };

    worker.postMessage({
      file: await file.arrayBuffer(),
    });
  });
}
