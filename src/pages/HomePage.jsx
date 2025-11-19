import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Image, Repeat, Upload } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const [pendingFiles, setPendingFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList || []);
    if (!arr.length) return;
    setPendingFiles(arr);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e) => {
    handleFiles(e.target.files);
    e.target.value = '';
  };

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const goToCompress = () => {
    if (!pendingFiles.length) return;
    navigate('/compress', { state: { initialFiles: pendingFiles } });
  };

  const goToConvert = () => {
    if (!pendingFiles.length) return;
    navigate('/convert', { state: { initialFiles: pendingFiles } });
  };

  const resetFiles = () => setPendingFiles([]);

  return (
    <>
      <Helmet>
				<title>Free Online Image Compressor & Converter | BearCompress</title>

        <meta
          name="description"
          content="The ultimate online tools to compress and convert images for free. Optimize JPG, PNG, WebP, and HEIC files quickly and securely right in your browser."
        />

        <meta
          name="keywords"
          content="image compressor, image converter, compress jpg, compress png, webp compressor, heic converter, online image tools"
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://bearcompress.com/" />

        <meta
          property="og:title"
          content="Free Online Image Compressor & Converter | BearCompress"
        />
        <meta
          property="og:description"
          content="Free and secure image tools to compress and convert JPG, PNG, WebP, and HEIC images instantly."
        />
		<meta property="og:type" content="website" />
        <meta property="og:url" content="https://bearcompress.com/" />
        <meta property="og:image" content="https://bearcompress.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Free Online Image Compressor & Converter | BearCompress"
        />
        <meta
          name="twitter:description"
          content="Free and secure image tools to compress and convert images instantly."
        />
        <meta name="twitter:image" content="https://bearcompress.com/og-image.jpg" />

        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://bearcompress.com/",
        "name": "BearCompress",
        "description": "Free online image compressor and converter for JPG, PNG, WebP, and HEIC.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://bearcompress.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    `}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is image compression?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Image compression is the process of reducing the file size of an image to load faster and save storage."
                }
              },
              {
                "@type": "Question",
                "name": "How do I convert HEIC to JPG?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Upload your HEIC image and choose JPG as the output format. Everything is done securely in your browser."
                }
              },
              {
                "@type": "Question",
                "name": "Is BearCompress safe?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Compression and conversion happen locally in your browser and no files are uploaded to any server."
                }
              }
            ]
          })}
        </script>
      </Helmet>

		 <img
     	 src="/og-image.jpg"
     	 alt="BearCompress - Image Tools"
     	 className="hidden"
    	/>

      <section className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Free Online Image Compressor & Converter
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          The ultimate image toolkit – compress and convert JPG, PNG, WebP, and HEIC in your browser.
        </p>

        {/* 통합 드롭존 */}
        <div
          className={`w-full max-w-3xl mx-auto p-8 md:p-10 border-2 border-dashed rounded-3xl shadow-sm bg-gray-50 transition ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!pendingFiles.length ? (
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                Drop Images Here
              </h3>
              <p className="text-gray-500 mb-6">or</p>

              <Button
                onClick={handleSelectClick}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl h-12 px-8"
              >
                Select Images
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                onChange={handleFileInput}
                className="hidden"
              />

              <p className="mt-4 text-sm text-gray-500">
                Supports JPG, PNG, WebP &amp; HEIC
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-gray-700 font-medium">
                {pendingFiles.length} image
                {pendingFiles.length > 1 ? 's' : ''} ready to process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={goToCompress}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  Compress Images
                </Button>
                <Button onClick={goToConvert} variant="outline" className="px-6">
                  Convert Images
                </Button>
              </div>
              <button
                type="button"
                onClick={resetFiles}
                className="text-xs text-gray-400 underline mt-2"
              >
                Clear selection
              </button>
            </div>
          )}
        </div>

        {/* 기존 바로가기 버튼 유지 (원하면 삭제해도 됨) */}
        <p className="text-sm text-gray-500 mt-6 mb-3">
          Or go directly to each tool:
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg h-14 px-8 w-full sm:w-auto rounded-xl"
          >
            <Link to="/compress">
              <Image className="mr-2 h-5 w-5" /> Compress Image
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-lg h-14 px-8 w-full sm:w-auto rounded-xl"
          >
            <Link to="/convert">
              <Repeat className="mr-2 h-5 w-5" /> Convert Image
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ToolCard
            icon={<Image className="h-8 w-8 text-blue-600" />}
            title="Compress Image"
            description="Reduce the file size of your JPG, PNG, WebP, and HEIC images with the best quality and compression. Make your website faster and save bandwidth."
            link="/compress"
            linkText="Go to Compressor"
          />
          <ToolCard
            icon={<Repeat className="h-8 w-8 text-blue-600" />}
            title="Convert Image"
            description="Easily convert images to and from JPG, PNG, and WebP. Convert modern formats like HEIC to JPG or PNG for maximum compatibility."
            link="/convert"
            linkText="Go to Converter"
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 bg-slate-50 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-6">
          <details className="p-4 border rounded-lg bg-white shadow-sm">
            <summary className="font-semibold text-lg cursor-pointer text-gray-700">
              What is image compression?
            </summary>
            <p className="mt-3 text-gray-600">
              Image compression is the process of reducing the file size of an image. This is
              useful for making websites load faster and for saving storage space. Our tool
              lets you compress JPG, PNG, and WebP files for free.
            </p>
          </details>
          <details className="p-4 border rounded-lg bg-white shadow-sm">
            <summary className="font-semibold text-lg cursor-pointer text-gray-700">
              How do I convert HEIC to JPG?
            </summary>
            <p className="mt-3 text-gray-600">
              You can convert HEIC to JPG by using our free &apos;Convert Images&apos; tool.
              Simply upload your HEIC file, select JPG as the output format, and click
              convert. The file will be processed in your browser and ready to download
              instantly.
            </p>
          </details>
          <details className="p-4 border rounded-lg bg-white shadow-sm">
            <summary className="font-semibold text-lg cursor-pointer text-gray-700">
              Is it safe to use these free tools?
            </summary>
            <p className="mt-3 text-gray-600">
              Absolutely. Your privacy is our top priority. All compression and conversion
              tasks are performed directly in your web browser. Your files are never uploaded
              to our servers, ensuring your data remains 100% private and secure.
            </p>
          </details>
        </div>
      </section>
      <section className="mt-20">
  <h2 className="text-3xl font-bold text-center">
    Why creators choose BearCompress
  </h2>
  <p className="text-gray-600 text-center mt-3">
    Built for speed, clarity, and a smoother workflow.
  </p>

  <div className="grid md:grid-cols-3 gap-6 mt-12">

    <div className="p-6 rounded-xl shadow-md bg-white">
      <h3 className="text-xl font-semibold">⚡ Fast & Efficient</h3>
      <p className="mt-2 text-gray-700">
        Compress and convert images instantly with an engine optimized for real-time performance.
      </p>
    </div>

    <div className="p-6 rounded-xl shadow-md bg-white">
      <h3 className="text-xl font-semibold">🎨 Quality Preserved</h3>
      <p className="mt-2 text-gray-700">
        Smart compression keeps important details clear and sharp—perfect for web, blog, and design work.
      </p>
    </div>

    <div className="p-6 rounded-xl shadow-md bg-white">
      <h3 className="text-xl font-semibold">🛡 Privacy First</h3>
      <p className="mt-2 text-gray-700">
        All processing happens in your browser. No uploads, no storage, no tracking.
      </p>
    </div>

  </div>

  <div className="grid md:grid-cols-3 gap-6 mt-6">

    <div className="p-6 rounded-xl shadow-md bg-white">
      <h3 className="text-xl font-semibold">🌍 Designed for Everyone</h3>
      <p className="mt-2 text-gray-700">
        Whether you're a blogger, designer, student, or marketer—BearCompress helps simplify your workflow.
      </p>
    </div>

    <div className="p-6 rounded-xl shadow-md bg-white">
      <h3 className="text-xl font-semibold">💻 No Installation Needed</h3>
      <p className="mt-2 text-gray-700">
        Runs directly in your browser. No apps, no sign-ups, no heavy tools.
      </p>
    </div>

    <div className="p-6 rounded-xl shadow-md bg-white">
      <h3 className="text-xl font-semibold">🔒 Secure by Design</h3>
      <p className="mt-2 text-gray-700">
        Your files never leave your device. A safe and reliable tool you can trust every day.
      </p>
    </div>

  </div>
</section>

    </>
  );
};

const ToolCard = ({ icon, title, description, link, linkText }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-4 mb-4">
      {icon}
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 mb-6">{description}</p>
    <Button asChild variant="link" className="p-0 h-auto text-blue-600 font-semibold">
      <Link to={link}>
        {linkText} <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  </div>
);

export default HomePage;
