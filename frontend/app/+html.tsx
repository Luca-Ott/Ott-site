import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

const SITE_URL = 'https://www.ott4future.com';
const LOGO = SITE_URL + '/favicon-512x512.png';

const ORG_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': SITE_URL + '/#organization',
  name: 'On Time Technology Ltd',
  alternateName: ['On Time Technology', 'OTT', 'ott4future'],
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: LOGO, width: 512, height: 512 },
  description:
    'Irish-registered IT company based in Dublin, specialising in software design, development, R&D and visionary special projects (NoMoreFakeNews, Custodiy, Freety) — building the digital infrastructure of tomorrow.',
  email: 'Info@ott4future.com',
  telephone: '+44-7775-682831',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'The Black Church, St Mary\u2019s Place',
    addressLocality: 'Dublin',
    postalCode: 'D07 P4AX',
    addressCountry: 'IE',
  },
  sameAs: ['https://x.com/OnTechnolo1200', 'https://custodiy.com'],
  areaServed: ['IE', 'GB', 'EU', 'Worldwide'],
  foundingDate: '2010',
  knowsAbout: [
    'EU AI Act compliance',
    'AI fake news detection',
    'Deepfake detection',
    'Software design and development',
    'Custodial wallet infrastructure',
    'Tokenised commodities trading',
    'Cyber security',
    'Research and Development',
  ],
};

const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_URL + '/#website',
  name: 'On Time Technology',
  alternateName: ['OTT', 'ott4future', 'On Time Technology Ltd'],
  url: SITE_URL,
  inLanguage: 'en-GB',
  publisher: { '@id': SITE_URL + '/#organization' },
  potentialAction: {
    '@type': 'SearchAction',
    target: SITE_URL + '/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Default Primary Meta — overridden by per-page PageSEO */}
        <title>On Time Technology — Future-Ready Software & R&D</title>
        <meta name="application-name" content="On Time Technology" />
        <meta name="description" content="On Time Technology Ltd is an Irish IT company based in Dublin building the digital infrastructure of tomorrow — software design, development, R&D and visionary special projects (NoMoreFakeNews, Custodiy, Freety)." />
        <meta name="keywords" content="On Time Technology, ott4future, EU AI Act compliance, AI fake news detector, deepfake detection 2026, NoMoreFakeNews, Custodiy, Freety, custodial wallet Ireland, tokenized commodities trading, Irish AI software company, Dublin IT company, software design, software development, R&D" />
        <meta name="author" content="On Time Technology Ltd" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />

        {/* Open Graph defaults */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="On Time Technology" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="On Time Technology — Future-Ready Software & R&D" />
        <meta property="og:description" content="Irish IT company based in Dublin building the digital infrastructure of tomorrow — AI, software, R&D and special projects." />
        <meta property="og:image" content={LOGO} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="On Time Technology logo" />

        {/* Twitter Card defaults */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@OnTechnolo1200" />
        <meta name="twitter:creator" content="@OnTechnolo1200" />
        <meta name="twitter:title" content="On Time Technology — Future-Ready Software & R&D" />
        <meta name="twitter:description" content="Irish IT company based in Dublin building the digital infrastructure of tomorrow." />
        <meta name="twitter:image" content={LOGO} />

        {/* Theme + Geo */}
        <meta name="theme-color" content="#05060F" />
        <meta name="msapplication-TileColor" content="#05060F" />
        <meta name="geo.region" content="IE-D" />
        <meta name="geo.placename" content="Dublin, Ireland" />
        <meta name="geo.position" content="53.349805;-6.260310" />
        <meta name="ICBM" content="53.349805, -6.260310" />

        {/* Contact */}
        <meta name="contact" content="Info@ott4future.com" />
        <meta name="reply-to" content="Info@ott4future.com" />

        {/* Favicon set */}
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://formspree.io" />
        <link rel="preconnect" href="https://formspree.io" crossOrigin="anonymous" />

        {/* Sitemap reference (hint for crawlers) */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        {/* Global CSS */}
        <style dangerouslySetInnerHTML={{ __html: `
          html, body { background-color: #05060F; }
          body { overflow: visible !important; overflow-y: auto !important; }
          #root { overflow: visible !important; }
          ::selection { background: rgba(59, 130, 246, 0.4); color: #fff; }
          @keyframes ott-reveal {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes ott-fade { from { opacity: 0; } to { opacity: 1; } }
          @keyframes ott-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
          @keyframes ott-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes ott-spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
          @keyframes ott-pulse-glow { 0%,100% { opacity: 0.55; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
          @keyframes ott-pulse-aura { 0%,100% { opacity: 0.35; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.18); } }
          @keyframes ott-twinkle { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
          @keyframes ott-puzzle-wobble {
            0%,100% { transform: rotate(-1.5deg) translate(-0.5px, -0.5px) scale(1); }
            25%      { transform: rotate(1.5deg)  translate(0.5px,  -0.5px) scale(1.02); }
            50%      { transform: rotate(1deg)    translate(0.5px,   0.5px) scale(1.04); }
            75%      { transform: rotate(-1deg)   translate(-0.5px,  0.5px) scale(1.02); }
          }
          @keyframes ott-globe-spin { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
          @keyframes ott-globe-tilt {
            0%,100% { transform: rotateY(-22deg) rotateX(4deg); }
            50%      { transform: rotateY(22deg)  rotateX(-4deg); }
          }
        ` }} />

        {/* Vercel Analytics */}
        <script defer src="/_vercel/insights/script.js"></script>

        {/* Global JSON-LD Schema (Organization + WebSite) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_LD) }} />

        <ScrollViewStyleReset />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
