importScripts("/pdf-wasm/wasm_exec.js");

const go = new Go();
let wasmInstance = null;
let wasmReady = false;
let initPromise = null;

// ======================
// WASM 초기화 (한 번만)
// ======================
function initWasm() {
  if (initPromise) return initPromise;

  initPromise = WebAssembly.instantiateStreaming(
    fetch("/pdf-wasm/pdfcomprezzor.wasm"),
    go.importObject
  )
    .then((result) => {
      wasmInstance = result.instance;
      go.run(wasmInstance);     // 단 한 번 실행해야 함!
      wasmReady = true;
      postMessage({ ready: true });
    })
    .catch((err) => {
      postMessage({ error: "WASM load failed: " + err });
    });

  return initPromise;
}

// ======================
// PDF 압축 처리
// ======================
self.onmessage = async (e) => {
  await initWasm();

  if (!wasmReady) {
    postMessage({ error: "WASM is not ready yet" });
    return;
  }

  try {
    const inputBytes = new Uint8Array(e.data.file);
    const retInfo = { l: 0 };

    // Go의 Log() 호출 콜백
    const logCallback = (ctx, msg) => {
      // postMessage({ log: msg });
    };

    // ⭐ Go 코드: onCompress(inputBytes, retInfo, logCallback)
    self.compress(inputBytes, retInfo, logCallback);

    const outLen = retInfo.l || 0;
    if (outLen <= 0) {
      postMessage({ error: "Compression failed: output length is 0" });
      return;
    }

    const resultBytes = inputBytes.slice(0, outLen);

    postMessage({ result: resultBytes.buffer }, [resultBytes.buffer]);
  } catch (err) {
    postMessage({ error: err.toString() });
  }
};
