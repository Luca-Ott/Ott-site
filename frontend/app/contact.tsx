import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, Alert, Dimensions, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Head from 'expo-router/head';

import PageShell from '../src/components/PageShell';
import GlassCard from '../src/components/GlassCard';
import GradientText from '../src/components/GradientText';
import { colors, radii, space } from '../src/theme/tokens';

export default function ContactScreen() {
  const router = useRouter();
  const dims = useWindowDimensions();
  const width = dims.width || 1200;
  const isDesktop = width >= 900;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const showAlert = (title: string, msg: string) => {
    if (typeof window !== 'undefined') window.alert(`${title}: ${msg}`);
    else Alert.alert(title, msg);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) return showAlert('Missing fields', 'Please fill in all fields.');
    if (!email.includes('@')) return showAlert('Invalid email', 'Please enter a valid email address.');
    setLoading(true);
    try {
      const res = await fetch('https://formspree.io/f/mvzgazqk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, message, _subject: 'New Contact Form — On Time Technology' }),
      });
      if (res.ok) router.replace('/contact-success');
      else {
        const data = await res.json().catch(() => ({}));
        showAlert('Error', data.error || data.errors?.[0]?.message || 'Failed to submit form');
      }
    } catch (e) {
      showAlert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <Head>
        <title>Contact — On Time Technology</title>
        <meta name="description" content="Get in touch with On Time Technology Ltd — talk to our team about software design, development, R&D and special projects." />
        <link rel="canonical" href="https://www.ott4future.com/contact" />
        <meta property="og:url" content="https://www.ott4future.com/contact" />
      </Head>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ width: '100%' }}>
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
          <Text style={styles.eyebrow}>GET IN TOUCH</Text>
          <Text style={[styles.title, !isDesktop && styles.titleMobile]}>
            Let’s build{' '}
            <GradientText style={styles.titleGrad} colors={['#60A5FA', '#A855F7']}>
              something exceptional
            </GradientText>
          </Text>
          <Text style={styles.subtitle}>Tell us about your project, your team, or simply say hello. We typically respond within one business day.</Text>
        </View>

        <View style={[styles.layout, !isDesktop && styles.layoutMobile]}>
          <View style={[styles.infoCol, !isDesktop && styles.infoColMobile]}>
            <InfoItem icon="mail-outline" label="Email" value="Info@ott4future.com" href="mailto:Info@ott4future.com" />
            <InfoItem icon="call-outline" label="Phone" value="+44 7775 682831" href="tel:+447775682831" />
            <InfoItem icon="location-outline" label="Address" value={'The Black Church, St Mary’s Place,\nDublin D07 P4AX, Ireland'} />
            <InfoItem icon="time-outline" label="Hours" value={'Mon – Fri\n09:00 – 18:00 GMT'} />
          </View>

          <GlassCard glow="blue" style={[styles.formCard, !isDesktop && styles.formCardMobile]}>
            <Text style={styles.formTitle}>Send a message</Text>
            <View style={styles.field}>
              <Text style={styles.label}>Full name</Text>
              <TextInput value={name} onChangeText={setName} placeholder="Jane Doe" placeholderTextColor={colors.textDim} style={styles.input} />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Email address</Text>
              <TextInput value={email} onChangeText={setEmail} placeholder="jane@company.com" placeholderTextColor={colors.textDim} keyboardType="email-address" autoCapitalize="none" style={styles.input} />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Message</Text>
              <TextInput value={message} onChangeText={setMessage} placeholder="Tell us about your project…" placeholderTextColor={colors.textDim} multiline numberOfLines={6} style={[styles.input, styles.textarea]} />
            </View>
            <TouchableOpacity style={[styles.submitBtn, loading && styles.submitBtnDisabled]} onPress={handleSubmit} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <><Text style={styles.submitBtnText}>Send message</Text><Ionicons name="arrow-forward" size={16} color="#fff" /></>}
            </TouchableOpacity>
            <Text style={styles.disclaimer}>By submitting this form you agree to be contacted by our team.</Text>
          </GlassCard>
        </View>
      </KeyboardAvoidingView>
    </PageShell>
  );
}

function InfoItem({ icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  const Wrap: any = href ? TouchableOpacity : View;
  return (
    <Wrap
      style={styles.infoRow}
      onPress={() => { if (href && typeof window !== 'undefined') window.open(href, '_self'); }}
      activeOpacity={href ? 0.8 : 1}
    >
      <View style={styles.infoIcon}><Ionicons name={icon} size={18} color={colors.cyan} /></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </Wrap>
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
  subtitle: { color: colors.textMuted, fontSize: 17, lineHeight: 28, marginTop: 16, maxWidth: 760 },

  layout: { flexDirection: 'row', gap: 32, maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: space.xl, paddingBottom: space.xxxl, alignItems: 'flex-start' },
  layoutMobile: { flexDirection: 'column' },
  infoCol: { flex: 1, gap: 18, maxWidth: 360 },
  infoColMobile: { maxWidth: '100%' as any, width: '100%' },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 14, padding: 14, borderRadius: radii.md, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  infoIcon: { width: 36, height: 36, borderRadius: radii.sm, backgroundColor: 'rgba(34,211,238,0.12)', alignItems: 'center', justifyContent: 'center' },
  infoLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' as any },
  infoValue: { color: colors.text, fontSize: 15, fontWeight: '600', marginTop: 4, lineHeight: 22 },

  formCard: { flex: 2, gap: 16, padding: 32 },
  formCardMobile: { width: '100%' as any, padding: 24 },
  formTitle: { color: colors.text, fontSize: 22, fontWeight: '800', marginBottom: 8 },
  field: { gap: 8 },
  label: { color: colors.textMuted, fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' as any },
  input: {
    color: colors.text, fontSize: 15,
    paddingHorizontal: 14, paddingVertical: Platform.OS === 'web' ? 14 : 12,
    borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, backgroundColor: 'rgba(255,255,255,0.03)',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}),
  },
  textarea: { minHeight: 140, textAlignVertical: 'top' },
  submitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: radii.pill, backgroundColor: '#3B82F6', marginTop: 8, ...(Platform.OS === 'web' ? { boxShadow: '0 12px 40px rgba(59,130,246,0.45)' } as any : {}) },
  submitBtnDisabled: { opacity: 0.6 },
  submitBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  disclaimer: { color: colors.textDim, fontSize: 12, textAlign: 'center', marginTop: 4 },
});
