export async function _GSPS2PDF(
  dataStruct,
  responseCallback,
  progressCallback,
  statusUpdateCallback
) {

   const worker = new Worker('/gs/worker.js');

  worker.postMessage({ data: dataStruct, target: 'wasm' });

  return new Promise((resolve, reject) => {
    const listener = (e) => {
      resolve(e.data);
      worker.removeEventListener('message', listener);
      setTimeout(() => worker.terminate(), 0);
    };
    worker.addEventListener('message', listener);
  });
}
