import React, { PropsWithChildren } from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MeshBackground from './MeshBackground';
import ParticleField from './ParticleField';
import CustomCursor from './CustomCursor';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { colors } from '../theme/tokens';

type Props = PropsWithChildren<{
  hideFooter?: boolean;
  particleDensity?: number;
}>;

export default function PageShell({ children, hideFooter, particleDensity = 50 }: Props) {
  return (
    <View style={styles.root}>
      <MeshBackground />
      <ParticleField density={particleDensity} />
      <CustomCursor />
      <SafeAreaView style={styles.safe} edges={['top']}>
        <SiteHeader />
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {children}
          {!hideFooter && <SiteFooter />}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, minHeight: '100%' as any },
  safe: { flex: 1, zIndex: 1 } as any,
  scroll: { minHeight: '100%' as any },
});
