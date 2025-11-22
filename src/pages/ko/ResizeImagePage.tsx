import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ImageResizer from "../../components/ImageResizer"; // 상대 경로 수정


// 타입 정의: title, description, keywords, ogImage, url, 등
const KoResizeImagePage: React.FC = () => {
  const title: string = "이미지 크기 조정";
  const description: string =
    "JPG, PNG, WebP, HEIC 이미지를 온라인에서 빠르게 크기 조정하세요.";
  const keywords: string =
    "이미지 크기 조정, 이미지 리사이즈, jpg 리사이즈, png 리사이즈, webp 리사이즈, heic 리사이즈, 온라인 이미지 도구";
  const url: string = "https://bearcompress.com/ko/resize-image";
  const ogImage: string = "https://bearcompress.com/og-image.jpg";

  return (
    <>
      <Helmet>
        {/* Title */}
        <title>{title} | BearCompress</title>

        {/* Meta Description + Keywords */}
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />

        {/* Canonical URL */}
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:title" content={`${title} | BearCompress`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | BearCompress`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${title} | BearCompress`,
            url: url,
            description: description,
            image: ogImage,
            inLanguage: "ko",
          })}
        </script>
      </Helmet>

      {/* Hidden OG-image for crawlers */}
      <img src="/og-image.jpg" className="hidden" alt="og" />

      {/* ---------------- Page Content ---------------- */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          이미지 크기 조정
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          JPG, PNG, WebP, HEIC 이미지를 온라인에서 빠르고 쉽게 리사이즈하세요.
          이미지 압축이 필요하신가요?{" "}
          <Link to="/ko/compress" className="text-blue-600 underline">
            이미지 압축 도구 사용하기
          </Link>
          .
        </p>
      </div>

      {/* ImageResizer에 lang="ko" 추가 */}
      <ImageResizer lang="ko" /> {/* 여기에 언어별 props 전달 */}
    </>
  );
};

export default KoResizeImagePage;
