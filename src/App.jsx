import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { AuthProvider } from '@/contexts/SupabaseAuthContext';

import LanguageRedirector from '@/components/LanguageRedirector';

import HtmlLangUpdater from '@/components/HtmlLangUpdater'; // Import the new component

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import HreflangManager from '@/hooks/useHreflang.jsx';

import HomePage from '@/pages/HomePage';
import CompressPage from '@/pages/CompressPage';
import ConvertPage from '@/pages/ConvertPage';

import KoHomePage from '@/pages/ko/HomePage';
import KoCompressPage from '@/pages/ko/CompressPage';
import KoConvertPage from '@/pages/ko/ConvertPage';

import Legal from '@/components/Legal';
import Contact from '@/components/Contact';

import ResizeImagePage from "@/pages/ResizeImagePage";
import KoResizeImagePage from "@/pages/ko/ResizeImagePage";


// --------------------------------------------------
// APP (자동 언어 감지 없음 — 안정 버전)
// --------------------------------------------------
function App() {
  return (
    <AuthProvider>
      
        <Router>
        <LanguageRedirector />
        <ScrollToTop />
        <HreflangManager />
        <HtmlLangUpdater /> {/* Use the new component */}

        <div className="min-h-screen flex flex-col bg-white">
          <Header />

          <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
            <Routes>

              {/* ---------------- English Pages ---------------- */}
              <Route path="/" element={<HomePage />} />

              {/* Compression (EN) */}
              <Route path="/compress" element={<CompressPage tool="compress" />} />
              <Route path="/compress/jpg" element={<CompressPage tool="compress-jpg" />} />
              <Route path="/compress/png" element={<CompressPage tool="compress-png" />} />
              <Route path="/compress/webp" element={<CompressPage tool="compress-webp" />} />
              <Route path="/compress/heic" element={<CompressPage tool="compress-heic" />} />
              {/*<Route path="/compress/pdf" element={<CompressPage tool="compress-pdf" />} />*/}


              {/* Conversion (EN) */}
              <Route path="/convert" element={<ConvertPage tool="convert" />} />
              <Route path="/convert/jpg-to-png" element={<ConvertPage tool="jpg-to-png" />} />
              <Route path="/convert/png-to-jpg" element={<ConvertPage tool="png-to-jpg" />} />
              <Route path="/convert/png-to-webp" element={<ConvertPage tool="png-to-webp" />} />
              <Route path="/convert/webp-to-jpg" element={<ConvertPage tool="webp-to-jpg" />} />
              <Route path="/convert/heic-to-jpg" element={<ConvertPage tool="heic-to-jpg" />} />
              <Route path="/convert/heic-to-png" element={<ConvertPage tool="heic-to-png" />} />

              {/* Image Resizer */}
              <Route path="/resize-image" element={<ResizeImagePage />} />
              <Route path="/ko/resize-image" element={<KoResizeImagePage />} />

              {/* Other */}
              <Route path="/legal" element={<Legal />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ko/contact" element={<Contact />} />
              <Route path="/ko/legal" element={<Legal />} />

              {/* ---------------- Korean Pages ---------------- */}
              <Route path="/ko" element={<KoHomePage />} />

              {/* Compression (KO) */}
              <Route path="/ko/compress" element={<KoCompressPage tool="compress" />} />
              <Route path="/ko/compress/jpg" element={<KoCompressPage tool="compress-jpg" />} />
              <Route path="/ko/compress/png" element={<KoCompressPage tool="compress-png" />} />
              <Route path="/ko/compress/webp" element={<KoCompressPage tool="compress-webp" />} />
              <Route path="/ko/compress/heic" element={<KoCompressPage tool="compress-heic" />} />
              {/*<Route path="/ko/compress/pdf" element={<KoCompressPage tool="compress-pdf" />} />*/}


              {/* Conversion (KO) */}
              <Route path="/ko/convert" element={<KoConvertPage tool="convert" />} />
              <Route path="/ko/convert/jpg-to-png" element={<KoConvertPage tool="jpg-to-png" />} />
              <Route path="/ko/convert/png-to-jpg" element={<KoConvertPage tool="png-to-jpg" />} />
              <Route path="/ko/convert/png-to-webp" element={<KoConvertPage tool="png-to-webp" />} />
              <Route path="/ko/convert/webp-to-jpg" element={<KoConvertPage tool="webp-to-jpg" />} />
              <Route path="/ko/convert/heic-to-jpg" element={<KoConvertPage tool="heic-to-jpg" />} />
              <Route path="/ko/convert/heic-to-png" element={<KoConvertPage tool="heic-to-png" />} />

            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
