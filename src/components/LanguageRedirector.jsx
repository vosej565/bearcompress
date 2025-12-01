import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LanguageRedirector = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // 1) Hostinger preview 환경에서는 리다이렉트 금지
    const isPreview =
      window.location.hostname.includes("web-preview") ||
      window.location.hostname.includes("preview") ||
      window.location.href.includes("preview");
    if (isPreview) return;

    // 2) 사용자가 언어를 직접 선택한 경우 (override)
    const override = localStorage.getItem("langOverride");

    if (override === "ko") {
      if (!path.startsWith("/ko")) {
        window.location.replace("/ko" + (path === "/" ? "" : path));
      }
      return;
    }

    if (override === "en") {
      if (path.startsWith("/ko")) {
        const stripped = path.replace(/^\/ko/, "") || "/";
        window.location.replace(stripped);
      }
      return;
    }

    // 3) 자동 언어 감지 (override 없을 때만 실행)
    const userLang = navigator.language?.toLowerCase() || "en";

    if (userLang.includes("ko")) {
      // 🔥 한국어: 경로 유지하면서 /ko 붙여서 이동
      if (!path.startsWith("/ko")) {
        window.location.replace("/ko" + (path === "/" ? "" : path));
      }
    } else {
      // 🔥 영어: /ko 있으면 제거
      if (path.startsWith("/ko")) {
        const stripped = path.replace(/^\/ko/, "") || "/";
        window.location.replace(stripped);
      }
    }
  }, [location.pathname]);

  return null;
};

export default LanguageRedirector;
