// public/gs/pdf-worker.js

let gsLoaded = false;

// Ghostscript WASM 런타임 js 로드
function loadGhostscript() {
  if (gsLoaded) return;
  importScripts("/gs/gs-worker.js");
  gsLoaded = true;
}

let Module; // 각 작업마다 설정할 Emscripten Module

function runGhostscript(dataStruct, done) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", dataStruct.psDataURL);
  xhr.responseType = "arraybuffer";

  xhr.onload = function () {
    // 메인 스레드에서 만든 입력 URL 정리
    self.URL.revokeObjectURL(dataStruct.psDataURL);

    // 이 호출에서 사용할 Module 설정
    Module = {
      preRun: [
        function () {
          // 입력 PDF 를 가상의 파일시스템에 씀
          self.Module.FS.writeFile("input.pdf", new Uint8Array(xhr.response));
        },
      ],
      postRun: [
        function () {
          // 출력 PDF 를 읽어서 Blob → objectURL 로 만들기
          const uarray = self.Module.FS.readFile("output.pdf", {
            encoding: "binary",
          });
          const blob = new Blob([uarray], { type: "application/pdf" });
          const pdfDataURL = self.URL.createObjectURL(blob);
          done({ pdfDataURL, url: dataStruct.url });
        },
      ],
      arguments: [
        "-sDEVICE=pdfwrite",
        "-dCompatibilityLevel=1.4",
        "-dPDFSETTINGS=/ebook",
        "-dNOPAUSE",
        "-dQUIET",
        "-dBATCH",
        "-sOutputFile=output.pdf",
        "input.pdf",
      ],
      print: function () {
        // console.log(text);
      },
      printErr: function (text) {
        console.error(text);
      },
      totalDependencies: 0,
      noExitRuntime: 1,
    };

    // 최초 실행: Module 을 전역에 심고 gs-worker.js 로드
    if (!self.Module || !self.Module.FS) {
      self.Module = Module;
      loadGhostscript(); // 이 안에서 Ghostscript 메인이 실행됨
    } else {
      // 이미 한 번 로드된 경우: preRun / postRun / args 갱신 후 다시 실행
      self.Module.calledRun = false;
      self.Module.preRun = Module.preRun;
      self.Module.postRun = Module.postRun;
      self.Module.arguments = Module.arguments;
      self.Module.callMain([]);
    }
  };

  xhr.onerror = function () {
    done({ error: "Failed to load input PDF in worker" });
  };

  xhr.send();
}

// 메인 스레드에서 보내는 메시지 수신
self.addEventListener("message", function (event) {
  const data = event.data;
  if (!data || data.target !== "wasm") return;

  runGhostscript(data, function (result) {
    if (result.error) {
      self.postMessage({ error: result.error });
    } else {
      self.postMessage({ pdfDataURL: result.pdfDataURL, url: result.url });
    }
  });
});

console.log("PDF worker ready");
