import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, Link } from 'react-router-dom';
import ConvertImages from '@/components/ConvertImages';

/* ----------------------------------
   변환기별 텍스트 및 SEO 설정
---------------------------------- */
const toolDetails = {
  convert: {
    title: '이미지 변환',
    description:
      '무료 온라인 이미지 변환기. 이미지를 JPG, PNG, WEBP, HEIC 형식으로 즉시 안전하게 변환하세요.',
    keywords:
      '이미지 변환, 온라인 이미지 변환기, jpg 변환기, png 변환기, webp 변환기, heic 변환기, 무료 이미지 변환 도구',
    h1: '이미지 변환',
    p: (
      <>
        이미지를 JPG, PNG, WebP 또는 HEIC 형식으로 즉시 변환하세요.
        압축이 필요하신가요?{' '}
        <Link to="/ko/compress" className="text-blue-600 underline">
          이미지 압축 도구
        </Link>
        를 사용해보세요.
      </>
    ),
    slug: '/ko/convert',
  },

  'jpg-to-png': {
    title: 'JPG를 PNG로 변환',
    description: 'JPG 이미지를 고품질 PNG 형식으로 변환합니다.',
    keywords: 'jpg to png, jpg를 png로 변환, jpeg to png 온라인, 이미지 변환기',
    h1: 'JPG를 PNG로 변환기',
    p: (
      <>
        JPG 이미지를 고품질 PNG로 변환하세요.
        JPG 압축이 필요하면{' '}
        <Link to="/ko/compress/jpg" className="text-blue-600 underline">
          JPG 압축 도구
        </Link>
        를 사용해보세요.
      </>
    ),
    slug: '/ko/convert/jpg-to-png',
  },

  'png-to-jpg': {
    title: 'PNG를 JPG로 변환',
    description: 'PNG 이미지를 JPG로 변환합니다.',
    keywords: 'png to jpg, png를 jpg로 변환, png jpeg 온라인',
    h1: 'PNG를 JPG로 변환기',
    p: (
      <>
        PNG 이미지를 더 작은 JPG 파일로 변환하세요.
        PNG 압축이 필요하면{' '}
        <Link to="/ko/compress/png" className="text-blue-600 underline">
          PNG 압축 도구
        </Link>
        를 사용하세요.
      </>
    ),
    slug: '/ko/convert/png-to-jpg',
  },

  'png-to-webp': {
    title: 'PNG를 WebP로 변환',
    description: 'PNG를 WebP로 변환하여 더 가볍고 빠르게.',
    keywords: 'png to webp, png를 webp로 변환, webp 변환기',
    h1: 'PNG를 WebP로 변환기',
    p: (
      <>
        PNG를 차세대 WebP 형식으로 변환하세요.
        WebP 압축은{' '}
        <Link to="/ko/compress/webp" className="text-blue-600 underline">
          WebP 압축 도구
        </Link>
        를 사용하세요.
      </>
    ),
    slug: '/ko/convert/png-to-webp',
  },

  'webp-to-jpg': {
    title: 'WebP를 JPG로 변환',
    description: 'WebP 이미지를 널리 호환되는 JPG로 변환.',
    keywords: 'webp to jpg, webp를 jpg로 변환 온라인',
    h1: 'WebP를 JPG로 변환기',
    p: (
      <>
        WebP 이미지를 JPG로 변환하세요.
        JPG 압축이 필요하다면{' '}
        <Link to="/ko/compress/jpg" className="text-blue-600 underline">
          JPG 압축 도구
        </Link>
        를 사용하세요.
      </>
    ),
    slug: '/ko/convert/webp-to-jpg',
  },

  'heic-to-jpg': {
    title: 'HEIC를 JPG로 변환',
    description: '아이폰 HEIC 사진을 JPG로 변환.',
    keywords: 'heic to jpg, heic를 jpg로 변환',
    h1: 'HEIC를 JPG로 변환기',
    p: (
      <>
        HEIC 이미지를 JPG로 변환하세요.
        JPG 압축이 필요하면{' '}
        <Link to="/ko/compress/jpg" className="text-blue-600 underline">
          JPG 압축 도구
        </Link>
        를 사용하세요.
      </>
    ),
    slug: '/ko/convert/heic-to-jpg',
  },
};

/* ----------------------------------
   ExtraContent (SEO content)
---------------------------------- */
const conversionLabels = {
  convert: '이미지 형식',
  'jpg-to-png': 'JPG를 PNG로',
  'png-to-jpg': 'PNG를 JPG로',
  'png-to-webp': 'PNG를 WebP로',
  'webp-to-jpg': 'WebP를 JPG로',
  'heic-to-jpg': 'HEIC를 JPG로',
};

