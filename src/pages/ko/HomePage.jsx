import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Image, Repeat, Upload } from 'lucide-react';

const KoHomePage = () => {
  const navigate = useNavigate();

  const [pendingFiles, setPendingFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList || []);
    if (!arr.length) return;
    setPendingFiles(arr);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e) => {
    handleFiles(e.target.files);
    e.target.value = '';
  };

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const goToCompress = () => {
    if (!pendingFiles.length) return;
    navigate('/ko/compress', { state: { initialFiles: pendingFiles } });
  };

  const goToConvert = () => {
    if (!pendingFiles.length) return;
    navigate('/ko/convert', { state: { initialFiles: pendingFiles } });
  };

  const resetFiles = () => setPendingFiles([]);

  return (
    <>
      <Helmet>
  <title>무료 온라인 이미지 압축 및 변환 도구 | BearCompress</title>

  <meta
    name="description"
    content="온라인에서 무료로 이미지를 압축하고 변환하는 최고의 도구. 브라우저에서 바로 JPG, PNG, WebP, HEIC 파일을 빠르고 안전하게 최적화하세요."
  />
  <meta
    name="keywords"
    content="이미지 압축, 이미지 변환, jpg 압축, png 압축, webp 압축, heic 변환, 온라인 이미지 도구, 사진 용량 줄이기"
  />
  <meta name="robots" content="index, follow" />

  {/* Canonical URL */}
  <link rel="canonical" href="https://bearcompress.com/ko" />

  {/* OpenGraph */}
  <meta property="og:type" content="website" />
  <meta
    property="og:title"
    content="무료 온라인 이미지 압축 및 변환 도구 | BearCompress"
  />
  <meta
    property="og:description"
    content="JPG, PNG, WebP, HEIC 이미지를 즉시 압축하고 변환하는 무료 보안 이미지 도구."
  />
  <meta property="og:url" content="https://bearcompress.com/ko" />
  <meta
    property="og:image"
    content="https://horizons-cdn.hostinger.com/e25b2aee-4883-48af-8ec0-56c5bdb0ffed/e246105e4575a2fdb007988f1a613a34.jpg"
  />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:title"
    content="무료 온라인 이미지 압축 및 변환 도구 | BearCompress"
  />
  <meta
    name="twitter:description"
    content="이미지를 즉시 압축하고 변환하는 무료 보안 이미지 도구."
  />
  <meta
    name="twitter:image"
    content="https://horizons-cdn.hostinger.com/e25b2aee-4883-48af-8ec0-56c5bdb0ffed/e246105e4575a2fdb007988f1a613a34.jpg"
  />

  {/* JSON-LD Schema */}
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://bearcompress.com/ko",
        "name": "BearCompress",
        "description": "JPG, PNG, WebP, HEIC용 무료 온라인 이미지 압축기 및 변환기.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://bearcompress.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    `}
        </script>

  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "이미지 압축이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "이미지 압축은 이미지 파일의 크기를 줄여 웹페이지 로딩 속도를 높이고 저장 공간을 절약하는 기술입니다."
        }
      },
      {
        "@type": "Question",
        "name": "HEIC를 JPG로 어떻게 변환하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "HEIC 파일을 업로드하고 JPG 형식을 선택하면 브라우저에서 즉시 안전하게 JPG로 변환됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "BearCompress는 안전한가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "압축과 변환은 모두 브라우저에서 이루어지며 서버로 업로드되지 않기 때문에 개인정보 유출 위험이 없습니다."
        }
      }
    ]
  })}
</script>

