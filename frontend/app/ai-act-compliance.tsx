import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import PageShell from '../src/components/PageShell';
import GlassCard from '../src/components/GlassCard';
import GradientText from '../src/components/GradientText';
import PageSEO, { breadcrumbsSchema, faqSchema } from '../src/components/PageSEO';
import Breadcrumbs from '../src/components/Breadcrumbs';
import { colors, radii, space } from '../src/theme/tokens';

const FAQ_ITEMS = [
  {
    question: 'What is the EU AI Act and who does it apply to?',
    answer:
      'The EU AI Act is the European Union\u2019s comprehensive regulation on artificial intelligence, in force since 2024 and gradually applicable through 2026\u20132027. It applies to providers, deployers, importers and distributors of AI systems that are placed on the EU market or whose output is used inside the EU \u2014 regardless of where the company is based.',
  },
  {
    question: 'Does the EU AI Act apply to startups in Ireland?',
    answer:
      'Yes. Irish startups developing or deploying AI systems in the EU must comply with the AI Act. Ireland\u2019s designated competent authority will supervise enforcement. SMEs benefit from proportional obligations and access to AI sandboxes, but high-risk systems still require full conformity assessment.',
  },
  {
    question: 'What is a "high-risk" AI system under the Act?',
    answer:
      'High-risk AI systems are those listed in Annex III (e.g. biometrics, critical infrastructure, education, employment, essential services, law enforcement, migration, justice, democratic processes) or those used as safety components of regulated products. They must meet strict requirements: risk management, data governance, technical documentation, transparency, human oversight, accuracy and cybersecurity.',
  },
  {
    question: 'What are the penalties for non-compliance with the AI Act?',
    answer:
      'Penalties scale by severity: up to \u20ac35M or 7% of global annual turnover for prohibited AI uses, up to \u20ac15M or 3% for breach of high-risk requirements, and up to \u20ac7.5M or 1% for providing incorrect information to authorities. SMEs benefit from proportionate caps.',
  },
  {
    question: 'When does the EU AI Act fully apply?',
    answer:
      'The Act entered into force in August 2024. Prohibited AI practices became applicable in February 2025; rules on general-purpose AI models from August 2025; high-risk AI system requirements (Annex III) apply by August 2026; full applicability across all categories is reached by August 2027.',
  },
  {
    question: 'How can On Time Technology help with EU AI Act compliance?',
    answer:
      'We help organisations classify their AI systems, map obligations, set up risk-management and post-market monitoring processes, prepare technical documentation, integrate provenance and transparency signals into products, and design human-oversight workflows. Our experience building AI-native platforms (NoMoreFakeNews, Freety) means we ship compliance as engineering, not paperwork.',
  },
];

const RISK_TIERS = [
  { tier: 'Unacceptable', desc: 'Prohibited practices: social scoring, manipulative subliminal AI, untargeted facial-recognition scraping, real-time biometric ID in public spaces (with narrow exceptions).', color: '#EF4444' },
  { tier: 'High', desc: 'Annex III & safety components: biometrics, critical infrastructure, education, employment, essential services, law enforcement, migration, justice, democratic processes.', color: '#F59E0B' },
  { tier: 'Limited', desc: 'Transparency obligations: chatbots, emotion recognition, deepfakes, AI-generated content disclosure to end users.', color: '#3B82F6' },
  { tier: 'Minimal', desc: 'Most AI uses (spam filters, AI in video games, productivity assistants) \u2014 voluntary codes of conduct.', color: '#10B981' },
];

