import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import PageShell from '../src/components/PageShell';
import GlassCard from '../src/components/GlassCard';
import GradientText from '../src/components/GradientText';
import PageSEO, { breadcrumbsSchema } from '../src/components/PageSEO';
import Breadcrumbs from '../src/components/Breadcrumbs';
import { colors, radii, space } from '../src/theme/tokens';

const RESOURCES = [
  {
    id: 'ai-act-checklist',
    title: 'EU AI Act — Compliance Checklist (PDF)',
    badge: 'PILLAR RESOURCE',
    category: 'COMPLIANCE',
    body: '10-point engineering checklist to start AI Act compliance this week. Includes risk-classification template, Annex IV documentation outline and post-market monitoring plan.',
    gradient: ['#3B82F6', '#A855F7', '#22D3EE'],
    icon: 'shield-checkmark' as const,
  },
  {
    id: 'fake-news-report',
    title: 'The Fake News Detection Playbook 2026',
    badge: 'WHITEPAPER',
    category: 'AI TRUST',
    body: 'A practical guide to building disinformation-detection pipelines: provenance signals, watermarking, human-in-the-loop verification and content-credentials standards.',
    gradient: ['#A855F7', '#EC4899', '#F472B6'],
    icon: 'newspaper' as const,
  },
  {
    id: 'tokenised-commodities',
    title: 'Tokenised Commodities — Market Map 2026',
    badge: 'REPORT',
    category: 'WEB3 · FINTECH',
    body: 'How real-world assets — cargo, energy, metals — are moving on-chain in 2026. Use cases, regulatory posture in Ireland and infrastructure stack.',
    gradient: ['#10B981', '#22D3EE', '#3B82F6'],
    icon: 'cube' as const,
  },
  {
    id: 'custodial-wallet-ireland',
    title: 'Custodial Wallets in Ireland — Regulatory Brief',
    badge: 'BRIEF',
    category: 'REGULATORY',
    body: 'CASP licensing under MiCA, AML/KYC obligations, custodial architecture choices and what changes for Irish startups offering crypto custody.',
    gradient: ['#06B6D4', '#3B82F6', '#1E1B4B'],
    icon: 'lock-closed' as const,
  },
];

