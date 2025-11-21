export async function _GSPS2PDF(
  dataStruct,
  responseCallback,
  progressCallback,
  statusUpdateCallback
) {

  const worker = new Worker(
    new URL('/gs/worker.js', import.meta.url)   // ← ★ 이거 하나만 바꾸면 됨
  );

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
