import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';
import { SITE_NAME, SITE_URL } from './siteIdentity';
import { WORLDWIDE_APPLICANT_COUNTRIES } from './jobApplicantCountries';

export const CAREERS_EMAIL = 'info@ott4future.com';
export const CONTRACT_TERMS = 'These are independent-contractor engagements, billed monthly. Competitive day-rates, monthly invoicing and transparent contracts.';
export const REMOTE_POLICY = 'All roles are 100% remote. We prefer an EU-friendly time-zone overlap of at least 4 hours per day, but exceptional senior candidates worldwide are welcome to apply. Dublin HQ is available for those who want it, with no office mandate.';

// Original publication: the three engineering positions were added on 18 May 2026
// (repository commit 58c267257634e29f5fc2f8b73aa4326a5c1816ca).
// Keep dates editorial: rebuilding the site must not republish or extend a job.
export type Position = {
  id: string;
  title: string;
  location: string;
  type: string;
  stack: string[];
  summary: string;
  description: string;
  requirements: string[];
  glow: 'blue' | 'purple' | 'cyan';
  icon: ComponentProps<typeof Ionicons>['name'];
  datePosted: string;
  skillsLabel?: string;
  remotePolicy?: string;
  contractTerms?: string;
};

export const POSITIONS: Position[] = [
  {
    datePosted: '2026-10-22',
    id: 'freelance-sales-manager-europe',
    title: 'Freelance Sales Manager',
    location: 'Remote · European markets',
    type: 'Freelance · Independent contractor',
    stack: ['B2B SaaS', 'European markets', 'Trust management', 'Institutional sales', 'Partnerships', 'CRM'],
    skillsLabel: 'Markets & sales skills',
    summary:
      'Grow SmartTrust Protocol across Europe by building relationships with banks, trust companies, fiduciary firms and family offices.',
    description:
      'Own the commercial development of SmartTrust Protocol in European markets. Identify and qualify prospective organisations, build a pipeline of decision-makers, arrange product demonstrations with our team and guide opportunities from discovery through proposal and commercial follow-up. Present how the platform brings trust administration, multi-asset portfolios, legal and compliance workflows, beneficiary access and controlled distributions into one software environment. Work with the product team to understand customer needs, support pilot discussions and hand over new relationships for onboarding.',
    requirements: [
      'Proven experience in B2B software, SaaS or fintech sales and business development in European markets.',
      'Ability to engage senior stakeholders at banks, trust companies, fiduciary firms, family offices or professional-services organisations.',
      'A structured approach to prospecting, qualification, product demonstrations, proposals and CRM pipeline management.',
      'Confidence discussing trust administration and operational workflows, and the ability to learn SmartTrust Protocol in depth.',
      'Fluent professional English; additional European languages and an established institutional network are an advantage.',
      'Ability to work independently as a freelance professional and coordinate customer meetings across European time zones.',
    ],
    remotePolicy:
      'This is a 100% remote freelance role open to applicants worldwide, with a sales territory covering Europe. Coordinate prospect meetings and product demonstrations across European time zones. Work with On Time Technology Ltd, based in Dublin, with optional access to the Dublin HQ and no office mandate.',
    contractTerms:
      'Freelance independent-contractor engagement. Scope, commercial terms and working arrangements will be discussed and agreed directly before the engagement starts.',
    glow: 'cyan',
    icon: 'briefcase',
  },
  {
    datePosted: '2026-05-18',
    id: 'senior-ai-engineer',
    title: 'Senior AI Engineer',
    location: 'Remote · Dublin friendly',
    type: 'Freelance · Long-term contract',
    stack: ['Python', 'PyTorch', 'LLMs', 'RAG', 'LangChain', 'Vector DBs'],
    summary:
      'Lead the development of our AI-native platforms — from NoMoreFakeNews misinformation detectors to EU AI Act compliance tooling.',
    description:
      'You will architect, train and deploy production-grade AI systems for our flagship products. Expect to work on multimodal misinformation detection, retrieval-augmented generation pipelines, model governance and AI-safety frameworks aligned with the EU AI Act.',
    requirements: [
      '5+ years building production ML/AI systems (NLP, multimodal or LLM-based).',
      'Strong Python; fluency with PyTorch / Hugging Face / OpenAI / vector databases.',
      'Experience deploying models at scale (FastAPI, Docker, K8s, GPU inference).',
      'Comfort with model evaluation, red-teaming and AI governance (EU AI Act a plus).',
      'Excellent written English and ability to operate as a senior independent contributor.',
    ],
    glow: 'blue',
    icon: 'sparkles',
  },
  {
    datePosted: '2026-05-18',
    id: 'react-developer',
    title: 'React Developer',
    location: 'Remote · Europe time-zone',
    type: 'Freelance · Project-based or retainer',
    stack: ['React', 'React Native', 'Expo', 'TypeScript', 'Next.js', 'Tailwind'],
    summary:
      'Build the user-facing surfaces of our products — from the Custodiy custodial wallet to the Freety commodities-trading interface and our public sites.',
    description:
      'You will craft fast, accessible and beautiful UIs across web and mobile using React, React Native (Expo) and TypeScript. Expect to ship features end-to-end, collaborate with designers and integrate with our FastAPI/Node back-ends.',
    requirements: [
      '4+ years of professional React (and ideally React Native / Expo) experience.',
      'Strong TypeScript fundamentals and modern state-management patterns.',
      'Eye for design, animations, accessibility and Core Web Vitals performance.',
      'Comfort with REST/GraphQL APIs and CI/CD pipelines (Vercel, EAS, GitHub Actions).',
      'Self-driven, async-first communication and EU time-zone overlap.',
    ],
    glow: 'cyan',
    icon: 'logo-react',
  },
  {
    datePosted: '2026-05-18',
    id: 'blockchain-engineer',
    title: 'Blockchain Engineer',
    location: 'Remote · Worldwide',
    type: 'Freelance · Long-term contract',
    stack: ['Solidity', 'EVM', 'Hardhat', 'Foundry', 'Web3.js', 'Smart Contracts', 'L2s'],
    summary:
      'Engineer the smart-contract and on-chain infrastructure powering Custodiy and the tokenised commodity rails behind Freety.',
    description:
      'You will design, implement and audit smart contracts for custodial wallets, tokenised commodities and trust-minimised settlement flows. Expect to work across EVM L1/L2 networks, cryptographic primitives and high-assurance Solidity patterns.',
    requirements: [
      '4+ years of Solidity / EVM smart-contract engineering.',
      'Proven security mindset (Foundry / Slither / formal verification a plus).',
      'Experience with custodial wallet architectures, ERC-20/721/1155 and tokenisation.',
      'Understanding of MEV, gas-optimisation and L2 ecosystems (Arbitrum, Base, etc.).',
      'Strong written English and ability to ship production-grade audited code.',
    ],
    glow: 'purple',
    icon: 'cube',
  },
];


