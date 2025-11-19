import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LanguageRedirector = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // 1) Hostinger PREVIEW 환경 감지 (HtmlLangUpdater랑 동일한 기준)
    const isPreview =
      window.location.hostname.includes("web-preview") ||
      window.location.hostname.includes("preview") ||
      window.location.href.includes("preview");

    // 🔒 프리뷰 환경에서는 절대 리다이렉트 안 함 (깜빡임 방지)
    if (isPreview) return;

    // 2) 사용자가 언어를 직접 선택한 경우 (override 우선)
    const override = localStorage.getItem("langOverride");

    if (override === "ko") {
      // 한국어 고정: /ko 없는 경로는 전부 /ko로 보냄
      if (!path.startsWith("/ko")) {
        const newPath = "/ko" + (path === "/" ? "" : path);
        window.location.replace(newPath);
      }
      return;
    }

    if (override === "en") {
      // 영어 고정: /ko로 시작하면 /에서 다시 시작
      if (path.startsWith("/ko")) {
        const stripped = path.replace(/^\/ko/, "") || "/";
        window.location.replace(stripped);
      }
      return;
    }

    // 3) override가 없는 경우에만 브라우저 언어 자동 감지
    const userLang = navigator.language?.toLowerCase() || "en";

    if (userLang.includes("ko")) {
      if (!path.startsWith("/ko")) {
        window.location.replace("/ko");
      }
    } else {
      if (path.startsWith("/ko")) {
        window.location.replace("/");
      }
    }
  }, [location.pathname]);

  return null;
};

export default LanguageRedirector;
