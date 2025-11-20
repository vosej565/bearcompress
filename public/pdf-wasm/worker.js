importScripts("/pdf-wasm/wasm_exec.js");

const go = new Go();
let wasm = null;
let wasmReady = false;

async function init() {
  if (wasmReady) return;

  const result = await WebAssembly.instantiateStreaming(
    fetch("/pdf-wasm/pdfcomprezzor.wasm"),
    go.importObject
  );

  wasm = result.instance;

  // 고런타임을 백그라운드에서 유지하기 위한 비동기 실행
  go.run(wasm);

  wasmReady = true;
  postMessage({ ready: true });
}

self.onmessage = async (e) => {
  await init();

  try {
    const inputBytes = new Uint8Array(e.data.file);
    const retInfo = { l: 0 };

    // Go WASM은 JS object를 직접 못 받기 때문에,
    // JS에서 proxy 역할을 수행
    const beforeLen = inputBytes.length;

    // Go 코드가 inputBytes 내부를 직접 수정함
    self.compress(inputBytes, retInfo);

    const afterLen = retInfo.l;

    if (!afterLen || afterLen <= 0) {
      postMessage({ error: "Compression failed: output length is 0" });
      return;
    }

    const resultBytes = inputBytes.slice(0, afterLen);

    postMessage({ result: resultBytes.buffer }, [resultBytes.buffer]);

  } catch (err) {
    postMessage({ error: err.toString() });
  }
};
