import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ImageResizer from "../../components/ImageResizer";

const KoResizeImagePage = () => {
  const title = "이미지 크기 조정";
  const description =
    "JPG, PNG, WebP, HEIC 이미지를 온라인에서 빠르게 크기 조정하세요.";
  const keywords =
    "이미지 크기 조정, 이미지 리사이즈, jpg 리사이즈, png 리사이즈, webp 리사이즈, heic 리사이즈, 온라인 이미지 도구";
  const url = "https://bearcompress.com/ko/resize-image";
  const ogImage = "https://bearcompress.com/og-image.png";

  return (
    <>
      <Helmet>
        {/* Title */}
        <title>{title} | BearCompress</title>

        {/* Meta Description + Keywords */}
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />

        {/* Canonical URL */}
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:title" content={`${title} | BearCompress`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | BearCompress`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${title} | BearCompress`,
            url: url,
            description: description,
            image: ogImage,
            inLanguage: "ko",
          })}
        </script>
      </Helmet>

      {/* Hidden OG-image for crawlers */}
      <img src="/og-image.png" className="hidden" alt="og" />

      {/* ---------------- Page Content ---------------- */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          이미지 크기 조정
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          JPG, PNG, WebP, HEIC 이미지를 온라인에서 빠르고 쉽게 리사이즈하세요.
          이미지 압축이 필요하신가요?{" "}
          <Link to="/ko/compress" className="text-blue-600 underline">
            이미지 압축 도구 사용하기
          </Link>
          .
        </p>
      </div>

      {/* 메인 리사이즈 도구 */}
      <ImageResizer lang="ko" />

      {/* 추가 설명 / SEO 콘텐츠 */}
      <section className="max-w-4xl mx-auto mt-16 text-left text-gray-800 space-y-10">
        {/* 이미지 크기 조정 설명 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">
            이미지 크기 조정이란 무엇인가요?
          </h2>
          <p className="leading-relaxed text-gray-700">
            이미지 크기 조정은 사진이나 그림의 가로·세로 픽셀 값을 바꿔서, 원하는
            해상도와 비율에 맞게 맞추는 작업입니다. 블로그, 쇼핑몰, 썸네일처럼 정해진
            사이즈가 있는 곳에 올릴 때 특히 유용합니다. BearCompress는 별도 설치 없이
            브라우저에서 바로 크기를 조정할 수 있도록 도와줍니다.
          </p>
        </div>

        {/* 언제 유용한지 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">
            언제 이미지 크기 조정이 필요할까요?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>홈페이지나 블로그에서 특정 권장 사이즈에 맞춰 이미지를 올려야 할 때</li>
            <li>쇼핑몰 상품 이미지, 배너, 섬네일 크기를 통일하고 싶을 때</li>
            <li>프로필 사진, 커버 이미지 등 SNS용 정사각형·가로형 이미지를 만들 때</li>
            <li>프레젠테이션, 문서 작업에 맞는 적당한 크기로 맞추고 싶을 때</li>
          </ul>
        </div>

        {/* 사용 방법 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">
            BearCompress로 이미지 크기 조정하는 방법
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              위 도구에서 <span className="font-semibold">“이미지 선택”</span>을 클릭하거나,
              파일을 영역 안으로 끌어다 놓습니다.
            </li>
            <li>원하는 가로·세로 픽셀 값 또는 비율(%)을 입력합니다.</li>
            <li>
              이미지가 찌그러지지 않도록{" "}
              <span className="font-semibold">비율 유지(가로·세로 비율 고정)</span> 옵션을
              사용할 수 있습니다.
            </li>
            <li>적용 버튼을 누르면 크기가 조정된 이미지를 바로 다운로드할 수 있습니다.</li>
          </ol>
        </div>

        {/* 팁 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">
            더 깔끔하게 리사이즈하는 팁
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>웹용 이미지는 보통 가로 1200px 이하로 맞추면 속도와 품질 모두 무난합니다.</li>
            <li>
              이미지를 크게 키우면 화질이 깨질 수 있으니, 가능하면{" "}
              <span className="font-semibold">원본보다 작게 줄이는 용도</span>로 사용하는 것이 좋습니다.
            </li>
            <li>비율이 어색하게 늘어나 보이면 비율 유지 옵션을 켜놓고 한쪽만 수정해 보세요.</li>
            <li>
              용량까지 줄이고 싶다면, 크기 조정 후{" "}
              <Link to="/ko/compress" className="text-blue-600 underline">
                이미지 압축 도구
              </Link>
              로 추가 최적화를 하는 것도 좋습니다.
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">자주 묻는 질문(FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">
                크기만 줄여도 이미지 품질이 떨어지나요?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                이미지를 더 작게 줄이는 경우에는 보통 품질 저하가 크게 느껴지지 않습니다.
                다만, 너무 많이 확대하거나 여러 번 저장을 반복하면 화질이 떨어질 수 있으니
                중요한 이미지는 원본을 따로 보관해 두는 것이 좋습니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-1">
                여러 장의 이미지를 한 번에 리사이즈할 수 있나요?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                네, 여러 이미지를 한 번에 업로드해 크기를 조정할 수 있습니다.
                다만 브라우저 성능을 위해 너무 많은 파일을 한꺼번에 넣기보다는,
                몇 묶음으로 나누어 작업하시는 것을 추천드립니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-1">
                BearCompress를 사용할 때 내 이미지가 서버에 남나요?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                BearCompress는 사용자의 이미지를 공개하거나 워터마크를 추가하지 않습니다.
                작업이 끝난 뒤 파일이 오래 보관되지 않도록 설계되어 있어 안심하고 사용하실 수 있습니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-1">
                어떤 이미지 형식을 리사이즈할 수 있나요?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                JPG, PNG, WebP, HEIC 형식을 지원합니다. 리사이즈 후 형식 변환이 필요하다면
                이미지 변환기 페이지에서 JPG, PNG, WebP, HEIC 간 변환도 함께 사용하실 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default KoResizeImagePage;
