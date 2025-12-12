import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, Link } from 'react-router-dom';
import ConvertImages from '@/components/ConvertImages';

const toolDetails = {
  convert: {
    title: 'Convert Image',
    description:
      'Free online image converter. Convert images to JPG, PNG, WEBP, and HEIC formats instantly and securely.',
    keywords:
      'convert image, online image converter, jpg converter, png converter, webp converter, heic converter, free image convert tool',
    h1: 'Convert Image',
    p: (
      <>
        Convert your images to JPG, PNG, WebP, or HEIC instantly.
        Looking to compress instead?{' '}
        <Link to="/compress" className="text-blue-600 underline">
          Try our Image Compressor
        </Link>
        .
      </>
    ),
    slug: '/convert',
  },

  'jpg-to-png': {
    title: 'Convert JPG to PNG',
    description: 'Convert JPG images to PNG format with high quality.',
    keywords: 'jpg to png, convert jpg to png, jpeg to png online, image converter',
    h1: 'JPG to PNG Converter',
    p: (
      <>
        Convert your JPG images to high-quality PNG files in seconds.
        Need JPG compression first?{' '}
        <Link to="/compress/jpg" className="text-blue-600 underline">
          Compress JPG here
        </Link>
        .
      </>
    ),
    slug: '/convert/jpg-to-png',
  },

  'png-to-jpg': {
    title: 'Convert PNG to JPG',
    description: 'Convert PNG images to JPG to reduce file size.',
    keywords: 'png to jpg, convert png to jpg, png to jpeg online, reduce png size',
    h1: 'PNG to JPG Converter',
    p: (
      <>
        Turn your PNG images into smaller JPG files easily.
        Want to compress PNG instead?{' '}
        <Link to="/compress/png" className="text-blue-600 underline">
          Compress PNG images
        </Link>
        .
      </>
    ),
    slug: '/convert/png-to-jpg',
  },

  'png-to-webp': {
    title: 'Convert PNG to WebP',
    description: 'Convert PNG images to WebP for superior compression.',
    keywords: 'png to webp, convert png to webp, webp converter, next-gen image format',
    h1: 'PNG to WebP Converter',
    p: (
      <>
        Convert your PNG files to next-gen WebP format for better performance.
        Want WebP compression instead?{' '}
        <Link to="/compress/webp" className="text-blue-600 underline">
          Compress WebP images
        </Link>
        .
      </>
    ),
    slug: '/convert/png-to-webp',
  },

  'webp-to-jpg': {
    title: 'Convert WebP to JPG',
    description: 'Convert WebP images to JPG for maximum compatibility.',
    keywords: 'webp to jpg, convert webp to jpg online, webp converter',
    h1: 'WebP to JPG Converter',
    p: (
      <>
        Easily convert your WebP images to widely supported JPG format.
        Need to compress JPG afterwards?{' '}
        <Link to="/compress/jpg" className="text-blue-600 underline">
          Compress JPG here
        </Link>
        .
      </>
    ),
    slug: '/convert/webp-to-jpg',
  },

  'heic-to-jpg': {
    title: 'Convert HEIC to JPG',
    description: 'Convert HEIC photos from iPhone to JPG.',
    keywords: 'heic to jpg, convert heic to jpg online, iphone photo converter',
    h1: 'HEIC to JPG Converter',
    p: (
      <>
        Convert your iPhone HEIC images into standard JPG files.
        Want to compress JPG after converting?{' '}
        <Link to="/compress/jpg" className="text-blue-600 underline">
          Compress JPG here
        </Link>
        .
      </>
    ),
    slug: '/convert/heic-to-jpg',
  },

  'heic-to-png': {
    title: 'Convert HEIC to PNG',
    description: 'Convert HEIC files to PNG for maximum quality.',
    keywords: 'heic to png, convert heic to png online, heic converter',
    h1: 'HEIC to PNG Converter',
    p: (
      <>
        Convert your HEIC images into high-quality PNG files instantly.
        Want to reduce PNG size?{' '}
        <Link to="/compress/png" className="text-blue-600 underline">
          Compress PNG images
        </Link>
        .
      </>
    ),
    slug: '/convert/heic-to-png',
  },
};

const conversionLabels = {
  convert: 'images',
  'jpg-to-png': 'JPG to PNG',
  'png-to-jpg': 'PNG to JPG',
  'png-to-webp': 'PNG to WebP',
  'webp-to-jpg': 'WebP to JPG',
  'heic-to-jpg': 'HEIC to JPG',
  'heic-to-png': 'HEIC to PNG',
};

