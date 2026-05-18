import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Head from 'expo-router/head';

import MeshBackground from '../../src/components/MeshBackground';
import ParticleField from '../../src/components/ParticleField';
import CustomCursor from '../../src/components/CustomCursor';
import SiteHeader from '../../src/components/SiteHeader';
import SiteFooter from '../../src/components/SiteFooter';
import MarkdownView from '../../src/components/MarkdownView';
import ScrollReveal from '../../src/components/ScrollReveal';
import PageSEO, { breadcrumbsSchema, articleSchema } from '../../src/components/PageSEO';
import Breadcrumbs from '../../src/components/Breadcrumbs';
import { getAllArticles, getArticleBySlug, formatDate, type FullArticle, type ArticleSummary } from '../../src/data/blog';
import { colors, radii, space } from '../../src/theme/tokens';

export default function ArticleScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const [article, setArticle] = useState<FullArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<ArticleSummary[]>([]);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => setWidth(window.width));
    return () => sub?.remove();
  }, []);
  const isDesktop = width >= 900;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const slugStr = Array.isArray(slug) ? slug[0] : slug;
      if (!slugStr) {
        setLoading(false);
        return;
      }
      const a = await getArticleBySlug(slugStr);
      if (cancelled) return;
      setArticle(a);
      if (a) {
        const all = getAllArticles();
        setRelated(all.filter((x) => x.slug !== a.slug && x.category === a.category).slice(0, 3));
      }
      setLoading(false);
      if (Platform.OS === 'web' && typeof window !== 'undefined') window.scrollTo(0, 0);
    };
    load();
    return () => { cancelled = true; };
  }, [slug]);

  return (
    <View style={styles.root}>
      <PageSEO
        title={article ? `${article.title} — On Time Technology` : 'Article — On Time Technology'}
        description={article?.excerpt || 'On Time Technology insights & analysis on AI, EU AI Act, Web3 and frontier software.'}
        canonical={`https://www.ott4future.com/blog/${article?.slug || ''}`}
        ogType="article"
        publishedTime={article?.published_at}
        modifiedTime={article?.published_at}
        author={article?.author || 'On Time Technology Editorial'}
        articleSection={article?.category}
        articleTags={article?.tags}
        keywords={article?.tags?.join(', ')}
        schema={
          article
            ? [
                breadcrumbsSchema([
                  { name: 'Home', url: 'https://www.ott4future.com/' },
                  { name: 'Blog', url: 'https://www.ott4future.com/blog' },
                  { name: article.title, url: `https://www.ott4future.com/blog/${article.slug}` },
                ]),
                articleSchema({
                  headline: article.title,
                  description: article.excerpt,
                  url: `https://www.ott4future.com/blog/${article.slug}`,
                  datePublished: article.published_at,
                  author: article.author,
                  section: article.category,
                  keywords: article.tags,
                  wordCount: article.content ? article.content.split(/\s+/).length : undefined,
                }),
              ]
            : undefined
        }
      />

      <MeshBackground />
      <ParticleField density={40} />
      <CustomCursor />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <SiteHeader />

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.backWrap}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => (router.canGoBack() ? router.back() : router.replace('/blog'))}
            >
              <Ionicons name="arrow-back" size={16} color={colors.text} />
              <Text style={styles.backText}>All articles</Text>
            </TouchableOpacity>
          </View>

          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator color={colors.accent} size="large" />
              <Text style={styles.loadingText}>Loading article…</Text>
            </View>
          )}

          {!loading && !article && (
            <View style={styles.loading}>
              <Ionicons name="alert-circle-outline" size={48} color={colors.textDim} />
              <Text style={styles.loadingText}>Article not found.</Text>
              <TouchableOpacity style={styles.backBtn} onPress={() => router.replace('/blog')}>
                <Text style={styles.backText}>Back to blog</Text>
              </TouchableOpacity>
            </View>
          )}

          {article && (
            <>
              <ScrollReveal>
                <LinearGradient
                  colors={article.cover_gradient as any}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.cover, !isDesktop && styles.coverMobile]}
                />
              </ScrollReveal>

              <ScrollReveal delay={120}>
                <View style={[styles.header, !isDesktop && styles.headerMobile]}>
                  <Text style={styles.category}>{article.category.toUpperCase()}</Text>
                  <Text style={[styles.title, !isDesktop && { fontSize: 32, lineHeight: 38 }]}>{article.title}</Text>
                  <Text style={[styles.excerpt, !isDesktop && { fontSize: 16, lineHeight: 26 }]}>{article.excerpt}</Text>
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <Ionicons name="person-outline" size={14} color={colors.textMuted} />
                      <Text style={styles.metaText}>{article.author}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
                      <Text style={styles.metaText}>{formatDate(article.published_at)}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={14} color={colors.textMuted} />
                      <Text style={styles.metaText}>{article.read_time} min read</Text>
                    </View>
                  </View>
                  {article.tags?.length > 0 && (
                    <View style={styles.tagRow}>
                      {article.tags.map((t) => (
                        <View key={t} style={styles.tagChip}>
                          <Text style={styles.tagText}>#{t}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <View style={[styles.contentWrap, !isDesktop && { paddingHorizontal: 20 }]}>
                  <MarkdownView source={article.content} />
                </View>
              </ScrollReveal>

              {/* Related */}
              {related.length > 0 && (
                <View style={styles.relatedSection}>
                  <Text style={styles.relatedLabel}>RELATED READING</Text>
                  <View style={styles.relatedGrid}>
                    {related.map((r) => (
                      <TouchableOpacity
                        key={r.slug}
                        style={styles.relatedCard}
                        activeOpacity={0.9}
                        onPress={() => router.replace(`/blog/${r.slug}` as any)}
                      >
                        <LinearGradient colors={r.cover_gradient as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.relatedCover} />
                        <View style={styles.relatedBody}>
                          <Text style={styles.relatedCat}>{r.category.toUpperCase()}</Text>
                          <Text style={styles.relatedTitle} numberOfLines={2}>{r.title}</Text>
                          <Text style={styles.relatedMeta}>{formatDate(r.published_at)} · {r.read_time} min</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </>
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
  backWrap: { maxWidth: 820, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingTop: space.lg },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  backText: { color: colors.text, fontSize: 13, fontWeight: '600' },

  loading: { alignItems: 'center', padding: 80, gap: 12 },
  loadingText: { color: colors.textMuted, fontSize: 15 },

  cover: { height: 320, maxWidth: 820, width: '100%', marginHorizontal: 'auto' as any, marginTop: space.lg, borderRadius: radii.lg, marginHorizontalAlt: space.lg } as any,
  coverMobile: { height: 200, borderRadius: 0 },

  header: { maxWidth: 820, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingTop: space.xl, paddingBottom: space.md },
  headerMobile: { paddingHorizontal: 20 },
  category: { color: colors.cyan, fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 14 },
  title: { color: colors.text, fontSize: 48, lineHeight: 56, fontWeight: '900', letterSpacing: -1.2, marginBottom: 16 },
  excerpt: { color: colors.textMuted, fontSize: 19, lineHeight: 30, marginBottom: 20 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { color: colors.textMuted, fontSize: 13 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  tagChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radii.pill, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  tagText: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },

  contentWrap: { maxWidth: 820, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingTop: space.lg, paddingBottom: space.xxxl },

  relatedSection: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingBottom: space.xxxl, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: space.xl },
  relatedLabel: { color: colors.cyan, fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 20 },
  relatedGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  relatedCard: { flex: 1, minWidth: 240, borderRadius: radii.lg, overflow: 'hidden', backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  relatedCover: { height: 100 },
  relatedBody: { padding: 16 },
  relatedCat: { color: colors.cyan, fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 6 },
  relatedTitle: { color: colors.text, fontSize: 15, fontWeight: '700', lineHeight: 21, marginBottom: 8 },
  relatedMeta: { color: colors.textDim, fontSize: 12 },
});
