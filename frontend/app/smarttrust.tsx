import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import PageShell from '../src/components/PageShell';
import GlassCard from '../src/components/GlassCard';
import GradientText from '../src/components/GradientText';
import PageSEO, { breadcrumbsSchema, softwareAppSchema } from '../src/components/PageSEO';
import { colors, radii, space } from '../src/theme/tokens';

const FEATURES = [
  {
    icon: 'shield-checkmark' as const,
    title: 'Programmable escrow',
    body: 'Digital assets are held and released through transparent, predefined smart-contract conditions.',
  },
  {
    icon: 'git-branch' as const,
    title: 'Milestone-based release',
    body: 'Funds can be distributed progressively when contractual milestones and approvals are completed.',
  },
  {
    icon: 'people' as const,
    title: 'Beneficiary control',
    body: 'Authorised beneficiaries can manage their destination wallet before an eligible release is executed.',
  },
  {
    icon: 'document-text' as const,
    title: 'Verifiable audit trail',
    body: 'Every relevant action is recorded to provide traceability, accountability and operational clarity.',
  },
];

export default function SmartTrustScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = (width || 1200) >= 900;

  return (
    <PageShell>
      <PageSEO
        title="SmartTrust — Programmable Smart-Contract Escrow"
        description="SmartTrust is programmable trust infrastructure for conditional digital-asset distribution, transparent milestones and beneficiary control."
        canonical="https://www.ott4future.com/smarttrust"
        keywords="SmartTrust, smart contract escrow, conditional asset distribution, programmable trust, digital asset beneficiaries, blockchain milestones"
        schema={[
          breadcrumbsSchema([
            { name: 'Home', url: 'https://www.ott4future.com/' },
            { name: 'Special Projects', url: 'https://www.ott4future.com/special-projects' },
            { name: 'SmartTrust', url: 'https://www.ott4future.com/smarttrust' },
          ]),
          softwareAppSchema({
            name: 'SmartTrust',
            url: 'https://www.ott4future.com/smarttrust',
            description: 'Programmable smart-contract escrow and conditional digital-asset distribution platform.',
            applicationSubCategory: 'Smart Contract Escrow Platform',
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
          <View style={styles.eyebrow}>
            <View style={styles.liveDot} />
            <Text style={styles.eyebrowText}>SMART CONTRACT · TRUST INFRASTRUCTURE</Text>
          </View>
          <Text style={[styles.title, !isDesktop && styles.titleMobile]}>
            Trust, converted into{' '}
            <GradientText
              style={[styles.titleGradient, !isDesktop && styles.titleGradientMobile]}
              colors={['#818CF8', '#A855F7', '#22D3EE']}
            >
              executable logic
            </GradientText>
          </Text>
          <Text style={styles.subtitle}>
            SmartTrust is a programmable escrow platform designed to coordinate conditional digital-asset
            distribution with transparent rules, milestone approvals and beneficiary control.
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/contact')}>
              <Text style={styles.primaryBtnText}>Discuss SmartTrust</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
            <View style={styles.statusPill}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>In development</Text>
            </View>
          </View>
        </View>

        {isDesktop && (
          <View style={styles.visual}>
            <LinearGradient
              colors={['rgba(99,102,241,0.9)', 'rgba(168,85,247,0.75)', 'rgba(34,211,238,0.75)']}
              style={styles.visualCore}
            >
              <Ionicons name="shield-checkmark" size={72} color="#fff" />
            </LinearGradient>
            <View style={[styles.orbit, styles.orbitOne]} />
            <View style={[styles.orbit, styles.orbitTwo]} />
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>THE PLATFORM</Text>
        <Text style={[styles.sectionTitle, !isDesktop && styles.sectionTitleMobile]}>
          Infrastructure for conditional value transfer
        </Text>
        <Text style={styles.sectionIntro}>
          SmartTrust translates contractual conditions into an operational workflow connecting asset owners,
          administrators and beneficiaries. It is designed for use cases where release conditions must be
          clear, auditable and resistant to unilateral alteration.
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

      <View style={styles.workflowSection}>
        <Text style={styles.sectionLabel}>HOW IT WORKS</Text>
        <View style={[styles.steps, !isDesktop && styles.stepsMobile]}>
          {[
            ['01', 'Define', 'Set beneficiaries, assets, conditions and approval milestones.'],
            ['02', 'Secure', 'Assets are placed under the agreed programmable escrow logic.'],
            ['03', 'Verify', 'Authorised parties validate completion of the required conditions.'],
            ['04', 'Release', 'Eligible assets are distributed to the confirmed beneficiary wallets.'],
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
          Build the next layer of programmable trust
        </Text>
        <Text style={styles.ctaBody}>
          Contact On Time Technology to discuss institutional, commercial or bespoke SmartTrust applications.
        </Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/contact')}>
          <Text style={styles.primaryBtnText}>Contact our team</Text>
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
  eyebrowText: { color: colors.cyan, fontSize: 11, fontWeight: '800', letterSpacing: 1.7 },
  title: { color: colors.text, fontSize: 60, lineHeight: 68, fontWeight: '900', letterSpacing: -1.6 },
  titleMobile: { fontSize: 38, lineHeight: 46, letterSpacing: -0.8 },
  titleGradient: { fontSize: 60, lineHeight: 68, fontWeight: '900', letterSpacing: -1.6 } as any,
  titleGradientMobile: { fontSize: 38, lineHeight: 46, letterSpacing: -0.8 } as any,
  subtitle: { color: colors.textMuted, fontSize: 17, lineHeight: 28, maxWidth: 720, marginTop: 22 },
  actions: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginTop: 30 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#6366F1', paddingHorizontal: 22, paddingVertical: 13, borderRadius: radii.pill },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 13, paddingVertical: 10, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border },
  statusDot: { width: 7, height: 7, borderRadius: 7, backgroundColor: colors.cyan },
  statusText: { color: colors.text, fontSize: 13, fontWeight: '700' },
  visual: { width: 310, height: 310, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  visualCore: { width: 160, height: 160, borderRadius: 80, alignItems: 'center', justifyContent: 'center' },
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
