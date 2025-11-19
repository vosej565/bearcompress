import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HtmlLangUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    // 🔥 Hostinger Preview environment detection
    const isPreview =
      window.location.hostname.includes("web-preview") ||
      window.location.hostname.includes("preview") ||
      window.location.href.includes("preview");

    // Do not update lang in preview environments
    if (isPreview) return;

    if (location.pathname.startsWith("/ko")) {
      document.documentElement.lang = "ko";
    } else {
      document.documentElement.lang = "en";
    }
  }, [location.pathname]);

  return null;
};

export default HtmlLangUpdater;