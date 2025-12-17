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
        <title>{title} | BearCompress</title>

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />

        <link rel="canonical" href={url} />

        <meta property="og:title" content={`${title} | BearCompress`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | BearCompress`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

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
            이미지 크기 조정은 사진이나 그림의 가로·세로 픽셀 값을 바꿔서,
            원하는 해상도와 비율에 맞게 만드는 작업입니다. 블로그, 쇼핑몰, 
            SNS 썸네일 등 특정 크기가 필요한 경우에 특히 유용합니다. 
            BearCompress는 별도 설치 없이 브라우저에서 즉시 크기를 조정할 수 있도록 설계되었습니다.
          </p>
        </div>

        {/* 언제 유용한지 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">
            언제 이미지 크기 조정이 필요할까요?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>홈페이지나 블로그에서 권장 이미지 사이즈가 있을 때</li>
            <li>쇼핑몰 상품 이미지나 배너 크기를 통일하고 싶을 때</li>
            <li>SNS 프로필·커버 같은 비율이 정해진 이미지를 만들 때</li>
            <li>프레젠테이션·문서에 딱 맞는 크기로 조정하고 싶을 때</li>
          </ul>
        </div>

        {/* 사용 방법 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">
            BearCompress로 이미지 크기 조정하는 방법
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              위 도구에서 <span className="font-semibold">“이미지 선택”</span>을 클릭하거나
              파일을 끌어다 놓습니다.
            </li>
            <li>원하는 가로·세로 픽셀 값 또는 비율(%)을 입력합니다.</li>
            <li>
              이미지 찌그러짐을 방지하려면{" "}
              <span className="font-semibold">비율 유지(Aspect Ratio)</span>를 활성화하세요.
            </li>
            <li>완료되면 리사이즈된 이미지를 바로 다운로드할 수 있습니다.</li>
          </ol>
        </div>

        {/* 팁 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">
            더 깔끔하게 리사이즈하는 팁
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>웹용 이미지는 보통 가로 1200px 이하가 무난합니다.</li>
            <li>
              이미지를 확대하면 화질이 떨어질 수 있으므로 가능하면{" "}
              <span className="font-semibold">축소 중심</span>으로 작업하는 것이 좋습니다.
            </li>
            <li>비율이 어색하게 보이면 비율 유지 옵션을 활성화하세요.</li>
            <li>
              용량까지 줄이고 싶다면 크기 조정 후{" "}
              <Link to="/ko/compress" className="text-blue-600 underline">
                이미지 압축 도구
              </Link>
              를 함께 사용하세요.
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">자주 묻는 질문(FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">
                크기만 줄이면 화질이 떨어지나요?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                이미지를 줄이는 경우에는 품질 저하가 거의 느껴지지 않습니다.
                다만 이미지를 크게 확대하거나 여러 번 저장하면 화질이 낮아질 수 있습니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-1">
                여러 이미지를 한 번에 리사이즈할 수 있나요?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                네, 여러 이미지를 동시에 리사이즈할 수 있습니다.
                단, 브라우저 안정성을 위해 너무 많은 파일을 한 번에 넣는 것은 추천하지 않습니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-1">
                내 이미지가 서버에 저장되나요?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                BearCompress는 워터마크를 추가하지 않으며 이미지를 공개하거나
                장기간 서버에 보관하지 않습니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-1">
                어떤 이미지 형식을 지원하나요?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                JPG, PNG, WebP, HEIC 형식을 지원합니다.
                리사이즈 후 필요하면 이미지 변환기도 사용할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- 기술 상세 섹션 (Technical Deep Section) ---------------- */}
        <div className="pt-10 border-t border-gray-300">
          <h2 className="text-2xl font-semibold mb-3">
            이미지 크기 조정은 내부적으로 어떻게 동작하나요?
          </h2>
          <p className="leading-relaxed text-gray-700">
            단순히 가로·세로 크기를 바꾸는 작업이 아니라, 픽셀 재배치와 보간(interpolation)
            알고리즘을 이용해 자연스러운 화면을 만들어내는 과정입니다. BearCompress는 모든
            작업을 사용자의 브라우저 안에서 즉시 처리하여 개인정보 보호와 빠른 성능을 동시에 제공합니다.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">브라우저 기반 픽셀 처리</h3>
          <p className="text-gray-700">
            이미지 파일은 Canvas 요소로 디코딩되며, 브라우저가 제공하는 고속 렌더링 엔진을 활용해 
            픽셀 데이터를 변환합니다. 처리된 이미지는 JPG, PNG, WebP 등 선택한 형식으로 다시 인코딩됩니다.
            이 과정은 모두 기기 내부에서 이루어지기 때문에 파일이 외부로 업로드되지 않습니다.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">보간(Interpolation) 알고리즘</h3>
          <p className="text-gray-700">
            리사이즈 과정에서 Bilinear, Bicubic 같은 보간 방식이 사용되어 픽셀 사이를 자연스럽게 연결합니다.
            이를 통해 이미지가 축소될 때는 선명함을 유지하고, 확대될 때는 거친 계단 현상을 줄일 수 있습니다.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">비율 유지 기능</h3>
          <p className="text-gray-700">
            가로 또는 세로 값 중 하나만 입력하면 나머지 값은 자동으로 계산되어 원본 비율을 유지합니다.
            이를 통해 이미지가 눌리거나 늘어나지 않고 자연스러운 형태를 유지할 수 있습니다.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">사용되는 주요 기술</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Canvas 2D API — 픽셀 처리 및 리사이즈 렌더링</li>
            <li>ImageBitmap — 빠르고 효율적인 이미지 디코딩</li>
            <li>Blob/File API — 최종 파일 다운로드 처리</li>
            <li>OffscreenCanvas (지원 브라우저) — 백그라운드 리사이즈 처리</li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default KoResizeImagePage;
