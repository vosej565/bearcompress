import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const isKorean = location.pathname.startsWith('/ko');
    const base = isKorean ? '/ko' : '';

    const footerText = {
        about: isKorean ? "소개" : "About",
        contact: isKorean ? "문의하기" : "Contact",
        legal: isKorean ? "법적 고지" : "Legal",
        rights: isKorean ? "© 2025 BearCompress. 모든 권리 보유." : "© 2025 BearCompress. All Rights Reserved.",
    };

    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4 max-w-5xl py-8">
                <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                    <p className="text-sm text-gray-600 mb-4 sm:mb-0">
                        {footerText.rights}
                    </p>
                    <nav className="flex gap-4 text-sm text-gray-600">
                        <Link to={`${base}/contact`} className="hover:text-blue-600">
                            {footerText.contact}
                        </Link>
                        <Link to={`${base}/legal`} className="hover:text-blue-600">
                            {footerText.legal}
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
