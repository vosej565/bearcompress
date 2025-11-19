import React from 'react';
import { Helmet } from 'react-helmet';

const Legal = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Helmet>
        <title>Terms & Privacy - BearCompress</title>
        <meta
          name="description"
          content="Read the Terms of Service and Privacy Policy for BearCompress. Learn how your data is handled and how our free compress and convert tools operate."
        />
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Terms of Service & Privacy Policy
      </h1>

      {/* TERMS OF SERVICE */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Terms of Service</h2>

        <p className="mb-4 text-gray-600 leading-relaxed">
          Welcome to BearCompress! These Terms of Service (“Terms”) apply to your use of our
          free online tools for image compression (JPG, PNG, WebP, HEIC) and image conversion
          (e.g., HEIC to JPG). By accessing or using the Service, you agree to be bound by these Terms.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">1. Use of the Service</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          BearCompress provides free tools for image optimization and conversion. You agree to
          use our Service only for lawful purposes and in a manner that does not harm or disrupt
          the Service or other users. The Service is available for personal and commercial use,
          provided it does not violate any applicable laws or infringe on any rights.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">2. User Content & Client-Side Processing</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          All file processing (compression and conversion) occurs entirely on your device,
          within your web browser. We do not upload, collect, store, or view your images or files.
          This ensures complete privacy and full control over your data.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">3. Prohibited Activities</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          You agree not to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4 leading-relaxed">
          <li>upload or process files that are illegal or infringe on third-party rights</li>
          <li>attempt to hack, disrupt, or overload the Service</li>
          <li>reverse engineer, modify, or interfere with the Service</li>
          <li>automate high-volume requests (e.g., bots, scripts) that may cause excessive load</li>
          <li>use the Service in violation of any laws or regulations</li>
        </ul>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">4. Intellectual Property</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          All trademarks, logos, text, design, and visual elements on BearCompress are the
          intellectual property of BearCompress. You may not copy, redistribute, or otherwise
          reuse any part of the website’s content without permission.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">5. Service Changes</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          We may modify, suspend, or discontinue any part of the Service at any time without notice.
          We are not liable for any resulting disruption or data loss on your device.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">6. Disclaimer of Warranties</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          The Service is provided “AS IS” without warranties of any kind. We do not guarantee that
          the Service will be error-free, uninterrupted, or suitable for any specific purpose.
          You use the Service at your own risk.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">7. Limitation of Liability</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          To the maximum extent permitted by law, BearCompress is not liable for any damages,
          including loss of data, business interruption, indirect or consequential damages, or
          issues arising from your use of the Service. Since processing happens on your device,
          you are fully responsible for any outcomes generated from the tool.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">8. Governing Law</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          These Terms will be governed by the laws of the Republic of Korea. Any disputes shall be
          resolved exclusively in the courts of Seoul, Korea.
        </p>
      </section>

      {/* PRIVACY POLICY */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Privacy Policy</h2>

        <p className="mb-4 text-gray-600 leading-relaxed">
          Your privacy is extremely important to us. This Privacy Policy explains what data we collect
          and how it is used when you visit BearCompress.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">1. What We Collect</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          We collect basic technical information such as browser type, language settings, device type,
          and anonymous usage statistics. This helps us improve the website and ensure that our free
          compression and conversion tools function properly.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">2. No File Upload or Storage</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          BearCompress does not upload or store any of your images or files. All processing happens locally
          on your device using client-side technology. We never access or transmit your files to any server.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">3. Cookies & Third-Party Services</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          We use cookies to enhance performance and track anonymous usage trends. We also use Google AdSense
          to support our free services. Google may collect data to provide personalized ads. You can manage
          your ad preferences through your Google account settings.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">4. Data Security</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          Because processing happens on your device, your files never leave your browser. This eliminates
          server-side risks and ensures strong protection for your data.
        </p>

        <h3 className="text-2xl font-medium mb-4 text-gray-700">5. Contact</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">
          If you have any questions about our Terms or Privacy Policy, please contact us at:
          contact@bearcompress.com
        </p>
      </section>
    </div>
  );
};

export default Legal;