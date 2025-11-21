// src/utils/pdfWasm.js

let worker = null;
let pendingResolve = null;
let pendingReject = null;

// PDF 압축 함수 (React 컴포넌트에서 사용)
export function compressPdfInWasm(file) {
  return new Promise(async (resolve, reject) => {
    // worker 싱글턴 생성
    if (!worker) {
      worker = new Worker("/gs/worker.js");
      console.log("PDF worker created");

      // Worker로부터 메시지 수신
      worker.onmessage = (e) => {
        const data = e.data;

        if (data.error) {
          pendingReject?.(data.error);
          pendingResolve = null;
          pendingReject = null;
          return;
        }

        // 바이트 배열 → Blob
        const outputBytes = new Uint8Array(data.result);
        const blob = new Blob([outputBytes], { type: "application/pdf" });

        pendingResolve?.(blob);
        pendingResolve = null;
        pendingReject = null;
      };

      // Worker 오류 처리
      worker.onerror = (err) => {
        pendingReject?.(err.message || "Worker error");
        pendingResolve = null;
        pendingReject = null;
      };
    }

    pendingResolve = resolve;
    pendingReject = reject;

    // 파일을 ArrayBuffer로 변환해 워커에 전송
    const buffer = await file.arrayBuffer();
    worker.postMessage({ file: buffer }, [buffer]);
  });
}
