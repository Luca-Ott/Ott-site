import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '../theme/tokens';

export default function ResetGuardReservationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState('both');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);

  async function submit() {
    if (loading) return;
    setError('');
    if (!name.trim() || name.trim().length > 80) return setError('Please enter your name (up to 80 characters).');
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email.trim())) return setError('Please enter a valid email address.');
    if (!consent) return setError('Please agree to receive your reservation confirmation and launch-offer details.');
    setLoading(true);
    try {
      const response = await fetch('/api/resetguard-reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, platform, consent, website }),
        signal: AbortSignal.timeout(45_000),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok !== true) throw new Error(data.error || 'We could not send your code. Please try again shortly.');
      setComplete(true);
    } catch (err) {
      setError(err instanceof Error && err.name !== 'TimeoutError' ? err.message : 'The request timed out. Please try again; your reservation will keep the same code.');
    } finally { setLoading(false); }
  }

  if (complete) return (
    <View style={styles.success} accessibilityLiveRegion="polite">
      <Ionicons name="checkmark-circle" size={44} color={colors.green} />
      <Text role="heading" aria-level={3} style={styles.successTitle}>Your reservation is confirmed.</Text>
      <Text style={styles.body}>Your personal 40% discount code has been sent to {email.trim()}. Keep the email to claim your offer when ResetGuard launches.</Text>
      <Text style={styles.note}>If it does not arrive, check your spam folder or contact info@ott4future.com. No payment has been taken.</Text>
    </View>
  );

  return (
    <View style={styles.form}>
      <View style={styles.field}>
        <Text style={styles.label}>Name</Text>
        <TextInput accessibilityLabel="Your name" value={name} onChangeText={setName} autoComplete="name" maxLength={80} placeholder="Your name" placeholderTextColor={colors.textDim} style={styles.input} editable={!loading} />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Email address</Text>
        <TextInput accessibilityLabel="Your email address" value={email} onChangeText={setEmail} autoComplete="email" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} maxLength={254} placeholder="you@example.com" placeholderTextColor={colors.textDim} style={styles.input} editable={!loading} />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Your platform</Text>
        <View accessibilityRole="radiogroup" accessibilityLabel="Preferred platform" style={styles.platformOptions}>
          {[['android', 'Android'], ['ios', 'iOS'], ['both', 'Both']].map(([value, label]) => (
            <TouchableOpacity key={value} accessibilityRole="radio" accessibilityState={{ checked: platform === value }} onPress={() => setPlatform(value)} disabled={loading} style={[styles.option, platform === value && styles.optionSelected]}>
              <Text style={[styles.optionText, platform === value && styles.optionTextSelected]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.honeypot} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <TextInput accessibilityLabel="Leave this field empty" value={website} onChangeText={setWebsite} autoComplete="off" tabIndex={-1} />
      </View>
      <TouchableOpacity accessibilityRole="checkbox" accessibilityLabel="Receive my reservation confirmation and ResetGuard launch-offer details" accessibilityState={{ checked: consent }} onPress={() => setConsent(!consent)} disabled={loading} style={styles.consent}>
        <Ionicons name={consent ? 'checkbox' : 'square-outline'} size={24} color={consent ? colors.cyan : colors.textMuted} />
        <Text style={styles.consentText}>I agree to receive my reservation confirmation, personal discount code and ResetGuard launch-offer details by email.</Text>
      </TouchableOpacity>
      <Text style={styles.note}>We use your name, email address and platform preference to manage your reservation and launch offer. No payment details are requested.</Text>
      {error ? <Text role="alert" accessibilityLiveRegion="assertive" style={styles.error}>{error}</Text> : null}
      <TouchableOpacity accessibilityRole="button" onPress={submit} disabled={loading} style={[styles.submit, loading && styles.submitting]}>
        {loading ? <ActivityIndicator color="#fff" /> : <><Text style={styles.submitText}>Email my 40% discount code</Text><Ionicons name="mail-outline" size={18} color="#fff" /></>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { width: '100%', gap: 20 },
  field: { gap: 8 },
  label: { color: colors.text, fontSize: 13, fontWeight: '700' },
  input: { width: '100%', color: colors.text, backgroundColor: 'rgba(5,6,15,0.5)', borderWidth: 1, borderColor: colors.borderStrong, borderRadius: radii.md, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16 },
  platformOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: { borderWidth: 1, borderColor: colors.borderStrong, borderRadius: radii.pill, paddingVertical: 10, paddingHorizontal: 18 },
  optionSelected: { borderColor: colors.cyan, backgroundColor: 'rgba(34,211,238,0.12)' },
  optionText: { color: colors.textMuted, fontSize: 14, fontWeight: '600' },
  optionTextSelected: { color: colors.cyan },
  consent: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  consentText: { color: colors.textMuted, fontSize: 13, lineHeight: 21, flex: 1 },
  note: { color: colors.textDim, fontSize: 12, lineHeight: 20 },
  honeypot: { position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0, pointerEvents: 'none' },
  submit: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 10, backgroundColor: colors.accent, borderRadius: radii.pill, paddingVertical: 14, paddingHorizontal: 22 },
  submitting: { opacity: 0.65 },
  submitText: { color: '#fff', fontSize: 14, fontWeight: '700', textAlign: 'center' },
  error: { color: '#FCA5A5', fontSize: 14, lineHeight: 23 },
  success: { gap: 16, borderWidth: 1, borderColor: 'rgba(106,242,138,0.35)', borderRadius: radii.lg, padding: 24, backgroundColor: 'rgba(106,242,138,0.05)' },
  successTitle: { color: colors.text, fontSize: 24, lineHeight: 32, fontWeight: '800' },
  body: { color: colors.textMuted, fontSize: 15, lineHeight: 25 },
});
