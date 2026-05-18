import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Linking,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import PageShell from '../src/components/PageShell';
import GlassCard from '../src/components/GlassCard';
import GradientText from '../src/components/GradientText';
import ScrollReveal from '../src/components/ScrollReveal';
import PageSEO, { breadcrumbsSchema, faqSchema } from '../src/components/PageSEO';
import Breadcrumbs from '../src/components/Breadcrumbs';
import { colors, radii, space } from '../src/theme/tokens';

const CAREERS_EMAIL = 'info@ott4future.com';
const FORMSPREE_URL = 'https://formspree.io/f/mvzgazqk';

type Position = {
  id: string;
  title: string;
  location: string;
  type: string;
  stack: string[];
  summary: string;
  description: string;
  requirements: string[];
  glow: 'blue' | 'purple' | 'cyan';
  icon: any;
};

const POSITIONS: Position[] = [
  {
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

const PERKS = [
  {
    icon: 'rocket-outline' as const,
    title: 'Frontier work, no busywork',
    desc:
      'Every brief is rooted in real R&D — EU AI Act, anti-disinformation AI, custodial finance, tokenised commodities.',
  },
  {
    icon: 'globe-outline' as const,
    title: '100% remote, EU-friendly',
    desc:
      'Work from anywhere. Async-first culture, Dublin HQ for those who want it, no office mandate.',
  },
  {
    icon: 'cash-outline' as const,
    title: 'Senior freelance rates',
    desc:
      'Competitive day-rates, monthly invoicing, transparent contracts — paid like the senior specialist you are.',
  },
  {
    icon: 'flash-outline' as const,
    title: 'Ship to real users, fast',
    desc:
      'Small teams, no committees. Your code reaches production in days, not months.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Are these positions employee roles or freelance contracts?',
    answer:
      'All currently open positions at On Time Technology are senior freelance / independent-contractor contracts, billed monthly. Long-term, retainer and project-based engagements are all available.',
  },
  {
    question: 'Do I need to be based in Ireland or the EU?',
    answer:
      'No. All roles are 100% remote. We do prefer an EU-friendly time-zone overlap of at least 4 hours per day, but exceptional senior candidates worldwide are welcome to apply.',
  },
  {
    question: 'What does the selection process look like?',
    answer:
      'Step 1: short intro call. Step 2: technical interview tailored to the role (live coding, system design or smart-contract review). Step 3: paid trial assignment. Step 4: contract & onboarding. Typical timeline: 2 to 3 weeks.',
  },
  {
    question: 'Can I send my CV even if no position matches exactly?',
    answer:
      'Yes. We always welcome senior AI, full-stack, mobile, blockchain and security engineers. Use the form below or email us at info@ott4future.com — we keep an active talent pipeline.',
  },
];

export default function CareersScreen() {
  const router = useRouter();
  const dims = useWindowDimensions();
  const width = dims.width || 1200;
  const isDesktop = width >= 900;
  const isTablet = width >= 640;

  const heroFs = isDesktop ? 64 : width < 400 ? 30 : width < 600 ? 38 : 48;
  const heroLh = Math.round(heroFs * 1.14);
  const heroLs = isDesktop ? -1.6 : -0.7;
  const sectionFs = isDesktop ? 40 : width < 400 ? 24 : width < 600 ? 28 : 34;
  const sectionLh = Math.round(sectionFs * 1.18);

  const formRef = useRef<View>(null);
  const scrollRef = useRef<ScrollView>(null);

  // Form state
  const [selectedRole, setSelectedRole] = useState<string>(POSITIONS[0].title);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const showAlert = (title: string, msg: string) => {
    if (typeof window !== 'undefined') window.alert(`${title}: ${msg}`);
    else Alert.alert(title, msg);
  };

  const scrollToForm = (roleTitle?: string) => {
    if (roleTitle) setSelectedRole(roleTitle);
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const el = document.getElementById('apply');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openMailto = (roleTitle: string) => {
    const subject = encodeURIComponent(`Application — ${roleTitle} — On Time Technology`);
    const body = encodeURIComponent(
      `Hi On Time Technology team,\n\nI'd like to apply for the ${roleTitle} freelance position.\n\nA bit about me:\n- LinkedIn:\n- Portfolio / GitHub:\n- Years of experience:\n- Notable projects:\n\nThanks,\n`
    );
    const href = `mailto:${CAREERS_EMAIL}?subject=${subject}&body=${body}`;
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined') window.location.href = href;
    } else {
      Linking.openURL(href);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      return showAlert('Missing fields', 'Please fill in name, email and message.');
    }
    if (!email.includes('@')) {
      return showAlert('Invalid email', 'Please enter a valid email address.');
    }
    setLoading(true);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          role: selectedRole,
          linkedin,
          portfolio,
          message,
          _subject: `New Application — ${selectedRole} — On Time Technology`,
        }),
      });
      if (res.ok) {
        router.replace('/contact-success');
      } else {
        const data = await res.json().catch(() => ({}));
        showAlert('Error', data.error || data.errors?.[0]?.message || 'Failed to submit application.');
      }
    } catch (e) {
      showAlert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // JSON-LD JobPosting schema (one per position) — boosts Google Jobs eligibility
  const today = new Date();
  const validThrough = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const datePosted = today.toISOString().split('T')[0];

  const jobPostings = POSITIONS.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: p.title,
    description: `${p.summary} ${p.description} Required: ${p.requirements.join(' ')}`,
    datePosted,
    validThrough,
    employmentType: 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'On Time Technology Ltd',
      sameAs: 'https://www.ott4future.com',
      logo: 'https://www.ott4future.com/favicon-512x512.png',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dublin',
        addressCountry: 'IE',
      },
    },
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: [
      { '@type': 'Country', name: 'Worldwide' },
    ],
    directApply: false,
    skills: p.stack.join(', '),
    url: `https://www.ott4future.com/careers#${p.id}`,
  }));

  return (
    <PageShell>
      <PageSEO
        title="Careers at On Time Technology — Freelance AI, React & Blockchain Roles"
        description="Join On Time Technology — Irish AI software company hiring senior freelance AI engineers, React developers and blockchain engineers. 100% remote, EU-friendly, frontier R&D work."
        canonical="https://www.ott4future.com/careers"
        keywords="careers On Time Technology, freelance AI engineer Ireland, freelance React developer remote, freelance blockchain engineer, ott4future jobs, remote AI jobs EU, Dublin tech jobs"
        schema={[
          breadcrumbsSchema([
            { name: 'Home', url: 'https://www.ott4future.com/' },
            { name: 'Careers', url: 'https://www.ott4future.com/careers' },
          ]),
          ...jobPostings,
          faqSchema(FAQ_ITEMS),
        ]}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ width: '100%' }}
      >
        {/* Back button */}
        <View style={styles.backWrap}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
          >
            <Ionicons name="arrow-back" size={16} color={colors.text} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Breadcrumbs */}
        <View style={styles.breadcrumbsWrap}>
          <Breadcrumbs
            items={[
              { name: 'Home', url: '/' },
              { name: 'Careers', url: '/careers' },
            ]}
          />
        </View>

        {/* ============================ HERO ============================ */}
        <View style={styles.hero}>
          <View style={styles.eyebrowPill}>
            <View style={styles.eyebrowDot} />
            <Text style={styles.eyebrowText}>FREELANCE · REMOTE · AI-FIRST</Text>
          </View>
          <Text
            style={[
              styles.heroTitle,
              { fontSize: heroFs, lineHeight: heroLh, letterSpacing: heroLs },
            ]}
          >
            Work with us on{'\n'}
            <GradientText
              style={{
                fontSize: heroFs,
                lineHeight: heroLh,
                letterSpacing: heroLs,
                fontWeight: '900',
              }}
              colors={['#60A5FA', '#A855F7', '#22D3EE']}
            >
              frontier technology
            </GradientText>
          </Text>
          <Text style={styles.heroSub}>
            We are an Irish AI-native software house building anti-disinformation platforms,
            EU AI Act compliance tooling, custodial wallet infrastructure and tokenised commodity
            rails. We are hiring senior freelance specialists who want to ship to real users —
            not push pixels in committees.
          </Text>
          <View style={styles.heroCtas}>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => scrollToForm()}>
              <Text style={styles.primaryBtnText}>See open positions</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ghostBtn}
              onPress={() => openMailto('General application')}
            >
              <Ionicons name="mail-outline" size={16} color={colors.text} />
              <Text style={styles.ghostBtnText}>{CAREERS_EMAIL}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ============================ PERKS ============================ */}
        <View style={styles.section}>
          <ScrollReveal>
            <Text style={styles.sectionLabel}>WHY OTT</Text>
            <Text
              style={[
                styles.sectionTitle,
                { fontSize: sectionFs, lineHeight: sectionLh },
              ]}
            >
              The kind of place senior{' '}
              <GradientText
                style={{
                  fontSize: sectionFs,
                  lineHeight: sectionLh,
                  fontWeight: '900',
                }}
                colors={['#22D3EE', '#3B82F6']}
              >
                builders actually like
              </GradientText>
            </Text>
          </ScrollReveal>

          <View style={[styles.perksGrid, !isDesktop && styles.perksGridMobile]}>
            {PERKS.map((p, idx) => (
              <ScrollReveal
                key={p.title}
                delay={idx * 100}
                style={{ flex: 1, minWidth: 240 }}
              >
                <GlassCard style={styles.perkCard}>
                  <View style={styles.perkIcon}>
                    <Ionicons name={p.icon} size={22} color={colors.cyan} />
                  </View>
                  <Text style={styles.perkTitle}>{p.title}</Text>
                  <Text style={styles.perkDesc}>{p.desc}</Text>
                </GlassCard>
              </ScrollReveal>
            ))}
          </View>
        </View>

        {/* ============================ OPEN POSITIONS ============================ */}
        <View style={styles.section}>
          <ScrollReveal>
            <Text style={styles.sectionLabel}>OPEN POSITIONS · FREELANCE</Text>
            <Text
              style={[
                styles.sectionTitle,
                { fontSize: sectionFs, lineHeight: sectionLh },
              ]}
            >
              We are{' '}
              <GradientText
                style={{
                  fontSize: sectionFs,
                  lineHeight: sectionLh,
                  fontWeight: '900',
                }}
                colors={['#A855F7', '#EC4899']}
              >
                hiring now
              </GradientText>
            </Text>
          </ScrollReveal>

          <View style={styles.positionsCol}>
            {POSITIONS.map((p, idx) => (
              <ScrollReveal key={p.id} delay={idx * 100}>
                <GlassCard glow={p.glow} style={styles.positionCard}>
                  <View
                    style={[
                      styles.positionRow,
                      !isTablet && styles.positionRowMobile,
                    ]}
                  >
                    <View style={styles.positionLeft}>
                      <View
                        style={[
                          styles.positionIconWrap,
                          {
                            backgroundColor:
                              p.glow === 'blue'
                                ? 'rgba(59,130,246,0.16)'
                                : p.glow === 'cyan'
                                ? 'rgba(34,211,238,0.16)'
                                : 'rgba(168,85,247,0.18)',
                          },
                        ]}
                      >
                        <Ionicons
                          name={p.icon}
                          size={26}
                          color={
                            p.glow === 'blue'
                              ? '#60A5FA'
                              : p.glow === 'cyan'
                              ? '#22D3EE'
                              : '#A855F7'
                          }
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.positionTitle}>{p.title}</Text>
                        <View style={styles.positionMetaRow}>
                          <View style={styles.metaChip}>
                            <Ionicons
                              name="location-outline"
                              size={12}
                              color={colors.textMuted}
                            />
                            <Text style={styles.metaChipText}>{p.location}</Text>
                          </View>
                          <View style={styles.metaChip}>
                            <Ionicons
                              name="briefcase-outline"
                              size={12}
                              color={colors.textMuted}
                            />
                            <Text style={styles.metaChipText}>{p.type}</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={styles.positionActions}>
                      <TouchableOpacity
                        style={styles.primaryBtnSmall}
                        onPress={() => scrollToForm(p.title)}
                      >
                        <Text style={styles.primaryBtnTextSmall}>Apply</Text>
                        <Ionicons name="arrow-forward" size={13} color="#fff" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.ghostBtnSmall}
                        onPress={() => openMailto(p.title)}
                      >
                        <Ionicons
                          name="mail-outline"
                          size={13}
                          color={colors.text}
                        />
                        <Text style={styles.ghostBtnTextSmall}>Email</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.positionSummary}>{p.summary}</Text>
                  <Text style={styles.positionDesc}>{p.description}</Text>

                  <Text style={styles.positionH4}>What you bring</Text>
                  <View style={{ gap: 8 }}>
                    {p.requirements.map((r) => (
                      <View key={r} style={styles.reqRow}>
                        <View style={styles.reqDot} />
                        <Text style={styles.reqText}>{r}</Text>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.positionH4}>Tech stack</Text>
                  <View style={styles.stackChipsRow}>
                    {p.stack.map((s) => (
                      <View key={s} style={styles.stackChip}>
                        <Text style={styles.stackChipText}>{s}</Text>
                      </View>
                    ))}
                  </View>
                </GlassCard>
              </ScrollReveal>
            ))}
          </View>
        </View>

        {/* ============================ PROCESS ============================ */}
        <View style={styles.section}>
          <ScrollReveal>
            <Text style={styles.sectionLabel}>HIRING PROCESS</Text>
            <Text
              style={[
                styles.sectionTitle,
                { fontSize: sectionFs, lineHeight: sectionLh },
              ]}
            >
              From hello to{' '}
              <GradientText
                style={{
                  fontSize: sectionFs,
                  lineHeight: sectionLh,
                  fontWeight: '900',
                }}
                colors={['#60A5FA', '#22D3EE']}
              >
                first invoice in 2–3 weeks
              </GradientText>
            </Text>
          </ScrollReveal>

          <View style={[styles.stepsRow, !isDesktop && styles.stepsRowMobile]}>
            {[
              { n: '01', t: 'Intro call', d: '30 min, no whiteboards. We meet, you ask anything.' },
              { n: '02', t: 'Technical interview', d: 'Tailored to the role: live problem, system design or contract review.' },
              { n: '03', t: 'Paid trial', d: 'Short paid task on a real (non-critical) module of the platform.' },
              { n: '04', t: 'Contract & ship', d: 'Freelance contract signed, onboarded, shipping in days.' },
            ].map((s, idx) => (
              <ScrollReveal key={s.n} delay={idx * 90} style={{ flex: 1, minWidth: 220 }}>
                <View style={styles.stepCard}>
                  <Text style={styles.stepN}>{s.n}</Text>
                  <Text style={styles.stepT}>{s.t}</Text>
                  <Text style={styles.stepD}>{s.d}</Text>
                </View>
              </ScrollReveal>
            ))}
          </View>
        </View>

        {/* ============================ APPLY FORM ============================ */}
        <View
          style={styles.section}
          ref={formRef}
          // @ts-ignore - web-only DOM id for scrollIntoView
          nativeID="apply"
          {...(Platform.OS === 'web' ? ({ id: 'apply' } as any) : {})}
        >
          <ScrollReveal>
            <GlassCard glow="blue" style={styles.applyCard}>
              <LinearGradient
                colors={[
                  'rgba(59,130,246,0.10)',
                  'rgba(168,85,247,0.10)',
                  'rgba(34,211,238,0.10)',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
              <Text style={styles.sectionLabel}>APPLY NOW</Text>
              <Text
                style={[
                  styles.applyTitle,
                  { fontSize: sectionFs, lineHeight: sectionLh },
                ]}
              >
                Send us your{' '}
                <GradientText
                  style={{
                    fontSize: sectionFs,
                    lineHeight: sectionLh,
                    fontWeight: '900',
                  }}
                  colors={['#22D3EE', '#A855F7']}
                >
                  application
                </GradientText>
              </Text>
              <Text style={styles.applySub}>
                Or email us directly at{' '}
                <Text
                  style={styles.inlineLink}
                  onPress={() => openMailto(selectedRole)}
                >
                  {CAREERS_EMAIL}
                </Text>
                .
              </Text>

              {/* Role selector */}
              <Text style={styles.label}>Role you are applying for</Text>
              <View style={styles.roleChipsRow}>
                {POSITIONS.map((p) => {
                  const active = selectedRole === p.title;
                  return (
                    <TouchableOpacity
                      key={p.id}
                      onPress={() => setSelectedRole(p.title)}
                      style={[styles.roleChip, active && styles.roleChipActive]}
                    >
                      <Text
                        style={[
                          styles.roleChipText,
                          active && styles.roleChipTextActive,
                        ]}
                      >
                        {p.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity
                  onPress={() => setSelectedRole('Open application')}
                  style={[
                    styles.roleChip,
                    selectedRole === 'Open application' && styles.roleChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.roleChipText,
                      selectedRole === 'Open application' &&
                        styles.roleChipTextActive,
                    ]}
                  >
                    Open application
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.formGrid}>
                <View style={[styles.field, isTablet && styles.fieldHalf]}>
                  <Text style={styles.label}>Full name *</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Jane Doe"
                    placeholderTextColor={colors.textDim}
                    style={styles.input}
                  />
                </View>
                <View style={[styles.field, isTablet && styles.fieldHalf]}>
                  <Text style={styles.label}>Email address *</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="jane@domain.com"
                    placeholderTextColor={colors.textDim}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                  />
                </View>
                <View style={[styles.field, isTablet && styles.fieldHalf]}>
                  <Text style={styles.label}>LinkedIn profile</Text>
                  <TextInput
                    value={linkedin}
                    onChangeText={setLinkedin}
                    placeholder="https://linkedin.com/in/..."
                    placeholderTextColor={colors.textDim}
                    autoCapitalize="none"
                    style={styles.input}
                  />
                </View>
                <View style={[styles.field, isTablet && styles.fieldHalf]}>
                  <Text style={styles.label}>Portfolio / GitHub / CV link</Text>
                  <TextInput
                    value={portfolio}
                    onChangeText={setPortfolio}
                    placeholder="https://github.com/... or CV link"
                    placeholderTextColor={colors.textDim}
                    autoCapitalize="none"
                    style={styles.input}
                  />
                </View>
                <View style={[styles.field, { flexBasis: '100%' }]}>
                  <Text style={styles.label}>Why you, in a few lines *</Text>
                  <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Tell us about your background, notable projects, why this role…"
                    placeholderTextColor={colors.textDim}
                    multiline
                    numberOfLines={6}
                    style={[styles.input, styles.textarea]}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text style={styles.submitBtnText}>Send application</Text>
                    <Ionicons name="arrow-forward" size={16} color="#fff" />
                  </>
                )}
              </TouchableOpacity>
              <Text style={styles.disclaimer}>
                We typically reply within 2 business days. Your data is only used to evaluate
                your application.
              </Text>
            </GlassCard>
          </ScrollReveal>
        </View>

        {/* ============================ FAQ ============================ */}
        <View style={styles.section}>
          <ScrollReveal>
            <Text style={styles.sectionLabel}>FAQ</Text>
            <Text
              style={[
                styles.sectionTitle,
                { fontSize: sectionFs, lineHeight: sectionLh },
              ]}
            >
              Common{' '}
              <GradientText
                style={{
                  fontSize: sectionFs,
                  lineHeight: sectionLh,
                  fontWeight: '900',
                }}
                colors={['#60A5FA', '#A855F7']}
              >
                questions
              </GradientText>
            </Text>
          </ScrollReveal>

          <View style={{ gap: 12 }}>
            {FAQ_ITEMS.map((q) => (
              <GlassCard key={q.question} style={styles.faqCard}>
                <Text style={styles.faqQ}>{q.question}</Text>
                <Text style={styles.faqA}>{q.answer}</Text>
              </GlassCard>
            ))}
          </View>
        </View>
      </KeyboardAvoidingView>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  backWrap: {
    maxWidth: 1180,
    width: '100%',
    marginHorizontal: 'auto' as any,
    paddingHorizontal: space.lg,
    paddingTop: space.lg,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
  },
  backText: { color: colors.text, fontSize: 13, fontWeight: '600' },

  breadcrumbsWrap: {
    maxWidth: 1180,
    width: '100%',
    marginHorizontal: 'auto' as any,
    paddingHorizontal: space.lg,
    paddingTop: space.md,
  },

  // Hero
  hero: {
    maxWidth: 1100,
    width: '100%',
    marginHorizontal: 'auto' as any,
    paddingHorizontal: space.lg,
    paddingTop: space.xl,
    paddingBottom: space.xl,
    alignItems: 'center',
  },
  eyebrowPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(34,211,238,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(34,211,238,0.25)',
    marginBottom: 20,
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: colors.cyan,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0 0 8px #22D3EE' } as any)
      : {}),
  },
  eyebrowText: {
    color: colors.cyan,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  heroTitle: {
    color: colors.text,
    fontWeight: '900',
    textAlign: 'center',
  },
  heroSub: {
    color: colors.textMuted,
    fontSize: 17,
    lineHeight: 28,
    marginTop: 18,
    maxWidth: 760,
    textAlign: 'center',
  },
  heroCtas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 28,
    justifyContent: 'center',
  },

  // Sections
  section: {
    maxWidth: 1180,
    width: '100%',
    marginHorizontal: 'auto' as any,
    paddingHorizontal: space.lg,
    paddingVertical: space.xl,
  },
  sectionLabel: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 12,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: '900',
    marginBottom: 32,
  },

  // Perks
  perksGrid: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  perksGridMobile: { flexDirection: 'column' },
  perkCard: { padding: 22, gap: 10, minHeight: 160 },
  perkIcon: {
    width: 42,
    height: 42,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(34,211,238,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  perkTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  perkDesc: { color: colors.textMuted, fontSize: 14, lineHeight: 22 },

  // Positions
  positionsCol: { gap: 18 },
  positionCard: { padding: 28, gap: 14 },
  positionRow: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  positionRowMobile: { flexDirection: 'column', alignItems: 'stretch' },
  positionLeft: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    flex: 1,
  },
  positionIconWrap: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  positionMetaRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  metaChipText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  positionActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  positionSummary: {
    color: colors.text,
    fontSize: 15.5,
    lineHeight: 24,
    fontWeight: '600',
    marginTop: 4,
  },
  positionDesc: {
    color: colors.textMuted,
    fontSize: 14.5,
    lineHeight: 23,
  },
  positionH4: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 10,
    marginBottom: 4,
  },
  reqRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  reqDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: colors.cyan,
    marginTop: 8,
  },
  reqText: { color: colors.textMuted, fontSize: 14, lineHeight: 22, flex: 1 },
  stackChipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  stackChip: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  stackChipText: { color: colors.text, fontSize: 12, fontWeight: '600' },

  // Steps
  stepsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  stepsRowMobile: { flexDirection: 'column' },
  stepCard: {
    padding: 22,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgCard,
    gap: 8,
    minHeight: 150,
  },
  stepN: {
    color: colors.cyan,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },
  stepT: { color: colors.text, fontSize: 18, fontWeight: '800' },
  stepD: { color: colors.textMuted, fontSize: 14, lineHeight: 21 },

  // Apply form
  applyCard: { padding: 32, gap: 12, overflow: 'hidden' },
  applyTitle: { color: colors.text, fontWeight: '900', marginBottom: 8 },
  applySub: {
    color: colors.textMuted,
    fontSize: 14.5,
    lineHeight: 22,
    marginBottom: 20,
  },
  inlineLink: { color: colors.accentBright, fontWeight: '700' },
  roleChipsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  roleChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  roleChipActive: {
    backgroundColor: 'rgba(59,130,246,0.18)',
    borderColor: 'rgba(96,165,250,0.55)',
  },
  roleChipText: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  roleChipTextActive: { color: colors.text, fontWeight: '700' },
  formGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  field: { gap: 8, flexBasis: '100%' },
  fieldHalf: { flexBasis: '48%' as any, flexGrow: 1 } as any,
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  input: {
    color: colors.text,
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'web' ? 14 : 12,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.03)',
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  textarea: { minHeight: 140, textAlignVertical: 'top' },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: radii.pill,
    backgroundColor: '#3B82F6',
    marginTop: 16,
    alignSelf: 'flex-start',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0 12px 40px rgba(59,130,246,0.45)' } as any)
      : {}),
  },
  submitBtnDisabled: { opacity: 0.6 },
  submitBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  disclaimer: {
    color: colors.textDim,
    fontSize: 12,
    marginTop: 10,
  },

  // FAQ
  faqCard: { padding: 22, gap: 8 },
  faqQ: { color: colors.text, fontSize: 16, fontWeight: '800' },
  faqA: { color: colors.textMuted, fontSize: 14.5, lineHeight: 23 },

  // Buttons
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: radii.pill,
    backgroundColor: '#3B82F6',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0 12px 40px rgba(59,130,246,0.45)' } as any)
      : {}),
  },
  primaryBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  primaryBtnSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radii.pill,
    backgroundColor: '#3B82F6',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0 8px 24px rgba(59,130,246,0.45)' } as any)
      : {}),
  },
  primaryBtnTextSmall: { color: '#fff', fontSize: 13, fontWeight: '700' },
  ghostBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: radii.pill,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghostBtnText: { color: colors.text, fontSize: 13, fontWeight: '700' },
  ghostBtnSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: radii.pill,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghostBtnTextSmall: { color: colors.text, fontSize: 12.5, fontWeight: '700' },
});
