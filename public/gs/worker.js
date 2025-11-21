// 반드시 이렇게 로딩해야 Module이 전역에 붙음
importScripts("./gs-worker.js");

console.log("GS Worker loaded.");

let gsReady = false;

// 데모 사이트 WASM 은 onRuntimeInitialized가 있을 수도 있음
// 있으면 여기서 ready 상태로 바꿔줌
if (typeof Module !== "undefined") {
  Module.onRuntimeInitialized = () => {
    gsReady = true;
    postMessage({ ready: true });
  };
}

// 만약 Module이 바로 초기화되는 경우 대비
setTimeout(() => {
  if (!gsReady) {
    gsReady = true;
    postMessage({ ready: true });
  }
}, 300);

// =================================================================
// Ghostscript 변환 함수 (데모사이트 구조 그대로 재현)
// =================================================================
function runGhostscript(inputBytes, callback) {
  // Module 재설정
  Module.preRun = [
    function () {
      // 입력 PDF를 가상 파일 시스템에 기록
      Module.FS.writeFile("input.pdf", inputBytes);
    },
  ];

  Module.postRun = [
    function () {
      try {
        // Ghostscript가 생성한 output.pdf 읽기
        const output = Module.FS.readFile("output.pdf", {
          encoding: "binary"
        });

        const blob = new Blob([output], {
          type: "application/pdf"
        });

        callback({ blob });
      } catch (err) {
        callback({ error: "output.pdf not found: " + err });
      }
    },
  ];

  // Ghostscript 명령어 (데모코드 스타일 그대로)
  Module.arguments = [
    "-sDEVICE=pdfwrite",
    "-dCompatibilityLevel=1.4",
    "-dPDFSETTINGS=/ebook",
    "-dQUIET",
    "-dNOPAUSE",
    "-dBATCH",
    "-sOutputFile=output.pdf",
    "input.pdf",
  ];

  // 데모사이트 방식 - main() entry 실행
  Module.calledRun = false;
  Module.callMain();
}

// =================================================================
// Worker 메시지 핸들러
// =================================================================
self.onmessage = function (e) {
  const { file } = e.data;

  if (!file) {
    postMessage({ error: "No file received" });
    return;
  }

  const inputBytes = new Uint8Array(file);

  // GS가 준비되었을 때 실행
  if (!gsReady) {
    // 준비될 때까지 기다리기
    const wait = setInterval(() => {
      if (gsReady) {
        clearInterval(wait);
        runGhostscript(inputBytes, (result) => {
          if (result.error) {
            postMessage({ error: result.error });
          } else {
            postMessage({ result: result.blob });
          }
        });
      }
    }, 50);
    return;
  }

  // 이미 ready 경우 즉시 실행
  runGhostscript(inputBytes, (result) => {
    if (result.error) {
      postMessage({ error: result.error });
    } else {
      postMessage({ result: result.blob });
    }
  });
};

console.log("GS worker ready.");
