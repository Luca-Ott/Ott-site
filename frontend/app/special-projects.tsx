import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Head from 'expo-router/head';

import PageShell from '../src/components/PageShell';
import GradientText from '../src/components/GradientText';
import PageSEO, { breadcrumbsSchema, softwareAppSchema } from '../src/components/PageSEO';
import { colors, radii, space } from '../src/theme/tokens';

const PROJECTS = [
  {
    title: 'NoMoreFakeNews',
    category: 'AI · TRUST INFRASTRUCTURE',
    tagline: 'AI-powered platform to detect, flag and dismantle disinformation in real time — protecting the integrity of public discourse.',
    status: 'Open for investors',
    gradient: ['#3B82F6', '#A855F7', '#22D3EE'],
    image: 'https://www.ott4future.com/nomorefakenews-hero.jpg',
    route: '/nomorefakenews' as const,
    external: false,
  },
  {
    title: 'Custodiy',
    category: 'WEB3 · COMMERCE',
    tagline: 'A modular platform for OTC trading, escrow, marketplaces and secure document custody — v2.0 live and growing.',
    status: 'v2.0 live',
    gradient: ['#06B6D4', '#3B82F6', '#1E1B4B'],
    href: 'https://custodiy.com',
    external: true,
  },
  {
    title: 'Freety',
    category: 'COMMODITIES · AI',
    tagline: 'Digital infrastructure for global commodity & energy trading with cargo tokenisation and AI-powered tooling.',
    status: 'Active',
    gradient: ['#10B981', '#22D3EE', '#3B82F6'],
    route: '/freety' as const,
    external: false,
  },
  {
    title: 'SmartTrust',
    category: 'DIGITAL TRUST · GOVERNANCE',
    tagline: 'An institutional operating layer for trusts, unifying governance, compliance evidence, beneficiary access and programmable digital-asset distributions.',
    status: 'In development',
    investorStatus: 'Open for investors',
    gradient: ['#061D4F', '#0B3B82', '#0969FF'],
    logo: '/smarttrust-logo-reversed.png',
    route: '/smarttrust' as const,
    external: false,
  },
  {
    title: 'Cyber Security',
    category: 'ENTERPRISE · DEFENCE',
    tagline: 'Advanced protection programmes designed to defend businesses and individuals against next-generation, AI-driven threats.',
    status: 'In R&D',
    gradient: ['#F472B6', '#A855F7', '#3B82F6'],
    route: '/research-development' as const,
    external: false,
  },
];

