import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function Root({ children }: PropsWithChildren) {
  // Schema.org structured data for Organization
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "On Time Technology Ltd",
    "alternateName": "OTT",
    "url": "https://www.ott4future.com",
    "logo": "https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68",
    "description": "Innovating Tomorrow's Solutions Today. Software Design, Software Development, R&D and Special Projects.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "The Black Church - St Mary's Place",
      "addressLocality": "Dublin",
      "postalCode": "D07 P4AX",
      "addressCountry": "IE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44-777-568-2831",
      "contactType": "customer service",
      "email": "Info@ott4future.com"
    },
    "sameAs": []
  };

  // WebSite structured data for search
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "On Time Technology Ltd",
    "url": "https://www.ott4future.com"
  };

  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17842656105"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17842656105');
            `
          }}
        />
        
        {/* Event snippet for Visualizzazione di pagina conversion */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function gtag_report_conversion(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                  'send_to': 'AW-17842656105/aJJ8CLz4k98bEOmmhbxC',
                  'value': 1.0,
                  'currency': 'USD',
                  'event_callback': callback
                });
                return false;
              }
            `
          }}
        />
        
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Primary Meta Tags */}
        <title>On Time Technology Ltd - Software Design & Development</title>
        <meta name="title" content="On Time Technology Ltd - Software Design & Development" />
        <meta name="description" content="On Time Technology Ltd - Innovating Tomorrow's Solutions Today. Software Design, Software Development, R&D and Special Projects." />
        <meta name="keywords" content="software design, software development, R&D, IT company, NoMoreFakeNews, Custodiy, technology, UK, Ireland" />
        <meta name="author" content="On Time Technology Ltd" />
        <meta name="robots" content="index, follow" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68" />
        <link rel="apple-touch-icon" href="https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ott4future.com/" />
        <meta property="og:title" content="On Time Technology Ltd - Software Design & Development" />
        <meta property="og:description" content="Innovating Tomorrow's Solutions Today. Software Design, Development, R&D and Special Projects." />
        <meta property="og:image" content="https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:site_name" content="On Time Technology Ltd" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="On Time Technology Ltd - Software Design & Development" />
        <meta name="twitter:description" content="Innovating Tomorrow's Solutions Today. Software Design, Development, R&D and Special Projects." />
        <meta name="twitter:image" content="https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://www.ott4future.com/" />
        
        {/* Theme */}
        <meta name="theme-color" content="#0066CC" />
        
        {/* Schema.org Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        />
        
        <ScrollViewStyleReset />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
