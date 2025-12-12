import React from 'react';
import { Helmet } from 'react-helmet';

const Legal = () => {
  const url = "https://bearcompress.com/legal";
  const ogImage = "https://bearcompress.com/og-image.png";

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">

      <Helmet>
        {/* Basic */}
        <title>Terms & Privacy - BearCompress</title>
        <meta
          name="description"
          content="Read the Terms of Service and Privacy Policy for BearCompress. Learn how your data is handled and how our free image compression and conversion tools operate."
        />
        <meta name="robots" content="noindex, follow" />

        {/* Canonical */}
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:title" content="Terms & Privacy - BearCompress" />
        <meta
          property="og:description"
          content="Official Terms of Service and Privacy Policy for BearCompress. Learn how we protect your privacy and handle data."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms & Privacy - BearCompress" />
        <meta
          name="twitter:description"
          content="Official Terms of Service and Privacy Policy for BearCompress."
        />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Terms of Service & Privacy Policy
      </h1>

      {/* TERMS OF SERVICE */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Terms of Service</h2>

        <p className="mb-4 text-gray-600 leading-relaxed">
          Welcome to BearCompress! These Terms of Service (“Terms”) apply to your use of
          our free online tools for image compression (JPG, PNG, WebP, HEIC) and image
          conversion (e.g., HEIC to JPG). By accessing or using the Service, you agree to
          be bound by these Terms.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">1. Use of the Service</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          BearCompress provides free tools for optimizing and converting images. You agree
          to use the Service only for lawful purposes and in a manner that does not harm,
          disrupt, or overload the Service. The Service is available for personal and
          commercial use as long as it complies with applicable laws.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">
          2. User Content & Client-Side Processing
        </h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          All file processing—including compression, conversion, and resizing—occurs
          entirely on your device within your browser. We do not upload, collect, store, or
          access your files in any way. This ensures complete privacy and full control over
          your data.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">3. Prohibited Activities</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-4 leading-relaxed">
          <li>Uploading or processing illegal or infringing content</li>
          <li>Attempting to hack, disrupt, or overload the Service</li>
          <li>Reverse engineering or modifying the Service</li>
          <li>Automating excessive high-volume requests (e.g., bots, scripts)</li>
          <li>Using the Service in violation of applicable laws</li>
        </ul>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">4. Intellectual Property</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          All trademarks, logos, text, and visual elements on BearCompress are the
          intellectual property of BearCompress. You may not copy, redistribute, or reuse
          any part of the website’s content without permission.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">5. Service Changes</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          We may update, modify, or discontinue any part of the Service at any time without
          notice. We are not responsible for data loss or impact on your device resulting
          from such changes.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">
          6. Disclaimer of Warranties
        </h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          The Service is provided “AS IS” without any warranties. We do not guarantee that
          the Service will be error-free, uninterrupted, or meet your specific needs. You
          use the Service at your own risk.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">
          7. Limitation of Liability
        </h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          To the fullest extent permitted by law, BearCompress is not liable for any
          damages, including loss of data, business interruption, or indirect or
          consequential damages. Since all file processing happens on your device, you are
          solely responsible for the results generated.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">8. Governing Law</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          These Terms are governed by the laws of the Republic of Korea. Any disputes will
          be resolved exclusively in the courts of Seoul, Korea.
        </p>
      </section>

      {/* PRIVACY POLICY */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Privacy Policy</h2>

        <p className="mb-4 text-gray-600 leading-relaxed">
          Your privacy is extremely important to us. This Privacy Policy explains what
          information we collect and how it is used when you visit BearCompress.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">
          1. What We Collect
        </h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          We collect basic technical information such as browser type, language settings,
          device type, and anonymous usage statistics. This helps us improve website
          performance and ensure our tools function properly.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">
          2. No File Upload or Storage
        </h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          BearCompress does not upload, store, or view your images or files. All processing
          happens locally within your browser using client-side technology. Your files never
          leave your device.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">
          3. Cookies & Third-Party Services
        </h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          We use cookies to enhance performance and provide usage analytics. We also use
          Google AdSense to support our free services. Google and its partners may use
          cookies or device identifiers to personalize ads, measure performance, and prevent
          fraud. Users can manage or opt out of personalized advertising through their Google
          account settings.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">4. Data Security</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          Because all file processing happens locally on your device, your files are never
          transmitted to any server. This eliminates server-side risks and provides strong
          protection for your data.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">5. Contact</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          If you have questions about our Terms or Privacy Policy, contact us at:
          contact@bearcompress.com
        </p>
      </section>
    </div>
  );
};

export default Legal;
