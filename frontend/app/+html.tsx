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
        <title>On Time Technology Ltd - Software Design & Development</title>
        <meta name="title" content="On Time Technology Ltd - Software Design & Development" />
        <meta name="description" content="On Time Technology Ltd - Innovating Tomorrow's Solutions Today. Software Design, Software Development, R&D and Special Projects." />
        <meta name="keywords" content="software design, software development, R&D, IT company, NoMoreFakeNews, Custodiy, technology, UK" />
        <meta name="author" content="On Time Technology Ltd" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ott4future.com/" />
        <meta property="og:title" content="On Time Technology Ltd - Software Design & Development" />
        <meta property="og:description" content="Innovating Tomorrow's Solutions Today. Software Design, Development, R&D and Special Projects." />
        <meta property="og:site_name" content="On Time Technology Ltd" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="On Time Technology Ltd - Software Design & Development" />
        <meta name="twitter:description" content="Innovating Tomorrow's Solutions Today. Software Design, Development, R&D and Special Projects." />
        
        {/* Canonical */}
        <link rel="canonical" href="https://www.ott4future.com/" />
        
        {/* Theme */}
        <meta name="theme-color" content="#0066CC" />
        
        {/* Vercel Analytics */}
        <script defer src="/_vercel/insights/script.js"></script>
        
        <ScrollViewStyleReset />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
