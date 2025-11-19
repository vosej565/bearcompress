import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const useHreflang = () => {
    const location = useLocation();
    const [hreflangTags, setHreflangTags] = useState([]);

    useEffect(() => {
        const { pathname } = location;
        const baseUrl = 'https://bearcompress.com';

        let enUrl;
        let koUrl;

        if (pathname.startsWith('/ko/')) {
            koUrl = `${baseUrl}${pathname}`;
            enUrl = `${baseUrl}${pathname.substring(3)}`; // Remove /ko
        } else if (pathname === '/ko') {
            koUrl = `${baseUrl}/ko`;
            enUrl = `${baseUrl}/`;
        } else {
            enUrl = `${baseUrl}${pathname}`;
            koUrl = `${baseUrl}/ko${pathname === '/' ? '' : pathname}`;
        }
        
        // Ensure trailing slashes are consistent
        if (enUrl.endsWith('/') && enUrl.length > baseUrl.length + 1) {
            enUrl = enUrl.slice(0, -1);
        }
        if (koUrl.endsWith('/') && koUrl.length > `${baseUrl}/ko`.length) {
            koUrl = koUrl.slice(0, -1);
        }
        
        const tags = [
            <link key="en" rel="alternate" hrefLang="en" href={enUrl} />,
            <link key="ko" rel="alternate" hrefLang="ko" href={koUrl} />,
            <link key="x-default" rel="alternate" hrefLang="x-default" href={enUrl} />
        ];

        setHreflangTags(tags);
    }, [location]);

    return hreflangTags;
};

const HreflangManager = () => {
    const tags = useHreflang();

    return (
        <Helmet>
            {tags}
        </Helmet>
    );
};

export default HreflangManager;