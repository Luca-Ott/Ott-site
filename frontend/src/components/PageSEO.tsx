import React from 'react';
import Head from 'expo-router/head';

type JsonLd = Record<string, any> | Record<string, any>[];

type Props = {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  articleSection?: string;
  articleTags?: string[];
  schema?: JsonLd;
  locale?: string;
  siteName?: string;
};

const DEFAULT_OG_IMAGE = 'https://www.ott4future.com/og-image.jpg';
const DEFAULT_SITE_NAME = 'On Time Technology';

/**
 * Centralised SEO component. Emits:
 *  - title + description + canonical + robots
 *  - Open Graph (Facebook, LinkedIn)
 *  - Twitter Card
 *  - Article meta (publish dates, author, section, tags)
 *  - One or more JSON-LD blocks (Organization, SoftwareApplication, Article, FAQPage, etc.)
 */
export default function PageSEO({
  title,
  description,
  canonical,
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noindex,
  publishedTime,
  modifiedTime,
  author = 'On Time Technology Ltd',
  articleSection,
  articleTags,
  schema,
  locale = 'en_GB',
  siteName = DEFAULT_SITE_NAME,
}: Props) {
  const schemaArray = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* Article-specific OG */}
      {ogType === 'article' && publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
      {ogType === 'article' && modifiedTime ? <meta property="article:modified_time" content={modifiedTime} /> : null}
      {ogType === 'article' && author ? <meta property="article:author" content={author} /> : null}
      {ogType === 'article' && articleSection ? <meta property="article:section" content={articleSection} /> : null}
      {ogType === 'article' && articleTags ? articleTags.map((t) => <meta key={t} property="article:tag" content={t} />) : null}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@OnTechnolo1200" />
      <meta name="twitter:creator" content="@OnTechnolo1200" />

      {/* JSON-LD structured data */}
      {schemaArray.map((s, idx) => (
        <script
          key={`jsonld-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </Head>
  );
}

// ---------------------------------------------------------------------------
// Reusable JSON-LD builders
// ---------------------------------------------------------------------------

export const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'On Time Technology Ltd',
  alternateName: ['On Time Technology', 'OTT'],
  url: 'https://www.ott4future.com',
  logo: 'https://www.ott4future.com/favicon-512x512.png',
  description:
    'Irish-registered IT company based in Dublin, specialising in software design, development, R&D and visionary special projects (NoMoreFakeNews, Custodiy, Freety).',
  email: 'Info@ott4future.com',
  telephone: '+44-7775-682831',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'The Black Church, St Mary\u2019s Place',
    addressLocality: 'Dublin',
    postalCode: 'D07 P4AX',
    addressCountry: 'IE',
  },
  sameAs: [
    'https://x.com/OnTechnolo1200',
    'https://custodiy.com',
  ],
  foundingDate: '2010',
  founders: [{ '@type': 'Person', name: 'On Time Technology Founding Team' }],
  knowsAbout: [
    'Artificial Intelligence',
    'EU AI Act compliance',
    'Software Engineering',
    'Blockchain & Web3',
    'Custodial wallet infrastructure',
    'Tokenised commodities trading',
    'Cyber security',
    'Anti-disinformation technology',
  ],
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'On Time Technology',
  alternateName: 'OTT',
  url: 'https://www.ott4future.com',
  inLanguage: 'en-GB',
  publisher: { '@type': 'Organization', name: 'On Time Technology Ltd', url: 'https://www.ott4future.com' },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.ott4future.com/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export function softwareAppSchema(opts: {
  name: string;
  url: string;
  description: string;
  category?: string;
  image?: string;
  applicationSubCategory?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: opts.name,
    applicationCategory: opts.category || 'BusinessApplication',
    applicationSubCategory: opts.applicationSubCategory,
    operatingSystem: 'Web, iOS, Android',
    description: opts.description,
    url: opts.url,
    image: opts.image || 'https://www.ott4future.com/og-image.jpg',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    provider: {
      '@type': 'Organization',
      name: 'On Time Technology Ltd',
      address: { '@type': 'PostalAddress', addressCountry: 'IE' },
    },
  };
}

export function breadcrumbsSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  section?: string;
  keywords?: string[];
  wordCount?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    image: opts.image || 'https://www.ott4future.com/og-image.jpg',
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    inLanguage: 'en-GB',
    author: {
      '@type': 'Organization',
      name: opts.author || 'On Time Technology Editorial',
      url: 'https://www.ott4future.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'On Time Technology Ltd',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.ott4future.com/favicon-512x512.png',
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    articleSection: opts.section,
    keywords: opts.keywords?.join(', '),
    wordCount: opts.wordCount,
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}