const REQ_SECTIONS = [
  { icon: 'analytics', title: 'Risk Management System', body: 'Continuous, iterative process across the AI lifecycle: identify, analyse, evaluate and mitigate reasonably foreseeable risks. Document residual risks.' },
  { icon: 'cube', title: 'Data Governance', body: 'Training, validation and testing datasets must be relevant, representative and free of errors. Bias examination is mandatory, with data-quality criteria documented.' },
  { icon: 'document-text', title: 'Technical Documentation', body: 'Comprehensive file covering system architecture, training methodology, validation, monitoring plan and conformity assessment \u2014 ready to share with national authorities.' },
  { icon: 'eye', title: 'Transparency & Logging', body: 'Automated event logging for traceability. Users must be informed when they interact with an AI system; outputs must be marked as AI-generated where applicable.' },
  { icon: 'person', title: 'Human Oversight', body: 'AI systems must be designed so that natural persons can effectively oversee operation, interpret outputs, and intervene or override decisions.' },
  { icon: 'shield-checkmark', title: 'Accuracy, Robustness, Cybersecurity', body: 'Demonstrate adequate accuracy levels, resilience to errors and adversarial attacks, and document cybersecurity measures throughout the lifecycle.' },
];

const TIMELINE = [
  { date: 'Aug 2024', label: 'AI Act enters into force' },
  { date: 'Feb 2025', label: 'Prohibited practices apply' },
  { date: 'Aug 2025', label: 'Rules on GPAI models apply' },
  { date: 'Aug 2026', label: 'High-risk requirements apply' },
  { date: 'Aug 2027', label: 'Full applicability \u2014 all provisions in force' },
];

