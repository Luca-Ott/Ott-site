import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Primary Meta Tags */}
        <title>On Time Technology Ltd - Software Design & Development | ott4future.com</title>
        <meta name="title" content="On Time Technology Ltd - Software Design & Development | ott4future.com" />
        <meta name="description" content="On Time Technology Ltd is a UK-based IT company specializing in Software Design, Software Development, Research & Development. We deliver innovative technology solutions for businesses worldwide." />
        <meta name="keywords" content="On Time Technology, ott4future, software design, software development, R&D, research development, IT company, Freety, NoMoreFakeNews, Custodiy, technology, UK, London" />
        <meta name="author" content="On Time Technology Ltd" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ott4future.com/" />
        <meta property="og:title" content="On Time Technology Ltd - Software Design & Development" />
        <meta property="og:description" content="On Time Technology Ltd is a UK-based IT company specializing in Software Design, Software Development, Research & Development. Innovative technology solutions for businesses worldwide." />
        <meta property="og:image" content="https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:site_name" content="On Time Technology Ltd" />
        <meta property="og:locale" content="en_GB" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="On Time Technology Ltd - Software Design & Development" />
        <meta name="twitter:description" content="On Time Technology Ltd is a UK-based IT company specializing in Software Design, Software Development, Research & Development. Innovative technology solutions for businesses worldwide." />
        <meta name="twitter:image" content="https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://www.ott4future.com/" />
        
        {/* Theme */}
        <meta name="theme-color" content="#0066CC" />
        <meta name="msapplication-TileColor" content="#0066CC" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        
        {/* Contact */}
        <meta name="contact" content="luca@ott4future.com" />
        <meta name="reply-to" content="luca@ott4future.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Override Expo body overflow hidden for SEO crawlers */}
        <style dangerouslySetInnerHTML={{ __html: `
          body { overflow: visible !important; overflow-y: auto !important; }
          #root { overflow: visible !important; }
        ` }} />
        
        {/* Vercel Analytics */}
        <script defer src="/_vercel/insights/script.js"></script>

        {/* Structured Data JSON-LD for Google */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "On Time Technology Ltd",
          "alternateName": "ott4future",
          "url": "https://www.ott4future.com",
          "logo": "https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68",
          "description": "On Time Technology Ltd is a UK-based IT company specializing in Software Design, Software Development, Research & Development. Innovative technology solutions for businesses worldwide.",
          "email": "luca@ott4future.com",
          "sameAs": ["https://x.com/OnTechnolo1200"],
          "areaServed": "Worldwide",
          "knowsAbout": ["Software Design", "Software Development", "Research & Development", "Commodity Trading Platform", "Cyber Security"]
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "On Time Technology Ltd",
          "alternateName": "OTT",
          "url": "https://www.ott4future.com"
        }) }} />
        
        <ScrollViewStyleReset />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
