import type { FullArticle } from './blog';

// Literal imports let Metro include complete articles during both export and client navigation.
import article0 from '../../public/blog/why-dublin-is-emerging-as-europes-most-strategic-hub-for-applied-ai.json';
import article1 from '../../public/blog/tokenised-commodities-in-2026-onchain-markets-ai-risk-engines-and-eu-rules.json';
import article2 from '../../public/blog/custodial-crypto-wallets-in-ireland-mica-casp-licensing-and-architecture-in-2026.json';
import article3 from '../../public/blog/inside-an-ai-fake-news-detector-pipelines-graphs-and-human-oversight.json';
import article4 from '../../public/blog/deepfake-defence-in-2026-multimodal-ai-watermarks-and-provenance-at-scale.json';
import article5 from '../../public/blog/a-7step-eu-ai-act-gap-analysis-methodology-for-existing-ai-products.json';
import article6 from '../../public/blog/highrisk-ai-under-the-eu-ai-act-a-practical-conformity-blueprint-for-ireland.json';
import article7 from '../../public/blog/eu-ai-act-compliance-for-irish-startups-in-2026-a-practical-engineering-playbook.json';
import article8 from '../../public/blog/zero-knowledge-identity-layers-rethinking-kyc-for-institutional-finance.json';
import article9 from '../../public/blog/ai-agents-as-cloud-conductors-orchestrating-multi-cloud-cost-intelligence.json';
import article10 from '../../public/blog/designing-software-that-ages-well-architectures-for-mission-critical-longevity.json';
import article11 from '../../public/blog/why-strategic-special-projects-are-the-rd-engine-of-the-next-decade.json';
import article12 from '../../public/blog/from-lab-to-live-systems-industrialising-research-in-software-engineering.json';
import article13 from '../../public/blog/cyber-resilience-vs-autonomous-attackers-redesigning-defence-for-ai-threats.json';
import article14 from '../../public/blog/modular-escrow-and-otc-platforms-programmable-trust-for-digital-commerce.json';
import article15 from '../../public/blog/tokenising-commodities-when-cargo-energy-and-metals-go-onchain.json';
import article16 from '../../public/blog/beyond-fake-news-architecting-trust-infrastructure-for-the-posttruth-internet.json';
import article17 from '../../public/blog/how-generative-ai-agents-are-rearchitecting-enterprise-software-in-2026.json';

const articles: FullArticle[] = [
  article0,
  article1,
  article2,
  article3,
  article4,
  article5,
  article6,
  article7,
  article8,
  article9,
  article10,
  article11,
  article12,
  article13,
  article14,
  article15,
  article16,
  article17,
];

const articlesBySlug = new Map(articles.map((article) => [article.slug, article]));

export function getArticleBySlug(slug: string): FullArticle | null {
  return articlesBySlug.get(slug) ?? null;
}
