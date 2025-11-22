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
    more: { en: 'MORE', ko: '더보기' },
    /*pdf: { en: 'PDF Compressor', ko: 'PDF 압축' }*/
  };

  const currentLang = isKorean ? 'ko' : 'en';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 max-w-5xl flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to={base || '/'} className="flex items-center">
            <img
              className="h-40 w-auto"
              alt="BearCompress Logo"
              src="https://horizons-cdn.hostinger.com/e25b2aee-4883-48af-8ec0-56c5bdb0ffed/9ab12f7c8f77c9363a39b7321062c028.png"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
            <NavLink to={`${base}/compress`}>{navLinks.compress[currentLang]}</NavLink>
            <NavLink to={`${base}/convert`}>{navLinks.convert[currentLang]}</NavLink>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                {navLinks.more[currentLang]} <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem asChild><Link to={`${base}/compress/jpg`}>JPG Compressor</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to={`${base}/compress/png`}>PNG Compressor</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to={`${base}/compress/webp`}>WebP Compressor</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to={`${base}/compress/heic`}>HEIC Compressor</Link></DropdownMenuItem>

                {/* PDF compressor */}
                {/*<DropdownMenuItem asChild>
                  <Link to={`${base}/compress/pdf`}>{navLinks.pdf[currentLang]}</Link>
                </DropdownMenuItem>*/}

                <DropdownMenuItem asChild><Link to={`${base}/convert/jpg-to-png`}>JPG to PNG</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to={`${base}/convert/png-to-jpg`}>PNG to JPG</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to={`${base}/convert/webp-to-jpg`}>WebP to JPG</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to={`${base}/convert/heic-to-jpg`}>HEIC to JPG</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <Auth />
          <LanguageDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
