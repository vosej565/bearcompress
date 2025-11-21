importScripts("./gs-worker.js");

let ready = false;

// WASM 초기화 완료
Module.onRuntimeInitialized = () => {
  ready = true;
  postMessage({ ready: true });
};

self.onmessage = async ({ data }) => {
  if (!ready) {
    postMessage({ error: "Ghostscript WASM not ready" });
    return;
  }

  try {
    const input = new Uint8Array(data.file);

    // 1) Ghostscript 인스턴스 생성
    const instPtrPtr = Module._malloc(4);
    const rc1 = Module._gsapi_new_instance(instPtrPtr, 0);
    if (rc1 !== 0) {
      postMessage({ error: "gsapi_new_instance failed: " + rc1 });
      return;
    }

    const inst = Module.getValue(instPtrPtr, '*');

    // 2) 입력 PDF 파일 저장
    Module.FS.writeFile("input.pdf", input);

    // 3) Ghostscript 명령어 리스트
    const args = [
      "gs",
      "-dQUIET",
      "-dNOPAUSE",
      "-dBATCH",
      "-sDEVICE=pdfwrite",
      "-dPDFSETTINGS=/ebook",
      "-sOutputFile=output.pdf",
      "input.pdf"
    ];

    // 4) 문자열 포인터 배열 생성
    const argc = args.length;
    const argvPtr = Module._malloc(argc * 4);

    for (let i = 0; i < argc; i++) {
      const strPtr = Module.allocateUTF8(args[i]);
      Module.setValue(argvPtr + i * 4, strPtr, '*');
    }

    // 5) Ghostscript 초기화 + 실행
    const rc2 = Module._gsapi_init_with_args(inst, argc, argvPtr);
    if (rc2 !== 0) {
      postMessage({ error: "gsapi_init_with_args failed: " + rc2 });
      return;
    }

    // 6) Ghostscript 종료
    Module._gsapi_exit(inst);
    Module._gsapi_delete_instance(inst);

    // 7) out.pdf 읽기
    const output = Module.FS.readFile("output.pdf");

    postMessage({ result: output.buffer }, [output.buffer]);

  } catch (err) {
    postMessage({ error: err.toString() });
  }
};
