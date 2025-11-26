import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, Link } from 'react-router-dom';
import CompressImages from '@/components/CompressImages';
import CompressPdf from '@/components/CompressPdf';

const toolDetails = {
  compress: {
    title: '이미지 압축',
    description: 'JPG, PNG, WebP, HEIC 이미지를 고품질로 압축하세요.',
    keywords: '이미지 압축, png 압축, jpg 압축, webp 압축, heic 압축',
    h1: '이미지 압축',
    p: (
      <>
        JPG, PNG, WebP, HEIC 이미지를 온라인에서 즉시 압축하세요.
        이미지 변환이 필요하신가요?{' '}
        <Link to="/ko/convert" className="text-blue-600 underline">
          이미지 변환기로 이동
        </Link>
        .
      </>
    ),
    slug: '/ko/compress',
  },

  'compress-jpg': {
    title: 'JPG 압축',
    description: '온라인 JPG 압축기로 JPEG 파일 크기를 줄이세요.',
    keywords: 'jpg 압축, jpeg 압축, 사진 용량 줄이기',
    h1: 'JPG 이미지 압축',
    p: (
      <>
        JPG/JPEG 파일을 빠르고 안전하게 압축하세요.
        JPG를 PNG로 변환하고 싶다면{' '}
        <Link to="/ko/convert/jpg-to-png" className="text-blue-600 underline">
          JPG → PNG 변환기
        </Link>
        를 사용하세요.
      </>
    ),
    slug: '/ko/compress/jpg',
  },

  'compress-png': {
    title: 'PNG 압축',
    description: '투명도 유지하면서 PNG 이미지를 압축하세요.',
    keywords: 'png 압축, png 용량 줄이기, 이미지 최적화',
    h1: 'PNG 이미지 압축',
    p: (
      <>
        투명도 손상 없이 PNG 파일을 최적화하세요.
        PNG를 JPG로 변환하시려면{' '}
        <Link to="/ko/convert/png-to-jpg" className="text-blue-600 underline">
          PNG → JPG 변환기
        </Link>
        를 이용하세요.
      </>
    ),
    slug: '/ko/compress/png',
  },

  'compress-webp': {
    title: 'WebP 압축',
    description: 'WebP 이미지 파일 크기를 효율적으로 줄이세요.',
    keywords: 'webp 압축, webp 용량 줄이기, 이미지 압축 webp',
    h1: 'WebP 이미지 압축',
    p: (
      <>
        WebP 이미지를 더 가볍게 최적화하세요.
        JPG로 변환하려면{' '}
        <Link to="/ko/convert/webp-to-jpg" className="text-blue-600 underline">
          WebP → JPG 변환기
        </Link>
        를 사용하세요.
      </>
    ),
    slug: '/ko/compress/webp',
  },

  'compress-heic': {
    title: 'HEIC 압축',
    description: 'HEIC 이미지를 안전하게 압축하세요.',
    keywords: 'heic 압축, heic 용량 줄이기, 아이폰 heic 압축',
    h1: 'HEIC 이미지 압축',
    p: (
      <>
        HEIC 파일 크기를 줄여보세요.
        먼저 JPG로 변환이 필요하다면{' '}
        <Link to="/ko/convert/heic-to-jpg" className="text-blue-600 underline">
          HEIC → JPG 변환기
        </Link>
        를 이용하세요.
      </>
    ),
    slug: '/ko/compress/heic',
  },

  /* 'compress-pdf': { ... } */
};

// 포맷 이름(문장에 넣어서 쓸 label) – 타입 없이 그냥 객체
const formatLabels = {
  compress: '이미지',
  'compress-jpg': 'JPG/JPEG 이미지',
  'compress-png': 'PNG 이미지',
  'compress-webp': 'WebP 이미지',
  'compress-heic': 'HEIC 이미지',
};

