import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, Link } from 'react-router-dom';
import CompressImages from '@/components/CompressImages';

const toolDetails = {
  'compress': {
    title: '이미지 압축',
    description: 'JPG, PNG, WebP, HEIC 이미지를 고품질로 압축하세요.',
    keywords: '이미지 압축, png 압축, jpg 압축, webp 압축, heic 압축',
    h1: '이미지 압축',
    p: (
      <>
        JPG, PNG, WebP, HEIC 이미지를 온라인에서 즉시 압축하세요.
        이미지 변환이 필요하신가요?{" "}
        <Link to="/ko/convert" className="text-blue-600 underline">
          이미지 변환기로 이동
        </Link>.
      </>
    ),
    slug: '/ko/compress'
  },

  'compress-jpg': {
    title: 'JPG 압축',
    description: '온라인 JPG 압축기로 JPEG 파일 크기를 줄이세요.',
    keywords: 'jpg 압축, jpeg 압축, 사진 용량 줄이기',
    h1: 'JPG 이미지 압축',
    p: (
      <>
        JPG/JPEG 파일을 빠르고 안전하게 압축하세요.
        JPG를 PNG로 변환하고 싶다면{" "}
        <Link to="/ko/convert/jpg-to-png" className="text-blue-600 underline">
          JPG → PNG 변환기
        </Link>
        를 사용하세요.
      </>
    ),
    slug: '/ko/compress/jpg'
  },

  'compress-png': {
    title: 'PNG 압축',
    description: '투명도 유지하면서 PNG 이미지를 압축하세요.',
    keywords: 'png 압축, png 용량 줄이기, 이미지 최적화',
    h1: 'PNG 이미지 압축',
    p: (
      <>
        투명도 손상 없이 PNG 파일을 최적화하세요.
        PNG를 JPG로 변환하시려면{" "}
        <Link to="/ko/convert/png-to-jpg" className="text-blue-600 underline">
          PNG → JPG 변환기
        </Link>
        를 이용하세요.
      </>
    ),
    slug: '/ko/compress/png'
  },

  'compress-webp': {
    title: 'WebP 압축',
    description: 'WebP 이미지 파일 크기를 효율적으로 줄이세요.',
    keywords: 'webp 압축, webp 용량 줄이기, 이미지 압축 webp',
    h1: 'WebP 이미지 압축',
    p: (
      <>
        WebP 이미지를 더 가볍게 최적화하세요.
        JPG로 변환하려면{" "}
        <Link to="/ko/convert/webp-to-jpg" className="text-blue-600 underline">
          WebP → JPG 변환기
        </Link>
        를 사용하세요.
      </>
    ),
    slug: '/ko/compress/webp'
  },

  'compress-heic': {
    title: 'HEIC 압축',
    description: 'HEIC 이미지를 안전하게 압축하세요.',
    keywords: 'heic 압축, heic 용량 줄이기, 아이폰 heic 압축',
    h1: 'HEIC 이미지 압축',
    p: (
      <>
        HEIC 파일 크기를 줄여보세요.
        먼저 JPG로 변환이 필요하다면{" "}
        <Link to="/ko/convert/heic-to-jpg" className="text-blue-600 underline">
          HEIC → JPG 변환기
        </Link>
        를 이용하세요.
      </>
    ),
    slug: '/ko/compress/heic'
  },

  "compress-pdf": {
  title: "PDF 압축",
  description: "브라우저에서 직접 PDF 파일 용량을 안전하게 줄여보세요.",
  keywords: "pdf 압축, pdf 줄이기, pdf compressor",
  h1: "PDF 압축",
  p: (
    <>
      브라우저에서 직접 PDF 문서의 용량을 안전하게 줄여보세요.<br />
      여러 페이지 PDF와 이미지 기반 PDF도 지원합니다.
    </>
  ),
  slug: "/ko/compress/pdf",
  },

};


const KoCompressPage = ({ tool = 'compress' }) => {
  const details = toolDetails[tool];
  const pageUrl = `https://bearcompress.com${details.slug}`;
  const ogImage = "https://bearcompress.com/og-image.jpg";

  const location = useLocation();
  const initialFiles = location.state?.initialFiles || null;

  return (
    <>
      <Helmet>
        <title>{details.title} | BearCompress</title>
        <meta name="description" content={details.description} />
        <meta name="keywords" content={details.keywords} />
        <meta name="robots" content="index, follow" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${details.title} | BearCompress`} />
        <meta property="og:description" content={details.description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${details.title} | BearCompress`} />
        <meta name="twitter:description" content={details.description} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: pageUrl,
            name: `${details.title} | BearCompress`,
            description: details.description,
          })}
        </script>
      </Helmet>

      <img
      src="/og-image.jpg"
      alt={`${details.title} - BearCompress`}
      className="hidden"
      />


      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{details.h1}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{details.p}</p>
      </div>

      
      {tool === "compress-pdf" ? (
        <CompressPdf />
    ) : (
    <CompressImages
    initialFiles={initialFiles}
    uiText={{
      dropLabel: '여기에 이미지를 끌어다 놓으세요',
      orLabel: '또는',
      buttonLabel: '이미지 선택',
      supportLabel: '지원 형식: JPG, PNG, WebP, HEIC',
          }}
        />
      )}

    </>
  );
};

export default KoCompressPage;