</Helmet>


      <section className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          궁극의 이미지 툴킷
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          이미지 작업에 필요한 모든 도구를 한 곳에 모았습니다. 무료이며 빠르고 안전합니다.
          모든 처리는 브라우저에서 이루어집니다.
        </p>

        {/* ✅ 통합 드롭존 */}
        <div
          className={`w-full max-w-3xl mx-auto p-8 md:p-10 border-2 border-dashed rounded-3xl shadow-sm bg-gray-50 transition ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!pendingFiles.length ? (
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                여기에 이미지를 끌어다 놓으세요
              </h3>
              <p className="text-gray-500 mb-6">또는</p>

              <Button
                onClick={handleSelectClick}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl h-12 px-8"
              >
                이미지 선택
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                onChange={handleFileInput}
                className="hidden"
              />

              <p className="mt-4 text-sm text-gray-500">
                지원 형식: JPG, PNG, WebP, HEIC
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-gray-700 font-medium">
                {pendingFiles.length}개의 이미지가 선택되었습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={goToCompress}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  이미지 압축하기
                </Button>
                <Button onClick={goToConvert} variant="outline" className="px-6">
                  이미지 변환하기
                </Button>
              </div>
              <button
                type="button"
                onClick={resetFiles}
                className="text-xs text-gray-400 underline mt-2"
              >
                선택 초기화
              </button>
            </div>
          )}
        </div>

        {/* 기존 바로가기 버튼 유지 (원하면 지워도 됨) */}
        <p className="text-sm text-gray-500 mt-6 mb-3">
          또는 개별 도구로 바로 이동하기:
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg h-14 px-8 w-full sm:w-auto rounded-xl"
          >
            <Link to="/ko/compress">
              <Image className="mr-2 h-5 w-5" /> 이미지 압축
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-lg h-14 px-8 w-full sm:w-auto rounded-xl"
          >
            <Link to="/ko/convert">
              <Repeat className="mr-2 h-5 w-5" /> 이미지 변환
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ToolCard
            icon={<Image className="h-8 w-8 text-blue-600" />}
            title="이미지 압축"
            description="최고의 품질과 압축률로 JPG, PNG, WebP, HEIC 이미지의 파일 크기를 줄이세요. 웹사이트를 더 빠르게 만들고 대역폭을 절약하세요."
            link="/ko/compress"
            linkText="압축기로 이동"
          />
          <ToolCard
            icon={<Repeat className="h-8 w-8 text-blue-600" />}
            title="이미지 변환"
            description="이미지를 JPG, PNG, WebP로 쉽게 변환하세요. HEIC와 같은 최신 형식을 JPG 또는 PNG로 변환하여 호환성을 극대화하세요."
            link="/ko/convert"
            linkText="변환기로 이동"
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 bg-slate-50 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          자주 묻는 질문 (FAQ)
        </h2>
        <div className="space-y-6">
          <details className="p-4 border rounded-lg bg-white shadow-sm">
            <summary className="font-semibold text-lg cursor-pointer text-gray-700">
              이미지 압축이란 무엇인가요?
            </summary>
            <p className="mt-3 text-gray-600">
              이미지 압축은 이미지 파일의 크기를 줄이는 과정입니다. 웹사이트 로딩 속도를
              높이고 저장 공간을 절약하는 데 유용합니다. 저희 도구를 사용하면 JPG, PNG,
              WebP 파일을 무료로 압축할 수 있습니다.
            </p>
          </details>
          <details className="p-4 border rounded-lg bg-white shadow-sm">
            <summary className="font-semibold text-lg cursor-pointer text-gray-700">
              HEIC를 JPG로 어떻게 변환하나요?
            </summary>
            <p className="mt-3 text-gray-600">
              무료 &apos;이미지 변환&apos; 도구를 사용하여 HEIC를 JPG로 변환할 수 있습니다.
              HEIC 파일을 업로드하고 출력 형식으로 JPG를 선택한 다음 변환을 클릭하기만 하면
              됩니다. 파일은 브라우저에서 처리되어 즉시 다운로드할 수 있습니다.
            </p>
          </details>
          <details className="p-4 border rounded-lg bg-white shadow-sm">
            <summary className="font-semibold text-lg cursor-pointer text-gray-700">
              이 무료 도구들은 사용하기에 안전한가요?
            </summary>
            <p className="mt-3 text-gray-600">
              물론입니다. 귀하의 개인정보 보호는 저희의 최우선 과제입니다. 모든 압축 및
              변환 작업은 웹 브라우저에서 직접 수행됩니다. 파일은 저희 서버에 절대
              업로드되지 않으므로 데이터가 100% 비공개로 안전하게 유지됩니다.
            </p>
          </details>
        </div>
      </section>
      <section className="mt-20">
  <h2 className="text-3xl font-bold text-center">
    많은 사용자들이 BearCompress를 선택하는 이유
  </h2>
  <p className="text-gray-600 text-center mt-3">
    빠른 속도와 높은 품질, 편리한 워크플로우를 위해 설계되었습니다.
  </p>

  <div className="grid md:grid-cols-3 gap-6 mt-12">

    <div className="p-6 rounded-xl shadow-md bg-white">
      <h3 className="text-xl font-semibold">⚡ 매우 빠른 처리 속도</h3>
      <p className="mt-2 text-gray-700">
        실시간에 가까운 성능으로 즉시 이미지 압축과 변환을 할 수 있습니다.
      </p>
    </div>

    <div className="p-6 rounded-xl shadow-md bg-white">
      <h3 className="text-xl font-semibold">🎨 품질 유지</h3>
      <p className="mt-2 text-gray-700">
        중요한 디테일은 그대로 유지한 채 스마트하게 압축됩니다.
      </p>
    </div>

    <div className="p-6 rounded-xl shadow-md bg-white">
      <h3 className="text-xl font-semibold">🛡 프라이버시 우선</h3>
      <p className="mt-2 text-gray-700">
        모든 처리는 브라우저 안에서 이루어져 파일이 서버로 업로드되지 않습니다.
      </p>
    </div>

  </div>

  <div className="grid md:grid-cols-3 gap-6 mt-6">

    <div className="p-6 rounded-xl shadow-md bg-white">
      <h3 className="text-xl font-semibold">🌍 누구나 쉽게 사용</h3>
      <p className="mt-2 text-gray-700">
        블로거, 디자이너, 마케터, 학생까지—모두에게 편리한 도구입니다.
      </p>
    </div>

    <div className="p-6 rounded-xl shadow-md bg-white">
      <h3 className="text-xl font-semibold">💻 설치 불필요</h3>
      <p className="mt-2 text-gray-700">
        브라우저에서 바로 실행. 앱 설치나 회원가입이 필요 없습니다.
      </p>
    </div>

    <div className="p-6 rounded-xl shadow-md bg-white">
      <h3 className="text-xl font-semibold">🔒 안전한 설계</h3>
      <p className="mt-2 text-gray-700">
        파일이 장치 밖으로 나가지 않아 언제나 안전하게 사용할 수 있습니다.
      </p>
    </div>

  </div>
</section>

    </>
  );
};

const ToolCard = ({ icon, title, description, link, linkText }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-4 mb-4">
      {icon}
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 mb-6">{description}</p>
    <Button asChild variant="link" className="p-0 h-auto text-blue-600 font-semibold">
      <Link to={link}>
        {linkText} <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  </div>
);

export default KoHomePage;