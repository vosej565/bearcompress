importScripts("/pdf-wasm/wasm_exec.js");

const go = new Go();
let wasmInstance = null;
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
      // Go 런타임 시작 (main() 실행)
      go.run(wasmInstance);
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
  // WASM 한 번만 로드
  await initWasm();

  // Go 쪽 Log()에서 오는 메시지 받기
  const logCallback = (ctx, msg) => {
    postMessage({ log: msg });
  };

  try {
    const inputBytes = new Uint8Array(e.data.file);
    const retInfo = { l: 0 };

    if (typeof self.compress !== "function") {
      postMessage({ error: "compress is not ready yet" });
      return;
    }

    // Go 함수 호출
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
