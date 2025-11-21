export async function compressPdfInWasm(file) {
  return new Promise(async (resolve, reject) => {
    const worker = new Worker("/gs/worker.js");

    worker.onmessage = (e) => {
      if (e.data.error) reject(e.data.error);
      else {
        const blob = new Blob([e.data.result], { type: "application/pdf" });
        resolve(blob);
      }
      worker.terminate();
    };

    worker.postMessage({
      file: await file.arrayBuffer(),
    });
  });
}
