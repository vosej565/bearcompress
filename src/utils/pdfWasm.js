let worker = null;
let wasmReady = false;
let pendingResolve = null;
let pendingReject = null;

function initWorker() {
  return new Promise((resolve, reject) => {
    worker = new Worker("/pdf-wasm/worker.js");

    worker.onmessage = (e) => {

      // 🔥 Go WASM 로그 받기
      if (e.data.log) {
        console.log("[WASM]", e.data.log);
        return;
      }

      if (e.data.error) {
        if (pendingReject) pendingReject(e.data.error);
        pendingResolve = null;
        pendingReject = null;
        return;
      }

      if (e.data.ready) {
        wasmReady = true;
        resolve(true);
        return;
      }

      if (e.data.result && pendingResolve) {
        pendingResolve(new Blob([e.data.result], { type: "application/pdf" }));
        pendingResolve = null;
        pendingReject = null;
      }
    };
  });
}

export async function compressPdfInWasm(file) {
  if (!worker || !wasmReady) {
    await initWorker();
  }

  return new Promise(async (resolve, reject) => {
    pendingResolve = resolve;
    pendingReject = reject;

    worker.postMessage({
      file: await file.arrayBuffer(),
    });
  });
}