export default function SpecialProjectsScreen() {
  const router = useRouter();
  const dims = useWindowDimensions();
  const width = dims.width || 1200;
  const isDesktop = width >= 900;

  const open = (p: typeof PROJECTS[number]) => {
    if (p.external && p.href) {
      if (typeof window !== 'undefined') window.open(p.href, '_blank');
      else Linking.openURL(p.href);
    } else if (p.route) {
      router.push(p.route);
    }
  };

  return (
    <PageShell>
      <PageSEO
        title="Special Projects — NoMoreFakeNews, Custodiy, SmartTrust, Freety & Cyber"
        description="Explore On Time Technology's flagship projects: NoMoreFakeNews, Custodiy, SmartTrust programmable escrow, Freety commodity trading and Cyber Security R&D."
        canonical="https://www.ott4future.com/special-projects"
        keywords="special projects On Time Technology, NoMoreFakeNews, Custodiy, SmartTrust, smart contract escrow, Freety, AI anti-disinformation, custodial wallet Ireland, tokenized commodities trading, cyber security R&D"
        schema={[
          breadcrumbsSchema([
            { name: 'Home', url: 'https://www.ott4future.com/' },
            { name: 'Special Projects', url: 'https://www.ott4future.com/special-projects' },
          ]),
          softwareAppSchema({ name: 'NoMoreFakeNews', url: 'https://www.ott4future.com/nomorefakenews', description: 'AI-powered platform to detect and dismantle disinformation in real time.', applicationSubCategory: 'AI Trust Infrastructure' }),
          softwareAppSchema({ name: 'Custodiy', url: 'https://custodiy.com', description: 'Modular Web3 OTC trading, escrow and document custody platform.', applicationSubCategory: 'Web3 Commerce Platform' }),
          softwareAppSchema({ name: 'SmartTrust', url: 'https://www.ott4future.com/smarttrust', description: 'Digital trust infrastructure for institutional governance, compliance and programmable beneficiary distributions.', applicationSubCategory: 'Institutional Trust Management Platform' }),
          softwareAppSchema({ name: 'Freety', url: 'https://www.ott4future.com/freety', description: 'Digital infrastructure for global commodity & energy trading with AI tooling.', applicationSubCategory: 'Commodities Trading Platform' }),
        ]}
      />

      <View style={styles.backWrap}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
        >
          <Ionicons name="arrow-back" size={16} color={colors.text} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>SPECIAL PROJECTS</Text>
        <Text style={[styles.title, !isDesktop && styles.titleMobile]}>
          Visionary bets on{' '}
          <GradientText style={styles.titleGrad} colors={['#60A5FA', '#A855F7', '#22D3EE']}>
            the next decade
          </GradientText>
        </Text>
        <Text style={styles.subtitle}>
          Beyond client work, On Time Technology invests in long-horizon projects at the frontier of AI,
          Web3 and global trust infrastructure. These are our flagship initiatives — working systems, not
          slideware.
        </Text>
      </View>

      <View style={[styles.grid, !isDesktop && styles.gridMobile]}>
        {PROJECTS.map((p, idx) => (
          <TouchableOpacity
            key={p.title}
            activeOpacity={0.9}
            onPress={() => open(p)}
            style={[styles.card, !isDesktop && styles.cardMobile]}
          >
            {'image' in p && p.image ? (
              <Image source={{ uri: p.image }} style={styles.cardImage} resizeMode="cover" />
            ) : (
              <LinearGradient colors={p.gradient as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
            )}
            <View style={styles.overlay} />
            <View style={styles.cardInner}>
              <View style={styles.cardTop}>
                <Text style={styles.cardCategory}>{p.category}</Text>
                <View style={styles.statusGroup}>
                  <View style={styles.statusPill}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>{p.status}</Text>
                  </View>
                  {'investorStatus' in p && p.investorStatus ? (
                    <View style={[styles.statusPill, styles.investorPill]}>
                      <View style={styles.investorDot} />
                      <Text style={styles.statusText}>{p.investorStatus}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
              <View style={[styles.cardContent, p.title === 'NoMoreFakeNews' && styles.cardContentBottom]}>
                {'logo' in p && p.logo ? (
                  <Image source={{ uri: p.logo }} style={styles.cardLogo} resizeMode="contain" />
                ) : p.title !== 'NoMoreFakeNews' ? (
                  <Text style={styles.cardTitle}>{p.title}</Text>
                ) : null}
                {p.title !== 'NoMoreFakeNews' ? <Text style={styles.cardTagline}>{p.tagline}</Text> : null}
                <View style={styles.cardFooter}>
                <Text style={styles.cardLink}>{p.external ? 'Visit site' : 'Discover'}</Text>
                  <Ionicons name={p.external ? 'open-outline' : 'arrow-forward'} size={16} color="#fff" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.ctaSection}>
        <Text style={[styles.ctaTitle, !isDesktop && { fontSize: 28, lineHeight: 36 }]}>
          Interested in partnering on a project?
        </Text>
        <View style={styles.ctaRow}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/investor-inquiry')}>
            <Text style={styles.primaryBtnText}>Investor inquiry</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.ghostBtn} onPress={() => router.push('/contact')}>
            <Text style={styles.ghostBtnText}>Get in touch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  backWrap: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingTop: space.lg },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  backText: { color: colors.text, fontSize: 13, fontWeight: '600' },

  hero: { maxWidth: 980, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingTop: space.xl, paddingBottom: space.lg },
  eyebrow: { color: colors.cyan, fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 14 },
  title: { color: colors.text, fontSize: 56, lineHeight: 64, fontWeight: '900', letterSpacing: -1.5 },
  titleMobile: { fontSize: 36, lineHeight: 42, letterSpacing: -0.8 },
  titleGrad: { fontSize: 56, lineHeight: 64, fontWeight: '900', letterSpacing: -1.5 } as any,
  subtitle: { color: colors.textMuted, fontSize: 17, lineHeight: 28, marginTop: 18, maxWidth: 820 },

  grid: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: space.xl, flexDirection: 'row', flexWrap: 'wrap', gap: 20, justifyContent: 'center' },
  gridMobile: { flexDirection: 'column' },
  card: { flexBasis: '48%' as any, flexGrow: 1, minWidth: 320, maxWidth: 560, minHeight: 280, borderRadius: radii.lg, overflow: 'hidden', position: 'relative', borderWidth: 1, borderColor: colors.border },
  cardMobile: { minHeight: 260 },
  cardImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(5,6,15,0.5)' },
  cardInner: { padding: 26, gap: 8, flex: 1, justifyContent: 'space-between' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  cardCategory: { color: 'rgba(255,255,255,0.95)', fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  statusGroup: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap', gap: 6 },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: 'rgba(0,0,0,0.45)', borderRadius: radii.pill, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  investorPill: { borderColor: 'rgba(21,184,106,0.72)', backgroundColor: 'rgba(6,45,35,0.72)' },
  statusDot: { width: 6, height: 6, borderRadius: 6, backgroundColor: '#22D3EE' },
  investorDot: { width: 6, height: 6, borderRadius: 6, backgroundColor: '#15B86A' },
  statusText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  cardContent: { gap: 8 },
  cardContentBottom: { marginTop: 'auto', paddingTop: 54 },
  cardLogo: { width: 245, height: 68, maxWidth: '82%' as any, marginVertical: 8, alignSelf: 'flex-start' },
  cardTitle: { color: '#fff', fontSize: 32, fontWeight: '900', letterSpacing: -0.5, marginVertical: 8 },
  cardTagline: { color: 'rgba(255,255,255,0.92)', fontSize: 14.5, lineHeight: 22, marginBottom: 16 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardLink: { color: '#fff', fontSize: 14, fontWeight: '700' },

  ctaSection: { maxWidth: 980, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: space.xxxl, alignItems: 'center', gap: 20 },
  ctaTitle: { color: colors.text, fontSize: 36, lineHeight: 44, fontWeight: '900', letterSpacing: -0.8, textAlign: 'center' },
  ctaRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', justifyContent: 'center' },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#3B82F6', paddingHorizontal: 22, paddingVertical: 13, borderRadius: radii.pill, },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  ghostBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 18, paddingVertical: 12, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: 'rgba(255,255,255,0.02)' },
  ghostBtnText: { color: colors.text, fontSize: 14, fontWeight: '600' },
});
