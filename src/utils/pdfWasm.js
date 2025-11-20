let worker = null;
let wasmReady = false;

function initWorker() {
  return new Promise((resolve, reject) => {
    worker = new Worker("/pdf-wasm/worker.js");

    worker.onmessage = (e) => {
      if (e.data.error) return reject(e.data.error);

      if (e.data.ready) {
        wasmReady = true;
        resolve(true);
      }
    };
  });
}

export async function compressPdfInWasm(file) {
  // 아직 worker 또는 WASM이 준비 안 됐으면 로딩
  if (!worker || !wasmReady) {
    await initWorker();
  }

  return new Promise(async (resolve, reject) => {
    worker.onmessage = (e) => {
      if (e.data.error) return reject(e.data.error);

      if (e.data.result) {
        resolve(new Blob([e.data.result], { type: "application/pdf" }));
      }
    };

    worker.postMessage({
      file: await file.arrayBuffer(),
    });
  });
}
