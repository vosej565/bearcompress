import React, { useState, useRef, useEffect } from 'react';
import { Upload } from 'lucide-react';

const SOCIAL_PRESETS = {
  Facebook: [
    { label: 'Profile (170 X 170)', w: 170, h: 170 },
    { label: 'Cover (820 X 312)', w: 820, h: 312 },
    { label: 'Post (1200 X 900)', w: 1200, h: 900 },
    { label: 'Ad (1280 X 720)', w: 1280, h: 720 },
  ],
  Instagram: [
    { label: 'Profile (110 X 110)', w: 110, h: 110 },
    { label: 'Post (320 X 320)', w: 320, h: 320 },
    { label: 'Story (1080 X 1920)', w: 1080, h: 1920 },
  ],
  Twitter: [
    { label: 'Profile (400 X 400)', w: 400, h: 400 },
    { label: 'Header (1500 X 1500)', w: 1500, h: 1500 },
    { label: 'Image (1024 X 512)', w: 1024, h: 512 },
    { label: 'Card (1200 X 628)', w: 1200, h: 628 },
    { label: 'Ad (1200 X 675)', w: 1200, h: 675 },
  ],
  YouTube: [
    { label: 'Profile (800 X 800)', w: 800, h: 800 },
    { label: 'Channel Art (2560 X 1440)', w: 2560, h: 1440 },
    { label: 'Thumbnail (1280 X 720)', w: 1280, h: 720 },
  ],
};

const ImageResizer = ({ lang = 'en' }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [keepRatio, setKeepRatio] = useState(true);
  const [percent, setPercent] = useState(100);
  const [activeTab, setActiveTab] = useState<'size' | 'percentage' | 'social'>('size');
  const [socialPlatform, setSocialPlatform] = useState<'Facebook' | 'Instagram' | 'Twitter' | 'YouTube'>('Facebook');
  const [socialPresetIndex, setSocialPresetIndex] = useState(0);

  const originalRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview); // 미리보기 URL 해제
      }
    };
  }, [preview]);

  const handleFile = (file) => {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      originalRef.current = { w: img.width, h: img.height };
      setWidth(img.width);
      setHeight(img.height);
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    };
    img.src = URL.createObjectURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0] ?? null);
  };

const applySocialPreset = (platform, idx) => {
  // SOCIAL_PRESETS[platform]이 배열인지 확인 후 처리
  const presets = SOCIAL_PRESETS[platform];
  if (!Array.isArray(presets)) {
    console.error(`Invalid platform: ${platform}`);
    return;
  }
  const preset = presets[idx];  // 배열에서 안전하게 접근
  if (!preset) return;
  setWidth(preset.w);
  setHeight(preset.h);
};

