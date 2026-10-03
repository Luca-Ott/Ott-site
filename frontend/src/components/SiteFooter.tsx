import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform, Image } from 'react-native';
import type { Href } from 'expo-router';
import NavigationLink from './NavigationLink';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, space } from '../theme/tokens';
import { SITE_NAME } from '../data/siteIdentity';

const LOGO_URL = 'https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68';

export default function SiteFooter() {

  return (
    <View style={styles.wrap}>
      <View style={styles.inner}>
        <View style={styles.grid}>
          <View style={styles.col}>
            <View style={styles.brandRow}>
              <Image source={{ uri: LOGO_URL }} style={styles.logo} resizeMode="contain" accessibilityLabel={SITE_NAME} />
              <Text style={styles.brandName}>{SITE_NAME}</Text>
            </View>
            <Text style={styles.brandCopy}>Irish IT company based in Dublin, specialising in Software Design, Development and R&D. Building the digital infrastructure of tomorrow.</Text>
            <View style={styles.socials}>
              <TouchableOpacity onPress={() => Linking.openURL('https://x.com/OnTechnolo1200')} style={styles.socialBtn}>
                <Ionicons name="logo-x" size={16} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('mailto:Info@ott4future.com')} style={styles.socialBtn}>
                <Ionicons name="mail-outline" size={16} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('tel:+447775682831')} style={styles.socialBtn}>
                <Ionicons name="call-outline" size={16} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.col}>
            <Text style={styles.colTitle}>Company</Text>
            <FooterLink label="About" href="/about" />
            <FooterLink label="Contact" href="/contact" />
            <FooterLink label="Investor Inquiry" href="/investor-inquiry" />
            <FooterLink label="Blog" href="/blog" />
            <FooterLink label="Careers" href="/careers" />
            <FooterLink label="Resources" href="/resources" />
          </View>

          <View style={styles.col}>
            <Text style={styles.colTitle}>Services</Text>
            <FooterLink label="Software Design" href="/software-design" />
            <FooterLink label="Software Development" href="/software-development" />
            <FooterLink label="R&D" href="/research-development" />
            <FooterLink label="AI Act Compliance" href="/ai-act-compliance" />
            <FooterLink label="Special Projects" href="/special-projects" />
          </View>

          <View style={styles.col}>
            <Text style={styles.colTitle}>Special Projects</Text>
            <FooterLink label="NoMoreFakeNews" href="/nomorefakenews" />
            <FooterLink label="Custodiy" href="https://custodiy.com" />
            <FooterLink label="SmartTrust" href="/smarttrust" />
            <FooterLink label="Freety" href="/freety" />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.bottomRow}>
          <Text style={styles.copy}>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</Text>
          <Text style={styles.copyDim}>The Black Church, St Mary’s Place, Dublin D07 P4AX — Ireland</Text>
        </View>
      </View>
    </View>
  );
}

function FooterLink({ label, href }: { label: string; href: Href }) {
  return (
    <NavigationLink href={href} style={styles.linkRow}>
      <Text style={styles.linkText}>{label}</Text>
    </NavigationLink>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#04050B',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: space.lg,
    paddingTop: space.xxxl,
    paddingBottom: space.xl,
  },
  inner: { maxWidth: 1280, marginHorizontal: 'auto', width: '100%' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between' },
  col: { minWidth: 200, flex: 1, maxWidth: 320, gap: 8 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 36, height: 36, borderRadius: 6 },
  brandName: { color: colors.text, fontSize: 14, fontWeight: '800', letterSpacing: 0.4, textTransform: 'uppercase' },
  brandCopy: { color: colors.textMuted, fontSize: 13, lineHeight: 20, marginTop: 8, maxWidth: 320 },
  socials: { flexDirection: 'row', gap: 8, marginTop: 12 },
  socialBtn: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  colTitle: { color: colors.text, fontSize: 13, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 10 },
  linkRow: { paddingVertical: 4 },
  linkText: {
    color: colors.textMuted, fontSize: 13.5, fontWeight: '500',
    ...(Platform.OS === 'web' && { transition: 'color 0.2s ease' } as any),
  },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 32 },
  bottomRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center' },
  copy: { color: colors.textDim, fontSize: 12 },
  copyDim: { color: colors.textDim, fontSize: 12 },
});
