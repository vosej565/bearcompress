importScripts("/pdf-wasm/wasm_exec.js");

const go = new Go();
let wasmReady = false;

// ⬇️ WASM 로드
WebAssembly.instantiateStreaming(fetch("/pdf-wasm/pdfcomprezzor.wasm"), go.importObject)
  .then((result) => {
    go.run(result.instance);
    wasmReady = true;
    postMessage({ ready: true });
  })
  .catch((err) => {
    postMessage({ error: "WASM load failed: " + err });
  });

// ⬇️ 메시지 핸들러
onmessage = (e) => {
  if (!wasmReady) {
    return postMessage({ error: "WASM is not ready yet" });
  }

  const input = new Uint8Array(e.data.file);

  // ⭐⭐ output 배열은 반드시 input보다 충분히 크게 만들기!
  // 압축 후 PDF 크기가 input보다 작아지므로 input과 동일하면 충분.
  const output = new Uint8Array(input.byteLength);

  const retInfo = { l: 0 };

  try {
    // ⭐⭐ WASM compress 호출 — 결과는 output 버퍼에 채워짐
    self.compress(input, output, retInfo);

    // ⭐⭐ 실제 길이만큼 slice 후 ArrayBuffer로 전달
    const finalPdf = output.slice(0, retInfo.l);

    postMessage({ result: finalPdf.buffer }, [finalPdf.buffer]);
  } catch (err) {
    postMessage({ error: err.toString() });
  }
};
