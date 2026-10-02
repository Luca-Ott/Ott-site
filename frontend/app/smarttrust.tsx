import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import PageShell from '../src/components/PageShell';
import GlassCard from '../src/components/GlassCard';
import GradientText from '../src/components/GradientText';
import PageSEO, { breadcrumbsSchema, softwareAppSchema } from '../src/components/PageSEO';
import { colors, radii, space } from '../src/theme/tokens';
import { SMARTTRUST_LOGO_URL, SMARTTRUST_PLATFORM_URL } from '../src/data/smarttrust';

const FEATURES = [
  {
    icon: 'shield-checkmark' as const,
    title: 'Organisation onboarding and KYB',
    body: 'Organisations submit corporate records, beneficial ownership, AML policies and licensing evidence for platform review. Compliance officers can be assigned across organisations while access stays scoped to each appointment.',
  },
  {
    icon: 'document-text' as const,
    title: 'Trust formation and legal review',
    body: 'Record jurisdiction, governing law, purpose, administration, asset situs and CRS/FATCA classifications. Independent legal approval, acceptance by every trustee and compliance review guide the trust towards activation.',
  },
  {
    icon: 'briefcase' as const,
    title: 'Multi-asset trust portfolio',
    body: 'Bring real estate, gold, artwork, vehicles, securities, bank accounts and stablecoin wallets into one trust portfolio. Keep valuations, ownership and custody evidence, supporting documents and review status together for each asset.',
  },
  {
    icon: 'people' as const,
    title: 'Defined roles and beneficiary access',
    body: 'Connect settlors, trustees, protectors, beneficiaries, legal counsel and compliance officers. Beneficiaries can view their own allocations and distributions; payout-wallet changes require trustee and compliance approval.',
  },
  {
    icon: 'calendar' as const,
    title: 'Controlled beneficiary distributions',
    body: 'Prepare one-time or recurring plans, including monthly schedules within an agreed allocation. Each request records its deed clause, fiduciary rationale and tax treatment, with trustee, compliance and any required protector approvals.',
  },
  {
    icon: 'analytics' as const,
    title: 'Evidence, tasks and audit history',
    body: 'Track outstanding actions, documents, review decisions and compliance expiry dates from role-specific dashboards. Reports and audit records give authorised teams a traceable view of trust administration.',
  },
];

