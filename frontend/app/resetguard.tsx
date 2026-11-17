import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import PageShell from '../src/components/PageShell';
import NavigationLink from '../src/components/NavigationLink';
import ResetGuardReservationForm from '../src/components/ResetGuardReservationForm';
import PageSEO, { breadcrumbsSchema } from '../src/components/PageSEO';
import { RESETGUARD_PROJECT as project } from '../src/data/resetguard';
import { SITE_NAME, SITE_URL } from '../src/data/siteIdentity';
import { colors, radii, space } from '../src/theme/tokens';

const FEATURES = [
  { icon: 'shield-checkmark-outline', title: 'Secure access', body: 'Protect access to the app and its settings with a PIN and supported biometric authentication.' },
  { icon: 'flash-outline', title: 'Quick activation', body: 'Prepare your preferred emergency activation method for a compatible device.' },
  { icon: 'phone-portrait-outline', title: 'Guided setup', body: 'Follow a clear setup flow to configure the app and prepare the required device-management connection.' },
  { icon: 'apps-outline', title: 'Android & iOS', body: 'In development for both Android and iOS, with activation options tailored to each operating system.' },
] as const;

export default function ResetGuardScreen() {
  const { width } = useWindowDimensions();
  const desktop = width >= 900;
  const reservationRef = useRef<View>(null);
  const showReservation = () => {
    const element = reservationRef.current as unknown as HTMLElement | null;
    element?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PageShell>
      <PageSEO
        title={`ResetGuard — Android & iOS Security App | ${project.status}`}
        description={`${project.description} Reserve now to receive a personal code for 40% off the list price.`}
        canonical={project.url}
        keywords="ResetGuard, Android security app, iOS security app, mobile device protection, emergency device reset, On Time Technology"
        schema={[
          breadcrumbsSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Special Projects', url: `${SITE_URL}special-projects` },
            { name: project.name, url: project.url },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${project.url}#webpage`,
            name: `${project.name} — ${project.status}`,
            description: project.description,
            url: project.url,
            isPartOf: { '@id': `${SITE_URL}#website` },
            publisher: { '@id': `${SITE_URL}#organization` },
          },
        ]}
      />

      <View style={styles.backWrap}>
        <NavigationLink href="/" replace style={styles.backLink}>
          <Ionicons name="arrow-back" size={16} color={colors.text} />
          <Text style={styles.backText}>Back to home</Text>
        </NavigationLink>
      </View>

      <View style={[styles.hero, desktop && styles.heroDesktop]}>
        <View style={styles.heroCopy}>
          <View style={styles.brandRow}>
            <Image source={{ uri: project.logo }} style={styles.logo} resizeMode="contain" accessibilityLabel="ResetGuard app icon" />
            <View style={styles.brandMeta}>
              <Text style={styles.eyebrow}>{project.category}</Text>
              <View style={styles.status}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>{project.status}</Text>
              </View>
            </View>
          </View>
          <Text role="heading" aria-level={1} style={[styles.title, !desktop && styles.titleMobile]}>{project.name}</Text>
          <Text role="heading" aria-level={2} style={[styles.headline, !desktop && styles.headlineMobile]}>
            Emergency protection.{ '\n' }Within reach.
          </Text>
          <Text style={styles.description}>{project.description}</Text>
          <Text style={styles.purpose}>Built for emergencies when protecting the information on your phone becomes the priority. A factory reset erases data on the device; ResetGuard brings preparation, secure access and your chosen activation method into one app.</Text>
          <View style={styles.platforms}>
            <View style={styles.platform}><Ionicons name="logo-android" size={19} color={colors.cyan} /><Text style={styles.platformText}>Android</Text></View>
            <View style={styles.platform}><Ionicons name="logo-apple" size={19} color={colors.text} /><Text style={styles.platformText}>iOS</Text></View>
          </View>
          <Text style={styles.launchCopy}>In development for Android and iOS. Launch details will be announced here.</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={showReservation} style={styles.primaryButton} accessibilityRole="button">
              <Text style={styles.primaryText}>Reserve &amp; save 40%</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
            <NavigationLink href="/special-projects" style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>Explore our projects</Text>
            </NavigationLink>
          </View>
        </View>

        <View style={styles.previewColumn}>
          <Text style={styles.previewLabel}>INSIDE THE APP</Text>
          <View style={styles.phoneFrame}>
            <Image
              source={{ uri: project.screenshot }}
              accessibilityLabel="Screenshot of the ResetGuard mobile app"
              resizeMode="contain"
              style={styles.screenshot}
            />
          </View>
          <Text style={styles.caption}>Development build · Interface preview</Text>
        </View>
      </View>

      <View ref={reservationRef} nativeID="reserve" style={styles.reservationSection}>
        <View style={[styles.reservationCard, desktop && styles.reservationDesktop]}>
          <View style={styles.offerCopy}>
            <Text style={styles.eyebrow}>EARLY RESERVATION · NO PAYMENT REQUIRED</Text>
            <Text role="heading" aria-level={2} style={styles.offerTitle}>Reserve ResetGuard.{'\n'}Save 40%.</Text>
            <Text style={styles.offerBody}>Complete the form to receive your personal, unique discount code by email. Your code gives you 40% off the published ResetGuard list price.</Text>
            <Text style={styles.offerBody}>Keep your code and use the same email address when claiming the offer. Redemption instructions will be provided when the Android and iOS app launches.</Text>
          </View>
          <View style={styles.offerForm}><ResetGuardReservationForm /></View>
        </View>
      </View>

      <View style={styles.featuresSection}>
        <Text style={styles.eyebrow}>DESIGNED FOR PEACE OF MIND</Text>
        <Text role="heading" aria-level={2} style={styles.sectionTitle}>Simple controls. A prepared device.</Text>
        <View style={[styles.features, !desktop && styles.featuresMobile]}>
          {FEATURES.map((feature) => (
            <View key={feature.title} style={styles.feature}>
              <LinearGradient colors={['rgba(34,211,238,0.12)', 'rgba(59,130,246,0.03)']} style={StyleSheet.absoluteFill} />
              <Ionicons name={feature.icon} size={26} color={colors.cyan} />
              <Text role="heading" aria-level={3} style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureBody}>{feature.body}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.compatibility}>Emergency reset requires a compatible device and the required device-management enrolment. Available activation methods depend on the operating system and device configuration.</Text>
        <Text style={styles.credit}>A project by {SITE_NAME}.</Text>
      </View>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  backWrap: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto', paddingHorizontal: space.lg, paddingTop: space.lg },
  backLink: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', paddingVertical: 10 },
  backText: { color: colors.text, fontSize: 13, fontWeight: '600' },
  hero: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto', paddingHorizontal: space.lg, paddingTop: space.xl, paddingBottom: space.xxxl, gap: 48 },
  heroDesktop: { flexDirection: 'row', alignItems: 'center', gap: 72 },
  heroCopy: { flex: 1, minWidth: 0 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 24 },
  logo: { width: 72, height: 72, borderRadius: 18 },
  brandMeta: { gap: 10 },
  eyebrow: { color: colors.cyan, fontSize: 11, lineHeight: 18, fontWeight: '800', letterSpacing: 1.8 },
  status: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 7, borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(251,191,36,0.10)', borderWidth: 1, borderColor: 'rgba(251,191,36,0.30)' },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FBBF24' },
  statusText: { color: '#FDE68A', fontSize: 12, fontWeight: '700' },
  title: { color: colors.text, fontSize: 64, lineHeight: 74, fontWeight: '900', letterSpacing: -2, marginBottom: 16 },
  titleMobile: { fontSize: 44, lineHeight: 52, letterSpacing: -1.2 },
  headline: { color: colors.cyan, fontSize: 34, lineHeight: 43, fontWeight: '700', letterSpacing: -0.7 },
  headlineMobile: { fontSize: 28, lineHeight: 36 },
  description: { color: colors.textMuted, fontSize: 17, lineHeight: 29, marginTop: 22, maxWidth: 590 },
  purpose: { color: colors.textMuted, fontSize: 15, lineHeight: 25, marginTop: 14, maxWidth: 590 },
  platforms: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 24 },
  platform: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: colors.borderStrong, borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 9, backgroundColor: colors.bgCard },
  platformText: { color: colors.text, fontSize: 14, fontWeight: '700' },
  launchCopy: { color: colors.textMuted, fontSize: 13, lineHeight: 21, marginTop: 16 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 26 },
  primaryButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: radii.pill, backgroundColor: colors.accent, paddingHorizontal: 20, paddingVertical: 13 },
  primaryText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  secondaryButton: { justifyContent: 'center', borderRadius: radii.pill, borderWidth: 1, borderColor: colors.borderStrong, paddingHorizontal: 18, paddingVertical: 12 },
  secondaryText: { color: colors.text, fontSize: 14, fontWeight: '600' },
  previewColumn: { alignItems: 'center', alignSelf: 'center', gap: 14, width: '100%', maxWidth: 320 },
  previewLabel: { color: colors.cyan, fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  phoneFrame: { width: '100%', maxWidth: 290, borderRadius: 32, borderWidth: 1, borderColor: 'rgba(125,220,255,0.25)', padding: 7, backgroundColor: '#020817', overflow: 'hidden' },
  screenshot: { width: '100%', aspectRatio: 942 / 2048, borderRadius: 25 },
  caption: { color: colors.textDim, fontSize: 12, textAlign: 'center', lineHeight: 19 },
  reservationSection: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto', paddingHorizontal: space.lg, paddingBottom: space.xxxl },
  reservationCard: { borderWidth: 1, borderColor: 'rgba(34,211,238,0.25)', backgroundColor: 'rgba(11,24,50,0.85)', borderRadius: radii.lg, padding: 24, gap: 32 },
  reservationDesktop: { flexDirection: 'row', alignItems: 'flex-start', padding: 36, gap: 48 },
  offerCopy: { flex: 1, minWidth: 0, gap: 16 },
  offerTitle: { color: colors.text, fontSize: 34, lineHeight: 43, fontWeight: '900', letterSpacing: -0.7 },
  offerBody: { color: colors.textMuted, fontSize: 15, lineHeight: 26 },
  offerForm: { flex: 1, minWidth: 0 },
  featuresSection: { maxWidth: 1180, width: '100%', marginHorizontal: 'auto', paddingHorizontal: space.lg, paddingBottom: space.xxxl },
  sectionTitle: { color: colors.text, fontSize: 30, lineHeight: 39, fontWeight: '800', letterSpacing: -0.5, marginTop: 10, marginBottom: 24 },
  features: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  featuresMobile: { flexDirection: 'column' },
  feature: { flex: 1, minWidth: 220, padding: 22, gap: 12, borderWidth: 1, borderColor: colors.border, borderRadius: radii.lg, overflow: 'hidden', backgroundColor: colors.bgCard },
  featureTitle: { color: colors.text, fontSize: 18, fontWeight: '800', lineHeight: 25 },
  featureBody: { color: colors.textMuted, fontSize: 14, lineHeight: 23 },
  compatibility: { color: colors.textMuted, fontSize: 13, lineHeight: 22, maxWidth: 850, marginTop: 26 },
  credit: { color: colors.textDim, fontSize: 12, marginTop: 14 },
});
