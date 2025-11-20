let worker = null;
let wasmReady = false;
let pendingResolve = null;
let pendingReject = null;

function initWorker() {
  return new Promise((resolve, reject) => {
    worker = new Worker("/pdf-wasm/worker.js");

    worker.onmessage = (e) => {

      // 🔥 Go WASM 로그
      if (e.data.log) {
        console.log("[WASM]", e.data.log);
        return;
      }

      // 🔥 에러 처리
      if (e.data.error) {
        if (pendingReject) pendingReject(e.data.error);
        pendingResolve = null;
        pendingReject = null;
        return;
      }

      // 🔥 ready 신호 받음 → WASM 초기화 완료
      if (e.data.ready) {
        wasmReady = true;
        resolve(true);
        return;
      }

      // 🔥 압축 결과 받음
      if (e.data.result && pendingResolve) {
        pendingResolve(new Blob([e.data.result], { type: "application/pdf" }));
        pendingResolve = null;
        pendingReject = null;
      }
    };
  });
}

export async function compressPdfInWasm(file) {
  // 1) worker 없으면 생성
  if (!worker) {
    await initWorker();
  }

  // 2) 🔥 WASM 초기화가 완료될 때까지 반드시 대기
  if (!wasmReady) {
    await new Promise((resolve) => {
      const timer = setInterval(() => {
        if (wasmReady) {
          clearInterval(timer);
          resolve();
        }
      }, 10);
    });
  }

  // 3) 압축 시작
  return new Promise(async (resolve, reject) => {
    pendingResolve = resolve;
    pendingReject = reject;

    worker.postMessage({
      file: await file.arrayBuffer(),
    });
  });
}
