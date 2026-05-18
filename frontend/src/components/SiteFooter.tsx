import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, space } from '../theme/tokens';

const LOGO_URL = 'https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68';

export default function SiteFooter() {
  const router = useRouter();

  return (
    <View style={styles.wrap}>
      <View style={styles.inner}>
        <View style={styles.grid}>
          <View style={styles.col}>
            <View style={styles.brandRow}>
              <Image source={{ uri: LOGO_URL }} style={styles.logo} resizeMode="contain" />
              <Text style={styles.brandName}>ON TIME TECHNOLOGY LTD</Text>
            </View>
            <Text style={styles.brandCopy}>Irish IT company based in Dublin, specialising in Software Design, Development and R&D. Building the digital infrastructure of tomorrow.</Text>
            <View style={styles.socials}>
              <TouchableOpacity onPress={() => Linking.openURL('https://x.com/OnTechnolo1200')} style={styles.socialBtn}>
                <Ionicons name="logo-twitter" size={16} color={colors.text} />
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
            <FooterLink label="About" onPress={() => router.push('/about')} />
            <FooterLink label="Contact" onPress={() => router.push('/contact')} />
            <FooterLink label="Investor Inquiry" onPress={() => router.push('/investor-inquiry')} />
            <FooterLink label="Blog" onPress={() => router.push('/blog')} />
            <FooterLink label="Resources" onPress={() => router.push('/resources')} />
          </View>

          <View style={styles.col}>
            <Text style={styles.colTitle}>Services</Text>
            <FooterLink label="Software Design" onPress={() => router.push('/software-design')} />
            <FooterLink label="Software Development" onPress={() => router.push('/software-development')} />
            <FooterLink label="R&D" onPress={() => router.push('/research-development')} />
            <FooterLink label="AI Act Compliance" onPress={() => router.push('/ai-act-compliance')} />
            <FooterLink label="Special Projects" onPress={() => router.push('/special-projects')} />
          </View>

          <View style={styles.col}>
            <Text style={styles.colTitle}>Special Projects</Text>
            <FooterLink label="NoMoreFakeNews" onPress={() => router.push('/nomorefakenews')} />
            <FooterLink label="Custodiy" onPress={() => Linking.openURL('https://custodiy.com')} />
            <FooterLink label="Freety" onPress={() => router.push('/freety')} />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.bottomRow}>
          <Text style={styles.copy}>© {new Date().getFullYear()} On Time Technology Ltd. All rights reserved.</Text>
          <Text style={styles.copyDim}>The Black Church, St Mary’s Place, Dublin D07 P4AX — Ireland</Text>
        </View>
      </View>
    </View>
  );
}

function FooterLink({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.linkRow}>
      <Text style={styles.linkText}>{label}</Text>
    </TouchableOpacity>
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
  brandName: { color: colors.text, fontSize: 14, fontWeight: '800', letterSpacing: 0.4 },
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
