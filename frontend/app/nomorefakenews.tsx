import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Head from 'expo-router/head';

import PageShell from '../src/components/PageShell';
import GlassCard from '../src/components/GlassCard';
import GradientText from '../src/components/GradientText';
import PageSEO, { breadcrumbsSchema, softwareAppSchema } from '../src/components/PageSEO';
import { colors, radii, space } from '../src/theme/tokens';

export default function NoMoreFakeNewsScreen() {
  const router = useRouter();
  const dims = useWindowDimensions();
  const width = dims.width || 1200;
  const isDesktop = width >= 900;

  return (
    <PageShell>
      <PageSEO
        title="NoMoreFakeNews — AI Fake News & Deepfake Detector"
        description="NoMoreFakeNews is an AI-powered platform engineered to detect fake news and deepfakes in real time, with provenance signals and a human-in-the-loop verification network."
        canonical="https://www.ott4future.com/nomorefakenews"
        keywords="AI fake news detector, deepfake detection AI 2026, NoMoreFakeNews, strumento AI per combattere fake news, disinformation detection, AI trust infrastructure"
        ogType="product"
        schema={[
          breadcrumbsSchema([
            { name: 'Home', url: 'https://www.ott4future.com/' },
            { name: 'Special Projects', url: 'https://www.ott4future.com/special-projects' },
            { name: 'NoMoreFakeNews', url: 'https://www.ott4future.com/nomorefakenews' },
          ]),
          softwareAppSchema({
            name: 'NoMoreFakeNews',
            url: 'https://www.ott4future.com/nomorefakenews',
            description: 'AI-powered platform to detect, flag and dismantle fake news, manipulated media and deepfakes in real time.',
            applicationSubCategory: 'AI Trust Infrastructure',
          }),
        ]}
      />

      <View style={styles.backWrap}>
        <TouchableOpacity style={styles.backBtn} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
          <Ionicons name="arrow-back" size={16} color={colors.text} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <View style={styles.tagRow}>
          <View style={styles.tag}><Ionicons name="sparkles" size={12} color={colors.purple} /><Text style={styles.tagText}>AI · TRUST INFRASTRUCTURE</Text></View>
          <View style={[styles.tag, { borderColor: 'rgba(34,211,238,0.4)' }]}><View style={[styles.dot, { backgroundColor: colors.cyan }]} /><Text style={[styles.tagText, { color: colors.cyan }]}>Open for investors</Text></View>
        </View>
        <Text style={[styles.title, !isDesktop && styles.titleMobile]}>
          Restoring trust in the{' '}
          <GradientText style={styles.titleGrad} colors={['#3B82F6', '#A855F7', '#22D3EE']}>
            information age
          </GradientText>
        </Text>
        <Text style={styles.subtitle}>
          NoMoreFakeNews is an AI-powered platform engineered to detect, flag and dismantle disinformation in
          real time. We combine advanced machine learning, provenance signals and a collaborative fact-checking
          network to protect the integrity of digital information.
        </Text>
      </View>

      <View style={[styles.objectivesGrid, !isDesktop && styles.objectivesGridMobile]}>
        {[
          { icon: 'scan', title: 'Real-Time Detection', body: 'Continuous monitoring of misinformation across major platforms and channels.', glow: 'blue' as const },
          { icon: 'flask', title: 'AI Content Verification', body: 'State-of-the-art models to assess truthfulness, manipulation and provenance.', glow: 'purple' as const },
          { icon: 'people-circle', title: 'Fact-Checking Network', body: 'Collaborative human-in-the-loop network for high-confidence verdicts.', glow: 'cyan' as const },
          { icon: 'school', title: 'Education & Awareness', body: 'User-facing programmes to build long-term resilience to manipulation.', glow: 'blue' as const },
        ].map((o) => (
          <GlassCard key={o.title} glow={o.glow} style={styles.objCard}>
            <View style={styles.objIcon}><Ionicons name={o.icon as any} size={22} color={colors.cyan} /></View>
            <Text style={styles.objTitle}>{o.title}</Text>
            <Text style={styles.objBody}>{o.body}</Text>
          </GlassCard>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>WHY IT MATTERS</Text>
        <Text style={[styles.sectionTitle, !isDesktop && styles.sectionTitleMobile]}>
          A structural problem demands a{' '}
          <GradientText style={styles.sectionTitleGrad} colors={['#A855F7', '#EC4899']}>structural solution</GradientText>
        </Text>
        <Text style={styles.sectionBody}>
          Disinformation is no longer just a content moderation problem — it is an infrastructure problem.
          Synthetic media, AI-generated narratives and opaque feeds erode the shared reality societies depend
          on. Tackling that requires verifiable provenance, transparent algorithms and a new layer of
          machine-readable trust signals built into the fabric of the internet. That is what we are building.
        </Text>
      </View>

      <View style={styles.ctaSection}>
        <GlassCard glow="purple" style={styles.ctaCard}>
          <LinearGradient
            colors={['rgba(59,130,246,0.18)', 'rgba(168,85,247,0.18)', 'rgba(34,211,238,0.18)']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill as any}
          />
          <Text style={styles.ctaEyebrow}>INVESTMENT OPPORTUNITY</Text>
          <Text style={[styles.ctaTitle, !isDesktop && { fontSize: 28, lineHeight: 36 }]}>Help us rebuild trust at internet scale.</Text>
          <Text style={styles.ctaBody}>We are seeking strategic partners and investors aligned with our vision of a more trustworthy digital information ecosystem.</Text>
          <View style={styles.ctaRow}>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/investor-inquiry')}>
              <Text style={styles.primaryBtnText}>Investor inquiry</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ghostBtn} onPress={() => router.push('/contact')}>
              <Text style={styles.ghostBtnText}>Contact us</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>
      </View>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  backWrap: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingTop: space.lg },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  backText: { color: colors.text, fontSize: 13, fontWeight: '600' },

  hero: { maxWidth: 980, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingTop: space.xl, paddingBottom: space.lg },
  tagRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 18 },
  tag: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: colors.bgCard, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border },
  tagText: { color: colors.purple, fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  dot: { width: 6, height: 6, borderRadius: 6 },
  title: { color: colors.text, fontSize: 60, lineHeight: 68, fontWeight: '900', letterSpacing: -2 },
  titleMobile: { fontSize: 36, lineHeight: 42, letterSpacing: -0.8 },
  titleGrad: { fontSize: 60, lineHeight: 68, fontWeight: '900', letterSpacing: -2 } as any,
  subtitle: { color: colors.textMuted, fontSize: 17, lineHeight: 28, marginTop: 18, maxWidth: 820 },

  objectivesGrid: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: space.xl, flexDirection: 'row', flexWrap: 'wrap', gap: 18 },
  objectivesGridMobile: { flexDirection: 'column' },
  objCard: { flex: 1, minWidth: 280, gap: 10 },
  objIcon: { width: 42, height: 42, borderRadius: radii.md, backgroundColor: 'rgba(168,85,247,0.15)', alignItems: 'center', justifyContent: 'center' },
  objTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  objBody: { color: colors.textMuted, fontSize: 14, lineHeight: 22 },

  section: { maxWidth: 980, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: space.xxxl },
  sectionLabel: { color: colors.cyan, fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 12 },
  sectionTitle: { color: colors.text, fontSize: 40, lineHeight: 48, fontWeight: '900', letterSpacing: -1, marginBottom: 18 },
  sectionTitleMobile: { fontSize: 28, lineHeight: 34, letterSpacing: -0.5 },
  sectionTitleGrad: { fontSize: 40, lineHeight: 48, fontWeight: '900', letterSpacing: -1 } as any,
  sectionBody: { color: colors.textMuted, fontSize: 16, lineHeight: 28, maxWidth: 760 },

  ctaSection: { maxWidth: 980, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: space.xxxl },
  ctaCard: { paddingVertical: 44, paddingHorizontal: 32, position: 'relative', overflow: 'hidden', alignItems: 'center' },
  ctaEyebrow: { color: colors.cyan, fontSize: 11, fontWeight: '800', letterSpacing: 1.8, marginBottom: 8 },
  ctaTitle: { color: colors.text, fontSize: 34, fontWeight: '900', textAlign: 'center', letterSpacing: -0.8, lineHeight: 42 },
  ctaBody: { color: colors.textMuted, fontSize: 16, lineHeight: 26, textAlign: 'center', marginTop: 14, marginBottom: 22, maxWidth: 580 },
  ctaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#3B82F6', paddingHorizontal: 22, paddingVertical: 13, borderRadius: radii.pill },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  ghostBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 18, paddingVertical: 12, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: 'rgba(255,255,255,0.02)' },
  ghostBtnText: { color: colors.text, fontSize: 14, fontWeight: '600' },
});
