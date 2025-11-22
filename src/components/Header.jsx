import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Auth from '@/components/Auth';
import LanguageDropdown from '@/components/LanguageDropdown';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const location = useLocation();
  const isKorean = location.pathname.startsWith('/ko');
  const base = isKorean ? '/ko' : '';

  const navLinks = {
    compress: { en: 'COMPRESS IMAGE', ko: '이미지 압축' },
    convert: { en: 'CONVERT IMAGE', ko: '이미지 변환' },
    resize: { en: 'IMAGE RESIZER', ko: '이미지 리사이즈' },
    more: { en: 'MORE', ko: '더보기' },
  };

  const dropdownLinks = {
    imageResizer: { en: 'Image Resizer', ko: '이미지 리사이즈' },
    jpg: { en: 'JPG Compressor', ko: 'JPG 압축' },
    png: { en: 'PNG Compressor', ko: 'PNG 압축' },
    webp: { en: 'WebP Compressor', ko: 'WebP 압축' },
    heic: { en: 'HEIC Compressor', ko: 'HEIC 압축' },
    jpgToPng: { en: 'JPG to PNG', ko: 'JPG → PNG' },
    pngToJpg: { en: 'PNG to JPG', ko: 'PNG → JPG' },
    webpToJpg: { en: 'WebP to JPG', ko: 'WebP → JPG' },
    heicToJpg: { en: 'HEIC to JPG', ko: 'HEIC → JPG' },
  };

  const currentLang = isKorean ? 'ko' : 'en';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 max-w-5xl flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to={base || '/'} className="flex items-center">
            <img
              className="h-40 w-auto"
              alt="BearCompress Logo"
              src="/Logo.png"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-lg font-medium">

            <NavLink to={`${base}/compress`}>
              {navLinks.compress[currentLang]}
            </NavLink>

            <NavLink to={`${base}/convert`}>
              {navLinks.convert[currentLang]}
            </NavLink>

            {/* ⭐ 추가된 IMAGE RESIZER 탭 */}
            <NavLink to={`${base}/resize-image`}>
              {navLinks.resize[currentLang]}
            </NavLink>

            {/* MORE dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                {navLinks.more[currentLang]} 
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent>

                <DropdownMenuItem asChild>
                  <Link to={`${base}/resize-image`}>
                    {dropdownLinks.imageResizer[currentLang]}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to={`${base}/compress/jpg`}>
                    {dropdownLinks.jpg[currentLang]}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to={`${base}/compress/png`}>
                    {dropdownLinks.png[currentLang]}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to={`${base}/compress/webp`}>
                    {dropdownLinks.webp[currentLang]}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to={`${base}/compress/heic`}>
                    {dropdownLinks.heic[currentLang]}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to={`${base}/convert/jpg-to-png`}>
                    {dropdownLinks.jpgToPng[currentLang]}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to={`${base}/convert/png-to-jpg`}>
                    {dropdownLinks.pngToJpg[currentLang]}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to={`${base}/convert/webp-to-jpg`}>
                    {dropdownLinks.webpToJpg[currentLang]}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to={`${base}/convert/heic-to-jpg`}>
                    {dropdownLinks.heicToJpg[currentLang]}
                  </Link>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* Auth + Language */}
        <div className="flex items-center gap-4 ml-auto">
          <Auth />
          <LanguageDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
