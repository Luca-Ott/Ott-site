import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Head from 'expo-router/head';

import PageShell from './PageShell';
import GlassCard from './GlassCard';
import GradientText from './GradientText';
import PageSEO, { breadcrumbsSchema } from './PageSEO';
import { colors, radii, space } from '../theme/tokens';

export type ServiceFeature = { icon: any; title: string; body: string };

type Props = {
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  eyebrow: string;
  titleStart: string;
  titleEnd: string;
  titleColors?: string[];
  subtitle: string;
  features: ServiceFeature[];
};

export default function ServicePageShell({
  seoTitle, seoDescription, canonical, eyebrow, titleStart, titleEnd, titleColors = ['#60A5FA', '#A855F7'], subtitle, features,
}: Props) {
  const router = useRouter();
  const dims = useWindowDimensions();
  const width = dims.width || 1200;
  const isDesktop = width >= 900;

  return (
    <PageShell>
      <PageSEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonical}
        schema={[
          breadcrumbsSchema([
            { name: 'Home', url: 'https://www.ott4future.com/' },
            { name: eyebrow.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' '), url: canonical },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: eyebrow,
            provider: { '@type': 'Organization', name: 'On Time Technology Ltd' },
            areaServed: ['IE', 'GB', 'EU', 'Worldwide'],
            url: canonical,
            description: seoDescription,
          },
        ]}
      />

      <View style={styles.backWrap}>
        <TouchableOpacity style={styles.backBtn} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
          <Ionicons name="arrow-back" size={16} color={colors.text} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={[styles.title, !isDesktop && styles.titleMobile]}>
          {titleStart}{' '}
          <GradientText style={styles.titleGrad} colors={titleColors}>{titleEnd}</GradientText>
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={[styles.grid, !isDesktop && styles.gridMobile]}>
        {features.map((f, idx) => {
          const glow = (['blue', 'cyan', 'purple'] as const)[idx % 3];
          return (
            <GlassCard key={f.title} glow={glow} style={styles.card}>
              <View style={styles.cardIcon}><Ionicons name={f.icon} size={22} color={colors.cyan} /></View>
              <Text style={styles.cardTitle}>{f.title}</Text>
              <Text style={styles.cardBody}>{f.body}</Text>
            </GlassCard>
          );
        })}
      </View>

      <View style={styles.ctaSection}>
        <Text style={[styles.ctaTitle, !isDesktop && { fontSize: 28, lineHeight: 36 }]}>
          Ready to start your project?
        </Text>
        <View style={styles.ctaRow}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/contact')}>
            <Text style={styles.primaryBtnText}>Talk to us</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.ghostBtn} onPress={() => router.push('/special-projects')}>
            <Text style={styles.ghostBtnText}>See our work</Text>
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

  grid: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: space.xl, flexDirection: 'row', flexWrap: 'wrap', gap: 18 },
  gridMobile: { flexDirection: 'column' },
  card: { flex: 1, minWidth: 280, gap: 10 },
  cardIcon: { width: 42, height: 42, borderRadius: radii.md, backgroundColor: 'rgba(34,211,238,0.12)', alignItems: 'center', justifyContent: 'center' },
  cardTitle: { color: colors.text, fontSize: 19, fontWeight: '800' },
  cardBody: { color: colors.textMuted, fontSize: 14, lineHeight: 22 },

  ctaSection: { maxWidth: 880, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: space.xxxl, alignItems: 'center', gap: 18 },
  ctaTitle: { color: colors.text, fontSize: 36, lineHeight: 44, fontWeight: '900', letterSpacing: -0.8, textAlign: 'center' },
  ctaRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', justifyContent: 'center' },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#3B82F6', paddingHorizontal: 22, paddingVertical: 13, borderRadius: radii.pill },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  ghostBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 18, paddingVertical: 12, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: 'rgba(255,255,255,0.02)' },
  ghostBtnText: { color: colors.text, fontSize: 14, fontWeight: '600' },
});
