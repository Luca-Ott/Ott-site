export const SITE_NAME = 'On Time Technology LTD';
export const SITE_URL = 'https://www.ott4future.com/';
export const HOME_TITLE = `${SITE_NAME} — Software, AI & R&D`;
export const HOME_DESCRIPTION = `${SITE_NAME} is an Irish IT company based in Dublin, specialising in software design, development, AI and R&D. Discover SmartTrust, NoMoreFakeNews, Custodiy and Freety.`;

export const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: SITE_NAME,
  legalName: SITE_NAME,
  alternateName: ['On Time Technology'],
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}icon-512.png`, width: 512, height: 512 },
  description: HOME_DESCRIPTION,
  email: 'Info@ott4future.com',
  telephone: '+44-7775-682831',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'The Black Church, St Mary’s Place',
    addressLocality: 'Dublin',
    postalCode: 'D07 P4AX',
    addressCountry: 'IE',
  },
  sameAs: ['https://x.com/OnTechnolo1200'],
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

// Use one shared WebSite identity, emitted in the initial HTML by +html.tsx.
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  name: SITE_NAME,
  alternateName: ['On Time Technology'],
  url: SITE_URL,
  inLanguage: 'en-GB',
  publisher: { '@id': `${SITE_URL}#organization` },
};
