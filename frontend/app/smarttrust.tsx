import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
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
    title: 'Institutional governance',
    body: 'Role-based workflows connect trustees, protectors, beneficiaries, legal teams and compliance officers in one controlled environment.',
  },
  {
    icon: 'document-text' as const,
    title: 'Compliance and document control',
    body: 'KYC/AML evidence, legal documents and approvals follow clear review states before a trust or distribution can proceed.',
  },
  {
    icon: 'calendar' as const,
    title: 'Programmable distributions',
    body: 'One-time or recurring payments can be scheduled to approved beneficiary wallets, including month-end plans that run until the allocation is completed.',
  },
  {
    icon: 'analytics' as const,
    title: 'Auditable operations',
    body: 'Material actions, approvals and policy decisions are recorded for traceability, reporting and institutional oversight.',
  },
];

export default function SmartTrustScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = (width || 1200) >= 900;

  return (
    <PageShell>
      <PageSEO
        title="SmartTrust — Digital Trust Infrastructure for Institutional Asset Management"
        description="SmartTrust unifies trust governance, compliance workflows, document controls and programmable beneficiary distributions in one auditable platform."
        canonical="https://www.ott4future.com/smarttrust"
        keywords="SmartTrust, digital trust infrastructure, institutional asset management, trust administration platform, beneficiary distributions, trust governance, KYC AML workflows"
        schema={[
          breadcrumbsSchema([
            { name: 'Home', url: 'https://www.ott4future.com/' },
            { name: 'Special Projects', url: 'https://www.ott4future.com/special-projects' },
            { name: 'SmartTrust', url: 'https://www.ott4future.com/smarttrust' },
          ]),
          softwareAppSchema({
            name: 'SmartTrust',
            url: 'https://www.ott4future.com/smarttrust',
            description: 'Digital trust infrastructure for institutional governance, compliance and programmable beneficiary distributions.',
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
          <View style={styles.eyebrow}>
            <View style={styles.liveDot} />
            <Text style={styles.eyebrowText}>DIGITAL TRUST · INSTITUTIONAL ASSET GOVERNANCE</Text>
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
            SmartTrust is a compliance-first platform for trustees, fiduciary firms, family offices and financial
            institutions. It brings governance, documents, beneficiary access and programmable digital-asset
            distributions into one auditable workflow.
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/investor-inquiry')}>
              <Text style={styles.primaryBtnText}>Investor inquiry</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/contact')}>
              <Text style={styles.secondaryBtnText}>Discuss SmartTrust</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statusRow}>
            <View style={styles.statusPill}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>In development</Text>
            </View>
            <View style={[styles.statusPill, styles.investorPill]}>
              <View style={styles.investorDot} />
              <Text style={styles.statusText}>Open for investors</Text>
            </View>
          </View>
        </View>

        {isDesktop && (
          <View style={styles.visual}>
            <LinearGradient
              colors={['rgba(4,24,66,0.96)', 'rgba(7,55,122,0.94)', 'rgba(9,105,255,0.82)']}
              style={styles.visualCore}
            >
              <Image source={{ uri: '/smarttrust-logo-reversed.png' }} style={styles.heroLogo} resizeMode="contain" />
            </LinearGradient>
            <View style={[styles.orbit, styles.orbitOne]} />
            <View style={[styles.orbit, styles.orbitTwo]} />
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>THE PLATFORM</Text>
        <Text style={[styles.sectionTitle, !isDesktop && styles.sectionTitleMobile]}>
          One operating layer for the full trust lifecycle
        </Text>
        <Text style={styles.sectionIntro}>
          SmartTrust is designed to reduce operational fragmentation across trust formation, governance,
          compliance, document review and beneficiary payments. Permissions and approval gates keep each actor
          within the correct organisation and trust, while preserving a clear record of every material decision.
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
            ['01', 'Establish', 'Configure the organisation, trust, parties, governing rules and asset framework.'],
            ['02', 'Verify', 'Complete identity, KYC/AML, legal-document and role-acceptance reviews.'],
            ['03', 'Approve', 'Apply trustee, protector, legal and compliance approval gates as required.'],
            ['04', 'Distribute', 'Execute approved one-time or recurring distributions to confirmed beneficiary wallets.'],
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
          SmartTrust is open to strategic investors and institutional pilot partners. Developed by On Time
          Technology Ltd for a more controlled, transparent and programmable trust ecosystem.
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
  eyebrowText: { color: colors.cyan, fontSize: 11, fontWeight: '800', letterSpacing: 1.7 },
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
  visualCore: { width: 292, height: 142, borderRadius: 28, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, borderWidth: 1, borderColor: 'rgba(43,123,255,0.5)' },
  heroLogo: { width: 260, height: 92 },
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
