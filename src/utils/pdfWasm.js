export async function compressPdfInWasm(file) {
  return new Promise(async (resolve, reject) => {
    const worker = new Worker('/gs/worker.js');

    worker.onmessage = (e) => {
      if (e.data.error) {
        reject(e.data.error);
      } else if (e.data.result) {
        resolve(new Blob([e.data.result], { type: "application/pdf" }));
      }
      worker.terminate();
    };

    worker.onerror = (err) => {
      reject(err.message);
      worker.terminate();
    };

    worker.postMessage({
      file: await file.arrayBuffer(),
    });
  });
}
