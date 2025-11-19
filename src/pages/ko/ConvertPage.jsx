import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, Link } from 'react-router-dom';
import ConvertImages from '@/components/ConvertImages';

const toolDetails = {
  'convert': {
    title: '이미지 변환',
    description:
      '무료 온라인 이미지 변환기. 이미지를 JPG, PNG, WEBP, HEIC 형식으로 즉시 안전하게 변환하세요.',
    keywords:
      '이미지 변환, 온라인 이미지 변환기, jpg 변환기, png 변환기, webp 변환기, heic 변환기, 무료 이미지 변환 도구',
    h1: '이미지 변환',
    p: (
      <>
        이미지를 JPG, PNG, WebP 또는 HEIC 형식으로 즉시 변환하세요.
        압축이 필요하신가요?{" "}
        <Link to="/ko/compress" className="text-blue-600 underline">
          이미지 압축 도구
        </Link>
        를 사용해보세요.
      </>
    ),
    slug: '/ko/convert',
  },

  'jpg-to-png': {
    title: 'JPG를 PNG로 변환',
    description:
      'JPG 이미지를 고품질 PNG 형식으로 변환합니다.',
    keywords:
      'jpg to png, jpg를 png로 변환, jpeg to png 온라인, 이미지 변환기',
    h1: 'JPG를 PNG로 변환기',
    p: (
      <>
        JPG 이미지를 고품질 PNG로 변환하세요.
        JPG 압축이 필요하면{" "}
        <Link to="/ko/compress/jpg" className="text-blue-600 underline">
          JPG 압축 도구
        </Link>
        를 사용해보세요.
      </>
    ),
    slug: '/ko/convert/jpg-to-png',
  },

  'png-to-jpg': {
    title: 'PNG를 JPG로 변환',
    description: 'PNG 이미지를 JPG로 변환합니다.',
    keywords:
      'png to jpg, png를 jpg로 변환, png jpeg 온라인',
    h1: 'PNG를 JPG로 변환기',
    p: (
      <>
        PNG 이미지를 더 작은 JPG 파일로 변환하세요.
        PNG 압축이 필요하면{" "}
        <Link to="/ko/compress/png" className="text-blue-600 underline">
          PNG 압축 도구
        </Link>
        를 사용하세요.
      </>
    ),
    slug: '/ko/convert/png-to-jpg',
  },

  'png-to-webp': {
    title: 'PNG를 WebP로 변환',
    description: 'PNG를 WebP로 변환하여 더 가볍고 빠르게.',
    keywords:
      'png to webp, png를 webp로 변환, webp 변환기',
    h1: 'PNG를 WebP로 변환기',
    p: (
      <>
        PNG를 차세대 WebP 형식으로 변환하세요.
        WebP 압축은{" "}
        <Link to="/ko/compress/webp" className="text-blue-600 underline">
          WebP 압축 도구
        </Link>
        를 사용하세요.
      </>
    ),
    slug: '/ko/convert/png-to-webp',
  },

  'webp-to-jpg': {
    title: 'WebP를 JPG로 변환',
    description: 'WebP 이미지를 널리 호환되는 JPG로 변환.',
    keywords:
      'webp to jpg, webp를 jpg로 변환 온라인',
    h1: 'WebP를 JPG로 변환기',
    p: (
      <>
        WebP 이미지를 JPG로 변환하세요.
        JPG 압축이 필요하다면{" "}
        <Link to="/ko/compress/jpg" className="text-blue-600 underline">
          JPG 압축 도구
        </Link>
        를 사용하세요.
      </>
    ),
    slug: '/ko/convert/webp-to-jpg',
  },

  'heic-to-jpg': {
    title: 'HEIC를 JPG로 변환',
    description: '아이폰 HEIC 사진을 JPG로 변환.',
    keywords:
      'heic to jpg, heic를 jpg로 변환',
    h1: 'HEIC를 JPG로 변환기',
    p: (
      <>
        HEIC 이미지를 JPG로 변환하세요.
        JPG 압축이 필요하면{" "}
        <Link to="/ko/compress/jpg" className="text-blue-600 underline">
          JPG 압축 도구
        </Link>
        를 사용하세요.
      </>
    ),
    slug: '/ko/convert/heic-to-jpg',
  },

  'heic-to-png': {
    title: 'HEIC를 PNG로 변환',
    description: 'HEIC를 PNG로 변환하여 고품질 유지.',
    keywords: 'heic to png, heic를 png로 변환',
    h1: 'HEIC를 PNG로 변환기',
    p: (
      <>
        HEIC 이미지를 고품질 PNG로 변환하세요.
        PNG 압축은{" "}
        <Link to="/ko/compress/png" className="text-blue-600 underline">
          PNG 압축 도구
        </Link>
        를 사용하세요.
      </>
    ),
    slug: '/ko/convert/heic-to-png',
  },
};

const KoConvertPage = ({ tool = 'convert' }) => {
  const details = toolDetails[tool];
  const pageUrl = `https://bearcompress.com${details.slug}`;
  const ogImage =
    "https://bearcompress.com/og-image.jpg";

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

        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${details.title} | BearCompress`} />
        <meta property="og:description" content={details.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />

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
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          {details.h1}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {details.p}
        </p>
      </div>

      <ConvertImages
        initialFiles={initialFiles}
        uiText={{
          dropLabel: "여기에 이미지를 끌어다 놓으세요",
          orLabel: "또는",
          buttonLabel: "이미지 선택",
          supportLabel: "지원 형식: JPG, PNG, WebP, HEIC",
        }}
      />
    </>
  );
};

export default KoConvertPage;
