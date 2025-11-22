import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ImageResizer from "../components/ImageResizer"; // ImageResizer 컴포넌트 호출

const ResizeImagePage: React.FC = () => {
  const title: string = "Resize Image";
  const description: string =
    "Resize JPG, PNG, WebP, and HEIC images instantly online without losing quality.";
  const keywords: string =
    "resize image, image resizer, resize jpg, resize png, resize webp, resize heic, online image resizer, image tools";
  const url: string = "https://bearcompress.com/resize-image";
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
          })}
        </script>
      </Helmet>

      {/* Hidden OG-image for crawlers */}
      <img src="/og-image.jpg" className="hidden" alt="og" />

      {/* ---------------- Page Content ---------------- */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Resize Image
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Resize your JPG, PNG, WebP, and HEIC images instantly online.
          Need to compress images instead?{" "}
          <Link to="/compress" className="text-blue-600 underline">
            Try our Image Compressor
          </Link>
          .
        </p>
      </div>

      {/* ImageResizer에 lang="en" 추가 */}
      <ImageResizer lang="en" /> {/* 여기에 언어별 props 전달 */}
    </>
  );
};

export default ResizeImagePage;
