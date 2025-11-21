// src/utils/pdfWasm.js (또는 .ts)

if (!window.__gsWasm) {
  window.__gsWasm = {
    worker: null,
    pendingResolve: null,
    pendingReject: null,
  };
}

export async function compressPdfInWasm(file) {
  const singleton = window.__gsWasm;

  // worker 1개만 재사용
  if (!singleton.worker) {
    singleton.worker = new Worker("/gs/pdf-worker.js");

    singleton.worker.onmessage = async (e) => {
      const { error, pdfDataURL } = e.data || {};

      if (error) {
        if (singleton.pendingReject) {
          singleton.pendingReject(error);
        }
        return;
      }

      if (pdfDataURL && singleton.pendingResolve) {
        try {
          // 워커에서 받은 objectURL → Blob 으로 다시 가져오기
          const res = await fetch(pdfDataURL);
          const blob = await res.blob();
          // 더 이상 안 쓰는 URL 정리
          URL.revokeObjectURL(pdfDataURL);
          singleton.pendingResolve(blob);
        } catch (err) {
          singleton.pendingReject(err);
        }
      }
    };
  }

  // 메인 스레드에서 입력 PDF Blob URL 생성
  const inputUrl = URL.createObjectURL(file);

  return new Promise((resolve, reject) => {
    singleton.pendingResolve = resolve;
    singleton.pendingReject = reject;

    singleton.worker.postMessage({
      target: "wasm",
      psDataURL: inputUrl,
      url: file.name,
    });
  });
}
