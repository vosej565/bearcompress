import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, Link } from 'react-router-dom';
import CompressImages from '@/components/CompressImages';
import CompressPdf from '../components/CompressPdf';

/* ---------------------------
   Tool Details
----------------------------*/
const toolDetails = {
  compress: {
    title: 'Compress Image',
    description: 'Compress JPG, PNG, WebP, and HEIC images with high quality.',
    keywords:
      'compress image, image optimizer, reduce image size, jpg compressor, png compressor, webp compressor, heic compressor',
    h1: 'Compress Image',
    p: (
      <>
        Reduce file size of JPG, PNG, WebP, and HEIC images online.
        Want to convert images instead?{' '}
        <Link to="/convert" className="text-blue-600 underline">
          Use our Image Converter
        </Link>
        .
      </>
    ),
    slug: '/compress',
  },

  'compress-jpg': {
    title: 'Compress JPG',
    description: 'Free online JPG compressor.',
    keywords: 'compress jpg, jpg compressor, reduce jpeg size',
    h1: 'Compress JPG Images',
    p: (
      <>
        Shrink your JPG/JPEG files fast and securely.
        Need to convert JPG to PNG?{' '}
        <Link to="/convert/jpg-to-png" className="text-blue-600 underline">
          Try JPG → PNG converter
        </Link>
        .
      </>
    ),
    slug: '/compress/jpg',
  },

  'compress-png': {
    title: 'Compress PNG',
    description: 'Smart PNG compressor with transparency support.',
    keywords: 'compress png, png compressor, optimize png',
    h1: 'Compress PNG Images',
    p: (
      <>
        Optimize your PNG files without losing transparency.
        Want to convert PNG to JPG?{' '}
        <Link to="/convert/png-to-jpg" className="text-blue-600 underline">
          Convert PNG → JPG here
        </Link>
        .
      </>
    ),
    slug: '/compress/png',
  },

  'compress-webp': {
    title: 'Compress WebP',
    description: 'Compress WebP images online.',
    keywords: 'compress webp, webp compressor',
    h1: 'Compress WebP Images',
    p: (
      <>
        Optimize your WebP images for performance.
        Or convert WebP to JPG using{' '}
        <Link to="/convert/webp-to-jpg" className="text-blue-600 underline">
          our WebP → JPG converter
        </Link>
        .
      </>
    ),
    slug: '/compress/webp',
  },

  'compress-heic': {
    title: 'Compress HEIC',
    description: 'Compress HEIC images online.',
    keywords: 'compress heic, heic compressor, reduce heic',
    h1: 'Compress HEIC Images',
    p: (
      <>
        Reduce the size of your HEIC files safely.
        Need to convert HEIC first?{' '}
        <Link to="/convert/heic-to-jpg" className="text-blue-600 underline">
          Convert HEIC → JPG here
        </Link>
        .
      </>
    ),
    slug: '/compress/heic',
  },
};

/* ---------------------------
   Label Mapping
----------------------------*/
const formatLabels = {
  compress: 'images',
  'compress-jpg': 'JPG/JPEG images',
  'compress-png': 'PNG images',
  'compress-webp': 'WebP images',
  'compress-heic': 'HEIC images',
};

/* ---------------------------
   Extra Content
----------------------------*/
const ExtraContent = ({ tool }) => {
  const label = formatLabels[tool] || 'images';

  return (
    <section className="max-w-4xl mx-auto mt-16 text-left text-gray-800 space-y-10">

      <div>
        <h2 className="text-2xl font-semibold mb-3">What is image compression?</h2>
        <p className="leading-relaxed text-gray-700">
          When you compress a digital image, you reduce its file size by removing or rewriting some of
          the data. This makes files lighter and faster to share while keeping them visually clear.
          BearCompress uses smart compression so you get a great balance between file size and image quality.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">When should you compress {label}?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>When you need to upload images to blogs, portfolios, or social media quickly.</li>
          <li>When large photos are slowing down your website or landing pages.</li>
          <li>When you want to save storage on your laptop, phone, or cloud drives.</li>
          <li>When you need to email images but keep them under the attachment size limit.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">How BearCompress works</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Click “Select Images” or drag & drop your files into the box.</li>
          <li>Choose your preferred compression level.</li>
          <li>We process everything directly in your browser — no upload, no tracking.</li>
          <li>Preview and download optimized images instantly.</li>
        </ol>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">Tips for the best results</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Start with the Balanced preset.</li>
          <li>Increase compression only when file size matters more than detail.</li>
          <li>Icons, thumbnails, UI graphics compress extremely well.</li>
          <li>Keep original copies of important images.</li>
        </ul>
      </div>

    </section>
  );
};

