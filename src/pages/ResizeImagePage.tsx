import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ImageResizer from "../components/ImageResizer";

const ResizeImagePage = () => {
  const title = "Resize Image";
  const description =
    "Resize JPG, PNG, WebP, and HEIC images instantly online without losing quality.";
  const keywords =
    "resize image, image resizer, resize jpg, resize png, resize webp, resize heic, online image resizer, image tools";
  const url = "https://bearcompress.com/resize-image";
  const ogImage = "https://bearcompress.com/og-image.jpg";

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

      {/* Main tool */}
      <ImageResizer lang="en" />

      {/* Extra SEO / content section */}
      <section className="max-w-4xl mx-auto mt-16 text-left text-gray-800 space-y-10">
        {/* What is resizing */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">What is image resizing?</h2>
          <p className="leading-relaxed text-gray-700">
            Image resizing changes the width and height of a picture so it fits better on
            websites, social media, or documents. With the right settings, you can resize an
            image while keeping it sharp and clear. BearCompress helps you adjust dimensions in
            just a few clicks without installing any software.
          </p>
        </div>

        {/* When useful */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">
            When should you resize an image?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>When a website or platform recommends specific image sizes.</li>
            <li>When large photos are slowing down your blog or landing page.</li>
            <li>When you need perfectly sized images for thumbnails, banners, or profile photos.</li>
            <li>When you want to prepare images for presentations or documents.</li>
          </ul>
        </div>

        {/* How it works */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">
            How to resize images with BearCompress
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              Click <span className="font-semibold">“Select Images”</span> in the tool above, or
              drag &amp; drop your files into the upload area.
            </li>
            <li>
              Choose your target dimensions — set a specific width and height, or resize by
              percentage.
            </li>
            <li>
              Decide whether to keep the original aspect ratio so your image doesn&apos;t look
              stretched.
            </li>
            <li>Apply the changes and download your resized images in seconds.</li>
          </ol>
        </div>

        {/* Tips */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">
            Tips for better image resizing
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              For websites, try using smaller widths (like 1200px or less) to improve loading
              speed.
            </li>
            <li>
              Always keep the aspect ratio locked when you&apos;re unsure — it prevents images
              from looking squashed.
            </li>
            <li>
              Avoid enlarging tiny images too much; it can make them look blurry or pixelated.
            </li>
            <li>
              Combine resizing with compression using the Image Compressor for even lighter files.
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">
                Does resizing an image affect its quality?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Resizing down (making an image smaller) usually keeps it looking sharp, especially
                when done carefully. Enlarging an image too much can reduce quality, which is why
                we recommend starting with the highest resolution version you have.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-1">
                Can I resize multiple images at once?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Yes. You can upload and resize several images in a single session. For the best
                performance, we recommend working with reasonable batches instead of thousands of
                files at the same time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-1">
                Will my images be safe when using BearCompress?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                BearCompress is designed to process your files securely and does not add
                watermarks or require an account. Your images are not made public, and we don&apos;t
                use them for any other purpose.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-1">
                Which formats can I resize?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The resizer supports JPG, PNG, WebP, and HEIC images. You can resize them here and,
                if needed, switch formats using the Image Converter or reduce file size further with
                the Image Compressor.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResizeImagePage;
