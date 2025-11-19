import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import ConvertImages from '@/components/ConvertImages';
import { Link } from "react-router-dom";


const toolDetails = {
  'convert': {
    title: 'Convert Image',
    description: 'Free online image converter. Convert images to JPG, PNG, WEBP, and HEIC formats instantly and securely.',
    keywords: 'convert image, online image converter, jpg converter, png converter, webp converter, heic converter, free image convert tool',
    h1: 'Convert Image',
    p: (
      <>
        Convert your images to JPG, PNG, WebP, or HEIC instantly.
        Looking to compress instead?{" "}
        <Link to="/compress" className="text-blue-600 underline">
          Try our Image Compressor
        </Link>.
      </>
    ),
    slug: '/convert'
  },

  'jpg-to-png': {
    title: 'Convert JPG to PNG',
    description: 'Convert JPG images to PNG format with high quality.',
    keywords: 'jpg to png, convert jpg to png, jpeg to png online, image converter',
    h1: 'JPG to PNG Converter',
    p: (
      <>
        Convert your JPG images to high-quality PNG files in seconds.
        Need JPG compression first?{" "}
        <Link to="/compress/jpg" className="text-blue-600 underline">
          Compress JPG here
        </Link>.
      </>
    ),
    slug: '/convert/jpg-to-png'
  },

  'png-to-jpg': {
    title: 'Convert PNG to JPG',
    description: 'Convert PNG images to JPG to reduce file size.',
    keywords: 'png to jpg, convert png to jpg, png to jpeg online, reduce png size',
    h1: 'PNG to JPG Converter',
    p: (
      <>
        Turn your PNG images into smaller JPG files easily.
        Want to compress PNG instead?{" "}
        <Link to="/compress/png" className="text-blue-600 underline">
          Compress PNG images
        </Link>.
      </>
    ),
    slug: '/convert/png-to-jpg'
  },

  'png-to-webp': {
    title: 'Convert PNG to WebP',
    description: 'Convert PNG images to WebP for superior compression.',
    keywords: 'png to webp, convert png to webp, webp converter, next-gen image format',
    h1: 'PNG to WebP Converter',
    p: (
      <>
        Convert your PNG files to next-gen WebP format for better performance.
        Want WebP compression instead?{" "}
        <Link to="/compress/webp" className="text-blue-600 underline">
          Compress WebP images
        </Link>.
      </>
    ),
    slug: '/convert/png-to-webp'
  },

  'webp-to-jpg': {
    title: 'Convert WebP to JPG',
    description: 'Convert WebP images to JPG for maximum compatibility.',
    keywords: 'webp to jpg, convert webp to jpg online, webp converter',
    h1: 'WebP to JPG Converter',
    p: (
      <>
        Easily convert your WebP images to widely supported JPG format.
        Need to compress JPG afterwards?{" "}
        <Link to="/compress/jpg" className="text-blue-600 underline">
          Compress JPG here
        </Link>.
      </>
    ),
    slug: '/convert/webp-to-jpg'
  },

  'heic-to-jpg': {
    title: 'Convert HEIC to JPG',
    description: 'Convert HEIC photos from iPhone to JPG.',
    keywords: 'heic to jpg, convert heic to jpg online, iphone photo converter',
    h1: 'HEIC to JPG Converter',
    p: (
      <>
        Convert your iPhone HEIC images into standard JPG files.
        Want to compress JPG after converting?{" "}
        <Link to="/compress/jpg" className="text-blue-600 underline">
          Compress JPG here
        </Link>.
      </>
    ),
    slug: '/convert/heic-to-jpg'
  },

  'heic-to-png': {
    title: 'Convert HEIC to PNG',
    description: 'Convert HEIC files to PNG for maximum quality.',
    keywords: 'heic to png, convert heic to png online, heic converter',
    h1: 'HEIC to PNG Converter',
    p: (
      <>
        Convert your HEIC images into high-quality PNG files instantly.
        Want to reduce PNG size?{" "}
        <Link to="/compress/png" className="text-blue-600 underline">
          Compress PNG images
        </Link>.
      </>
    ),
    slug: '/convert/heic-to-png'
  }
};


const ConvertPage = ({ tool = 'convert' }) => {
  const details = toolDetails[tool];

const location = useLocation();
  const initialFiles = location.state?.initialFiles || null;
  const canonicalUrl = `https://bearcompress.com/convert${tool !== 'convert' ? '/' + tool : ''}`;
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

        <meta property="og:image" content="https://horizons-cdn.hostinger.com/e25b2aee-4883-48af-8ec0-56c5bdb0ffed/e246105e4575a2fdb007988f1a613a34.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: canonicalUrl,
            name: `${details.title} | BearCompress`,
            description: details.description,
          })}
        </script>

      </Helmet>

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{details.h1}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{details.p}</p>
      </div>

      <ConvertImages initialFiles={initialFiles} />
    </>
  );
};

export default ConvertPage;