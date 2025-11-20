importScripts("/pdf-wasm/wasm_exec.js");

const go = new Go();
let wasmInstance = null;
let wasmReady = false;
let initPromise = null;

// 실제로 compress 등록이 완료되었는지 플래그
let compressReady = false;

function initWasm() {
  if (initPromise) return initPromise;

  initPromise = WebAssembly.instantiateStreaming(
    fetch("/pdf-wasm/pdfcomprezzor.wasm"),
    go.importObject
  )
    .then((result) => {
      wasmInstance = result.instance;

      // go.run은 비동기처럼 보여도 실제로 main() 안에서 루프가 도는 구조
      // main()이 실행되면, js.Global().Set("compress")도 실행됨
      go.run(wasmInstance);

      // 여기서 바로 준비됨이라고 하면 안 된다.
      // 실제 준비 여부는 Go LogCallback으로 판단해야 한다.
    })
    .catch((err) => {
      postMessage({ error: "WASM load failed: " + err });
    });

  return initPromise;
}

self.onmessage = async (e) => {
  // WASM 로드
  await initWasm();

  // 로그 콜백 — WASM 초기화 완료 감지용
  const logCallback = (ctx, msg) => {
    postMessage({ log: msg });

    // Go main()에서 출력됨 → compress가 등록된 상태
    if (msg.includes("WASM pdf optimizer initialized")) {
      compressReady = true;
      postMessage({ ready: true });
    }
  };

  // WASM 초기화가 아직 안 끝났으면 기다리기
  if (!compressReady) {
    postMessage({ error: "WASM is still initializing..." });
    return;
  }

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