// resizeImage 함수에서 width와 height 값이 유효한 숫자인지 확인
const resizeImage = async (format = 'image/png') => {
  if (!image || !preview) return;

  const img = new Image();
  img.src = preview;
  await img.decode();

  const canvas = document.createElement('canvas');
  let targetW;
  let targetH;

  const origW = originalRef.current.w || img.width;
  const origH = originalRef.current.h || img.height;

  if (activeTab === 'percentage') {
    targetW = Math.round(origW * (percent / 100));
    targetH = Math.round(origH * (percent / 100));
  } else {
    const w = Number(width);
    const h = Number(height);
    if (isNaN(w) || isNaN(h)) {
      console.error("Invalid width or height value");
      return;  // 유효하지 않으면 처리하지 않음
    }
    targetW = w;
    targetH = h;
  }

  canvas.width = targetW;
  canvas.height = targetH;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.drawImage(img, 0, 0, targetW, targetH);

  canvas.toBlob(
    (blob) => {
      if (!blob) return;
      const link = document.createElement('a');
      const ext =
        format === 'image/png'
          ? 'png'
          : format === 'image/jpeg'
          ? 'jpg'
          : 'webp';
      link.download = `resized.${ext}`;
      link.href = URL.createObjectURL(blob);
      link.click();
    },
    format,
    0.95
  );
};


  const renderTabs = () => {
    const base = 'px-4 py-2 text-sm font-medium rounded-lg transition-colors';
    return (
      <div className="inline-flex bg-gray-100 rounded-xl p-1 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('size')}
          className={base + (activeTab === 'size' ? ' bg-white shadow text-gray-900' : ' text-gray-600 hover:text-gray-900')}
        >
          {lang === 'ko' ? '크기 직접 입력' : 'By Size'}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('percentage')}
          className={base + (activeTab === 'percentage' ? ' bg-white shadow text-gray-900 ml-1' : ' text-gray-600 hover:text-gray-900 ml-1')}
        >
          {lang === 'ko' ? '비율로 조절' : 'As Percentage'}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={base + (activeTab === 'social' ? ' bg-white shadow text-gray-900 ml-1' : ' text-gray-600 hover:text-gray-900 ml-1')}
        >
          {lang === 'ko' ? '소셜 미디어' : 'Social Media'}
        </button>
      </div>
    );
  };

  return (
    <div>
      {!preview && (
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 rounded-3xl bg-gray-50 px-6 py-16 flex flex-col items-center justify-center text-center"
        >
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-xl font-semibold mb-2">
            {lang === 'ko' ? '여기에 이미지를 끌어다 놓으세요' : 'Drop Images Here'}
          </p>
          <p className="text-gray-500 mb-4">{lang === 'ko' ? '또는' : 'or'}</p>

          <label
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold cursor-pointer hover:bg-blue-700"
          >
            {lang === 'ko' ? '이미지 선택하기' : 'Select Images'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
          </label>

          <p className="mt-4 text-xs text-gray-500">
            {lang === 'ko' ? 'JPG, PNG, WebP, HEIC 지원' : 'Supports JPG, PNG, WebP, HEIC'}
          </p>
        </div>
      )}

      {preview && (
        <div className="mt-10">
          <div className="border border-gray-200 rounded-2xl p-4 mb-10 bg-gray-50 flex flex-col items-center">
            <img src={preview} className="max-h-80 rounded-md mb-4" alt="preview" />
            <p className="text-sm text-gray-600">
              {lang === 'ko' ? `원본: ${originalRef.current.w} × ${originalRef.current.h} px` : `Original: ${originalRef.current.w} × ${originalRef.current.h} px`}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {renderTabs()}

            {activeTab === 'size' && (
              <>
                <div className="grid sm:grid-cols-2 gap-4 mb-4 text-left">
                  <div>
                    <label className="font-semibold text-sm mb-1 block">{lang === 'ko' ? '가로(px)' : 'Width'}</label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => {
                        const v = Number(e.target.value || 0);
                        setWidth(v);
                        if (keepRatio && originalRef.current.w) {
                          setHeight(Math.round((v / originalRef.current.w) * originalRef.current.h));
                        }
                      }}
                      className="w-full border border-gray-300 rounded-xl px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-sm mb-1 block">{lang === 'ko' ? '세로(px)' : 'Height'}</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => {
                        const v = Number(e.target.value || 0);
                        setHeight(v);
                        if (keepRatio && originalRef.current.h) {
                          setWidth(Math.round((v / originalRef.current.h) * originalRef.current.w));
                        }
                      }}
                      className="w-full border border-gray-300 rounded-xl px-3 py-2"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-sm mb-6">
                  <input type="checkbox" checked={keepRatio} onChange={() => setKeepRatio(!keepRatio)} />
                  {lang === 'ko' ? '비율 유지' : 'Keep aspect ratio'}
                </label>
              </>
            )}

            {activeTab === 'percentage' && (
              <div className="mb-8 text-left">
                <p className="font-semibold text-sm mb-2">{lang === 'ko' ? '비율로 조절' : 'Resize by percentage'}</p>
                <input
                  type="range"
                  min={10}
                  max={200}
                  value={percent}
                  onChange={(e) => setPercent(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm mt-1 text-gray-600">
                  <span>{lang === 'ko' ? '이미지 크기' : 'Make my image'} {percent}%</span>
                  <span>{percent}%</span>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="mb-8 text-left space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    {lang === 'ko' ? '플랫폼 선택' : 'Choose the Social Media Platform'}
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                    value={socialPlatform}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSocialPlatform(value);
                      setSocialPresetIndex(0); // reset preset index on platform change
                      applySocialPreset(value, 0); // apply preset for the selected platform
                    }}
                  >
                    {Object.keys(SOCIAL_PRESETS).map((platform) => (
                      <option key={platform} value={platform}>
                        {platform === 'Facebook' && (lang === 'ko' ? '페이스북' : 'Facebook')}
                        {platform === 'Instagram' && (lang === 'ko' ? '인스타그램' : 'Instagram')}
                        {platform === 'Twitter' && (lang === 'ko' ? '트위터' : 'Twitter')}
                        {platform === 'YouTube' && (lang === 'ko' ? '유튜브' : 'YouTube')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    {lang === 'ko' ? '프리셋 종류' : 'Preset Type'}
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                    value={socialPresetIndex}
                    onChange={(e) => {
                      const idx = Number(e.target.value);
                      setSocialPresetIndex(idx);
                      applySocialPreset(socialPlatform, idx); // apply preset based on selected index
                    }}
                  >
                    {SOCIAL_PRESETS[socialPlatform].map((preset, idx) => (
                      <option key={preset.label} value={idx}>
                        {preset.label}
                      </option>
                    ))}
                  </select>
                </div>

                <p className="text-sm text-gray-600">
                  {lang === 'ko' ? '선택된 크기' : 'Selected size'}: {width || '-'} × {height || '-'} px
                </p>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                onClick={() => resizeImage('image/jpeg')}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                {lang === 'ko' ? 'JPG 다운로드' : 'Download JPG'}
              </button>
              <button
                onClick={() => resizeImage('image/png')}
                className="px-6 py-3 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-900"
              >
                {lang === 'ko' ? 'PNG 다운로드' : 'Download PNG'}
              </button>
              <button
                onClick={() => resizeImage('image/webp')}
                className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
              >
                {lang === 'ko' ? 'WebP 다운로드' : 'Download WebP'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageResizer;