const ExtraContent = ({ tool }) => {
  const label = formatLabels[tool] || '이미지';

  return (
    <section className="max-w-4xl mx-auto mt-16 text-left text-gray-800 space-y-10">
      {/* 이미지 압축 설명 */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">이미지 압축이란 무엇인가요?</h2>
        <p className="leading-relaxed text-gray-700">
          이미지 압축은 사진이나 그림 파일의 불필요한 데이터를 줄여 용량을 가볍게 만드는 작업입니다.
          파일 크기는 줄이면서도 사람이 보기에는 거의 차이를 느끼지 못하도록 품질을 최대한 유지하는 것이
          중요합니다. BearCompress는 이런 부분을 자동으로 조절해 주어, 용량과 화질 사이에서 좋은 균형을
          찾을 수 있도록 도와줍니다.
        </p>
      </div>

      {/* 언제 유용한지 */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">
          언제 {label}를 압축하면 좋을까요?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>블로그나 포트폴리오, 쇼핑몰 등에 이미지를 많이 올려야 할 때</li>
          <li>홈페이지 속도가 느려져서 이미지 용량을 줄여야 할 때</li>
          <li>휴대폰·노트북·클라우드 저장공간이 부족할 때</li>
          <li>이메일 첨부 파일 용량 제한 때문에 전송이 잘 안 될 때</li>
        </ul>
      </div>

      {/* 사용 방법 */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">
          BearCompress로 {label} 압축하는 방법
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            상단 도구에서 <span className="font-semibold">“이미지 선택”</span>을 클릭하거나,
            파일을 영역 안으로 끌어다 놓습니다.
          </li>
          <li>원하는 압축 강도(균형, 고화질, 더 작은 파일)를 선택합니다.</li>
          <li>브라우저에서 바로 압축이 진행되며, 회원가입·워터마크 없이 결과를 확인할 수 있습니다.</li>
          <li>만족스러운 결과가 나오면 다운로드 버튼을 눌러 최종 파일을 저장합니다.</li>
        </ol>
      </div>

      {/* 팁 */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">더 좋은 결과를 위한 팁</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>처음에는 기본값인 “균형(Balanced)”으로 테스트해 보고, 더 줄이고 싶을 때만 강한 압축을 사용하세요.</li>
          <li>디테일이 많은 사진(풍경, 인물 등)은 화질을 조금 더 높게 유지하는 것이 좋습니다.</li>
          <li>썸네일이나 아이콘처럼 작은 이미지는 강한 압축을 사용해도 티가 잘 나지 않습니다.</li>
          <li>중요한 원본 이미지는 별도로 보관해 두면 나중에 다시 다른 설정으로 압축하기 편합니다.</li>
        </ul>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">자주 묻는 질문(FAQ)</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">업로드한 이미지는 서버에 저장되나요?</h3>
            <p className="text-gray-700 leading-relaxed">
              BearCompress는 브라우저에서 동작하는 것을 목표로 설계되어, 가능한 한 사용자의 파일을
              서버에 남기지 않습니다. 작업이 끝난 뒤에는 이미지가 장기간 보관되지 않도록 처리합니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">압축하면 화질이 많이 떨어지지 않나요?</h3>
            <p className="text-gray-700 leading-relaxed">
              압축 강도를 아주 높게 설정하면 화질 저하가 생길 수 있지만, 기본 설정에서는 대부분의 경우
              눈으로 보기에는 거의 차이가 느껴지지 않는 수준으로만 용량을 줄여 줍니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">파일 개수나 용량 제한이 있나요?</h3>
            <p className="text-gray-700 leading-relaxed">
              브라우저 성능에 따라 한번에 처리할 수 있는 개수는 달라질 수 있지만, 일반적인 사용 환경에서는
              여러 장의 이미지를 한 번에 압축해도 무리가 없습니다. 너무 많은 파일을 한꺼번에 넣기보다는
              몇 묶음으로 나누어 작업하시는 것을 권장합니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">어떤 이미지 형식을 지원하나요?</h3>
            <p className="text-gray-700 leading-relaxed">
              이 페이지에서는 JPG, PNG, WebP, HEIC 형식을 지원합니다. 형식을 서로 변환하고 싶다면 상단 메뉴에서
              이미지 변환기 페이지로 이동해 보세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const KoCompressPage = ({ tool = 'compress' }) => {
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
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${details.title} | BearCompress`} />
        <meta property="og:description" content={details.description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${details.title} | BearCompress`} />
        <meta name="twitter:description" content={details.description} />
        <meta name="twitter:image" content={ogImage} />

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
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{details.p}</p>
      </div>

      {tool === 'compress-pdf' ? (
        <CompressPdf />
      ) : (
        <CompressImages
          initialFiles={initialFiles}
          uiText={{
            dropLabel: '여기에 이미지를 끌어다 놓으세요',
            orLabel: '또는',
            buttonLabel: '이미지 선택',
            supportLabel: '지원 형식: JPG, PNG, WebP, HEIC',
          }}
        />
      )}

      {tool !== 'compress-pdf' && <ExtraContent tool={tool} />}
    </>
  );
};

export default KoCompressPage;
