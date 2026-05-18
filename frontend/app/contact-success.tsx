import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Head from 'expo-router/head';

import PageShell from '../src/components/PageShell';
import GlassCard from '../src/components/GlassCard';
import GradientText from '../src/components/GradientText';
import PageSEO from '../src/components/PageSEO';
import { colors, radii, space } from '../src/theme/tokens';

export default function ContactSuccessScreen() {
  const router = useRouter();
  const dims = useWindowDimensions();
  const width = dims.width || 1200;
  const isDesktop = width >= 900;

  return (
    <PageShell hideFooter>
      <PageSEO
        title="Thank You — Message Received | On Time Technology"
        description="Thank you for contacting On Time Technology. Our team will be in touch shortly."
        canonical="https://www.ott4future.com/contact-success"
        noindex
      />

      <View style={styles.wrap}>
        <GlassCard glow="cyan" style={styles.card}>
          <LinearGradient
            colors={['rgba(34,211,238,0.18)', 'rgba(59,130,246,0.18)', 'rgba(168,85,247,0.18)']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill as any}
          />
          <View style={styles.iconWrap}>
            <Ionicons name="checkmark" size={36} color="#fff" />
          </View>
          <Text style={styles.eyebrow}>MESSAGE SENT</Text>
          <Text style={[styles.title, !isDesktop && { fontSize: 36, lineHeight: 42 }]}>
            Thank you for{' '}
            <GradientText style={styles.titleGrad} colors={['#22D3EE', '#A855F7']}>reaching out</GradientText>
          </Text>
          <Text style={styles.body}>
            We received your message and a member of our team will be in touch within one business day.
            In the meantime, you may want to explore our latest insights and projects.
          </Text>
          <View style={styles.ctaRow}>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => router.replace('/')}>
              <Ionicons name="home-outline" size={16} color="#fff" />
              <Text style={styles.primaryBtnText}>Back to home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ghostBtn} onPress={() => router.replace('/blog')}>
              <Text style={styles.ghostBtnText}>Read our blog</Text>
              <Ionicons name="arrow-forward" size={14} color={colors.text} />
            </TouchableOpacity>
          </View>
        </GlassCard>
      </View>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: space.lg, paddingVertical: space.xxxl, minHeight: 600 },
  card: { maxWidth: 640, width: '100%', padding: 44, alignItems: 'center', position: 'relative', overflow: 'hidden' },
  iconWrap: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#10B981', alignItems: 'center', justifyContent: 'center', marginBottom: 18, ...(typeof window !== 'undefined' ? ({ boxShadow: '0 12px 40px rgba(16,185,129,0.5)' } as any) : {}) },
  eyebrow: { color: colors.cyan, fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 8 },
  title: { color: colors.text, fontSize: 44, lineHeight: 52, fontWeight: '900', letterSpacing: -1, textAlign: 'center' },
  titleGrad: { fontSize: 44, lineHeight: 52, fontWeight: '900', letterSpacing: -1 } as any,
  body: { color: colors.textMuted, fontSize: 16, lineHeight: 26, textAlign: 'center', marginTop: 16, marginBottom: 22, maxWidth: 480 },
  ctaRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', justifyContent: 'center' },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#3B82F6', paddingHorizontal: 22, paddingVertical: 13, borderRadius: radii.pill },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  ghostBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 18, paddingVertical: 12, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: 'rgba(255,255,255,0.02)' },
  ghostBtnText: { color: colors.text, fontSize: 14, fontWeight: '600' },
});