export default function AIActComplianceScreen() {
  const router = useRouter();
  const dims = useWindowDimensions();
  const width = dims.width || 1200;
  const isDesktop = width >= 900;

  return (
    <PageShell>
      <PageSEO
        title="EU AI Act Compliance Guide 2026 — Checklist for Developers & Startups"
        description="Comprehensive 2026 guide to EU AI Act compliance for software developers, startups and SMEs in Ireland and the EU. Risk categories, high-risk system requirements, timeline, penalties and a practical compliance checklist by On Time Technology."
        canonical="https://www.ott4future.com/ai-act-compliance"
        keywords="EU AI Act compliance, checklist AI Act per sviluppatori, high-risk AI system requirements Irlanda, EU AI Act 2026, AI Act per startup, conformità EU AI Act, AI Act timeline, AI Act penalties"
        schema={[
          breadcrumbsSchema([
            { name: 'Home', url: 'https://www.ott4future.com/' },
            { name: 'AI Act Compliance', url: 'https://www.ott4future.com/ai-act-compliance' },
          ]),
          faqSchema(FAQ_ITEMS),
          {
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: 'EU AI Act Compliance Guide 2026 — for Developers, Startups & SMEs',
            description: 'Complete EU AI Act compliance guide: risk tiers, high-risk requirements, timeline, penalties and a practical checklist for software teams.',
            url: 'https://www.ott4future.com/ai-act-compliance',
            inLanguage: 'en-GB',
            datePublished: '2026-02-15',
            dateModified: '2026-02-15',
            author: { '@type': 'Organization', name: 'On Time Technology Ltd' },
            publisher: {
              '@type': 'Organization',
              name: 'On Time Technology Ltd',
              logo: { '@type': 'ImageObject', url: 'https://www.ott4future.com/favicon-512x512.png' },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.ott4future.com/ai-act-compliance' },
            about: { '@type': 'Thing', name: 'EU Artificial Intelligence Act' },
            keywords: 'EU AI Act, AI Act compliance, AI Act checklist, high-risk AI systems, AI regulation Ireland',
          },
        ]}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'AI Act Compliance' },
        ]}
      />

      <View style={styles.hero}>
        <View style={styles.eyebrow}>
          <Ionicons name="shield-checkmark" size={12} color={colors.cyan} />
          <Text style={styles.eyebrowText}>EU AI ACT · COMPLIANCE GUIDE · 2026</Text>
        </View>
        <Text style={[styles.title, !isDesktop && styles.titleMobile]} accessibilityRole="header">
          EU AI Act Compliance Guide{' '}
          <GradientText style={styles.titleGrad} colors={['#60A5FA', '#A855F7', '#22D3EE']}>
            for developers, startups and SMEs
          </GradientText>
        </Text>
        <Text style={styles.subtitle}>
          A practical 2026 guide to the EU Artificial Intelligence Act — written for engineering teams, product
          managers and founders shipping AI systems in Ireland and the wider European Union. Risk categories,
          high-risk requirements, timeline, penalties and a downloadable compliance checklist.
        </Text>

        <View style={styles.ctaRow}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/resources')}>
            <Ionicons name="download-outline" size={16} color="#fff" />
            <Text style={styles.primaryBtnText}>Download the AI Act checklist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ghostBtn} onPress={() => router.push('/contact')}>
            <Text style={styles.ghostBtnText}>Talk to our team</Text>
            <Ionicons name="arrow-forward" size={14} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* TOC */}
      <View style={styles.tocWrap}>
        <GlassCard style={styles.tocCard}>
          <Text style={styles.tocTitle}>On this page</Text>
          <View style={styles.tocList}>
            {[
              { label: '1. What is the EU AI Act?', anchor: 'intro' },
              { label: '2. Risk Categories', anchor: 'risk' },
              { label: '3. High-Risk Requirements', anchor: 'requirements' },
              { label: '4. Compliance Timeline', anchor: 'timeline' },
              { label: '5. Penalties', anchor: 'penalties' },
              { label: '6. Compliance Checklist', anchor: 'checklist' },
              { label: '7. How OTT helps', anchor: 'how' },
              { label: '8. FAQ', anchor: 'faq' },
            ].map((it) => (
              <Text key={it.anchor} style={styles.tocItem}>
                {it.label}
              </Text>
            ))}
          </View>
        </GlassCard>
      </View>

      {/* 1. INTRO */}
      <Section title="1. What is the EU AI Act?" subtitle="The first horizontal AI regulation in the world.">
        <Para>
          The <Bold>EU Artificial Intelligence Act</Bold> (Regulation (EU) 2024/1689) is the first comprehensive
          legal framework for artificial intelligence in the world. It entered into force in <Bold>August 2024</Bold>
          {' '}and applies progressively until <Bold>August 2027</Bold>. The Act establishes a risk-based approach to AI
          governance, balancing innovation with the protection of fundamental rights, health, safety and democracy.
        </Para>
        <Para>
          Its scope is wide: it applies to <Bold>providers</Bold> placing AI systems on the EU market, to
          <Bold> deployers</Bold> using them inside the EU, to <Bold>importers and distributors</Bold>, and even to
          providers located <Bold>outside the EU</Bold> when the output of their AI system is used within the Union.
          For Irish and UK software houses serving European customers, this means the AI Act is effectively
          unavoidable.
        </Para>
        <Para>
          The Act is implemented at national level by competent authorities. In Ireland, the supervisory framework
          is being built around existing market-surveillance authorities, with dedicated <Bold>AI sandboxes</Bold>
          {' '}to support SMEs and startups testing innovative systems before placing them on the market.
        </Para>
      </Section>

      {/* 2. RISK CATEGORIES */}
      <Section title="2. The four risk categories" subtitle="Not all AI is regulated the same way.">
        <Para>
          The AI Act adopts a <Bold>risk-based approach</Bold>. Instead of regulating AI as a technology, it
          regulates <Bold>specific uses</Bold> of AI systems and classifies them into four tiers. Knowing which
          tier your system belongs to is the single most important compliance decision you will make.
        </Para>
        <View style={[styles.tierGrid, !isDesktop && styles.tierGridMobile]}>
          {RISK_TIERS.map((t) => (
            <GlassCard key={t.tier} style={styles.tierCard}>
              <View style={[styles.tierBadge, { backgroundColor: t.color }]} />
              <Text style={styles.tierTitle}>{t.tier} Risk</Text>
              <Text style={styles.tierBody}>{t.desc}</Text>
            </GlassCard>
          ))}
        </View>
      </Section>

      {/* 3. HIGH-RISK REQUIREMENTS */}
      <Section title="3. Requirements for high-risk AI systems" subtitle="What you must demonstrate before placing the system on the market.">
        <Para>
          If your AI system falls under <Bold>Annex III</Bold> (e.g. biometrics, employment, education,
          critical infrastructure, justice, migration) or operates as a safety component of a regulated product,
          it is classified as <Bold>high-risk</Bold>. Before placing it on the market, you must implement a
          full conformity-assessment process and meet the following six requirement areas.
        </Para>
        <View style={[styles.reqGrid, !isDesktop && styles.reqGridMobile]}>
          {REQ_SECTIONS.map((r) => (
            <GlassCard key={r.title} glow="blue" style={styles.reqCard}>
              <View style={styles.reqIcon}><Ionicons name={r.icon as any} size={20} color={colors.cyan} /></View>
              <Text style={styles.reqTitle}>{r.title}</Text>
              <Text style={styles.reqBody}>{r.body}</Text>
            </GlassCard>
          ))}
        </View>
      </Section>

      {/* 4. TIMELINE */}
      <Section title="4. Compliance timeline" subtitle="What kicks in, and when.">
        <Para>
          The AI Act applies progressively through 2027. Use this timeline to plan your roadmap. Note that the
          <Bold> prohibited practices </Bold>
          have already been enforceable since February 2025 — do not assume you still have time on those.
        </Para>
        <View style={styles.timeline}>
          {TIMELINE.map((t, idx) => (
            <View key={t.date} style={styles.timelineRow}>
              <View style={styles.timelineDot} />
              {idx < TIMELINE.length - 1 && <View style={styles.timelineLine} />}
              <View style={styles.timelineContent}>
                <Text style={styles.timelineDate}>{t.date}</Text>
                <Text style={styles.timelineLabel}>{t.label}</Text>
              </View>
            </View>
          ))}
        </View>
      </Section>

      {/* 5. PENALTIES */}
      <Section title="5. Penalties for non-compliance" subtitle="Maximum exposure and SME caps.">
        <Para>
          The Act introduces severe administrative fines, calibrated by category of violation and capped for SMEs.
          As of 2026, providers and deployers should treat these as serious business risk, not theoretical
          exposure.
        </Para>
        <View style={[styles.tierGrid, !isDesktop && styles.tierGridMobile]}>
          <GlassCard style={styles.penaltyCard}><Text style={styles.penaltyAmount}>€35M / 7%</Text><Text style={styles.penaltyBody}>Prohibited AI practices (whichever is higher of fixed amount or % of global annual turnover).</Text></GlassCard>
          <GlassCard style={styles.penaltyCard}><Text style={styles.penaltyAmount}>€15M / 3%</Text><Text style={styles.penaltyBody}>Breach of high-risk system requirements or obligations on providers / deployers.</Text></GlassCard>
          <GlassCard style={styles.penaltyCard}><Text style={styles.penaltyAmount}>€7.5M / 1%</Text><Text style={styles.penaltyBody}>Supply of incorrect, incomplete or misleading information to competent authorities.</Text></GlassCard>
        </View>
      </Section>

      {/* 6. CHECKLIST */}
      <Section title="6. Compliance Checklist for engineering teams" subtitle="Ten practical steps to start this week.">
        <View style={styles.checklist}>
          {[
            'Inventory every AI system, model or third-party API your product uses.',
            'Classify each system against the four AI Act risk tiers.',
            'For high-risk systems, set up a written risk-management process.',
            'Document the training, validation and test datasets (with bias examination).',
            'Implement automated logging of system events for traceability.',
            'Define a human-oversight model — who can intervene, override, audit.',
            'Prepare a technical-documentation file aligned with Annex IV.',
            'Plan a conformity-assessment procedure (internal or notified body).',
            'Build post-market monitoring and incident-reporting workflows.',
            'Update terms of service & user-facing transparency disclosures.',
          ].map((step, idx) => (
            <View key={idx} style={styles.checkRow}>
              <View style={styles.checkBadge}><Text style={styles.checkBadgeText}>{idx + 1}</Text></View>
              <Text style={styles.checkText}>{step}</Text>
            </View>
          ))}
        </View>
        <View style={{ alignItems: 'flex-start', marginTop: 14 }}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/resources')}>
            <Ionicons name="download-outline" size={16} color="#fff" />
            <Text style={styles.primaryBtnText}>Download as PDF</Text>
          </TouchableOpacity>
        </View>
      </Section>

      {/* 7. HOW WE HELP */}
      <Section title="7. How On Time Technology helps" subtitle="Compliance as engineering, not paperwork.">
        <Para>
          On Time Technology is an Irish-registered IT company based in Dublin. We have built
          AI-native platforms in production — including <Bold>NoMoreFakeNews</Bold> (real-time disinformation
          detection), <Bold>Freety</Bold> (AI-driven commodity trading) and special-projects R&D — which gives us
          a working understanding of where AI Act obligations meet day-to-day engineering reality.
        </Para>
        <Para>
          We support clients across three workstreams: <Bold>classification & gap analysis</Bold> (mapping each
          AI system against AI Act obligations), <Bold>compliance engineering</Bold> (risk-management, logging,
          oversight, provenance signals integrated into the codebase) and <Bold>documentation & assessment</Bold>
          {' '}(building the Annex IV technical file and supporting the conformity assessment process).
        </Para>
      </Section>

      {/* 8. FAQ */}
      <Section title="8. Frequently asked questions" subtitle="The questions our clients ask most.">
        <View style={styles.faqList}>
          {FAQ_ITEMS.map((f) => (
            <GlassCard key={f.question} style={styles.faqCard}>
              <Text style={styles.faqQuestion}>{f.question}</Text>
              <Text style={styles.faqAnswer}>{f.answer}</Text>
            </GlassCard>
          ))}
        </View>
      </Section>

      {/* CTA */}
      <View style={styles.ctaSection}>
        <GlassCard glow="purple" style={styles.ctaCard}>
          <LinearGradient
            colors={['rgba(59,130,246,0.18)', 'rgba(168,85,247,0.18)', 'rgba(34,211,238,0.18)']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill as any}
          />
          <Text style={styles.ctaEyebrow}>READY TO START?</Text>
          <Text style={[styles.ctaTitle, !isDesktop && { fontSize: 28, lineHeight: 36 }]}>
            Turn the AI Act into a competitive advantage.
          </Text>
          <Text style={styles.ctaBody}>
            We help organisations move from regulatory anxiety to a clean, audit-ready AI compliance posture —
            with engineering, not paperwork.
          </Text>
          <View style={styles.ctaButtons}>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/contact')}>
              <Text style={styles.primaryBtnText}>Book a consultation</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ghostBtn} onPress={() => router.push('/blog')}>
              <Text style={styles.ghostBtnText}>Read more on the blog</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>
      </View>
    </PageShell>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
      <View style={{ marginTop: 18 }}>{children}</View>
    </View>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return <Text style={styles.paragraph}>{children}</Text>;
}