const ExtraContent = ({ tool }) => {
  const label = conversionLabels[tool] || 'images';

  return (
    <section className="max-w-4xl mx-auto mt-16 text-left text-gray-800 space-y-10">
      {/* What is conversion */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">What is image format conversion?</h2>
        <p className="leading-relaxed text-gray-700">
          Image format conversion changes a file from one type (like JPG) into another (like PNG or
          WebP). Each format has different strengths — some keep more detail, others create much
          smaller file sizes. BearCompress helps you switch formats quickly while keeping your
          images clear and easy to share.
        </p>
      </div>

      {/* When useful */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">
          When should you convert {label}?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>When a website or app only accepts a specific file type.</li>
          <li>When you want smaller files (for example, converting PNG to JPG or WebP).</li>
          <li>When you need better quality with transparency (JPG to PNG).</li>
          <li>When you&apos;re converting HEIC photos from an iPhone to a more compatible format.</li>
        </ul>
      </div>

      {/* How it works */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">How to use the BearCompress converter</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            Click <span className="font-semibold">“Select Images”</span> or drag &amp; drop your
            files into the upload box.
          </li>
          <li>
            Choose the <span className="font-semibold">output format</span> you want for your
            images.
          </li>
          <li>
            BearCompress converts your files directly in the browser — no account, no watermark.
          </li>
          <li>Download the converted images individually or as a batch.</li>
        </ol>
      </div>

      {/* Tips */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">Tips for better conversions</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Use JPG for photos where smaller size matters more than perfect detail.</li>
          <li>Use PNG when you need transparency or sharp graphics like logos and UI elements.</li>
          <li>Use WebP for modern websites that care about both quality and speed.</li>
          <li>Keep an original copy of important images before converting, just in case.</li>
        </ul>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">
              Are my images safe when I convert them?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              BearCompress is designed to process files directly in your browser whenever possible.
              Your images are not shared publicly, and we don&apos;t add watermarks or require a
              login to use the converter.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">
              Will converting my images reduce their quality?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Quality can change depending on the source and target formats. For example, converting
              from a compressed JPG to another JPG won&apos;t improve quality, but converting PNG to
              JPG can slightly reduce detail in exchange for much smaller file sizes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">
              Can I convert multiple images at the same time?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Yes, you can upload and convert multiple images in one batch. For the smoothest
              experience, avoid dropping thousands of files at once and split them into smaller
              groups instead.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">
              Which formats does BearCompress support?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              The converter works with JPG, PNG, WebP, and HEIC. You can choose the combination that
              fits your workflow best — for example JPG → PNG, PNG → WebP, HEIC → JPG, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===================================
   기술 설명 섹션 (TechnicalDeepSection)
=================================== */
const TechnicalDeepSection = () => (
  <section className="max-w-4xl mx-auto mt-20 text-gray-800 space-y-10">
    <div>
      <h2 className="text-2xl font-semibold mb-3">이미지 변환 알고리즘 기술 설명</h2>
      <p className="leading-relaxed text-gray-700">
        이미지 형식 변환은 기본적으로 기존 이미지를 다른 포맷으로 변환하는 과정입니다. JPG, PNG, WebP,
        HEIC 등 각 이미지 포맷은 고유한 압축 방식과 장단점을 가지고 있습니다. BearCompress는 각 포맷의
        특성에 맞는 변환을 제공하여 최적의 품질을 유지하면서도 빠른 변환을 지원합니다.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-2">JPG → PNG</h3>
      <p className="text-gray-700 leading-relaxed">
        JPG에서 PNG로 변환 시, 손실 압축을 피하고 투명도를 지원할 수 있는 PNG 포맷으로 바꿀 수 있습니다.
        PNG는 무손실 압축을 지원하여, 파일 용량은 커지지만 디테일을 그대로 유지할 수 있습니다.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-2">PNG → JPG</h3>
      <p className="text-gray-700 leading-relaxed">
        PNG를 JPG로 변환하면 압축률이 증가하지만, 투명도는 손실되며 일부 디테일이 사라질 수 있습니다. 
        이는 JPG의 손실 압축 방식 때문입니다.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-2">PNG → WebP</h3>
      <p className="text-gray-700 leading-relaxed">
        WebP는 PNG보다 더 나은 압축 효율을 자랑하며, 투명도도 지원합니다. 또한, WebP는 웹에서 로딩 속도를
        개선할 수 있어 웹 사이트 최적화에 유리합니다.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-2">HEIC → JPG</h3>
      <p className="text-gray-700 leading-relaxed">
        HEIC 파일은 최신 iPhone에서 생성되는 포맷으로, HEVC 압축을 사용하여 더 작은 파일 크기를 자랑합니다.
        JPG로 변환하면 호환성이 높아지지만, 일부 압축 손실이 있을 수 있습니다.
      </p>
    </div>

  </section>
);

const ConvertPage = ({ tool = 'convert' }) => {
  const details = toolDetails[tool];
  const location = useLocation();
  const initialFiles = location.state?.initialFiles || null;
  const canonicalUrl = `https://bearcompress.com${details.slug}`;

  return (
    <>
      <Helmet>
        <title>{details.title} | BearCompress</title>
        <meta name="description" content={details.description} />
        <meta name="keywords" content={details.keywords} />

        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />

        {/* OpenGraph SEO */}
        <meta property="og:title" content={`${details.title} | BearCompress`} />
        <meta property="og:description" content={details.description} />

        {/* Optional extra SEO */}
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />

        <meta property="og:image" content="https://bearcompress.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            url: canonicalUrl,
            name: `${details.title} | BearCompress`,
            description: details.description,
          })}
        </script>
      </Helmet>

      <img
        src="/og-image.png"
        alt={`${details.title} - BearCompress`}
        className="hidden"
      />

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          {details.h1}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{details.p}</p>
      </div>

      <ConvertImages initialFiles={initialFiles} />

      <ExtraContent tool={tool} />
      <TechnicalDeepSection />
    </>
  );
};

export default ConvertPage;
