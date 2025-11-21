let worker = null;
let ready = false;

export async function compressPdfInWasm(file) {
  if (!worker) {
    worker = new Worker("/gs/worker.js");

    worker.onmessage = (e) => {
      if (e.data.ready) {
        ready = true;
      }
    };

    // ready 신호 기다림
    await new Promise((res) => {
      const check = () =>
        ready ? res() : setTimeout(check, 50);
      check();
    });
  }

  return new Promise(async (resolve, reject) => {
    worker.onmessage = (e) => {
      if (e.data.error) return reject(e.data.error);
      if (e.data.result)
        return resolve(new Blob([e.data.result], { type: "application/pdf" }));
    };

    worker.postMessage({
      file: await file.arrayBuffer()
    });
  });
}