export default function ResourcesScreen() {
  const router = useRouter();
  const dims = useWindowDimensions();
  const width = dims.width || 1200;
  const isDesktop = width >= 900;

  const [email, setEmail] = useState('');
  const [resource, setResource] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [sentFor, setSentFor] = useState<string | null>(null);

  const requestResource = async (resId: string, resTitle: string) => {
    if (!email.trim() || !email.includes('@')) {
      if (typeof window !== 'undefined') window.alert('Please enter a valid email to receive the resource.');
      return;
    }
    setLoading(true);
    setResource(resId);
    try {
      const res = await fetch('https://formspree.io/f/mvzgazqk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, resource: resTitle, _subject: `Resource request: ${resTitle}` }),
      });
      if (res.ok) setSentFor(resId);
      else if (typeof window !== 'undefined') window.alert('Could not register your request. Please try again.');
    } catch (e) {
      if (typeof window !== 'undefined') window.alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <PageSEO
        title="Resources — Whitepapers, Checklists & AI Act Tools | On Time Technology"
        description="Free resources from On Time Technology — EU AI Act compliance checklist, fake-news detection playbook, tokenised commodities market map and custodial wallet Ireland regulatory brief."
        canonical="https://www.ott4future.com/resources"
        keywords="EU AI Act checklist PDF, AI Act resources, fake news whitepaper, tokenized commodities report, custodial wallet Ireland brief"
        schema={[
          breadcrumbsSchema([
            { name: 'Home', url: 'https://www.ott4future.com/' },
            { name: 'Resources', url: 'https://www.ott4future.com/resources' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'On Time Technology Resources',
            url: 'https://www.ott4future.com/resources',
          },
        ]}
      />

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources' }]} />

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>RESOURCES · WHITEPAPERS · CHECKLISTS</Text>
        <Text style={[styles.title, !isDesktop && styles.titleMobile]}>
          Knowledge for the{' '}
          <GradientText style={styles.titleGrad} colors={['#60A5FA', '#A855F7', '#22D3EE']}>
            next decade
          </GradientText>
        </Text>
        <Text style={styles.subtitle}>
          Practical, free-to-download resources from On Time Technology for engineering teams, founders and
          decision-makers shipping AI, Web3 and compliant software in 2026 and beyond.
        </Text>
      </View>

      <View style={[styles.emailBar, !isDesktop && styles.emailBarMobile]}>
        <GlassCard glow="blue" style={styles.emailCard}>
          <Text style={styles.emailLabel}>Enter your email to unlock all resources</Text>
          <View style={[styles.emailRow, !isDesktop && { flexDirection: 'column' }]}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@company.com"
              placeholderTextColor={colors.textDim}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.emailInput}
            />
            <View style={styles.emailHint}>
              <Ionicons name="lock-closed-outline" size={14} color={colors.textMuted} />
              <Text style={styles.emailHintText}>We never share your email. One-click unsubscribe.</Text>
            </View>
          </View>
        </GlassCard>
      </View>

      <View style={[styles.grid, !isDesktop && styles.gridMobile]}>
        {RESOURCES.map((r) => (
          <TouchableOpacity
            key={r.id}
            activeOpacity={0.9}
            style={[styles.card, !isDesktop && styles.cardMobile]}
            onPress={() => requestResource(r.id, r.title)}
            disabled={loading}
          >
            <LinearGradient colors={r.gradient as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cover}>
              <View style={styles.coverBadge}><Text style={styles.coverBadgeText}>{r.badge}</Text></View>
              <View style={styles.coverIcon}>
                <Ionicons name={r.icon} size={32} color="rgba(255,255,255,0.95)" />
              </View>
            </LinearGradient>
            <View style={styles.body}>
              <Text style={styles.category}>{r.category}</Text>
              <Text style={styles.cardTitle}>{r.title}</Text>
              <Text style={styles.cardBody}>{r.body}</Text>
              <View style={styles.cardFooter}>
                {loading && resource === r.id ? (
                  <ActivityIndicator color={colors.cyan} />
                ) : sentFor === r.id ? (
                  <View style={styles.sentRow}>
                    <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                    <Text style={[styles.cardLink, { color: colors.success }]}>Request received — check your inbox</Text>
                  </View>
                ) : (
                  <>
                    <Text style={styles.cardLink}>Send me this resource</Text>
                    <Ionicons name="download-outline" size={16} color={colors.text} />
                  </>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.disclaimer}>
        <Ionicons name="information-circle-outline" size={16} color={colors.textMuted} />
        <Text style={styles.disclaimerText}>
          Resources are delivered via email. By requesting one, you agree to receive a single follow-up email
          from On Time Technology with the document.
        </Text>
      </View>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  hero: { maxWidth: 980, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingTop: space.xl, paddingBottom: space.lg },
  eyebrow: { color: colors.cyan, fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 14 },
  title: { color: colors.text, fontSize: 56, lineHeight: 64, fontWeight: '900', letterSpacing: -1.5 },
  titleMobile: { fontSize: 36, lineHeight: 42, letterSpacing: -0.8 },
  titleGrad: { fontSize: 56, lineHeight: 64, fontWeight: '900', letterSpacing: -1.5 } as any,
  subtitle: { color: colors.textMuted, fontSize: 17, lineHeight: 28, marginTop: 18, maxWidth: 820 },

  emailBar: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, marginVertical: space.lg },
  emailBarMobile: {},
  emailCard: { padding: 20, gap: 10 },
  emailLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' as any },
  emailRow: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  emailInput: { flex: 1, color: colors.text, fontSize: 15, paddingHorizontal: 14, paddingVertical: Platform.OS === 'web' ? 12 : 10, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, backgroundColor: 'rgba(255,255,255,0.03)', ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}) },
  emailHint: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  emailHintText: { color: colors.textMuted, fontSize: 12 },

  grid: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, flexDirection: 'row', flexWrap: 'wrap', gap: 18 },
  gridMobile: { flexDirection: 'column' },
  card: { flex: 1, flexBasis: '48%' as any, flexGrow: 1, minWidth: 320, maxWidth: 600, borderRadius: radii.lg, overflow: 'hidden', backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  cardMobile: { flexBasis: 'auto' as any, maxWidth: '100%' as any },
  cover: { height: 130, padding: 18, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-start' },
  coverBadge: { paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: radii.pill, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  coverBadgeText: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 1.4 },
  coverIcon: { padding: 4 },
  body: { padding: 22, gap: 8 },
  category: { color: colors.cyan, fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  cardTitle: { color: colors.text, fontSize: 19, fontWeight: '800', lineHeight: 26 },
  cardBody: { color: colors.textMuted, fontSize: 14, lineHeight: 22 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  cardLink: { color: colors.text, fontSize: 14, fontWeight: '700' },
  sentRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  disclaimer: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingTop: space.lg, paddingBottom: space.xxxl, flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  disclaimerText: { color: colors.textMuted, fontSize: 12.5, lineHeight: 20, flex: 1 },
});
