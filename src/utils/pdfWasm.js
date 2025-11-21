// src/utils/pdfWasm.js

export async function compressPdfInWasm(file) {
  return new Promise(async (resolve, reject) => {
    const worker = new Worker("/gs/worker.js");

    worker.onmessage = (e) => {
      const { result, error } = e.data || {};

      if (error) {
        console.error("Worker error:", error);
        reject(error);
        worker.terminate();
        return;
      }

      if (result) {
        const blob = new Blob([result], { type: "application/pdf" });
        resolve(blob);
        worker.terminate();
      }
    };

    worker.onerror = (err) => {
      console.error("Worker threw:", err);
      reject(err.message || String(err));
      worker.terminate();
    };

    worker.postMessage({
      file: await file.arrayBuffer(),
    });
  });
}
