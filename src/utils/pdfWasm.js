let worker = null;
let wasmReady = false;
let pendingResolve = null;
let pendingReject = null;

function initWorker() {
  return new Promise((resolve, reject) => {
    worker = new Worker("/pdf-wasm/worker.js");

    worker.onmessage = (e) => {
      if (e.data.error) {
        if (pendingReject) pendingReject(e.data.error);
        pendingReject = null;
        pendingResolve = null;
        return;
      }

      if (e.data.ready) {
        wasmReady = true;
        resolve(true);
        return;
      }

      // WASM 압축 결과
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

  // 다음 작업을 위해 Promise 저장
  return new Promise(async (resolve, reject) => {
    pendingResolve = resolve;
    pendingReject = reject;

    worker.postMessage({
      file: await file.arrayBuffer(),
    });
  });
}
