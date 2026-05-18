import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, Alert, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Head from 'expo-router/head';

import PageShell from '../src/components/PageShell';
import GlassCard from '../src/components/GlassCard';
import GradientText from '../src/components/GradientText';
import PageSEO, { breadcrumbsSchema } from '../src/components/PageSEO';
import { colors, radii, space } from '../src/theme/tokens';

export default function InvestorInquiryScreen() {
  const router = useRouter();
  const dims = useWindowDimensions();
  const width = dims.width || 1200;
  const isDesktop = width >= 900;

  const [companyName, setCompanyName] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const showAlert = (title: string, msg: string) => {
    if (typeof window !== 'undefined') window.alert(`${title}: ${msg}`);
    else Alert.alert(title, msg);
  };

  const handleSubmit = async () => {
    if (!companyName.trim() || !name.trim() || !surname.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      return showAlert('Missing fields', 'Please fill in all fields.');
    }
    if (!email.includes('@')) return showAlert('Invalid email', 'Please enter a valid email address.');
    setLoading(true);
    try {
      const res = await fetch('https://formspree.io/f/mvzgazqk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          companyName, firstName: name, lastName: surname, email, phone, message,
          _subject: 'New Investor Inquiry — On Time Technology',
        }),
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
      <PageSEO
        title="Investor Inquiry — On Time Technology"
        description="Connect with On Time Technology for investment opportunities in our special projects — NoMoreFakeNews (AI trust), Custodiy (Web3), Freety (commodities). Talk to our team."
        canonical="https://www.ott4future.com/investor-inquiry"
        keywords="On Time Technology investors, NoMoreFakeNews investment, Custodiy investment, Freety investment, Irish AI startup investor, Dublin AI investment"
        schema={[
          breadcrumbsSchema([
            { name: 'Home', url: 'https://www.ott4future.com/' },
            { name: 'Investor Inquiry', url: 'https://www.ott4future.com/investor-inquiry' },
          ]),
        ]}
      />

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
          <Text style={styles.eyebrow}>INVESTOR RELATIONS</Text>
          <Text style={[styles.title, !isDesktop && styles.titleMobile]}>
            Partner with{' '}
            <GradientText style={styles.titleGrad} colors={['#22D3EE', '#A855F7']}>
              the next decade
            </GradientText>
          </Text>
          <Text style={styles.subtitle}>For institutional investors, family offices and strategic partners interested in our special projects — NoMoreFakeNews, Custodiy, Freety and beyond.</Text>
        </View>

        <View style={[styles.layout, !isDesktop && styles.layoutMobile]}>
          <View style={[styles.sideCol, !isDesktop && styles.sideColMobile]}>
            <Text style={styles.sideTitle}>Why On Time Technology?</Text>
            {[
              { icon: 'flash-outline', text: 'Working software, not slideware. Every project ships to production.' },
              { icon: 'shield-checkmark-outline', text: 'Ireland-registered. Transparent governance, audit-ready financials.' },
              { icon: 'planet-outline', text: 'Frontier focus: AI, Web3, trust infrastructure, global trade.' },
              { icon: 'rocket-outline', text: 'R&D-driven culture with a proven 15+ year delivery track record.' },
            ].map((b, idx) => (
              <View key={idx} style={styles.benefit}>
                <View style={styles.benefitIcon}><Ionicons name={b.icon as any} size={16} color={colors.cyan} /></View>
                <Text style={styles.benefitText}>{b.text}</Text>
              </View>
            ))}
          </View>

          <GlassCard glow="purple" style={[styles.formCard, !isDesktop && styles.formCardMobile]}>
            <Text style={styles.formTitle}>Investor inquiry form</Text>
            <View style={styles.row}>
              <View style={[styles.field, { flex: 1 }]}><Text style={styles.label}>Company name</Text><TextInput value={companyName} onChangeText={setCompanyName} placeholder="Acme Capital" placeholderTextColor={colors.textDim} style={styles.input} /></View>
            </View>
            <View style={[styles.row, !isDesktop && { flexDirection: 'column' }]}>
              <View style={[styles.field, { flex: 1 }]}><Text style={styles.label}>First name</Text><TextInput value={name} onChangeText={setName} placeholder="Jane" placeholderTextColor={colors.textDim} style={styles.input} /></View>
              <View style={[styles.field, { flex: 1 }]}><Text style={styles.label}>Last name</Text><TextInput value={surname} onChangeText={setSurname} placeholder="Doe" placeholderTextColor={colors.textDim} style={styles.input} /></View>
            </View>
            <View style={[styles.row, !isDesktop && { flexDirection: 'column' }]}>
              <View style={[styles.field, { flex: 1 }]}><Text style={styles.label}>Email</Text><TextInput value={email} onChangeText={setEmail} placeholder="jane@acme.com" placeholderTextColor={colors.textDim} keyboardType="email-address" autoCapitalize="none" style={styles.input} /></View>
              <View style={[styles.field, { flex: 1 }]}><Text style={styles.label}>Phone</Text><TextInput value={phone} onChangeText={setPhone} placeholder="+44 …" placeholderTextColor={colors.textDim} keyboardType="phone-pad" style={styles.input} /></View>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Message</Text>
              <TextInput value={message} onChangeText={setMessage} placeholder="Tell us about your interest in our projects…" placeholderTextColor={colors.textDim} multiline numberOfLines={6} style={[styles.input, styles.textarea]} />
            </View>
            <TouchableOpacity style={[styles.submitBtn, loading && styles.submitBtnDisabled]} onPress={handleSubmit} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <><Text style={styles.submitBtnText}>Submit inquiry</Text><Ionicons name="arrow-forward" size={16} color="#fff" /></>}
            </TouchableOpacity>
            <Text style={styles.disclaimer}>All inquiries are treated confidentially.</Text>
          </GlassCard>
        </View>
      </KeyboardAvoidingView>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  backWrap: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingTop: space.lg },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  backText: { color: colors.text, fontSize: 13, fontWeight: '600' },

  hero: { maxWidth: 980, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingTop: space.xl, paddingBottom: space.lg },
  eyebrow: { color: colors.cyan, fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 14 },
  title: { color: colors.text, fontSize: 52, lineHeight: 60, fontWeight: '900', letterSpacing: -1.5 },
  titleMobile: { fontSize: 34, lineHeight: 40, letterSpacing: -0.8 },
  titleGrad: { fontSize: 52, lineHeight: 60, fontWeight: '900', letterSpacing: -1.5 } as any,
  subtitle: { color: colors.textMuted, fontSize: 17, lineHeight: 28, marginTop: 16, maxWidth: 760 },

  layout: { flexDirection: 'row', gap: 32, maxWidth: 1180, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: space.lg, paddingVertical: space.xl, paddingBottom: space.xxxl, alignItems: 'flex-start' },
  layoutMobile: { flexDirection: 'column' },
  sideCol: { flex: 1, gap: 14, maxWidth: 320 },
  sideColMobile: { maxWidth: '100%' as any },
  sideTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 6 },
  benefit: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', padding: 14, backgroundColor: colors.bgCard, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border },
  benefitIcon: { width: 28, height: 28, borderRadius: 8, backgroundColor: 'rgba(34,211,238,0.12)', alignItems: 'center', justifyContent: 'center' },
  benefitText: { flex: 1, color: colors.textMuted, fontSize: 13.5, lineHeight: 21 },

  formCard: { flex: 2, gap: 14, padding: 32 },
  formCardMobile: { padding: 24 },
  formTitle: { color: colors.text, fontSize: 22, fontWeight: '800', marginBottom: 4 },
  row: { flexDirection: 'row', gap: 12 },
  field: { gap: 6 },
  label: { color: colors.textMuted, fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' as any },
  input: {
    color: colors.text, fontSize: 15,
    paddingHorizontal: 14, paddingVertical: Platform.OS === 'web' ? 14 : 12,
    borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, backgroundColor: 'rgba(255,255,255,0.03)',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}),
  },
  textarea: { minHeight: 130, textAlignVertical: 'top' },
  submitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: radii.pill, backgroundColor: '#3B82F6', marginTop: 8, ...(Platform.OS === 'web' ? { boxShadow: '0 12px 40px rgba(59,130,246,0.45)' } as any : {}) },
  submitBtnDisabled: { opacity: 0.6 },
  submitBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  disclaimer: { color: colors.textDim, fontSize: 12, textAlign: 'center', marginTop: 4 },
});