/* ---------------------------
   FAQ Section (복원됨)
----------------------------*/
const FAQSection = () => (
  <section className="max-w-4xl mx-auto mt-16 text-left text-gray-800 space-y-10">

    <div>
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions (FAQ)</h2>

      <div className="space-y-4">

        <div>
          <h3 className="font-semibold text-lg mb-1">Are my uploaded images stored on your server?</h3>
          <p className="text-gray-700 leading-relaxed">
            BearCompress runs directly in your browser whenever possible. Your images are not stored  
            on any server once processing is complete.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-1">Does compression lower image quality?</h3>
          <p className="text-gray-700 leading-relaxed">
            Strong compression may affect quality, but our Balanced mode keeps images visually clear  
            while greatly reducing file size.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-1">Is there a limit to how many files I can compress?</h3>
          <p className="text-gray-700 leading-relaxed">
            You can compress multiple files at once. Extremely large batches may depend on your  
            device memory, so splitting them can be more stable.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-1">Which file formats are supported?</h3>
          <p className="text-gray-700 leading-relaxed">
            Supported formats: JPG, PNG, WebP, and HEIC.  
            Need format conversion? Visit our Image Converter tool.
          </p>
        </div>

      </div>
    </div>

  </section>
);

/* ---------------------------
   Technical Section
----------------------------*/
const TechnicalDeepSection = () => (
  <section className="max-w-4xl mx-auto mt-20 text-gray-800 space-y-10">

    <div>
      <h2 className="text-2xl font-semibold mb-3">Technical Breakdown of Image Compression</h2>
      <p className="leading-relaxed text-gray-700">
        Image compression works by reducing redundant or non-essential visual data.
        BearCompress performs everything locally using Canvas 2D, ImageBitmap decoding,
        and optimized encoders for each format — ensuring full privacy.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-2">JPEG Compression (DCT-Based)</h3>
      <p className="text-gray-700">
        JPEG divides images into 8×8 blocks, applies the Discrete Cosine Transform, then quantizes  
        and Huffman-encodes them to reduce file size efficiently.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-2">PNG Compression (Lossless)</h3>
      <p className="text-gray-700">
        PNG uses DEFLATE compression with LZ77 and Huffman coding. Scanline filtering increases  
        compression efficiency without losing quality.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-2">WebP Compression</h3>
      <p className="text-gray-700">
        WebP lossy uses VP8 prediction, while WebP lossless uses color transforms and  
        dictionary-based entropy coding.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-2">HEIC (HEVC-Based)</h3>
      <p className="text-gray-700">
        HEIC relies on HEVC intra-frame compression including prediction, quad-tree partitioning,  
        and CABAC entropy coding. BearCompress decodes HEIC locally before recompressing.
      </p>
    </div>

    <div>
      <h2 className="text-2xl font-semibold mb-3">Local Browser Processing</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Canvas 2D for pixel-level operations</li>
        <li>ImageBitmap for fast decoding</li>
        <li>Blob/File API for file creation</li>
        <li>OffscreenCanvas (if supported) for performance</li>
      </ul>
    </div>

  </section>
);

/* ---------------------------
   CompressPage (최종 완성본)
----------------------------*/
const CompressPage = ({ tool = 'compress' }) => {
  const details = toolDetails[tool];
  const pageUrl = `https://bearcompress.com${details.slug}`;
  const ogImage = 'https://bearcompress.com/og-image.png';

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

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
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

      {tool === 'compress-pdf' ? (
        <CompressPdf />
      ) : (
        <CompressImages initialFiles={initialFiles} />
      )}

      {tool !== 'compress-pdf' && (
        <>
          <ExtraContent tool={tool} />
          <FAQSection />
          <TechnicalDeepSection />
        </>
      )}
    </>
  );
};

export default CompressPage;
