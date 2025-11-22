import React, { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";

type SocialPlatform = "Facebook" | "Instagram" | "Twitter" | "YouTube";

const SOCIAL_PRESETS = {
  Facebook: [
    { label: "Profile (170×170)", w: 170, h: 170 },
    { label: "Cover (820×312)", w: 820, h: 312 },
    { label: "Post (1200×900)", w: 1200, h: 900 },
    { label: "Ad (1280×720)", w: 1280, h: 720 }
  ],
  Instagram: [
    { label: "Profile (110×110)", w: 110, h: 110 },
    { label: "Post (320×320)", w: 320, h: 320 },
    { label: "Story (1080×1920)", w: 1080, h: 1920 }
  ],
  Twitter: [
    { label: "Profile (400×400)", w: 400, h: 400 },
    { label: "Header (1500×500)", w: 1500, h: 500 },
    { label: "Image (1024×512)", w: 1024, h: 512 },
    { label: "Card (1200×628)", w: 1200, h: 628 },
    { label: "Ad (1200×675)", w: 1200, h: 675 }
  ],
  YouTube: [
    { label: "Profile (800×800)", w: 800, h: 800 },
    { label: "Channel Art (2560×1440)", w: 2560, h: 1440 },
    { label: "Thumbnail (1280×720)", w: 1280, h: 720 }
  ]
};

type ImageResizerProps = {
  lang?: "en" | "ko";
};

const ImageResizer: React.FC<ImageResizerProps> = ({ lang = "en" }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [keepRatio, setKeepRatio] = useState<boolean>(true);
  const [percent, setPercent] = useState<number>(100);

  const [activeTab, setActiveTab] = useState<
    "size" | "percentage" | "social"
  >("size");

  const [socialPlatform, setSocialPlatform] =
    useState<SocialPlatform>("Facebook");
  const [socialPresetIndex, setSocialPresetIndex] = useState<number>(0);

  const originalRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  // cleanup URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /** Handle file upload */
  const handleFile = (file: File | null) => {
    if (!file) return;

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

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0] ?? null);
  };

  /** Social preset change */
  const applySocialPreset = (platform: SocialPlatform, idx: number) => {
    const preset = SOCIAL_PRESETS[platform][idx];
    setWidth(preset.w);
    setHeight(preset.h);
  };

  /** Image resizing function */
  const resizeImage = async (
    format: "image/jpeg" | "image/png" | "image/webp"
  ) => {
    if (!image || !preview) return;

    const img = new Image();
    img.src = preview;
    await img.decode();

    const canvas = document.createElement("canvas");

    let targetW = width;
    let targetH = height;

    // percentage mode
    if (activeTab === "percentage") {
      targetW = Math.round(originalRef.current.w * (percent / 100));
      targetH = Math.round(originalRef.current.h * (percent / 100));
    }

    canvas.width = targetW;
    canvas.height = targetH;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, targetW, targetH);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const link = document.createElement("a");
        link.download =
          format === "image/jpeg"
            ? "resized.jpg"
            : format === "image/png"
            ? "resized.png"
            : "resized.webp";

        link.href = URL.createObjectURL(blob);
        link.click();
      },
      format,
      0.95
    );
  };

  /** Tab UI rendering */
  const renderTabs = () => {
    const base =
      "px-4 py-2 text-sm font-medium rounded-lg transition-colors";

    return (
      <div className="inline-flex bg-gray-100 rounded-xl p-1 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("size")}
          className={
            base +
            (activeTab === "size"
              ? " bg-white shadow text-gray-900"
              : " text-gray-600 hover:text-gray-900")
          }
        >
          {lang === "ko" ? "크기 직접 입력" : "By Size"}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("percentage")}
          className={
            base +
            (activeTab === "percentage"
              ? " bg-white shadow text-gray-900 ml-1"
              : " text-gray-600 hover:text-gray-900 ml-1")
          }
        >
          {lang === "ko" ? "비율로 조절" : "As Percentage"}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("social")}
          className={
            base +
            (activeTab === "social"
              ? " bg-white shadow text-gray-900 ml-1"
              : " text-gray-600 hover:text-gray-900 ml-1")
          }
        >
          {lang === "ko" ? "소셜 미디어" : "Social Media"}
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-12">
      {/* LEFT: Upload panel */}
      <div className="md:w-1/2 w-full flex flex-col items-center">
        {!preview && (
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 rounded-3xl bg-gray-50
                       px-6 py-16 flex flex-col items-center justify-center text-center w-full"
          >
            <Upload className="h-12 w-12 text-gray-400 mb-4" />

            <p className="text-xl font-semibold mb-2">
              {lang === "ko"
                ? "여기에 이미지를 끌어다 놓으세요"
                : "Drop Images Here"}
            </p>

            <p className="text-gray-500 mb-4">
              {lang === "ko" ? "또는" : "or"}
            </p>

            <label
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl
                         bg-blue-600 text-white font-semibold cursor-pointer hover:bg-blue-700"
            >
              {lang === "ko" ? "이미지 선택하기" : "Select Images"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleFile(e.target.files?.[0] ?? null)
                }
              />
            </label>

            <p className="mt-4 text-xs text-gray-500">
              {lang === "ko"
                ? "JPG, PNG, WebP, HEIC 지원"
                : "Supports JPG, PNG, WebP, HEIC"}
            </p>
          </div>
        )}

        {/* Preview */}
        {preview && (
          <div className="w-full border border-gray-200 rounded-2xl p-4 mb-10 bg-gray-50 flex flex-col items-center">
            <img
              src={preview}
              className="max-h-80 rounded-md mb-4"
              alt="preview"
            />
            <p className="text-sm text-gray-600">
              {lang === "ko"
                ? `원본: ${originalRef.current.w} × ${originalRef.current.h} px`
                : `Original: ${originalRef.current.w} × ${originalRef.current.h} px`}
            </p>
          </div>
        )}
      </div>

      {/* RIGHT: Options */}
      <div className="md:w-1/2 w-full">
        {renderTabs()}

        {/* SIZE TAB */}
        {activeTab === "size" && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4 text-left">
              <div>
                <label className="font-semibold text-sm mb-1 block">
                  {lang === "ko" ? "가로(px)" : "Width"}
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setWidth(v);

                    if (keepRatio && originalRef.current.w) {
                      setHeight(
                        Math.round(
                          (v / originalRef.current.w) *
                            originalRef.current.h
                        )
                      );
                    }
                  }}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="font-semibold text-sm mb-1 block">
                  {lang === "ko" ? "세로(px)" : "Height"}
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setHeight(v);

                    if (keepRatio && originalRef.current.h) {
                      setWidth(
                        Math.round(
                          (v / originalRef.current.h) *
                            originalRef.current.w
                        )
                      );
                    }
                  }}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm mb-6">
              <input
                type="checkbox"
                checked={keepRatio}
                onChange={() => setKeepRatio(!keepRatio)}
              />
              {lang === "ko" ? "비율 유지" : "Keep aspect ratio"}
            </label>
          </>
        )}

        {/* PERCENTAGE TAB */}
        {activeTab === "percentage" && (
          <div className="mb-8 text-left">
            <p className="font-semibold text-sm mb-2">
              {lang === "ko"
                ? "비율로 조절"
                : "Resize by percentage"}
            </p>
            <input
              type="range"
              min={10}
              max={200}
              value={percent}
              onChange={(e) => setPercent(Number(e.target.value))}
              className="w-full"
            />

            <div className="flex justify-between text-sm mt-1 text-gray-600">
              <span>
                {lang === "ko"
                  ? "이미지 크기"
                  : "Make my image"}{" "}
                {percent}%
              </span>
              <span>{percent}%</span>
            </div>
          </div>
        )}

        {/* SOCIAL MEDIA TAB */}
        {activeTab === "social" && (
          <div className="mb-8 text-left space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                {lang === "ko"
                  ? "플랫폼 선택"
                  : "Choose the Social Media Platform"}
              </label>
              <select
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                value={socialPlatform}
                onChange={(e) => {
                  const value = e.target.value as SocialPlatform;
                  setSocialPlatform(value);
                  setSocialPresetIndex(0);
                  applySocialPreset(value, 0);
                }}
              >
                {Object.keys(SOCIAL_PRESETS).map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                {lang === "ko" ? "프리셋" : "Preset Type"}
              </label>
              <select
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                value={socialPresetIndex}
                onChange={(e) => {
                  const idx = Number(e.target.value);
                  setSocialPresetIndex(idx);
                  applySocialPreset(socialPlatform, idx);
                }}
              >
                {SOCIAL_PRESETS[socialPlatform].map((preset, idx) => (
                  <option key={preset.label} value={idx}>
                    {preset.label}
                  </option>
                ))}
              </select>

              <p className="text-sm text-gray-600 mt-2">
                {lang === "ko" ? "선택된 크기" : "Selected size"}:{" "}
                {width} × {height}
              </p>
            </div>
          </div>
        )}

        {/* DOWNLOAD DROPDOWN */}
        <div className="mt-8 text-left">
          <label className="block text-sm font-semibold mb-2">
            {lang === "ko" ? "저장 형식" : "Download As"}
          </label>

          <select
            className="w-full border border-gray-300 rounded-xl px-3 py-3 bg-white mb-4"
            onChange={(e) => {
              const format = e.target.value;
              if (format === "jpg") resizeImage("image/jpeg");
              if (format === "png") resizeImage("image/png");
              if (format === "webp") resizeImage("image/webp");
            }}
          >
            <option value="">-- Select --</option>
            <option value="jpg">JPG</option>
            <option value="png">PNG</option>
            <option value="webp">WEBP</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ImageResizer;
