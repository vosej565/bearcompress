import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isKorean = location.pathname.startsWith('/ko');
  const base = isKorean ? '/ko' : '';

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start text-center sm:text-left">

          {/* Left: copyright + description */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              © 2025 BearCompress. All Rights Reserved.
            </p>

            {/* 🔹 브랜드 설명 + 내부 링크 (중요 포인트) */}
            <p className="text-xs text-gray-500 max-w-md leading-relaxed">
              <Link
                to="/"
                className="hover:underline text-gray-600 font-medium"
              >
                BearCompress
              </Link>{' '}
              is a free online image compressor, converter, and resizer.
              Optimize images directly in your browser.
            </p>
          </div>

          {/* Right: navigation */}
          <nav className="flex gap-4 justify-center sm:justify-end text-sm text-gray-600">
            <Link
              to={`${base}/contact`}
              className="hover:text-blue-600 transition-colors"
            >
              {isKorean ? '문의하기' : 'Contact'}
            </Link>
            <Link
              to={`${base}/legal`}
              className="hover:text-blue-600 transition-colors"
            >
              {isKorean ? '약관 및 개인정보 처리방침' : 'Terms & Privacy'}
            </Link>
          </nav>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
