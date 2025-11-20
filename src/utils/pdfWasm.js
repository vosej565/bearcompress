// 🔥 글로벌 싱글톤 저장용
if (!window.__pdfWasmSingleton) {
  window.__pdfWasmSingleton = {
    worker: null,
    wasmReady: false,
    pendingResolve: null,
    pendingReject: null,
    initializing: false
  };
}

const singleton = window.__pdfWasmSingleton;

// -------------------
// Worker 초기화
// -------------------
function initWorker() {
  // 이미 초기화 중이면 그 Promise를 기다림
  if (singleton.initializing) {
    return singleton.initializing;
  }

  singleton.initializing = new Promise((resolve, reject) => {
    singleton.worker = new Worker("/pdf-wasm/worker.js");

    singleton.worker.onmessage = (e) => {
      if (e.data.log) {
        console.log("[WASM]", e.data.log);
        return;
      }

      if (e.data.error) {
        if (singleton.pendingReject) singleton.pendingReject(e.data.error);
        singleton.pendingResolve = null;
        singleton.pendingReject = null;
        return;
      }

      if (e.data.ready) {
        singleton.wasmReady = true;
        resolve(true);
        return;
      }

      if (e.data.result && singleton.pendingResolve) {
        singleton.pendingResolve(
          new Blob([e.data.result], { type: "application/pdf" })
        );
        singleton.pendingResolve = null;
        singleton.pendingReject = null;
      }
    };
  });

  return singleton.initializing;
}

// -------------------
// PDF 압축 함수
// -------------------
export async function compressPdfInWasm(file) {
  if (!singleton.worker) {
    await initWorker();
  }

  // ready 될 때까지 대기
  if (!singleton.wasmReady) {
    await initWorker();
  }

  return new Promise(async (resolve, reject) => {
    singleton.pendingResolve = resolve;
    singleton.pendingReject = reject;

    singleton.worker.postMessage({
      file: await file.arrayBuffer(),
    });
  });
}
