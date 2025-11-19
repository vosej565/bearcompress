import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import CompressImages from '@/components/CompressImages';
import { Link } from "react-router-dom";


const toolDetails = {
  'compress': {
    title: 'Compress Image',
    description: 'Compress JPG, PNG, WebP, and HEIC images with high quality.',
    keywords: 'compress image, image optimizer, reduce image size, jpg compressor, png compressor, webp compressor, heic compressor',
    h1: 'Compress Image',
    p: (
      <>
        Reduce file size of JPG, PNG, WebP, and HEIC images online.
        Want to convert images instead?{" "}
        <Link to="/convert" className="text-blue-600 underline">
          Use our Image Converter
        </Link>.
      </>
    ),
    slug: '/compress'
  },

  'compress-jpg': {
    title: 'Compress JPG',
    description: 'Free online JPG compressor.',
    keywords: 'compress jpg, jpg compressor, reduce jpeg size',
    h1: 'Compress JPG Images',
    p: (
      <>
        Shrink your JPG/JPEG files fast and securely.
        Need to convert JPG to PNG?{" "}
        <Link to="/convert/jpg-to-png" className="text-blue-600 underline">
          Try JPG → PNG converter
        </Link>.
      </>
    ),
    slug: '/compress/jpg'
  },

  'compress-png': {
    title: 'Compress PNG',
    description: 'Smart PNG compressor with transparency support.',
    keywords: 'compress png, png compressor, optimize png',
    h1: 'Compress PNG Images',
    p: (
      <>
        Optimize your PNG files without losing transparency.
        Want to convert PNG to JPG?{" "}
        <Link to="/convert/png-to-jpg" className="text-blue-600 underline">
          Convert PNG → JPG here
        </Link>.
      </>
    ),
    slug: '/compress/png'
  },

  'compress-webp': {
    title: 'Compress WebP',
    description: 'Compress WebP images online.',
    keywords: 'compress webp, webp compressor',
    h1: 'Compress WebP Images',
    p: (
      <>
        Optimize your WebP images for performance.
        Or convert WebP to JPG using{" "}
        <Link to="/convert/webp-to-jpg" className="text-blue-600 underline">
          our WebP → JPG converter
        </Link>.
      </>
    ),
    slug: '/compress/webp'
  },

  'compress-heic': {
    title: 'Compress HEIC',
    description: 'Compress HEIC images online.',
    keywords: 'compress heic, heic compressor',
    h1: 'Compress HEIC Images',
    p: (
      <>
        Reduce the size of your HEIC files safely.
        Need to convert HEIC first?{" "}
        <Link to="/convert/heic-to-jpg" className="text-blue-600 underline">
          Convert HEIC → JPG here
        </Link>.
      </>
    ),
    slug: '/compress/heic'
  },
};



const CompressPage = ({ tool = 'compress' }) => {
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

        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${details.title} | BearCompress`} />
        <meta property="og:description" content={details.description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${details.title} | BearCompress`} />
        <meta name="twitter:description" content={details.description} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD structured data */}
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

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{details.h1}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{details.p}</p>
      </div>

      <CompressImages initialFiles={initialFiles} />
    </>
  );
};

export default CompressPage;
