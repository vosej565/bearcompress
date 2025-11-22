import React, { useState, useRef } from "react";

export default function ImageResizer() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [keepRatio, setKeepRatio] = useState(true);
  const [percent, setPercent] = useState(100);
  const originalRef = useRef({ w: 0, h: 0 });

  const handleFile = (file) => {
    const img = new Image();
    img.onload = () => {
      originalRef.current = { w: img.width, h: img.height };
      setWidth(img.width);
      setHeight(img.height);
      setImage(file);
      setPreview(URL.createObjectURL(file));
    };
    img.src = URL.createObjectURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const resizeImage = async (format = "image/png") => {
    if (!image) return;

    const img = new Image();
    img.src = preview;

    await img.decode();

    const canvas = document.createElement("canvas");
    const newWidth = Math.round(originalRef.current.w * (percent / 100));
    const newHeight = Math.round(originalRef.current.h * (percent / 100));

    canvas.width = width || newWidth;
    canvas.height = height || newHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const link = document.createElement("a");
      link.download = `resized.${format === "image/png" ? "png" : format === "image/jpeg" ? "jpg" : "webp"}`;
      link.href = URL.createObjectURL(blob);
      link.click();
    }, format);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Resize Image</h1>
      <p className="text-center text-gray-600 mb-8">
        Resize JPG, PNG, WebP, HEIC images instantly online.
      </p>

      {/* Drop area */}
      {!preview && (
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed rounded-xl p-12 text-center text-gray-600 bg-gray-50"
        >
          <div className="text-5xl mb-3">📤</div>
          <p className="text-xl mb-2">Drop Images Here</p>
          <p className="text-gray-500 mb-6">or</p>

          <label className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Select Images
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </label>
        </div>
      )}

      {/* Preview + Controls */}
      {preview && (
        <div className="mt-10">
          <img
            src={preview}
            className="max-h-80 mx-auto mb-6 rounded-lg shadow"
            alt="Preview"
          />

          {/* Size inputs */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="font-semibold">Width</label>
              <input
                type="number"
                value={width}
                onChange={(e) => {
                  setWidth(e.target.value);
                  if (keepRatio) {
                    setHeight(
                      Math.round(
                        (e.target.value / originalRef.current.w) * originalRef.current.h
                      )
                    );
                  }
                }}
                className="border px-3 py-2 rounded w-full mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">Height</label>
              <input
                type="number"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                  if (keepRatio) {
                    setWidth(
                      Math.round(
                        (e.target.value / originalRef.current.h) * originalRef.current.w
                      )
                    );
                  }
                }}
                className="border px-3 py-2 rounded w-full mt-1"
              />
            </div>
          </div>

          {/* Keep ratio */}
          <label className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              checked={keepRatio}
              onChange={() => setKeepRatio(!keepRatio)}
            />
            Keep Aspect Ratio
          </label>

          {/* Slider for Percentage */}
          <div className="mb-10">
            <p className="font-semibold mb-2">Resize by Percentage</p>
            <input
              type="range"
              min="1"
              max="200"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              className="w-full"
            />
            <div className="text-right text-gray-600">{percent}%</div>
          </div>

          {/* Download buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => resizeImage("image/jpeg")}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
            >
              Download JPG
            </button>
            <button
              onClick={() => resizeImage("image/png")}
              className="bg-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800"
            >
              Download PNG
            </button>
            <button
              onClick={() => resizeImage("image/webp")}
              className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
            >
              Download WebP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
