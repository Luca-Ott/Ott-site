import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Head from 'expo-router/head';

import MeshBackground from '../../src/components/MeshBackground';
import ParticleField from '../../src/components/ParticleField';
import CustomCursor from '../../src/components/CustomCursor';
import ScrollReveal from '../../src/components/ScrollReveal';
import SiteHeader from '../../src/components/SiteHeader';
import SiteFooter from '../../src/components/SiteFooter';
import GradientText from '../../src/components/GradientText';
import { getAllArticles, formatDate } from '../../src/data/blog';
import { colors, radii, space } from '../../src/theme/tokens';

export default function BlogIndex() {
  const router = useRouter();
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<string>('All');

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => setWidth(window.width));
    return () => sub?.remove();
  }, []);

  const isDesktop = width >= 900;

  const all = useMemo(() => getAllArticles(), []);
  const categories = useMemo(() => ['All', ...Array.from(new Set(all.map((a) => a.category)))], [all]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((a) => {
      if (activeCat !== 'All' && a.category !== activeCat) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [all, query, activeCat]);

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a.slug !== (featured?.slug || ''));

  return (
    <View style={styles.root}>
      <Head>
        <title>Blog — On Time Technology Ltd</title>
        <meta name="description" content="Insights, analysis and forward-looking essays from the On Time Technology editorial team on AI, software engineering, Web3 and innovation." />
        <link rel="canonical" href="https://www.ott4future.com/blog" />
        <meta property="og:url" content="https://www.ott4future.com/blog" />
      </Head>

      <MeshBackground />
      <ParticleField density={50} />
      <CustomCursor />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <SiteHeader />

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.heroWrap}>
            <ScrollReveal>
              <Text style={styles.eyebrow}>INSIGHTS · BLOG</Text>
              <Text style={[styles.heroTitle, !isDesktop && styles.heroTitleMobile]}>
                Ideas from the{' '}
                <GradientText style={styles.heroTitleGrad} colors={['#60A5FA', '#A855F7', '#22D3EE']}>
                  frontier of technology
                </GradientText>
              </Text>
              <Text style={[styles.heroSub, !isDesktop && styles.heroSubMobile]}>
                Long-form perspectives on AI, software engineering, Web3 and the visionary special projects that
                shape the next decade of digital infrastructure.
              </Text>
            </ScrollReveal>
          </View>

          {/* Search + Categories */}
          <View style={styles.filters}>
            <View style={styles.searchWrap}>
              <Ionicons name="search" size={16} color={colors.textMuted} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search articles, topics, tags…"
                placeholderTextColor={colors.textDim}
                style={styles.searchInput}
              />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
              {categories.map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => setActiveCat(c)}
                  style={[styles.catChip, activeCat === c && styles.catChipActive]}
                >
                  <Text style={[styles.catChipText, activeCat === c && styles.catChipTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Featured Article */}
          {featured && (
            <ScrollReveal style={styles.featuredWrap}>
              <TouchableOpacity
                activeOpacity={0.92}
                onPress={() => router.push(`/blog/${featured.slug}` as any)}
                style={[styles.featuredCard, !isDesktop && styles.featuredCardMobile]}
              >
                <LinearGradient
                  colors={featured.cover_gradient as any}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.featuredImage, !isDesktop && styles.featuredImageMobile]}
                >
                  <View style={styles.featuredBadge}>
                    <Ionicons name="sparkles" size={12} color="#fff" />
                    <Text style={styles.featuredBadgeText}>FEATURED</Text>
                  </View>
                </LinearGradient>
                <View style={[styles.featuredBody, !isDesktop && styles.featuredBodyMobile]}>
                  <Text style={styles.cardCategory}>{featured.category.toUpperCase()}</Text>
                  <Text style={[styles.featuredTitle, !isDesktop && { fontSize: 26, lineHeight: 32 }]}>{featured.title}</Text>
                  <Text style={styles.featuredExcerpt}>{featured.excerpt}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{formatDate(featured.published_at)}</Text>
                    <Text style={styles.metaText}>·</Text>
                    <Text style={styles.metaText}>{featured.read_time} min read</Text>
                  </View>
                  <View style={styles.readMoreRow}>
                    <Text style={styles.readMoreText}>Read article</Text>
                    <Ionicons name="arrow-forward" size={16} color={colors.text} />
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollReveal>
          )}

          {/* Grid */}
          <View style={styles.grid}>
            {rest.map((a, idx) => (
              <ScrollReveal key={a.slug} delay={idx * 60} style={{ flex: 1, minWidth: 280 }}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => router.push(`/blog/${a.slug}` as any)}
                  style={styles.card}
                >
                  <LinearGradient colors={a.cover_gradient as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cardCover}>
                    <Text style={styles.cardCategory}>{a.category.toUpperCase()}</Text>
                  </LinearGradient>
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle} numberOfLines={2}>{a.title}</Text>
                    <Text style={styles.cardExcerpt} numberOfLines={3}>{a.excerpt}</Text>
                    <View style={styles.metaRow}>
                      <Text style={styles.metaText}>{formatDate(a.published_at)}</Text>
                      <Text style={styles.metaText}>·</Text>
                      <Text style={styles.metaText}>{a.read_time} min</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </ScrollReveal>
            ))}
          </View>

          {filtered.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="telescope-outline" size={48} color={colors.textDim} />
              <Text style={styles.emptyTitle}>No articles match your search</Text>
              <Text style={styles.emptyBody}>Try a different keyword or clear the filters.</Text>
            </View>
          )}

          <SiteFooter />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, minHeight: '100%' as any },
  scroll: { minHeight: '100%' as any, paddingTop: 20 },
  heroWrap: { paddingHorizontal: space.lg, paddingTop: space.xxl, paddingBottom: space.lg, maxWidth: 1280, width: '100%', marginHorizontal: 'auto' as any },
  eyebrow: { color: colors.cyan, fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 14 },
  heroTitle: { color: colors.text, fontSize: 56, lineHeight: 64, fontWeight: '900', letterSpacing: -1.5, marginBottom: 18 },
  heroTitleMobile: { fontSize: 34, lineHeight: 40, letterSpacing: -0.8 },
  heroTitleGrad: { fontSize: 56, lineHeight: 64, fontWeight: '900', letterSpacing: -1.5 } as any,
  heroSub: { color: colors.textMuted, fontSize: 17, lineHeight: 28, maxWidth: 700 },
  heroSubMobile: { fontSize: 15, lineHeight: 24 },

  filters: { paddingHorizontal: space.lg, gap: 16, maxWidth: 1280, width: '100%', marginHorizontal: 'auto' as any, marginBottom: space.lg },
  searchWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: radii.pill, paddingHorizontal: 18, paddingVertical: Platform.OS === 'web' ? 12 : 10 },
  searchInput: { flex: 1, color: colors.text, fontSize: 15, ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}) },
  catRow: { gap: 8, paddingRight: 20 },
  catChip: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: colors.bgCard, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border },
  catChipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  catChipText: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  catChipTextActive: { color: '#fff' },

  featuredWrap: { paddingHorizontal: space.lg, maxWidth: 1280, width: '100%', marginHorizontal: 'auto' as any, marginBottom: space.lg },
  featuredCard: { flexDirection: 'row', borderRadius: radii.lg, overflow: 'hidden', backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  featuredCardMobile: { flexDirection: 'column' },
  featuredImage: { width: 380, position: 'relative', padding: 20 },
  featuredImageMobile: { width: '100%', height: 200 },
  featuredBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'rgba(0,0,0,0.45)', borderRadius: radii.pill, alignSelf: 'flex-start' },
  featuredBadgeText: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  featuredBody: { flex: 1, padding: 32, justifyContent: 'center' },
  featuredBodyMobile: { padding: 24 },
  featuredTitle: { color: colors.text, fontSize: 30, lineHeight: 38, fontWeight: '900', letterSpacing: -0.5, marginVertical: 10 },
  featuredExcerpt: { color: colors.textMuted, fontSize: 15, lineHeight: 24, marginBottom: 14 },
  readMoreRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 14 },
  readMoreText: { color: colors.text, fontSize: 14, fontWeight: '700' },

  grid: { paddingHorizontal: space.lg, maxWidth: 1280, width: '100%', marginHorizontal: 'auto' as any, marginBottom: space.xxxl, flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  card: { borderRadius: radii.lg, overflow: 'hidden', backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, ...(Platform.OS === 'web' ? { transition: 'transform 0.3s ease, border-color 0.3s ease' } as any : {}) },
  cardCover: { height: 140, padding: 16, justifyContent: 'flex-end' },
  cardCategory: { color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 6 },
  cardBody: { padding: 20 },
  cardTitle: { color: colors.text, fontSize: 18, fontWeight: '800', lineHeight: 24, marginBottom: 8 },
  cardExcerpt: { color: colors.textMuted, fontSize: 13.5, lineHeight: 21, marginBottom: 12 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  metaText: { color: colors.textDim, fontSize: 12 },

  emptyState: { alignItems: 'center', padding: 60, gap: 12 },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '700' },
  emptyBody: { color: colors.textMuted, fontSize: 14 },
});
