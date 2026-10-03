import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

import { ORG_SCHEMA, WEBSITE_SCHEMA, SITE_NAME } from '../src/data/siteIdentity';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* PageSEO owns title, description, canonical, robots and social metadata.
            Keeping defaults here would duplicate tags in exported HTML. */}
        <meta name="application-name" content={SITE_NAME} />
        <meta name="language" content="English" />

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
          @keyframes planet-rotate { from { transform: translateX(0%); } to { transform: translateX(-50%); } }
          @keyframes planet-clouds { from { transform: translateX(0%); } to { transform: translateX(-50%); } }
        ` }} />

        {/* Vercel Analytics */}
        <script defer src="/_vercel/insights/script.js"></script>

        {/* Global JSON-LD Schema (Organization + WebSite) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />

        <ScrollViewStyleReset />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
