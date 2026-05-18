import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Platform, Dimensions, ScrollView } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, space, fontSizes } from '../theme/tokens';

const LOGO_URL = 'https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68';

const NAV_ITEMS: { label: string; route: string }[] = [
  { label: 'Home', route: '/' },
  { label: 'Services', route: '/software-development' },
  { label: 'Projects', route: '/special-projects' },
  { label: 'AI Act', route: '/ai-act-compliance' },
  { label: 'Blog', route: '/blog' },
  { label: 'Contact', route: '/contact' },
];

export default function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => setWidth(window.width));
    return () => sub?.remove();
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    Animated.timing(menuAnim, {
      toValue: menuOpen ? 1 : 0,
      duration: 260,
      useNativeDriver: false,
    }).start();
  }, [menuOpen, menuAnim]);

  const isDesktop = width >= 900;

  const onNav = (route: string) => {
    setMenuOpen(false);
    router.push(route as any);
  };

  return (
    <View style={[styles.wrap, scrolled && styles.wrapScrolled]} pointerEvents="box-none">
      <View style={styles.inner}>
        <TouchableOpacity style={styles.brand} onPress={() => router.push('/')} activeOpacity={0.8}>
          <Image source={{ uri: LOGO_URL }} style={styles.logo} resizeMode="contain" />
          <View>
            <Text style={styles.brandName}>ON TIME TECHNOLOGY</Text>
            <Text style={styles.brandTagline}>Innovating Tomorrow’s Solutions</Text>
          </View>
        </TouchableOpacity>

        {isDesktop ? (
          <View style={styles.navRow}>
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.route || (item.route !== '/' && pathname.startsWith(item.route));
              return (
                <TouchableOpacity key={item.route} onPress={() => onNav(item.route)} style={styles.navItem}>
                  <Text style={[styles.navText, active && styles.navTextActive]}>{item.label}</Text>
                  {active && <View style={styles.navDot} />}
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity style={styles.ctaBtn} onPress={() => router.push('/investor-inquiry')}>
              <Text style={styles.ctaBtnText}>Investor Inquiry</Text>
              <Ionicons name="arrow-forward" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.menuBtn} onPress={() => setMenuOpen(!menuOpen)}>
            <Ionicons name={menuOpen ? 'close' : 'menu'} size={26} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>

      {!isDesktop && (
        <Animated.View
          style={[
            styles.mobileMenu,
            {
              maxHeight: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 520] }),
              opacity: menuAnim,
            },
          ]}
        >
          <ScrollView>
            {NAV_ITEMS.map((item) => (
              <TouchableOpacity key={item.route} style={styles.mobileItem} onPress={() => onNav(item.route)}>
                <Text style={styles.mobileItemText}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.ctaBtn, { alignSelf: 'flex-start', marginTop: 8 }]} onPress={() => onNav('/investor-inquiry')}>
              <Text style={styles.ctaBtnText}>Investor Inquiry</Text>
              <Ionicons name="arrow-forward" size={14} color="#fff" />
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: Platform.OS === 'web' ? ('sticky' as any) : 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    paddingBottom: space.sm,
    backgroundColor: 'transparent',
    ...(Platform.OS === 'web' && ({
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
    } as any)),
  },
  wrapScrolled: {
    backgroundColor: 'rgba(5, 6, 15, 0.75)',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1280,
    marginHorizontal: 'auto',
    width: '100%',
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logo: { width: 40, height: 40, borderRadius: 8 },
  brandName: { color: colors.text, fontSize: 14, fontWeight: '800', letterSpacing: 0.5 },
  brandTagline: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  navRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navItem: { paddingHorizontal: 12, paddingVertical: 6, alignItems: 'center' },
  navText: { color: colors.textMuted, fontSize: 14, fontWeight: '500' },
  navTextActive: { color: colors.text },
  navDot: { width: 4, height: 4, borderRadius: 4, backgroundColor: colors.cyan, marginTop: 4 },
  ctaBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#3B82F6', paddingHorizontal: 16, paddingVertical: 9,
    borderRadius: radii.pill, marginLeft: 12,
    ...(Platform.OS === 'web' && { boxShadow: '0 8px 24px rgba(59,130,246,0.45)' } as any),
  },
  ctaBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  menuBtn: { padding: 8, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgCard },
  mobileMenu: {
    overflow: 'hidden',
    marginTop: 12,
    backgroundColor: 'rgba(11,13,27,0.95)',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  mobileItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  mobileItemText: { color: colors.text, fontSize: 15, fontWeight: '600' },
});
