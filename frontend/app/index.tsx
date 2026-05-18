import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
  Image,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Head from 'expo-router/head';

import MeshBackground from '../src/components/MeshBackground';
import ParticleField from '../src/components/ParticleField';
import CustomCursor from '../src/components/CustomCursor';
import ScrollReveal from '../src/components/ScrollReveal';
import AnimatedCounter from '../src/components/AnimatedCounter';
import GlassCard from '../src/components/GlassCard';
import GradientText from '../src/components/GradientText';
import SiteHeader from '../src/components/SiteHeader';
import SiteFooter from '../src/components/SiteFooter';
import PageSEO, { softwareAppSchema } from '../src/components/PageSEO';
import { getAllArticles, formatDate } from '../src/data/blog';
import { colors, radii, space } from '../src/theme/tokens';

const newsItems = [
  'NoMoreFakeNews — AI-powered platform to eliminate misinformation, open for investors',
  'Custodiy v2.0 of the web app is now live',
  'Freety — Digital infrastructure for global commodity & energy trading',
  'Cyber Security Projects — Advanced protection for enterprise',
  'R&D division expanding with cutting-edge AI innovation',
  'New enterprise software design & development solutions available',
];

export default function HomeScreen() {
  const router = useRouter();
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const articles = getAllArticles().slice(0, 3);

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => setWidth(window.width));
    return () => sub?.remove();
  }, []);

  const isDesktop = width >= 900;
  const isTablet = width >= 640;

  // Hero parallax & breathing animation
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 2400, useNativeDriver: false }),
        Animated.timing(pulse, { toValue: 0, duration: 2400, useNativeDriver: false }),
      ])
    ).start();
  }, [pulse]);

  // Ticker
  const scrollX = useRef(new Animated.Value(0)).current;
  const [tickerWidth, setTickerWidth] = useState(0);
  const tickerAnimRef = useRef<Animated.CompositeAnimation | null>(null);
  const tickerText = newsItems.map((t) => `◆  ${t}`).join('     ');
  const onTickerLayout = useCallback((e: any) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0 && w !== tickerWidth) setTickerWidth(w);
  }, [tickerWidth]);

  useEffect(() => {
    if (tickerWidth <= 0) return;
    if (tickerAnimRef.current) tickerAnimRef.current.stop();
    scrollX.setValue(0);
    const duration = (tickerWidth / 60) * 1000;
    const anim = Animated.loop(
      Animated.timing(scrollX, {
        toValue: -tickerWidth,
        duration,
        useNativeDriver: true,
        easing: (t) => t,
      })
    );
    tickerAnimRef.current = anim;
    anim.start();
    return () => anim.stop();
  }, [tickerWidth, scrollX]);

  return (
    <View style={styles.root}>
      <PageSEO
        title="On Time Technology — AI-Native Software, R&D & Special Projects"
        description="UK & Ireland IT company building the digital infrastructure of tomorrow — AI fake-news detection, EU AI Act compliance, custodial wallet, tokenised commodities and visionary special projects."
        canonical="https://www.ott4future.com/"
        keywords="On Time Technology, Irish AI software company, Dublin IT company, EU AI Act compliance, AI fake news detector, NoMoreFakeNews, Custodiy, Freety, custodial wallet Ireland, tokenized commodities trading"
        schema={[
          softwareAppSchema({
            name: 'NoMoreFakeNews',
            url: 'https://www.ott4future.com/nomorefakenews',
            description: 'AI-powered platform to detect, flag and dismantle disinformation in real time.',
            applicationSubCategory: 'AI Trust Infrastructure',
          }),
          softwareAppSchema({
            name: 'Freety',
            url: 'https://www.ott4future.com/freety',
            description: 'Digital infrastructure for global commodity & energy trading with AI tooling.',
            applicationSubCategory: 'Commodities Trading Platform',
          }),
          softwareAppSchema({
            name: 'Custodiy',
            url: 'https://custodiy.com',
            description: 'Modular OTC trading, escrow, marketplace and document custody platform.',
            applicationSubCategory: 'Custodial Wallet & Web3',
          }),
        ]}
      />

      <MeshBackground />
      <ParticleField density={70} />
      <CustomCursor />

      <SafeAreaView style={{ flex: 1, zIndex: 1 } as any} edges={['top']}>
        <SiteHeader />

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* ============================ HERO ============================ */}
          <View style={[styles.hero, !isDesktop && styles.heroMobile]}>
            <View style={{ maxWidth: 980, width: '100%', alignItems: 'center' }}>
              <View style={styles.eyebrow}>
                <Animated.View
                  style={[
                    styles.eyebrowDot,
                    {
                      opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }),
                    },
                  ]}
                />
                <Text style={styles.eyebrowText}>UK · IT COMPANY · EST. 2010</Text>
              </View>

              <Text style={[styles.heroTitle, !isDesktop && styles.heroTitleMobile]}>
                Building the digital{'\n'}
                <GradientText style={styles.heroTitleGrad} colors={['#60A5FA', '#A855F7', '#22D3EE']}>
                  infrastructure of tomorrow
                </GradientText>
              </Text>

              <Text style={[styles.heroSub, !isDesktop && styles.heroSubMobile]}>
                We architect software, R&D programmes and visionary special projects for organisations that intend
                to lead the next decade — from AI-native platforms to programmable trust infrastructure.
              </Text>

              <View style={styles.heroCtas}>
                <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/special-projects')}>
                  <Text style={styles.primaryBtnText}>Explore our projects</Text>
                  <Ionicons name="arrow-forward" size={16} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.ghostBtn} onPress={() => router.push('/contact')}>
                  <Text style={styles.ghostBtnText}>Get in touch</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.heroBadges}>
                <View style={styles.heroBadge}>
                  <Ionicons name="shield-checkmark" size={14} color={colors.cyan} />
                  <Text style={styles.heroBadgeText}>UK Registered</Text>
                </View>
                <View style={styles.heroBadge}>
                  <Ionicons name="rocket" size={14} color={colors.purple} />
                  <Text style={styles.heroBadgeText}>R&D Driven</Text>
                </View>
                <View style={styles.heroBadge}>
                  <Ionicons name="sparkles" size={14} color={colors.accent} />
                  <Text style={styles.heroBadgeText}>AI Native</Text>
                </View>
              </View>
            </View>

            {/* Floating orbit visual (desktop only) */}
            {isDesktop && (
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.orbitWrap,
                  {
                    transform: [
                      {
                        translateY: pulse.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }),
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.orbitRing1} />
                <View style={styles.orbitRing2} />
                <View style={styles.orbitRing3} />
                <View style={styles.orbitCore} />
              </Animated.View>
            )}

            {/* Scroll indicator */}
            <View style={styles.scrollHint}>
              <Animated.View
                style={[
                  styles.scrollDot,
                  {
                    transform: [
                      { translateY: pulse.interpolate({ inputRange: [0, 1], outputRange: [0, 10] }) },
                    ],
                  },
                ]}
              />
              <Text style={styles.scrollHintText}>SCROLL</Text>
            </View>
          </View>

          {/* ============================ TICKER ============================ */}
          <View style={styles.ticker}>
            <View style={styles.tickerLabel}>
              <Animated.View
                style={[
                  styles.tickerPulse,
                  { opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) },
                ]}
              />
              <Text style={styles.tickerLabelText}>LIVE</Text>
            </View>
            <View style={styles.tickerTrack}>
              <Animated.View style={[styles.tickerInner, { transform: [{ translateX: scrollX }] }]}>
                <Text style={styles.tickerText} numberOfLines={1} onLayout={onTickerLayout}>
                  {tickerText}
                </Text>
                <Text style={styles.tickerText} numberOfLines={1}>
                  {tickerText}
                </Text>
              </Animated.View>
            </View>
          </View>

          {/* ============================ MISSION ============================ */}
          <View style={styles.section}>
            <ScrollReveal>
              <Text style={styles.sectionLabel}>OUR MISSION</Text>
              <Text style={[styles.sectionTitle, !isDesktop && styles.sectionTitleMobile]}>
                Engineering tomorrow,{'\n'}
                <GradientText style={styles.sectionTitleGrad} colors={['#22D3EE', '#3B82F6']}>
                  delivered today
                </GradientText>
              </Text>
            </ScrollReveal>

            <View style={[styles.missionGrid, !isDesktop && styles.missionGridMobile]}>
              {[
                {
                  icon: 'flash' as const,
                  title: 'Velocity',
                  body: 'We ship production-grade software at startup speed, with the discipline of an enterprise R&D lab.',
                  glow: 'blue' as const,
                },
                {
                  icon: 'lock-closed' as const,
                  title: 'Trust',
                  body: 'Security, verifiability and resilience are designed into the architecture — not patched on afterwards.',
                  glow: 'cyan' as const,
                },
                {
                  icon: 'planet' as const,
                  title: 'Vision',
                  body: 'Our special projects sit at the frontier of AI, Web3 and global infrastructure for the next decade.',
                  glow: 'purple' as const,
                },
              ].map((m, idx) => (
                <ScrollReveal key={m.title} delay={idx * 120} style={{ flex: 1, minWidth: 260 }}>
                  <GlassCard glow={m.glow} style={styles.missionCard}>
                    <View style={[styles.missionIcon, { backgroundColor: m.glow === 'blue' ? 'rgba(59,130,246,0.18)' : m.glow === 'cyan' ? 'rgba(34,211,238,0.18)' : 'rgba(168,85,247,0.18)' }]}>
                      <Ionicons name={m.icon} size={22} color={m.glow === 'blue' ? colors.accentBright : m.glow === 'cyan' ? colors.cyan : colors.purple} />
                    </View>
                    <Text style={styles.missionTitle}>{m.title}</Text>
                    <Text style={styles.missionBody}>{m.body}</Text>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </View>
          </View>

          {/* ============================ TECH STACK ============================ */}
          <View style={styles.section}>
            <ScrollReveal>
              <Text style={styles.sectionLabel}>TECH STACK</Text>
              <Text style={[styles.sectionTitle, !isDesktop && styles.sectionTitleMobile]}>
                The frameworks behind{'\n'}
                <GradientText style={styles.sectionTitleGrad} colors={['#A855F7', '#EC4899']}>
                  our craft
                </GradientText>
              </Text>
            </ScrollReveal>

            <View style={styles.stackGrid}>
              {[
                { name: 'React Native', icon: 'logo-react' as const },
                { name: 'Python · FastAPI', icon: 'logo-python' as const },
                { name: 'TypeScript', icon: 'code-slash' as const },
                { name: 'MongoDB', icon: 'server-outline' as const },
                { name: 'AWS · Vercel', icon: 'cloud-outline' as const },
                { name: 'OpenAI · LLMs', icon: 'sparkles-outline' as const },
                { name: 'Ethereum · Web3', icon: 'cube-outline' as const },
                { name: 'CI / CD', icon: 'git-branch-outline' as const },
              ].map((s, idx) => (
                <ScrollReveal key={s.name} delay={idx * 60} style={{ flex: 1, minWidth: 150 }}>
                  <View style={styles.stackChip}>
                    <Ionicons name={s.icon} size={20} color={colors.accentBright} />
                    <Text style={styles.stackChipText}>{s.name}</Text>
                  </View>
                </ScrollReveal>
              ))}
            </View>
          </View>

          {/* ============================ PROJECTS ============================ */}
          <View style={styles.section}>
            <ScrollReveal>
              <Text style={styles.sectionLabel}>FEATURED PROJECTS</Text>
              <Text style={[styles.sectionTitle, !isDesktop && styles.sectionTitleMobile]}>
                Special projects with{'\n'}
                <GradientText style={styles.sectionTitleGrad} colors={['#60A5FA', '#22D3EE']}>
                  outsized ambition
                </GradientText>
              </Text>
            </ScrollReveal>

            <View style={[styles.projectsGrid, !isDesktop && styles.projectsGridMobile]}>
              <ProjectCard
                title="NoMoreFakeNews"
                category="AI · TRUST"
                tagline="An AI-powered platform engineered to identify, flag and dismantle disinformation in real time."
                gradient={['#3B82F6', '#A855F7']}
                status="Open for investors"
                onPress={() => router.push('/nomorefakenews')}
                isDesktop={isDesktop}
              />
              <ProjectCard
                title="Custodiy"
                category="WEB3 · COMMERCE"
                tagline="A modular platform for OTC trading, escrow, marketplaces and secure document custody."
                gradient={['#06B6D4', '#3B82F6']}
                status="v2.0 live"
                onPress={() => Linking.openURL('https://custodiy.com')}
                isDesktop={isDesktop}
                external
              />
              <ProjectCard
                title="Freety"
                category="COMMODITIES · AI"
                tagline="Digital infrastructure for global commodity & energy trading, with cargo tokenisation and AI tooling."
                gradient={['#10B981', '#22D3EE']}
                status="Active"
                onPress={() => router.push('/freety')}
                isDesktop={isDesktop}
              />
              <ProjectCard
                title="Cyber Security"
                category="ENTERPRISE · DEFENCE"
                tagline="Advanced protection programmes for businesses and individuals exposed to next-gen threats."
                gradient={['#F472B6', '#A855F7']}
                status="In R&D"
                onPress={() => router.push('/special-projects')}
                isDesktop={isDesktop}
              />
            </View>

            <View style={styles.sectionFooter}>
              <TouchableOpacity style={styles.ghostBtn} onPress={() => router.push('/special-projects')}>
                <Text style={styles.ghostBtnText}>View all projects</Text>
                <Ionicons name="arrow-forward" size={14} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* ============================ STATS ============================ */}
          <View style={styles.section}>
            <GlassCard style={styles.statsCard}>
              <View style={[styles.statsRow, !isTablet && styles.statsRowStacked]}>
                <StatItem to={15} suffix="+" label="Years of Engineering" />
                <StatItem to={50} suffix="+" label="Specialists Network" />
                <StatItem to={20} suffix="+" label="Active Clients" />
                <StatItem to={4} suffix="" label="Special Projects" />
              </View>
            </GlassCard>
          </View>

          {/* ============================ BLOG TEASER ============================ */}
          <View style={styles.section}>
            <ScrollReveal>
              <View style={styles.blogHeader}>
                <View>
                  <Text style={styles.sectionLabel}>INSIGHTS</Text>
                  <Text style={[styles.sectionTitle, !isDesktop && styles.sectionTitleMobile]}>
                    From the{' '}
                    <GradientText style={styles.sectionTitleGrad} colors={['#22D3EE', '#A855F7']}>
                      OTT lab
                    </GradientText>
                  </Text>
                </View>
                <TouchableOpacity style={styles.ghostBtn} onPress={() => router.push('/blog')}>
                  <Text style={styles.ghostBtnText}>All articles</Text>
                  <Ionicons name="arrow-forward" size={14} color={colors.text} />
                </TouchableOpacity>
              </View>
            </ScrollReveal>

            <View style={[styles.blogGrid, !isDesktop && styles.blogGridMobile]}>
              {articles.map((a, idx) => (
                <ScrollReveal key={a.slug} delay={idx * 100} style={{ flex: 1, minWidth: 260 }}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => router.push(`/blog/${a.slug}` as any)}
                    style={styles.blogCard}
                  >
                    <LinearGradient
                      colors={a.cover_gradient as any}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.blogCover}
                    >
                      <Text style={styles.blogCoverCategory}>{a.category.toUpperCase()}</Text>
                      <View style={styles.blogCoverIcon}>
                        <Ionicons name="newspaper" size={28} color="rgba(255,255,255,0.9)" />
                      </View>
                    </LinearGradient>
                    <View style={styles.blogBody}>
                      <Text style={styles.blogTitle} numberOfLines={2}>{a.title}</Text>
                      <Text style={styles.blogExcerpt} numberOfLines={3}>{a.excerpt}</Text>
                      <View style={styles.blogMeta}>
                        <Text style={styles.blogMetaText}>{formatDate(a.published_at)}</Text>
                        <Text style={styles.blogMetaText}>·</Text>
                        <Text style={styles.blogMetaText}>{a.read_time} min read</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </ScrollReveal>
              ))}
            </View>
          </View>

          {/* ============================ CTA ============================ */}
          <View style={[styles.section, styles.ctaSection]}>
            <ScrollReveal>
              <GlassCard glow="purple" style={styles.ctaCard}>
                <LinearGradient
                  colors={['rgba(59,130,246,0.15)', 'rgba(168,85,247,0.15)', 'rgba(34,211,238,0.15)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
                <Text style={[styles.ctaTitle, !isDesktop && { fontSize: 32 }]}>
                  Have a vision that needs{' '}
                  <GradientText style={styles.ctaTitleGrad} colors={['#22D3EE', '#A855F7']}>
                    elite engineering?
                  </GradientText>
                </Text>
                <Text style={styles.ctaSub}>
                  Whether you are launching a transformative product, scaling an enterprise platform, or seeking
                  an investor-grade R&D partner — we are ready when you are.
                </Text>
                <View style={styles.ctaButtons}>
                  <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/contact')}>
                    <Text style={styles.primaryBtnText}>Start a conversation</Text>
                    <Ionicons name="arrow-forward" size={16} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ghostBtn} onPress={() => router.push('/investor-inquiry')}>
                    <Text style={styles.ghostBtnText}>Investor inquiry</Text>
                  </TouchableOpacity>
                </View>
              </GlassCard>
            </ScrollReveal>
          </View>

          <SiteFooter />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function StatItem({ to, suffix, label, delay = 400 }: { to: number; suffix?: string; label: string; delay?: number }) {
  return (
    <View style={styles.statItem}>
      <AnimatedCounter to={to} suffix={suffix} startDelay={delay} style={styles.statValue} />
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ProjectCard({
  title,
  category,
  tagline,
  gradient,
  status,
  onPress,
  isDesktop,
  external,
}: {
  title: string;
  category: string;
  tagline: string;
  gradient: string[];
  status: string;
  onPress: () => void;
  isDesktop: boolean;
  external?: boolean;
}) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.projectCard, !isDesktop && styles.projectCardMobile]}>
      <LinearGradient colors={gradient as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.projectGradient} />
      <View style={styles.projectOverlay} />
      <View style={styles.projectInner}>
        <View style={styles.projectTop}>
          <Text style={styles.projectCategory}>{category}</Text>
          <View style={styles.projectStatus}>
            <View style={styles.projectStatusDot} />
            <Text style={styles.projectStatusText}>{status}</Text>
          </View>
        </View>
        <Text style={styles.projectTitle}>{title}</Text>
        <Text style={styles.projectTagline}>{tagline}</Text>
        <View style={styles.projectFooter}>
          <Text style={styles.projectLink}>
            {external ? 'Visit site' : 'Discover'}
          </Text>
          <Ionicons name={external ? 'open-outline' : 'arrow-forward'} size={16} color={colors.text} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, minHeight: '100%' as any },
  scroll: { minHeight: '100%' as any },

  // HERO
  hero: {
    minHeight: 720,
    paddingHorizontal: space.lg,
    paddingTop: space.xxl + 20,
    paddingBottom: space.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroMobile: { minHeight: 560, paddingTop: space.xl },
  eyebrow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 24, paddingHorizontal: 14, paddingVertical: 7, backgroundColor: colors.bgCard, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border },
  eyebrowDot: { width: 6, height: 6, borderRadius: 6, backgroundColor: colors.cyan },
  eyebrowText: { color: colors.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  heroTitle: { color: colors.text, fontSize: 76, lineHeight: 84, textAlign: 'center', fontWeight: '900', letterSpacing: -2, marginBottom: 24 },
  heroTitleMobile: { fontSize: 42, lineHeight: 48, letterSpacing: -1 },
  heroTitleGrad: { fontSize: 76, lineHeight: 84, fontWeight: '900', letterSpacing: -2 } as any,
  heroSub: { color: colors.textMuted, fontSize: 19, lineHeight: 30, textAlign: 'center', maxWidth: 720, marginBottom: 36 },
  heroSubMobile: { fontSize: 16, lineHeight: 26 },
  heroCtas: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24 },
  heroBadges: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'center' },
  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 7, backgroundColor: colors.bgCard, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border },
  heroBadgeText: { color: colors.text, fontSize: 12, fontWeight: '600' },

  // Orbit decoration
  orbitWrap: { position: 'absolute', right: -120, top: 80, width: 420, height: 420, opacity: 0.5 },
  orbitRing1: { position: 'absolute', inset: 0, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(34, 211, 238, 0.18)' } as any,
  orbitRing2: { position: 'absolute', top: 40, left: 40, right: 40, bottom: 40, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(168, 85, 247, 0.22)' },
  orbitRing3: { position: 'absolute', top: 100, left: 100, right: 100, bottom: 100, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(59, 130, 246, 0.3)' },
  orbitCore: { position: 'absolute', top: 180, left: 180, right: 180, bottom: 180, borderRadius: 999, backgroundColor: '#3B82F6', ...(Platform.OS === 'web' ? { boxShadow: '0 0 60px #22D3EE' } as any : {}) },

  scrollHint: { position: 'absolute', bottom: 16, alignItems: 'center', gap: 8 },
  scrollDot: { width: 4, height: 18, borderRadius: 2, backgroundColor: colors.cyan },
  scrollHintText: { color: colors.textDim, fontSize: 10, letterSpacing: 2, fontWeight: '700' },

  // BUTTONS
  primaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#3B82F6', paddingHorizontal: 22, paddingVertical: 13, borderRadius: radii.pill, ...(Platform.OS === 'web' ? { boxShadow: '0 12px 40px rgba(59,130,246,0.55)' } as any : {}) },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  ghostBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 18, paddingVertical: 12, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: 'rgba(255,255,255,0.02)' },
  ghostBtnText: { color: colors.text, fontSize: 14, fontWeight: '600' },

  // TICKER
  ticker: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(11,13,27,0.9)', borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border, marginVertical: 0 },
  tickerLabel: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#3B82F6', paddingHorizontal: 16, paddingVertical: 12 },
  tickerPulse: { width: 6, height: 6, borderRadius: 6, backgroundColor: '#fff' },
  tickerLabelText: { color: '#fff', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  tickerTrack: { flex: 1, overflow: 'hidden' },
  tickerInner: { flexDirection: 'row', paddingVertical: 12 },
  tickerText: { color: colors.text, fontSize: 13, fontWeight: '500', paddingHorizontal: 16, whiteSpace: 'nowrap' as any },

  // SECTIONS
  section: { paddingHorizontal: space.lg, paddingVertical: space.xxxl, maxWidth: 1280, width: '100%', marginHorizontal: 'auto' as any },
  sectionLabel: { color: colors.cyan, fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 12 },
  sectionTitle: { color: colors.text, fontSize: 48, lineHeight: 56, fontWeight: '900', letterSpacing: -1.2, marginBottom: 40 },
  sectionTitleMobile: { fontSize: 32, lineHeight: 38, letterSpacing: -0.8, marginBottom: 28 },
  sectionTitleGrad: { fontSize: 48, lineHeight: 56, fontWeight: '900', letterSpacing: -1.2 } as any,
  sectionFooter: { alignItems: 'center', marginTop: 32 },

  // MISSION
  missionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  missionGridMobile: { flexDirection: 'column' },
  missionCard: { gap: 14 },
  missionIcon: { width: 44, height: 44, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center' },
  missionTitle: { color: colors.text, fontSize: 22, fontWeight: '800' },
  missionBody: { color: colors.textMuted, fontSize: 15, lineHeight: 24 },

  // TECH STACK
  stackGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  stackChip: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14, borderRadius: radii.md, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  stackChipText: { color: colors.text, fontSize: 14, fontWeight: '600' },

  // PROJECTS
  projectsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  projectsGridMobile: { flexDirection: 'column' },
  projectCard: { flex: 1, minWidth: 280, minHeight: 280, borderRadius: radii.lg, overflow: 'hidden', position: 'relative', borderWidth: 1, borderColor: colors.border, ...(Platform.OS === 'web' ? { transition: 'transform 0.3s ease, box-shadow 0.3s ease' } as any : {}) },
  projectCardMobile: { minHeight: 240 },
  projectGradient: { ...StyleSheet.absoluteFillObject, opacity: 0.85 },
  projectOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(5, 6, 15, 0.55)' },
  projectInner: { padding: 24, flex: 1, justifyContent: 'space-between' },
  projectTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  projectCategory: { color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  projectStatus: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: radii.pill, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  projectStatusDot: { width: 6, height: 6, borderRadius: 6, backgroundColor: '#22D3EE' },
  projectStatusText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  projectTitle: { color: '#fff', fontSize: 28, fontWeight: '900', marginVertical: 8, letterSpacing: -0.5 },
  projectTagline: { color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 22, marginBottom: 16 },
  projectFooter: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start' },
  projectLink: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // STATS
  statsCard: { paddingVertical: 36 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: 24 },
  statsRowStacked: { flexDirection: 'column' },
  statItem: { alignItems: 'center', minWidth: 140 },
  statValue: { color: colors.text, fontSize: 56, fontWeight: '900', letterSpacing: -1.5 },
  statLabel: { color: colors.textMuted, fontSize: 13, fontWeight: '600', marginTop: 6, textTransform: 'uppercase' as any, letterSpacing: 1 },

  // BLOG
  blogHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 12 },
  blogGrid: { flexDirection: 'row', gap: 20, flexWrap: 'wrap' },
  blogGridMobile: { flexDirection: 'column' },
  blogCard: { flex: 1, borderRadius: radii.lg, overflow: 'hidden', backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, ...(Platform.OS === 'web' ? { transition: 'transform 0.3s ease, border-color 0.3s ease' } as any : {}) },
  blogCover: { height: 160, padding: 16, justifyContent: 'space-between' },
  blogCoverCategory: { color: 'rgba(255,255,255,0.95)', fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  blogCoverIcon: { alignSelf: 'flex-end' },
  blogBody: { padding: 20 },
  blogTitle: { color: colors.text, fontSize: 18, fontWeight: '800', lineHeight: 24, marginBottom: 8 },
  blogExcerpt: { color: colors.textMuted, fontSize: 14, lineHeight: 22, marginBottom: 14 },
  blogMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  blogMetaText: { color: colors.textDim, fontSize: 12 },

  // CTA
  ctaSection: { paddingBottom: space.xxxl },
  ctaCard: { paddingVertical: 56, paddingHorizontal: 32, alignItems: 'center', position: 'relative', overflow: 'hidden' },
  ctaTitle: { color: colors.text, fontSize: 44, fontWeight: '900', textAlign: 'center', letterSpacing: -1, lineHeight: 52, maxWidth: 820 },
  ctaTitleGrad: { fontSize: 44, fontWeight: '900', letterSpacing: -1, lineHeight: 52 } as any,
  ctaSub: { color: colors.textMuted, fontSize: 16, lineHeight: 26, textAlign: 'center', maxWidth: 620, marginTop: 18, marginBottom: 28 },
  ctaButtons: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
});
