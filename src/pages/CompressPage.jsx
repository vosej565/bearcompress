import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, Link } from 'react-router-dom';
import CompressImages from '@/components/CompressImages';
import CompressPdf from '../components/CompressPdf';

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

  // PDF는 그대로 제외
  // 'compress-pdf': { ... }
};

// 포맷 이름(문장에 넣어서 쓸 label)
const formatLabels = {
  compress: 'images',
  'compress-jpg': 'JPG/JPEG images',
  'compress-png': 'PNG images',
  'compress-webp': 'WebP images',
  'compress-heic': 'HEIC images',
};

const ExtraContent = ({ tool }) => {
  const label = formatLabels[tool] || 'images';

  return (
    <section className="max-w-4xl mx-auto mt-16 text-left text-gray-800 space-y-10">
      {/* 설명 */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">What is image compression?</h2>
        <p className="leading-relaxed text-gray-700">
          When you compress a digital image, you reduce its file size by removing or rewriting some of
          the data. This makes files lighter and faster to share while keeping them visually clear.
          BearCompress uses smart compression so you get a great balance between file size and image quality.
        </p>
      </div>

      {/* 언제 유용한지 */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">
          When should you compress {label}?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>When you need to upload images to blogs, portfolios, or social media quickly.</li>
          <li>When large photos are slowing down your website or landing pages.</li>
          <li>When you want to save storage on your laptop, phone, or cloud drives.</li>
          <li>When you need to email images but keep them under the attachment size limit.</li>
        </ul>
      </div>

      {/* How it works */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">How BearCompress works</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Click <span className="font-semibold">“Select Images”</span> or drag &amp; drop your files into the box.</li>
          <li>Choose your preferred compression level (Balanced, High quality, or Smaller size).</li>
          <li>We process everything directly in your browser — no sign-up and no watermark.</li>
          <li>Preview the results and download the optimized images with a single click.</li>
        </ol>
      </div>

      {/* Tips */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">Tips for the best results</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Start with the Balanced preset, then switch to Stronger compression only if you need smaller files.</li>
          <li>For photos with lots of detail, keep quality a bit higher to avoid visible artifacts.</li>
          <li>For thumbnails or small UI icons, you can safely use stronger compression.</li>
          <li>Keep an original copy of important images in case you want to re-compress them differently later.</li>
        </ul>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">
              Are my images safe when I use BearCompress?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Yes. BearCompress is designed to run directly in your browser. Your files stay on your
              device and are not stored on our servers, so you remain in full control of your images.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">
              Does compression reduce image quality?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Any lossy compression can affect quality, but our engine focuses on keeping images
              clear and sharp. In most cases you&apos;ll get a much smaller file with no noticeable
              difference to the naked eye.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">
              Is there a limit to how many files I can compress?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              You can use the tool as often as you like. For the smoothest experience, we recommend
              compressing batches of images instead of thousands of files at once.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">
              Which formats does BearCompress support?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              BearCompress works with JPG, PNG, WebP, and HEIC on this page. If you need to convert
              between formats, you can switch to the Image Converter from the navigation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

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
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          {details.h1}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{details.p}</p>
      </div>

      {/* 메인 툴 영역 */}
      {tool === 'compress-pdf' ? (
        <CompressPdf />
      ) : (
        <CompressImages initialFiles={initialFiles} />
      )}

      {/* PDF 말고 이미지 툴에서만 설명/FAQ 노출 */}
      {tool !== 'compress-pdf' && <ExtraContent tool={tool} />}
    </>
  );
};

export default CompressPage;
