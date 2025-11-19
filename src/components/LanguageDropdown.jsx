import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const LanguageDropdown = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentLang = location.pathname.startsWith('/ko') ? 'ko' : 'en';

  const handleLanguageChange = (lang) => {

    localStorage.setItem("langOverride", lang);

    let newPath;
    if (lang === 'en') {
      // Switch to English: remove /ko prefix
      newPath = location.pathname.replace(/^\/ko/, '');
      if (newPath === '') newPath = '/';
    } else {
      // Switch to Korean: add /ko prefix if not present
      if (!location.pathname.startsWith('/ko')) {
        newPath = `/ko${location.pathname === '/' ? '' : location.pathname}`;
      } else {
        newPath = location.pathname;
      }
    }
    navigate(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange('en')} disabled={currentLang === 'en'}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('ko')} disabled={currentLang === 'ko'}>
          한국어
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;