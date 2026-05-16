import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Head from 'expo-router/head';

import PageShell from '../src/components/PageShell';
import GlassCard from '../src/components/GlassCard';
import GradientText from '../src/components/GradientText';
import { colors, radii, space } from '../src/theme/tokens';

const VALUES = [
  { icon: 'flash', title: 'Velocity', body: 'Production-grade software shipped at startup speed with enterprise R&D rigour.' },
  { icon: 'shield-checkmark', title: 'Trust', body: 'Security, verifiability and resilience baked into every architecture.' },
  { icon: 'sparkles', title: 'Innovation', body: 'A frontier mindset — we explore AI, Web3, trust and infrastructure ahead of the market.' },
  { icon: 'people', title: 'Collaboration', body: 'Tight feedback loops with our clients, partners and the wider engineering community.' },
];

const SERVICES = [
  { title: 'Software Design', icon: 'color-palette', body: 'Intuitive, user-centred digital experiences blending function and aesthetics.', route: '/software-design' },
  { title: 'Software Development', icon: 'code-slash', body: 'Scalable, high-performance applications using modern technology stacks.', route: '/software-development' },
  { title: 'R&D', icon: 'flask', body: 'Exploring emerging technologies and breakthrough solutions for tomorrow.', route: '/research-development' },
  { title: 'Special Projects', icon: 'planet', body: 'Visionary initiatives at the frontier of AI, Web3, trust and global commerce.', route: '/special-projects' },
];

export default function AboutScreen() {
  const router = useRouter();
  const dims = useWindowDimensions();
  const width = dims.width || 1200;
  const isDesktop = width >= 900;

  return (
    <PageShell>
      <Head>
        <title>About — On Time Technology</title>
        <meta name="description" content="Learn about On Time Technology Ltd — a UK-based IT company building the digital infrastructure of tomorrow through software, R&D and special projects." />
        <link rel="canonical" href="https://www.ott4future.com/about" />
        <meta property="og:url" content="https://www.ott4future.com/about" />
      </Head>

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
        <Text style={styles.eyebrow}>ABOUT US</Text>
        <Text style={[styles.title, !isDesktop && styles.titleMobile]}>
          Building the future of{' '}
          <GradientText style={styles.titleGrad} colors={['#60A5FA', '#A855F7', '#22D3EE']}>
            technology
          </GradientText>
        </Text>
        <Text style={styles.subtitle}>
          On Time Technology Ltd is a UK-registered IT company specialising in software design, development
          and applied research. We craft exceptional solutions that drive business growth — from product-ready
          platforms to visionary special projects redefining trust, commerce and information online.
        </Text>
      </View>

      <View style={[styles.twoCol, !isDesktop && styles.twoColMobile]}>
        <GlassCard glow="blue" style={styles.col}>
          <Text style={styles.colLabel}>OUR MISSION</Text>
          <Text style={styles.colTitle}>Engineering at the speed of vision</Text>
          <Text style={styles.colBody}>
            We deliver cutting-edge technology solutions that empower organisations to thrive in the digital age,
            combining technical excellence with creative innovation to build products that make a real difference.
          </Text>
        </GlassCard>
        <GlassCard glow="purple" style={styles.col}>
          <Text style={styles.colLabel}>OUR VISION</Text>
          <Text style={styles.colTitle}>Infrastructure for the next decade</Text>
          <Text style={styles.colBody}>
            From AI-native platforms to programmable trust and global commodity infrastructure, we invest in the
            categories that will define how software, money and information move over the next ten years.
          </Text>
        </GlassCard>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>WHAT WE DO</Text>
        <Text style={[styles.sectionTitle, !isDesktop && styles.sectionTitleMobile]}>
          Four practices, one mindset:{' '}
          <GradientText style={styles.sectionTitleGrad} colors={['#22D3EE', '#3B82F6']}>excellence</GradientText>
        </Text>
        <View style={styles.servicesGrid}>
          {SERVICES.map((s) => (
            <TouchableOpacity key={s.title} style={styles.serviceCard} activeOpacity={0.9} onPress={() => router.push(s.route as any)}>
              <View style={styles.serviceIcon}><Ionicons name={s.icon as any} size={22} color={colors.cyan} /></View>
              <Text style={styles.serviceTitle}>{s.title}</Text>
              <Text style={styles.serviceBody}>{s.body}</Text>
              <View style={styles.serviceCta}><Text style={styles.serviceCtaText}>Discover</Text><Ionicons name="arrow-forward" size={14} color={colors.text} /></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>OUR VALUES</Text>
        <Text style={[styles.sectionTitle, !isDesktop && styles.sectionTitleMobile]}>
          What we believe,{' '}
          <GradientText style={styles.sectionTitleGrad} colors={['#A855F7', '#EC4899']}>every day</GradientText>
        </Text>
        <View style={styles.valuesGrid}>
          {VALUES.map((v) => (
            <View key={v.title} style={styles.valueCard}>
              <View style={styles.valueIcon}><Ionicons name={v.icon as any} size={20} color={colors.accentBright} /></View>
              <Text style={styles.valueTitle}>{v.title}</Text>
              <Text style={styles.valueBody}>{v.body}</Text>
            </View>
          ))}
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

  twoCol: { flexDirection: 'row', gap: 20, maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingTop: space.xl },
  twoColMobile: { flexDirection: 'column' },
  col: { flex: 1, padding: 28, gap: 8 },
  colLabel: { color: colors.cyan, fontSize: 11, fontWeight: '800', letterSpacing: 1.8 },
  colTitle: { color: colors.text, fontSize: 22, fontWeight: '800', marginTop: 4 },
  colBody: { color: colors.textMuted, fontSize: 15, lineHeight: 24, marginTop: 6 },

  section: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: space.xxxl },
  sectionLabel: { color: colors.cyan, fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 12 },
  sectionTitle: { color: colors.text, fontSize: 42, lineHeight: 50, fontWeight: '900', letterSpacing: -1, marginBottom: 30 },
  sectionTitleMobile: { fontSize: 30, lineHeight: 36, letterSpacing: -0.5, marginBottom: 24 },
  sectionTitleGrad: { fontSize: 42, lineHeight: 50, fontWeight: '900', letterSpacing: -1 } as any,

  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18 },
  serviceCard: { flex: 1, minWidth: 240, padding: 22, gap: 10, borderRadius: radii.lg, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  serviceIcon: { width: 40, height: 40, borderRadius: radii.md, backgroundColor: 'rgba(34,211,238,0.12)', alignItems: 'center', justifyContent: 'center' },
  serviceTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  serviceBody: { color: colors.textMuted, fontSize: 14, lineHeight: 22 },
  serviceCta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  serviceCtaText: { color: colors.text, fontSize: 13, fontWeight: '700' },

  valuesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18 },
  valueCard: { flex: 1, minWidth: 220, padding: 22, gap: 8, borderRadius: radii.lg, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  valueIcon: { width: 36, height: 36, borderRadius: radii.sm, backgroundColor: 'rgba(59,130,246,0.15)', alignItems: 'center', justifyContent: 'center' },
  valueTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  valueBody: { color: colors.textMuted, fontSize: 14, lineHeight: 22 },
});