export default function SmartTrustScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = (width || 1200) >= 900;

  return (
    <PageShell>
      <PageSEO
        title="SmartTrust — Multi-Asset Trust Governance & Custody Technology"
        description="SmartTrust brings multi-asset portfolios, legal and compliance reviews, beneficiary access and controlled distributions into one trust management platform."
        canonical="https://www.ott4future.com/smarttrust"
        keywords="SmartTrust, multi-asset trust management, custody technology, trust governance, real estate, stablecoin wallets, beneficiary distributions, KYB, compliance workflows"
        schema={[
          breadcrumbsSchema([
            { name: 'Home', url: 'https://www.ott4future.com/' },
            { name: 'Special Projects', url: 'https://www.ott4future.com/special-projects' },
            { name: 'SmartTrust', url: 'https://www.ott4future.com/smarttrust' },
          ]),
          softwareAppSchema({
            name: 'SmartTrust',
            url: 'https://www.ott4future.com/smarttrust',
            description: 'Multi-asset trust management and custody technology for governance, legal and compliance reviews, beneficiary access and controlled distributions.',
            applicationSubCategory: 'Institutional Trust Management Platform',
          }),
        ]}
      />

      <View style={styles.backWrap}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/special-projects'))}
        >
          <Ionicons name="arrow-back" size={16} color={colors.text} />
          <Text style={styles.backText}>Back to projects</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.hero, !isDesktop && styles.heroMobile]}>
        <View style={styles.heroContent}>
          {!isDesktop && (
            <Link href={SMARTTRUST_PLATFORM_URL} target="_blank" rel="noopener noreferrer" asChild>
              <TouchableOpacity style={styles.mobileLogoLink} accessibilityLabel="Open the SmartTrust platform">
                <Image source={{ uri: SMARTTRUST_LOGO_URL }} style={styles.heroLogo} resizeMode="contain" accessibilityLabel="SmartTrust" />
              </TouchableOpacity>
            </Link>
          )}
          <View style={styles.eyebrow}>
            <View style={styles.liveDot} />
            <Text style={styles.eyebrowText}>TRUST GOVERNANCE · CUSTODY TECHNOLOGY</Text>
          </View>
          <Text style={[styles.title, !isDesktop && styles.titleMobile]}>
            The operating system for{' '}
            <GradientText
              style={[styles.titleGradient, !isDesktop && styles.titleGradientMobile]}
              colors={['#2B7BFF', '#22D3EE', '#15B86A']}
            >
              modern trusts
            </GradientText>
          </Text>
          <Text style={styles.subtitle}>
            SmartTrust brings trust governance, multi-asset portfolios, compliance evidence and beneficiary
            distributions into one platform. Built for trustees, fiduciary firms, family offices and financial
            institutions, it connects physical assets, bank accounts and stablecoin wallets with clear
            responsibilities and documented approvals.
          </Text>
          <View style={styles.actions}>
            <Link href={SMARTTRUST_PLATFORM_URL} target="_blank" rel="noopener noreferrer" asChild>
              <TouchableOpacity style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>Explore the Platform</Text>
                <Ionicons name="open-outline" size={16} color="#fff" />
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/investor-inquiry')}>
              <Text style={styles.secondaryBtnText}>Investor inquiry</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statusRow}>
            <View style={styles.statusPill}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Live at www.smarttrustprotocol.com</Text>
            </View>
            <View style={[styles.statusPill, styles.investorPill]}>
              <View style={styles.investorDot} />
              <Text style={styles.statusText}>Open for investors</Text>
            </View>
          </View>
        </View>

        {isDesktop && (
          <View style={styles.visual}>
            <View style={styles.visualCore}>
              <Link href={SMARTTRUST_PLATFORM_URL} target="_blank" rel="noopener noreferrer" asChild>
                <TouchableOpacity
                  accessibilityLabel="Open the SmartTrust platform"
                  style={styles.heroLogoLink}
                >
                  <Image source={{ uri: SMARTTRUST_LOGO_URL }} style={styles.heroLogo} resizeMode="contain" accessibilityLabel="SmartTrust" />
                </TouchableOpacity>
              </Link>
            </View>
            <View pointerEvents="none" style={[styles.orbit, styles.orbitOne]} />
            <View pointerEvents="none" style={[styles.orbit, styles.orbitTwo]} />
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>THE PLATFORM</Text>
        <Text style={[styles.sectionTitle, !isDesktop && styles.sectionTitleMobile]}>
          One operating layer for the full trust lifecycle
        </Text>
        <Text style={styles.sectionIntro}>
          From organisation onboarding to an active trust, each stage has its own documents, responsible
          parties and approval checks. Legal review, trustee acceptance, compliance and evidence of asset
          settlement are tracked separately, with access tied to each organisation, trust and assigned role.
        </Text>

        <View style={[styles.grid, !isDesktop && styles.gridMobile]}>
          {FEATURES.map((feature) => (
            <GlassCard key={feature.title} glow="purple" style={styles.card}>
              <View style={styles.iconWrap}>
                <Ionicons name={feature.icon} size={23} color="#A78BFA" />
              </View>
              <Text style={styles.cardTitle}>{feature.title}</Text>
              <Text style={styles.cardBody}>{feature.body}</Text>
            </GlassCard>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>ASSETS AND CUSTODY TECHNOLOGY</Text>
        <Text style={[styles.sectionTitle, !isDesktop && styles.sectionTitleMobile]}>
          A broader view of trust property
        </Text>
        <Text style={styles.sectionIntro}>
          One portfolio connects physical assets, bank accounts and stablecoin wallets. Asset valuations,
          bank balances and on-chain funds are tracked according to their source, giving trustees a
          consolidated view with distinct controls for each type of asset.
        </Text>
        <View style={[styles.grid, !isDesktop && styles.gridMobile]}>
          <GlassCard glow="purple" style={styles.card}>
            <Text style={styles.cardTitle}>Physical and financial assets</Text>
            <Text style={styles.cardBody}>
              Property, precious metals, art and collectibles, vehicles, securities and company interests
              have dedicated records, valuation details and evidence requirements. Ownership, custody and
              asset acceptance stay subject to documented review.
            </Text>
          </GlassCard>
          <GlassCard glow="purple" style={styles.card}>
            <Text style={styles.cardTitle}>Bank accounts and treasury</Text>
            <Text style={styles.cardBody}>
              Manage trust bank-account records, currencies, signatories, statements and supporting
              evidence. Reconcile balances and movements, prepare payment instructions and record
              approvals and settlement evidence within the trust workflow.
            </Text>
          </GlassCard>
          <GlassCard glow="purple" style={styles.card}>
            <Text style={styles.cardTitle}>Stablecoin treasury workflows</Text>
            <Text style={styles.cardBody}>
              EVM wallet connection, payment preparation and on-chain confirmation are implemented.
              Where settlement is enabled, an authorised signer uses an external wallet and the platform
              verifies the transaction. Network and token availability depend on the configured environment;
              test-network activity does not represent a transfer of real funds.
            </Text>
          </GlassCard>
          <GlassCard glow="purple" style={styles.card}>
            <Text style={styles.cardTitle}>Governance across the portfolio</Text>
            <Text style={styles.cardBody}>
              Link asset operations and treasury movements to the trust, its responsible parties and
              required approvals. Track receipts, supporting evidence and distributions while preserving
              the distinction between estimated asset value and funds available for payment.
            </Text>
          </GlassCard>
        </View>
      </View>

      <View style={styles.workflowSection}>
        <Text style={styles.sectionLabel}>HOW IT WORKS</Text>
        <View style={[styles.steps, !isDesktop && styles.stepsMobile]}>
          {[
            ['01', 'Onboard', 'Complete organisation details, upload corporate evidence and obtain the required platform reviews.'],
            ['02', 'Establish', 'Define the trust, its governing law, parties and deed; complete independent legal review and trustee acceptance.'],
            ['03', 'Activate', 'Complete compliance checks and record evidence of legal asset settlement and segregation before activation.'],
            ['04', 'Administer', 'Maintain the portfolio, resolve pending actions and process approved distributions through configured payment workflows.'],
          ].map(([number, title, body]) => (
            <View key={number} style={styles.step}>
              <Text style={styles.stepNumber}>{number}</Text>
              <Text style={styles.stepTitle}>{title}</Text>
              <Text style={styles.stepBody}>{body}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.cta}>
        <Text style={[styles.ctaTitle, !isDesktop && styles.ctaTitleMobile]}>
          Help shape the infrastructure for digital trust
        </Text>
        <Text style={styles.ctaBody}>
          Developed by On Time Technology Ltd, SmartTrust combines trust administration and custody
          technology in one evolving platform. We welcome strategic investors and institutional partners
          interested in piloting multi-asset governance and controlled beneficiary distributions.
        </Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/investor-inquiry')}>
          <Text style={styles.primaryBtnText}>Explore the investment opportunity</Text>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  backWrap: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingTop: space.lg },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  backText: { color: colors.text, fontSize: 13, fontWeight: '600' },
  hero: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: 80, flexDirection: 'row', alignItems: 'center', gap: 60 },
  heroMobile: { paddingVertical: 52 },
  heroContent: { flex: 1 },
  eyebrow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 20 },
  liveDot: { width: 7, height: 7, borderRadius: 7, backgroundColor: colors.cyan },
  eyebrowText: { color: colors.cyan, fontSize: 11, fontWeight: '800', letterSpacing: 1.7, flexShrink: 1 },
  title: { color: colors.text, fontSize: 60, lineHeight: 68, fontWeight: '900', letterSpacing: -1.6 },
  titleMobile: { fontSize: 38, lineHeight: 46, letterSpacing: -0.8 },
  titleGradient: { fontSize: 60, lineHeight: 68, fontWeight: '900', letterSpacing: -1.6 } as any,
  titleGradientMobile: { fontSize: 38, lineHeight: 46, letterSpacing: -0.8 } as any,
  subtitle: { color: colors.textMuted, fontSize: 17, lineHeight: 28, maxWidth: 720, marginTop: 22 },
  actions: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginTop: 30 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#0969FF', paddingHorizontal: 22, paddingVertical: 13, borderRadius: radii.pill },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  secondaryBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: 'rgba(255,255,255,0.025)' },
  secondaryBtnText: { color: colors.text, fontSize: 14, fontWeight: '700' },
  statusRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 9, marginTop: 18 },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 13, paddingVertical: 10, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border },
  investorPill: { borderColor: 'rgba(21,184,106,0.55)', backgroundColor: 'rgba(21,184,106,0.08)' },
  statusDot: { width: 7, height: 7, borderRadius: 7, backgroundColor: '#2B7BFF' },
  investorDot: { width: 7, height: 7, borderRadius: 7, backgroundColor: '#15B86A' },
  statusText: { color: colors.text, fontSize: 13, fontWeight: '700' },
  visual: { width: 310, height: 310, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  visualCore: { width: 292, height: 142, alignItems: 'center', justifyContent: 'center' },
  heroLogoLink: { width: 260, height: 92, alignItems: 'center', justifyContent: 'center' },
  mobileLogoLink: { width: 280, maxWidth: '100%', height: 96, marginBottom: 24 },
  heroLogo: { width: '100%', height: '100%' },
  orbit: { position: 'absolute', borderWidth: 1, borderColor: 'rgba(129,140,248,0.45)', borderRadius: 999 },
  orbitOne: { width: 240, height: 240 },
  orbitTwo: { width: 300, height: 190, transform: [{ rotate: '35deg' }] },
  section: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: space.xxxl },
  sectionLabel: { color: colors.cyan, fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 14 },
  sectionTitle: { color: colors.text, fontSize: 44, lineHeight: 52, fontWeight: '900', letterSpacing: -1 },
  sectionTitleMobile: { fontSize: 31, lineHeight: 38 },
  sectionIntro: { color: colors.textMuted, fontSize: 16, lineHeight: 27, maxWidth: 850, marginTop: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18, marginTop: 36 },
  gridMobile: { flexDirection: 'column' },
  card: { flexBasis: '47%' as any, flexGrow: 1, minWidth: 280, padding: 25 },
  iconWrap: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(139,92,246,0.14)', marginBottom: 18 },
  cardTitle: { color: colors.text, fontSize: 19, fontWeight: '800', marginBottom: 9 },
  cardBody: { color: colors.textMuted, fontSize: 14.5, lineHeight: 23 },
  workflowSection: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: space.xxxl },
  steps: { flexDirection: 'row', gap: 16, marginTop: 20 },
  stepsMobile: { flexDirection: 'column' },
  step: { flex: 1, padding: 22, borderRadius: radii.md, backgroundColor: 'rgba(255,255,255,0.035)', borderWidth: 1, borderColor: colors.border },
  stepNumber: { color: '#818CF8', fontSize: 12, fontWeight: '900', letterSpacing: 1.5 },
  stepTitle: { color: colors.text, fontSize: 19, fontWeight: '800', marginTop: 12 },
  stepBody: { color: colors.textMuted, fontSize: 14, lineHeight: 22, marginTop: 8 },
  cta: { maxWidth: 980, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: 80, alignItems: 'center' },
  ctaTitle: { color: colors.text, fontSize: 42, lineHeight: 50, fontWeight: '900', textAlign: 'center', letterSpacing: -1 },
  ctaTitleMobile: { fontSize: 30, lineHeight: 38 },
  ctaBody: { color: colors.textMuted, fontSize: 16, lineHeight: 25, textAlign: 'center', maxWidth: 680, marginTop: 15, marginBottom: 26 },
});