function Bold({ children }: { children: React.ReactNode }) {
  return <Text style={styles.bold}>{children}</Text>;
}

const styles = StyleSheet.create({
  hero: { maxWidth: 980, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingTop: space.xl, paddingBottom: space.lg },
  eyebrow: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, backgroundColor: colors.bgCard, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border, marginBottom: 18 },
  eyebrowText: { color: colors.cyan, fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  title: { color: colors.text, fontSize: 56, lineHeight: 64, fontWeight: '900', letterSpacing: -1.5 },
  titleMobile: { fontSize: 34, lineHeight: 40, letterSpacing: -0.8 },
  titleGrad: { fontSize: 56, lineHeight: 64, fontWeight: '900', letterSpacing: -1.5 } as any,
  subtitle: { color: colors.textMuted, fontSize: 17, lineHeight: 28, marginTop: 18, maxWidth: 820 },
  ctaRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', marginTop: 24 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#3B82F6', paddingHorizontal: 22, paddingVertical: 13, borderRadius: radii.pill },
  primaryBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  ghostBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 18, paddingVertical: 12, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: 'rgba(255,255,255,0.02)' },
  ghostBtnText: { color: colors.text, fontSize: 14, fontWeight: '600' },

  tocWrap: { maxWidth: 980, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, marginTop: space.md, marginBottom: space.lg },
  tocCard: { padding: 22 },
  tocTitle: { color: colors.cyan, fontSize: 11, fontWeight: '800', letterSpacing: 1.6, marginBottom: 12 },
  tocList: { gap: 8 },
  tocItem: { color: colors.textMuted, fontSize: 14, fontWeight: '500' },

  section: { maxWidth: 980, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingTop: space.xl, paddingBottom: space.md },
  sectionTitle: { color: colors.text, fontSize: 30, fontWeight: '900', letterSpacing: -0.6, lineHeight: 38 },
  sectionSubtitle: { color: colors.cyan, fontSize: 13, fontWeight: '700', letterSpacing: 0.4, marginTop: 6 },
  paragraph: { color: colors.text, fontSize: 16.5, lineHeight: 28, marginBottom: 16 },
  bold: { fontWeight: '800', color: colors.text },

  tierGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 10 },
  tierGridMobile: { flexDirection: 'column' },
  tierCard: { flex: 1, minWidth: 220, padding: 18, gap: 10 },
  tierBadge: { width: 36, height: 6, borderRadius: 6 },
  tierTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  tierBody: { color: colors.textMuted, fontSize: 13.5, lineHeight: 21 },

  reqGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 10 },
  reqGridMobile: { flexDirection: 'column' },
  reqCard: { flex: 1, minWidth: 280, padding: 20, gap: 10 },
  reqIcon: { width: 36, height: 36, borderRadius: radii.md, backgroundColor: 'rgba(34,211,238,0.15)', alignItems: 'center', justifyContent: 'center' },
  reqTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  reqBody: { color: colors.textMuted, fontSize: 13.5, lineHeight: 21 },

  timeline: { paddingLeft: 12, marginTop: 12 },
  timelineRow: { flexDirection: 'row', alignItems: 'flex-start', paddingBottom: 18, position: 'relative' },
  timelineDot: { width: 12, height: 12, borderRadius: 12, backgroundColor: colors.cyan, marginRight: 16, marginTop: 6 },
  timelineLine: { position: 'absolute', left: 5.5, top: 18, bottom: 0, width: 1, backgroundColor: colors.border },
  timelineContent: { flex: 1 },
  timelineDate: { color: colors.cyan, fontSize: 13, fontWeight: '800', letterSpacing: 0.6 },
  timelineLabel: { color: colors.text, fontSize: 15.5, fontWeight: '600', marginTop: 3, lineHeight: 22 },

  penaltyCard: { flex: 1, minWidth: 220, padding: 20, gap: 8 },
  penaltyAmount: { color: colors.text, fontSize: 26, fontWeight: '900', letterSpacing: -0.5 },
  penaltyBody: { color: colors.textMuted, fontSize: 13.5, lineHeight: 21 },

  checklist: { gap: 10, marginTop: 6 },
  checkRow: { flexDirection: 'row', gap: 12, padding: 14, backgroundColor: colors.bgCard, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, alignItems: 'flex-start' },
  checkBadge: { width: 26, height: 26, borderRadius: 13, backgroundColor: 'rgba(34,211,238,0.18)', alignItems: 'center', justifyContent: 'center' },
  checkBadgeText: { color: colors.cyan, fontSize: 12, fontWeight: '800' },
  checkText: { flex: 1, color: colors.text, fontSize: 14.5, lineHeight: 22 },

  faqList: { gap: 12, marginTop: 6 },
  faqCard: { padding: 20, gap: 8 },
  faqQuestion: { color: colors.text, fontSize: 16, fontWeight: '800' },
  faqAnswer: { color: colors.textMuted, fontSize: 14.5, lineHeight: 23 },

  ctaSection: { maxWidth: 980, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: space.xxxl },
  ctaCard: { paddingVertical: 44, paddingHorizontal: 32, position: 'relative', overflow: 'hidden', alignItems: 'center' },
  ctaEyebrow: { color: colors.cyan, fontSize: 11, fontWeight: '800', letterSpacing: 1.8, marginBottom: 8 },
  ctaTitle: { color: colors.text, fontSize: 34, fontWeight: '900', textAlign: 'center', letterSpacing: -0.8, lineHeight: 42 },
  ctaBody: { color: colors.textMuted, fontSize: 16, lineHeight: 26, textAlign: 'center', marginTop: 14, marginBottom: 22, maxWidth: 580 },
  ctaButtons: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
});