const ExtraContent = ({ tool }) => {
  const label = conversionLabels[tool] || '이미지 형식';

  return (
    <section className="max-w-4xl mx-auto mt-16 text-left text-gray-800 space-y-10">

      <div>
        <h2 className="text-2xl font-semibold mb-3">이미지 형식 변환이란 무엇인가요?</h2>
        <p className="leading-relaxed text-gray-700">
          이미지 형식 변환은 JPG, PNG, WebP, HEIC처럼 서로 다른 포맷으로 파일을 바꾸는 작업입니다.
          포맷마다 장단점이 다르며 BearCompress는 이러한 변환을 빠르고 안전하게 브라우저에서 처리합니다.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">언제 {label} 변환이 필요할까요?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>특정 사이트가 한 가지 형식만 지원할 때</li>
          <li>PNG → JPG / WebP로 바꿔 용량을 줄이고 싶을 때</li>
          <li>투명 배경 이미지가 필요할 때 JPG → PNG로 변환</li>
          <li>아이폰 HEIC 사진을 PC에서 쉽게 보기 위해 JPG/PNG로 변환</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">BearCompress 이미지 변환기 사용 방법</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>“이미지 선택”을 클릭하거나 파일을 끌어다 놓습니다.</li>
          <li>출력 형식(JPG, PNG, WebP, HEIC)을 선택합니다.</li>
          <li>변환은 브라우저에서 바로 진행되며 빠르고 안전합니다.</li>
          <li>완료 후 개별 또는 전체 다운로드가 가능합니다.</li>
        </ol>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">자주 묻는 질문(FAQ)</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">이미지가 서버에 저장되나요?</h3>
            <p className="text-gray-700 leading-relaxed">
              아니요. 모든 변환은 브라우저에서만 처리되며, 파일은 서버에 업로드되지 않습니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">변환 시 화질이 저하될 수 있나요?</h3>
            <p className="text-gray-700 leading-relaxed">
              PNG → JPG처럼 손실 압축 포맷으로 바꿀 때는 약간의 화질 변화가 있을 수 있습니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">여러 이미지를 한 번에 변환할 수 있나요?</h3>
            <p className="text-gray-700 leading-relaxed">
              가능합니다. 여러 이미지를 한꺼번에 업로드하여 일괄 변환할 수 있습니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">지원 형식은 무엇인가요?</h3>
            <p className="text-gray-700 leading-relaxed">
              JPG, PNG, WebP, HEIC를 지원합니다.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};

/* ----------------------------------
   기술 설명 섹션 (TechnicalDeepSection)
---------------------------------- */
const TechnicalDeepSection = () => (
  <section className="max-w-4xl mx-auto mt-20 text-gray-800 space-y-10">

    <div>
      <h2 className="text-2xl font-semibold mb-3">이미지 변환 알고리즘 기술 설명</h2>
      <p className="leading-relaxed text-gray-700">
        각 이미지 포맷(JPG, PNG, WebP, HEIC)은 서로 다른 압축 방식과 특성을 가지고 있습니다.
        BearCompress는 포맷별 특성을 고려하여 최적 품질과 빠른 변환 속도를 제공합니다.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-2">JPG → PNG</h3>
      <p className="text-gray-700 leading-relaxed">
        PNG는 무손실 압축을 제공하며 투명도를 지원합니다. JPG의 손실 압축을 제거하고 더 선명한 출력이 가능합니다.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-2">PNG → JPG</h3>
      <p className="text-gray-700 leading-relaxed">
        JPG는 손실 압축을 사용하여 용량을 크게 줄일 수 있지만 투명도는 유지되지 않습니다.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-2">PNG → WebP</h3>
      <p className="text-gray-700 leading-relaxed">
        WebP는 PNG보다 높은 압축 효율을 제공하며 투명도 또한 지원합니다. 웹 성능 최적화에 매우 유리합니다.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-2">HEIC → JPG</h3>
      <p className="text-gray-700 leading-relaxed">
        HEIC는 HEVC 기반의 고효율 포맷이며 JPG로 변환하면 호환성이 높아집니다.
      </p>
    </div>

  </section>
);

/* ----------------------------------
   최종 페이지 KoConvertPage
---------------------------------- */
const KoConvertPage = ({ tool = 'convert' }) => {
  const details = toolDetails[tool];
  const pageUrl = `https://bearcompress.com${details.slug}`;
  const ogImage = 'https://bearcompress.com/og-image.png';

  const location = useLocation();
  const initialFiles = location.state?.initialFiles || null;

  return (
    <>
      <Helmet>
        <title>{details.title} | BearCompress</title>
        <meta name="description" content={details.description} />
        <meta name="keywords" content={details.keywords} />
        <meta name="robots" content="index, follow" />

        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${details.title} | BearCompress`} />
        <meta property="og:description" content={details.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            url: pageUrl,
            name: `${details.title} | BearCompress`,
            description: details.description,
          })}
        </script>
      </Helmet>

      <img src="/og-image.png" alt="og-image" className="hidden" />

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          {details.h1}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {details.p}
        </p>
      </div>

      <ConvertImages
        initialFiles={initialFiles}
        uiText={{
          dropLabel: '여기에 이미지를 끌어다 놓으세요',
          orLabel: '또는',
          buttonLabel: '이미지 선택',
          supportLabel: '지원 형식: JPG, PNG, WebP, HEIC',
        }}
      />

      <ExtraContent tool={tool} />
      <TechnicalDeepSection />
    </>
  );
};

export default KoConvertPage;