export function getPosition(id: string) {
  return POSITIONS.find((position) => position.id === id);
}

export function positionRemotePolicy(position: Position) {
  return position.remotePolicy || REMOTE_POLICY;
}

export function positionContractTerms(position: Position) {
  return position.contractTerms || CONTRACT_TERMS;
}

export function positionUrl(position: Position) {
  return `${SITE_URL}careers/${position.id}`;
}

export function applicationHref(position: Position) {
  // Expo Router can move query parameters behind a hash on hydration. The
  // focused careers form handles scrolling after layout, so no hash is needed.
  return `/careers?role=${position.id}`;
}

export function applicationEmailHref(position: Position) {
  const subject = encodeURIComponent(`Application — ${position.title} — On Time Technology`);
  const body = encodeURIComponent(`Hi On Time Technology team,\n\nI'd like to apply for the ${position.title} freelance position.\n\nA bit about me:\n- LinkedIn:\n- Portfolio / GitHub:\n- Years of experience:\n- Notable projects:\n\nThanks,\n`);
  return `mailto:${CAREERS_EMAIL}?subject=${subject}&body=${body}`;
}

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

// JobPosting belongs only on each individual job page, never on the listing.
export function jobPostingSchema(position: Position) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    '@id': `${positionUrl(position)}#job`,
    identifier: { '@type': 'PropertyValue', name: SITE_NAME, value: position.id },
    title: position.title,
    description: `<p>${escapeHtml(position.summary)}</p><p>${escapeHtml(position.description)}</p><p>${escapeHtml(position.type)}</p><p>${escapeHtml(positionRemotePolicy(position))}</p><p>${escapeHtml(positionContractTerms(position))}</p><p>What you bring:</p><ul>${position.requirements.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul><p>${escapeHtml(position.skillsLabel || 'Tech stack')}: ${escapeHtml(position.stack.join(', '))}.</p><p>Apply using the application form or email ${CAREERS_EMAIL}.</p>`,
    datePosted: position.datePosted,
    // No closing date has been supplied. Do not invent a rolling validThrough.
    employmentType: 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: SITE_NAME,
      sameAs: SITE_URL,
      logo: `${SITE_URL}icon-512.png`,
    },
    jobLocationType: 'TELECOMMUTE',
    // Preserve worldwide eligibility using real countries, rather than a
    // fictional Country named Worldwide or limiting discovery to Dublin.
    applicantLocationRequirements: WORLDWIDE_APPLICANT_COUNTRIES.map((name) => ({
      '@type': 'Country',
      name,
    })),
    // The existing hiring policy also offers optional work at the Dublin HQ.
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: 'Dublin', addressCountry: 'IE' },
    },
    skills: position.stack.join(', '),
    url: positionUrl(position),
  };
}
