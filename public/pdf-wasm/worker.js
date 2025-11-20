importScripts("/pdf-wasm/wasm_exec.js");

const go = new Go();
let wasmInstance = null;
let wasmReady = false;

// WASM 실행은 반드시 "처음 한번만" 실행해야 함
WebAssembly.instantiateStreaming(fetch("/pdf-wasm/pdfcomprezzor.wasm"), go.importObject)
  .then((result) => {
    wasmInstance = result.instance;
    go.run(wasmInstance);   // 단 한번만 실행해야 함!
    wasmReady = true;
    postMessage({ ready: true });
  })
  .catch((err) => postMessage({ error: "WASM load failed: " + err }));

onmessage = (e) => {
  if (!wasmReady) {
    postMessage({ error: "WASM is not ready yet" });
    return;
  }

  try {
    const inputBytes = new Uint8Array(e.data.file);
    const outputBytes = new Uint8Array(inputBytes.length * 2); // output 버퍼 확보
    const retInfo = { l: 0 };

    // Go 함수 호출 (compress가 input → output 구조일 수도 있음)
    const written = self.compress(inputBytes, outputBytes, retInfo);

    const finalBytes = outputBytes.slice(0, retInfo.l);
    postMessage({ result: finalBytes.buffer }, [finalBytes.buffer]);

  } catch (err) {
    postMessage({ error: err.toString() });
  }
};
