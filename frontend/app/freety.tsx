import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Head from 'expo-router/head';

import PageShell from '../src/components/PageShell';
import GlassCard from '../src/components/GlassCard';
import GradientText from '../src/components/GradientText';
import PageSEO, { breadcrumbsSchema, softwareAppSchema } from '../src/components/PageSEO';
import { colors, radii, space } from '../src/theme/tokens';

export default function FreetyScreen() {
  const router = useRouter();
  const dims = useWindowDimensions();
  const width = dims.width || 1200;
  const isDesktop = width >= 900;

  return (
    <PageShell>
      <PageSEO
        title="Freety — Tokenised Commodities & AI Trading Platform"
        description="Freety is digital B2B infrastructure for global commodity & energy trading — marketplace technology, financial settlement, cargo tokenisation and AI-driven trading tools."
        canonical="https://www.ott4future.com/freety"
        keywords="tokenized commodities trading, AI trading platform energy commodities, B2B commodity marketplace, cargo tokenisation, energy trading software"
        ogType="product"
        schema={[
          breadcrumbsSchema([
            { name: 'Home', url: 'https://www.ott4future.com/' },
            { name: 'Special Projects', url: 'https://www.ott4future.com/special-projects' },
            { name: 'Freety', url: 'https://www.ott4future.com/freety' },
          ]),
          softwareAppSchema({
            name: 'Freety',
            url: 'https://www.ott4future.com/freety',
            description: 'B2B digital infrastructure for global commodity & energy trading with cargo tokenisation, AI tooling and integrated settlement.',
            applicationSubCategory: 'Commodities Trading Platform',
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
          <View style={styles.tag}><Ionicons name="earth" size={12} color={colors.green} /><Text style={styles.tagText}>COMMODITIES · AI</Text></View>
          <View style={[styles.tag, { borderColor: 'rgba(34,211,238,0.4)' }]}><View style={[styles.dot, { backgroundColor: colors.cyan }]} /><Text style={[styles.tagText, { color: colors.cyan }]}>Active</Text></View>
        </View>
        <Text style={[styles.title, !isDesktop && styles.titleMobile]}>
          Digital infrastructure for{' '}
          <GradientText style={styles.titleGrad} colors={['#10B981', '#22D3EE', '#3B82F6']}>
            global trade
          </GradientText>
        </Text>
        <Text style={styles.subtitle}>
          Freety modernises how the world trades commodities and energy products. A B2B platform that unites
          marketplace technology, financial settlement and AI-driven trading tools — turning fragmented,
          paper-heavy supply chains into programmable digital workflows.
        </Text>
      </View>

      <View style={[styles.featuresGrid, !isDesktop && styles.featuresGridMobile]}>
        {[
          { icon: 'cube', title: 'Cargo Tokenisation', body: 'Tokenise vessels, cargoes and energy lots for transparent on-chain ownership and faster settlement.', glow: 'blue' as const },
          { icon: 'analytics', title: 'AI Trading Tools', body: 'Price discovery, risk scoring and counterparty intelligence powered by purpose-built AI models.', glow: 'cyan' as const },
          { icon: 'cash', title: 'Financial Settlement', body: 'Integrated escrow, multi-currency settlement and KYC/AML flows built into every trade.', glow: 'purple' as const },
          { icon: 'people', title: 'Marketplace', body: 'A vetted network of producers, traders and buyers — with full audit trail on every transaction.', glow: 'blue' as const },
          { icon: 'shield-checkmark', title: 'Compliance', body: 'Sanctions screening, document verification and regulator-grade reporting baked in by design.', glow: 'cyan' as const },
          { icon: 'flash', title: 'Speed', body: 'Trades that once took weeks of paperwork now close in minutes, securely and verifiably.', glow: 'purple' as const },
        ].map((f) => (
          <GlassCard key={f.title} glow={f.glow} style={styles.featureCard}>
            <View style={styles.featureIcon}><Ionicons name={f.icon as any} size={22} color={colors.cyan} /></View>
            <Text style={styles.featureTitle}>{f.title}</Text>
            <Text style={styles.featureBody}>{f.body}</Text>
          </GlassCard>
        ))}
      </View>

      <View style={styles.ctaSection}>
        <GlassCard glow="blue" style={styles.ctaCard}>
          <LinearGradient
            colors={['rgba(16,185,129,0.18)', 'rgba(34,211,238,0.18)', 'rgba(59,130,246,0.18)']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill as any}
          />
          <Text style={[styles.ctaTitle, !isDesktop && { fontSize: 28, lineHeight: 36 }]}>Trade smarter, settle faster.</Text>
          <Text style={styles.ctaBody}>Interested in piloting Freety, partnering on a project or investing in the platform?</Text>
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
  tagText: { color: colors.green, fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  dot: { width: 6, height: 6, borderRadius: 6 },
  title: { color: colors.text, fontSize: 60, lineHeight: 68, fontWeight: '900', letterSpacing: -2 },
  titleMobile: { fontSize: 36, lineHeight: 42, letterSpacing: -0.8 },
  titleGrad: { fontSize: 60, lineHeight: 68, fontWeight: '900', letterSpacing: -2 } as any,
  subtitle: { color: colors.textMuted, fontSize: 17, lineHeight: 28, marginTop: 18, maxWidth: 820 },

  featuresGrid: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: space.xl, flexDirection: 'row', flexWrap: 'wrap', gap: 18 },
  featuresGridMobile: { flexDirection: 'column' },
  featureCard: { flex: 1, minWidth: 280, gap: 10 },
  featureIcon: { width: 42, height: 42, borderRadius: radii.md, backgroundColor: 'rgba(34,211,238,0.12)', alignItems: 'center', justifyContent: 'center' },
  featureTitle: { color: colors.text, fontSize: 19, fontWeight: '800' },
  featureBody: { color: colors.textMuted, fontSize: 14, lineHeight: 22 },

  ctaSection: { maxWidth: 980, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: space.xxxl },
  ctaCard: { paddingVertical: 44, paddingHorizontal: 32, position: 'relative', overflow: 'hidden', alignItems: 'center' },
  ctaTitle: { color: colors.text, fontSize: 36, fontWeight: '900', textAlign: 'center', letterSpacing: -0.8, lineHeight: 44 },
  ctaBody: { color: colors.textMuted, fontSize: 16, lineHeight: 26, textAlign: 'center', marginTop: 14, marginBottom: 22, maxWidth: 560 },
  ctaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#3B82F6', paddingHorizontal: 22, paddingVertical: 13, borderRadius: radii.pill },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  ghostBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 18, paddingVertical: 12, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: 'rgba(255,255,255,0.02)' },
  ghostBtnText: { color: colors.text, fontSize: 14, fontWeight: '600' },
});
