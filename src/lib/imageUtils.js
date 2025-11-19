import heic2any from "heic2any";
import UPNG from "upng-js";

/* ---------------------------------------------------------
   PNG 손실 압축 (UPNG.js)
--------------------------------------------------------- */
const compressPngLossy = (bitmap, quality) => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(bitmap, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const rgba = imageData.data.buffer;

      // 색상수(팔레트) 설정: 낮을수록 용량 ↓
      let colorCount;
      if (quality >= 0.9) colorCount = 256;
      else if (quality >= 0.7) colorCount = 128;
      else if (quality >= 0.5) colorCount = 64;
      else if (quality >= 0.3) colorCount = 32;
      else colorCount = 16;

      const compressed = UPNG.encode([rgba], bitmap.width, bitmap.height, colorCount);
      const blob = new Blob([compressed], { type: "image/png" });

      resolve(blob);
    } catch (err) {
      console.error("[PNG 압축 실패] ", err);
      reject(err);
    }
  });
};

/* ---------------------------------------------------------
   JPG / PNG / WEBP 압축
--------------------------------------------------------- */
export const compressImage = async (file, quality = 0.9) => {
  const bitmap = await createImageBitmap(file);
  const outputType = file.type;

  let blob;

  try {
    if (outputType === "image/png") {
      // PNG → UPNG.js (손실 압축)
      blob = await compressPngLossy(bitmap, quality);
    } else if (outputType === "image/jpeg" || outputType === "image/webp") {
      // JPEG / WebP → Canvas 기반 압축
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(bitmap, 0, 0);

      blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, outputType, quality)
      );
    } else {
      console.warn("지원하지 않는 형식 → 원본 반환");
      blob = file;
    }
  } catch (err) {
    console.error("[압축 실패 → 원본 반환]", err);
    blob = file;
  }

  const baseName = file.name.replace(/\.[^/.]+$/, "");
  let extension = outputType.split("/")[1];
  if (extension === "jpeg") extension = "jpg";

  return new File([blob], `${baseName}_compressed.${extension}`, {
    type: outputType,
    lastModified: Date.now(),
  });
};

/* ---------------------------------------------------------
   이미지 포맷 변환 (JPG / PNG / WEBP)
   PNG → JPG 투명 흰색 처리 포함
--------------------------------------------------------- */
export const convertImage = async (file, targetFormat) => {
  const bitmap = await createImageBitmap(file);

  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const ctx = canvas.getContext("2d");

  // PNG/WebP → JPG 시 투명 배경 흰색 처리
  if (
    targetFormat === "image/jpeg" &&
    (file.type === "image/png" || file.type === "image/webp")
  ) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(bitmap, 0, 0);

  const blob = await new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject("toBlob 실패")),
      targetFormat,
      0.95
    )
  );

  const baseName = file.name.replace(/\.[^/.]+$/, "");

  let extension = targetFormat.split("/")[1];
  if (extension === "jpeg") extension = "jpg";

  return new File([blob], `${baseName}.${extension}`, {
    type: targetFormat,
    lastModified: Date.now(),
  });
};

/* ---------------------------------------------------------
   HEIC → JPG / PNG 변환
--------------------------------------------------------- */
export const convertHeicToTarget = async (
  heicFile,
  targetFormat = "image/jpeg"
) => {
  const result = await heic2any({
    blob: heicFile,
    toType: targetFormat,
    quality: 0.92,
  });

  const blob = Array.isArray(result) ? result[0] : result;
  const baseName = heicFile.name.replace(/\.(heic|heif)$/i, "");

  let extension = targetFormat.split("/")[1];
  if (extension === "jpeg") extension = "jpg";

  return new File([blob], `${baseName}.${extension}`, {
    type: targetFormat,
    lastModified: Date.now(),
  });
};

export const convertHeicToPng = (file) =>
  convertHeicToTarget(file, "image/png");