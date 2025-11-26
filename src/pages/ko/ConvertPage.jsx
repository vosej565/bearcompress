import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, Link } from 'react-router-dom';
import ConvertImages from '@/components/ConvertImages';

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

  'heic-to-png': {
    title: 'HEIC를 PNG로 변환',
    description: 'HEIC를 PNG로 변환하여 고품질 유지.',
    keywords: 'heic to png, heic를 png로 변환',
    h1: 'HEIC를 PNG로 변환기',
    p: (
      <>
        HEIC 이미지를 고품질 PNG로 변환하세요.
        PNG 압축은{' '}
        <Link to="/ko/compress/png" className="text-blue-600 underline">
          PNG 압축 도구
        </Link>
        를 사용하세요.
      </>
    ),
    slug: '/ko/convert/heic-to-png',
  },
};

// 각 변환 유형에 표시할 라벨
const conversionLabels = {
  convert: '이미지 형식',
  'jpg-to-png': 'JPG를 PNG로',
  'png-to-jpg': 'PNG를 JPG로',
  'png-to-webp': 'PNG를 WebP로',
  'webp-to-jpg': 'WebP를 JPG로',
  'heic-to-jpg': 'HEIC를 JPG로',
  'heic-to-png': 'HEIC를 PNG로',
};

const ExtraContent = ({ tool }) => {
  const label = conversionLabels[tool] || '이미지 형식';

  return (
    <section className="max-w-4xl mx-auto mt-16 text-left text-gray-800 space-y-10">
      {/* 이미지 형식 변환 설명 */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">이미지 형식 변환이란 무엇인가요?</h2>
        <p className="leading-relaxed text-gray-700">
          이미지 형식 변환은 JPG, PNG, WebP, HEIC처럼 서로 다른 포맷으로 파일을 바꾸는 작업입니다.
          포맷마다 장단점이 달라서, 어떤 형식은 용량이 작고, 어떤 형식은 투명도나 화질에 더 강합니다.
          BearCompress는 이런 변환 과정을 브라우저에서 빠르고 간단하게 처리할 수 있도록 도와줍니다.
        </p>
      </div>

      {/* 언제 변환이 유용한지 */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">
          언제 {label} 변환이 필요할까요?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>특정 사이트나 서비스가 한 가지 형식(JPG, PNG 등)만 지원할 때</li>
          <li>PNG에서 JPG, WebP로 바꿔서 파일 용량을 줄이고 싶을 때</li>
          <li>투명 배경이 필요한 로고·아이콘을 JPG에서 PNG로 바꾸고 싶을 때</li>
          <li>아이폰 HEIC 사진을 PC·웹에서 더 쉽게 쓰기 위해 JPG나 PNG로 변환할 때</li>
        </ul>
      </div>

      {/* 사용 방법 */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">
          BearCompress 이미지 변환기 사용 방법
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            상단 도구에서 <span className="font-semibold">“이미지 선택”</span>을 클릭하거나,
            파일을 영역 안으로 끌어다 놓습니다.
          </li>
          <li>변환하고 싶은 출력 형식(JPG, PNG, WebP, HEIC)을 선택합니다.</li>
          <li>브라우저에서 바로 변환이 진행되며, 회원가입이나 워터마크 없이 결과를 확인할 수 있습니다.</li>
          <li>완료되면 변환된 이미지를 개별로 혹은 묶어서 다운로드합니다.</li>
        </ol>
      </div>

      {/* 팁 */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">더 좋은 변환을 위한 팁</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>사진·배경이미지는 보통 JPG로 변환하면 용량을 크게 줄일 수 있습니다.</li>
          <li>로고, 아이콘, UI 요소처럼 선명해야 하는 이미지는 PNG 형식을 추천합니다.</li>
          <li>웹사이트 속도가 중요하다면 WebP로 변환해서 품질과 용량을 동시에 잡을 수 있습니다.</li>
          <li>중요한 원본 이미지는 변환 전에 따로 백업해 두면 나중에 다른 형식으로 다시 변환하기 편합니다.</li>
        </ul>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">자주 묻는 질문(FAQ)</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">
              이미지를 변환하면 서버에 오래 저장되나요?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              BearCompress는 브라우저 기반 동작을 우선으로 설계되어, 변환 과정이 끝난 뒤
              사용자의 파일이 장기간 서버에 남지 않도록 처리합니다. 파일은 공개되지 않으며,
              워터마크도 추가되지 않습니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">
              형식을 바꾸면 화질이 떨어지지 않나요?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              JPG처럼 이미 압축된 형식에서 다시 JPG로 변환한다고 해서 화질이 좋아지지는 않습니다.
              다만, PNG → JPG로 변환할 경우 용량을 줄이는 대신 아주 미세한 화질 변화가 생길 수 있습니다.
              중요한 이미지는 필요에 따라 PNG나 WebP 형식을 유지하는 것을 권장합니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">
              여러 이미지를 한 번에 변환할 수 있나요?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              네, 여러 파일을 동시에 업로드해 일괄 변환할 수 있습니다.
              다만 너무 많은 파일을 한 번에 넣기보다는, 몇 묶음으로 나누어 작업하면 브라우저가 더 안정적으로 동작합니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">
              어떤 이미지 형식을 지원하나요?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              이 변환기에서는 JPG, PNG, WebP, HEIC 형식을 지원합니다.
              상단 메뉴에서 원하는 변환 종류(예: JPG → PNG, HEIC → JPG 등)를 선택해 사용하실 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const KoConvertPage = ({ tool = 'convert' }) => {
  const details = toolDetails[tool];
  const pageUrl = `https://bearcompress.com${details.slug}`;
  const ogImage = 'https://bearcompress.com/og-image.jpg';

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

      <img
        src="/og-image.jpg"
        alt={`${details.title} - BearCompress`}
        className="hidden"
      />

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
    </>
  );
};

export default KoConvertPage;
