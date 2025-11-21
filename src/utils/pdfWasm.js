if (!window.__gsWasm) {
  window.__gsWasm = {
    worker: null,
    ready: false,
    pendingResolve: null,
    pendingReject: null
  };
}

export async function compressPdfInWasm(file) {
  const singleton = window.__gsWasm;

  if (!singleton.worker) {
    singleton.worker = new Worker("/gs/worker.js");
    singleton.worker.onmessage = (e) => {
      if (e.data.error) {
        if (singleton.pendingReject) singleton.pendingReject(e.data.error);
        return;
      }

      if (e.data.result && singleton.pendingResolve) {
        const blob = new Blob([e.data.result], { type: "application/pdf" });
        singleton.pendingResolve(blob);
      }
    };
  }

  return new Promise(async (resolve, reject) => {
    singleton.pendingResolve = resolve;
    singleton.pendingReject = reject;

    singleton.worker.postMessage({
      file: await file.arrayBuffer(),
    });
  });
}
